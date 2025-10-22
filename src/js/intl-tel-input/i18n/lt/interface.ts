//* Lithuanian. Translated by: ChatGPT 5.
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Pakeisti šalį, pasirinkta ${countryName} (${dialCode})",
  noCountrySelected: "Pasirinkite šalį",
  countryListAriaLabel: "Šalių sąrašas",
  searchPlaceholder: "Paieška",
  clearSearchAriaLabel: "Išvalyti paiešką",
  zeroSearchResults: "Rezultatų nerasta",

  searchResultsText(count) {
    if (count === 1) {
      return "Rastas 1 rezultatas";
    }

    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `Rasti ${count} rezultatas`;
    }

    // Numbers ending in 2-9, but not 11-19
    if (mod10 >= 2 && mod10 <= 9 && !(mod100 >= 11 && mod100 <= 19)) {
      return `Rasti ${count} rezultatai`;
    }

    return `Rasta ${count} rezultatų`;
  },

  // additional countries (not supported by country-list library)
  ac: "Dangun Žengimo sala",
  xk: "Kosovas",
};

export default interfaceTranslations;
