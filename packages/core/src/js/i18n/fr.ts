//* French. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Changer le pays du numéro de téléphone, sélectionné ${countryName} (${dialCode})",
  noCountrySelected: "Sélectionnez le pays du numéro de téléphone",
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
