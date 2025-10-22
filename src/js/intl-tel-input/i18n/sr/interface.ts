//* Serbian. Translated by: ChatGPT 5.
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Промени земљу, изабрано ${countryName} (${dialCode})",
  noCountrySelected: "Изабери земљу",
  countryListAriaLabel: "Листа земаља",
  searchPlaceholder: "Претрага",
  clearSearchAriaLabel: "Обриши претрагу",
  zeroSearchResults: "Нема резултата",

  searchResultsText(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Numbers ending in 1, but not 11
    if (mod10 === 1 && mod100 !== 11) {
      return `Пронађен ${count} резултат`;
    }

    // Numbers ending in 2-4, but not 12-14
    const isFew = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);

    return `${isFew ? "Пронађена" : "Пронађено"} ${count} резултата`;
  },

  // additional countries (not supported by country-list library)
  ac: "Острво Асенсион",
  xk: "Косово",
};

export default interfaceTranslations;
