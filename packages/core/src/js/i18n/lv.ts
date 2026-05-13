//* Latvian. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Mainīt valsti, izvēlēta ${countryName} (${dialCode})",
  noCountrySelected: "Izvēlieties valsti",
  countryListAriaLabel: "Valstu saraksts",
  searchPlaceholder: "Meklēt",
  clearSearchAriaLabel: "Notīrīt meklēšanu",
  searchEmptyState: "Rezultāti nav atrasti",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Rezultāti nav atrasti";
    }
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `Atrasts ${count} rezultāts`;
    }

    // Numbers ending in 0, or 11-19
    if (mod10 === 0 || (mod100 >= 11 && mod100 <= 19)) {
      return `Atrasti ${count} rezultātu`;
    }

    return `Atrasti ${count} rezultāti`;
  },
};

export default interfaceTranslations;
