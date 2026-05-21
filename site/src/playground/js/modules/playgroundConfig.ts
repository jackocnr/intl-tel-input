export const SPECIAL_PLAYGROUND_OPTION_KEYS = [
  "uiTranslations",
  "loadUtils",
  "customPlaceholder",
  "initialCountryLookup",
];

export const OPTION_GROUPS = [
  {
    title: "User Interface Options",
    icon: "bi-window",
    description: "Control dropdown behaviour and whether certain UI elements are displayed.",
    keys: [
      "enableCountrySelector",
      "countrySearch",
      "matchDropdownWidth",
      "separateDialCode",
      "showFlags",
      "useFullscreenPopup",
    ],
  },
  {
    title: "Country Options",
    icon: "bi-globe-americas",
    description: "Choose which countries are available, the order they're displayed in, and how the initial country is determined.",
    keys: ["countryOrder", "excludeCountries", "initialCountry", "initialCountryLookup", "onlyCountries"],
  },
  {
    title: "Formatting Options",
    icon: "bi-magic",
    description: "How numbers are formatted as you type and on initial display.",
    keys: ["formatAsYouType", "numberDisplayFormat", "strictMode", "strictRejectAnimation"],
  },
  {
    title: "Placeholder Options",
    icon: "bi-input-cursor-text",
    description: "Configure the automatically generated placeholder numbers.",
    keys: ["customPlaceholder", "placeholderNumberPolicy", "placeholderNumberType"],
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
    keys: ["uiTranslations", "countryNameOverrides"],
  },
  {
    title: "Miscellaneous Options",
    icon: "bi-gear",
    description: "Loading the utils module.",
    keys: ["loadUtils"],
  },
];

export function createPlaygroundConfig({
  defaults,
  NUMBER_FORMAT,
  NUMBER_TYPE,
  PLACEHOLDER_POLICY,
  localeCodes,
  localeOptionLabels,
  initialCountryDatalist,
  countryDatalist,
}) {
  // Selectable values for enum-typed options. Sourced from the library's
  // enum constants so they stay in sync, with non-user-selectable values
  // filtered out (UNKNOWN isn't a real type; RFC3966 isn't a valid
  // numberDisplayFormat — it's only valid as an output format on getNumber).
  const PLACEHOLDER_POLICY_OPTIONS = Object.values(PLACEHOLDER_POLICY);
  const NUMBER_TYPES = Object.values(NUMBER_TYPE).filter(
    (t) => t !== NUMBER_TYPE.UNKNOWN,
  );
  const NUMBER_DISPLAY_FORMAT_OPTIONS = Object.values(NUMBER_FORMAT).filter(
    (f) => f !== NUMBER_FORMAT.RFC3966,
  );

  const defaultInitOptions = {
    enableCountrySelector: defaults.enableCountrySelector,
    allowedNumberTypes: defaults.allowedNumberTypes,
    allowNumberExtensions: defaults.allowNumberExtensions,
    allowPhonewords: defaults.allowPhonewords,
    // Playground unifies uiTranslations + countryNameLocale into a single "Language" select.
    // countryNameLocale follows state.uiTranslations (see mirrorLanguage in playground.ts).
    countryNameLocale: defaults.countryNameLocale,
    countryNameOverrides: defaults.countryNameOverrides,
    countryOrder: defaults.countryOrder,
    countrySearch: defaults.countrySearch,
    customPlaceholder: false, // in playground, this is a checkbox
    initialCountryLookup: false, // in playground, this is a checkbox
    excludeCountries: defaults.excludeCountries,
    matchDropdownWidth: defaults.matchDropdownWidth,
    formatAsYouType: defaults.formatAsYouType,
    uiTranslations: "en", // default to English in the Playground
    initialCountry: defaults.initialCountry,
    loadUtils: true, // in playground, this is a checkbox
    numberDisplayFormat: defaults.numberDisplayFormat,
    onlyCountries: defaults.onlyCountries,
    placeholderNumberPolicy: defaults.placeholderNumberPolicy,
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
    initialCountryLookup: true,
  };

  const defaultInputAttributes = {
    value: "",
    placeholder: "",
  };

  const optionMeta = {
    // User Interface Options
    enableCountrySelector: {
      type: "boolean",
      tooltip: "Enable the country selector — the panel (dropdown or fullscreen popup) that lets the user pick a country. When disabled, the selected country button becomes a static, non-clickable display.",
    },
    countrySearch: {
      type: "boolean",
      tooltip: "Enable the search input inside the country dropdown.",
    },
    matchDropdownWidth: {
      type: "boolean",
      tooltip: "Keep the dropdown width aligned to the input width, as opposed to the width of the longest country name.",
    },
    separateDialCode: {
      type: "boolean",
      tooltip: "Display the selected country’s dial code next to the input, so it looks like it’s part of the typed number.",
    },
    showFlags: {
      type: "boolean",
      tooltip: "Show country flags in the dropdown and selected country.",
    },
    useFullscreenPopup: {
      type: "boolean",
      tooltip: "Use a fullscreen-style country picker instead of the dropdown. Defaults to true on small screens (except on this page, where it is helpful to have it always visible as a dropdown).",
    },

    // Country Options
    countryOrder: {
      type: "json",
      tooltip: "Custom ordering for countries, given as an array of ISO2 codes. Any countries not listed will appear at the end in default order.",
      multiCombobox: countryDatalist,
      draggable: true,
    },
    excludeCountries: {
      type: "json",
      tooltip: "Exclude specific countries (array of ISO2 codes) from the dropdown.",
      multiCombobox: countryDatalist,
    },
    initialCountry: {
      type: "text",
      tooltip: "Initial selected country (ISO2 code), e.g. \"gb\".",
      singleCombobox: initialCountryDatalist,
    },
    initialCountryLookup: {
      type: "boolean",
      label: "initialCountryLookup",
      tooltip: "Auto-detect the user's country (e.g. by IP address) via a custom async function. Ignored when initialCountry is set.",
    },
    onlyCountries: {
      type: "json",
      tooltip: "Restrict the dropdown to only these countries (array of ISO2 codes).",
      multiCombobox: countryDatalist,
    },

    // Formatting Options
    formatAsYouType: {
      type: "boolean",
      tooltip: "Format the number as the user types.",
    },
    numberDisplayFormat: {
      type: "select",
      tooltip: "How placeholder example numbers and existing stored numbers are displayed. NATIONAL is forced back to INTERNATIONAL when separateDialCode is enabled.",
      options: NUMBER_DISPLAY_FORMAT_OPTIONS,
    },
    strictMode: {
      type: "boolean",
      tooltip: "As the user types in the input, ignore irrelevant characters and cap the number at the maximum valid length.",
    },
    strictRejectAnimation: {
      type: "boolean",
      tooltip: "When strictMode rejects a keystroke, or rejects a paste entirely, play a subtle animation.",
    },

    // Placeholder Options
    customPlaceholder: {
      type: "boolean",
      label: "customPlaceholder",
      tooltip: "Customise the auto-generated placeholder.",
    },
    placeholderNumberPolicy: {
      type: "select",
      tooltip: "Policy for setting a placeholder based on the selected country and placeholderNumberType. \"POLITE\" only shows an example number when there is no manual placeholder set. \"AGGRESSIVE\" always shows it. \"OFF\" never shows it.",
      options: PLACEHOLDER_POLICY_OPTIONS,
    },
    placeholderNumberType: {
      type: "select",
      tooltip: "Number type used when generating placeholders (e.g. MOBILE).",
      options: NUMBER_TYPES,
    },

    // Validation Options
    allowedNumberTypes: {
      type: "multidropdown",
      tooltip: "Restrict the types of numbers that are considered valid.",
      options: NUMBER_TYPES,
    },
    allowNumberExtensions: {
      type: "boolean",
      tooltip: "Accept number extensions as valid (e.g. \"+1 702 123-1234 ext. 1234\"). Not compatible with strictMode.",
    },
    allowPhonewords: {
      type: "boolean",
      tooltip: "Accept letters in the number as valid (e.g. \"+1 702 FLOWERS\"). Note: the number must contain at least 3 letters — fewer are treated as typos and stripped. Not compatible with strictMode.",
    },

    // Translation Options
    uiTranslations: {
      type: "select",
      label: "Language",
      tooltip: "Sets the locale for both the country names via <code>countryNameLocale</code> and UI strings (e.g. the country search placeholder) via <code>uiTranslations</code>.",
      options: localeCodes || [],
      optionLabels: localeOptionLabels,
    },
    // No form control of its own — value mirrors state.uiTranslations (see mirrorLanguage
    // in playground.ts). Kept here so init-code generation and state diffing
    // still treat it as a known option.
    countryNameLocale: {
      type: "text",
      hidden: true,
    },
    countryNameOverrides: {
      type: "json",
      tooltip: "Override individual country names, keyed by ISO2 code.",
      overridesEditor: countryDatalist,
    },

    // Miscellaneous Options
    loadUtils: {
      type: "boolean",
      label: "loadUtils",
      tooltip: "Dynamically load utils.js, required for formatting/validation (async).",
    },
  };

  const attributeMeta = {
    value: { type: "text", label: "Initial value" },
    placeholder: { type: "text", label: "Placeholder" },
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
