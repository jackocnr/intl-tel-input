<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->
<script setup lang="ts">
import intlTelInput from "./intl-tel-input/intlTelInputWithUtils";
import type { SomeOptions } from "./modules/types/public-api";
import { defaults } from "./modules/core/options";
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
  inputProps?: InputHTMLAttributes;
  initialValue?: string | null;
  modelValue?: string | null;
}

const props = withDefaults(defineProps<Props & SomeOptions>(), {
  disabled: false,
  usePreciseValidation: false,
  inputProps: () => ({}),
});

defineOptions({ inheritAttrs: false });

const emit = defineEmits([
  "changeNumber",
  "changeCountry",
  "changeValidity",
  "changeErrorCode",
  "update:modelValue",
]);

const sanitizedInputProps = computed(() => {
  // ignore keys that would break functionality
  const {
    type: _type,
    ref: _ref,
    value: _value,
    disabled: _disabled,
    onInput: _onInput,
    oninput: _oninput,
    onCountrychange: _onCountrychange,
    onCountryChange: _onCountryChange,
    ...rest
  } = (props.inputProps ?? {}) as Record<string, unknown>;

  return rest;
});

const displayed = computed(
  () =>
    props.modelValue ??
    props.initialValue ??
    "",
);

const vm = getCurrentInstance();

const hasOwn = (obj: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, key);

const pluginOptionKeys = Object.keys(defaults);

// Vue will coerce absent Boolean props to `false` when props are declared at runtime.
// That can accidentally override the plugin's own defaults.
//
// To preserve plugin defaults, only pass through keys that:
// 1) are real plugin option keys, and
// 2) were actually provided by the parent
const initOptions = computed<SomeOptions>(() => {
  const rawPassedProps = (vm?.vnode.props ?? {}) as Record<string, unknown>;

  const cleanedOptions: Record<string, unknown> = {};
  pluginOptionKeys.forEach((optionKey) => {
    if (!hasOwn(rawPassedProps, optionKey)) {
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
const lastEmittedErrorCode = ref<number | null>();

const isValid = () => {
  if (instance.value) {
    return props.usePreciseValidation
      ? instance.value.isValidNumberPrecise()
      : instance.value.isValidNumber();
  }

  return null;
};

const updateValidity = () => {
  const isCurrentlyValid = isValid();
  if (isCurrentlyValid === null) return;

  const valid = !!isCurrentlyValid;
  const errorCode = valid
    ? null
    : instance.value?.getValidationError?.() ?? null;

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
  const number = instance.value?.getNumber() ?? "";

  if (number !== lastEmittedNumber.value) {
    lastEmittedNumber.value = number;
    emit("changeNumber", number);
    emit("update:modelValue", number);
  }

  updateValidity();
};

const updateCountry = () => {
  const country = instance.value?.getSelectedCountryData().iso2 ?? "";
  if (country !== lastEmittedCountry.value) {
    lastEmittedCountry.value = country;
    emit("changeCountry", country);
  }
  updateValue();
};

onMounted(() => {
  if (input.value) {
    instance.value = intlTelInput(input.value, initOptions.value);

    if (displayed.value) {
      instance.value.setNumber(displayed.value);
    }

    if (props.disabled) {
      instance.value.setDisabled(props.disabled);
    }

    lastEmittedNumber.value = instance.value.getNumber?.() ?? "";
    lastEmittedCountry.value = instance.value.getSelectedCountryData().iso2 ?? "";

    const initialValid = isValid();
    if (initialValid !== null) {
      lastEmittedValidity.value = !!initialValid;
      lastEmittedErrorCode.value = initialValid
        ? null
        : instance.value.getValidationError?.() ?? null;
    }
  }
});

watch(
  () => props.disabled,
  (newValue) => instance.value?.setDisabled(newValue),
);

watch(
  () => displayed.value,
  (val) => {
    if (!instance.value) return;

    // Avoid cursor jumping when typing
    const next = val ?? "";
    const currentCanonical = instance.value.getNumber?.() ?? "";
    const isFocused = document.activeElement === input.value;

    if (isFocused || currentCanonical === next) return;

    instance.value.setNumber(next);
    updateValidity();
  },
  { flush: "post" },
);

onUnmounted(() => instance.value?.destroy());

defineExpose({ instance, input });
</script>

<template>
  <!-- must come first, so cannot override the other required props -->
  <input
    v-bind="sanitizedInputProps"
    ref="input"
    type="tel"
    @countrychange="updateCountry"
    @input="updateValue"
  />
</template>
