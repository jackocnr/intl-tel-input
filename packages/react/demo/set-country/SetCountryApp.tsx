import React, { useState, ReactElement, useRef } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput, { type IntlTelInputRef } from "../../src/IntlTelInputWithUtils";

const App = (): ReactElement => {
  const ref = useRef<IntlTelInputRef>(null);
  const [country, setCountry] = useState<string>("us");

  const handleSetCountry = (): void => {
    ref.current?.getInstance()?.setSelectedCountry("gb");
  };

  return (
    <form>
      <div className="d-flex align-items-start gap-2">
        <IntlTelInput
          ref={ref}
          onChangeCountry={setCountry}
          initialCountry="us"
          inputProps={{ className: "form-control" }}
          searchInputClass="form-control"
        />
        <button className="btn btn-primary" type="button" onClick={handleSetCountry}>Set Country to GB</button>
      </div>
      <p>Current country (per parent state): {country}</p>
    </form>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
