const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");

// initialise plugin
const iti = window.intlTelInput(input, {
  initialCountry: "us",
  loadUtils: () => import("/intl-tel-input/js/utils.js"),
});

let showValidation = false;

const updateUI = () => {
  if (!showValidation) {
    return;
  }

  let invalidMsg = "";
  if (!iti.isValidNumber()) {
    const errorCode = iti.getValidationError();
    invalidMsg = yourCodeToDeriveErrorMessage(input.value(), errorCode);
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
input.addEventListener("countrychange", updateUI);
