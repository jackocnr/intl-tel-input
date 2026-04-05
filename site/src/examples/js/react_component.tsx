import React, { useState } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error resolved at build time.
import IntlTelInput, { intlTelInput } from "../../../build/intl-tel-input/react/IntlTelInput.js";

const getErrorMessage = (number: string, errorCode: number | null): string => {
  if (!number) return "Please enter a number";
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

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let inputValidityClass = "";
  if (showValidation) {
    inputValidityClass = number && isValid ? "is-valid" : "is-invalid";
  }

  let invalidMsg = null;
  if (showValidation && !isValid) {
    invalidMsg = getErrorMessage(number, errorCode);
  }

  const showValid = showValidation && number && isValid && submitted;
  const validMsg = showValid ? `Full number: ${number}` : null;

  const handleChangeNumber = (newNumber: string) => {
    setSubmitted(false);
    setNumber(newNumber);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2" noValidate>
      <div className="col-auto">
        <IntlTelInput
          onChangeNumber={handleChangeNumber}
          onChangeValidity={setIsValid}
          onChangeErrorCode={setErrorCode}
          initialCountry="us"
          // @ts-expect-error EJS-templated URL string, resolved at build time.
          loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
          searchInputClass="form-control"
          inputProps={{
            name: "phone",
            title: "Enter your phone number",
            required: true,
            onBlur: () => setShowValidation(true),
            className: `form-control ${inputValidityClass}`,
          }}
        />
        {invalidMsg && (
          <div className="invalid-feedback d-block">{invalidMsg}</div>
        )}
        {validMsg && (
          <div className="valid-feedback d-block">{validMsg}</div>
        )}
      </div>
      <div className="col-auto">
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  );
};

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);