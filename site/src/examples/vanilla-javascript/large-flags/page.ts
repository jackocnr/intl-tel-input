import { setupStrictRejectToast } from "../../../js/strictRejectToast";
import { initialCountryLookup } from "../../../js/initialCountryLookup";

const input = document.querySelector<HTMLInputElement>("#phone")!;

window.intlTelInput(input, {
  initialCountryLookup,
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

setupStrictRejectToast(input);
