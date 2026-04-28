const form = document.querySelector<HTMLFormElement>("#form")!;
const input = document.querySelector<HTMLInputElement>("#phone")!;
const errorMsg = document.querySelector<HTMLElement>("#error-msg")!;
const validMsg = document.querySelector<HTMLElement>("#valid-msg")!;

const geoIpLookup = async () => {
  const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
  const data = await res.json();
  return data.country_code;
};

// initialise plugin
const iti = window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup,
  hiddenInput: () => ({ phone: "full_phone", country: "country_iso2" }),
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

const toastEl = document.getElementById("strictRejectToast");
const toastBody = document.getElementById("strictRejectToastBody");
if (toastEl && toastBody) {
  const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
  input.addEventListener("strict:reject", (e) => {
    const { reason, rejectedInput, source } = (e as CustomEvent).detail;
    if (reason === "max-length") {
      toastBody.textContent = "Maximum length reached for this country";
    } else if (source === "paste") {
      toastBody.textContent = "Stripped invalid characters from pasted text";
    } else {
      toastBody.textContent = `Character not allowed: "${rejectedInput}"`;
    }
    toast.show();
  });
}

const getErrorMessage = (number: string, errorCode: string | null) => {
  if (!number) {
    return "Please enter a number";
  }
  const genericError = "Invalid number";
  const { VALIDATION_ERROR } = window.intlTelInput;
  const errorMap: Record<string, string> = {
    [VALIDATION_ERROR.INVALID_COUNTRY_CODE]: "Invalid dial code",
    [VALIDATION_ERROR.TOO_SHORT]: "Too short",
    [VALIDATION_ERROR.TOO_LONG]: "Too long",
    [VALIDATION_ERROR.INVALID_LENGTH]: genericError,
  };
  return (errorCode && errorMap[errorCode]) || genericError;
};

let showValidation = false;

const setText = (el: HTMLElement, text: string) => el.innerHTML = text;

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

// if the form was submitted and the page reloaded with the full phone number in the query string, show it here
const urlParams = new URLSearchParams(window.location.search);
const phone = urlParams.get("phone");
const fullPhone = urlParams.get("full_phone");
if (fullPhone) {
  setText(validMsg, `Submitted values<br>phone: ${phone}<br>full_phone: ${fullPhone}`);
}
