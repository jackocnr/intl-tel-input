import React, { useState, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../src/IntlTelInputWithUtils";

const App = (): ReactElement => {
  const [value, setValue] = useState<string>("");

  return (
    <form>
      <div className="d-flex align-items-start gap-2">
        <IntlTelInput
          value={value}
          onChangeNumber={setValue}
          initialCountry="us"
          inputProps={{ className: "form-control" }}
          searchInputClass="form-control"
        />
        <button className="btn btn-primary" type="button" onClick={() => setValue("+14155552671")}>Populate Number</button>
        <button className="btn btn-secondary" type="button" onClick={() => setValue("")}>Reset Number</button>
      </div>
      <p>Current bound value: {value || "(empty)"}</p>
    </form>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
