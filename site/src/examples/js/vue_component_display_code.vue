<script setup>
  import { computed, ref } from "vue";
  import IntlTelInput from "intl-tel-input/vue";
  import "intl-tel-input/styles";

  const number = ref("");
  const isValid = ref(false);
  const errorCode = ref(0);
  const showValidation = ref(false);

  const invalidMsg = computed(() => {
    // your logic to derive the invalid message
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
      initialCountry="us"
      :loadUtils="() => import('intl-tel-input/utils')"
      :inputProps="{
        onBlur: enableValidation,
      }"
    />
    <button type="submit">Submit</button>
    <div v-if="invalidMsg" class="invalid">{{ invalidMsg }}</div>
  </form>
</template>