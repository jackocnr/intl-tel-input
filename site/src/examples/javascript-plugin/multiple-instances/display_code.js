import intlTelInput from "intl-tel-input";

const inputHome = document.querySelector("#home");
const inputMobile = document.querySelector("#mobile");
const inputVacation = document.querySelector("#vacation");

const geoIpLookup = async () => {
  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();
  return data.country_code;
};

const baseOptions = {
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
