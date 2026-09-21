//* Irish. Translated by: DeepL.
import type { UiTranslations } from "./types.js";
import countryNames from "./country-names/ga.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Athraigh tír don uimhir theileafóin, roghnaithe faoi láthair ${countryName} (${dialCode})",
  noCountrySelected: "Roghnaigh tír don uimhir theileafóin",
  countryListAriaLabel: "Liosta tíortha",
  searchPlaceholder: "Cuardaigh",
  clearSearchAriaLabel: "Glan an cuardach",
  closeCountrySelectorAriaLabel: "Dún",
  searchEmptyState: "Níor aimsíodh aon torthaí",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Níor aimsíodh aon torthaí";
    }
    if (count === 1) {
      return "1 toradh aimsithe";
    }
    // The noun stays singular after a number, but its initial mutation depends on the count
    if (count >= 2 && count <= 6) {
      return `${count} thoradh aimsithe`;
    }
    if (count >= 7 && count <= 10) {
      return `${count} dtoradh aimsithe`;
    }
    return `${count} toradh aimsithe`;
  },
};

export default { ...interfaceTranslations, countryNames };
