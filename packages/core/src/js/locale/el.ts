//* Greek. Translated by: Anthony Veaudry (anthony0030).
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Αλλαγή χώρας για τον αριθμό τηλεφώνου, επιλεγμένη ${countryName} (${dialCode})",
  noCountrySelected: "Επιλέξτε χώρα για τον αριθμό τηλεφώνου",
  countryListAriaLabel: "Κατάλογος χωρών",
  searchPlaceholder: "Αναζήτηση",
  clearSearchAriaLabel: "Εκκαθάριση αναζήτησης",
  searchEmptyState: "Δεν βρέθηκαν αποτελέσματα",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Δεν βρέθηκαν αποτελέσματα";
    }
    if (count === 1) {
      return "Βρέθηκε 1 αποτέλεσμα";
    }
    return `Βρέθηκαν ${count} αποτελέσματα`;
  },
};

export default interfaceTranslations;
