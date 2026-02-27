<script setup>
  import IntlTelInput from "intl-tel-input/vue";
  import "intl-tel-input/styles";

  const number = ref("");
  const isValid = ref(false);
  const errorCode = ref(0);
  const noticeMode = ref("off");

  const notice = computed(() => {
    // Determine the notice message based on the current state
  });

  const handleSubmit = () => {
    noticeMode.value = "submit";
  };

  const handleBlur = () => {
    noticeMode.value = "blur";
  };
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <IntlTelInput
      @changeNumber="number = $event"
      @changeValidity="isValid = $event"
      @changeErrorCode="errorCode = $event"
      :initOptions="{
        initialCountry: 'us',
        loadUtils: () => import('intl-tel-input/utils'),
      }"
      :inputProps="{
        onBlur: handleBlur,
      }"
    />
    <button type="submit">Validate</button>
    <div v-if="notice" class="notice">{{ notice }}</div>
  </form>
</template>