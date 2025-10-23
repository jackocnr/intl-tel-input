//* Czech. Translated by: Google Translate.
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Vybraná země",
  noCountrySelected: "Není vybrána žádná země",
  countryListAriaLabel: "Seznam zemí",
  searchPlaceholder: "Vyhledat",
  zeroSearchResults: "Nebyly nalezeny žádné výsledky",

  searchResultsText(count) {
    if (count === 1) {
      return "Nalezen 1 výsledek";
    }

    if (count >= 2 && count <= 4) {
      return `Nalezeny ${count} výsledky`;
    }

    return `Nalezeno ${count} výsledků`;
  },

  // additional countries (not supported by country-list library)
  ac: "Ascension",
  xk: "Kosovo",
};

export default interfaceTranslations;
