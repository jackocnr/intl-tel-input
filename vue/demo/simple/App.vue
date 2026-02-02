<script setup>
import IntlTelInput from "../../build/exports/IntlTelInputWithUtils";
//import IntlTelInput from "../../src/intl-tel-input/IntlTelInputWithUtils.vue";
</script>

<template>
  <IntlTelInput :options="{ initialCountry: 'us' }" />
</template>
