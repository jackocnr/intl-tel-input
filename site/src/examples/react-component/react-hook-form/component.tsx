import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { useForm, Controller, useWatch } from "react-hook-form";
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
