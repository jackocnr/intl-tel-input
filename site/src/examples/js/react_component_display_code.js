import React, { useState } from "react";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [showValidation, setShowValidation] = useState(false);

  let invalidMsg = null;
  if (showValidation && !isValid) {
    // your logic to derive the invalid message
    invalidMsg = deriveInvalidMsg(number, errorCode);
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