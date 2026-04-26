import React, { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../src/IntlTelInputWithUtils";

const App = (): ReactElement => (
  <IntlTelInput
    initialCountry="us"
    inputProps={{ className: "form-control" }}
    searchInputClass="form-control"
  />
);

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}