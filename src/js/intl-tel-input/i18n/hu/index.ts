//* Hungarian. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Kiválasztott ország",
  noCountrySelected: "Nincs ország kiválasztva",
  countryListAriaLabel: "Országok listája",
  searchPlaceholder: "Keresés",
  searchEmptyState: "Nincs találat",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nincs találat";
    }
    if (count === 1) {
      return "1 találat";
    }
    return `${count} találat`;
  },
};

export default interfaceTranslations;