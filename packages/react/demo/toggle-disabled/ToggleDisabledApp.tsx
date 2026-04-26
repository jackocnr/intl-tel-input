import React, { useState, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../src/IntlTelInputWithUtils";

const App = (): ReactElement => {
  const [isDisabled, setIsDisabled] = useState(true);

  const toggleDisabled = () => setIsDisabled(!isDisabled);

  return (
    <form>
      <IntlTelInput
        disabled={isDisabled}
        inputProps={{ className: "form-control" }}
        searchInputClass="form-control"
      />
      <button className="btn btn-primary" type="button" onClick={toggleDisabled}>Toggle</button>
    </form>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}