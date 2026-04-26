<script setup lang="ts">
import intlTelInput, { type SomeOptions, type ValidationError } from "intl-tel-input";
import {
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
  computed,
  getCurrentInstance,
} from "vue";
import type { InputHTMLAttributes } from "vue";

interface Props {
  usePreciseValidation?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  inputProps?: InputHTMLAttributes;
  initialValue?: string | null;
  modelValue?: string | null;
}

const props = withDefaults(defineProps<Props & SomeOptions>(), {
  disabled: false,
  readonly: false,
  usePreciseValidation: false,
  inputProps: () => ({}),
});

defineOptions({ inheritAttrs: false });

type StrictRejectSource = "key" | "paste";
type StrictRejectReason = "invalid" | "max-length";
type StrictRejectDetail = {
  source: StrictRejectSource;
  rejectedInput: string;
  reason: StrictRejectReason;
};

const emit = defineEmits<{
  (e: "changeNumber", value: string): void;
  (e: "changeCountry", value: string): void;
  (e: "changeValidity", value: boolean): void;
  (e: "changeErrorCode", value: ValidationError | null): void;
  (e: "openCountryDropdown"): void;
  (e: "closeCountryDropdown"): void;
  (e: "strictReject", source: StrictRejectSource, rejectedInput: string, reason: StrictRejectReason): void;
  (e: "update:modelValue", value: string): void;
}>();

const warnInputProp = (prop: string): void => {
  console.warn(`intl-tel-input: ignoring inputProps.${prop} - see docs for more info.`);
};

const ignoredInputProps = new Set(["type", "value", "disabled", "readonly", "onInput", "oninput"]);

// Classes the plugin adds directly to the input (e.g. iti__tel-input)
const pluginInputClasses = ref("");

const sanitizedInputProps = computed(() => {
  const input = (props.inputProps ?? {}) as Record<string, unknown>;
  const rest: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(input)) {
    if (ignoredInputProps.has(key)) {
      warnInputProp(key);
    } else if (key === "class") {
      rest[key] = `${pluginInputClasses.value} ${val}`;
    } else {
      rest[key] = val;
    }
  }
  return rest;
});

const displayed = computed(
  () =>
    props.modelValue ??
    props.initialValue ??
    "",
);

const vm = getCurrentInstance();

const pluginOptionKeys = Object.keys(intlTelInput.defaults);

// Vue will coerce absent Boolean props to `false` when props are declared at runtime.
// That can accidentally override the plugin's own defaults.
//
// To preserve plugin defaults, only pass through keys that:
// 1) are real plugin option keys, and
// 2) were actually provided by the parent
//
// We normalize raw vnode prop keys to camelCase before checking, because Vue's
// template compiler may pass props in kebab-case depending on how the consumer
// writes the attribute.
const initOptions = computed<SomeOptions>(() => {
  const rawPassedProps = (vm?.vnode.props ?? {}) as Record<string, unknown>;
  const passedCamelKeys = new Set(
    Object.keys(rawPassedProps).map((k) => k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())),
  );

  const cleanedOptions: Record<string, unknown> = {};
  pluginOptionKeys.forEach((optionKey) => {
    if (!passedCamelKeys.has(optionKey)) {
      return;
    }
    const value = (props as Record<string, unknown>)[optionKey];
    if (value !== undefined) cleanedOptions[optionKey] = value;
  });

  return cleanedOptions as SomeOptions;
});

const input = ref<HTMLInputElement | null>(null);
// Use shallowRef so Vue does not Proxy-wrap the Iti class instance.
// A reactive Proxy breaks private fields (e.g. `#ui`) when calling instance methods.
const instance = shallowRef<ReturnType<typeof intlTelInput> | null>(null);
const lastEmittedNumber = ref<string>();
const lastEmittedCountry = ref<string>();
const lastEmittedValidity = ref<boolean>();
const lastEmittedErrorCode = ref<ValidationError | null>();
// if an input event fires before utils has loaded, we defer the update until the promise resolves
let pendingUpdate = false;

const isValid = () => (props.usePreciseValidation
  ? instance.value!.isValidNumberPrecise()
  : instance.value!.isValidNumber()) ?? false;

const updateValidity = () => {
  if (!instance.value?.isActive()) {
    return;
  }
  // if utils has not loaded yet, isValidNumber/getValidationError will throw. defer until the promise resolves.
  if (!intlTelInput.utils) {
    pendingUpdate = true;
    return;
  }
  const valid = isValid();
  const errorCode = valid
    ? null
    : instance.value!.getValidationError();

  if (valid !== lastEmittedValidity.value) {
    lastEmittedValidity.value = valid;
    emit("changeValidity", valid);
  }

  if (errorCode !== lastEmittedErrorCode.value) {
    lastEmittedErrorCode.value = errorCode;
    emit("changeErrorCode", errorCode);
  }
};

const updateValue = () => {
  if (!instance.value?.isActive()) {
    return;
  }
  // if utils has not loaded yet, getNumber will throw. defer until the promise resolves.
  if (!intlTelInput.utils) {
    pendingUpdate = true;
    return;
  }
  const number = instance.value.getNumber() ?? "";
  if (number !== lastEmittedNumber.value) {
    lastEmittedNumber.value = number;
    emit("changeNumber", number);
    emit("update:modelValue", number);
  }

  updateValidity();
};

const updateCountry = () => {
  if (!instance.value?.isActive()) {
    return;
  }
  const country = instance.value.getSelectedCountryData()?.iso2 ?? "";
  if (country !== lastEmittedCountry.value) {
    lastEmittedCountry.value = country;
    emit("changeCountry", country);
  }
  updateValue();
};

const handleOpen = (): void => emit("openCountryDropdown");
const handleClose = (): void => emit("closeCountryDropdown");
const handleStrictReject = (e: Event): void => {
  const { source, rejectedInput, reason } = (e as CustomEvent<StrictRejectDetail>).detail;
  emit("strictReject", source, rejectedInput, reason);
};

onMounted(() => {
  if (!input.value) {
    return;
  }

  instance.value = intlTelInput(input.value, initOptions.value);
  pluginInputClasses.value = input.value.className;

  input.value.addEventListener("open:countrydropdown", handleOpen);
  input.value.addEventListener("close:countrydropdown", handleClose);
  input.value.addEventListener("strict:reject", handleStrictReject);

  if (props.disabled) {
    instance.value.setDisabled(props.disabled);
  }
  if (props.readonly) {
    instance.value.setReadonly(props.readonly);
  }

  lastEmittedCountry.value = instance.value.getSelectedCountryData()?.iso2 ?? "";

  // wait for utils to load before calling methods that require it (getNumber, setNumber, isValidNumber, etc.)
  instance.value.promise.then(() => {
    if (!instance.value?.isActive()) {
      return;
    }
    if (displayed.value) {
      instance.value.setNumber(displayed.value);
    }
    // if an input event fired during the utils-loading gap, replay it now so the skipped emissions fire.
    // otherwise seed silently so we don't fire change callbacks on initial mount.
    if (pendingUpdate) {
      pendingUpdate = false;
      updateCountry();
    } else {
      lastEmittedNumber.value = instance.value.getNumber() ?? "";
      lastEmittedValidity.value = isValid();
      lastEmittedErrorCode.value = lastEmittedValidity.value
        ? null
        : instance.value.getValidationError();
    }
  });
});

watch(
  () => props.disabled,
  (newValue) => instance.value?.setDisabled(newValue),
);

watch(
  () => props.readonly,
  (newValue) => instance.value?.setReadonly(newValue),
);

watch(
  () => displayed.value,
  (val) => {
    if (!instance.value) {
      return;
    }

    // wait for utils to load before calling methods that require it
    instance.value.promise.then(() => {
      if (!instance.value?.isActive()) {
        return;
      }
      // Avoid cursor jumping when typing
      const next = val ?? "";
      const currentCanonical = instance.value.getNumber() ?? "";
      const isFocused = document.activeElement === input.value;

      if (isFocused || currentCanonical === next) {
        return;
      }

      instance.value.setNumber(next);
      updateValidity();
    });
  },
  { flush: "post" },
);

onUnmounted(() => {
  if (input.value) {
    input.value.removeEventListener("open:countrydropdown", handleOpen);
    input.value.removeEventListener("close:countrydropdown", handleClose);
    input.value.removeEventListener("strict:reject", handleStrictReject);
  }
  instance.value?.destroy();
});

defineExpose({ instance, input });
</script>

<template>
  <!-- must come first, so cannot override the other required props -->
  <input
    v-bind="sanitizedInputProps"
    ref="input"
    type="tel"
    @input="updateCountry"
  />
</template>
