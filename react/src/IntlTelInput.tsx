import intlTelInput, { Iti } from "intl-tel-input";
import type { SomeOptions } from "intl-tel-input";
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";

// make this available as a named export, so react users can access globals like intlTelInput.utils
export { intlTelInput };

const warnInputProp = (prop: string): void => {
  console.warn(`intl-tel-input: ignoring inputProps.${prop} - see docs for more info.`);
};

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "onInput">;

const noop = () => {};

type ItiProps = SomeOptions & {
  initialValue?: string;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (country: string) => void;
  onChangeValidity?: (valid: boolean) => void;
  onChangeErrorCode?: (errorCode: number | null) => void;
  usePreciseValidation?: boolean;
  inputProps?: InputProps;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
};

export type IntlTelInputRef = {
  getInstance: () => Iti | null;
  getInput: () => HTMLInputElement | null;
};

// Note: React v19 supports ref forwarding with function components, but we still need to use forwardRef to support React v18
const IntlTelInput = forwardRef(function IntlTelInput(
  {
    initialValue = "",
    onChangeNumber = noop,
    onChangeCountry = noop,
    onChangeValidity = noop,
    onChangeErrorCode = noop,
    usePreciseValidation = false,
    inputProps = {},
    disabled = undefined,
    readOnly = undefined,
    ...initOptions
  }: ItiProps,
  ref: React.ForwardedRef<IntlTelInputRef>,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<Iti | null>(null);
  const lastEmittedNumberRef = useRef<string>();
  const lastEmittedCountryRef = useRef<string>();
  const lastEmittedValidityRef = useRef<boolean>();
  const lastEmittedErrorCodeRef = useRef<number | null>();

  // expose the instance and input ref to the parent component
  useImperativeHandle(ref, () => ({
    getInstance: () => itiRef.current,
    getInput: () => inputRef.current,
  }));

  const update = useCallback((): void => {
    // if the instance is not valid (e.g. has been destroyed/unmounted), do not attempt to call any methods on it
    if (!itiRef.current?.isActive()) {
      return;
    }
    const num = itiRef.current.getNumber() || "";
    const countryIso = itiRef.current.getSelectedCountryData().iso2 || "";
    // note: this number will be in standard E164 format, but any container component can use
    // intlTelInput.utils.formatNumber() to convert this to another format
    // as well as intlTelInput.utils.getNumberType() etc. if need be
    if (num !== lastEmittedNumberRef.current) {
      lastEmittedNumberRef.current = num;
      onChangeNumber(num);
    }
    if (countryIso !== lastEmittedCountryRef.current) {
      lastEmittedCountryRef.current = countryIso;
      onChangeCountry(countryIso);
    }

    const isValid = usePreciseValidation
      ? itiRef.current.isValidNumberPrecise()
      : itiRef.current.isValidNumber();
    const errorCode = isValid ? null : itiRef.current.getValidationError();

    if (isValid !== lastEmittedValidityRef.current) {
      lastEmittedValidityRef.current = isValid;
      onChangeValidity(isValid);
    }
    if (errorCode !== lastEmittedErrorCodeRef.current) {
      lastEmittedErrorCodeRef.current = errorCode;
      onChangeErrorCode(errorCode);
    }
  }, [
    onChangeCountry,
    onChangeErrorCode,
    onChangeNumber,
    onChangeValidity,
    usePreciseValidation,
  ]);

  useEffect(() => {
    if (inputRef.current) {
      itiRef.current = intlTelInput(inputRef.current, initOptions as SomeOptions);
    }
    return (): void => {
      itiRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // store a reference to the current input ref, which otherwise is already lost in the cleanup function
    const inputRefCurrent = inputRef.current;
    if (inputRefCurrent) {
      inputRefCurrent.addEventListener("countrychange", update);
      // when plugin initialisation has finished (e.g. loaded utils script), update all the state values
      itiRef.current.promise.then(update);
    }
    return (): void => {
      if (inputRefCurrent) {
        inputRefCurrent.removeEventListener("countrychange", update);
      }
    };
  }, [update]);

  useEffect(() => {
    if (itiRef.current && disabled !== undefined) {
      itiRef.current.setDisabled(disabled);
    }
  }, [disabled]);

  useEffect(() => {
    if (itiRef.current && readOnly !== undefined) {
      itiRef.current.setReadonly(readOnly);
    }
  }, [readOnly]);

  // ignore keys that would break functionality
  const {
    value: _value,
    disabled: _disabled,
    ...sanitizedInputProps
  } = inputProps as unknown as Record<string, unknown>;
  if (_value !== undefined) warnInputProp("value");
  if (_disabled !== undefined) warnInputProp("disabled");

  return (
    <input
      {...(sanitizedInputProps as InputProps)}
      type="tel"
      ref={inputRef}
      onInput={update}
      defaultValue={initialValue}
    />
  );
});

export default IntlTelInput;
