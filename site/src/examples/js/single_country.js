const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");
const validMsg = document.querySelector("#valid-msg");

// initialise plugin
const iti = window.intlTelInput(input, {
  onlyCountries: ["us"],
  allowDropdown: false,
  showFlags: false,
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
});

const getErrorMessage = (number, errorCode) => {
  if (!number) return "Please enter a number";
  const genericError = "Invalid number";
  const { validationError } = window.intlTelInput.utils;
  const errorMap = {
    [validationError.INVALID_COUNTRY_CODE]: "Invalid country code",
    [validationError.TOO_SHORT]: "Too short",
    [validationError.TOO_LONG]: "Too long",
    [validationError.INVALID_LENGTH]: genericError,
  };
  return errorMap[errorCode] || genericError;
};

let showValidation = false;
let submitted = false;

const setText = (el, text) => el.textContent = text;

const updateUI = () => {
  if (!showValidation) {
    return;
  }

  // once showValidation is true, we always show the validity state (via the input class and message below), so keep it up-to-date here
  const value = input.value.trim();
  const isValid = Boolean(value) && iti.isValidNumber();

  input.classList.toggle("is-valid", isValid);
  input.classList.toggle("is-invalid", !isValid);

  let invalidMsg = "";
  if (!isValid) {
    const errorCode = iti.getValidationError();
    invalidMsg = getErrorMessage(value, errorCode);
  }
  setText(errorMsg, invalidMsg);

  const showValid = Boolean(value) && isValid && submitted;
  setText(validMsg, showValid ? `Full number: ${iti.getNumber()}` : "");
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
const handleUserInput = () => {
  submitted = false;
  updateUI();
};

input.addEventListener("input", handleUserInput);
input.addEventListener("countrychange", handleUserInput);