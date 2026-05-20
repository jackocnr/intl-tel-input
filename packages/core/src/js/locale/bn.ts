//* Bengali. Translated by: Google Translate.
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "ফোন নম্বরের জন্য দেশ পরিবর্তন করুন, নির্বাচিত ${countryName} (${dialCode})",
  noCountrySelected: "ফোন নম্বরের জন্য দেশ নির্বাচন করুন",
  countryListAriaLabel: "দেশের তালিকা",
  searchPlaceholder: "অনুসন্ধান করুন",
  clearSearchAriaLabel: "অনুসন্ধান পরিষ্কার করুন",
  searchEmptyState: "কোন ফলাফল পাওয়া যায়নি",

  searchSummaryAria(count) {
    if (count === 0) {
      return "কোন ফলাফল পাওয়া যায়নি";
    }
    if (count === 1) {
      return "1টি ফলাফল পাওয়া গেছে";
    }
    return `${count} ফলাফল পাওয়া গেছে`;
  },
};

export default interfaceTranslations;
