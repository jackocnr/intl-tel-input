//* French. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Pays sélectionné",
  noCountrySelected: "Aucun pays sélectionné",
  countryListAriaLabel: "Liste des pays",
  searchPlaceholder: "Recherche",
  clearSearchAriaLabel: "Effacer la recherche",
  searchEmptyState: "Aucun résultat trouvé",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Aucun résultat trouvé";
    }
    if (count === 1) {
      return "1 résultat trouvé";
    }
    return `${count} résultats trouvés`;
  },
};

export default interfaceTranslations;