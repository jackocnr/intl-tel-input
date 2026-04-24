import intlTelInput from "../../../dist/intl-tel-input/js/intlTelInput.mjs";
import ar from "../../../dist/intl-tel-input/js/i18n/ar.js"; // arabic

const input = document.querySelector<HTMLInputElement>("#phone")!;

intlTelInput(input, {
  i18n: ar,
  countryNameLocale: "ar",
  initialCountry: "eg",
  separateDialCode: true,
  strictMode: true,
  strictRejectAnimation: true,
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

const toastEl = document.getElementById("strictRejectToast");
const toastBody = document.getElementById("strictRejectToastBody");
if (toastEl && toastBody && window.bootstrap?.Toast) {
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
