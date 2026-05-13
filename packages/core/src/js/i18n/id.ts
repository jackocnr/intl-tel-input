//* Indonesian. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Ubah negara untuk nomor telepon, dipilih ${countryName} (${dialCode})",
  noCountrySelected: "Pilih negara untuk nomor telepon",
  countryListAriaLabel: "Daftar negara",
  searchPlaceholder: "Mencari",
  clearSearchAriaLabel: "Hapus pencarian",
  searchEmptyState: "Tidak ada hasil yang ditemukan",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Tidak ada hasil yang ditemukan";
    }
    return `${count} hasil ditemukan`;
  },
};

export default interfaceTranslations;
