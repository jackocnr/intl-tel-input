import intlTelInput from "intl-tel-input";

const inputHome = document.querySelector("#home");
const inputMobile = document.querySelector("#mobile");
const inputVacation = document.querySelector("#vacation");

const initialCountryLookup = async () => {
  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();
  return data.country_code;
};

// initialise library - home
intlTelInput(inputHome, {
  initialCountryLookup,
  placeholderNumberType: "FIXED_LINE",
  loadUtils: () => import("intl-tel-input/utils"),
});

// initialise library - mobile
intlTelInput(inputMobile, {
  initialCountryLookup,
  placeholderNumberType: "MOBILE",
  loadUtils: () => import("intl-tel-input/utils"),
});

// initialise library - vacation
intlTelInput(inputVacation, {
  initialCountry: "es",
  onlyCountries: ["es", "fr", "it"],
  loadUtils: () => import("intl-tel-input/utils"),
});
