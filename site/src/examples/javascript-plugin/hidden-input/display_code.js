import intlTelInput from "intl-tel-input";

const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-msg");
const validMsg = document.querySelector("#valid-msg");

// initialise plugin
const iti = intlTelInput(input, {
  hiddenInput: () => ({
    phone: "full_phone",
    country: "country_iso2",
  }),
  initialCountry: "auto",
  geoIpLookup: async () => {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    return data.country_code;
  },
  loadUtils: () => import("intl-tel-input/utils"),
});

// wait for utils to load before calling isValidNumber
await iti.promise;

// validation code
let showValidation = false;

const updateUI = () => {
  if (!showValidation) return;

  let invalidMsg = "";
  const isValid = iti.isValidNumber();
  if (!isValid) {
    const errorCode = iti.getValidationError();
    invalidMsg = yourCodeToDeriveErrorMessage(input.value, errorCode);
  }
  errorMsg.textContent = invalidMsg;
  return isValid;
};

// on submit: enable validation UI
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

// if the form was submitted and the page reloaded with the full phone number in the query string, show it here
const urlParams = new URLSearchParams(window.location.search);
const phone = urlParams.get("phone");
const fullPhone = urlParams.get("full_phone");
if (fullPhone) {
  validMsg.innerHTML = `Submitted values<br>phone: ${phone}<br>full_phone: ${fullPhone}`;
}
