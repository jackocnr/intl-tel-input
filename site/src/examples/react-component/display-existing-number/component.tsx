import React from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "@intl-tel-input/react";

const App = () => (
  <>
    <label htmlFor="phone" className="form-label">Phone number</label>
    <div className="demo-input-wrap">
      <IntlTelInput
        // @ts-expect-error EJS-templated URL string, resolved at build time.
        loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
        searchInputClass="form-control"
        inputProps={{
          id: "phone",
          name: "phone",
          title: "Enter your phone number",
          defaultValue: "+447733312345",
          className: "form-control",
        }}
      />
    </div>
  </>
);

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);
