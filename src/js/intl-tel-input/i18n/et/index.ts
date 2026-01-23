//* Estonian. Translated by: Maksim Maksimov (4matic).
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Valitud riik",
  noCountrySelected: "Ühtegi riiki pole valitud",
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
