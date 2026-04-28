import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Toast } from "bootstrap";
import IntlTelInput, {
  intlTelInput,
  type IntlTelInputRef,
} from "@intl-tel-input/react";
import type {
  Iso2,
  ValidationError,
} from "intl-tel-input";

const getErrorMessage = (
  number: string,
  errorCode: ValidationError | null,
): string => {
  if (!number) {
    return "Please enter a number";
  }
  const genericError = "Invalid number";
  const { VALIDATION_ERROR } = intlTelInput;
  const errorMap: Record<string, string> = {
    [VALIDATION_ERROR.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [VALIDATION_ERROR.TOO_SHORT]: "Too short",
    [VALIDATION_ERROR.TOO_LONG]: "Too long",
    [VALIDATION_ERROR.INVALID_LENGTH]: genericError,
  };
  return (errorCode && errorMap[errorCode]) || genericError;
};

const geoIpLookup = async (): Promise<Iso2> => {
  const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
  const data = await res.json();
  return data.country_code;
};

const App = () => {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState<ValidationError | null>(null);
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
    if (!input || !toastEl) {
      return undefined;
    }
    const toast = Toast.getOrCreateInstance(toastEl);
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