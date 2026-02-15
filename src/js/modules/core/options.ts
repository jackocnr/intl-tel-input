import { INITIAL_COUNTRY, PLACEHOLDER_MODES, NUMBER_TYPE_SET } from "../constants";
import defaultEnglishStrings from "../../intl-tel-input/i18n/en";
import allCountries, { type Iso2 } from "../../intl-tel-input/data";
import type { AllOptions, SomeOptions } from "../types/public-api";

// Helper for media query evaluation
const mq = (q: string): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(q).matches;

//* Helper to decide whether to use fullscreen popup by default
const computeDefaultUseFullscreenPopup = (): boolean => {
  if (typeof navigator !== "undefined" && typeof window !== "undefined") {
    const isNarrowViewport = mq("(max-width: 500px)");
    const isShortViewport = mq("(max-height: 600px)");
    const isCoarsePointer = mq("(pointer: coarse)");
    /* Heuristic rationale: If narrow width OR (coarse pointer with constrained height) we  prefer fullscreen for usability. Coarse pointer usually implies touch (phones/tablets, some hybrids) where larger touch targets help (and virtual keyboards may be used, which consume more vertical space).
    */
    return (
      isNarrowViewport ||
      (isCoarsePointer && isShortViewport)
    );
  }
  return false;
};

export const defaults: AllOptions = {
  //* Whether or not to allow the dropdown.
  allowDropdown: true,
  //* The number type to enforce during validation.
  allowedNumberTypes: ["MOBILE", "FIXED_LINE"],
  //* Whether or not to allow extensions after the main number.
  allowNumberExtensions: false,
  // Allow alphanumeric "phonewords" (e.g. +1 800 FLOWERS) as valid numbers
  allowPhonewords: false,
  //* Add a placeholder in the input with an example number for the selected country.
  autoPlaceholder: PLACEHOLDER_MODES.POLITE,
  //* Modify the parentClass.
  containerClass: "",
  //* Locale for localising country names via Intl.DisplayNames.
  countryNameLocale: "en",
  //* The order of the countries in the dropdown. Defaults to alphabetical.
  countryOrder: null,
  //* Add a country search input at the top of the dropdown.
  countrySearch: true,
  //* Modify the auto placeholder.
  customPlaceholder: null,
  //* Always show the dropdown
  dropdownAlwaysOpen: false,
  //* Append menu to specified element.
  dropdownContainer: null,
  //* Don't display these countries.
  excludeCountries: [],
  //* Fix the dropdown width to the input width (rather than being as wide as the longest country name).
  fixDropdownWidth: true,
  //* Format the number as the user types
  formatAsYouType: true,
  //* Format the input value during initialisation and on setNumber.
  formatOnDisplay: true,
  //* geoIp lookup function.
  geoIpLookup: null,
  //* Inject a hidden input with the name returned from this function, and on submit, populate it with the result of getNumber.
  hiddenInput: null,
  //* Internationalise the plugin text e.g. search input placeholder, country names.
  i18n: {},
  //* Initial country.
  initialCountry: "",
  //* A function to load the utils script.
  loadUtils: null,
  //* National vs international formatting for numbers e.g. placeholders and displaying existing numbers.
  nationalMode: true,
  //* Display only these countries.
  onlyCountries: [],
  //* Number type to use for placeholders.
  placeholderNumberType: "MOBILE",
  //* Show flags - for both the selected country, and in the country dropdown
  showFlags: true,
  //* Display the international dial code next to the selected flag.
  separateDialCode: false,
  //* Only allow certain chars e.g. a plus followed by numeric digits, and cap at max valid length.
  strictMode: false,
  //* Use full screen popup instead of dropdown for country list.
  useFullscreenPopup: computeDefaultUseFullscreenPopup(),
};

const toString = (val: unknown): string => Object.prototype.toString.call(val);

const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  Boolean(val) && typeof val === "object" && !Array.isArray(val);

const isFn = (val: unknown): val is (...args: unknown[]) => unknown =>
  typeof val === "function";

const isElLike = (val: unknown): val is HTMLElement => {
  if (!val || typeof val !== "object") return false;
  const v = val as any;
  return v.nodeType === 1 && typeof v.tagName === "string" && typeof v.appendChild === "function";
};

const iso2Set: Set<Iso2> = new Set(allCountries.map((c) => c.iso2));
const isIso2 = (val: string): val is Iso2 => iso2Set.has(val as Iso2);

const placeholderModeSet = new Set<string>(Object.values(PLACEHOLDER_MODES));

const warn = (message: string): void => {
  // eslint-disable-next-line no-console
  console.warn(`[intl-tel-input] ${message}`);
};

const warnOption = (optionName: string, expectedType: string, actualValue: unknown): void => {
  warn(`Option '${optionName}' must be ${expectedType}; got ${toString(actualValue)}. Ignoring.`);
};

const validateIso2Array = (key: string, value: unknown): boolean => {
  const expectedType = "an array of ISO2 country code strings";
  if (!Array.isArray(value)) {
    warnOption(key, expectedType, value);
    return false;
  }
  for (const v of value) {
    if (typeof v !== "string") {
      warnOption(key, expectedType, value);
      return false;
    }
    const lower = v.toLowerCase();
    if (!isIso2(lower)) {
      warn(`Invalid country code in '${key}': '${v}'. Ignoring.`);
      return false;
    }
  }
  return true;
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
    if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
      warn(`Unknown option '${key}'. Ignoring.`);
      continue;
    }

    switch (key) {
      case "allowDropdown":
      case "allowNumberExtensions":
      case "allowPhonewords":
      case "countrySearch":
      case "dropdownAlwaysOpen":
      case "fixDropdownWidth":
      case "formatAsYouType":
      case "formatOnDisplay":
      case "nationalMode":
      case "showFlags":
      case "separateDialCode":
      case "strictMode":
      case "useFullscreenPopup":
        if (typeof value !== "boolean") {
          warnOption(key, "a boolean", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "autoPlaceholder":
        if (typeof value !== "string" || !placeholderModeSet.has(value)) {
          const validModes = Array.from(placeholderModeSet).join(", ");
          warnOption("autoPlaceholder", `one of ${validModes}`, value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "containerClass":
      case "countryNameLocale":
        if (typeof value !== "string") {
          warnOption(key, "a string", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "countryOrder":
        if (value === null || validateIso2Array(key, value)) {
          validatedOptions[key] = value;
        }
        break;

      case "customPlaceholder":
      case "geoIpLookup":
      case "hiddenInput":
      case "loadUtils":
        if (value !== null && !isFn(value)) {
          warnOption(key, "a function or null", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "dropdownContainer":
        if (value !== null && !isElLike(value)) {
          warnOption("dropdownContainer", "an HTMLElement or null", value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "excludeCountries":
      case "onlyCountries":
        if (validateIso2Array(key, value)) {
          validatedOptions[key] = value;
        }
        break;

      case "i18n":
        if (!isPlainObject(value)) {
          warnOption("i18n", "an object", value);
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
        if (lower && (lower !== INITIAL_COUNTRY.AUTO && !isIso2(lower))) {
          warnOption("initialCountry", "a valid ISO2 country code or 'auto'", value);
          break;
        }
        validatedOptions[key] = value;
        break;
      }

      case "placeholderNumberType":
        if (typeof value !== "string" || !NUMBER_TYPE_SET.has(value)) {
          const validTypes = Array.from(NUMBER_TYPE_SET).join(", ");
          warnOption("placeholderNumberType", `one of ${validTypes}`, value);
          break;
        }
        validatedOptions[key] = value;
        break;

      case "allowedNumberTypes":
        if (value !== null) {
          if (!Array.isArray(value)) {
            warnOption("allowedNumberTypes", "an array of number types or null", value);
            break;
          }
          let allValid = true;
          for (const v of value as unknown[]) {
            if (typeof v !== "string" || !NUMBER_TYPE_SET.has(v)) {
              const validTypes = Array.from(NUMBER_TYPE_SET).join(", ");
              warnOption("allowedNumberTypes", `an array of valid number types (${validTypes})`, v);
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

// Apply option side-effects (mutates the passed object)
export const applyOptionSideEffects = (o: AllOptions): void => {
  if (o.dropdownAlwaysOpen) {
    o.useFullscreenPopup = false;
    o.allowDropdown = true;
  }

  //* If showing fullscreen popup, do not fix the width.
  if (o.useFullscreenPopup) {
    o.fixDropdownWidth = false;
  }

  //* If theres only one country, then use it!
  if (o.onlyCountries.length === 1) {
    o.initialCountry = o.onlyCountries[0];
  }

  //* When separateDialCode enabled, we force nationalMode to false (because the displayed dial code is supposed to be thought of as part of the typed number).
  if (o.separateDialCode) {
    o.nationalMode = false;
  }

  // if there is a country dropdown, but no flags and no separate dial code, then it suggests that there are multiple countries to choose from, but no way to see which one is currently selected, so we force nationalMode to false, as it doesn't make sense to show a national number placeholder if there's no way to see which country is selected
  if (o.allowDropdown && !o.showFlags && !o.separateDialCode) {
    o.nationalMode = false;
  }

  //* If we want a full screen dropdown, we must append it to the body.
  if (o.useFullscreenPopup && !o.dropdownContainer) {
    o.dropdownContainer = document.body;
  }

  //* Allow overriding the default interface strings.
  o.i18n = { ...defaultEnglishStrings, ...o.i18n };
};
