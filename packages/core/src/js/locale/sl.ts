//* Slovenian. Translated by: ChatGPT 5.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Spremeni državo za telefonsko številko, izbrano ${countryName} (${dialCode})",
  noCountrySelected: "Izberi državo za telefonsko številko",
  countryListAriaLabel: "Seznam držav",
  searchPlaceholder: "Išči",
  clearSearchAriaLabel: "Počisti iskanje",
  searchEmptyState: "Ni rezultatov",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Ni rezultatov";
    }
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
};

export default interfaceTranslations;
