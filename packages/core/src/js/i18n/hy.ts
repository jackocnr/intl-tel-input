//* Armenian. Translated by: Claude.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Փոխել երկիրը, ընտրված է ${countryName} (${dialCode})",
  noCountrySelected: "Ընտրեք երկիր",
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

export default interfaceTranslations;
