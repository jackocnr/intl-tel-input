import React, { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../src/intl-tel-input/react";

const App = (): ReactElement => (
  <IntlTelInput
    initOptions={{
      initialCountry: "us",
      utilsScript: "../../build/js/utils.js",
    }}
  />
);

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}