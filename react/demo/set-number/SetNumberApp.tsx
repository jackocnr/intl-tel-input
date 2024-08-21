import React, { useState, ReactElement, useRef } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../src/intl-tel-input/reactWithUtils";

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

const App = (): ReactElement => {
  const ref = useRef(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [number, setNumber] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  
  const handleSetNumber = (): void => {
    ref.current?.getInstance().setNumber("+14155552671");
  };
  
  const handleSubmit = (): void => {
    if (isValid) {
      setNotice(`Valid number: ${number}`);
    } else {
      const errorMessage = errorMap[errorCode || 0] || "Invalid number";
      setNotice(`Error: ${errorMessage}`);
    }
  };
  
  return (
    <form>
      <IntlTelInput
        ref={ref}
        onChangeNumber={setNumber}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initOptions={{
          initialCountry: "us",
        }}
      />
      <button className="button" type="button" onClick={handleSetNumber}>Set Number</button>
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