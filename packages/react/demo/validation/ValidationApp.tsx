import React, { useState, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput, { intlTelInput } from "../../src/IntlTelInputWithUtils";
import type { ValidationError } from "intl-tel-input";

const getErrorMessage = (errorCode: ValidationError | null): string => {
  const genericError = "Invalid number";
  if (errorCode === null) return genericError;
  const { VALIDATION_ERROR } = intlTelInput;
  const errorMap: Record<string, string> = {
    [VALIDATION_ERROR.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [VALIDATION_ERROR.TOO_SHORT]: "Too short",
    [VALIDATION_ERROR.TOO_LONG]: "Too long",
    [VALIDATION_ERROR.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

const App = (): ReactElement => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [number, setNumber] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<ValidationError | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (): void => {
    if (isValid) {
      setNotice(`Valid number: ${number}`);
    } else {
      const errorMessage = getErrorMessage(errorCode);
      setNotice(`Error: ${errorMessage}`);
    }
  };

  return (
    <form>
      <div className="d-flex align-items-start gap-2">
        <IntlTelInput
          onChangeNumber={setNumber}
          onChangeValidity={setIsValid}
          onChangeErrorCode={setErrorCode}
          initialCountry="us"
          inputProps={{ className: "form-control" }}
          searchInputClass="form-control"
        />
        <button className="btn btn-primary" type="button" onClick={handleSubmit}>Validate</button>
      </div>
      {notice && <div className="notice">{notice}</div>}
    </form>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}