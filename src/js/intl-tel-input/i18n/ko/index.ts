//* Korean. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "선택한 국가",
  noCountrySelected: "선택한 국가가 없습니다.",
  countryListAriaLabel: "국가 목록",
  searchPlaceholder: "검색",
  searchEmptyState: "검색 결과가 없습니다",

  searchSummaryAria(count) {
    if (count === 0) {
      return "검색 결과가 없습니다";
    }
    if (count === 1) {
      return "1개의 결과를 찾았습니다.";
    }
    return `${count}개의 결과를 찾았습니다.`;
  },
};

export default interfaceTranslations;