<script setup>
import intlTelInput from "../intl-tel-input";
import { onMounted, onUnmounted, ref, watch } from "vue";

const model = defineModel({
  type: String,
  default: "",
});

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },

  inputProps: {
    type: Object,
    default: () => ({}),
  },

  options: {
    type: Object,
    default: () => ({}),
  },

  value: {
    type: String,
    default: "",
  },
});

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

    if (props.value) {
      instance.value.setNumber(props.value);
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
    v-model.lazy="model"
    type="tel"
    @countrychange="updateCountry"
    @input="updateValue"
    v-bind="inputProps"
  />
</template>
