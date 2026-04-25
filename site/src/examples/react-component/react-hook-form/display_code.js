import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import IntlTelInput, { intlTelInput } from "intl-tel-input/react";
import "intl-tel-input/styles";

const geoIpLookup = (success, failure) => {
  fetch("https://ipapi.co/json")
    .then(res => res.json())
    .then(data => success(data.country_code))
    .catch(() => failure());
};

const App = () => {
  const itiRef = useRef(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: "onTouched",
    defaultValues: { phone: "" },
  });

  // RHF calls this with the current value; we delegate to the plugin's own
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
    return yourCodeToDeriveErrorMessage(value, errorCode);
  };

  const onSubmit = (data) => {
    // submit data.phone to your backend
  };

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
            separateDialCode
            strictMode
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
      {errors.phone && <div className="invalid">{errors.phone.message}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};
export default App;
