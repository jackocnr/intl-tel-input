<script setup>
import IntlTelInput from "../../src/indexWithUtils";
</script>

<template>
  <IntlTelInput
    initialCountry="us"
    :input-props="{ class: 'form-control' }"
    search-input-class="form-control"
  />
</template>
