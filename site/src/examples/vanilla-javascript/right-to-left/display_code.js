import intlTelInput from "intl-tel-input";
// Arabic
import { ar } from "intl-tel-input/locale";

const input = document.querySelector("#phone");

intlTelInput(input, {
  uiTranslations: ar,
  // Arabic
  countryNameLocale: "ar",
  // Palestine
  initialCountry: "ps",
  loadUtils: () => import("intl-tel-input/utils"),
});
