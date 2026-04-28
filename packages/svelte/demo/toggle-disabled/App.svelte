<script>
  import IntlTelInput from "../../src/IntlTelInputWithUtils.svelte";

  let isDisabled = $state(true);

  const toggleDisabled = () => {
    isDisabled = !isDisabled;
  };
</script>

<form>
  <div class="d-flex align-items-start gap-2">
    <IntlTelInput
      disabled={isDisabled}
      inputProps={{ class: "form-control" }}
      searchInputClass="form-control"
    />
    <button class="btn btn-primary" type="button" onclick={toggleDisabled}>Toggle</button>
  </div>
</form>
