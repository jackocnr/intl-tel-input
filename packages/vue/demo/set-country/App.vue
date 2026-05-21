<script setup>
import { ref } from "vue";
import IntlTelInput from "../../src/indexWithUtils";

const country = ref("us");
const intlTelInputRef = ref(null);

const handleSetCountry = () => {
  intlTelInputRef.value?.instance?.setSelectedCountry("gb");
};
</script>

<template>
  <form>
    <div class="d-flex align-items-start gap-2">
      <IntlTelInput
        ref="intlTelInputRef"
        @changeCountry="country = $event"
        initialCountry="us"
        :input-props="{ class: 'form-control' }"
        search-input-class="form-control"
      />
      <button class="btn btn-primary" type="button" @click="handleSetCountry">
        Set Country to GB
      </button>
    </div>
    <p>Current country (per parent state): {{ country }}</p>
  </form>
</template>
