import { setupStrictRejectToast } from "./strictRejectToast";

const input = document.querySelector<HTMLInputElement>("#phone")!;
window.intlTelInput(input, {
  searchInputClass: "form-control",
  initialCountry: "auto",
  geoIpLookup: async () => {
    const res = await fetch(`https://ipapi.co/json?token=${process.env.IPAPI_TOKEN}`);
    const data = await res.json();
    return data.country_code;
  },
  // @ts-expect-error - resolved at runtime from a separate URL
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
});

setupStrictRejectToast(input);
