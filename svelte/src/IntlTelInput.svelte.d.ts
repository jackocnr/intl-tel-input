// Hand-written because svelte2tsx can't generate correct prop types for Svelte 5's $props() rune.
// See: https://github.com/sveltejs/svelte/discussions/13164
import type { Component } from "svelte";
import type { Iti, SomeOptions } from "intl-tel-input";
import intlTelInput from "intl-tel-input";

export type Props = SomeOptions & {
  disabled?: boolean;
  readonly?: boolean;
  inputProps?: Record<string, unknown>;
  initialValue?: string;
  value?: string | null;
  usePreciseValidation?: boolean;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (country: string) => void;
  onChangeValidity?: (valid: boolean) => void;
  onChangeErrorCode?: (errorCode: number | null) => void;
};

export { intlTelInput };

declare const IntlTelInput: Component<
  Props,
  {
    getInstance: () => Iti | undefined;
    getInput: () => HTMLInputElement | undefined;
  }
>;

export default IntlTelInput;
