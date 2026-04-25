<script setup>
  import { computed, ref } from "vue";
  import IntlTelInput from "intl-tel-input/vue";
  import "intl-tel-input/styles";

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
  const submitted = ref(false);

  const invalidMsg = computed(() => {
    if (!showValidation.value || isValid.value) return null;
    return yourCodeToDeriveErrorMessage(number.value, errorCode.value);
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
  <form @submit.prevent="handleSubmit">
    <label for="phone">Phone number</label>
    <IntlTelInput
      @changeNumber="handleChangeNumber"
      @changeValidity="isValid = $event"
      @changeErrorCode="errorCode = $event"
      initial-country="auto"
      :separate-dial-code="true"
      :strict-mode="true"
      :strict-reject-animation="true"
      :geo-ip-lookup="geoIpLookup"
      :load-utils="() => import('intl-tel-input/utils')"
      :input-props="{
        id: 'phone',
        onBlur: handleBlur,
      }"
    />
    <button type="submit">Submit</button>
    <div v-if="invalidMsg" class="invalid">{{ invalidMsg }}</div>
    <div v-if="validMsg" class="valid">{{ validMsg }}</div>
  </form>
</template>
