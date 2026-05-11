import { setupStrictRejectToast } from "./strictRejectToast";
import { geoIpLookup } from "./geoIpLookup";

const input = document.querySelector<HTMLInputElement>("#phone")!;
window.intlTelInput(input, {
  searchInputClass: "form-control",
  initialCountry: "auto",
  geoIpLookup,
  // @ts-expect-error - resolved at runtime from a separate URL
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
});

setupStrictRejectToast(input);
