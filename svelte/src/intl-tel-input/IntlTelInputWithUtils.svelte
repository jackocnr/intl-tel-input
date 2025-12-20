<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
import intlTelInput from "./intlTelInputWithUtils";
  import type { Iti } from "../intl-tel-input";
  import type { SomeOptions } from "../modules/types/public-api";
  import { onMount, onDestroy } from "svelte";

  // Props
  let {
    disabled = false,
    inputProps = {},
    options = {},
    value = "",
    onChangeNumber,
    onChangeCountry,
    onChangeValidity,
    onChangeErrorCode,
  }: {
    disabled?: boolean;
    inputProps?: Record<string, unknown>;
    options?: SomeOptions;
    value?: string;
    onChangeNumber?: (number: string) => void;
    onChangeCountry?: (country: string) => void;
    onChangeValidity?: (valid: boolean) => void;
    onChangeErrorCode?: (errorCode: number | null) => void;
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
      onChangeValidity?.(!!isCurrentlyValid);
      onChangeErrorCode?.(isCurrentlyValid ? null : instance!.getValidationError());
    }
  };

  const updateValue = () => {
    onChangeNumber?.(instance?.getNumber() ?? "");
    updateValidity();
  };

  const updateCountry = () => {
    onChangeCountry?.(instance?.getSelectedCountryData().iso2 ?? "");
    updateValue();
  };

  // Lifecycle
  onMount(() => {
    if (inputElement) {
      instance = intlTelInput(inputElement, options);
      inputElement.addEventListener("countrychange", updateCountry);
      if (value) instance.setNumber(value);
      if (disabled) instance.setDisabled(disabled);
      wasPreviouslyValid = isValid();
      hasInitialized = true;
    }
  });

  onDestroy(() => {
    if (inputElement) {
      inputElement.removeEventListener("countrychange", updateCountry);
    }
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
  oninput={updateValue}
  {...inputProps}
/>
