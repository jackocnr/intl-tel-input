<script setup>
import { ref } from "vue";
import IntlTelInput from "../../build/exports/IntlTelInputWithUtils";
//import IntlTelInput from "../../src/intl-tel-input/IntlTelInputWithUtils.vue";

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

const isValid = ref(null);
const number = ref(null);
const errorCode = ref(null);
const notice = ref(null);

const handleSubmit = () => {
  if (isValid.value) {
    notice.value = `Valid number: ${number.value}`;
  } else {
    const errorMessage = errorMap[errorCode.value || 0] || "Invalid number";
    notice.value = `Error: ${errorMessage}`;
  }
};
</script>

<template>
  <form>
    <IntlTelInput
      @changeNumber="number = $event"
      @changeValidity="isValid = $event"
      @changeErrorCode="errorCode = $event"
      :options="{
        initialCountry: 'us',
      }"
    />
    <button class="button" type="button" @click="handleSubmit">Validate</button>
    <div v-if="notice" class="notice">{{ notice }}</div>
  </form>
</template>
