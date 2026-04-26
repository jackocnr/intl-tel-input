import intlTelInput from "intl-tel-input";

const input = document.querySelector("#phone");
intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: async () => {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    return data.country_code;
  },
  loadUtils: () => import("/intl-tel-input/js/utils.js"),
});
