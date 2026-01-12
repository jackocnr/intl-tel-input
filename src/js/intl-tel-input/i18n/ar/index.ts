//* Arabic. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "البلد المحدد",
  noCountrySelected: "لم يتم تحديد أي بلد",
  countryListAriaLabel: "قائمة الدول",
  searchPlaceholder: "يبحث",
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
