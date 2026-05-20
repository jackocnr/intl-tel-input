//* Korean. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "전화번호 국가 변경, 선택됨: ${countryName} (${dialCode})",
  noCountrySelected: "전화번호 국가 선택",
  countryListAriaLabel: "국가 목록",
  searchPlaceholder: "검색",
  clearSearchAriaLabel: "검색 지우기",
  searchEmptyState: "검색 결과가 없습니다",

  searchSummaryAria(count) {
    if (count === 0) {
      return "검색 결과가 없습니다";
    }
    return `${count}개의 결과를 찾았습니다.`;
  },
};

export default interfaceTranslations;
