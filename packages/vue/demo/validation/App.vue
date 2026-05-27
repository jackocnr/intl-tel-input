<script setup>
import { ref } from "vue";
import IntlTelInput, { intlTelInput } from "../../src/indexWithUtils";

const getErrorMessage = (errorCode) => {
  const { VALIDATION_ERROR } = intlTelInput;
  switch (errorCode) {
    case VALIDATION_ERROR.INVALID_COUNTRY_CODE: return "Invalid dial code";
    case VALIDATION_ERROR.TOO_SHORT: return "Too short";
    case VALIDATION_ERROR.TOO_LONG: return "Too long";
    default: return "Invalid number";
  }
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
        @change-number="number = $event"
        @change-validity="isValid = $event"
        @change-error-code="errorCode = $event"
        initial-country="us"
        :input-props="{ class: 'form-control' }"
        search-input-class="form-control"
      />
      <button class="btn btn-primary" type="button" @click="handleSubmit">Validate</button>
    </div>
    <div v-if="notice" class="notice">{{ notice }}</div>
  </form>
</template>
