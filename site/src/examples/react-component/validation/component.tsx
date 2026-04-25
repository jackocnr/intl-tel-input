import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import IntlTelInput, {
  intlTelInput,
  type IntlTelInputRef,
} from "../../../../../react/dist/IntlTelInput.js";
import type { Iso2 } from "../../../../../dist/js/intlTelInput.js";

const getErrorMessage = (number: string, errorCode: number | null): string => {
  if (!number) {
    return "Please enter a number";
  }
  const genericError = "Invalid number";
  if (errorCode === null) {
    return genericError;
  }
  const { validationError } = intlTelInput.utils!;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [validationError.TOO_SHORT]: "Too short",
    [validationError.TOO_LONG]: "Too long",
    [validationError.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

const geoIpLookup = (success: (iso2: Iso2) => void, failure: () => void): void => {
  fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`)
    .then((res) => res.json())
    .then((data) => success(data.country_code))
    .catch(() => failure());
};

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const itiRef = useRef<IntlTelInputRef>(null);
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

  useEffect(() => {
    const input = itiRef.current?.getInput();
    const toastEl = toastDivRef.current;
    if (!input || !toastEl || !window.bootstrap?.Toast) {
      return undefined;
    }
    const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
    const handleReject = (e: Event) => {
      const { reason, rejectedInput, source } = (e as CustomEvent).detail;
      if (reason === "max-length") {
        setToastMessage("Maximum length reached for this country");
      } else if (source === "paste") {
        setToastMessage("Stripped invalid characters from pasted text");
      } else {
        setToastMessage(`Character not allowed: "${rejectedInput}"`);
      }
      toast.show();
    };
    input.addEventListener("strict:reject", handleReject);
    return () => input.removeEventListener("strict:reject", handleReject);
  }, []);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="phone" className="form-label">Phone number</label>
      <div className="d-flex gap-2">
        <div className="demo-input-wrap position-relative">
          <div className="toast-container demo-toast-container">
            <div ref={toastDivRef} className="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
              <div className="d-flex">
                <div className="toast-body">{toastMessage}</div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>
          </div>
          <IntlTelInput
            ref={itiRef}
            onChangeNumber={handleChangeNumber}
            onChangeValidity={setIsValid}
            onChangeErrorCode={setErrorCode}
            initialCountry="auto"
            geoIpLookup={geoIpLookup}
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