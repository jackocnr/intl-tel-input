import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { useForm, Controller, useWatch } from "react-hook-form";
import IntlTelInput, {
  intlTelInput,
  type IntlTelInputRef,
} from "../../../../../react/dist/IntlTelInput.js";
import type { Iso2 } from "../../../../../dist/js/intlTelInput.js";

const getErrorMessage = (number: string, errorCode: number): string => {
  if (!number) {
    return "Please enter a number";
  }
  const genericError = "Invalid number";
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

type FormValues = { phone: string };

const App = () => {
  const itiRef = useRef<IntlTelInputRef>(null);
  const toastDivRef = useRef<HTMLDivElement>(null);
  const [validNumber, setValidNumber] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: { phone: "" },
  });
  const phoneValue = useWatch({ control, name: "phone" });

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

  const validatePhone = (value: string): true | string => {
    if (!intlTelInput.utils) {
      return true; // utils still loading; RHF will re-run validate on the next change
    }
    const iti = itiRef.current!.getInstance()!;
    if (iti.isValidNumber()) {
      return true;
    }
    const errorCode = iti.getValidationError();
    return getErrorMessage(value, errorCode);
  };

  const onSubmit = (data: FormValues) => {
    // your real submit logic would go here — e.g. POST data.phone to your backend
    console.log("Submitted:", data);
    setValidNumber(data.phone);
  };

  const showValidMsg = validNumber !== null && validNumber === phoneValue;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <Controller
            name="phone"
            control={control}
            rules={{ validate: validatePhone }}
            render={({ field, fieldState }) => {
              let validityClass = "";
              if (fieldState.invalid) {
                validityClass = "is-invalid";
              } else if (fieldState.isTouched && field.value) {
                validityClass = "is-valid";
              }
              return (
                <IntlTelInput
                  ref={itiRef}
                  value={field.value}
                  onChangeNumber={field.onChange}
                  initialCountry="auto"
                  separateDialCode
                  strictMode
                  strictRejectAnimation
                  geoIpLookup={geoIpLookup}
                  // @ts-expect-error EJS-templated URL string, resolved at build time.
                  loadUtils={() => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>")}
                  searchInputClass="form-control"
                  inputProps={{
                    id: "phone",
                    name: field.name,
                    onBlur: field.onBlur,
                    title: "Enter your phone number",
                    className: `form-control ${validityClass}`,
                  }}
                />
              );
            }}
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
      {errors.phone && (
        <div className="invalid-feedback d-block">{errors.phone.message}</div>
      )}
      {showValidMsg && (
        <div className="valid-feedback d-block">Full number: {validNumber}</div>
      )}
    </form>
  );
};

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);
