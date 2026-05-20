//* Marathi. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "फोन नंबरसाठी देश बदला, निवडलेला ${countryName} (${dialCode})",
  noCountrySelected: "फोन नंबरसाठी देश निवडा",
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
