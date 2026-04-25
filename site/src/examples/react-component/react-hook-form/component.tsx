import React, { useRef, useState } from "react";
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
  const [validNumber, setValidNumber] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: { phone: "" },
  });
  const phoneValue = useWatch({ control, name: "phone" });

  const validatePhone = (value: string): true | string => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="row g-2" noValidate>
      <div className="col-auto demo-input-wrap">
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
                  name: field.name,
                  onBlur: field.onBlur,
                  title: "Enter your phone number",
                  className: `form-control ${validityClass}`,
                }}
              />
            );
          }}
        />
        {errors.phone && (
          <div className="invalid-feedback d-block">{errors.phone.message}</div>
        )}
        {showValidMsg && (
          <div className="valid-feedback d-block">Full number: {validNumber}</div>
        )}
      </div>
      <div className="col-auto">
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  );
};

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<App />);
