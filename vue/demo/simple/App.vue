<script setup>
import IntlTelInput from "../../build/exports/IntlTelInputWithUtils";
//import IntlTelInput from "../../src/intl-tel-input/IntlTelInputWithUtils.vue";
</script>

<template>
  <IntlTelInput :initOptions="{ initialCountry: 'us' }" />
</template>
