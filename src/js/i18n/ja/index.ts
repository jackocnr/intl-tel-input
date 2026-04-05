//* Japanese. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "選択した国",
  noCountrySelected: "国が選択されていません",
  countryListAriaLabel: "国のリスト",
  searchPlaceholder: "検索",
  clearSearchAriaLabel: "検索をクリア",
  searchEmptyState: "結果が見つかりません",

  searchSummaryAria(count) {
    if (count === 0) {
      return "結果が見つかりません";
    }
    if (count === 1) {
      return "1 件の結果が見つかりました";
    }
    return `${count} 件の結果が見つかりました`;
  },
};

export default interfaceTranslations;