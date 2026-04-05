//* Chinese (Simplified). Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "所选国家",
  noCountrySelected: "未选择国家/地区",
  countryListAriaLabel: "国家名单",
  searchPlaceholder: "搜索",
  clearSearchAriaLabel: "清除搜索",
  searchEmptyState: "未找到结果",

  searchSummaryAria(count) {
    if (count === 0) {
      return "未找到结果";
    }
    if (count === 1) {
      return "找到 1 个结果";
    }
    return `找到 ${count} 个结果`;
  },
};

export default interfaceTranslations;