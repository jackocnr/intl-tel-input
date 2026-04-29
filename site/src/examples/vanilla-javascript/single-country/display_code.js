import intlTelInput from "intl-tel-input";

const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");
const validMsg = document.querySelector("#valid-msg");

// initialise library
const iti = intlTelInput(input, {
  onlyCountries: ["us"],
  allowDropdown: false,
  showFlags: false,
  loadUtils: () => import("intl-tel-input/utils"),
});

// wait for utils to load before calling isValidNumber
await iti.promise;

let showValidation = false;
let submitted = false;

const updateUI = () => {
  if (!showValidation) return;

  const isValid = iti.isValidNumber();

  let invalidMsg = "";
  if (!isValid) {
    const errorCode = iti.getValidationError();
    invalidMsg = yourCodeToDeriveErrorMessage(input.value, errorCode);
  }
  errorMsg.textContent = invalidMsg;

  validMsg.textContent = isValid && submitted ? `Full number: ${iti.getNumber()}` : "";
};

// on submit: validate (and show "Full number" if valid)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  showValidation = true;
  submitted = true;
  updateUI();
});

// on blur: enable validation UI
input.addEventListener("blur", () => {
  showValidation = true;
  updateUI();
});

// while typing / pasting / changing country: remove any submitted state and update validity state
input.addEventListener("input", () => {
  submitted = false;
  updateUI();
});
