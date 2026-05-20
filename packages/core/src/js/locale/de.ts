//* German. Translated by: Jack O'Connor (jackocnr).
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Land der Telefonnummer ändern, ausgewählt ${countryName} (${dialCode})",
  noCountrySelected: "Land der Telefonnummer auswählen",
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
