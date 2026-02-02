<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->
<script setup lang="ts">
import intlTelInput from "./intl-tel-input/intlTelInputWithUtils";
import type { SomeOptions } from "./modules/types/public-api";
import { onMounted, onUnmounted, ref, watch, computed } from "vue";
import type { InputHTMLAttributes } from "vue";

interface Props {
  options?: SomeOptions;
  usePreciseValidation?: boolean;
  disabled?: boolean;
  inputProps?: InputHTMLAttributes;
}

const props = withDefaults(defineProps<Props & { value?: string | null; modelValue?: string | null }>(), {
  disabled: false,
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

const displayed = computed(() => props.value ?? props.modelValue ?? "");

const input = ref<HTMLInputElement | null>(null);
const instance = ref<ReturnType<typeof intlTelInput> | null>(null);
const wasPreviouslyValid = ref(false);

const isValid = () => {
  if (instance.value) {
    return props.usePreciseValidation
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
      isCurrentlyValid ? null : instance.value?.getValidationError?.() ?? null,
    );
  }
};

const updateValue = () => {
  const number = instance.value?.getNumber() ?? "";

  emit("changeNumber", number);
  emit("update:modelValue", number);

  updateValidity();
};

const updateCountry = () => {
  emit("changeCountry", instance.value?.getSelectedCountryData().iso2 ?? "");
  updateValue();
};

onMounted(() => {
  if (input.value) {
    instance.value = intlTelInput(input.value, props.options);

    if (displayed.value) {
      instance.value.setNumber(displayed.value);
    }

    if (props.disabled) {
      instance.value.setDisabled(props.disabled);
    }
    wasPreviouslyValid.value = isValid();
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

    if (currentCanonical === next) return;

    instance.value.setNumber(next);
    updateValidity();
  },
  { flush: "post" },
)

onUnmounted(() => instance.value?.destroy());

defineExpose({ instance, input });
</script>

<template>
  <input
    ref="input"
    :value="displayed"
    type="tel"
    @countrychange="updateCountry"
    @input="updateValue"
    v-bind="inputProps"
  />
</template>
