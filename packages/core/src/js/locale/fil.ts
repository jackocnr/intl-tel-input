//* Filipino. Translated by: Claude.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Baguhin ang bansa para sa numero ng telepono, napili ang ${countryName} (${dialCode})",
  noCountrySelected: "Pumili ng bansa para sa numero ng telepono",
  countryListAriaLabel: "Listahan ng mga bansa",
  searchPlaceholder: "Maghanap",
  clearSearchAriaLabel: "I-clear ang paghahanap",
  searchEmptyState: "Walang nakitang resulta",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Walang nakitang resulta";
    }
    return `${count} resulta ang nakita`;
  },
};

export default interfaceTranslations;
