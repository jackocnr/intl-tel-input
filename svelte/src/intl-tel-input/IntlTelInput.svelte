<script lang="ts">
  import intlTelInput from "../intl-tel-input";
  import type { Iti } from "../intl-tel-input";
  import type { SomeOptions } from "../modules/types/public-api";
  import { onMount, onDestroy } from "svelte";

  type Props = SomeOptions & {
    disabled?: boolean;
    inputProps?: Record<string, unknown>;
    initialValue?: string;
    usePreciseValidation?: boolean;
    onChangeNumber?: (number: string) => void;
    onChangeCountry?: (country: string) => void;
    onChangeValidity?: (valid: boolean) => void;
    onChangeErrorCode?: (errorCode: number | null) => void;
  };

  // Props
  let {
    disabled = false,
    inputProps = {},
    usePreciseValidation = false,
    initialValue = "",
    onChangeNumber,
    onChangeCountry,
    onChangeValidity,
    onChangeErrorCode,
    ...initOptions
  } = $props() as Props;

  // State
  let inputElement: HTMLInputElement | undefined = $state();
  let instance: Iti | undefined = $state();
  let lastEmittedNumber: string | undefined = $state();
  let lastEmittedCountry: string | undefined = $state();
  let lastEmittedValidity: boolean | undefined = $state();
  let lastEmittedErrorCode: number | null | undefined = $state();
  let hasInitialized = $state(false);

  // Validation helper
  const isValid = (): boolean | null => {
    if (!instance) return null;
    return usePreciseValidation
      ? instance.isValidNumberPrecise()
      : instance.isValidNumber();
  };

  // Update handlers
  const updateValidity = () => {
    if (!instance) return;
    const isCurrentlyValid = isValid();
    if (isCurrentlyValid === null) return;

    const valid = !!isCurrentlyValid;
    const errorCode = valid ? null : instance.getValidationError();

    if (valid !== lastEmittedValidity) {
      lastEmittedValidity = valid;
      onChangeValidity?.(valid);
    }

    if (errorCode !== lastEmittedErrorCode) {
      lastEmittedErrorCode = errorCode;
      onChangeErrorCode?.(errorCode);
    }
  };

  const updateValue = () => {
    const number = instance?.getNumber() ?? "";
    if (number !== lastEmittedNumber) {
      lastEmittedNumber = number;
      onChangeNumber?.(number);
    }
    updateValidity();
  };

  const updateCountry = () => {
    const country = instance?.getSelectedCountryData().iso2 ?? "";
    if (country !== lastEmittedCountry) {
      lastEmittedCountry = country;
      onChangeCountry?.(country);
    }
    updateValue();
  };

  // Lifecycle
  onMount(() => {
    if (inputElement) {
      instance = intlTelInput(inputElement, initOptions as SomeOptions);
      inputElement.addEventListener("countrychange", updateCountry);
      if (initialValue) instance.setNumber(initialValue);
      if (disabled) instance.setDisabled(disabled);

      lastEmittedNumber = instance.getNumber() ?? "";
      lastEmittedCountry = instance.getSelectedCountryData().iso2 ?? "";

      const initialValid = isValid();
      if (initialValid !== null) {
        lastEmittedValidity = !!initialValid;
        lastEmittedErrorCode = initialValid ? null : instance.getValidationError();
      }
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

  const sanitizeInputProps = (props: Record<string, unknown>) => {
    // ignore keys that would break functionality
    const {
      value: _value,
      disabled: _disabled,
      ...rest
    } = props as Record<string, unknown>;

    return rest;
  };
</script>

<!-- inputProps must come first, so cannot override the other required props -->
<input
  {...sanitizeInputProps(inputProps)}
  bind:this={inputElement}
  type="tel"
  oninput={updateValue}
/>
