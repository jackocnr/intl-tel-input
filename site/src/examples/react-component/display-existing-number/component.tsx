import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput, {
  type StrictRejectReason,
  type StrictRejectSource,
} from "@intl-tel-input/react";

const App = () => {
  const [toastMessage, setToastMessage] = useState("");
  const toastDivRef = useRef<HTMLDivElement>(null);

  const handleStrictReject = (source: StrictRejectSource, rejectedInput: string, reason: StrictRejectReason) => {
    const toastEl = toastDivRef.current;
    if (!toastEl) {
      return;
    }
    if (reason === "max-length") {
      setToastMessage("Maximum length reached for this country");
    } else if (source === "paste") {
      setToastMessage("Stripped invalid characters from pasted text");
    } else {
      setToastMessage(`Character not allowed: "${rejectedInput}"`);
    }
    window.bootstrap.Toast.getOrCreateInstance(toastEl).show();
  };

  return (
    <>
      <label htmlFor="phone" className="form-label">Phone number</label>
      <div className="demo-input-wrap position-relative">
        <div className="toast-container demo-toast-container">
          <div ref={toastDivRef} className="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
            <div className="d-flex">
              <div className="toast-body">{toastMessage && <>{toastMessage} (see <a href="/docs/options#strictmode" className="link-light">strictMode</a>)</>}</div>
              <button type="button" className="btn-close btn-close-white me-2" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
        <IntlTelInput
          onStrictReject={handleStrictReject}
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
};

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);
