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

const baseOptions = {
  separateDialCode: true,
  strictMode: true,
  strictRejectAnimation: true,
  loadUtils: () => import("intl-tel-input/utils"),
};

// initialise plugin - home
intlTelInput(inputHome, {
  ...baseOptions,
  initialCountry: "auto",
  geoIpLookup,
  placeholderNumberType: "FIXED_LINE",
});

// initialise plugin - mobile
intlTelInput(inputMobile, {
  ...baseOptions,
  initialCountry: "auto",
  geoIpLookup,
  placeholderNumberType: "MOBILE",
});

// initialise plugin - vacation
intlTelInput(inputVacation, {
  ...baseOptions,
  initialCountry: "es",
  onlyCountries: ["es", "fr", "it"],
});
