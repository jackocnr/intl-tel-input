//* Hebrew. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "שנה מדינה עבור מספר הטלפון, נבחרה ${countryName} (${dialCode})",
  noCountrySelected: "בחר מדינה עבור מספר הטלפון",
  countryListAriaLabel: "רשימת מדינות",
  searchPlaceholder: "חיפוש",
  clearSearchAriaLabel: "נקה חיפוש",
  searchEmptyState: "לא נמצאו תוצאות",

  searchSummaryAria(count) {
    if (count === 0) {
      return "לא נמצאו תוצאות";
    }
    if (count === 1) {
      return "נמצאה תוצאה אחת";
    }
    return `נמצאו ${count} תוצאות`;
  },
};

export default interfaceTranslations;
