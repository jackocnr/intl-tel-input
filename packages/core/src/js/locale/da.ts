//* Danish. Translated by: Matthias Dilger (matthiasdilger).
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Skift land til telefonnummer, valgt ${countryName} (${dialCode})",
  noCountrySelected: "Vælg land til telefonnummer",
  countryListAriaLabel: "Liste over lande",
  searchPlaceholder: "Søg",
  clearSearchAriaLabel: "Ryd søgning",
  searchEmptyState: "Ingen resultater fundet",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Ingen resultater fundet";
    }
    if (count === 1) {
      return "1 resultat fundet";
    }
    return `${count} resultater fundet`;
  },
};

export default interfaceTranslations;
