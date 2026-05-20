import intlTelInput from "../../../../dist/intl-tel-input/js/intlTelInput.mjs";
import ar from "../../../../dist/intl-tel-input/js/locale/ar.js"; // arabic
import { setupStrictRejectToast } from "../../../js/strictRejectToast";

const input = document.querySelector<HTMLInputElement>("#phone")!;

intlTelInput(input, {
  uiTranslations: ar,
  countryNameLocale: "ar",
  initialCountry: "ps",
  // @ts-expect-error - lodash template tag, resolved at build time
  loadUtils: () => import("<%= cacheBust('/intl-tel-input/js/utils.js') %>"),
  searchInputClass: "form-control",
});

setupStrictRejectToast(input);
