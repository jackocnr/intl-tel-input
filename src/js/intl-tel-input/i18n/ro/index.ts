//* Romanian. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Țara selectată",
  noCountrySelected: "Nicio țară selectată",
  countryListAriaLabel: "Lista țărilor",
  searchPlaceholder: "Căutare",
  clearSearchAriaLabel: "Șterge căutarea",
  searchEmptyState: "Nici un rezultat gasit",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nici un rezultat gasit";
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
