import intlTelInput from "intl-tel-input";

const inputHome = document.querySelector("#home");
const inputMobile = document.querySelector("#mobile");
const inputVacation = document.querySelector("#vacation");

const geoIpLookup = (success, failure) => {
  fetch("https://ipapi.co/json")
    .then(res => res.json())
    .then(data => success(data.country_code))
    .catch(() => failure());
};

intlTelInput(inputHome, {
  initialCountry: "auto",
  separateDialCode: true,
  strictMode: true,
  geoIpLookup,
  placeholderNumberType: "FIXED_LINE",
  loadUtils: () => import("intl-tel-input/utils"),
});
intlTelInput(inputMobile, {
  initialCountry: "auto",
  separateDialCode: true,
  strictMode: true,
  geoIpLookup,
  placeholderNumberType: "MOBILE",
  loadUtils: () => import("intl-tel-input/utils"),
});
intlTelInput(inputVacation, {
  initialCountry: "es",
  separateDialCode: true,
  strictMode: true,
  onlyCountries: ["es", "fr", "it"],
  loadUtils: () => import("intl-tel-input/utils"),
});
