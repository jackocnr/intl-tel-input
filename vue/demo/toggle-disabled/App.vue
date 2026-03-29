<script setup>
import { ref } from "vue";
import IntlTelInput from "../../src/exports/IntlTelInputWithUtils";

const isDisabled = ref(true);

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<template>
  <form>
    <IntlTelInput :disabled="isDisabled" />
    <button class="button" type="button" @click="toggleDisabled">Toggle</button>
  </form>
</template>
