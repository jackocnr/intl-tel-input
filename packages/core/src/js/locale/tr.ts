//* Turkish. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Telefon numarası için ülke değiştir, seçili ${countryName} (${dialCode})",
  noCountrySelected: "Telefon numarası için ülke seç",
  countryListAriaLabel: "Ülke listesi",
  searchPlaceholder: "Ara",
  clearSearchAriaLabel: "Aramayı temizle",
  searchEmptyState: "Sonuç bulunamadı",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Sonuç bulunamadı";
    }
    return `${count} sonuç bulundu`;
  },
};

export default interfaceTranslations;
