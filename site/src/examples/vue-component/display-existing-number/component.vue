<script setup>
  import { ref } from "vue";
  import IntlTelInput from "@intl-tel-input/vue";

  const toastMessage = ref("");
  const toastDivRef = ref(null);

  const handleStrictReject = (source, rejectedInput, reason) => {
    const toastEl = toastDivRef.value;
    if (!toastEl) return;
    if (reason === "max-length") {
      toastMessage.value = "Maximum length reached for this country";
    } else if (source === "paste") {
      toastMessage.value = "Stripped invalid characters from pasted text";
    } else {
      toastMessage.value = `Character not allowed: "${rejectedInput}"`;
    }
    window.bootstrap.Toast.getOrCreateInstance(toastEl).show();
  };
</script>

<template>
  <label for="phone" class="form-label">Phone number</label>
  <div class="demo-input-wrap position-relative">
    <div class="toast-container demo-toast-container">
      <div ref="toastDivRef" class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
        <div class="d-flex">
          <div class="toast-body"><template v-if="toastMessage">{{ toastMessage }} (see <a href="/docs/options#strictmode" class="link-light">strictMode</a>)</template></div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <IntlTelInput
      @strictReject="handleStrictReject"
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
