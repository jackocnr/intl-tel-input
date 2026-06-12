//* Armenian. Translated by: Claude.
import type { UiTranslations } from "./types.js";
import countryNames from "./country-names/hy.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "Փոխել երկիրը հեռախոսահամարի համար, ընտրված է ${countryName} (${dialCode})",
  noCountrySelected: "Ընտրեք երկիր հեռախոսահամարի համար",
  countryListAriaLabel: "Երկրների ցանկ",
  searchPlaceholder: "Որոնում",
  clearSearchAriaLabel: "Մաքրել որոնումը",
  searchEmptyState: "Արդյունքներ չեն գտնվել",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Արդյունքներ չեն գտնվել";
    }
    if (count === 1) {
      return "Գտնվել է 1 արդյունք";
    }
    return `Գտնվել են ${count} արդյունք`;
  },
};

export default { ...interfaceTranslations, countryNames };
