//* Turkish. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Seçilen ülke",
  noCountrySelected: "Hiçbir ülke seçilmedi",
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
