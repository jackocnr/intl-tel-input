import {
  PLACEHOLDER_POLICY,
  NUMBER_FORMAT,
  NUMBER_TYPE,
  NUMBER_TYPES,
  COUNTRY_SELECTOR_MODE,
  COUNTRY_SELECTOR_MODES,
  LAYOUT,
} from "../constants.js";
import defaultEnglishStrings from "../locale/en.js";
import { isIso2, type Iso2 } from "../data.js";
import type { AllOptions, SomeOptions } from "../types/public-api.js";

// Helper for media query evaluation
const mediaQuery = (q: string): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(q).matches;

const isNarrowViewport = () =>
  mediaQuery(`(max-width: ${LAYOUT.NARROW_VIEWPORT_WIDTH}px)`);

//* Heuristic for resolving countrySelectorMode "AUTO" to "FULLSCREEN" or "DROPDOWN".
const resolveAutoCountrySelectorMode = ():
  | typeof COUNTRY_SELECTOR_MODE.FULLSCREEN
  | typeof COUNTRY_SELECTOR_MODE.DROPDOWN => {
  if (typeof navigator !== "undefined" && typeof window !== "undefined") {
    const isShortViewport = mediaQuery("(max-height: 600px)");
    const isCoarsePointer = mediaQuery("(pointer: coarse)");
    /* Heuristic rationale: If narrow width OR (coarse pointer with constrained height) we prefer fullscreen for usability. Coarse pointer usually implies touch (phones/tablets, some hybrids) where larger touch targets help (and virtual keyboards may be used, which consume more vertical space). */
    if (isNarrowViewport() || (isCoarsePointer && isShortViewport)) {
      return COUNTRY_SELECTOR_MODE.FULLSCREEN;
    }
  }
  return COUNTRY_SELECTOR_MODE.DROPDOWN;
};

export const defaults: AllOptions = {
  //* How the country selector is displayed. "DROPDOWN" vs "FULLSCREEN", or "AUTO" to decide itself, or "OFF".
  countrySelectorMode: COUNTRY_SELECTOR_MODE.AUTO,
  //* The number type to enforce during validation.
  allowedNumberTypes: [NUMBER_TYPE.MOBILE, NUMBER_TYPE.FIXED_LINE],
  //* Whether or not to allow extensions after the main number.
  allowNumberExtensions: false,
  // Allow alphanumeric "phonewords" (e.g. +1 800 FLOWERS) as valid numbers
  allowPhonewords: false,
  //* Add a custom class to the (injected) container element.
  containerClass: "",
  //* Locale for localising country names via Intl.DisplayNames.
  countryNameLocale: "en",
  //* Override individual country names by iso2 code.
  countryNameOverrides: {},
  //* The order of the countries in the country list. Defaults to alphabetical.
  countryOrder: null,
  //* Add a country search input at the top of the country selector.
  countrySearch: true,
  //* Modify the auto placeholder.
  customPlaceholder: null,
  //* Always show the dropdown
  dropdownAlwaysOpen: false,
  //* Optional DOM element to append the dropdown to (used to escape ancestors with overflow:hidden, or to mount in a custom container). Only consulted in dropdown rendering; ignored when the country selector renders as a fullscreen popup.
  dropdownParent: null,
  //* Don't display these countries.
  excludeCountries: null,
  //* Fix the dropdown width to the input width (rather than being as wide as the longest country name).
  matchDropdownWidth: true,
  //* Format the number as the user types
  formatAsYouType: true,
  //* Inject hidden inputs with the names returned from this function, and on submit, populate them with the full number and selected country iso2.
  hiddenInputs: null,
  //* Translations for the core library UI strings e.g. search input placeholder, country names.
  uiTranslations: {},
  //* Initial country.
  initialCountry: "",
  //* Async lookup function used to determine the initial country (e.g. via IP). Ignored if initialCountry is set.
  initialCountryLookup: null,
  //* A function to load the utils script.
  loadUtils: null,
  //* Format used when displaying numbers (placeholder examples and stored values). One of "E164", "INTERNATIONAL", "NATIONAL".
  numberDisplayFormat: NUMBER_FORMAT.INTERNATIONAL,
  //* Display only these countries.
  onlyCountries: null,
  //* When to set the placeholder to an example number for the selected country: "POLITE" only when the input has no manually-set placeholder, "AGGRESSIVE" always, "OFF" never.
  placeholderNumberPolicy: PLACEHOLDER_POLICY.POLITE,
  //* Number type to use for placeholders.
  placeholderNumberType: NUMBER_TYPE.MOBILE,
  //* Add custom classes to the search input element.
  searchInputClass: "",
  //* Display the international dial code next to the selected flag.
  separateDialCode: true,
  //* When strictMode rejects a key (etc), play a short feedback animation
  strictRejectAnimation: true,
  //* Show flags - for both the selected country, and in the country list
  showFlags: true,
  //* Only allow certain chars e.g. a plus followed by numeric digits, and cap at max valid length.
  strictMode: true,
};

const toString = (val: unknown): string => JSON.stringify(val);

const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  Boolean(val) && typeof val === "object" && !Array.isArray(val);

const isFunction = (val: unknown): val is (...args: unknown[]) => unknown =>
  typeof val === "function";

const isElLike = (val: unknown): val is HTMLElement => {
  if (!val || typeof val !== "object") {
    return false;
  }
  const v = val as any;
  return (
    v.nodeType === 1 &&
    typeof v.tagName === "string" &&
    typeof v.appendChild === "function"
  );
};

const placeholderPolicySet = new Set<string>(Object.values(PLACEHOLDER_POLICY));

const warn = (message: string): void => {
  console.warn(`[intl-tel-input] ${message}`);
};

const warnOption = (
  optionName: string,
  expectedType: string,
  actualValue: unknown,
): void => {
  warn(
    `Option '${optionName}' must be ${expectedType}; got ${toString(actualValue)}. Ignoring.`,
  );
};

const validateIso2Array = (key: string, value: unknown): string[] | false => {
  const expectedType = "an array of iso2 country code strings";
  if (!Array.isArray(value)) {
    warnOption(key, expectedType, value);
    return false;
  }
  const valid: string[] = [];
  for (const v of value) {
    if (typeof v !== "string") {
      warnOption(key, expectedType, value);
      return false;
    }
    const lower = v.toLowerCase();
    if (!isIso2(lower)) {
      warn(`Invalid iso2 code in '${key}': '${v}'. Skipping.`);
    } else {
      valid.push(v);
    }
  }
  return valid;
};

/**
 * Validate runtime init options
 */
export const validateOptions = (customOptions: unknown): SomeOptions => {
  if (customOptions === undefined) {
    return {};
  }

  if (!isPlainObject(customOptions)) {
    const error = `The second argument must be an options object; got ${toString(customOptions)}. Using defaults.`;
    warn(error);
    return {};
  }

  const validatedOptions: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(customOptions)) {
    // Check option exists
    if (!Object.hasOwn(defaults, key)) {
      warn(`Unknown option '${key}'. Ignoring.`);
      continue;
    }

    switch (key) {
      case "allowNumberExtensions":
      case "allowPhonewords":
      case "countrySearch":
      case "dropdownAlwaysOpen":
      case "matchDropdownWidth":
      case "formatAsYouType":
      case "showFlags":
      case "separateDialCode":
      case "strictMode":
      case "strictRejectAnimation":
        if (typeof value !== "boolean") {
          warnOption(key, "a boolean", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "countrySelectorMode":
        if (
          typeof value !== "string" ||
          !(COUNTRY_SELECTOR_MODES as readonly string[]).includes(value)
        ) {
          warnOption(
            "countrySelectorMode",
            `one of ${COUNTRY_SELECTOR_MODES.map((m) => `"${m}"`).join(", ")}`,
            value,
          );
          break;
        }
        validatedOptions[key] = value;
        break;

      case "numberDisplayFormat":
        if (
          typeof value !== "string" ||
          value === NUMBER_FORMAT.RFC3966 ||
          !(value === NUMBER_FORMAT.E164 ||
            value === NUMBER_FORMAT.INTERNATIONAL ||
            value === NUMBER_FORMAT.NATIONAL)
        ) {
          warnOption(
            "numberDisplayFormat",
            'one of "E164", "INTERNATIONAL", "NATIONAL"',
            value,
          );
          break;
        }
        validatedOptions[key] = value;
        break;

      case "placeholderNumberPolicy":
        if (typeof value !== "string" || !placeholderPolicySet.has(value)) {
          const validPolicies = Array.from(placeholderPolicySet).join(", ");
          warnOption("placeholderNumberPolicy", `one of ${validPolicies}`, value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "containerClass":
      case "searchInputClass":
      case "countryNameLocale":
        if (typeof value !== "string") {
          warnOption(key, "a string", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "countryOrder": {
        if (value === null) {
          validatedOptions[key] = value;
        } else {
          const filtered = validateIso2Array(key, value);
          if (filtered !== false) {
            validatedOptions[key] = filtered;
          }
        }
        break;
      }

      case "customPlaceholder":
      case "hiddenInputs":
      case "initialCountryLookup":
      case "loadUtils":
        if (value !== null && !isFunction(value)) {
          warnOption(key, "a function or null", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "dropdownParent":
        if (value !== null && !isElLike(value)) {
          warnOption("dropdownParent", "an HTMLElement or null", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "excludeCountries":
      case "onlyCountries": {
        if (value === null) {
          validatedOptions[key] = value;
        } else {
          const filtered = validateIso2Array(key, value);
          if (filtered !== false) {
            validatedOptions[key] = filtered;
          }
        }
        break;
      }

      case "uiTranslations":
        if (value && !isPlainObject(value)) {
          warnOption("uiTranslations", "an object", value);
          break;
        }
        // don't bother validating the shape of the object, as the standard use is to just pass in one of the provided locale objects.
        validatedOptions[key] = value;
        break;

      case "countryNameOverrides":
        if (value && !isPlainObject(value)) {
          warnOption("countryNameOverrides", "an object", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "initialCountry": {
        if (typeof value !== "string") {
          warnOption("initialCountry", "a string", value);
          break;
        }
        const lower = value.toLowerCase();
        if (lower && !isIso2(lower)) {
          warnOption("initialCountry", "a valid iso2 country code", value);
          break;
        }
        validatedOptions[key] = value;
        break;
      }

      case "placeholderNumberType":
        if (
          typeof value !== "string" ||
          !(NUMBER_TYPES as readonly string[]).includes(value)
        ) {
          const validTypes = NUMBER_TYPES.join(", ");
          warnOption("placeholderNumberType", `one of ${validTypes}`, value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "allowedNumberTypes":
        if (value !== null) {
          if (!Array.isArray(value)) {
            warnOption(
              "allowedNumberTypes",
              "an array of number types or null",
              value,
            );
            break;
          }
          let allValid = true;
          for (const v of value as unknown[]) {
            if (
              typeof v !== "string" ||
              !(NUMBER_TYPES as readonly string[]).includes(v)
            ) {
              const validTypes = NUMBER_TYPES.join(", ");
              warnOption(
                "allowedNumberTypes",
                `an array of valid number types (${validTypes})`,
                v,
              );
              allValid = false;
              break;
            }
          }
          if (allValid) {
            // include it (even if empty)
            validatedOptions[key] = value;
          }
        } else {
          validatedOptions[key] = null;
        }
        break;
    }
  }

  return validatedOptions as SomeOptions;
};

// Normalise option values so downstream code doesn't have to (mutates the passed object).
export const normaliseOptions = (o: AllOptions): void => {
  //* Lowercase all iso2 codes so consumers can compare directly.
  if (o.initialCountry) {
    o.initialCountry = o.initialCountry.toLowerCase() as Iso2 | "";
  }
  if (o.onlyCountries?.length) {
    o.onlyCountries = o.onlyCountries.map((c) => c.toLowerCase() as Iso2);
  }
  if (o.excludeCountries?.length) {
    o.excludeCountries = o.excludeCountries.map((c) => c.toLowerCase() as Iso2);
  }
  if (o.countryOrder) {
    o.countryOrder = o.countryOrder.map((c) => c.toLowerCase() as Iso2);
  }
};

// Apply option side-effects (mutates the passed object)
export const applyOptionSideEffects = (o: AllOptions): void => {
  //* Resolve "AUTO" to a concrete mode based on the current viewport. Downstream code only ever sees "OFF", "DROPDOWN", or "FULLSCREEN".
  if (o.countrySelectorMode === COUNTRY_SELECTOR_MODE.AUTO) {
    o.countrySelectorMode = resolveAutoCountrySelectorMode();
  }

  //* dropdownAlwaysOpen requires the dropdown rendering (fullscreen popup doesn't support always-open, and we need the country selector to exist).
  if (o.dropdownAlwaysOpen) {
    o.countrySelectorMode = COUNTRY_SELECTOR_MODE.DROPDOWN;
  }

  //* If showing fullscreen popup, do not fix the width.
  if (o.countrySelectorMode === COUNTRY_SELECTOR_MODE.FULLSCREEN) {
    o.matchDropdownWidth = false;
  } else {
    // if fullscreen popup disabled for whatever reason, but it's still a narrow screen (so full width dropdown wont fit), then the best UX is to fix dropdown width to input width.
    if (isNarrowViewport()) {
      o.matchDropdownWidth = true;
    }
  }

  //* If theres only one country, then use it!
  if (o.onlyCountries?.length === 1) {
    o.initialCountry = o.onlyCountries[0];
  }

  //* When separateDialCode enabled, NATIONAL display is contradictory (the dial code is supposed to be thought of as part of the typed number), so force INTERNATIONAL.
  if (o.separateDialCode && o.numberDisplayFormat === NUMBER_FORMAT.NATIONAL) {
    o.numberDisplayFormat = NUMBER_FORMAT.INTERNATIONAL;
  }

  // if there is a country selector, but no flags and no separate dial code, then it suggests that there are multiple countries to choose from, but no way to see which one is currently selected, so we force INTERNATIONAL display, as it doesn't make sense to show a national number placeholder if there's no way to see which country is selected
  if (
    o.countrySelectorMode !== COUNTRY_SELECTOR_MODE.OFF &&
    !o.showFlags &&
    !o.separateDialCode &&
    o.numberDisplayFormat === NUMBER_FORMAT.NATIONAL
  ) {
    o.numberDisplayFormat = NUMBER_FORMAT.INTERNATIONAL;
  }

  //* Allow overriding the default interface strings.
  o.uiTranslations = { ...defaultEnglishStrings, ...o.uiTranslations };
};
