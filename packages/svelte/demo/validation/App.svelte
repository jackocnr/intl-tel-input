<script>
  import IntlTelInput, { intlTelInput } from "../../src/IntlTelInputWithUtils.svelte";

  const getErrorMessage = (errorCode) => {
    const { VALIDATION_ERROR } = intlTelInput;
    switch (errorCode) {
      case VALIDATION_ERROR.INVALID_COUNTRY_CODE: return "Invalid dial code";
      case VALIDATION_ERROR.TOO_SHORT: return "Too short";
      case VALIDATION_ERROR.TOO_LONG: return "Too long";
      default: return "Invalid number";
    }
  };

  let isValid = $state(null);
  let number = $state(null);
  let errorCode = $state(null);
  let notice = $state(null);

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
      onChangeNumber={(n) => number = n}
      onChangeValidity={(v) => isValid = v}
      onChangeErrorCode={(e) => errorCode = e}
      initialCountry="us"
      inputProps={{ class: "form-control" }}
      searchInputClass="form-control"
    />
    <button class="btn btn-primary" type="button" onclick={handleSubmit}>Validate</button>
  </div>
  {#if notice}
    <div class="notice">{notice}</div>
  {/if}
</form>
