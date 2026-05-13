//* Telugu. Translated by: Google Translate.
import type { I18n } from "./types.js";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel:
    "ఫోన్ నంబర్ కోసం దేశాన్ని మార్చండి, ఎంచుకున్నది ${countryName} (${dialCode})",
  noCountrySelected: "ఫోన్ నంబర్ కోసం దేశాన్ని ఎంచుకోండి",
  countryListAriaLabel: "దేశాల జాబితా",
  searchPlaceholder: "వెతకండి",
  clearSearchAriaLabel: "శోధనను క్లియర్ చేయండి",
  searchEmptyState: "ఎటువంటి ఫలితాలు లభించలేదు",

  searchSummaryAria(count) {
    if (count === 0) {
      return "ఎటువంటి ఫలితాలు లభించలేదు";
    }
    if (count === 1) {
      return "1 ఫలితం కనుగొనబడింది";
    }
    return `${count} ఫలితాలు కనుగొనబడ్డాయి`;
  },
};

export default interfaceTranslations;
