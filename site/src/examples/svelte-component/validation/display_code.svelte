<script>
  import IntlTelInput from "@intl-tel-input/svelte";
  import "intl-tel-input/styles";

  const geoIpLookup = async () => {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    return data.country_code;
  };

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(null);
  let showValidation = $state(false);
  let submitted = $state(false);

  const invalidMsg = $derived.by(() => {
    if (!showValidation || isValid) return null;
    // your code here to map the errorCode to a user-facing message
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

<form onsubmit={handleSubmit}>
  <label for="phone">Phone number</label>
  <IntlTelInput
    onChangeNumber={handleChangeNumber}
    onChangeValidity={(v) => (isValid = v)}
    onChangeErrorCode={(e) => (errorCode = e)}
    initialCountry="auto"
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
