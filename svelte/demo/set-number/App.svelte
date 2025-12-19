<script>
  import IntlTelInput from "../../src/intl-tel-input/IntlTelInputWithUtils.svelte";

  const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  let isValid = $state(null);
  let number = $state(null);
  let errorCode = $state(null);
  let notice = $state(null);

  let intlTelInputRef = $state();

  const handleSetNumber = () => {
    intlTelInputRef?.getInstance()?.setNumber("+14155552671");
  };

  const handleSubmit = () => {
    if (isValid) {
      notice = `Valid number: ${number}`;
    } else {
      const errorMessage = errorMap[errorCode || 0] || "Invalid number";
      notice = `Error: ${errorMessage}`;
    }
  };
</script>

<form>
  <IntlTelInput
    bind:this={intlTelInputRef}
    onchangeNumber={(n) => number = n}
    onchangeValidity={(v) => isValid = v}
    onchangeErrorCode={(e) => errorCode = e}
    options={{ initialCountry: 'us' }}
  />
  <button class="button" type="button" onclick={handleSetNumber}>
    Set Number
  </button>
  <button class="button" type="button" onclick={handleSubmit}>Validate</button>
  {#if notice}
    <div class="notice">{notice}</div>
  {/if}
</form>
