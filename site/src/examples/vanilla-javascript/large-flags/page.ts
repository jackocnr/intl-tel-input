import { setupStrictRejectToast } from "../../../js/strictRejectToast";

const input = document.querySelector<HTMLInputElement>("#phone")!;

const geoIpLookup = async () => {
  const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
  const data = await res.json();
  return data.country_code;
};

window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup,
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

setupStrictRejectToast(input);
