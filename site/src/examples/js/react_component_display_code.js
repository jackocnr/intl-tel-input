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

  let invalidMsg = null;
  if (showValidation && !isValid) {
    invalidMsg = yourCodeToDeriveErrorMessage(number, errorCode);
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
        initialCountry="auto"
        separateDialCode
        strictMode
        geoIpLookup={geoIpLookup}
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