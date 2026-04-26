<script setup>
import { ref } from "vue";
import IntlTelInput from "../../src/indexWithUtils";

const isDisabled = ref(true);

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<template>
  <form>
    <IntlTelInput
      :disabled="isDisabled"
      :input-props="{ class: 'form-control' }"
      search-input-class="form-control"
    />
    <button class="btn btn-primary" type="button" @click="toggleDisabled">Toggle</button>
  </form>
</template>
