//* Catalan. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "País seleccionat",
  noCountrySelected: "No s'ha seleccionat cap país",
  countryListAriaLabel: "Llista de països",
  searchPlaceholder: "Cerca",
  searchEmptyState: "Sense resultats",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Sense resultats";
    }
    if (count === 1) {
      return "1 resultat trobat";
    }
    return `${count} resultats trobats`;
  },
};

export default interfaceTranslations;

