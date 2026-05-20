//* Icelandic. Translated by: Claude.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Breyta landi fyrir símanúmer, valið ${countryName} (${dialCode})",
  noCountrySelected: "Veldu land fyrir símanúmer",
  countryListAriaLabel: "Listi yfir lönd",
  searchPlaceholder: "Leita",
  clearSearchAriaLabel: "Hreinsa leit",
  searchEmptyState: "Engar niðurstöður fundust",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Engar niðurstöður fundust";
    }
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `${count} niðurstaða fannst`;
    }

    return `${count} niðurstöður fundust`;
  },
};

export default interfaceTranslations;
