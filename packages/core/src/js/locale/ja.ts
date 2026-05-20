//* Japanese. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "電話番号の国を変更、選択中: ${countryName} (${dialCode})",
  noCountrySelected: "電話番号の国を選択",
  countryListAriaLabel: "国のリスト",
  searchPlaceholder: "検索",
  clearSearchAriaLabel: "検索をクリア",
  searchEmptyState: "結果が見つかりません",

  searchSummaryAria(count) {
    if (count === 0) {
      return "結果が見つかりません";
    }
    return `${count} 件の結果が見つかりました`;
  },
};

export default interfaceTranslations;
