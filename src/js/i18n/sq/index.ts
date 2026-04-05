//* Shqip (Albanian). Translated by: ChatGPT 5.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Ndrysho vendin, i zgjedhur ${countryName} (${dialCode})",
  noCountrySelected: "Zgjidh vendin",
  countryListAriaLabel: "Lista e vendeve",
  searchPlaceholder: "Kërko",
  clearSearchAriaLabel: "Pastro kërkimin",
  searchEmptyState: "Nuk u gjet asnjë rezultat",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nuk u gjet asnjë rezultat";
    }
    if (count === 1) {
      return "U gjet 1 rezultat";
    }
    return `U gjetën ${count} rezultate`;
  },
};

export default interfaceTranslations;
