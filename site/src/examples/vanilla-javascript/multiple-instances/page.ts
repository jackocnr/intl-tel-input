import { setupStrictRejectToast } from "../../../js/strictRejectToast";
import { geoIpLookup } from "../../../js/geoIpLookup";

const inputHome = document.querySelector<HTMLInputElement>("#home")!;
const inputMobile = document.querySelector<HTMLInputElement>("#mobile")!;
const inputVacation = document.querySelector<HTMLInputElement>("#vacation")!;

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
