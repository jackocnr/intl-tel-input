<script>
  import IntlTelInput from "intl-tel-input/svelteWithUtils";
  import "intl-tel-input/styles";

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(0);
  let noticeMode = $state("off");

  const notice = $derived.by(() => {
    // Determine the notice message based on the current state
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    noticeMode = "submit";
  };
</script>

<form onsubmit={handleSubmit}>
  <IntlTelInput
    onChangeNumber={(n) => (number = n)}
    onChangeValidity={(v) => (isValid = v)}
    onChangeErrorCode={(e) => (errorCode = e)}
    initialCountry="us"
    loadUtils={() => import("intl-tel-input/utils")}
    inputProps={{
      onblur: () => (noticeMode = "blur"),
    }}
  />
  <button type="submit">Validate</button>
  {#if notice}
    <div class="notice">{notice}</div>
  {/if}
</form>
