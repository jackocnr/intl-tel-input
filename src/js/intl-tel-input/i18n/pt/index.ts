//* Portuguese. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "País selecionado",
  noCountrySelected: "Nenhum país selecionado",
  countryListAriaLabel: "Lista de países",
  searchPlaceholder: "Procurar",
  searchEmptyState: "Nenhum resultado encontrado",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nenhum resultado encontrado";
    }
    if (count === 1) {
      return "1 resultado encontrado";
    }
    return `${count} resultados encontrados`;
  },
};

export default interfaceTranslations;