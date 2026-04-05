//* German. Translated by: Jack O'Connor (jackocnr).
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Ausgewähltes Land",
  noCountrySelected: "Kein Land ausgewählt",
  countryListAriaLabel: "Liste der Länder",
  searchPlaceholder: "Suchen",
  clearSearchAriaLabel: "Suche löschen",
  searchEmptyState: "Keine Suchergebnisse",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Keine Suchergebnisse";
    }
    if (count === 1) {
      return "1 Suchergebnis";
    }
    return `${count} Suchergebnisse`;
  },
};

export default interfaceTranslations;
