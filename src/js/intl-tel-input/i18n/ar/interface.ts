//* Arabic. Translated by: Google Translate.
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "البلد المحدد",
  noCountrySelected: "لم يتم تحديد أي بلد",
  countryListAriaLabel: "قائمة الدول",
  searchPlaceholder: "يبحث",
  zeroSearchResults: "لم يتم العثور على نتائج",

  searchResultsText(count) {
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

  // additional countries (not supported by country-list library)
  ac: "جزيرة الصعود",
  xk: "كوسوفو",
};

export default interfaceTranslations;
