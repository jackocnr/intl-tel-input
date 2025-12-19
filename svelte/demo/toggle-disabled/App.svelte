<script>
  import IntlTelInput from "../../src/intl-tel-input/IntlTelInputWithUtils.svelte";

  let isDisabled = $state(true);

  const toggleDisabled = () => {
    isDisabled = !isDisabled;
  };
</script>

<form>
  <IntlTelInput disabled={isDisabled} />
  <button class="button" type="button" onclick={toggleDisabled}>Toggle</button>
</form>
