import intlTelInput from "intl-tel-input";

const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");
const validMsg = document.querySelector("#valid-msg");

const iti = intlTelInput(input, {
  onlyCountries: ["us"],
  countrySelectorMode: "OFF",
  showFlags: false,
  separateDialCode: false,
  numberDisplayFormat: "NATIONAL",
  loadUtils: () => import("intl-tel-input/utils"),
});

// wait for utils to load before calling isValidNumber
await iti.promise;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (iti.isValidNumber()) {
    validMsg.textContent = `Full number: ${iti.getNumber()}`;
    errorMsg.textContent = "";
  } else {
    const errorCode = iti.getValidationError();
    // your code here to map the errorCode to a user-facing message
    errorMsg.textContent = getErrorMessage(input.value, errorCode);
    validMsg.textContent = "";
  }
});
