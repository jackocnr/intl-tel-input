const inputHome = document.querySelector<HTMLInputElement>("#home")!;
const inputMobile = document.querySelector<HTMLInputElement>("#mobile")!;
const inputVacation = document.querySelector<HTMLInputElement>("#vacation")!;

window.intlTelInput(inputHome, {
  initialCountry: "auto",
  geoIpLookup: (success, failure) => {
    fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`)
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => failure());
  },
  placeholderNumberType: "FIXED_LINE",
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});
window.intlTelInput(inputMobile, {
  initialCountry: "auto",
  geoIpLookup: (success, failure) => {
    fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`)
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => failure());
  },
  placeholderNumberType: "MOBILE",
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});
window.intlTelInput(inputVacation, {
  initialCountry: "es",
  onlyCountries: ["es", "fr", "it"],
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

const setupRejectToast = (input: HTMLInputElement, toastId: string, toastBodyId: string) => {
  const toastEl = document.getElementById(toastId);
  const toastBody = document.getElementById(toastBodyId);
  if (!toastEl || !toastBody || !window.bootstrap?.Toast) {
    return;
  }
  const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
  input.addEventListener("strict:reject", (e: Event) => {
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
};
setupRejectToast(inputHome, "homeToast", "homeToastBody");
setupRejectToast(inputMobile, "mobileToast", "mobileToastBody");
setupRejectToast(inputVacation, "vacationToast", "vacationToastBody");
