//* Danish. Translated by: Matthias Dilger (matthiasdilger).
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Valgt land",
  noCountrySelected: "Intet land er valgt",
  countryListAriaLabel: "Liste over lande",
  searchPlaceholder: "Søg",
  clearSearchAriaLabel: "Ryd søgning",
  searchEmptyState: "Ingen resultater fundet",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Ingen resultater fundet";
    }
    if (count === 1) {
      return "1 resultat fundet";
    }
    return `${count} resultater fundet`;
  },
};

export default interfaceTranslations;