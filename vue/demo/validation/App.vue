<script setup>
  import IntlTelInput from "../../src/intl-tel-input/IntlTelInputWithUtils.vue";
</script>

<template>
  <form>
    <IntlTelInput
      :options="{
        initialCountry: 'us',
      }"
    />
    <button className="button" type="button">Validate</button>
    <div className="notice">VALIDATION RESULT HERE</div>
  </form>
</template>