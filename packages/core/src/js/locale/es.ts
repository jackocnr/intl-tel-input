//* Spanish. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Cambiar país para el número de teléfono, seleccionado ${countryName} (${dialCode})",
  noCountrySelected: "Selecciona el país para el número de teléfono",
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
