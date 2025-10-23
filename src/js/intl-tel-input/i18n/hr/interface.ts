//* Croatian. Translated by: Harun Sabljaković (sabljak) */
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Odabrana zemlja",
  noCountrySelected: "Zemlja nije odabrana",
  countryListAriaLabel: "Lista zemalja",
  searchPlaceholder: "Pretraži",
  zeroSearchResults: "Nema pronađenih rezultata",

  searchResultsText(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `Pronađen ${count} rezultat`;
    }

    // Numbers ending in 2-4, but not 12-14
    const isFew = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);

    return `${isFew ? "Pronađena" : "Pronađeno"} ${count} rezultata`;
  },

  // additional countries (not supported by country-list library)
  ac: "Ascension",
  xk: "Kosovo",
};

export default interfaceTranslations;
