<script setup>
  import { computed, ref } from "vue";
  import IntlTelInput from "../../../build/intl-tel-input/vue/exports/IntlTelInput.mjs";

  const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  const number = ref("");
  const isValid = ref(false);
  const errorCode = ref(0);
  const showValidation = ref(false);
  const submitted = ref(false);

  const inputValidityClass = computed(() => {
    if (!showValidation.value) return "";
    return number.value && isValid.value ? "is-valid" : "is-invalid";
  });

  const invalidMsg = computed(() => {
    if (!showValidation.value || isValid.value) return null;
    return number.value
      ? errorMap[errorCode.value || 0] || "Invalid number"
      : "Please enter a number";
  });

  const validMsg = computed(() => {
    const showValid =
      showValidation.value && number.value && isValid.value && submitted.value;
    return showValid ? `Full number: ${number.value}` : null;
  });

  const handleChangeNumber = (newNumber) => {
    submitted.value = false;
    number.value = newNumber;
  };

  const handleSubmit = () => {
    showValidation.value = true;
    submitted.value = true;
  };
</script>

<template>
  <form @submit.prevent="handleSubmit" class="row g-2" novalidate>
    <div class="col-auto">
      <div>
        <IntlTelInput
          @changeNumber="handleChangeNumber"
          @changeValidity="isValid = $event"
          @changeErrorCode="errorCode = $event"
          initialCountry="us"
          :loadUtils="() => import('<%= cacheBust(`/intl-tel-input/js/utils.js`) %>')"
          searchInputClass="form-control"
          :inputProps="{
            name: 'phone',
            title: 'Enter your phone number',
            required: true,
            onBlur: () => (showValidation.value = true),
            class: `form-control ${inputValidityClass}`,
          }"
        />
        <div v-if="invalidMsg" class="invalid-feedback d-block">{{ invalidMsg }}</div>
        <div v-if="validMsg" class="valid-feedback d-block">{{ validMsg }}</div>
      </div>
    </div>
    <div class="col-auto">
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </form>
</template>
