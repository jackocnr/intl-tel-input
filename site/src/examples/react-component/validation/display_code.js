import React, { useState } from "react";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";

const geoIpLookup = (success, failure) => {
  fetch("https://ipapi.co/json")
    .then(res => res.json())
    .then(data => success(data.country_code))
    .catch(() => failure());
};

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let invalidMsg = null;
  if (showValidation && !isValid) {
    invalidMsg = yourCodeToDeriveErrorMessage(number, errorCode);
  }

  const validMsg = showValidation && isValid && submitted
    ? `Full number: ${number}`
    : null;

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone">Phone number</label>
      <IntlTelInput
        onChangeNumber={handleChangeNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initialCountry="auto"
        separateDialCode
        strictMode
        strictRejectAnimation
        geoIpLookup={geoIpLookup}
        loadUtils={() => import("intl-tel-input/utils")}
        inputProps={{
          id: "phone",
          onBlur: () => setShowValidation(true),
        }}
      />
      <button type="submit">Submit</button>
      {invalidMsg && (
        <div className="invalid">{invalidMsg}</div>
      )}
      {validMsg && (
        <div className="valid">{validMsg}</div>
      )}
    </form>
  );
};
export default App;