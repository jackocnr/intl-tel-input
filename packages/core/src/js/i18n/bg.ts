//* Bulgarian. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Промени държавата за телефонен номер, избрана ${countryName} (${dialCode})",
  noCountrySelected: "Избери държава за телефонен номер",
  countryListAriaLabel: "Списък на страните",
  searchPlaceholder: "Търсене",
  clearSearchAriaLabel: "Изчистване на търсенето",
  searchEmptyState: "Няма намерени резултати",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Няма намерени резултати";
    }
    if (count === 1) {
      return "Намерен е 1 резултат";
    }
    return `${count} намерени резултата`;
  },
};

export default interfaceTranslations;
