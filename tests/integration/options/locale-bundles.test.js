/**
 * Locale bundle integrity checks.
 *
 * Verifies that each locale file in packages/core/src/js/locale/*
 * contains exactly the expected UI translation keys.
 */

import * as localeModules from "../../../packages/core/src/js/locale/index.ts";

// Keep in sync with packages/core/src/js/locale/types.ts
const UI_TRANSLATION_KEYS = [
  "selectedCountryAriaLabel",
  "searchPlaceholder",
  "clearSearchAriaLabel",
  "countryListAriaLabel",
  "noCountrySelected",
  "searchEmptyState",
  "searchSummaryAria",
];

// Optional keys a locale may additionally include. "countryNames" is bundled
// only for locales whose region display names are missing from some browsers'
// Intl.DisplayNames data (e.g. Chrome desktop). See country-data.ts.
const OPTIONAL_KEYS = ["countryNames"];

describe("locale bundles", () => {
  test("each locale exports all required UI translation keys (plus only permitted optional keys)", () => {
    const requiredKeys = [...UI_TRANSLATION_KEYS].sort();
    const allowedKeys = new Set([...UI_TRANSLATION_KEYS, ...OPTIONAL_KEYS]);
    const locales = Object.keys(localeModules)
      .filter((key) => key !== "__esModule")
      .sort();

    console.info(`Testing ${locales.length} locale bundles for expected translation keys...`);
    for (const locale of locales) {
      const translations = localeModules[locale];
      const actualKeys = Object.keys(translations).sort();

      try {
        // All required UI keys must be present.
        expect(actualKeys.filter((k) => UI_TRANSLATION_KEYS.includes(k)).sort()).toEqual(requiredKeys);
        // No keys outside the allowed set (required + optional).
        expect(actualKeys.filter((k) => !allowedKeys.has(k))).toEqual([]);
      } catch (error) {
        error.message = `Locale ${locale} has unexpected keys.\n` + error.message;
        throw error;
      }
    }
  });
});
