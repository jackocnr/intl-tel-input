//* Urdu. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "فون نمبر کے لیے ملک تبدیل کریں، منتخب ${countryName} (${dialCode})",
  noCountrySelected: "فون نمبر کے لیے ملک منتخب کریں",
  countryListAriaLabel: "ممالک کی فہرست",
  searchPlaceholder: "تلاش کریں۔",
  clearSearchAriaLabel: "تلاش صاف کریں",
  searchEmptyState: "کوئی نتیجہ نہیں",

  searchSummaryAria(count) {
    if (count === 0) {
      return "کوئی نتیجہ نہیں";
    }
    if (count === 1) {
      return "1 نتیجہ ملا";
    }
    return `${count} نتائج ملے`;
  },
};

export default interfaceTranslations;
