import type { Iso2 } from "../data.js";

// UI strings shown by the core library.
export type UiTranslations = {
  selectedCountryAriaLabel?: string;
  searchPlaceholder?: string;
  clearSearchAriaLabel?: string;
  countryListAriaLabel?: string;
  noCountrySelected?: string;
  searchEmptyState?: string;
  searchSummaryAria?: (count: number) => string;
  //* Translated country names, keyed by iso2. Only bundled for locales whose
  //* region display names are missing from some browsers' Intl.DisplayNames data
  //* (e.g. Chrome desktop falls back to English for bs, hy, is, mk, sq, uz). When
  //* present, these take precedence over Intl.DisplayNames. See country-data.ts.
  countryNames?: Partial<Record<Iso2, string>>;
};
