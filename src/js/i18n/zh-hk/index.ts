//* Chinese (Hong Kong). Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "更改國家，選擇「${countryName}」（${dialCode}）",
  noCountrySelected: "選擇國家",
  countryListAriaLabel: "國家清單",
  searchPlaceholder: "搜尋",
  clearSearchAriaLabel: "清除搜尋",
  searchEmptyState: "未找到相關項目",

  searchSummaryAria(count) {
    if (count === 0) {
      return "未找到相關項目";
    }
    if (count === 1) {
      return "找到 1 個相關項目";
    }
    return `找到 ${count} 個相關項目`;
  },
};

export default interfaceTranslations;