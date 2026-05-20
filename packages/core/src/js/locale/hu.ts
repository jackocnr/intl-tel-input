//* Hungarian. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Telefonszám országának módosítása, kiválasztva: ${countryName} (${dialCode})",
  noCountrySelected: "Válassz országot a telefonszámhoz",
  countryListAriaLabel: "Országok listája",
  searchPlaceholder: "Keresés",
  clearSearchAriaLabel: "Keresés törlése",
  searchEmptyState: "Nincs találat",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nincs találat";
    }
    return `${count} találat`;
  },
};

export default interfaceTranslations;
