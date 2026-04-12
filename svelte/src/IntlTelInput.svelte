<script module lang="ts">
  import intlTelInput, { type Iti } from "intl-tel-input";
  export { intlTelInput };
</script>

<script lang="ts">
  // Resolves to IntlTelInput.svelte.d.ts (the type declaration file for this component).
  import type { Props } from "./IntlTelInput.svelte";
  import { onMount, onDestroy } from "svelte";

  // Props
  let {
    disabled = false,
    readonly = false,
    inputProps = {},
    usePreciseValidation = false,
    initialValue = "",
    value = undefined,
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
    if (!instance?.isActive()) {
      return;
    }
    const number = instance.getNumber() ?? "";
    if (number !== lastEmittedNumber) {
      lastEmittedNumber = number;
      onChangeNumber?.(number);
    }
    updateValidity();
  };

  const updateCountry = () => {
    if (!instance?.isActive()) {
      return;
    }
    const country = instance.getSelectedCountryData()?.iso2 ?? "";
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
      if (disabled) instance.setDisabled(disabled);
      if (readonly) instance.setReadonly(readonly);

      lastEmittedCountry = instance.getSelectedCountryData()?.iso2 ?? "";
      hasInitialized = true;

      // wait for utils to load before calling methods that require it (getNumber, setNumber, isValidNumber, etc.)
      instance.promise.then(() => {
        if (!instance?.isActive()) return;
        if (initialValue) instance.setNumber(initialValue);
        lastEmittedNumber = instance.getNumber() ?? "";
        const initialValid = isValid();
        if (initialValid !== null) {
          lastEmittedValidity = !!initialValid;
          lastEmittedErrorCode = initialValid ? null : instance.getValidationError();
        }
        // update all state values now that initialisation has finished (updateCountry calls updateValue which calls updateValidity)
        updateCountry();
      });
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

  // Watch readonly prop changes (only after initialization)
  $effect(() => {
    if (hasInitialized && instance) {
      instance.setReadonly(readonly);
    }
  });

  // Watch value prop changes (only after initialization)
  $effect(() => {
    if (!hasInitialized || !instance) {
      return;
    }
    const next = value ?? "";
    // wait for utils to load before calling methods that require it
    instance.promise.then(() => {
      if (!instance?.isActive()) return;
      const currentCanonical = instance.getNumber() ?? "";
      const isFocused = document.activeElement === inputElement;
      if (isFocused || currentCanonical === next) {
        return;
      }
      instance.setNumber(next);
      updateValidity();
    });
  });

  // Expose instance and input for parent access
  export function getInstance(): Iti | undefined {
    return instance;
  }
  export function getInput(): HTMLInputElement | undefined {
    return inputElement;
  }

  const warnInputProp = (prop: string): void => {
    console.warn(`intl-tel-input: ignoring inputProps.${prop} - see docs for more info.`);
  };

  const ignoredInputProps = new Set(["type", "value", "disabled", "readonly", "oninput"]);

  const sanitizeInputProps = (props: Record<string, unknown>) => {
    const rest: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(props)) {
      if (ignoredInputProps.has(key)) {
        warnInputProp(key);
      } else {
        rest[key] = val;
      }
    }
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
