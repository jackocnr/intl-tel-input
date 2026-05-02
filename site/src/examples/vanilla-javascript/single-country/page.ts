import type { Iso2 } from "../../../../../packages/core/dist/js/intlTelInput";

const form = document.querySelector<HTMLFormElement>("#form")!;
const loading = document.querySelector<HTMLElement>("#loading")!;
const formContent = document.querySelector<HTMLElement>("#form-content")!;
const phoneLabel = document.querySelector<HTMLElement>("#phone-label")!;
const input = document.querySelector<HTMLInputElement>("#phone")!;
const errorMsg = document.querySelector<HTMLElement>("#error-msg")!;
const validMsg = document.querySelector<HTMLElement>("#valid-msg")!;

const lookupCountry = async (): Promise<{ code: string; name: string }> => {
  try {
    const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
    const data = await res.json();
    return { code: data.country_code.toLowerCase(), name: data.country_name };
  } catch (e) {
    console.log("Error looking up country:", e);
    return { code: "us", name: "United States" };
  }
};

const getErrorMessage = (number: string, errorCode: string | null) => {
  if (!number) {
    return "Please enter a number";
  }
  const { VALIDATION_ERROR } = window.intlTelInput;
  switch (errorCode) {
    case VALIDATION_ERROR.INVALID_COUNTRY_CODE: return "Invalid dial code";
    case VALIDATION_ERROR.TOO_SHORT: return "Too short";
    case VALIDATION_ERROR.TOO_LONG: return "Too long";
    default: return "Invalid number";
  }
};

const setText = (el: HTMLElement, text: string) => el.textContent = text;

(async () => {
  const { code, name } = await lookupCountry();

  phoneLabel.textContent = `Phone number (${name})`;
  loading.classList.add("d-none");
  formContent.classList.remove("d-none");

  // Sync the displayed JS code block with the looked-up country. hljs has already
  // highlighted by now, so reset textContent and re-highlight to clear the spans.
  const codeBlock = document.querySelector<HTMLElement>("code.language-javascript");
  if (codeBlock) {
    codeBlock.textContent = codeBlock.textContent!.replace(
      'onlyCountries: ["us"]',
      `onlyCountries: ["${code}"]`,
    );
    if (window.hljs && typeof window.hljs.highlightElement === "function") {
      delete codeBlock.dataset.highlighted;
      window.hljs.highlightElement(codeBlock);
    }
  }

  const playgroundLink = document.querySelector<HTMLAnchorElement>('a[href*="/playground?"]');
  if (playgroundLink) {
    playgroundLink.href = playgroundLink.href.replace(
      "onlyCountries=%5B%22us%22%5D",
      `onlyCountries=%5B%22${code}%22%5D`,
    );
  }

  const iti = window.intlTelInput(input, {
    onlyCountries: [code as Iso2],
    allowDropdown: false,
    showFlags: false,
    separateDialCode: false,
    nationalMode: true,
    // @ts-expect-error - lodash template tag, resolved at build time
    loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
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

  let showValidation = false;
  let submitted = false;

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
})();
