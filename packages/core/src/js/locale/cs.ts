//* Czech. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Změnit zemi pro telefonní číslo, vybráno ${countryName} (${dialCode})",
  noCountrySelected: "Vyberte zemi pro telefonní číslo",
  countryListAriaLabel: "Seznam zemí",
  searchPlaceholder: "Vyhledat",
  clearSearchAriaLabel: "Vymazat vyhledávání",
  searchEmptyState: "Nebyly nalezeny žádné výsledky",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nebyly nalezeny žádné výsledky";
    }
    if (count === 1) {
      return "Nalezen 1 výsledek";
    }

    if (count >= 2 && count <= 4) {
      return `Nalezeny ${count} výsledky`;
    }

    return `Nalezeno ${count} výsledků`;
  },
};

export default interfaceTranslations;
