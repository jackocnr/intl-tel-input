const AUTO_PLACEHOLDER_OPTIONS = ["polite", "aggressive", "off"];
const NUMBER_TYPES = [
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
];

export const SPECIAL_PLAYGROUND_OPTION_KEYS = [
  "i18n",
  "loadUtils",
  "customPlaceholder",
  "dropdownContainer",
  "geoIpLookup",
  "hiddenInput",
];

export const OPTION_GROUPS = [
  {
    title: "Country Options",
    description: "Choose which countries are available, the order they're displayed in, and how the initial country is determined.",
    iso2ModalId: "itiPlaygroundIso2Modal",
    keys: ["countryOrder", "excludeCountries", "geoIpLookup", "initialCountry", "onlyCountries"],
  },
  {
    title: "User Interface Options",
    description: "Control dropdown behaviour and whether certain UI elements are displayed.",
    keys: [
      "allowDropdown",
      "containerClass",
      "countrySearch",
      "dropdownContainer",
      "fixDropdownWidth",
      "separateDialCode",
      "showFlags",
      "useFullscreenPopup",
    ],
  },
  {
    title: "Placeholder Options",
    description: "Configure the automatically generated placeholder numbers.",
    keys: ["autoPlaceholder", "customPlaceholder", "placeholderNumberType"],
  },
  {
    title: "Formatting Options",
    description: "How numbers are formatted as you type and on initial display.",
    keys: ["formatAsYouType", "formatOnDisplay", "nationalMode", "strictMode"],
  },
  {
    title: "Validation Options",
    description: "Adjust what is considered a valid number.",
    keys: ["allowedNumberTypes", "allowNumberExtensions", "allowPhonewords"],
  },
  {
    title: "Translation Options",
    description: "Localise country names and the plugin UI strings, e.g. the country search placeholder.",
    keys: ["countryNameLocale", "i18n"],
  },
  {
    title: "Miscellaneous Options",
    description: "Extra features like hidden inputs and loading the utilities module.",
    keys: ["hiddenInput", "loadUtils"],
  },
];

export function createPlaygroundConfig({ defaults, i18nLanguageCodes, i18nOptionLabels }) {
  const defaultInitOptions = {
    allowDropdown: defaults.allowDropdown,
    allowedNumberTypes: defaults.allowedNumberTypes,
    allowNumberExtensions: defaults.allowNumberExtensions,
    allowPhonewords: defaults.allowPhonewords,
    autoPlaceholder: defaults.autoPlaceholder,
    containerClass: defaults.containerClass,
    countryNameLocale: defaults.countryNameLocale,
    countryOrder: defaults.countryOrder,
    countrySearch: defaults.countrySearch,
    customPlaceholder: false, // in playground, this is a checkbox
    dropdownContainer: false, // in playground, this is a checkbox
    geoIpLookup: false, // in playground, this is a checkbox
    hiddenInput: false, // in playground, this is a checkbox
    excludeCountries: defaults.excludeCountries,
    fixDropdownWidth: defaults.fixDropdownWidth,
    formatAsYouType: defaults.formatAsYouType,
    formatOnDisplay: defaults.formatOnDisplay,
    i18n: "", // different default for playground display
    initialCountry: defaults.initialCountry,
    loadUtils: true, // in playground, this is a checkbox
    nationalMode: defaults.nationalMode,
    onlyCountries: defaults.onlyCountries,
    placeholderNumberType: defaults.placeholderNumberType,
    separateDialCode: defaults.separateDialCode,
    showFlags: defaults.showFlags,
    strictMode: defaults.strictMode,
    // show dropdown open, even on mobile, as provides a better playground experience for testing options, otherwise they have to scroll down, change option, scroll back up, open dropdown etc
    useFullscreenPopup: false,
  };

  const defaultInputAttributes = {
    value: "",
    placeholder: "",
    disabled: false,
    readOnly: false,
  };

  const optionMeta = {
    allowDropdown: {
      type: "boolean",
      tooltip: "Allow clicking the selected country to open the dropdown.",
    },
    allowedNumberTypes: {
      type: "multidropdown",
      tooltip: "Restrict the types of numbers that are considered valid.",
      options: NUMBER_TYPES,
    },
    allowNumberExtensions: {
      type: "boolean",
      tooltip: "Accept number extensions as valid (e.g. x123).",
    },
    allowPhonewords: {
      type: "boolean",
      tooltip: "Accept letters in the number (phonewords) as valid.",
    },
    autoPlaceholder: {
      type: "select",
      tooltip: "Automatically set a placeholder based on the selected country and placeholderNumberType.",
      options: AUTO_PLACEHOLDER_OPTIONS,
    },
    containerClass: {
      type: "text",
      tooltip: "Additional CSS class to add to the container element.",
    },
    countryNameLocale: {
      type: "text",
      tooltip: "Locale used when generating country names with Intl.DisplayNames (e.g. 'fr' for French).",
      placeholder: "e.g. fr",
    },
    countryOrder: {
      type: "json",
      tooltip: "Custom ordering for countries, given as an array of ISO2 codes. Any countries not listed will appear at the end in default order.",
      placeholder: "e.g. [\"us\", \"gb\"]",
    },
    countrySearch: {
      type: "boolean",
      tooltip: "Enable the search input inside the country dropdown.",
    },
    customPlaceholder: {
      type: "boolean",
      label: "customPlaceholder",
      tooltip: "Customise the auto-generated placeholder.",
    },
    dropdownContainer: {
      type: "boolean",
      label: "dropdownContainer",
      tooltip: "Append the dropdown to a specific element (useful when the input is inside a container with overflow:hidden).",
    },
    geoIpLookup: {
      type: "boolean",
      label: "geoIpLookup",
      tooltip: "Auto-detect the user's country by IP address (async). Requires initialCountry='auto'.",
    },
    hiddenInput: {
      type: "boolean",
      label: "hiddenInput",
      tooltip: "Add hidden inputs that get populated with the full number and country code on submit.",
    },
    excludeCountries: {
      type: "json",
      tooltip: "Exclude specific countries (array of ISO2 codes) from the dropdown.",
      placeholder: "e.g. [\"ru\", \"cn\"]",
    },
    fixDropdownWidth: {
      type: "boolean",
      tooltip: "Keep the dropdown width aligned to the input width.",
    },
    formatAsYouType: {
      type: "boolean",
      tooltip: "Format the number as the user types.",
    },
    formatOnDisplay: {
      type: "boolean",
      tooltip: "Format any initial value when the plugin initialises.",
    },
    i18n: {
      type: "select",
      tooltip: "Translate UI strings (e.g. country search placeholder) using the provided language packs.",
      options: ["", ...(i18nLanguageCodes || [])],
      optionLabels: i18nOptionLabels,
    },
    initialCountry: {
      type: "text",
      tooltip: "Initial selected country (ISO2 code), e.g. 'gb'.",
      placeholder: "e.g. gb",
    },
    loadUtils: {
      type: "boolean",
      label: "loadUtils",
      tooltip: "Dynamically load utils.js, required for formatting/validation (async).",
    },
    nationalMode: {
      type: "boolean",
      tooltip: "Display numbers in national format (instead of international) where applicable.",
    },
    onlyCountries: {
      type: "json",
      tooltip: "Restrict the dropdown to only these countries (array of ISO2 codes).",
      placeholder: "e.g. [\"us\", \"ca\", \"mx\"]",
    },
    placeholderNumberType: {
      type: "select",
      tooltip: "Number type used when generating placeholders (e.g. MOBILE).",
      options: NUMBER_TYPES,
    },
    separateDialCode: {
      type: "boolean",
      tooltip: "Show the dial code separately from the number input.",
    },
    showFlags: {
      type: "boolean",
      tooltip: "Show country flags in the dropdown and selected country.",
    },
    strictMode: {
      type: "boolean",
      tooltip: "As the user types in the input, ignore irrelevant characters and cap the number at the maximum valid length.",
    },
    useFullscreenPopup: {
      type: "boolean",
      tooltip: "Use a fullscreen-style country picker instead of the dropdown. Defaults to true on small screens (except on this page, where it is helpful to have it always visible as a dropdown).",
    },
  };

  const attributeMeta = {
    value: { type: "text", label: "value (initial)" },
    placeholder: { type: "text" },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
  };

  const attributeQueryAliases = {
    readOnly: "readonly",
  };

  return {
    defaultInitOptions,
    defaultInputAttributes,
    optionMeta,
    attributeMeta,
    attributeQueryAliases,
    optionGroups: OPTION_GROUPS,
    specialOptionKeys: SPECIAL_PLAYGROUND_OPTION_KEYS,
  };
}
