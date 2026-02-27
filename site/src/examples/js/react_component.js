import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../../build/intl-tel-input/react/IntlTelInput.js";

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let inputValidityClass = "";
  if (showValidation) {
    inputValidityClass = number && isValid ? "is-valid" : "is-invalid";
  }

  let invalidMsg = null;
  if (showValidation && !isValid) {
    invalidMsg = number
      ? errorMap[errorCode || 0] || "Invalid number"
      : "Please enter a number";
  }

  const showValid = showValidation && number && isValid && submitted;
  const validMsg = showValid ? `Full number: ${number}` : null;

  const handleChangeNumber = (newNumber) => {
    setSubmitted(false);
    setNumber(newNumber);
  };

  const handleSubmit = (e) => {
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

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);