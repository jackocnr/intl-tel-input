import { setupStrictRejectToast } from "../../../js/strictRejectToast";

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

setupStrictRejectToast(inputHome, "homeToast", "homeToastBody");
setupStrictRejectToast(inputMobile, "mobileToast", "mobileToastBody");
setupStrictRejectToast(inputVacation, "vacationToast", "vacationToastBody");
