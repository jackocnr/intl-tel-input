//* Swedish. Translated by: Nhi Tran.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Valt land",
  noCountrySelected: "Inget land valt",
  countryListAriaLabel: "Lista över länder",
  searchPlaceholder: "Sök",
  clearSearchAriaLabel: "Rensa sökning",
  searchEmptyState: "Inga resultat hittades",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Inga resultat hittades";
    }
    if (count === 1) {
      return "1 resultat hittades";
    }
    return `${count} resultat hittades`;
  },
};

export default interfaceTranslations;