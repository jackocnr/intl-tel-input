//* Romanian. Translated by: Google Translate.
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Țara selectată",
  noCountrySelected: "Nicio țară selectată",
  countryListAriaLabel: "Lista țărilor",
  searchPlaceholder: "Căutare",
  zeroSearchResults: "Nici un rezultat gasit",

  searchResultsText(count) {
    if (count === 1) {
      return "1 rezultat găsit";
    }

    const isFew = count % 100 >= 1 && count % 100 <= 19;

    return `${count}${isFew ? "" : " de"} rezultate găsite`;
  },

  // additional countries (not supported by country-list library)
  ac: "Insula Ascensiunii",
  xk: "Kosovo",
};

export default interfaceTranslations;
