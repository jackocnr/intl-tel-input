<script module lang="ts">
  import intlTelInput from "intl-tel-input";
  import utils from "intl-tel-input/utils";
  intlTelInput.utils = utils as typeof intlTelInput.utils;
  export { intlTelInput };
</script>

<script lang="ts">
  import IntlTelInput from "./IntlTelInput.svelte";
  import type { ComponentProps } from "svelte";
  import type { Iti } from "intl-tel-input";

  let { ...props }: ComponentProps<typeof IntlTelInput> = $props();
  let inner: ReturnType<typeof IntlTelInput> | undefined = $state();

  export function getInstance(): Iti | undefined {
    return inner?.getInstance();
  }
  export function getInput(): HTMLInputElement | undefined {
    return inner?.getInput();
  }
</script>

<IntlTelInput bind:this={inner} {...props} />
