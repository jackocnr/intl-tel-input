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

  const invalidMsg = $derived.by(() => {
    if (!showValidation || isValid) return null;
    return yourCodeToDeriveErrorMessage(number, errorCode);
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
    initialCountry="auto"
    separateDialCode={true}
    strictMode={true}
    {geoIpLookup}
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
