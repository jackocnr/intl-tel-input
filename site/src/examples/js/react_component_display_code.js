import React, { useState } from "react";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

const App = () => {
  const [isValid, setIsValid] = useState(null);
  const [number, setNumber] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [notice, setNotice] = useState(null);

  const handleSubmit = () => {
    if (isValid) {
      setNotice(`Valid number: ${number}`);
    } else {
      const errorMessage = errorMap[errorCode || 0];
      setNotice(`Error: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IntlTelInput
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initOptions={{
          initialCountry: "us",
          loadUtils: () => import("intl-tel-input/utils"),
        }}
      />
      <button className="button" type="submit">Validate</button>
      {notice && <div className="notice">{notice}</div>}
    </form>
  );
};
export default App;