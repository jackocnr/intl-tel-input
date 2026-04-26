/**
 * Locale bundle integrity checks.
 *
 * Verifies that each locale file in packages/core/src/js/i18n/*
 * contains exactly the expected UI translation keys.
 */

import * as localeModules from "../../../packages/core/src/js/i18n/index.ts";

// Keep in sync with packages/core/src/js/i18n/types.ts
const UI_TRANSLATION_KEYS = [
  "selectedCountryAriaLabel",
  "searchPlaceholder",
  "clearSearchAriaLabel",
  "countryListAriaLabel",
  "noCountrySelected",
  "searchEmptyState",
  "searchSummaryAria",
];

describe("i18n locale bundles", () => {
  test("each locale exports all and only the expected UI translation keys", () => {
    const expectedKeys = [...UI_TRANSLATION_KEYS].sort();
    const locales = Object.keys(localeModules)
      .filter((key) => key !== "__esModule")
      .sort();

    console.info(`Testing ${locales.length} locale bundles for expected translation keys...`);
    for (const locale of locales) {
      const translations = localeModules[locale];
      const actualKeys = Object.keys(translations).sort();

      try {
        expect(actualKeys).toEqual(expectedKeys);
      } catch (error) {
        error.message = `Locale ${locale} has unexpected keys.\n` + error.message;
        throw error;
      }
    }
  });
});
