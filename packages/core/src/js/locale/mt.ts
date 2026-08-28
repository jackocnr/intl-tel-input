//* Maltese. Translated with DeepL.
import type { UiTranslations } from "./types.js";
import countryNames from "./country-names/mt.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Biddel il-pajjiż għan-numru tat-telefon, attwalment magħżul ${countryName} (${dialCode})",
  noCountrySelected: "Agħżel il-pajjiż għan-numru tat-telefon",
  countryListAriaLabel: "Lista tal-pajjiżi",
  searchPlaceholder: "Fittex",
  clearSearchAriaLabel: "Ħassar it-tfittxija",
  searchEmptyState: "Ma nstabux riżultati",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Ma nstabux riżultati";
    }
    if (count === 1) {
      return "Instab riżultat 1";
    }
    return `Instabu ${count} riżultati.`;
  },
};

export default {...interfaceTranslations, countryNames};
