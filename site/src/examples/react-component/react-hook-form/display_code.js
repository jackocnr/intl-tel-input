import React, { useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import IntlTelInput, { intlTelInput } from "@intl-tel-input/react";
import "intl-tel-input/styles";

const geoIpLookup = async () => {
  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();
  return data.country_code;
};

const App = () => {
  const itiRef = useRef(null);
  const [validNumber, setValidNumber] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: "onTouched",
    defaultValues: { phone: "" },
  });
  const phoneValue = useWatch({ control, name: "phone" });

  // RHF calls this with the current value; we delegate to the underlying library's
  // validation by reading isValidNumber() / getValidationError() off the iti instance.
  const validatePhone = (value) => {
    if (!intlTelInput.utils) {
      return true; // utils still loading; RHF will re-run validate on the next change
    }
    const iti = itiRef.current.getInstance();
    if (iti.isValidNumber()) {
      return true;
    }
    const errorCode = iti.getValidationError();
    // your code here to map the errorCode to a user-facing message
    return getErrorMessage(value, errorCode);
  };

  const onSubmit = (data) => {
    // submit data.phone to your backend
    setValidNumber(data.phone);
  };

  const showValidMsg = validNumber !== null && validNumber === phoneValue;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="phone">Phone number</label>
      <Controller
        name="phone"
        control={control}
        rules={{ validate: validatePhone }}
        render={({ field, fieldState }) => (
          <IntlTelInput
            ref={itiRef}
            value={field.value}
            onChangeNumber={field.onChange}
            initialCountry="auto"
            geoIpLookup={geoIpLookup}
            loadUtils={() => import("intl-tel-input/utils")}
            inputProps={{
              id: "phone",
              name: field.name,
              onBlur: field.onBlur,
              className: fieldState.invalid ? "is-invalid" : "",
            }}
          />
        )}
      />
      <button type="submit">Submit</button>
      {errors.phone && <div className="invalid">{errors.phone.message}</div>}
      {showValidMsg && <div className="valid">Full number: {validNumber}</div>}
    </form>
  );
};
export default App;
