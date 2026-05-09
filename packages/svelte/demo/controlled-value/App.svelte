<script>
  import IntlTelInput from "../../src/IntlTelInputWithUtils.svelte";

  let value = $state("");

  const populate = () => {
    value = "+14155552671";
  };

  const reset = () => {
    value = "";
  };
</script>

<form>
  <div class="d-flex align-items-start gap-2">
    <IntlTelInput
      {value}
      onChangeNumber={(n) => value = n}
      initialCountry="us"
      inputProps={{ class: "form-control" }}
      searchInputClass="form-control"
    />
    <button class="btn btn-primary" type="button" onclick={populate}>
      Populate Number
    </button>
    <button class="btn btn-secondary" type="button" onclick={reset}>
      Reset Number
    </button>
  </div>
  <p>Current bound value: {value || "(empty)"}</p>
</form>
