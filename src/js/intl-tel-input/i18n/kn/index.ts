//* Kannada (ಕನ್ನಡ) Translated by: Mohammed Rashad Qadri (https://github.com/rashadmehtab)
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "ಆಯ್ಕೆಮಾಡಿದ ದೇಶ",
  noCountrySelected: "ಯಾವುದೇ ದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ",
  countryListAriaLabel: "ದೇಶಗಳ ಪಟ್ಟಿ",
  searchPlaceholder: "ಹುಡುಕಿ",
  clearSearchAriaLabel: "ಹುಡುಕಾಟ ಅಳಿಸಿ",
  searchEmptyState: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ",

  searchSummaryAria(count) {
    if (count === 0) {
      return "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ";
    }
    if (count === 1) {
      return "1 ಫಲಿತಾಂಶ ಕಂಡುಬಂದಿದೆ";
    }
    return `${count} ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿವೆ`;
  },
};

export default interfaceTranslations;
