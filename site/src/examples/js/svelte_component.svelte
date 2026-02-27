<script>
  import IntlTelInput from "../../../../svelte/src/intl-tel-input/IntlTelInput.svelte";

  const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  let number = $state("");
  let isValid = $state(false);
  let errorCode = $state(0);
  let showValidation = $state(false);
  let submitted = $state(false);

  const inputValidityClass = $derived.by(() => {
    if (!showValidation) return "";
    return number && isValid ? "is-valid" : "is-invalid";
  });

  const invalidMsg = $derived.by(() => {
    if (!showValidation || isValid) return null;
    return number
      ? errorMap[errorCode || 0] || "Invalid number"
      : "Please enter a number";
  });

  const validMsg = $derived.by(() => {
    const showValid = showValidation && number && isValid && submitted;
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

<form onsubmit={handleSubmit} class="row g-2" novalidate>
  <div class="col-auto">
    <IntlTelInput
      onChangeNumber={handleChangeNumber}
      onChangeValidity={(v) => (isValid = v)}
      onChangeErrorCode={(e) => (errorCode = e)}
      initOptions={{
        initialCountry: "us",
        loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
        searchInputClass: "form-control",
      }}
      inputProps={{
        name: "phone",
        title: "Enter your phone number",
        required: true,
        onblur: () => (showValidation = true),
        class: `form-control ${inputValidityClass}`,
      }}
    />
    {#if invalidMsg}
      <div class="invalid-feedback d-block">{invalidMsg}</div>
    {/if}
    {#if validMsg}
      <div class="valid-feedback d-block">{validMsg}</div>
    {/if}
  </div>
  <div class="col-auto">
    <button class="btn btn-primary" type="submit">Submit</button>
  </div>
</form>
