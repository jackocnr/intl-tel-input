<script setup>
import { ref } from "vue";
import IntlTelInput from "../../src/indexWithUtils";

const value = ref("");

const populate = () => {
  value.value = "+14155552671";
};

const reset = () => {
  value.value = "";
};
</script>

<template>
  <form>
    <div class="d-flex align-items-start gap-2">
      <IntlTelInput
        v-model="value"
        initialCountry="us"
        :input-props="{ class: 'form-control' }"
        search-input-class="form-control"
      />
      <button class="btn btn-primary" type="button" @click="populate">
        Populate Number
      </button>
      <button class="btn btn-secondary" type="button" @click="reset">
        Reset Number
      </button>
    </div>
    <p>Current bound value: {{ value || "(empty)" }}</p>
  </form>
</template>
