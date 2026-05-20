import intlTelInput from "intl-tel-input";

const input = document.querySelector("#phone");

const initialCountryLookup = async () => {
  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();
  return data.country_code;
};

intlTelInput(input, {
  initialCountryLookup,
  loadUtils: () => import("intl-tel-input/utils"),
});
