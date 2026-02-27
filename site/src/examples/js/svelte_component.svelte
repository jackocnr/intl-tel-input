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
  let noticeMode = $state("off");

  const notice = $derived.by(() => {
    if (noticeMode === "off") {
      return null;
    }
    if (isValid) {
      return noticeMode === "submit" ? `Valid number: ${number}` : "";
    }
    if (number) {
      const errorMessage = errorMap[errorCode || 0] || "Invalid number";
      return `Error: ${errorMessage}`;
    }
    return "Please enter a number";
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    noticeMode = "submit";
  };
</script>

<form onsubmit={handleSubmit} class="row g-2">
  <div class="col-auto">
    <IntlTelInput
      onChangeNumber={(n) => (number = n)}
      onChangeValidity={(v) => (isValid = v)}
      onChangeErrorCode={(e) => (errorCode = e)}
      initialCountry="us"
      loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
      searchInputClass="form-control"
      inputProps={{
        class: "form-control",
        title: "Enter your phone number",
        onblur: () => (noticeMode = "blur"),
      }}
    />
  </div>
  <div class="col-auto">
    <button class="btn btn-primary" type="submit">Validate</button>
  </div>
  {#if notice}
    <div class="notice">{notice}</div>
  {/if}
</form>
