//* Dutch. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Land van telefoonnummer wijzigen, geselecteerd ${countryName} (${dialCode})",
  noCountrySelected: "Selecteer land van telefoonnummer",
  countryListAriaLabel: "Lijst met landen",
  searchPlaceholder: "Zoekopdracht",
  clearSearchAriaLabel: "Zoekopdracht wissen",
  searchEmptyState: "Geen resultaten gevonden",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Geen resultaten gevonden";
    }
    if (count === 1) {
      return "1 resultaat gevonden";
    }
    return `${count} resultaten gevonden`;
  },
};

export default interfaceTranslations;
