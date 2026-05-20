import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput, {
  type StrictRejectReason,
  type StrictRejectSource,
} from "@intl-tel-input/react";
import type { ValidationError } from "intl-tel-input";
import { getErrorMessage } from "../../../js/getErrorMessage";
import { initialCountryLookup } from "../../../js/initialCountryLookup";

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState<ValidationError | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastDivRef = useRef<HTMLDivElement>(null);

  let inputValidityClass = "";
  if (showValidation) {
    inputValidityClass = isValid ? "is-valid" : "is-invalid";
  }

  let invalidMsg: string | null = null;
  if (showValidation && !isValid) {
    invalidMsg = getErrorMessage(number, errorCode);
  }

  const showValid = showValidation && isValid && submitted;
  const validMsg = showValid ? `Full number: ${number}` : null;

  const handleChangeNumber = (newNumber: string) => {
    setSubmitted(false);
    setNumber(newNumber);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    setSubmitted(true);
  };

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
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="phone" className="form-label">Phone number</label>
      <div className="d-flex gap-2">
        <div className="demo-input-wrap position-relative">
          <div className="toast-container demo-toast-container">
            <div ref={toastDivRef} className="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
              <div className="d-flex">
                <div className="toast-body">{toastMessage && <>{toastMessage} (see <a href="/docs/options#strictmode" className="link-light">strictMode</a>)</>}</div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>
          </div>
          <IntlTelInput
            onChangeNumber={handleChangeNumber}
            onChangeValidity={setIsValid}
            onChangeErrorCode={setErrorCode}
            onStrictReject={handleStrictReject}
            initialCountryLookup={initialCountryLookup}
            // @ts-expect-error EJS-templated URL string, resolved at build time.
            loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
            searchInputClass="form-control"
            inputProps={{
              id: "phone",
              name: "phone",
              title: "Enter your phone number",
              onBlur: () => setShowValidation(true),
              className: `form-control ${inputValidityClass}`,
            }}
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
      {invalidMsg && (
        <div className="invalid-feedback d-block">{invalidMsg}</div>
      )}
      {validMsg && (
        <div className="valid-feedback d-block">{validMsg}</div>
      )}
    </form>
  );
};

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);