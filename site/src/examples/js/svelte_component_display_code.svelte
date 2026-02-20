<script>
  import IntlTelInput from "intl-tel-input/svelteWithUtils";
  import "intl-tel-input/styles";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      notice = `Valid number: ${number}`;
    } else {
      const errorMessage = errorMap[errorCode || 0];
      notice = `Error: ${errorMessage}`;
    }
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
  />
  <button type="submit">Validate</button>
  {#if notice}
    <div class="notice">{notice}</div>
  {/if}
</form>
