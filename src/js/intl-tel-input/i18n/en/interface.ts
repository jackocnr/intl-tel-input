//* English. Translated by: Jack O'Connor (jackocnr).
import { I18n } from "../types";

const interfaceTranslations: I18n = {
  selectedCountryAriaLabel: "Change country, selected ${countryName} (${dialCode})",
  noCountrySelected: "Select country",
  countryListAriaLabel: "List of countries",
  searchPlaceholder: "Search",
  clearSearchAriaLabel: "Clear search",
  zeroSearchResults: "No results found",
  oneSearchResult: "1 result found",
  multipleSearchResults: "${count} results found",

  // additional countries (not supported by country-list library)
  ac: "Ascension Island",
  xk: "Kosovo",
};

export default interfaceTranslations;
