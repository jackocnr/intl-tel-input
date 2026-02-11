import { PLACEHOLDER_MODES } from "../constants";
import defaultEnglishStrings from "../../intl-tel-input/i18n/en";
import type { AllOptions } from "../types/public-api";

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
