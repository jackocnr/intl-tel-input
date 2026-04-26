<script>
  import { onMount } from "svelte";
  import IntlTelInput, { intlTelInput } from "../../../../../svelte/src/IntlTelInput.svelte";

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

  const geoIpLookup = async () => {
    const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
    const data = await res.json();
    return data.country_code;
  };

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(null);
  let showValidation = $state(false);
  let submitted = $state(false);
  let toastMessage = $state("");
  let itiRef;
  let toastDivRef;

  const inputValidityClass = $derived.by(() => {
    if (!showValidation) return "";
    return isValid ? "is-valid" : "is-invalid";
  });

  const invalidMsg = $derived.by(() => {
    if (!showValidation || isValid) return null;
    return getErrorMessage(number, errorCode);
  });

  const validMsg = $derived.by(() => {
    const showValid = showValidation && isValid && submitted;
    return showValid ? `Full number: ${number}` : null;
  });

  const handleChangeNumber = (newNumber) => {
    submitted = false;
    number = newNumber;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    showValidation = true;
    submitted = true;
  };

  onMount(() => {
    const input = itiRef?.getInput();
    if (!input || !toastDivRef || !window.bootstrap?.Toast) return;
    const toast = window.bootstrap.Toast.getOrCreateInstance(toastDivRef);
    input.addEventListener("strict:reject", (e) => {
      const { reason, rejectedInput, source } = e.detail;
      if (reason === "max-length") {
        toastMessage = "Maximum length reached for this country";
      } else if (source === "paste") {
        toastMessage = "Stripped invalid characters from pasted text";
      } else {
        toastMessage = `Character not allowed: "${rejectedInput}"`;
      }
      toast.show();
    });
  });
</script>

<form onsubmit={handleSubmit} novalidate>
  <label for="phone" class="form-label">Phone number</label>
  <div class="d-flex gap-2">
    <div class="demo-input-wrap position-relative">
      <div class="toast-container demo-toast-container">
        <div bind:this={toastDivRef} class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
          <div class="d-flex">
            <div class="toast-body">{toastMessage}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
      <IntlTelInput
        bind:this={itiRef}
        onChangeNumber={handleChangeNumber}
        onChangeValidity={(v) => (isValid = v)}
        onChangeErrorCode={(e) => (errorCode = e)}
        initialCountry="auto"
        {geoIpLookup}
        loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
        searchInputClass="form-control"
        inputProps={{
          id: "phone",
          name: "phone",
          title: "Enter your phone number",
          onblur: () => (showValidation = true),
          class: `form-control ${inputValidityClass}`,
        }}
      />
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </div>
  {#if invalidMsg}
    <div class="invalid-feedback d-block">{invalidMsg}</div>
  {/if}
  {#if validMsg}
    <div class="valid-feedback d-block">{validMsg}</div>
  {/if}
</form>
