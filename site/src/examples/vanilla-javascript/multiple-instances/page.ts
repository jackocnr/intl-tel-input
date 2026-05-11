const inputHome = document.querySelector<HTMLInputElement>("#home")!;
const inputMobile = document.querySelector<HTMLInputElement>("#mobile")!;
const inputVacation = document.querySelector<HTMLInputElement>("#vacation")!;

const geoIpLookup = async () => {
  const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
  const data = await res.json();
  return data.country_code;
};

window.intlTelInput(inputHome, {
  initialCountry: "auto",
  geoIpLookup,
  placeholderNumberType: "FIXED_LINE",
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});
window.intlTelInput(inputMobile, {
  initialCountry: "auto",
  geoIpLookup,
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
  if (!toastEl || !toastBody) {
    return;
  }
  const toast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
  input.addEventListener("strict:reject", (e: Event) => {
    const { reason, rejectedInput, source } = (e as CustomEvent).detail;
    let message: string;
    if (reason === "max-length") {
      message = "Maximum length reached for this country";
    } else if (source === "paste") {
      message = "Stripped invalid characters from pasted text";
    } else {
      message = `Character not allowed: "${rejectedInput}"`;
    }
    const link = document.createElement("a");
    link.href = "/docs/options#strictmode";
    link.className = "link-light";
    link.textContent = "strictMode";
    toastBody.replaceChildren(`${message} (see `, link, ")");
    toast.show();
  });
};
setupRejectToast(inputHome, "homeToast", "homeToastBody");
setupRejectToast(inputMobile, "mobileToast", "mobileToastBody");
setupRejectToast(inputVacation, "vacationToast", "vacationToastBody");
