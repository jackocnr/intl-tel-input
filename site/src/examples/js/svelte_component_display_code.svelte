<script>
  import IntlTelInput, { intlTelInput } from "intl-tel-input/svelte";
  import "intl-tel-input/styles";

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

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(null);
  let showValidation = $state(false);

  const invalidMsg = $derived.by(() => {
    if (!showValidation || isValid) return null;
    return getErrorMessage(number, errorCode);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    showValidation = true;
  };
</script>

<form onsubmit={handleSubmit}>
  <IntlTelInput
    onChangeNumber={(n) => (number = n)}
    onChangeValidity={(v) => (isValid = v)}
    onChangeErrorCode={(e) => (errorCode = e)}
    initialCountry="us"
    loadUtils={() => import("intl-tel-input/utils")}
    inputProps={{
      onblur: () => (showValidation = true),
    }}
  />
  <button type="submit">Submit</button>
  {#if invalidMsg}
    <div class="invalid">{invalidMsg}</div>
  {/if}
</form>
