//* Bosnian. Translated by: Harun Sabljaković (sabljak) */
import type { UiTranslations } from "./types.js";
import countryNames from "./country-names/bs.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Promijeni zemlju za telefonski broj, izabrano ${countryName} (${dialCode})",
  noCountrySelected: "Odaberi zemlju za telefonski broj",
  countryListAriaLabel: "Lista zemalja",
  searchPlaceholder: "Pretraži",
  clearSearchAriaLabel: "Očisti pretragu",
  searchEmptyState: "Nema pronađenih rezultata",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nema pronađenih rezultata";
    }
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `Pronađen ${count} rezultat`;
    }

    // Numbers ending in 2-4, but not 12-14
    const isFew = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);

    if (isFew) {
      return `Pronađena ${count} rezultata`;
    }

    return `Pronađeno ${count} rezultata`;
  },
};

export default { ...interfaceTranslations, countryNames };
