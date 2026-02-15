import intlTelInput from "intl-tel-input";
import { ru } from "intl-tel-input/i18n"; // Russian

const input = document.querySelector("#phone");

intlTelInput(input, {
  i18n: ru,
  initialCountry: "ru", // Russia
  countryNameLocale: "ru", // Russian
  loadUtils: () => import("intl-tel-input/utils"),
});
