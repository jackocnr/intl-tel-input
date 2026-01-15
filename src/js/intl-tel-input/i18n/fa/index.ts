//* Farsi/Persian. Translated by: Mahyar SBT (mahyarsbt).
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "کشور انتخاب شده",
  noCountrySelected: "هیچ کشوری انتخاب نشده است",
  countryListAriaLabel: "لیست کشورها",
  searchPlaceholder: "جستجو",
  clearSearchAriaLabel: "پاک کردن جستجو",
  searchEmptyState: "هیچ نتیجه‌ای یافت نشد",

  searchSummaryAria(count) {
    if (count === 0) {
      return "هیچ نتیجه‌ای یافت نشد";
    }
    if (count === 1) {
      return "1 نتیجه یافت شد";
    }
    return `${count} نتیجه یافت شد`;
  },
};

export default interfaceTranslations;
