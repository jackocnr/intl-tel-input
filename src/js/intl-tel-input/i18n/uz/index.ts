//* English. Translated by: Mukhammadkhojiakbar Khusanov (khusanov-m).
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Tanlangan davlat",
  noCountrySelected: "Davlat tanlanmagan",
  countryListAriaLabel: "Davlatlar roʻyxati",
  searchPlaceholder: "Davlatni qidiring",
  searchEmptyState: "Natija topilmadi",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Natija topilmadi";
    }
    if (count === 1) {
      return "1-ta natija topildi";
    }
    return `${count}-ta natija topildi`;
  },
};

export default interfaceTranslations;
