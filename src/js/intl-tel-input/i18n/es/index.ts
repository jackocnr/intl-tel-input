//* Spanish. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "País seleccionado",
  noCountrySelected: "Ningún país seleccionado",
  countryListAriaLabel: "Lista de países",
  searchPlaceholder: "Buscar",
  clearSearchAriaLabel: "Borrar búsqueda",
  searchEmptyState: "No se han encontrado resultados",

  searchSummaryAria(count) {
    if (count === 0) {
      return "No se han encontrado resultados";
    }
    if (count === 1) {
      return "1 resultado encontrado";
    }
    return `${count} resultados encontrados`;
  },
};

export default interfaceTranslations;
