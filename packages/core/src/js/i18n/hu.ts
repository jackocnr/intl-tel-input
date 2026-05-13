//* Hungarian. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
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
