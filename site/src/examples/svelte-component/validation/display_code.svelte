<script>
  import IntlTelInput from "intl-tel-input/svelte";
  import "intl-tel-input/styles";

  const geoIpLookup = (success, failure) => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => failure());
  };

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(null);
  let showValidation = $state(false);
  let submitted = $state(false);

  const invalidMsg = $derived.by(() => {
    if (!showValidation || isValid) return null;
    return yourCodeToDeriveErrorMessage(number, errorCode);
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

<form onsubmit={handleSubmit}>
  <label for="phone">Phone number</label>
  <IntlTelInput
    onChangeNumber={handleChangeNumber}
    onChangeValidity={(v) => (isValid = v)}
    onChangeErrorCode={(e) => (errorCode = e)}
    initialCountry="auto"
    separateDialCode={true}
    strictMode={true}
    strictRejectAnimation={true}
    {geoIpLookup}
    loadUtils={() => import("intl-tel-input/utils")}
    inputProps={{
      id: "phone",
      onblur: () => (showValidation = true),
    }}
  />
  <button type="submit">Submit</button>
  {#if invalidMsg}
    <div class="invalid">{invalidMsg}</div>
  {/if}
  {#if validMsg}
    <div class="valid">{validMsg}</div>
  {/if}
</form>
