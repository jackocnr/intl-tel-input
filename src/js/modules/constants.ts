// Shared constants extracted from intl-tel-input logic to avoid magic strings/numbers
// Keep this file dependency-free (no imports) so all builds (vanilla/react/angular/vue) can mirror it easily.

import { Iso2 } from "../intl-tel-input/data";

export const EVENTS = {
  OPEN_COUNTRY_DROPDOWN: "open:countrydropdown",
  CLOSE_COUNTRY_DROPDOWN: "close:countrydropdown",
  COUNTRY_CHANGE: "countrychange",
  INPUT: "input", // used for synthetic input trigger
} as const;

export const CLASSES = {
  HIDE: "iti__hide",
  V_HIDE: "iti__v-hide",
  ARROW_UP: "iti__arrow--up",
  GLOBE: "iti__globe",
  FLAG: "iti__flag",
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
  DELETE_FWD: "deleteContentForward",
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

export const SENTINELS = {
  UNKNOWN_NUMBER_TYPE: -99,
  UNKNOWN_VALIDATION_ERROR: -99,
} as const;

// Layout / sizing fallbacks (used when measuring elements fails e.g., hidden containers)
export const LAYOUT = {
  SANE_SELECTED_WITH_DIAL_WIDTH: 78, // px width fallback when separateDialCode enabled
  SANE_SELECTED_NO_DIAL_WIDTH: 42, // px width fallback when no separate dial code
  INPUT_PADDING_EXTRA_LEFT: 6, // px gap between selected country container and input text
} as const;

// Helpful grouping for dial code logic (kept lean; expand only if reused widely)
export const DIAL = {
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

// Data-* keys used on DOM nodes
export const DATA_KEYS = {
  COUNTRY_CODE: "countryCode",
  DIAL_CODE: "dialCode",
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
