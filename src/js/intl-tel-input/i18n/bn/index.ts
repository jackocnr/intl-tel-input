//* Bengali. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "নির্বাচিত দেশ",
  noCountrySelected: "কোনো দেশ নির্বাচন করা হয়নি",
  countryListAriaLabel: "দেশের তালিকা",
  searchPlaceholder: "অনুসন্ধান করুন",
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
