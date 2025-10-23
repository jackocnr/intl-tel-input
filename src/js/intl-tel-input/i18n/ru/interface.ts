//* Russian. Translated by: Google Translate.
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Выбранная страна",
  noCountrySelected: "Страна не выбрана",
  countryListAriaLabel: "Список стран",
  searchPlaceholder: "Поиск",
  zeroSearchResults: "результатов не найдено",

  searchResultsText(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `найден ${count} результат`;
    }

    // Numbers ending in 2-4, but not 12-14
    const isFew = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);

    return `Найдено ${count} ${isFew ? "результата" : "результатов"}`;
  },

  // additional countries (not supported by country-list library)
  ac: "Остров Вознесения",
  xk: "Косово",
};

export default interfaceTranslations;
