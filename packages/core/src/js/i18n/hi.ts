//* Hindi. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "फ़ोन नंबर के लिए देश बदलें, चयनित ${countryName} (${dialCode})",
  noCountrySelected: "फ़ोन नंबर के लिए देश चुनें",
  countryListAriaLabel: "देशों की सूची",
  searchPlaceholder: "खोज",
  clearSearchAriaLabel: "खोज साफ़ करें",
  searchEmptyState: "कोई परिणाम नहीं मिला",

  searchSummaryAria(count) {
    if (count === 0) {
      return "कोई परिणाम नहीं मिला";
    }
    if (count === 1) {
      return "1 परिणाम मिला";
    }
    return `${count} परिणाम मिले`;
  },
};

export default interfaceTranslations;
