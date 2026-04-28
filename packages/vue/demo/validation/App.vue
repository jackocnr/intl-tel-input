<script setup>
import { ref } from "vue";
import IntlTelInput, { intlTelInput } from "../../src/indexWithUtils";

const getErrorMessage = (errorCode) => {
  const genericError = "Invalid number";
  const { VALIDATION_ERROR } = intlTelInput;
  const errorMap = {
    [VALIDATION_ERROR.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [VALIDATION_ERROR.TOO_SHORT]: "Too short",
    [VALIDATION_ERROR.TOO_LONG]: "Too long",
    [VALIDATION_ERROR.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

const isValid = ref(null);
const number = ref(null);
const errorCode = ref(null);
const notice = ref(null);

const handleSubmit = () => {
  if (isValid.value) {
    notice.value = `Valid number: ${number.value}`;
  } else {
    const errorMessage = getErrorMessage(errorCode.value);
    notice.value = `Error: ${errorMessage}`;
  }
};
</script>

<template>
  <form>
    <div class="d-flex align-items-start gap-2">
      <IntlTelInput
        @changeNumber="number = $event"
        @changeValidity="isValid = $event"
        @changeErrorCode="errorCode = $event"
        initialCountry="us"
        :input-props="{ class: 'form-control' }"
        search-input-class="form-control"
      />
      <button class="btn btn-primary" type="button" @click="handleSubmit">Validate</button>
    </div>
    <div v-if="notice" class="notice">{{ notice }}</div>
  </form>
</template>
