//* Romanian. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Țara selectată",
  noCountrySelected: "Nicio țară selectată",
  countryListAriaLabel: "Lista țărilor",
  searchPlaceholder: "Căutare",
  zeroSearchResults: "Nici un rezultat gasit",

  searchResultsText(count) {
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
