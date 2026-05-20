//* Arabic. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "تغيير الدولة لرقم الهاتف، المحددة ${countryName} (${dialCode})",
  noCountrySelected: "اختر دولة لرقم الهاتف",
  countryListAriaLabel: "قائمة الدول",
  searchPlaceholder: "بحث",
  clearSearchAriaLabel: "مسح البحث",
  searchEmptyState: "لم يتم العثور على نتائج",

  searchSummaryAria(count) {
    if (count === 0) {
      return "لم يتم العثور على نتائج";
    }
    if (count === 1) {
      return "تم العثور على نتيجة واحدة";
    }

    if (count === 2) {
      return "تم العثور على نتيجتين";
    }

    // Numbers ending in 3-10
    if (count % 100 >= 3 && count % 100 <= 10) {
      return `تم العثور على ${count} نتائج`;
    }

    return `تم العثور على ${count} نتيجة`;
  },
};

export default interfaceTranslations;
