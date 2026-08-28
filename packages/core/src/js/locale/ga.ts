//* Gaelic. Translated with DeepL.
import type { UiTranslations } from "./types.js";
import countryNames from "./country-names/ga.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Athraigh tír don uimhir theileafóin, roghnaithe faoi láthair ${countryName} (${dialCode})",
  noCountrySelected: "Roghnaigh tír don uimhir theileafóin",
  countryListAriaLabel: "Liosta tíortha",
  searchPlaceholder: "Cuardaigh",
  clearSearchAriaLabel: "Glan an cuardach",
  searchEmptyState: "Níor aimsíodh aon torthaí",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Níor aimsíodh aon torthaí";
    }
    if (count === 1) {
      return "1 toradh aimsithe";
    }
    return `${count} thoradh aimsithe`;
  },
};

export default {...interfaceTranslations, countryNames};
