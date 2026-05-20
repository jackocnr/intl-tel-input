//* Catalan. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Canvia el país per al número de telèfon, seleccionat ${countryName} (${dialCode})",
  noCountrySelected: "Selecciona el país per al número de telèfon",
  countryListAriaLabel: "Llista de països",
  searchPlaceholder: "Cerca",
  clearSearchAriaLabel: "Esborra la cerca",
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
