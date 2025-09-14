import intlTelInput from "../intl-tel-input";
//* Keep the TS imports separate, as the above line gets substituted in the reactWithUtils build process.
import { Iti } from "../intl-tel-input";
import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import { SomeOptions } from "../modules/types/public-api";

// make this available as a named export, so react users can access globals like intlTelInput.utils
export { intlTelInput };

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "onInput">;

type ItiProps = {
  initialValue?: string;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (country: string) => void;
  onChangeValidity?: (valid: boolean) => void;
  onChangeErrorCode?: (errorCode: number | null) => void;
  usePreciseValidation?: boolean;
  initOptions?: SomeOptions;
  inputProps?: InputProps;
  disabled?: boolean | undefined;
};

export type IntlTelInputRef = {
  getInstance: () => Iti | null;
  getInput: () => HTMLInputElement | null;
}

const IntlTelInput = forwardRef(function IntlTelInput({
  initialValue = "",
  onChangeNumber = () => {},
  onChangeCountry = () => {},
  onChangeValidity = () => {},
  onChangeErrorCode = () => {},
  usePreciseValidation = false,
  initOptions = {},
  inputProps = {},
  disabled = undefined,
}: ItiProps, ref: React.ForwardedRef<IntlTelInputRef>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<Iti | null>(null);

  // expose the instance and input ref to the parent component
  useImperativeHandle(ref, () => ({
    getInstance: () => itiRef.current,
    getInput: () => inputRef.current,
  }));

  const update = useCallback((): void => {
    const num = itiRef.current?.getNumber() || "";
    const countryIso = itiRef.current?.getSelectedCountryData().iso2 || "";
    // note: this number will be in standard E164 format, but any container component can use
    // intlTelInput.utils.formatNumber() to convert this to another format
    // as well as intlTelInput.utils.getNumberType() etc. if need be
    onChangeNumber(num);
    onChangeCountry(countryIso);

    if (itiRef.current) {
      const isValid = usePreciseValidation ? itiRef.current.isValidNumberPrecise() : itiRef.current.isValidNumber();
      if (isValid) {
        onChangeValidity(true);
        onChangeErrorCode(null);
      } else {
        const errorCode = itiRef.current.getValidationError();
        onChangeValidity(false);
        onChangeErrorCode(errorCode);
      }
    }
  }, [onChangeCountry, onChangeErrorCode, onChangeNumber, onChangeValidity, usePreciseValidation]);

  useEffect(() => {
    if (inputRef.current) {
      itiRef.current = intlTelInput(inputRef.current, initOptions);
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

  return (
    <input
      type="tel"
      ref={inputRef}
      onInput={update}
      defaultValue={initialValue}
      {...inputProps}
    />
  );
});

export default IntlTelInput;