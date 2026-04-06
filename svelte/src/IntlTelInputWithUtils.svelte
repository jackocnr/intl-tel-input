<script module lang="ts">
  import intlTelInput from "intl-tel-input";
  import utils from "intl-tel-input/utils";
  intlTelInput.utils = utils as typeof intlTelInput.utils;
  export { intlTelInput };
</script>

<script lang="ts">
  import IntlTelInput from "./IntlTelInput.svelte";
  import type { ComponentProps } from "svelte";

  let { ...props }: ComponentProps<IntlTelInput> = $props();
</script>

<IntlTelInput {...props} />
