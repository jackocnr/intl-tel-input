<script lang="ts">
  import intlTelInput from "../intl-tel-input";
  import type { Iti } from "../intl-tel-input";
  import type { SomeOptions } from "../modules/types/public-api";
  import { onMount, onDestroy } from "svelte";

  // Props
  let {
    disabled = false,
    inputProps = {},
    options = {},
    value = "",
    onchangeNumber,
    onchangeCountry,
    onchangeValidity,
    onchangeErrorCode,
  }: {
    disabled?: boolean;
    inputProps?: Record<string, unknown>;
    options?: SomeOptions;
    value?: string;
    onchangeNumber?: (number: string) => void;
    onchangeCountry?: (country: string) => void;
    onchangeValidity?: (valid: boolean) => void;
    onchangeErrorCode?: (errorCode: number | null) => void;
  } = $props();

  // State
  let inputElement: HTMLInputElement | undefined = $state();
  let instance: Iti | undefined = $state();
  let wasPreviouslyValid: boolean | null = $state(null);
  let hasInitialized = $state(false);

  // Validation helper
  const isValid = (): boolean | null => {
    if (!instance) return null;
    return options.strictMode
      ? instance.isValidNumberPrecise()
      : instance.isValidNumber();
  };

  // Update handlers
  const updateValidity = () => {
    const isCurrentlyValid = isValid();
    if (wasPreviouslyValid !== isCurrentlyValid) {
      wasPreviouslyValid = isCurrentlyValid;
      onchangeValidity?.(!!isCurrentlyValid);
      onchangeErrorCode?.(isCurrentlyValid ? null : instance!.getValidationError());
    }
  };

  const updateValue = () => {
    onchangeNumber?.(instance?.getNumber() ?? "");
    updateValidity();
  };

  const updateCountry = () => {
    onchangeCountry?.(instance?.getSelectedCountryData().iso2 ?? "");
    updateValue();
  };

  // Lifecycle
  onMount(() => {
    if (inputElement) {
      instance = intlTelInput(inputElement, options);
      if (value) instance.setNumber(value);
      if (disabled) instance.setDisabled(disabled);
      wasPreviouslyValid = isValid();
      hasInitialized = true;
    }
  });

  onDestroy(() => {
    instance?.destroy();
  });

  // Watch disabled prop changes (only after initialization)
  $effect(() => {
    if (hasInitialized && instance) {
      instance.setDisabled(disabled);
    }
  });

  // Expose instance and input for parent access
  export function getInstance(): Iti | undefined {
    return instance;
  }
  export function getInput(): HTMLInputElement | undefined {
    return inputElement;
  }
</script>

<input
  bind:this={inputElement}
  type="tel"
  oncountrychange={updateCountry}
  oninput={updateValue}
  {...inputProps}
/>
