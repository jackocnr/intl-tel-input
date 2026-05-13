//* Swahili. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Badilisha nchi kwa nambari ya simu, imechaguliwa ${countryName} (${dialCode})",
  noCountrySelected: "Chagua nchi kwa nambari ya simu",
  countryListAriaLabel: "Orodha ya nchi",
  searchPlaceholder: "Tafuta",
  clearSearchAriaLabel: "Futa utafutaji",
  searchEmptyState: "Hakuna matokeo yaliyopatikana",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Hakuna matokeo yaliyopatikana";
    }
    if (count === 1) {
      return "Tokeo 1 limepatikana";
    }
    return `Matokeo ${count} yamepatikana`;
  },
};

export default interfaceTranslations;
