//* Polish. Translated by: Mateusz Bronis (bronisMateusz) https://github.com/bronisMateusz.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Wybrany kraj",
  noCountrySelected: "Nie wybrano kraju",
  countryListAriaLabel: "Lista krajów",
  searchPlaceholder: "Szukaj",
  clearSearchAriaLabel: "Wyczyść wyszukiwanie",
  searchEmptyState: "Nie znaleziono wyników",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Nie znaleziono wyników";
    }
    if (count === 1) {
      return "Znaleziono 1 wynik";
    }

    // Numbers ending with 2, 3, 4 (except those ending with 12, 13, 14) use "wyniki". All others use "wyników".
    const isFew =
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      !(count % 100 >= 12 && count % 100 <= 14);

    if (isFew) {
      return `Znaleziono ${count} wyniki`;
    }
    return `Znaleziono ${count} wyników`;
  },
};

export default interfaceTranslations;
