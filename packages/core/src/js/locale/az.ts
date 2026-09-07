//* Azerbaijani. Translated by: Jamal (jamalkamaladdin).
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Telefon nömrəsi üçün ölkəni dəyiş, hazırda seçilmiş ${countryName} (${dialCode})",
  noCountrySelected: "Telefon nömrəsi üçün ölkə seç",
  countryListAriaLabel: "Ölkələr siyahısı",
  searchPlaceholder: "Axtarış",
  clearSearchAriaLabel: "Axtarışı təmizlə",
  searchEmptyState: "Nəticə tapılmadı",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nəticə tapılmadı";
    }
    if (count === 1) {
      return "1 nəticə tapıldı";
    }
    return `${count} nəticə tapıldı`;
  },
};

export default interfaceTranslations;
