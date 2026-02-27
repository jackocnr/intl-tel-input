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
  const noticeMode = ref("off");

  const notice = computed(() => {
    if (noticeMode.value === "off") {
      return null;
    }
    if (isValid.value) {
      return noticeMode.value === "submit" ? `Valid number: ${number.value}` : "";
    }
    if (number.value) {
      const errorMessage = errorMap[errorCode.value || 0] || "Invalid number";
      return `Error: ${errorMessage}`;
    }
    return "Please enter a number";
  });

  const handleSubmit = () => {
    noticeMode.value = "submit";
  };

  const handleBlur = () => {
    noticeMode.value = "blur";
  };
</script>

<template>
  <form @submit.prevent="handleSubmit" class="row g-2">
    <div class="col-auto">
      <IntlTelInput
        @changeNumber="number = $event"
        @changeValidity="isValid = $event"
        @changeErrorCode="errorCode = $event"
        :initOptions='{
          initialCountry: "us",
          loadUtils: () => import("<%= cacheBust(`/intl-tel-input/js/utils.js`) %>"),
          searchInputClass: "form-control",
        }'
        :inputProps="{
          class: 'form-control',
          title: 'Enter your phone number',
          onBlur: handleBlur,
        }"
      />
    </div>
    <div class="col-auto">
      <button class="btn btn-primary" type="submit">Validate</button>
    </div>
    <div v-if="notice" class="notice">{{ notice }}</div>
  </form>
</template>
