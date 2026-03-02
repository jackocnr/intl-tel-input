const form = document.querySelector("#validation-form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");
const validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

// initialise plugin
const iti = window.intlTelInput(input, {
  initialCountry: "us",
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

let showValidation = false;
let submitted = false;

const setText = (el, text) => el.textContent = text;

const updateUI = () => {
  if (!showValidation) {
    return;
  }

  // once showValidation is true, we always show the validity state (via the input class and message below), so keep it up-to-date here
  const value = input.value.trim();
  const isValid = Boolean(value) && iti.isValidNumberPrecise();

  input.classList.toggle("is-valid", isValid);
  input.classList.toggle("is-invalid", !isValid);

  let invalidMsg = "";
  if (!isValid) {
    const errorCode = iti.getValidationError();
    invalidMsg = value
      ? errorMap[errorCode || 0] || "Invalid number"
      : "Please enter a number";
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
