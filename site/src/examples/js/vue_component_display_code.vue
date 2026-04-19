<script setup>
  import { computed, ref } from "vue";
  import IntlTelInput, { intlTelInput } from "intl-tel-input/vue";
  import "intl-tel-input/styles";

  const getErrorMessage = (number, errorCode) => {
    if (!number) return "Please enter a number";
    const genericError = "Invalid number";
    const { validationError } = intlTelInput.utils;
    const errorMap = {
      [validationError.INVALID_COUNTRY_CODE]: "Invalid dial code",
      [validationError.TOO_SHORT]: "Too short",
      [validationError.TOO_LONG]: "Too long",
      [validationError.INVALID_LENGTH]: genericError,
    };
    return errorMap[errorCode] || genericError;
  };

  const geoIpLookup = (success, failure) => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => failure());
  };

  const number = ref("");
  const isValid = ref(false);
  const errorCode = ref(null);
  const showValidation = ref(false);

  const invalidMsg = computed(() => {
    if (!showValidation.value || isValid.value) return null;
    return getErrorMessage(number.value, errorCode.value);
  });

  const enableValidation = () => {
    showValidation.value = true;
  };
</script>

<template>
  <form @submit.prevent="enableValidation">
    <IntlTelInput
      @changeNumber="handleChangeNumber"
      @changeValidity="isValid = $event"
      @changeErrorCode="errorCode = $event"
      initialCountry="auto"
      :separateDialCode="true"
      :strictMode="true"
      :geoIpLookup="geoIpLookup"
      :loadUtils="() => import('intl-tel-input/utils')"
      :inputProps="{
        onBlur: enableValidation,
      }"
    />
    <button type="submit">Submit</button>
    <div v-if="invalidMsg" class="invalid">{{ invalidMsg }}</div>
  </form>
</template>
