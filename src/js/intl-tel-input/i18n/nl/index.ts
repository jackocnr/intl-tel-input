//* Dutch. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Geselecteerd land",
  noCountrySelected: "Geen land geselecteerd",
  countryListAriaLabel: "Lijst met landen",
  searchPlaceholder: "Zoekopdracht",
  searchEmptyState: "Geen resultaten gevonden",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Geen resultaten gevonden";
    }
    if (count === 1) {
      return "1 resultaat gevonden";
    }
    return `${count} resultaten gevonden`;
  },
};

export default interfaceTranslations;