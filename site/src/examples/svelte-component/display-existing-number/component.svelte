<script>
  import IntlTelInput from "@intl-tel-input/svelte";

  let toastMessage = $state("");
  let toastDivRef;

  const handleStrictReject = (source, rejectedInput, reason) => {
    if (!toastDivRef) return;
    if (reason === "max-length") {
      toastMessage = "Maximum length reached for this country";
    } else if (source === "paste") {
      toastMessage = "Stripped invalid characters from pasted text";
    } else {
      toastMessage = `Character not allowed: "${rejectedInput}"`;
    }
    window.bootstrap.Toast.getOrCreateInstance(toastDivRef).show();
  };
</script>

<label for="phone" class="form-label">Phone number</label>
<div class="demo-input-wrap position-relative">
  <div class="toast-container demo-toast-container">
    <div bind:this={toastDivRef} class="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
      <div class="d-flex">
        <div class="toast-body">{#if toastMessage}{toastMessage} (see <a href="/docs/options#strictmode" class="link-light">strictMode</a>){/if}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
  <IntlTelInput
    onStrictReject={handleStrictReject}
    initialValue="+447733312345"
    loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
    searchInputClass="form-control"
    inputProps={{
      id: "phone",
      name: "phone",
      title: "Enter your phone number",
      class: "form-control",
    }}
  />
</div>
