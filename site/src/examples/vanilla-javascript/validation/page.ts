import { setupStrictRejectToast } from "../../../js/strictRejectToast";
import { getErrorMessage } from "../../../js/getErrorMessage";
import { initialCountryLookup } from "../../../js/initialCountryLookup";

const form = document.querySelector<HTMLFormElement>("#form")!;
const input = document.querySelector<HTMLInputElement>("#phone")!;
const errorMsg = document.querySelector<HTMLElement>("#error-msg")!;
const validMsg = document.querySelector<HTMLElement>("#valid-msg")!;

const iti = window.intlTelInput(input, {
  initialCountryLookup,
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

setupStrictRejectToast(input);

let showValidation = false;
let submitted = false;

const setText = (el: HTMLElement, text: string) => el.textContent = text;

const updateUI = () => {
  if (!showValidation) {
    return;
  }

  // once showValidation is true, we always show the validity state (via the input class and message below), so keep it up-to-date here
  const value = input.value.trim();
  const isValid = Boolean(value) && iti.isValidNumber() === true;

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
input.addEventListener("input", () => {
  submitted = false;
  updateUI();
});
