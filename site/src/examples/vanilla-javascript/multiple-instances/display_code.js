import intlTelInput from "intl-tel-input";

const inputHome = document.querySelector("#home");
const inputMobile = document.querySelector("#mobile");
const inputVacation = document.querySelector("#vacation");

const geoIpLookup = async () => {
  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();
  return data.country_code;
};

// initialise plugin - home
intlTelInput(inputHome, {
  initialCountry: "auto",
  geoIpLookup,
  placeholderNumberType: "FIXED_LINE",
  loadUtils: () => import("intl-tel-input/utils"),
});

// initialise plugin - mobile
intlTelInput(inputMobile, {
  initialCountry: "auto",
  geoIpLookup,
  placeholderNumberType: "MOBILE",
  loadUtils: () => import("intl-tel-input/utils"),
});

// initialise plugin - vacation
intlTelInput(inputVacation, {
  initialCountry: "es",
  onlyCountries: ["es", "fr", "it"],
  loadUtils: () => import("intl-tel-input/utils"),
});
