//* Portuguese. Translated by: Vitor Coelho.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Alterar o país do número de telefone. Selecionado: ${countryName} (${dialCode})",
  noCountrySelected: "Selecionar o país do número de telefone",
  countryListAriaLabel: "Lista de países",
  searchPlaceholder: "Pesquisar",
  clearSearchAriaLabel: "Limpar pesquisa",
  closeCountrySelectorAriaLabel: "Fechar",
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
