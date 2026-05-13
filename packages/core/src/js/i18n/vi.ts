//* Vietnamese. Translated by: Eric Pastoor (epastoor) with help of google translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "Thay đổi quốc gia cho số điện thoại, đã chọn ${countryName} (${dialCode})",
  noCountrySelected: "Chọn quốc gia cho số điện thoại",
  countryListAriaLabel: "Danh sách các quốc gia",
  searchPlaceholder: "Khám xét",
  clearSearchAriaLabel: "Xóa tìm kiếm",
  searchEmptyState: "Không tìm thấy kết quả nào",

  searchSummaryAria(count) {
    if (count === 0) {
      return "Không tìm thấy kết quả nào";
    }
    return `Đã tìm thấy ${count} kết quả`;
  },
};

export default interfaceTranslations;
