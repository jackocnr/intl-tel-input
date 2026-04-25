<script setup>
  import { computed, onMounted, ref } from "vue";
  import IntlTelInput, { intlTelInput } from "../../../../../vue/dist/IntlTelInput.js";

  const getErrorMessage = (number, errorCode) => {
    if (!number) return "Please enter a number";
    const genericError = "Invalid number";
    const { validationError } = intlTelInput.utils;
    const errorMap = {
      [validationError.INVALID_COUNTRY_CODE]: "Invalid dial code",
      [validationError.TOO_SHORT]: "Too short",
      [validationError.TOO_LONG]: "Too long",
      [validationError.INVALID_LENGTH]: genericError,
    };
    return errorMap[errorCode] || genericError;
  };

  const geoIpLookup = (success, failure) => {
    fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`)
      .then((res) => res.json())
      .then((data) => success(data.country_code))
      .catch(() => failure());
  };

  const number = ref("");
  const isValid = ref(false);
  const errorCode = ref(null);
  const showValidation = ref(false);
  const submitted = ref(false);
  const toastMessage = ref("");
  const itiRef = ref(null);
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

  onMounted(() => {
    const input = itiRef.value?.input;
    const toastEl = toastDivRef.value;
    if (!input || !toastEl || !window.bootstrap?.Toast) return;
    const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
    input.addEventListener("strict:reject", (e) => {
      const { reason, rejectedInput, source } = e.detail;
      if (reason === "max-length") {
        toastMessage.value = "Maximum length reached for this country";
      } else if (source === "paste") {
        toastMessage.value = "Stripped invalid characters from pasted text";
      } else {
        toastMessage.value = `Character not allowed: "${rejectedInput}"`;
      }
      toast.show();
    });
  });
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <label for="phone" class="form-label">Phone number</label>
    <div class="d-flex gap-2 align-items-start">
      <div class="demo-input-wrap position-relative">
        <div class="toast-container demo-toast-container">
          <div ref="toastDivRef" class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
            <div class="d-flex">
              <div class="toast-body">{{ toastMessage }}</div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
        <IntlTelInput
          ref="itiRef"
          @changeNumber="handleChangeNumber"
          @changeValidity="isValid = $event"
          @changeErrorCode="errorCode = $event"
          initial-country="auto"
          :separate-dial-code="true"
          :strict-mode="true"
          :strict-reject-animation="true"
          :geo-ip-lookup="geoIpLookup"
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
        <div v-if="invalidMsg" class="invalid-feedback d-block">{{ invalidMsg }}</div>
        <div v-if="validMsg" class="valid-feedback d-block">{{ validMsg }}</div>
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </form>
</template>
