//* Kannada (ಕನ್ನಡ) Translated by: Mohammed Rashad Qadri (https://github.com/rashadmehtab)
import type { UiTranslations } from "./types.js";

const interfaceTranslations: UiTranslations = {
  selectedCountryAriaLabel:
    "ಫೋನ್ ಸಂಖ್ಯೆಗಾಗಿ ದೇಶವನ್ನು ಬದಲಾಯಿಸಿ, ಆಯ್ಕೆಯಾಗಿದೆ ${countryName} (${dialCode})",
  noCountrySelected: "ಫೋನ್ ಸಂಖ್ಯೆಗಾಗಿ ದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
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
