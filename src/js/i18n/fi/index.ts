//* Finnish. Translated by: Michael Winton (mrwinton).
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Valittu maa",
  noCountrySelected: "Maata ei ole valittu",
  countryListAriaLabel: "Luettelo maista",
  searchPlaceholder: "Haku",
  clearSearchAriaLabel: "Tyhjennä haku",
  searchEmptyState: "Ei tuloksia",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Ei tuloksia";
    }
    if (count === 1) {
      return "1 tulos löytyi";
    }
    return `${count} tulosta löytyi`;
  },
};

export default interfaceTranslations;
