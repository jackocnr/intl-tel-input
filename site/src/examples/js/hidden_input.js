const form = document.querySelector("#form");
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
  hiddenInput: () => ({ phone: "full_phone", country: "country_code" }),
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

let showValidation = false;

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
    invalidMsg = value
      ? errorMap[errorCode || 0] || "Invalid number"
      : "Please enter a number";
  }
  setText(errorMsg, invalidMsg);
  setText(validMsg, "");

  return isValid;
};

// on submit: validate
form.addEventListener("submit", (e) => {
  showValidation = true;
  const isValid = updateUI();
  if (!isValid) {
    e.preventDefault();
  }
});

// on blur: enable validation UI
input.addEventListener("blur", () => {
  showValidation = true;
  updateUI();
});

// while typing / pasting / changing country: update validity state
input.addEventListener("input", updateUI);
input.addEventListener("countrychange", updateUI);

// if the form was submitted and the page reloaded with the full phone number in the query string, show it here
const urlParams = new URLSearchParams(window.location.search);
const fullPhone = urlParams.get("full_phone");
if (fullPhone) {
  setText(validMsg, `Submitted value: ${fullPhone}`);
}
