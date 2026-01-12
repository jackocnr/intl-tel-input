//* Greek. Translated by: Anthony Veaudry (anthony0030).
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Επιλεγμένη χώρα",
  noCountrySelected: "Δεν έχει επιλεγεί χώρα",
  countryListAriaLabel: "Κατάλογος χωρών",
  searchPlaceholder: "Αναζήτηση",
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
