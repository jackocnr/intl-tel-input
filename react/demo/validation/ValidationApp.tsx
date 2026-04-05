import React, { useState, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput, { intlTelInput } from "../../src/reactWithUtils";

const getErrorMessage = (errorCode: number | null): string => {
  const genericError = "Invalid number";
  if (errorCode === null) return genericError;
  const { validationError } = intlTelInput.utils!;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid country code",
    [validationError.TOO_SHORT]: "Too short",
    [validationError.TOO_LONG]: "Too long",
    [validationError.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

const App = (): ReactElement => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [number, setNumber] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
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
      <IntlTelInput
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initialCountry="us"
      />
      <button className="button" type="button" onClick={handleSubmit}>Validate</button>
      {notice && <div className="notice">{notice}</div>}
    </form>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}