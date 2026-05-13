//* Malay. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Tukar negara, dipilih ${countryName} (${dialCode})",
  noCountrySelected: "Pilih negara",
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
