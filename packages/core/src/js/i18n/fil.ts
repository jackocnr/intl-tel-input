//* Filipino. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Baguhin ang bansa, napili ang ${countryName} (${dialCode})",
  noCountrySelected: "Pumili ng bansa",
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
