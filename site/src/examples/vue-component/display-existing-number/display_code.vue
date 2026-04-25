<script setup>
  import IntlTelInput from "intl-tel-input/vue";
  import "intl-tel-input/styles";
</script>

<template>
  <label for="phone">Phone number</label>
  <IntlTelInput
    :separate-dial-code="true"
    initial-value="+447733312345"
    :load-utils="() => import('intl-tel-input/utils')"
    :input-props="{ id: 'phone' }"
  />
</template>
