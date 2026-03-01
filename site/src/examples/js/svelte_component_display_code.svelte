<script>
  import IntlTelInput from "intl-tel-input/svelteWithUtils";
  import "intl-tel-input/styles";

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(0);
  let showValidation = $state(false);

  const invalidMsg = $derived.by(() => {
    // your logic to derive invalid message
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
    options={{
      initialCountry: "us",
      loadUtils: () => import("intl-tel-input/utils"),
    }}
    inputProps={{
      onblur: () => (showValidation = true),
    }}
  />
  <button type="submit">Submit</button>
  {#if invalidMsg}
    <div class="invalid">{invalidMsg}</div>
  {/if}
</form>
