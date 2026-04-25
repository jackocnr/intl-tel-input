<script>
  import IntlTelInput from "../../../../../svelte/src/IntlTelInput.svelte";
</script>

<label for="phone" class="form-label">Phone number</label>
<div class="demo-input-wrap">
  <IntlTelInput
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
