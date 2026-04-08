const inputHome = document.querySelector<HTMLInputElement>("#home")!;
const inputMobile = document.querySelector<HTMLInputElement>("#mobile")!;
const inputVacation = document.querySelector<HTMLInputElement>("#vacation")!;

window.intlTelInput(inputHome, {
  initialCountry: "gb",
  placeholderNumberType: "FIXED_LINE",
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});
window.intlTelInput(inputMobile, {
  initialCountry: "gb",
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
