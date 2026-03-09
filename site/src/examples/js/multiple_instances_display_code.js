import intlTelInput from "intl-tel-input";

const inputHome = document.querySelector("#home");
const inputMobile = document.querySelector("#mobile");
const inputVacation = document.querySelector("#vacation");

intlTelInput(inputHome, {
  initialCountry: "gb",
  placeholderNumberType: "FIXED_LINE",
  loadUtils: () => import("intl-tel-input/utils"),
  searchInputClass: "form-control",
});
intlTelInput(inputMobile, {
  initialCountry: "gb",
  placeholderNumberType: "MOBILE",
  loadUtils: () => import("intl-tel-input/utils"),
  searchInputClass: "form-control",
});
intlTelInput(inputVacation, {
  initialCountry: "es",
  onlyCountries: ["es", "fr", "it"],
  loadUtils: () => import("intl-tel-input/utils"),
  searchInputClass: "form-control",
});
