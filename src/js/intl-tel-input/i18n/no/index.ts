//* Norwegian. Translated by: Eric Pastoor (epastoor) with help of google translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Valgt land",
  noCountrySelected: "Ingen land er valgt",
  countryListAriaLabel: "Liste over land",
  searchPlaceholder: "Leting",
  clearSearchAriaLabel: "Tøm søk",
  searchEmptyState: "Ingen resultater funnet",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Ingen resultater funnet";
    }
    if (count === 1) {
      return "1 resultat funnet";
    }
    return `${count} resultater funnet`;
  },
};

export default interfaceTranslations;
