//* Marathi. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "निवडलेला देश",
  noCountrySelected: "कोणताही देश निवडलेला नाही",
  countryListAriaLabel: "देशांची यादी",
  searchPlaceholder: "शोधा",
  clearSearchAriaLabel: "शोध साफ करा",
  searchEmptyState: "कोणतेही परिणाम आढळले नाहीत",

  searchSummaryAria(count) {
    if (count === 0) {
      return "कोणतेही परिणाम आढळले नाहीत";
    }
    if (count === 1) {
      return "1 परिणाम आढळला";
    }
    return `${count} परिणाम आढळले`;
  },
};

export default interfaceTranslations;