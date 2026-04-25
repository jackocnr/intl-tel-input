<script setup>
  import IntlTelInput from "../../../../../vue/dist/IntlTelInput.js";
</script>

<template>
  <label for="phone" class="form-label">Phone number</label>
  <div class="demo-input-wrap">
    <IntlTelInput
      :separate-dial-code="true"
      initial-value="+447733312345"
      :load-utils="() => import('<%= cacheBust(`/intl-tel-input/js/utils.js`) %>')"
      search-input-class="form-control"
      :input-props="{
        id: 'phone',
        name: 'phone',
        title: 'Enter your phone number',
        class: 'form-control',
      }"
    />
  </div>
</template>
