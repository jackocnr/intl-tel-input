//* Estonian. Translated by: Maksim Maksimov (4matic).
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Muuda riiki telefoninumbri jaoks, valitud ${countryName} (${dialCode})",
  noCountrySelected: "Vali riik telefoninumbri jaoks",
  countryListAriaLabel: "Riikide nimekiri",
  searchPlaceholder: "Otsi",
  clearSearchAriaLabel: "Tühjenda otsing",
  searchEmptyState: "Tulemusi ei leitud",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Tulemusi ei leitud";
    }
    if (count === 1) {
      return "1 tulemus leitud";
    }
    return `${count} tulemust leitud`;
  },
};

export default interfaceTranslations;
