//* Malay. Translated by: Claude.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Tukar negara untuk nombor telefon, dipilih ${countryName} (${dialCode})",
  noCountrySelected: "Pilih negara untuk nombor telefon",
  countryListAriaLabel: "Senarai negara",
  searchPlaceholder: "Cari",
  clearSearchAriaLabel: "Kosongkan carian",
  searchEmptyState: "Tiada hasil ditemui",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Tiada hasil ditemui";
    }
    return `${count} hasil ditemui`;
  },
};

export default interfaceTranslations;
