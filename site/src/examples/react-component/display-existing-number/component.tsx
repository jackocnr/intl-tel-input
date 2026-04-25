import React from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput from "../../../../../react/dist/IntlTelInput.js";

const App = () => (
  <>
    <label htmlFor="phone" className="form-label">Phone number</label>
    <div className="demo-input-wrap">
      <IntlTelInput
        separateDialCode
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
