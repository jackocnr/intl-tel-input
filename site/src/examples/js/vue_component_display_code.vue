<script setup>
  import IntlTelInput from "intl-tel-input/vue";
  import "intl-tel-input/styles";

  const isValid = ref(null);
  const number = ref(null);
  const errorCode = ref(null);
  const notice = ref(null);

  const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  const handleSubmit = () => {
    if (isValid.value) {
      notice.value = `Valid number: ${number.value}`;
    } else {
      const errorMessage = errorMap[errorCode.value || 0];
      notice.value = `Error: ${errorMessage}`;
    }
  };
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <IntlTelInput
      @changeNumber="number = $event"
      @changeValidity="isValid = $event"
      @changeErrorCode="errorCode = $event"
      :options="{
        initialCountry: 'us',
        loadUtils: () => import('intl-tel-input/utils'),
      }"
    />
    <button class="button" type="submit">Validate</button>
    <div v-if="notice" class="notice">{{ notice }}</div>
  </form>
</template>