//* Norwegian. Translated by: Eric Pastoor (epastoor) with help of google translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Endre land for telefonnummer, valgt ${countryName} (${dialCode})",
  noCountrySelected: "Velg land for telefonnummer",
  countryListAriaLabel: "Liste over land",
  searchPlaceholder: "Søk",
  clearSearchAriaLabel: "Tøm søk",
  searchEmptyState: "Ingen resultater funnet",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Ingen resultater funnet";
    }
    if (count === 1) {
      return "1 resultat funnet";
    }
    return `${count} resultater funnet`;
  },
};

export default interfaceTranslations;
