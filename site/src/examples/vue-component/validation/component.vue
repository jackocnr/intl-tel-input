<script setup>
  import { computed, ref } from "vue";
  import IntlTelInput from "@intl-tel-input/vue";
  import { getErrorMessage } from "../../../js/getErrorMessage";
  import { initialCountryLookup } from "../../../js/initialCountryLookup";

  const number = ref("");
  const isValid = ref(false);
  const errorCode = ref(null);
  const showValidation = ref(false);
  const submitted = ref(false);
  const toastMessage = ref("");
  const toastDivRef = ref(null);

  const inputValidityClass = computed(() => {
    if (!showValidation.value) return "";
    return isValid.value ? "is-valid" : "is-invalid";
  });

  const invalidMsg = computed(() => {
    if (!showValidation.value || isValid.value) return null;
    return getErrorMessage(number.value, errorCode.value);
  });

  const validMsg = computed(() => {
    const showValid =
      showValidation.value && isValid.value && submitted.value;
    return showValid ? `Full number: ${number.value}` : null;
  });

  const handleChangeNumber = (newNumber) => {
    submitted.value = false;
    number.value = newNumber;
  };

  const handleBlur = () => {
    showValidation.value = true;
  };

  const handleSubmit = () => {
    showValidation.value = true;
    submitted.value = true;
  };

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
  <form @submit.prevent="handleSubmit" novalidate>
    <label for="phone" class="form-label">Phone number</label>
    <div class="d-flex gap-2">
      <div class="demo-input-wrap position-relative">
        <div class="toast-container demo-toast-container">
          <div ref="toastDivRef" class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
            <div class="d-flex">
              <div class="toast-body"><template v-if="toastMessage">{{ toastMessage }} (see <a href="/docs/options#strictmode" class="link-light">strictMode</a>)</template></div>
              <button type="button" class="btn-close btn-close-white me-2" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
        <IntlTelInput
          @change-number="handleChangeNumber"
          @change-validity="isValid = $event"
          @change-error-code="errorCode = $event"
          @strict-reject="handleStrictReject"
          :separate-dial-code="true"
          :strict-mode="true"
          :strict-reject-animation="true"
          :initial-country-lookup="initialCountryLookup"
          :load-utils="() => import('<%= cacheBust(`/intl-tel-input/js/utils.js`) %>')"
          search-input-class="form-control"
          :input-props="{
            id: 'phone',
            name: 'phone',
            title: 'Enter your phone number',
            onBlur: handleBlur,
            class: `form-control ${inputValidityClass}`,
          }"
        />
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
    <div v-if="invalidMsg" class="invalid-feedback d-block">{{ invalidMsg }}</div>
    <div v-if="validMsg" class="valid-feedback d-block">{{ validMsg }}</div>
  </form>
</template>
