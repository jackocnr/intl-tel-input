//* Slovak. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Vybraná krajina",
  noCountrySelected: "Nie je vybratá žiadna krajina",
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
