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
  "geoIpLookup",
];

export const OPTION_GROUPS = [
  {
    title: "User Interface Options",
    icon: "bi-window",
    description: "Control dropdown behaviour and whether certain UI elements are displayed.",
    keys: [
      "allowDropdown",
      "countrySearch",
      "fixDropdownWidth",
      "separateDialCode",
      "showFlags",
      "useFullscreenPopup",
    ],
  },
  {
    title: "Country Options",
    icon: "bi-globe-americas",
    description: "Choose which countries are available, the order they're displayed in, and how the initial country is determined.",
    keys: ["countryOrder", "excludeCountries", "geoIpLookup", "initialCountry", "onlyCountries"],
  },
  {
    title: "Formatting Options",
    icon: "bi-magic",
    description: "How numbers are formatted as you type and on initial display.",
    keys: ["formatAsYouType", "formatOnDisplay", "nationalMode", "strictMode", "strictRejectAnimation"],
  },
  {
    title: "Placeholder Options",
    icon: "bi-input-cursor-text",
    description: "Configure the automatically generated placeholder numbers.",
    keys: ["autoPlaceholder", "customPlaceholder", "placeholderNumberType"],
  },
  {
    title: "Validation Options",
    icon: "bi-check-circle",
    description: "Adjust what is considered a valid number.",
    keys: ["allowedNumberTypes", "allowNumberExtensions", "allowPhonewords"],
  },
  {
    title: "Translation Options",
    icon: "bi-translate",
    description: "Localise country names and the core library UI strings, e.g. the country search placeholder.",
    keys: ["countryNameLocale", "countryNameOverrides", "i18n"],
  },
  {
    title: "Miscellaneous Options",
    icon: "bi-gear",
    description: "Loading the utils module.",
    keys: ["loadUtils"],
  },
];

export function createPlaygroundConfig({ defaults, i18nLanguageCodes, i18nOptionLabels, i18nDatalist, initialCountryDatalist, countryDatalist }) {
  const defaultInitOptions = {
    allowDropdown: defaults.allowDropdown,
    allowedNumberTypes: defaults.allowedNumberTypes,
    allowNumberExtensions: defaults.allowNumberExtensions,
    allowPhonewords: defaults.allowPhonewords,
    autoPlaceholder: defaults.autoPlaceholder,
    countryNameLocale: defaults.countryNameLocale,
    countryNameOverrides: defaults.countryNameOverrides,
    countryOrder: defaults.countryOrder,
    countrySearch: defaults.countrySearch,
    customPlaceholder: false, // in playground, this is a checkbox
    geoIpLookup: false, // in playground, this is a checkbox
    excludeCountries: defaults.excludeCountries,
    fixDropdownWidth: defaults.fixDropdownWidth,
    formatAsYouType: defaults.formatAsYouType,
    formatOnDisplay: defaults.formatOnDisplay,
    i18n: "en", // default to English in the Playground
    initialCountry: defaults.initialCountry,
    loadUtils: true, // in playground, this is a checkbox
    nationalMode: defaults.nationalMode,
    onlyCountries: defaults.onlyCountries,
    placeholderNumberType: defaults.placeholderNumberType,
    separateDialCode: defaults.separateDialCode,
    showFlags: defaults.showFlags,
    strictMode: defaults.strictMode,
    strictRejectAnimation: defaults.strictRejectAnimation,
    // show dropdown open, even on mobile, as provides a better playground experience for testing options, otherwise they have to scroll down, change option, scroll back up, open dropdown etc
    useFullscreenPopup: false,
  };

  // Opinionated starting state for the playground form. Library defaults are still
  // used for code-snippet diffing so the copied snippet accurately reproduces the
  // playground's behaviour in a fresh install.
  const playgroundInitialOptions = {
    ...defaultInitOptions,
    geoIpLookup: true,
    initialCountry: "auto",
  };

  const defaultInputAttributes = {
    value: "",
    placeholder: "",
    class: "",
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
      tooltip: "Accept number extensions as valid (e.g. x123). Not compatible with strictMode.",
    },
    allowPhonewords: {
      type: "boolean",
      tooltip: "Accept letters in the number (phonewords) as valid. Not compatible with strictMode.",
    },
    autoPlaceholder: {
      type: "select",
      tooltip: "Automatically set a placeholder based on the selected country and placeholderNumberType. \"polite\" only shows an example number when there is no manual placeholder set. \"aggressive\" always shows it.",
      options: AUTO_PLACEHOLDER_OPTIONS,
    },
    countryNameLocale: {
      type: "text",
      tooltip: "Locale used when generating country names with Intl.DisplayNames (e.g. 'fr' for French).",
      placeholder: "e.g. fr",
      datalist: i18nDatalist,
    },
    countryNameOverrides: {
      type: "json",
      tooltip: "Override individual country names, keyed by iso2 code.",
      overridesEditor: countryDatalist,
    },
    countryOrder: {
      type: "json",
      tooltip: "Custom ordering for countries, given as an array of ISO2 codes. Any countries not listed will appear at the end in default order.",
      multiCombobox: countryDatalist,
      draggable: true,
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
    geoIpLookup: {
      type: "boolean",
      label: "geoIpLookup",
      tooltip: "Auto-detect the user's country by IP address (async). Requires initialCountry='auto'.",
    },
    excludeCountries: {
      type: "json",
      tooltip: "Exclude specific countries (array of ISO2 codes) from the dropdown.",
      multiCombobox: countryDatalist,
    },
    fixDropdownWidth: {
      type: "boolean",
      tooltip: "Keep the dropdown width aligned to the input width, as opposed to the width of the longest country name.",
    },
    formatAsYouType: {
      type: "boolean",
      tooltip: "Format the number as the user types.",
    },
    formatOnDisplay: {
      type: "boolean",
      tooltip: "Format any initial value on initialisation.",
    },
    i18n: {
      type: "select",
      tooltip: "Translate UI strings (e.g. the country search placeholder) using the provided locales.",
      options: ["", ...(i18nLanguageCodes || [])],
      optionLabels: i18nOptionLabels,
    },
    initialCountry: {
      type: "text",
      tooltip: "Initial selected country (ISO2 code), e.g. 'gb', or else \"auto\" for use with geoIpLookup.",
      placeholder: "e.g. gb",
      datalist: initialCountryDatalist,
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
      multiCombobox: countryDatalist,
    },
    placeholderNumberType: {
      type: "select",
      tooltip: "Number type used when generating placeholders (e.g. MOBILE).",
      options: NUMBER_TYPES,
    },
    separateDialCode: {
      type: "boolean",
      tooltip: "Display the selected country’s dial code next to the input, so it looks like it’s part of the typed number.",
    },
    showFlags: {
      type: "boolean",
      tooltip: "Show country flags in the dropdown and selected country.",
    },
    strictMode: {
      type: "boolean",
      tooltip: "As the user types in the input, ignore irrelevant characters and cap the number at the maximum valid length.",
    },
    strictRejectAnimation: {
      type: "boolean",
      tooltip: "When strictMode rejects a whole keystroke or paste, play a subtle animation.",
    },
    useFullscreenPopup: {
      type: "boolean",
      tooltip: "Use a fullscreen-style country picker instead of the dropdown. Defaults to true on small screens (except on this page, where it is helpful to have it always visible as a dropdown).",
    },
  };

  const attributeMeta = {
    value: { type: "text", label: "Initial value" },
    placeholder: { type: "text", label: "Placeholder" },
    class: { type: "text", label: "Class" },
  };

  return {
    defaultInitOptions,
    playgroundInitialOptions,
    defaultInputAttributes,
    optionMeta,
    attributeMeta,
    optionGroups: OPTION_GROUPS,
    specialOptionKeys: SPECIAL_PLAYGROUND_OPTION_KEYS,
  };
}
