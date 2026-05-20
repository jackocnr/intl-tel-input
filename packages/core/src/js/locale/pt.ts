//* Portuguese. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Alterar país para o número de telefone, selecionado ${countryName} (${dialCode})",
  noCountrySelected: "Selecionar país para o número de telefone",
  countryListAriaLabel: "Lista de países",
  searchPlaceholder: "Procurar",
  clearSearchAriaLabel: "Limpar pesquisa",
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
