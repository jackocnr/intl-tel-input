<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->
<script setup lang="ts">
import intlTelInput from "./intl-tel-input/intlTelInputWithUtils";
import type { SomeOptions } from "./modules/types/public-api";
import { onMounted, onUnmounted, ref, shallowRef, watch, computed } from "vue";
import type { InputHTMLAttributes } from "vue";

interface Props {
  options?: SomeOptions;
  usePreciseValidation?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  inputProps?: InputHTMLAttributes;
  value?: string | null;
  modelValue?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  usePreciseValidation: false,
  inputProps: () => ({}),
  options: () => ({}),
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
    // disabled: _disabled,
    onInput: _onInput,
    oninput: _oninput,
    onCountrychange: _onCountrychange,
    onCountryChange: _onCountryChange,
    ...rest
  } = (props.inputProps ?? {}) as Record<string, unknown>;

  return rest;
});

const displayed = computed(() => props.value ?? props.modelValue ?? "");

const input = ref<HTMLInputElement | null>(null);
// Use shallowRef so Vue does not Proxy-wrap the Iti class instance.
// A reactive Proxy breaks private fields (e.g. `#ui`) when calling instance methods.
const instance = shallowRef<ReturnType<typeof intlTelInput> | null>(null);
const lastEmittedNumber = ref<string>();
const lastEmittedCountry = ref<string>();
const lastEmittedValidity = ref<boolean>();
const lastEmittedErrorCode = ref<number | null>();

const isValid = () => props.usePreciseValidation
  ? instance.value!.isValidNumberPrecise()
  : instance.value!.isValidNumber();

const updateValidity = () => {
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
  const country = instance.value.getSelectedCountryData().iso2 ?? "";
  if (country !== lastEmittedCountry.value) {
    lastEmittedCountry.value = country;
    emit("changeCountry", country);
  }
  updateValue();
};

onMounted(() => {
  if (!input.value) {
    return;
  }

  instance.value = intlTelInput(input.value, props.options);

  if (displayed.value) {
    instance.value.setNumber(displayed.value);
  }
  if (props.disabled) {
    instance.value.setDisabled(props.disabled);
  }
  if (props.readonly) {
    instance.value.setReadonly(props.readonly);
  }

  lastEmittedNumber.value = instance.value.getNumber() ?? "";
  lastEmittedCountry.value = instance.value.getSelectedCountryData().iso2 ?? "";

  lastEmittedValidity.value = isValid();
  lastEmittedErrorCode.value = lastEmittedValidity.value
    ? null
    : instance.value.getValidationError();
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

    // Avoid cursor jumping when typing
    const next = val ?? "";
    const currentCanonical = instance.value.getNumber() ?? "";
    const isFocused = document.activeElement === input.value;

    if (isFocused || currentCanonical === next) {
      return;
    }

    instance.value.setNumber(next);
    updateValidity();
  },
  { flush: "post" },
)

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
