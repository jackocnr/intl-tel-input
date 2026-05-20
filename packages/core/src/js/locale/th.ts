//* Thai. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "เปลี่ยนประเทศสำหรับหมายเลขโทรศัพท์, เลือก ${countryName} (${dialCode})",
  noCountrySelected: "เลือกประเทศสำหรับหมายเลขโทรศัพท์",
  countryListAriaLabel: "รายชื่อประเทศ",
  searchPlaceholder: "ค้นหา",
  clearSearchAriaLabel: "ล้างการค้นหา",
  searchEmptyState: "ไม่พบผลลัพธ์",

  searchSummaryAria(count) {
    if (count === 0) {
      return "ไม่พบผลลัพธ์";
    }
    return `พบผลลัพธ์ ${count} รายการ`;
  },
};

export default interfaceTranslations;
