//* Vietnamese. Translated by: Eric Pastoor (epastoor) with help of google translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Quốc gia đã chọn",
  noCountrySelected: "Không có quốc gia nào được chọn",
  countryListAriaLabel: "Danh sách các quốc gia",
  searchPlaceholder: "Khám xét",
  clearSearchAriaLabel: "Xóa tìm kiếm",
  searchEmptyState: "Không tìm thấy kết quả nào",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Không tìm thấy kết quả nào";
    }
    if (count === 1) {
      return "Đã tìm thấy 1 kết quả";
    }
    return `Đã tìm thấy ${count} kết quả`;
  },
};

export default interfaceTranslations;
