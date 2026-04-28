<script>
  import IntlTelInput, { intlTelInput } from "../../src/IntlTelInputWithUtils.svelte";

  const getErrorMessage = (errorCode) => {
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

  let isValid = $state(null);
  let number = $state(null);
  let errorCode = $state(null);
  let notice = $state(null);

  let intlTelInputRef = $state();

  const handleSetNumber = () => {
    intlTelInputRef?.getInstance()?.setNumber("+14155552671");
  };

  const handleSubmit = () => {
    if (isValid) {
      notice = `Valid number: ${number}`;
    } else {
      const errorMessage = getErrorMessage(errorCode);
      notice = `Error: ${errorMessage}`;
    }
  };
</script>

<form>
  <div class="d-flex align-items-start gap-2">
    <IntlTelInput
      bind:this={intlTelInputRef}
      onChangeNumber={(n) => number = n}
      onChangeValidity={(v) => isValid = v}
      onChangeErrorCode={(e) => errorCode = e}
      initialCountry="us"
      inputProps={{ class: "form-control" }}
      searchInputClass="form-control"
    />
    <button class="btn btn-primary" type="button" onclick={handleSetNumber}>
      Set Number
    </button>
    <button class="btn btn-primary" type="button" onclick={handleSubmit}>Validate</button>
  </div>
  {#if notice}
    <div class="notice">{notice}</div>
  {/if}
</form>
