//* Macedonian. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Промени држава за телефонски број, избрана ${countryName} (${dialCode})",
  noCountrySelected: "Избери држава за телефонски број",
  countryListAriaLabel: "Листа на држави",
  searchPlaceholder: "Пребарување",
  clearSearchAriaLabel: "Исчисти пребарување",
  searchEmptyState: "Нема резултати",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Нема резултати";
    }
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `Пронајден е ${count} резултат`;
    }

    return `Пронајдени се ${count} резултати`;
  },
};

export default interfaceTranslations;
