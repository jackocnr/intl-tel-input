//* Slovenian. Translated by: ChatGPT 5.
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Spremeni državo, izbrano ${countryName} (${dialCode})",
  noCountrySelected: "Izberi državo",
  countryListAriaLabel: "Seznam držav",
  searchPlaceholder: "Išči",
  clearSearchAriaLabel: "Počisti iskanje",
  zeroSearchResults: "Ni rezultatov",

  searchResultsText(count) {
    // Slovenian pluralisation is determined by the last two digits
    const mod100 = count % 100;

    // Numbers ending in 01
    if (mod100 === 1) {
      return `Najden ${count} rezultat`;
    }

    // Numbers ending in 02
    if (mod100 === 2) {
      return `Najdena ${count} rezultata`;
    }

    // Numbers ending in 03 or 04
    if (mod100 === 3 || mod100 === 4) {
      return `Najdeni ${count} rezultati`;
    }

    return `Najdenih ${count} rezultatov`;
  },

  // additional countries (not supported by country-list library)
  ac: "Otok Ascension",
  xk: "Kosovo",
};

export default interfaceTranslations;
