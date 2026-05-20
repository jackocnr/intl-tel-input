//* Slovak. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Zmeniť krajinu pre telefónne číslo, vybraná ${countryName} (${dialCode})",
  noCountrySelected: "Vyberte krajinu pre telefónne číslo",
  countryListAriaLabel: "Zoznam krajín",
  searchPlaceholder: "Vyhľadať",
  clearSearchAriaLabel: "Vymazať vyhľadávanie",
  searchEmptyState: "Neboli nájdené žiadne výsledky",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Neboli nájdené žiadne výsledky";
    }
    if (count === 1) {
      return "1 výsledok nájdený";
    }
    if (count >= 2 && count <= 4) {
      return `${count} výsledky nájdené`;
    }
    return `${count} výsledkov nájdených`;
  },
};

export default interfaceTranslations;
