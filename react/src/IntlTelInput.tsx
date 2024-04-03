import React, { useRef, useEffect, ReactElement } from "react";
import intlTelInput, { Iti } from "../../src/js/intlTelInput";

const IntlTelInput = ({
  initialValue,
  onChangeNumber,
  onChangeCountry,
  onChangeValidity,
  onChangeErrorCode,
  usePreciseValidation,
  initOptions,
  inputProps,
}: {
  initialValue: string,
  onChangeNumber: (number: string) => void,
  onChangeCountry: (country: string) => void,
  onChangeValidity: (valid: boolean) => void,
  onChangeErrorCode: (errorCode: number | null) => void,
  usePreciseValidation: boolean,
  initOptions: SomeOptions,
  inputProps: object,
}): ReactElement => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<Iti | null>(null);
  
  const update = (): void => {
    const num = itiRef.current?.getNumber() || "";
    const countryIso = itiRef.current?.getSelectedCountryData().iso2 || "";
    // note: this number will be in standard E164 format, but any container component can use
    // intlTelInputUtils.formatNumber() to convert this to another format
    // as well as intlTelInputUtils.getNumberType() etc. if need be
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
  };
  
  useEffect(() => {
    // store a reference to the current input ref, which otherwise is already lost in the cleanup function
    const inputRefCurrent = inputRef.current;
    if (inputRefCurrent) {
    itiRef.current = intlTelInput(inputRefCurrent, initOptions);
      inputRefCurrent.addEventListener("countrychange", update);
    }
    return (): void => {
      if (inputRefCurrent) {
        inputRefCurrent.removeEventListener("countrychange", update);
      }
      itiRef.current?.destroy();
    };
  }, []);
  
  return (
    <input
      type="tel"
      ref={inputRef}
      onInput={update}
      defaultValue={initialValue}
      {...inputProps}
    />
  );
};

IntlTelInput.defaultProps = {
  initialValue: "",
  onChangeNumber: (): void => {},
  onChangeCountry: (): void => {},
  onChangeValidity: (): void => {},
  onChangeErrorCode: (): void => {},
  usePreciseValidation: false,
  initOptions: {},
  inputProps: {},
};

export default IntlTelInput;