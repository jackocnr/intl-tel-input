<script module lang="ts">
  import intlTelInput, { type Iti } from "intl-tel-input";
  export { intlTelInput };
</script>

<script lang="ts">
  // Resolves to IntlTelInput.svelte.d.ts (the type declaration file for this component).
  import type { Props } from "./IntlTelInput.svelte";
  import type { SomeOptions } from "intl-tel-input";
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
    onOpenCountryDropdown,
    onCloseCountryDropdown,
    onStrictReject,
    ...initOptions
  } = $props() as Props;

  type StrictRejectDetail = {
    source: "key" | "paste";
    rejectedInput: string;
    reason: "invalid" | "max-length";
  };

  // State
  let inputElement: HTMLInputElement | undefined = $state();
  let instance: Iti | undefined = $state();
  // Classes the plugin adds directly to the input (e.g. iti__tel-input)
  let pluginInputClasses = $state("");
  let lastEmittedNumber: string | undefined = $state();
  let lastEmittedCountry: string | undefined = $state();
  let lastEmittedValidity: boolean | undefined = $state();
  let lastEmittedErrorCode: number | null | undefined = $state();
  let hasInitialized = $state(false);
  // if an input event fires before utils has loaded, we defer the update until the promise resolves
  let pendingUpdate = false;

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
    // if utils has not loaded yet, isValidNumber/getValidationError will throw. defer until the promise resolves.
    if (!intlTelInput.utils) {
      pendingUpdate = true;
      return;
    }
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
    // if utils has not loaded yet, getNumber will throw. defer until the promise resolves.
    if (!intlTelInput.utils) {
      pendingUpdate = true;
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

  const handleOpenDropdown = (): void => onOpenCountryDropdown?.();
  const handleCloseDropdown = (): void => onCloseCountryDropdown?.();
  const handleStrictReject = (e: Event): void => {
    const { source, rejectedInput, reason } = (e as CustomEvent<StrictRejectDetail>).detail;
    onStrictReject?.(source, rejectedInput, reason);
  };

  // Lifecycle
  onMount(() => {
    if (inputElement) {
      instance = intlTelInput(inputElement, initOptions as SomeOptions);
      pluginInputClasses = inputElement.className;
      if (disabled) instance.setDisabled(disabled);
      if (readonly) instance.setReadonly(readonly);

      inputElement.addEventListener("open:countrydropdown", handleOpenDropdown);
      inputElement.addEventListener("close:countrydropdown", handleCloseDropdown);
      inputElement.addEventListener("strict:reject", handleStrictReject);

      lastEmittedCountry = instance.getSelectedCountryData()?.iso2 ?? "";
      hasInitialized = true;

      // wait for utils to load before calling methods that require it (getNumber, setNumber, isValidNumber, etc.)
      instance.promise.then(() => {
        if (!instance?.isActive()) return;
        if (initialValue) instance.setNumber(initialValue);
        // if an input event fired during the utils-loading gap, replay it now so the skipped emissions fire.
        // otherwise seed silently so we don't fire change callbacks on initial mount.
        if (pendingUpdate) {
          pendingUpdate = false;
          updateCountry();
        } else {
          lastEmittedNumber = instance.getNumber() ?? "";
          const initialValid = isValid();
          if (initialValid !== null) {
            lastEmittedValidity = !!initialValid;
            lastEmittedErrorCode = initialValid ? null : instance.getValidationError();
          }
        }
      });
    }
  });

  onDestroy(() => {
    if (inputElement) {
      inputElement.removeEventListener("open:countrydropdown", handleOpenDropdown);
      inputElement.removeEventListener("close:countrydropdown", handleCloseDropdown);
      inputElement.removeEventListener("strict:reject", handleStrictReject);
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

  // Watch value prop changes (only after initialization).
  // If value is undefined, the component is uncontrolled — do not touch the input
  // (otherwise we would clobber any initialValue with an empty string on mount).
  $effect(() => {
    if (!hasInitialized || !instance || value === undefined) {
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
      } else if (key === "class") {
        rest[key] = `${pluginInputClasses} ${val}`;
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
  oninput={updateCountry}
/>
