//* Urdu. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "منتخب ملک",
  noCountrySelected: "کوئی ملک منتخب نہیں کیا گیا۔",
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