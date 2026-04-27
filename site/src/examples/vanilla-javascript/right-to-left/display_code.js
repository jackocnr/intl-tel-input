import intlTelInput from "intl-tel-input";
// Arabic
import { ar } from "intl-tel-input/i18n";

const input = document.querySelector("#phone");

intlTelInput(input, {
  i18n: ar,
  // Arabic
  countryNameLocale: "ar",
  // Egypt
  initialCountry: "eg",
  loadUtils: () => import("intl-tel-input/utils"),
});
