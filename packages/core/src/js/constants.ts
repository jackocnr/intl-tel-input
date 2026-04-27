// Shared constants extracted from intl-tel-input logic to avoid magic strings/numbers

import type { Iso2 } from "./data.js";

export const EVENTS = {
  OPEN_COUNTRY_DROPDOWN: "open:countrydropdown",
  CLOSE_COUNTRY_DROPDOWN: "close:countrydropdown",
  COUNTRY_CHANGE: "countrychange",
  INPUT: "input", // used for synthetic input trigger
  STRICT_REJECT: "strict:reject",
} as const;

export const CLASSES = {
  HIDE: "iti__hide",
  V_HIDE: "iti__v-hide",
  ARROW_UP: "iti__arrow--up",
  GLOBE: "iti__globe",
  FLAG: "iti__flag",
  LOADING: "iti__loading",
  COUNTRY_ITEM: "iti__country",
  HIGHLIGHT: "iti__highlight",
} as const;

export const KEYS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  SPACE: " ",
  ENTER: "Enter",
  ESC: "Escape",
  TAB: "Tab",
} as const;

export const INPUT_TYPES = {
  PASTE: "insertFromPaste",
  DELETE_FORWARD: "deleteContentForward",
} as const;

export const REGEX = {
  ALPHA_UNICODE: /\p{L}/u, // any kind of letter from any language
  NON_PLUS_NUMERIC: /[^+0-9]/, // chars that are NOT + or digit
  NON_PLUS_NUMERIC_GLOBAL: /[^+0-9]/g, // chars that are NOT + or digit (global)
  HIDDEN_SEARCH_CHAR: /^[a-zA-ZÀ-ÿа-яА-Я ]$/, // single acceptable hidden-search char
} as const;

export const TIMINGS = {
  SEARCH_DEBOUNCE_MS: 100,
  HIDDEN_SEARCH_RESET_MS: 1000,
  NEXT_TICK: 0,
} as const;

// Layout / sizing fallbacks (used when measuring elements fails e.g., hidden containers)
export const LAYOUT = {
  NARROW_VIEWPORT_WIDTH: 500, // keep in sync with .iti__country-list CSS media query
  FALLBACK_SELECTED_WITH_DIAL_WIDTH: 78, // px width fallback when separateDialCode enabled
  FALLBACK_SELECTED_NO_DIAL_WIDTH: 42, // px width fallback when no separate dial code
  INPUT_PADDING_EXTRA_LEFT: 6, // px gap between selected country container and input text
  DROPDOWN_MARGIN: 3, // px margin between dropdown and tel input
  FALLBACK_DROPDOWN_HEIGHT: 200, // px height fallback for dropdown
} as const;

// Helpful grouping for dial code logic (kept lean; expand only if reused widely)
export const DIAL_CODE = {
  PLUS: "+",
  NANP: "1", // North American Numbering Plan
} as const;

// Country-specific telephone rules
export const UK = {
  ISO2: "gb" as Iso2,
  DIAL_CODE: "44", // +44 United Kingdom
  MOBILE_PREFIX: "7", // UK mobile numbers start with 7 after national trunk (0) or core section
  MOBILE_CORE_LENGTH: 10, // core number length (excluding dial code / national prefix) for mobiles
} as const;

export const US = {
  ISO2: "us" as Iso2,
  DIAL_CODE: "1", // +1 United States
};

// Placeholder / initial country string values (extracted for typo safety if needed elsewhere later)
export const PLACEHOLDER_MODES = {
  AGGRESSIVE: "aggressive",
  POLITE: "polite",
  OFF: "off",
} as const;

export const INITIAL_COUNTRY = {
  AUTO: "auto",
} as const;

// libphonenumber enums - sole source of truth for both the core library (option
// validation, public types) and utils.js (which builds its int maps from
// these arrays at build time via scripts/build-utils.js).
//
// Order matters - the array index is the integer value libphonenumber uses,
// EXCEPT for NUMBER_TYPES.UNKNOWN which libphonenumber maps to -1 (handled
// explicitly in utils.js).
//
// Mirrors:
//   - i18n.phonenumbers.PhoneNumberFormat
//   - i18n.phonenumbers.PhoneNumberType
//   - i18n.phonenumbers.PhoneNumberUtil.ValidationResult
// in third_party/libphonenumber/javascript/i18n/phonenumbers/phonenumberutil.js
export const NUMBER_FORMATS = [
  "E164",
  "INTERNATIONAL",
  "NATIONAL",
  "RFC3966",
] as const;

export const NUMBER_TYPES = [
  "FIXED_LINE",
  "MOBILE",
  "FIXED_LINE_OR_MOBILE",
  "TOLL_FREE",
  "PREMIUM_RATE",
  "SHARED_COST",
  "VOIP",
  "PERSONAL_NUMBER",
  "PAGER",
  "UAN",
  "VOICEMAIL",
  "UNKNOWN",
] as const;

export const VALIDATION_ERRORS = [
  "IS_POSSIBLE",
  "INVALID_COUNTRY_CODE",
  "TOO_SHORT",
  "TOO_LONG",
  "IS_POSSIBLE_LOCAL_ONLY",
  "INVALID_LENGTH",
] as const;

// Convenience constants so consumers can write NUMBER_TYPE.MOBILE instead of
// the bare string "MOBILE" - typo-safe and matches the PLACEHOLDER_MODES style.
// Derived from the arrays above so there's no second list to keep in sync.
const toEnumObject = <T extends readonly string[]>(
  arr: T,
): Readonly<{ [K in T[number]]: K }> =>
  Object.fromEntries(arr.map((v) => [v, v])) as Readonly<{
    [K in T[number]]: K;
  }>;

export const NUMBER_FORMAT = toEnumObject(NUMBER_FORMATS);
export const NUMBER_TYPE = toEnumObject(NUMBER_TYPES);
export const VALIDATION_ERROR = toEnumObject(VALIDATION_ERRORS);

// Data-* keys used on DOM nodes
export const DATA_KEYS = {
  // e.g. <li data-iso2="us"> for country items in dropdown
  ISO2: "iso2",
  DIAL_CODE: "dialCode",
  // e.g. <input data-intl-tel-input-id="0"> on the input element
  INSTANCE_ID: "intlTelInputId",
} as const;

// ARIA attribute names (avoid typos & for potential future refactors)
export const ARIA = {
  EXPANDED: "aria-expanded",
  LABEL: "aria-label",
  SELECTED: "aria-selected",
  ACTIVE_DESCENDANT: "aria-activedescendant",
  HASPOPUP: "aria-haspopup",
  CONTROLS: "aria-controls",
  HIDDEN: "aria-hidden",
  AUTOCOMPLETE: "aria-autocomplete",
  MODAL: "aria-modal",
} as const;
