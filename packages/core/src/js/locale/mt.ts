//* Maltese. Translated by: DeepL.
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
    const mod100 = count % 100;

    // Numbers ending in 2-10 take the plural noun
    if (mod100 >= 2 && mod100 <= 10) {
      return `Instabu ${count} riżultati`;
    }
    // Numbers ending in 11-19 take "-il" and the singular noun
    if (mod100 >= 11 && mod100 <= 19) {
      return `Instabu ${count}-il riżultat`;
    }
    // Everything else (20+) takes the singular noun
    return `Instabu ${count} riżultat`;
  },
};

export default { ...interfaceTranslations, countryNames };
