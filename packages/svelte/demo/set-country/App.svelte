<script>
  import IntlTelInput from "../../src/IntlTelInputWithUtils.svelte";

  let country = $state("us");
  let intlTelInputRef = $state();

  const handleSetCountry = () => {
    intlTelInputRef?.getInstance()?.setCountry("gb");
  };
</script>

<form>
  <div class="d-flex align-items-start gap-2">
    <IntlTelInput
      bind:this={intlTelInputRef}
      onChangeCountry={(c) => country = c}
      initialCountry="us"
      inputProps={{ class: "form-control" }}
      searchInputClass="form-control"
    />
    <button class="btn btn-primary" type="button" onclick={handleSetCountry}>
      Set Country to GB
    </button>
  </div>
  <p>Current country (per parent state): {country}</p>
</form>
