<script>
  import IntlTelInput, { intlTelInput } from "../../../../svelte/src/intl-tel-input/IntlTelInput.svelte";

  const getErrorMessage = (number, errorCode) => {
    if (!number) return "Please enter a number";
    const genericError = "Invalid number";
    const { validationError } = intlTelInput.utils;
    const errorMap = {
      [validationError.INVALID_COUNTRY_CODE]: "Invalid country code",
      [validationError.TOO_SHORT]: "Too short",
      [validationError.TOO_LONG]: "Too long",
      [validationError.INVALID_LENGTH]: genericError,
    };
    return errorMap[errorCode] || genericError;
  };

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(null);
  let showValidation = $state(false);
  let submitted = $state(false);

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
</script>

<form onsubmit={handleSubmit} class="row g-2" novalidate>
  <div class="col-auto">
    <IntlTelInput
      onChangeNumber={handleChangeNumber}
      onChangeValidity={(v) => (isValid = v)}
      onChangeErrorCode={(e) => (errorCode = e)}
      initialCountry="us"
      loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
      searchInputClass="form-control"
      inputProps={{
        name: "phone",
        title: "Enter your phone number",
        onblur: () => (showValidation = true),
        class: `form-control ${inputValidityClass}`,
      }}
    />
    {#if invalidMsg}
      <div class="invalid-feedback d-block">{invalidMsg}</div>
    {/if}
    {#if validMsg}
      <div class="valid-feedback d-block">{validMsg}</div>
    {/if}
  </div>
  <div class="col-auto">
    <button class="btn btn-primary" type="submit">Submit</button>
  </div>
</form>
