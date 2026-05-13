//* Chinese (Simplified). Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "更改电话号码的国家，已选择 ${countryName}（${dialCode}）",
  noCountrySelected: "选择电话号码的国家",
  countryListAriaLabel: "国家名单",
  searchPlaceholder: "搜索",
  clearSearchAriaLabel: "清除搜索",
  searchEmptyState: "未找到结果",

  searchSummaryAria(count) {
    if (count === 0) {
      return "未找到结果";
    }
    return `找到 ${count} 个结果`;
  },
};

export default interfaceTranslations;
