<script setup>
  import { computed, ref } from "vue";
  import IntlTelInput, { intlTelInput } from "../../../../vue/build/IntlTelInput.js";

  const getErrorMessage = (number, errorCode) => {
    if (!number) return "Please enter a number";
    const genericError = "Invalid number";
    const { validationError } = intlTelInput.utils;
    const errorMap = {
      [validationError.INVALID_COUNTRY_CODE]: "Invalid country code",
      [validationError.TOO_SHORT]: "Too short",
      [validationError.TOO_LONG]: "Too long",
      [validationError.INVALID_LENGTH]: genericError,
    };
    return errorMap[errorCode] || genericError;
  };

  const number = ref("");
  const isValid = ref(false);
  const errorCode = ref(null);
  const showValidation = ref(false);
  const submitted = ref(false);

  const inputValidityClass = computed(() => {
    if (!showValidation.value) return "";
    return isValid.value ? "is-valid" : "is-invalid";
  });

  const invalidMsg = computed(() => {
    if (!showValidation.value || isValid.value) return null;
    return getErrorMessage(number.value, errorCode.value);
  });

  const validMsg = computed(() => {
    const showValid =
      showValidation.value && isValid.value && submitted.value;
    return showValid ? `Full number: ${number.value}` : null;
  });

  const handleChangeNumber = (newNumber) => {
    submitted.value = false;
    number.value = newNumber;
  };

  const handleBlur = () => {
    showValidation.value = true;
  };

  const handleSubmit = () => {
    showValidation.value = true;
    submitted.value = true;
  };
</script>

<template>
  <form @submit.prevent="handleSubmit" class="row g-2" novalidate>
    <div class="col-auto">
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
          onBlur: handleBlur,
          class: `form-control ${inputValidityClass}`,
        }"
      />
      <div v-if="invalidMsg" class="invalid-feedback d-block">{{ invalidMsg }}</div>
      <div v-if="validMsg" class="valid-feedback d-block">{{ validMsg }}</div>
    </div>
    <div class="col-auto">
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </form>
</template>
