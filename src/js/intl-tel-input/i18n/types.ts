import type { Iso2 } from "../data";

// Country translation keys + additional UI strings.
// We reference Iso2 so adding/removing a country automatically updates typing.
export type I18n = Partial<Record<Iso2, string>> & {
  selectedCountryAriaLabel?: string;
  searchPlaceholder?: string;
  clearSearchAriaLabel?: string;
  countryListAriaLabel?: string;
  oneSearchResult?: string;
  multipleSearchResults?: string;
  noCountrySelected?: string;
  zeroSearchResults?: string;
  searchResultsText?: (count: number) => string;
};