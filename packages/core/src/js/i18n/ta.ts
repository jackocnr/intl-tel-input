//* Tamil. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "தொலைபேசி எண்ணுக்கு நாட்டை மாற்று, தேர்ந்தெடுக்கப்பட்டது ${countryName} (${dialCode})",
  noCountrySelected: "தொலைபேசி எண்ணுக்கு நாட்டைத் தேர்ந்தெடுக்கவும்",
  countryListAriaLabel: "நாடுகளின் பட்டியல்",
  searchPlaceholder: "தேடு",
  clearSearchAriaLabel: "தேடலை அழி",
  searchEmptyState: "முடிவுகள் எதுவும் கிடைக்கவில்லை",

  searchSummaryAria(count) {
    if (count === 0) {
      return "முடிவுகள் எதுவும் கிடைக்கவில்லை";
    }
    if (count === 1) {
      return "1 முடிவு கிடைத்தது";
    }
    return `${count} முடிவுகள் கிடைத்தன`;
  },
};

export default interfaceTranslations;
