<script>
  import IntlTelInput from "@intl-tel-input/svelte";
  import "intl-tel-input/styles";
</script>

<label for="phone">Phone number</label>
<IntlTelInput
  initialValue="+447733312345"
  loadUtils={() => import("intl-tel-input/utils")}
  inputProps={{ id: "phone" }}
/>
