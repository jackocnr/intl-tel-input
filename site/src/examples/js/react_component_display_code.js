import React, { useState } from "react";
import IntlTelInput, { intlTelInput } from "intl-tel-input/react";
import "intl-tel-input/styles";

const getErrorMessage = (number, errorCode) => {
  if (!number) return "Please enter a number";
  const genericError = "Invalid number";
  const { validationError } = intlTelInput.utils;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [validationError.TOO_SHORT]: "Too short",
    [validationError.TOO_LONG]: "Too long",
    [validationError.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  let invalidMsg = null;
  if (showValidation && !isValid) {
    invalidMsg = getErrorMessage(number, errorCode);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowValidation(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <IntlTelInput
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initialCountry="us"
        loadUtils={() => import("intl-tel-input/utils")}
        inputProps={{
          onBlur: () => setShowValidation(true),
        }}
      />
      <button type="submit">Submit</button>
      {invalidMsg && (
        <div className="invalid">{invalidMsg}</div>
      )}
    </form>
  );
};
export default App;