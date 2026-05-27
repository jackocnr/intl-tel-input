<script setup>
import IntlTelInput from "../../src/indexWithUtils";
</script>

<template>
  <IntlTelInput
    initial-country="us"
    :input-props="{ class: 'form-control' }"
    search-input-class="form-control"
  />
</template>
