//* Polish. Translated by: Mateusz Bronis (bronisMateusz) https://github.com/bronisMateusz.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Wybrany kraj",
  noCountrySelected: "Nie wybrano kraju",
  countryListAriaLabel: "Lista krajów",
  searchPlaceholder: "Szukaj",
  zeroSearchResults: "Nie znaleziono wyników",

  searchResultsText(count) {
    if (count === 1) {
      return "Znaleziono 1 wynik";
    }

    // Numbers ending with 2, 3, 4 (except those ending with 12, 13, 14) use "wyniki". All others use "wyników".
    const isFew =
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      !(count % 100 >= 12 && count % 100 <= 14);

    const suffix = isFew ? "wyniki" : "wyników";
    return `Znaleziono ${count} ${suffix}`;
  },
};

export default interfaceTranslations;
