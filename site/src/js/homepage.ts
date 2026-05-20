import { setupStrictRejectToast } from "./strictRejectToast";
import { initialCountryLookup } from "./initialCountryLookup";

const input = document.querySelector<HTMLInputElement>("#phone")!;
window.intlTelInput(input, {
  searchInputClass: "form-control",
  initialCountryLookup,
  // @ts-expect-error - resolved at runtime from a separate URL
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
});

setupStrictRejectToast(input);
