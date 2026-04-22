// Hand-written because svelte2tsx can't generate correct prop types for Svelte 5's $props() rune.
// See: https://github.com/sveltejs/svelte/discussions/13164
import type { Component } from "svelte";
import type { Iti, SomeOptions } from "intl-tel-input";
import intlTelInput from "intl-tel-input";

export type StrictRejectSource = "key" | "paste";
export type StrictRejectReason = "invalid" | "max-length";

export type Props = SomeOptions & {
  disabled?: boolean;
  readonly?: boolean;
  inputProps?: Record<string, unknown>;
  initialValue?: string;
  value?: string | null;
  usePreciseValidation?: boolean;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (iso2: string) => void;
  onChangeValidity?: (isValid: boolean) => void;
  onChangeErrorCode?: (errorCode: number | null) => void;
  onOpenCountryDropdown?: () => void;
  onCloseCountryDropdown?: () => void;
  onStrictReject?: (source: StrictRejectSource, rejectedInput: string, reason: StrictRejectReason) => void;
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
