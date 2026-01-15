/**
 * Locale bundle integrity checks.
 *
 * Verifies that each locale file in src/js/intl-tel-input/i18n/*
 * contains exactly the expected UI translation keys.
 */

// Keep in sync with src/js/intl-tel-input/i18n/types.ts
const UI_TRANSLATION_KEYS = [
  "selectedCountryAriaLabel",
  "searchPlaceholder",
  "clearSearchAriaLabel",
  "countryListAriaLabel",
  "noCountrySelected",
  "searchEmptyState",
  "searchSummaryAria",
];

// Explicit imports (no filesystem scanning): keeps the test simple and deterministic.
const localeModules = {
  ar: require("../../../src/js/intl-tel-input/i18n/ar/index.ts"),
  bg: require("../../../src/js/intl-tel-input/i18n/bg/index.ts"),
  bn: require("../../../src/js/intl-tel-input/i18n/bn/index.ts"),
  bs: require("../../../src/js/intl-tel-input/i18n/bs/index.ts"),
  ca: require("../../../src/js/intl-tel-input/i18n/ca/index.ts"),
  cs: require("../../../src/js/intl-tel-input/i18n/cs/index.ts"),
  da: require("../../../src/js/intl-tel-input/i18n/da/index.ts"),
  de: require("../../../src/js/intl-tel-input/i18n/de/index.ts"),
  ee: require("../../../src/js/intl-tel-input/i18n/ee/index.ts"),
  el: require("../../../src/js/intl-tel-input/i18n/el/index.ts"),
  en: require("../../../src/js/intl-tel-input/i18n/en/index.ts"),
  es: require("../../../src/js/intl-tel-input/i18n/es/index.ts"),
  fa: require("../../../src/js/intl-tel-input/i18n/fa/index.ts"),
  fi: require("../../../src/js/intl-tel-input/i18n/fi/index.ts"),
  fr: require("../../../src/js/intl-tel-input/i18n/fr/index.ts"),
  hi: require("../../../src/js/intl-tel-input/i18n/hi/index.ts"),
  hr: require("../../../src/js/intl-tel-input/i18n/hr/index.ts"),
  hu: require("../../../src/js/intl-tel-input/i18n/hu/index.ts"),
  id: require("../../../src/js/intl-tel-input/i18n/id/index.ts"),
  it: require("../../../src/js/intl-tel-input/i18n/it/index.ts"),
  ja: require("../../../src/js/intl-tel-input/i18n/ja/index.ts"),
  ko: require("../../../src/js/intl-tel-input/i18n/ko/index.ts"),
  lt: require("../../../src/js/intl-tel-input/i18n/lt/index.ts"),
  mr: require("../../../src/js/intl-tel-input/i18n/mr/index.ts"),
  nl: require("../../../src/js/intl-tel-input/i18n/nl/index.ts"),
  no: require("../../../src/js/intl-tel-input/i18n/no/index.ts"),
  pl: require("../../../src/js/intl-tel-input/i18n/pl/index.ts"),
  pt: require("../../../src/js/intl-tel-input/i18n/pt/index.ts"),
  ro: require("../../../src/js/intl-tel-input/i18n/ro/index.ts"),
  ru: require("../../../src/js/intl-tel-input/i18n/ru/index.ts"),
  sk: require("../../../src/js/intl-tel-input/i18n/sk/index.ts"),
  sl: require("../../../src/js/intl-tel-input/i18n/sl/index.ts"),
  sq: require("../../../src/js/intl-tel-input/i18n/sq/index.ts"),
  sr: require("../../../src/js/intl-tel-input/i18n/sr/index.ts"),
  sv: require("../../../src/js/intl-tel-input/i18n/sv/index.ts"),
  te: require("../../../src/js/intl-tel-input/i18n/te/index.ts"),
  th: require("../../../src/js/intl-tel-input/i18n/th/index.ts"),
  tr: require("../../../src/js/intl-tel-input/i18n/tr/index.ts"),
  uk: require("../../../src/js/intl-tel-input/i18n/uk/index.ts"),
  ur: require("../../../src/js/intl-tel-input/i18n/ur/index.ts"),
  uz: require("../../../src/js/intl-tel-input/i18n/uz/index.ts"),
  vi: require("../../../src/js/intl-tel-input/i18n/vi/index.ts"),
  zh: require("../../../src/js/intl-tel-input/i18n/zh/index.ts"),
};

describe("i18n locale bundles", () => {
  test("each locale exports all and only the expected UI translation keys", () => {
    const expectedKeys = [...UI_TRANSLATION_KEYS].sort();
    const locales = Object.keys(localeModules).sort();

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
