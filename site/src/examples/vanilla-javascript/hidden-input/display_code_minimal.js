import intlTelInput from "intl-tel-input";

const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");
const validMsg = document.querySelector("#valid-msg");

const iti = intlTelInput(input, {
  hiddenInputs: () => ({
    phone: "full_phone",
    country: "country_iso2",
  }),
  loadUtils: () => import("intl-tel-input/utils"),
});

// wait for utils to load before calling isValidNumber
await iti.promise;

// validate on submit, prevent submission if invalid
form.addEventListener("submit", (e) => {
  if (iti.isValidNumber()) {
    errorMsg.textContent = "";
  } else {
    e.preventDefault();
    const errorCode = iti.getValidationError();
    // your code here to map the errorCode to a user-facing message
    errorMsg.textContent = getErrorMessage(input.value, errorCode);
  }
});

// if the form was submitted and the page reloaded with the full phone number in the query string, show it here
const urlParams = new URLSearchParams(window.location.search);
const phone = urlParams.get("phone");
const fullPhone = urlParams.get("full_phone");
if (fullPhone) {
  validMsg.innerHTML = `Submitted values<br>phone: ${phone}<br>full_phone: ${fullPhone}`;
}
