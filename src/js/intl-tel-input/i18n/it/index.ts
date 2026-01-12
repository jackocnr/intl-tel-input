//* Italian. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Paese selezionato",
  noCountrySelected: "Nessun paese selezionato",
  countryListAriaLabel: "Elenco dei paesi",
  searchPlaceholder: "Ricerca",
  searchEmptyState: "Nessun risultato trovato",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nessun risultato trovato";
    }
    if (count === 1) {
      return "1 risultato trovato";
    }
    return `${count} risultati trovati`;
  },
};

export default interfaceTranslations;