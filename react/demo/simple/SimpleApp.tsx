import React, { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../src/intl-tel-input/reactWithUtils";

const App = (): ReactElement => (
  <IntlTelInput
    initOptions={{
      initialCountry: "us",
    }}
  />
);

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}