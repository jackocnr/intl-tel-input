//* Farsi/Persian. Translated by: Mahyar SBT (mahyarsbt).
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "تغییر کشور برای شماره تلفن، انتخاب شده ${countryName} (${dialCode})",
  noCountrySelected: "کشور را برای شماره تلفن انتخاب کنید",
  countryListAriaLabel: "لیست کشورها",
  searchPlaceholder: "جستجو",
  clearSearchAriaLabel: "پاک کردن جستجو",
  searchEmptyState: "هیچ نتیجه‌ای یافت نشد",

  searchSummaryAria(count) {
    if (count === 0) {
      return "هیچ نتیجه‌ای یافت نشد";
    }
    return `${count} نتیجه یافت شد`;
  },
};

export default interfaceTranslations;
