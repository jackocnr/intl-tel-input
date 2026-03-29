<script setup>
import { ref } from "vue";
import IntlTelInput from "../../build/exports/IntlTelInputWithUtils";
//import IntlTelInput from "../../src/intl-tel-input/IntlTelInputWithUtils.vue";
import intlTelInput from "../../src/intl-tel-input";

const getErrorMessage = (errorCode) => {
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

const isValid = ref(null);
const number = ref(null);
const errorCode = ref(null);
const notice = ref(null);

const intlTelInputRef = ref(null);

const handleSetNumber = () => {
  intlTelInputRef.value?.instance?.setNumber("+14155552671");
};

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
    <IntlTelInput
      ref="intlTelInputRef"
      @changeNumber="number = $event"
      @changeValidity="isValid = $event"
      @changeErrorCode="errorCode = $event"
      initialCountry="us"
    />
    <button class="button" type="button" @click="handleSetNumber">
      Set Number
    </button>
    <button class="button" type="button" @click="handleSubmit">Validate</button>
    <div v-if="notice" class="notice">{{ notice }}</div>
  </form>
</template>
