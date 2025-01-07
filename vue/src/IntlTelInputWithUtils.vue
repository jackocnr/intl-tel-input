<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->
<script setup lang="ts">
import intlTelInput from "./intl-tel-input/intlTelInputWithUtils";
import type { SomeOptions } from "./modules/types/public-api";
import { onMounted, onUnmounted, ref, watch } from "vue";
import type { InputHTMLAttributes } from "vue";

const modelValue = defineModel<string>({
  default: ''
});

interface Props {
  options?: SomeOptions,
  disabled?: boolean,
  inputProps?: InputHTMLAttributes
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  inputProps: () => ({}),
  options: () => ({}),
})

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits([
  "changeNumber",
  "changeCountry",
  "changeValidity",
  "changeErrorCode",
]);

const input = ref();
const instance = ref();
const wasPreviouslyValid = ref(false);

const isValid = () => {
  if (instance.value) {
    return props.options.strictMode
      ? instance.value.isValidNumberPrecise()
      : instance.value.isValidNumber();
  }

  return null;
};

const updateValidity = () => {
  let isCurrentlyValid = isValid();

  if (wasPreviouslyValid.value !== isCurrentlyValid) {
    wasPreviouslyValid.value = isCurrentlyValid;

    emit("changeValidity", !!isCurrentlyValid);
    emit(
      "changeErrorCode",
      isCurrentlyValid ? null : instance.value.getValidationError()
    );
  }
};

const updateValue = () => {
  emit("changeNumber", instance.value?.getNumber() ?? "");
  updateValidity();
};

const updateCountry = () => {
  emit("changeCountry", instance.value?.getSelectedCountryData().iso2 ?? "");
  updateValue();
  updateValidity();
};

onMounted(() => {
  if (input.value) {
    instance.value = intlTelInput(input.value, props.options);

    if (modelValue.value) {
      instance.value.setNumber(modelValue.value);
    }

    if (props.disabled) {
      instance.value.setDisabled(props.disabled);
    }
    wasPreviouslyValid.value = isValid();
  }
});

watch(
  () => props.disabled,
  (newValue) => instance.value?.setDisabled(newValue)
);

onUnmounted(() => instance.value?.destroy());

defineExpose({ instance, input });
</script>

<template>
  <input
    ref="input"
    v-model.lazy="modelValue"
    type="tel"
    @countrychange="updateCountry"
    @input="updateValue"
    v-bind="inputProps"
  />
</template>
