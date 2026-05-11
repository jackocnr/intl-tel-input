import { setupStrictRejectToast } from "../../../js/strictRejectToast";
import { geoIpLookup } from "../../../js/geoIpLookup";

const input = document.querySelector<HTMLInputElement>("#phone")!;

window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup,
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

setupStrictRejectToast(input);
