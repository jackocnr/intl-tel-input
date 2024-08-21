import React, { useState, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../src/intl-tel-input/reactWithUtils";

const App = (): ReactElement => {
  const [isDisabled, setIsDisabled] = useState(true);

  const toggleDisabled = () => setIsDisabled(!isDisabled);

  return (
    <form>
      <IntlTelInput
        disabled={isDisabled}
      />
      <button className="button" type="button" onClick={toggleDisabled}>Toggle</button>
    </form>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}