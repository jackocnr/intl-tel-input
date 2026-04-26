import intlTelInput from "intl-tel-input";

const input = document.querySelector("#phone");

const geoIpLookup = async () => {
  const res = await fetch("https://ipapi.co/json");
  const data = await res.json();
  return data.country_code;
};

intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup,
  loadUtils: () => import("/intl-tel-input/js/utils.js"),
});
