//* Romanian. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Schimbă țara pentru numărul de telefon, selectată ${countryName} (${dialCode})",
  noCountrySelected: "Selectează țara pentru numărul de telefon",
  countryListAriaLabel: "Lista țărilor",
  searchPlaceholder: "Căutare",
  clearSearchAriaLabel: "Șterge căutarea",
  searchEmptyState: "Nici un rezultat găsit",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nici un rezultat găsit";
    }
    if (count === 1) {
      return "1 rezultat găsit";
    }

    const isFew = count % 100 >= 1 && count % 100 <= 19;

    if (isFew) {
      return `${count} rezultate găsite`;
    }
    return `${count} de rezultate găsite`;
  },
};

export default interfaceTranslations;
