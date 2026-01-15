//* Telugu. Translated by: Google Translate.
import type { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "ఎంచుకున్న దేశం",
  noCountrySelected: "ఏ దేశం ఎంచుకోబడలేదు",
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