//* English. Translated by: Mukhammadkhojiakbar Khusanov (khusanov-m).
import type { UiTranslations } from "./types.js";
import countryNames from "./country-names/uz.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Telefon raqami uchun davlatni o'zgartirish, tanlangan ${countryName} (${dialCode})",
  noCountrySelected: "Telefon raqami uchun davlatni tanlang",
  countryListAriaLabel: "Davlatlar roʻyxati",
  searchPlaceholder: "Davlatni qidiring",
  clearSearchAriaLabel: "Qidiruvni tozalang",
  searchEmptyState: "Natija topilmadi",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Natija topilmadi";
    }
    return `${count}-ta natija topildi`;
  },
};

export default { ...interfaceTranslations, countryNames };
