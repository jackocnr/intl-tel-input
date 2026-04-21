import intlTelInput from "intl-tel-input";

const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");

// initialise plugin
const iti = intlTelInput(input, {
  onlyCountries: ["us"],
  allowDropdown: false,
  showFlags: false,
  strictMode: true,
  loadUtils: () => import("intl-tel-input/utils"),
});

// wait for utils to load before calling isValidNumber
await iti.promise;

let showValidation = false;

const updateUI = () => {
  if (!showValidation) return;

  let invalidMsg = "";
  if (!iti.isValidNumber()) {
    const errorCode = iti.getValidationError();
    invalidMsg = yourCodeToDeriveErrorMessage(input.value, errorCode);
  }
  errorMsg.textContent = invalidMsg;
};

// on submit: enable validation UI
form.addEventListener("submit", (e) => {
  e.preventDefault();
  showValidation = true;
  updateUI();
});

// on blur: enable validation UI
input.addEventListener("blur", () => {
  showValidation = true;
  updateUI();
});

// while typing / pasting / changing country: update validity state
input.addEventListener("input", updateUI);
