/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import IntlTelInput from '../build/IntlTelInput.esm';

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
      const errorMessage = errorMap[errorCode] || "Invalid number";
      setNotice(`Error: ${errorMessage}`);
    }
  };
  
  return (
    <form>
      <IntlTelInput
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initOptions={{
          initialCountry: "us",
          utilsScript: "../../build/js/utils.js",
        }}
      />
      <button type="button" onClick={handleSubmit}>Validate</button>
      {notice && <div className="notice">{notice}</div>}
    </form>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);