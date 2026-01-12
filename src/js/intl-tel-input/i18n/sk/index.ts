//* Slovak. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Vybraná krajina",
  noCountrySelected: "Nie je vybratá žiadna krajina",
  countryListAriaLabel: "Zoznam krajín",
  searchPlaceholder: "Vyhľadať",
  zeroSearchResults: "Neboli nájdené žiadne výsledky",

  searchResultsText(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `${count} výsledok nájdený`;
    }

    // Numbers ending in 2-4, but not 12-14
    const isFew = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);

    if (isFew) {
      return `${count} výsledky nájdené`;
    }
    return `${count} výsledkov nájdených`;
  },
};

export default interfaceTranslations;
