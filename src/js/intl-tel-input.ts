import allCountries, { Country } from "./intl-tel-input/data";
import { I18n } from "./intl-tel-input/i18n/types";
import defaultEnglishStrings from "./intl-tel-input/i18n/en";

//* Populate the country names in the default language - useful if you want to use static getCountryData to populate another country dropdown etc.
for (const c of allCountries) {
  c.name = defaultEnglishStrings[c.iso2];
}

declare global {
  interface HTMLInputElement {
    iti?: Iti;
  }
}

type UtilsLoader = () => Promise<{default: ItiUtils}>;

interface IntlTelInputInterface {
  (input: HTMLInputElement, options?: SomeOptions): Iti;
  autoCountry?: string;
  defaults: AllOptions;
  documentReady: () => boolean;
  getCountryData: () => Country[];
  getInstance: (input: HTMLInputElement) => Iti | null;
  instances: { [key: string]: Iti };
  attachUtils: (source: UtilsLoader) => Promise<unknown> | null;
  startedLoadingAutoCountry: boolean;
  startedLoadingUtilsScript: boolean;
  version: string | undefined;
  utils?: ItiUtils;
}
type ItiUtils = {
  formatNumber(number: string, iso2: string | undefined, format?: number): string;
  formatNumberAsYouType(number: string, iso2: string | undefined): string;
  getCoreNumber(number: string, iso2: string | undefined): string;
  getExampleNumber(iso2: string | undefined, nationalMode: boolean, numberType: number, useE164?: boolean): string;
  getExtension(number: string, iso2: string | undefined): string;
  getNumberType(number: string, iso2: string | undefined): number;
  getValidationError(number: string, iso2: string | undefined): number;
  isPossibleNumber(number: string, iso2: string | undefined, numberType?: NumberType[] | null): boolean;
  isValidNumber(number: string, iso2: string | undefined, numberType?: NumberType[] | null): boolean;
  numberFormat: { NATIONAL: number, INTERNATIONAL: number, E164: number, RFC3966: number };
  numberType: object;
};
type NumberType =
  "FIXED_LINE_OR_MOBILE"
  | "FIXED_LINE"
  | "MOBILE"
  | "PAGER"
  | "PERSONAL_NUMBER"
  | "PREMIUM_RATE"
  | "SHARED_COST"
  | "TOLL_FREE"
  | "UAN"
  | "UNKNOWN"
  | "VOICEMAIL"
  | "VOIP";
//* Can't just use the Country type, as during the empty state (globe icon), this is set to an empty object for convenience.
type SelectedCountryData = {
  name?: string,
  iso2?: string,
  dialCode?: string,
  areaCodes?: string[],
  nationalPrefix?: string,
};
interface AllOptions {
  allowDropdown: boolean;
  allowPhonewords: boolean;
  autoPlaceholder: string;
  containerClass: string;
  countryOrder: string[];
  countrySearch: boolean;
  customPlaceholder: ((selectedCountryPlaceholder: string, selectedCountryData: object) => string) | null;
  dropdownContainer: HTMLElement | null;
  excludeCountries: string[];
  fixDropdownWidth: boolean;
  formatAsYouType: boolean;
  formatOnDisplay: boolean;
  geoIpLookup: ((success: (iso2: string) => void, failure: () => void) => void) | null;
  hiddenInput: ((telInputName: string) => {phone: string, country?: string}) | null;
  i18n: I18n,
  initialCountry: string;
  loadUtils: UtilsLoader;
  nationalMode: boolean;
  onlyCountries: string[];
  placeholderNumberType: NumberType;
  showFlags: boolean;
  separateDialCode: boolean;
  strictMode: boolean;
  useFullscreenPopup: boolean;
  validationNumberTypes: NumberType[] | null;
}

//* Export this as useful in react component too.
export type SomeOptions = Partial<AllOptions>;

//* These vars persist through all instances of the plugin.
let id = 0;

// Helper for media query evaluation
const mq = (q: string): boolean => {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(q).matches;
};

//* Helper to decide whether to use fullscreen popup by default
const computeDefaultUseFullscreenPopup = (): boolean => {
  if (typeof navigator !== "undefined" && typeof window !== "undefined") {
    //* We cannot just test screen size as some smartphones/website meta tags will report desktop resolutions.
    //* Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
    // DEPRECATED: isMobileUserAgent will be removed in next major version
    const isMobileUserAgent = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isNarrowViewport = mq("(max-width: 500px)");
    const isShortViewport = mq("(max-height: 600px)");
    const isCoarsePointer = mq("(pointer: coarse)");
    /* Heuristic rationale:
      1. Always treat classic mobile UA as fullscreen-capable
      2. If narrow width OR (coarse pointer with constrained height) we also prefer fullscreen for usability.
        - Coarse pointer usually implies touch (phones/tablets, some hybrids) where larger touch targets help (and virtual keyboards may be used, which consume more vertical space)
    */
    return isMobileUserAgent || isNarrowViewport || (isCoarsePointer && isShortViewport);
  }
  return false;
};

const defaults: AllOptions = {
  // Allow alphanumeric "phonewords" (e.g. +1 800 FLOWERS) as valid numbers
  allowPhonewords: false,
  //* Whether or not to allow the dropdown.
  allowDropdown: true,
  //* Add a placeholder in the input with an example number for the selected country.
  autoPlaceholder: "polite",
  //* Modify the parentClass.
  containerClass: "",
  //* The order of the countries in the dropdown. Defaults to alphabetical.
  countryOrder: null,
  //* Add a country search input at the top of the dropdown.
  countrySearch: true,
  //* Modify the auto placeholder.
  customPlaceholder: null,
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
  //* The number type to enforce during validation.
  validationNumberTypes: ["MOBILE"],
};
//* https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
const regionlessNanpNumbers = [
  "800",
  "822",
  "833",
  "844",
  "855",
  "866",
  "877",
  "880",
  "881",
  "882",
  "883",
  "884",
  "885",
  "886",
  "887",
  "888",
  "889",
];

//* Extract the numeric digits from the given string.
const getNumeric = (s: string): string => s.replace(/\D/g, "");

//* Normalise string: turns "Réunion" into "Reunion".
//* from https://stackoverflow.com/a/37511463
const normaliseString = (s: string = ""): string =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

//* Check if the given number is a regionless NANP number (expects the number to contain an international dial code)
const isRegionlessNanp = (number: string): boolean => {
  const numeric = getNumeric(number);
  if (numeric.charAt(0) === "1") {
    const areaCode = numeric.substring(1, 4);
    return regionlessNanpNumbers.includes(areaCode);
  }
  return false;
};

//* Iterate through the formattedValue until hit the right number of relevant chars.
const translateCursorPosition = (
  relevantChars: number,
  formattedValue: string,
  prevCaretPos: number,
  isDeleteForwards: boolean,
): number => {
  //* If the first char is a formatting char, and they backspace delete it:
  //* Cursor should stay at the start (pos 0), rather than stick to the first digit (pos 1).
  if (prevCaretPos === 0 && !isDeleteForwards) {
    return 0;
  }
  let count = 0;
  for (let i = 0; i < formattedValue.length; i++) {
    if (/[+0-9]/.test(formattedValue[i])) {
      count++;
    }

    //* Normal case: stop when you hit the right number of relevant chars
    //* (cursor will be just after the final relevant char).
    if (count === relevantChars && !isDeleteForwards) {
      return i + 1;
    }
    //* Spacial case: delete forwards (fn + delete on a mac):
    //* Wait until hit one extra relevant char, and put the cursor just before it (after any formatting chars).
    if (isDeleteForwards && count === relevantChars + 1) {
      return i;
    }
  }
  return formattedValue.length;
};

//* Create a DOM element.
const createEl = (tagName: string, attrs?: object | null, container?: HTMLElement): HTMLElement => {
  const el = document.createElement(tagName);
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  }
  if (container) {
    container.appendChild(el);
  }
  return el;
};

//* Run a method on each instance of the plugin.
const forEachInstance = (method: string, ...args: any[]): void => {
  const { instances } = intlTelInput;
  Object.values(instances).forEach((instance) => instance[method](...args));
};

//* This is our plugin class that we will create an instance of
// eslint-disable-next-line no-unused-vars
export class Iti {
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  id: number;
  //* NOT Private
  promise: Promise<[unknown, unknown]>;
  //* Private
  private telInput: HTMLInputElement;
  private highlightedItem: HTMLElement | null;
  private options: AllOptions;
  private hadInitialPlaceholder: boolean;
  private isRTL: boolean;
  private showSelectedCountryOnLeft: boolean;
  private isAndroid: boolean;
  private selectedCountryData: SelectedCountryData;
  private countries: Country[];
  private dialCodeMaxLen: number;
  private dialCodeToIso2Map: Record<string, string[]>;
  private dialCodes: Set<string>;
  private countryByIso2: Map<string, Country>;
  private countryContainer: HTMLElement;
  private selectedCountry: HTMLElement;
  private selectedCountryInner: HTMLElement;
  private selectedDialCode: HTMLElement;
  private dropdownArrow: HTMLElement;
  private dropdownContent: HTMLElement;
  private searchInput: HTMLInputElement;
  private searchIcon: HTMLElement;
  private searchClearButton: HTMLButtonElement;
  private searchNoResults: HTMLElement;
  private searchResultsA11yText: HTMLElement;
  private countryList: HTMLElement;
  private dropdown: HTMLElement;
  private hiddenInput: HTMLInputElement;
  private hiddenInputCountry: HTMLInputElement;
  private maxCoreNumberLength: number | null;
  private defaultCountry: string;
  private originalPaddingRight: string;
  private originalPaddingLeft: string;

  private _handleHiddenInputSubmit: () => void;
  private _handleLabelClick: (e: Event) => void;
  private _handleClickSelectedCountry: () => void;
  private _handleCountryContainerKeydown: (e: KeyboardEvent) => void;
  private _handleInputEvent: (e: InputEvent) => void;
  private _handleKeydownEvent: (e: KeyboardEvent) => void;
  private _handlePasteEvent: (e: ClipboardEvent) => void;
  private _handleWindowScroll: () => void;
  private _handleMouseoverCountryList: (e: MouseEvent) => void;
  private _handleClickCountryList: (e: Event) => void;
  private _handleClickOffToClose: (e: MouseEvent) => void;
  private _handleKeydownOnDropdown: (e: KeyboardEvent) => void;
  private _handleSearchChange: () => void;
  private _handleSearchClear: () => void;
  private _handlePageLoad: () => void;

  private resolveAutoCountryPromise: (value?: unknown) => void;
  private rejectAutoCountryPromise: (reason?: unknown) => void;
  private resolveUtilsScriptPromise: (value?: unknown) => void;
  private rejectUtilsScriptPromise: (reason?: unknown) => void;

  /**
   * Build a space-delimited class string from an object map of className -> truthy/falsey.
   * Only keys with truthy values are included.
   */
  private static _buildClassNames(flags: Record<string, unknown>): string {
    return Object.keys(flags).filter((k) => Boolean(flags[k])).join(" ");
  }

  constructor(input: HTMLInputElement, customOptions: SomeOptions = {}) {
    this.id = id++;
    this.telInput = input;

    this.highlightedItem = null;

    //* Process specified options / defaults.
    this.options = Object.assign({}, defaults, customOptions);
    this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
  }

  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init(): void {
    //* If showing fullscreen popup, do not fix the width.
    if (this.options.useFullscreenPopup) {
      this.options.fixDropdownWidth = false;
    }

    //* If theres only one country, then use it!
    if (this.options.onlyCountries.length === 1) {
      this.options.initialCountry = this.options.onlyCountries[0];
    }

    //* When separateDialCode enabled, we force nationalMode to false (because the displayed dial code is supposed to be thought of as part of the typed number).
    if (this.options.separateDialCode) {
      this.options.nationalMode = false;
    }

    // if there is a country dropdown, but no flags and no separate dial code, then it suggests that there are multiple countries to choose from, but no way to see which one is currently selected, so we force nationalMode to false, as it doesn't make sense to show a national number placeholder if there's no way to see which country is selected
    if (this.options.allowDropdown && !this.options.showFlags && !this.options.separateDialCode) {
      this.options.nationalMode = false;
    }

    //* If we want a full screen dropdown, we must append it to the body.
    if (this.options.useFullscreenPopup && !this.options.dropdownContainer) {
      this.options.dropdownContainer = document.body;
    }

    this.isAndroid = typeof navigator !== "undefined" ? /Android/i.test(navigator.userAgent) : false;

    //* Check if input has an ancestor with RTL.
    this.isRTL = !!this.telInput.closest("[dir=rtl]");
    // force the input direction to LTR as numbers are always written LTR, even in RTL languages
    this.telInput.dir = "ltr";

    const showOnDefaultSide = this.options.allowDropdown || this.options.separateDialCode;
    this.showSelectedCountryOnLeft = this.isRTL ? !showOnDefaultSide : showOnDefaultSide;

    //* Store original styling before we override it.
    if (this.options.separateDialCode) {
      if (this.isRTL) {
        this.originalPaddingRight = this.telInput.style.paddingRight;
      } else {
        this.originalPaddingLeft = this.telInput.style.paddingLeft;
      }
    }

    //* Allow overriding the default interface strings.
    this.options.i18n = { ...defaultEnglishStrings, ...this.options.i18n };

    //* these promises get resolved when their individual requests complete
    //* this way the dev can do something like iti.promise.then(...) to know when all requests are complete.
    const autoCountryPromise = new Promise((resolve, reject) => {
      this.resolveAutoCountryPromise = resolve;
      this.rejectAutoCountryPromise = reject;
    });
    const utilsScriptPromise = new Promise((resolve, reject) => {
      this.resolveUtilsScriptPromise = resolve;
      this.rejectUtilsScriptPromise = reject;
    });
    this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);

    //* In various situations there could be no country selected initially, but we need to be able
    //* to assume this variable exists.
    this.selectedCountryData = {};

    //* Process all the data: onlyCountries, excludeCountries, countryOrder etc.
    this._processCountryData();

    //* generate the markup.
    this._generateMarkup();

    //* Set the initial state of the input value and the selected country.
    this._setInitialState();

    //* Start all of the event listeners: input keydown, selectedCountry click.
    this._initListeners();

    //* Utils script, and auto country.
    this._initRequests();
  }

  //********************
  //*  PRIVATE METHODS
  //********************

  //* Prepare all of the country data, including onlyCountries, excludeCountries, countryOrder options.
  private _processCountryData(): void {
    //* Process onlyCountries or excludeCountries array if present.
    this._processAllCountries();

    //* Generate this.dialCodes and this.dialCodeToIso2Map.
    this._processDialCodes();

    //* Translate country names according to i18n option.
    this._translateCountryNames();

    //* Sort countries by countryOrder option (if present), then name.
    this._sortCountries();

    //* Build fast iso2 -> country map for O(1) lookups (used by _getCountryData).
    this.countryByIso2 = new Map(this.countries.map((c) => [c.iso2, c]));

    //* Precompute and cache country search tokens to speed up filtering
    this._cacheSearchTokens();
  }

  //* Precompute and cache country search tokens to speed up filtering
  private _cacheSearchTokens(): void {
    for (const c of this.countries) {
      // Light normalisation: lowercase name (diacritic folding, trimming etc can still occur at query side via normaliseString if needed)
      c.normalisedName = normaliseString(c.name);
      // Derive initials (first letter of each alpha sequence)
      c.initials = c.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map(word => word[0]).join("").toLowerCase();
      // Cached +dialCode variant
      c.dialCodePlus = `+${c.dialCode}`;
    }
  }

  //* Sort countries by countryOrder option (if present), then name.
  private _sortCountries() {
    if (this.options.countryOrder) {
      this.options.countryOrder = this.options.countryOrder.map((country) => country.toLowerCase());
    }
    this.countries.sort((a: Country, b: Country): number => {
      //* Primary sort: countryOrder option.
      const { countryOrder } = this.options;
      if (countryOrder) {
        const aIndex = countryOrder.indexOf(a.iso2);
        const bIndex = countryOrder.indexOf(b.iso2);
        const aIndexExists = aIndex > -1;
        const bIndexExists = bIndex > -1;
        if (aIndexExists || bIndexExists) {
          if (aIndexExists && bIndexExists) {
            return aIndex - bIndex;
          }
          return aIndexExists ? -1 : 1;
        }
      }

      //* Secondary sort: country name.
      return a.name.localeCompare(b.name);
    });
  }

  //* Add a dial code to this.dialCodeToIso2Map.
  private _addToDialCodeMap(iso2: string, dialCode: string, priority?: number): void {
    // Bail if no iso2 or dialCode (this can happen with onlyCountries or excludeCountries options).
    if (!iso2 || !dialCode) {
      return;
    }
    //* Update dialCodeMaxLen.
    if (dialCode.length > this.dialCodeMaxLen) {
      this.dialCodeMaxLen = dialCode.length;
    }
    //* If this entry doesn't already exist, then create it.
    if (!this.dialCodeToIso2Map.hasOwnProperty(dialCode)) {
      this.dialCodeToIso2Map[dialCode] = [];
    }
    const iso2List = this.dialCodeToIso2Map[dialCode];
    //* Bail if we already have this country for this dialCode.
    if (iso2List.includes(iso2)) {
      return;
    }
    //* Use provided priority index (can be 0), else append.
    const index = priority !== undefined ? priority : iso2List.length;
    iso2List[index] = iso2;
  }

  //* Process onlyCountries or excludeCountries array if present.
  private _processAllCountries(): void {
    const { onlyCountries, excludeCountries } = this.options;
    if (onlyCountries.length) {
      const lowerCaseOnlyCountries = onlyCountries.map((country) =>
        country.toLowerCase(),
      );
      this.countries = allCountries.filter(
        (country) => lowerCaseOnlyCountries.includes(country.iso2),
      );
    } else if (excludeCountries.length) {
      const lowerCaseExcludeCountries = excludeCountries.map(
        (country) => country.toLowerCase(),
      );
      this.countries = allCountries.filter(
        (country) => !lowerCaseExcludeCountries.includes(country.iso2),
      );
    } else {
      this.countries = allCountries;
    }
  }

  //* Translate Countries by object literal provided on config.
  private _translateCountryNames(): void {
    for (const c of this.countries) {
      const iso2 = c.iso2.toLowerCase();
      if (this.options.i18n.hasOwnProperty(iso2)) {
        c.name = this.options.i18n[iso2];
      }
    }
  }

  //* Generate this.dialCodes and this.dialCodeToIso2Map.
  private _processDialCodes(): void {
    //* Here we store just dial codes, where the key is the dial code, and the value is true
    //* e.g. { 1: true, 7: true, 20: true, ... }.
    this.dialCodes = new Set();
    this.dialCodeMaxLen = 0;

    //* Here we map dialCodes (inc both dialCode and dialCode+areaCode) to iso2 codes e.g.
    /*
     * {
     *   1: [ 'us', 'ca', ... ],    # all NANP countries (with dial code "1")
     *   12: [ 'us', 'ca', ... ],   # subset of NANP countries (that have area codes starting with "2")
     *   120: [ 'us', 'ca' ],       # just US and Canada (that have area codes starting "20")
     *   1204: [ 'ca' ],            # only Canada (that has a "204" area code)
     *   ...
     *  }
     */
    this.dialCodeToIso2Map = {};

    //* First: add dial codes.
    for (const c of this.countries) {
      if (!this.dialCodes.has(c.dialCode)) {
        this.dialCodes.add(c.dialCode);
      }
      this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
    }
    // if any countries have been excluded, cleanup empty array entries in dialCodeToIso2Map due to the use of c.priority to insert at specific indexes
    if (this.options.onlyCountries.length || this.options.excludeCountries.length) {
      this.dialCodes.forEach((dialCode) => {
        this.dialCodeToIso2Map[dialCode] = this.dialCodeToIso2Map[dialCode].filter(Boolean);
      });
    }

    //* Next: add area codes.
    //* This is a second loop over countries, to make sure we have all of the "root" countries
    //* already in the map, so that we can access them, as each time we add an area code substring
    //* to the map, we also need to include the "root" country's code, as that also matches.
    for (const c of this.countries) {
      //* Area codes
      if (c.areaCodes) {
        const rootIso2Code = this.dialCodeToIso2Map[c.dialCode][0];
        //* For each area code.
        for (const areaCode of c.areaCodes) {
          //* For each digit in the area code to add all partial matches as well.
          for (let k = 1; k < areaCode.length; k++) {
            const partialAreaCode = areaCode.substring(0, k);
            const partialDialCode = c.dialCode + partialAreaCode;
            //* Start with the root country, as that also matches this partial dial code.
            this._addToDialCodeMap(rootIso2Code, partialDialCode);
            this._addToDialCodeMap(c.iso2, partialDialCode);
          }
          //* Add the full area code.
          this._addToDialCodeMap(c.iso2, c.dialCode + areaCode);
        }
      }
    }
  }

  //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
  private _generateMarkup(): void {
    this.telInput.classList.add("iti__tel-input");

    //* If autocomplete does not exist on the element and its form, then
    //* prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
    //* easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
    //* autocompleted number, which on submit could mean wrong number is saved.
    if (
      !this.telInput.hasAttribute("autocomplete") &&
      !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))
    ) {
      this.telInput.setAttribute("autocomplete", "off");
    }

    const {
      allowDropdown,
      separateDialCode,
      showFlags,
      containerClass,
      hiddenInput,
      dropdownContainer,
      fixDropdownWidth,
      useFullscreenPopup,
      countrySearch,
      i18n,
    } = this.options;

    //* Containers (mostly for positioning).
    const parentClasses = Iti._buildClassNames({
      "iti": true,
      "iti--allow-dropdown": allowDropdown,
      "iti--show-flags": showFlags,
      "iti--inline-dropdown": !useFullscreenPopup,
      [containerClass]: Boolean(containerClass),
    });
    const wrapper = createEl("div", { class: parentClasses });
    this.telInput.parentNode?.insertBefore(wrapper, this.telInput);

    //* If we need a countryContainer
    if (allowDropdown || showFlags || separateDialCode) {
      this.countryContainer = createEl(
        "div",
        // visibly hidden until we measure it's width to set the input padding correctly
        { class: "iti__country-container iti__v-hide" },
        wrapper,
      );
      if (this.showSelectedCountryOnLeft) {
        this.countryContainer.style.left = "0px";
      } else {
        this.countryContainer.style.right = "0px";
      }

      //* Selected country (displayed on left of input while allowDropdown is enabled, otherwise to right)
      //* https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only
      if (allowDropdown) {
        this.selectedCountry = createEl(
          "button",
          {
            type: "button",
            class: "iti__selected-country",
            "aria-expanded": "false",
            "aria-label": this.options.i18n.noCountrySelected,
            "aria-haspopup": "dialog",
            "aria-controls": `iti-${this.id}__dropdown-content`,
          },
          this.countryContainer,
        );

        if (this.telInput.disabled) {
          this.selectedCountry.setAttribute("disabled", "true");
        }
      } else {
        this.selectedCountry = createEl(
          "div",
          { class: "iti__selected-country" },
          this.countryContainer,
        );
      }

      // The element that gets a grey background on hover (if allowDropdown enabled)
      const selectedCountryPrimary = createEl(
        "div",
        { class: "iti__selected-country-primary" },
        this.selectedCountry,
      );

      //* This is where we will add the selected flag (or globe) class later
      this.selectedCountryInner = createEl(
        "div",
        { class: "iti__flag" },
        selectedCountryPrimary,
      );

      if (allowDropdown) {
        this.dropdownArrow = createEl(
          "div",
          { class: "iti__arrow", "aria-hidden": "true" },
          selectedCountryPrimary,
        );
      }

      if (separateDialCode) {
        this.selectedDialCode = createEl(
          "div",
          { class: "iti__selected-dial-code", dir: "ltr" },
          this.selectedCountry,
        );
      }

      if (allowDropdown) {
        const extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
        this.dropdownContent = createEl("div", {
          id: `iti-${this.id}__dropdown-content`,
          class: `iti__dropdown-content iti__hide ${extraClasses}`,
          role: "dialog",
          "aria-modal": "true",
        });

        if (countrySearch) {
          // Wrapper so we can position the icons (search + clear)
          const searchWrapper = createEl(
            "div",
            { class: "iti__search-input-wrapper" },
            this.dropdownContent,
          );
          // Search (magnifying glass) icon SVG
          this.searchIcon = createEl(
            "span",
            {
              class: "iti__search-icon",
              "aria-hidden": "true",
            },
            searchWrapper,
          );
          this.searchIcon.innerHTML = `
            <svg class="iti__search-icon-svg" width="14" height="14" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>`;
          this.searchInput = createEl(
            "input",
            {
              id: `iti-${this.id}__search-input`, // Chrome says inputs need either a name or an id
              type: "search",
              class: "iti__search-input",
              placeholder: i18n.searchPlaceholder,
              // role=combobox + aria-autocomplete=list + aria-activedescendant allows maintaining focus on the search input while allowing users to navigate search results with up/down keyboard keys
              role: "combobox",
              "aria-expanded": "true",
              "aria-label": i18n.searchPlaceholder,
              "aria-controls": `iti-${this.id}__country-listbox`,
              "aria-autocomplete": "list",
              "autocomplete": "off",
            },
           searchWrapper,
          ) as HTMLInputElement;
          this.searchClearButton = createEl(
            "button",
            {
              type: "button",
              class: "iti__search-clear iti__hide",
              "aria-label": i18n.clearSearchAriaLabel,
              tabindex: "-1",
            },
            searchWrapper,
          ) as HTMLButtonElement;
          const maskId = `iti-${this.id}-clear-mask`;
          // Mask creates a transparent cross 'cut' through the filled circle so underlying input bg shows.
          this.searchClearButton.innerHTML = `
            <svg class="iti__search-clear-svg" width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <mask id="${maskId}" maskUnits="userSpaceOnUse">
                <rect width="16" height="16" fill="white" />
                <path d="M5.2 5.2 L10.8 10.8 M10.8 5.2 L5.2 10.8" stroke="black" stroke-linecap="round" class="iti__search-clear-x" />
              </mask>
              <circle cx="8" cy="8" r="8" class="iti__search-clear-bg" mask="url(#${maskId})" />
            </svg>`;
          this.searchResultsA11yText = createEl(
            "span",
            { class: "iti__a11y-text" },
            this.dropdownContent,
          );
          // Visible no-results message (hidden by default)
          this.searchNoResults = createEl(
            "div",
            {
              class: "iti__no-results iti__hide",
              "aria-hidden": "true", // all a11y messaging happens in this.searchResultsA11yText
            },
            this.dropdownContent,
          );
          this.searchNoResults.textContent = i18n.zeroSearchResults;
        }

        this.countryList = createEl(
          "ul",
          {
            class: "iti__country-list",
            id: `iti-${this.id}__country-listbox`,
            role: "listbox",
            "aria-label": i18n.countryListAriaLabel,
          },
          this.dropdownContent,
        );
        this._appendListItems();
        if (countrySearch) {
          this._updateSearchResultsA11yText();
        }

        //* Create dropdownContainer markup.
        if (dropdownContainer) {
          const dropdownClasses = Iti._buildClassNames({
            "iti": true,
            "iti--container": true,
            "iti--fullscreen-popup": useFullscreenPopup,
            "iti--inline-dropdown": !useFullscreenPopup,
            [containerClass]: Boolean(containerClass),
          });
          this.dropdown = createEl("div", { class: dropdownClasses });
          this.dropdown.appendChild(this.dropdownContent);
        } else {
          this.countryContainer.appendChild(this.dropdownContent);
        }
      }
    }

    wrapper.appendChild(this.telInput);

    if (this.countryContainer) {
      this._updateInputPadding();
      this.countryContainer.classList.remove("iti__v-hide");
    }

    if (hiddenInput) {
      const telInputName = this.telInput.getAttribute("name") || "";
      const names = hiddenInput(telInputName);

      if (names.phone) {
        const existingInput = this.telInput.form?.querySelector(`input[name="${names.phone}"]`);
        if (existingInput) {
          this.hiddenInput = existingInput as HTMLInputElement;
        } else {
          //* Create hidden input for the full international number.
          this.hiddenInput = createEl("input", {
            type: "hidden",
            name: names.phone,
          }) as HTMLInputElement;
          wrapper.appendChild(this.hiddenInput);
        }
      }

      if (names.country) {
        const existingInput = this.telInput.form?.querySelector(`input[name="${names.country}"]`);
        if (existingInput) {
          this.hiddenInputCountry = existingInput as HTMLInputElement;
        } else {
          //* Create hidden input for the selected country iso2 code.
          this.hiddenInputCountry = createEl("input", {
            type: "hidden",
            name: names.country,
          }) as HTMLInputElement;
          wrapper.appendChild(this.hiddenInputCountry);
        }
      }
    }
  }

  //* For each country: add a country list item <li> to the countryList <ul> container.
  private _appendListItems(): void {
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      //* Start by highlighting the first item (useful when countrySearch disabled).
      const extraClass = i === 0 ? "iti__highlight" : "";

      const listItem = createEl(
        "li",
        {
          id: `iti-${this.id}__item-${c.iso2}`,
          class: `iti__country ${extraClass}`,
          tabindex: "-1",
          role: "option",
          "data-dial-code": c.dialCode,
          "data-country-code": c.iso2,
          "aria-selected": "false",
        },
        this.countryList,
      );
      //* Store this for later use e.g. country search filtering.
      c.nodeById[this.id] = listItem;

      let content = "";
      //* Add the flag.
      if (this.options.showFlags) {
        content += `<div class='iti__flag iti__${c.iso2}'></div>`;
      }
      //* And the country name and dial code.
      content += `<span class='iti__country-name'>${c.name}</span>`;
      content += `<span class='iti__dial-code' dir='ltr'>+${c.dialCode}</span>`;

      listItem.insertAdjacentHTML("beforeend", content);
    }
  }

  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  private _setInitialState(overrideAutoCountry: boolean = false): void {
    //* Fix firefox bug: when first load page (with input with value set to number with intl dial code)
    //* and initialising plugin removes the dial code from the input, then refresh page,
    //* and we try to init plugin again but this time on number without dial code so show globe icon.
    const attributeValue = this.telInput.getAttribute("value");
    const inputValue = this.telInput.value;
    const useAttribute =
      attributeValue &&
      attributeValue.charAt(0) === "+" &&
      (!inputValue || inputValue.charAt(0) !== "+");
    const val = useAttribute ? attributeValue : inputValue;
    const dialCode = this._getDialCode(val);
    const isRegionlessNanpNumber = isRegionlessNanp(val);
    const { initialCountry, geoIpLookup } = this.options;
    const isAutoCountry = initialCountry === "auto" && geoIpLookup;

    //* If we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
    //* country, else fall back to the default country.
    if (dialCode && !isRegionlessNanpNumber) {
      this._updateCountryFromNumber(val);
    } else if (!isAutoCountry || overrideAutoCountry) {
      const lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
      const isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
      //* See if we should select a country.
      if (isValidInitialCountry) {
        this._setCountry(lowerInitialCountry);
      } else {
        if (dialCode && isRegionlessNanpNumber) {
          //* Has intl dial code, is regionless nanp, and no initialCountry, so default to US.
          this._setCountry("us");
        } else {
          //* Display the empty state (globe icon).
          this._setCountry();
        }
      }
    }
    //* NOTE: if initialCountry is set to auto, that will be handled separately.

    //* Format - note this wont be run after _updateDialCode as that's only called if no val.
    if (val) {
      this._updateValFromNumber(val);
    }
  }

  //* Initialise the main event listeners: input keyup, and click selected country.
  private _initListeners(): void {
    this._initTelInputListeners();
    if (this.options.allowDropdown) {
      this._initDropdownListeners();
    }
    if ((this.hiddenInput || this.hiddenInputCountry) && this.telInput.form) {
      this._initHiddenInputListener();
    }
  }

  //* Update hidden input on form submit.
  private _initHiddenInputListener(): void {
    this._handleHiddenInputSubmit = (): void => {
      if (this.hiddenInput) {
        this.hiddenInput.value = this.getNumber();
      }
      if (this.hiddenInputCountry) {
        this.hiddenInputCountry.value = this.getSelectedCountryData().iso2 || "";
      }
    };
    this.telInput.form?.addEventListener(
      "submit",
      this._handleHiddenInputSubmit,
    );
  }

  //* initialise the dropdown listeners.
  private _initDropdownListeners(): void {
    //* Hack for input nested inside label (which is valid markup): clicking the selected country to
    //* open the dropdown would then automatically trigger a 2nd click on the input which would
    //* close it again.
    this._handleLabelClick = (e: Event): void => {
      //* If the dropdown is closed, then focus the input, else ignore the click.
      if (this.dropdownContent.classList.contains("iti__hide")) {
        this.telInput.focus();
      } else {
        e.preventDefault();
      }
    };
    const label = this.telInput.closest("label");
    if (label) {
      label.addEventListener("click", this._handleLabelClick);
    }

    //* Toggle country dropdown on click.
    this._handleClickSelectedCountry = (): void => {
      const dropdownClosed = this.dropdownContent.classList.contains("iti__hide");
      if (dropdownClosed && !this.telInput.disabled && !this.telInput.readOnly) {
        this._openDropdown();
      }
    };
    this.selectedCountry.addEventListener("click", this._handleClickSelectedCountry);

    //* Open dropdown if selected country is focused and they press up/down/space/enter.
    this._handleCountryContainerKeydown = (e: KeyboardEvent): void => {
      const isDropdownHidden =
        this.dropdownContent.classList.contains("iti__hide");

      if (
        isDropdownHidden &&
        ["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key)
      ) {
        //* Prevent form from being submitted if "ENTER" was pressed.
        e.preventDefault();
        //* Prevent event from being handled again by document.
        e.stopPropagation();
        this._openDropdown();
      }

      //* Allow navigation from dropdown to input on TAB.
      if (e.key === "Tab") {
        this._closeDropdown();
      }
    };
    this.countryContainer.addEventListener(
      "keydown",
      this._handleCountryContainerKeydown,
    );
  }

  //* Init many requests: utils script / geo ip lookup.
  private _initRequests(): void {
    // eslint-disable-next-line prefer-const
    let { loadUtils, initialCountry, geoIpLookup } = this.options;

    //* If the user has specified the path to the utils script, fetch it on window.load, else resolve.
    if (loadUtils && !intlTelInput.utils) {
      this._handlePageLoad = () => {
        window.removeEventListener("load", this._handlePageLoad);
        //* Catch and ignore any errors to prevent unhandled-promise failures.
        //* The error from `attachUtils()` is also surfaced in each instance's
        //* `promise` property, so it's not getting lost by being ignored here.
        intlTelInput.attachUtils(loadUtils)?.catch(() => {});
      };

      //* If the plugin is being initialised after the window.load event has already been fired.
      if (intlTelInput.documentReady()) {
        this._handlePageLoad();
      } else {
        //* Wait until the load event so we don't block any other requests e.g. the flags image.
        window.addEventListener("load", this._handlePageLoad);
      }
    } else {
      this.resolveUtilsScriptPromise();
    }

    //* Don't bother with IP lookup if we already have a selected country.
    const isAutoCountry = initialCountry === "auto" && geoIpLookup;
    if (isAutoCountry && !this.selectedCountryData.iso2) {
      this._loadAutoCountry();
    } else {
      this.resolveAutoCountryPromise();
    }
  }

  //* Perform the geo ip lookup.
  private _loadAutoCountry(): void {
    //* 3 options:
    //* 1) Already loaded (we're done)
    //* 2) Not already started loading (start)
    //* 3) Already started loading (do nothing - just wait for loading callback to fire)
    if (intlTelInput.autoCountry) {
      this.handleAutoCountry();
    } else if (!intlTelInput.startedLoadingAutoCountry) {
      //* Don't do this twice!
      intlTelInput.startedLoadingAutoCountry = true;

      if (typeof this.options.geoIpLookup === "function") {
        this.options.geoIpLookup(
          (iso2 = "") => {
            const iso2Lower = iso2.toLowerCase();
            const isValidIso2 = iso2Lower && this._getCountryData(iso2Lower, true);
            if (isValidIso2) {
              intlTelInput.autoCountry = iso2Lower;
              //* Tell all instances the auto country is ready.
              //TODO: this should just be the current instances
              //* UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
              //* away (e.g. if they have already done the geo ip lookup somewhere else). Using
              //* setTimeout means that the current thread of execution will finish before executing
              //* this, which allows the plugin to finish initialising.
              setTimeout(() => forEachInstance("handleAutoCountry"));
            } else {
              this._setInitialState(true);
              forEachInstance("rejectAutoCountryPromise");
            }
          },
          () => {
            this._setInitialState(true);
            forEachInstance("rejectAutoCountryPromise");
          },
        );
      }
    }
  }

  private _openDropdownWithPlus(): void {
    this._openDropdown();
    this.searchInput.value = "+";
    this._filterCountries("");
  }

  //* Initialize the tel input listeners.
  private _initTelInputListeners(): void {
    const { strictMode, formatAsYouType, separateDialCode, allowDropdown, countrySearch } = this.options;
    let userOverrideFormatting = false;
    //* If the initial val contains any alpha chars (e.g. the extension separator "ext."), then set the override, as libphonenumber's AYT-formatter cannot handle alphas.
    if (/\p{L}/u.test(this.telInput.value)) {
      userOverrideFormatting = true;
    }

    //* On input event: (1) Update selected country, (2) Format-as-you-type.
    //* Note that this fires AFTER the input is updated.
    this._handleInputEvent = (e: InputEvent): void => {
      //* Android workaround for handling plus when separateDialCode enabled (as impossible to handle with keydown/keyup, for which e.key always returns "Unidentified", see https://stackoverflow.com/q/59584061/217866)
      if (this.isAndroid && e?.data === "+" && separateDialCode && allowDropdown && countrySearch) {
        const currentCaretPos = this.telInput.selectionStart || 0;
        const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos - 1);
        const valueAfterCaret = this.telInput.value.substring(currentCaretPos);
        this.telInput.value = valueBeforeCaret + valueAfterCaret;
        this._openDropdownWithPlus();
        return;
      }

      //* Update selected country.
      if (this._updateCountryFromNumber(this.telInput.value)) {
        this._triggerCountryChange();
      }

      //* If user types their own formatting char (not a plus or a numeric), or they paste something, then set the override.
      const isFormattingChar = e?.data && /[^+0-9]/.test(e.data);
      const isPaste = e?.inputType === "insertFromPaste" && this.telInput.value;
      if (isFormattingChar || (isPaste && !strictMode)) {
        userOverrideFormatting = true;
      }
      //* If user removes all formatting chars, then reset the override.
      else if (!/[^+0-9]/.test(this.telInput.value)) {
        userOverrideFormatting = false;
      }

      const isSetNumber = e?.detail && e.detail["isSetNumber"];
      //* Handle format-as-you-type, unless userOverrideFormatting, or isSetNumber.
      if (formatAsYouType && !userOverrideFormatting && !isSetNumber) {
        //* Maintain caret position after reformatting.
        const currentCaretPos = this.telInput.selectionStart || 0;
        const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos);
        const relevantCharsBeforeCaret = valueBeforeCaret.replace(/[^+0-9]/g, "").length;
        const isDeleteForwards = e?.inputType === "deleteContentForward";
        const formattedValue = this._formatNumberAsYouType();
        const newCaretPos = translateCursorPosition(relevantCharsBeforeCaret, formattedValue, currentCaretPos, isDeleteForwards);
        this.telInput.value = formattedValue;
        // WARNING: calling setSelectionRange triggers a focus on iOS
        this.telInput.setSelectionRange(newCaretPos, newCaretPos);
      }
    };
    //* This handles individual key presses as well as cut/paste events
    //* the advantage of the "input" event over "keyup" etc is that "input" only fires when the value changes,
    //* whereas "keyup" fires even for shift key, arrow key presses etc.
    this.telInput.addEventListener("input", this._handleInputEvent as EventListener);

    if (strictMode || separateDialCode) {
      //* On keydown event: (1) if strictMode then prevent invalid characters, (2) if separateDialCode then handle plus key
      //* Note that this fires BEFORE the input is updated.
      this._handleKeydownEvent = (e: KeyboardEvent): void => {
        //* Only interested in actual character presses, rather than ctrl, alt, command, arrow keys, delete/backspace, cut/copy/paste etc.
        if (e.key && e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
          //* If separateDialCode, handle the plus key differently: open dropdown and put plus in the search input instead.
          if (separateDialCode && allowDropdown && countrySearch && e.key === "+") {
            e.preventDefault();
            this._openDropdownWithPlus();
            return;
          }
          //* If strictMode, prevent invalid characters.
          if (strictMode) {
            const value = this.telInput.value;
            const alreadyHasPlus = value.charAt(0) === "+";
            const isInitialPlus = !alreadyHasPlus && this.telInput.selectionStart === 0 && e.key === "+";
            const isNumeric = /^[0-9]$/.test(e.key);
            const isAllowedChar = separateDialCode ? isNumeric : isInitialPlus || isNumeric;

            // insert the new character in the right place
            const newValue = value.slice(0, this.telInput.selectionStart) + e.key + value.slice(this.telInput.selectionEnd);
            const newFullNumber = this._getFullNumber(newValue);
            const coreNumber = intlTelInput.utils.getCoreNumber(newFullNumber, this.selectedCountryData.iso2);
            const hasExceededMaxLength = this.maxCoreNumberLength && coreNumber.length > this.maxCoreNumberLength;

            const newCountry = this._getNewCountryFromNumber(newFullNumber);
            const isChangingDialCode = newCountry !== null;

            // ignore the char if (1) it's not an allowed char, or (2) this new char will exceed the max length and this char will not change the selected country and it's not the initial plus (aka they're starting to type a dial code)
            if (!isAllowedChar || (hasExceededMaxLength && !isChangingDialCode && !isInitialPlus)) {
              e.preventDefault();
            }
          }
        }
      };
      this.telInput.addEventListener("keydown", this._handleKeydownEvent);
    }

    // Sanitise pasted values in strictMode
    if (strictMode) {
      this._handlePasteEvent = (e: ClipboardEvent): void => {
        // in strict mode we always control the pasted value
        e.preventDefault();

        // shortcuts
        const input = this.telInput;
        const selStart = input.selectionStart;
        const selEnd = input.selectionEnd;

        const pasted = e.clipboardData.getData("text");
        // only allow a plus in the pasted content if there's not already one in the input, or the existing one is selected to be replaced by the pasted content
        const initialCharSelected = selStart === 0 && selEnd > 0;
        const allowLeadingPlus = !input.value.startsWith("+") || initialCharSelected;
        // just numerics and pluses
        const allowedChars = pasted.replace(/[^0-9+]/g, "");
        const hasLeadingPlus = allowedChars.startsWith("+");
        // just numerics
        const numerics = allowedChars.replace(/\+/g, "");
        const sanitised = hasLeadingPlus && allowLeadingPlus ? `+${numerics}` : numerics;

        let newVal = input.value.slice(0, selStart) + sanitised + input.value.slice(selEnd);
        // check length
        const coreNumber = intlTelInput.utils.getCoreNumber(newVal, this.selectedCountryData.iso2);
        if (this.maxCoreNumberLength && coreNumber.length > this.maxCoreNumberLength) {
          if (input.selectionEnd === input.value.length) {
            // if they try to paste too many digits at the end, then just trim the excess
            const trimLength = coreNumber.length - this.maxCoreNumberLength;
            newVal = newVal.slice(0, newVal.length - trimLength);
          } else {
            // if they try to paste too many digits in the middle, then just ignore the paste entirely
            return;
          }
        }
        input.value = newVal;
        const caretPos = selStart + sanitised.length;
        input.setSelectionRange(caretPos, caretPos);

        // trigger format-as-you-type and country update etc
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      };
      this.telInput.addEventListener("paste", this._handlePasteEvent);
    }
  }

  //* Adhere to the input's maxlength attr.
  private _cap(number: string): string {
    const max = parseInt(this.telInput.getAttribute("maxlength") || "", 10);
  return max && number.length > max ? number.substring(0, max) : number;
  }

  //* Trigger a custom event on the input.
  private _trigger(name: string, detailProps: object = {}): void {
    const e = new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail: detailProps,
    });
    this.telInput.dispatchEvent(e);
  }

  //* Open the dropdown.
  private _openDropdown(): void {
    const { fixDropdownWidth, countrySearch } = this.options;
    if (fixDropdownWidth) {
      this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`;
    }
    this.dropdownContent.classList.remove("iti__hide");
    this.selectedCountry.setAttribute("aria-expanded", "true");

    this._setDropdownPosition();

    if (countrySearch) {
      //* When countrySearch enabled, every time the dropdown is opened we reset by highlighting the first item and scrolling to top.
      const firstCountryItem = this.countryList.firstElementChild as HTMLElement;
      if (firstCountryItem) {
        this._highlightListItem(firstCountryItem, false);
        this.countryList.scrollTop = 0;
      }
      this.searchInput.focus();
    }

    //* Bind all the dropdown-related listeners: mouseover, click, click-off, keydown.
    this._bindDropdownListeners();

    //* Update the arrow.
    this.dropdownArrow.classList.add("iti__arrow--up");

    this._trigger("open:countrydropdown");
  }

  //* Set the dropdown position
  private _setDropdownPosition(): void {
    if (this.options.dropdownContainer) {
      this.options.dropdownContainer.appendChild(this.dropdown);
    }

    if (!this.options.useFullscreenPopup) {
      // getBoundingClientRect is relative to the viewport, so when you scroll down, pos.top goes down, hence needing to add on scrollTop below
      const inputPosRelativeToVP = this.telInput.getBoundingClientRect();
      const inputHeight = this.telInput.offsetHeight;

      //* If dropdownContainer is enabled, calculate postion.
      if (this.options.dropdownContainer) {
        //* Calculate position.
        this.dropdown.style.top = `${inputPosRelativeToVP.top + inputHeight}px`;
        this.dropdown.style.left = `${inputPosRelativeToVP.left}px`;

        //* Close menu on window scroll.
        this._handleWindowScroll = (): void => this._closeDropdown();
        window.addEventListener("scroll", this._handleWindowScroll);
      }
    }
  }

  //* We only bind dropdown listeners when the dropdown is open.
  private _bindDropdownListeners(): void {
    //* When mouse over a list item, just highlight that one
    //* we add the class "highlight", so if they hit "enter" we know which one to select.
    this._handleMouseoverCountryList = (e): void => {
      //* Handle event delegation, as we're listening for this event on the countryList.
      const listItem: HTMLElement | null = (e.target as HTMLElement)?.closest(".iti__country");
      if (listItem) {
        this._highlightListItem(listItem, false);
      }
    };
    this.countryList.addEventListener(
      "mouseover",
      this._handleMouseoverCountryList,
    );

    //* Listen for country selection.
    this._handleClickCountryList = (e): void => {
      const listItem: HTMLElement | null = (e.target as HTMLElement)?.closest(".iti__country");
      if (listItem) {
        this._selectListItem(listItem);
      }
    };
    this.countryList.addEventListener("click", this._handleClickCountryList);

    //* Click off to close (except when this initial opening click is bubbling up).
    //* We cannot just stopPropagation as it may be needed to close another instance.
    this._handleClickOffToClose = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const clickedInsideDropdown = !!target.closest(`#iti-${this.id}__dropdown-content`);
      // only close if clicked outside (allow clicks on country search input/clear button/no results message etc)
      if (!clickedInsideDropdown) {
        this._closeDropdown();
      }
    };
    // Use setTimeout to allow this event listener to be bound after the current thread of execution, which is where the opening click is happening (which would otherwise immediately trigger click-off-to-close so the dropdown would never open)
    setTimeout(() => {
      document.documentElement.addEventListener(
        "click",
        this._handleClickOffToClose,
      );
    }, 0);

    //* Listen for up/down scrolling, enter to select, or escape to close.
    //* Use keydown as keypress doesn't fire for non-char keys and we want to catch if they
    //* just hit down and hold it to scroll down (no keyup event).
    //* Listen on the document because that's where key events are triggered if no input has focus.
    let query = "";
    let queryTimer: NodeJS.Timeout | null = null;
    this._handleKeydownOnDropdown = (e: KeyboardEvent): void => {
      //* prevent down key from scrolling the whole page, and enter key from submitting a form etc.
      if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();

        //* Up and down to navigate.
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          this._handleUpDownKey(e.key);
        }
        //* Enter to select.
        else if (e.key === "Enter") {
          this._handleEnterKey();
        }
        //* Esc to close
        else if (e.key === "Escape") {
          this._closeDropdown();
        }
      }

      //* When countrySearch disabled: Listen for alpha chars to perform hidden search.
      //* Regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866.
      if (!this.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
        e.stopPropagation();
        //* Jump to countries that start with the query string.
        if (queryTimer) {
          clearTimeout(queryTimer);
        }
        query += e.key.toLowerCase();
        this._searchForCountry(query);
        //* If the timer hits 1 second, reset the query.
        queryTimer = setTimeout(() => {
          query = "";
        }, 1000);
      }
    };
    document.addEventListener("keydown", this._handleKeydownOnDropdown);

    if (this.options.countrySearch) {
      const doFilter = (): void => {
        const inputQuery = this.searchInput.value.trim();
        this._filterCountries(inputQuery);
        // show/hide clear button
        if (this.searchInput.value) {
          this.searchClearButton.classList.remove("iti__hide");
        } else {
          this.searchClearButton.classList.add("iti__hide");
        }
      };

      let keyupTimer: NodeJS.Timeout | null = null;
      this._handleSearchChange = (): void => {
        //* Filtering country nodes is expensive (lots of DOM manipulation), so rate limit it.
        if (keyupTimer) {
          clearTimeout(keyupTimer);
        }
        keyupTimer = setTimeout(() => {
          doFilter();
          keyupTimer = null;
        }, 100);
      };
      this.searchInput.addEventListener("input", this._handleSearchChange);

      this._handleSearchClear = (): void => {
        this.searchInput.value = "";
        this.searchInput.focus();
        doFilter();
      };
      // Prevent click from closing dropdown, clear text, refocus input, and reset filter
      this.searchClearButton.addEventListener("click", this._handleSearchClear);
    }
  }

  //* Hidden search (countrySearch disabled): Find the first list item whose name starts with the query string.
  private _searchForCountry(query: string): void {
    for (const c of this.countries) {
      const startsWith = c.name.substring(0, query.length).toLowerCase() === query;
      if (startsWith) {
        const listItem = c.nodeById[this.id];
        //* Update highlighting and scroll.
        this._highlightListItem(listItem, false);
        this._scrollTo(listItem);
        break;
      }
    }
  }

  //* Country search enabled: Filter the countries according to the search query.
  private _filterCountries(query: string): void {
    let noCountriesAddedYet = true;
    this.countryList.innerHTML = "";
    const normalisedQuery = normaliseString(query);
    let matchedCountries;

    if (query === "") {
      // reset - back to all countries
      matchedCountries = this.countries;
    } else {
      // search result groups, in order of priority
      // first, exact ISO2 matches, then name starts with, then name contains, dial code match etc.
      const iso2Matches = [];
      const nameStartWith = [];
      const nameContains = [];
      const dialCodeMatches = [];
      const dialCodeContains = [];
      const initialsMatches = [];

      for (const c of this.countries) {
        if (c.iso2 === normalisedQuery) {
          iso2Matches.push(c);
        } else if (c.normalisedName.startsWith(normalisedQuery)) {
          nameStartWith.push(c);
        } else if (c.normalisedName.includes(normalisedQuery)) {
          nameContains.push(c);
        } else if (normalisedQuery === c.dialCode || normalisedQuery === c.dialCodePlus) {
          dialCodeMatches.push(c);
        } else if (c.dialCodePlus.includes(normalisedQuery)) {
          dialCodeContains.push(c);
        } else if (c.initials.includes(normalisedQuery)) {
          initialsMatches.push(c);
        }
      }

      // Combine result groups in correct order (and respect country priority order within each group e.g. if search +44, then UK appears first above Guernsey etc)
      matchedCountries = [
        ...iso2Matches.sort((a, b) => a.priority - b.priority),
        ...nameStartWith.sort((a, b) => a.priority - b.priority),
        ...nameContains.sort((a, b) => a.priority - b.priority),
        ...dialCodeMatches.sort((a, b) => a.priority - b.priority),
        ...dialCodeContains.sort((a, b) => a.priority - b.priority),
        ...initialsMatches.sort((a, b) => a.priority - b.priority),
      ];
    }

    for (const c of matchedCountries) {
      const listItem = c.nodeById[this.id];
      if (listItem) {
        this.countryList.appendChild(listItem);

        //* Highlight the first item
        if (noCountriesAddedYet) {
          this._highlightListItem(listItem, false);
          noCountriesAddedYet = false;
        }
      }
    }
    //* If no countries are shown, unhighlight the previously highlighted item.
    if (noCountriesAddedYet) {
      this._highlightListItem(null, false);
      if (this.searchNoResults) {
        this.searchNoResults.classList.remove("iti__hide");
      }
    } else if (this.searchNoResults) {
      this.searchNoResults.classList.add("iti__hide");
    }
    //* Scroll to top (useful if user had previously scrolled down).
    this.countryList.scrollTop = 0;
    this._updateSearchResultsA11yText();
  }

  //* Update search results text (for a11y).
  private _updateSearchResultsA11yText(): void {
    const { i18n } = this.options;
    const count = this.countryList.childElementCount;
    let searchText: string;
    if (count === 0) {
      searchText = i18n.zeroSearchResults;
    } else {
      // one or more results
      if (i18n.searchResultsText) {
        searchText = i18n.searchResultsText(count);
      } else if (count === 1) {
        searchText = i18n.oneSearchResult;
      } else {
        // eslint-disable-next-line no-template-curly-in-string
        searchText = i18n.multipleSearchResults.replace("${count}", count.toString());
      }
    }
    this.searchResultsA11yText.textContent = searchText;
  }

  //* Highlight the next/prev item in the list (and ensure it is visible).
  private _handleUpDownKey(key: string): void {
    let next =
      key === "ArrowUp"
        ? this.highlightedItem?.previousElementSibling as HTMLElement
        : this.highlightedItem?.nextElementSibling as HTMLElement;
    if (!next && this.countryList.childElementCount > 1) {
      //* Otherwise, we must be at the end, so loop round again.
      next =
        key === "ArrowUp"
          ? this.countryList.lastElementChild as HTMLElement
          : this.countryList.firstElementChild as HTMLElement;
    }
    if (next) {
      //* Make sure the next item is visible
      //* (before calling focus(), which can cause the next item to scroll to the middle of the dropdown, which is jarring).
      this._scrollTo(next);
      //* If country search enabled, don't lose focus from the search input on up/down
      this._highlightListItem(next, false);
    }
  }

  //* Select the currently highlighted item.
  private _handleEnterKey(): void {
    if (this.highlightedItem) {
      this._selectListItem(this.highlightedItem);
    }
  }

  //* Update the input's value to the given val (format first if possible)
  //* NOTE: this is called from _setInitialState, handleUtils and setNumber.
  private _updateValFromNumber(fullNumber: string): void {
    let number = fullNumber;
    if (
      this.options.formatOnDisplay &&
      intlTelInput.utils &&
      this.selectedCountryData
    ) {
      const useNational =
        this.options.nationalMode ||
        (number.charAt(0) !== "+" && !this.options.separateDialCode);
      const { NATIONAL, INTERNATIONAL } = intlTelInput.utils.numberFormat;
      const format = useNational ? NATIONAL : INTERNATIONAL;
      number = intlTelInput.utils.formatNumber(
        number,
        this.selectedCountryData.iso2,
        format,
      );
    }

    number = this._beforeSetNumber(number);
    this.telInput.value = number;
  }

  //* Check if need to select a new country based on the given number
  //* Note: called from _setInitialState, keyup handler, setNumber.
  private _updateCountryFromNumber(fullNumber: string): boolean {
    const iso2 = this._getNewCountryFromNumber(fullNumber);
    if (iso2 !== null) {
      return this._setCountry(iso2);
    }
    return false;
  }

  private _ensureHasDialCode(number: string): string {
    const { dialCode, nationalPrefix } = this.selectedCountryData;
    const alreadyHasPlus = number.charAt(0) === "+";
    if (alreadyHasPlus || !dialCode) {
      return number;
    }
    //* Don't remove "nationalPrefix" digit if separateDialCode is enabled, as it can be part of a valid area code e.g. in Russia then have area codes starting with 8, which is also the national prefix digit.
    const hasPrefix = nationalPrefix && number.charAt(0) === nationalPrefix && !this.options.separateDialCode;
    const cleanNumber = hasPrefix ? number.substring(1) : number;
    return `+${dialCode}${cleanNumber}`;
  }

  // Get the country ISO2 code from the given number
  // BUT ONLY IF ITS CHANGED FROM THE CURRENTLY SELECTED COUNTRY
  // NOTE: consider refactoring this to be more clear
  private _getNewCountryFromNumber(fullNumber: string): string | null {
    const plusIndex = fullNumber.indexOf("+");
    //* If it contains a plus, discard any chars before it e.g. accidental space char.
    //* This keeps the selected country auto-updating correctly, which we want as
    //* libphonenumber's validation/getNumber methods will ignore these chars anyway.
    let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
    const selectedIso2 = this.selectedCountryData.iso2;
    const selectedDialCode = this.selectedCountryData.dialCode;

    //* Ensure the number starts with the dial code, for getDialCode to work properly (e.g. if number is entered in national format, or with separateDialCode enabled)
    number = this._ensureHasDialCode(number);

    //* Try and extract valid dial code (plus area code digits) from input.
    const dialCodeMatch = this._getDialCode(number, true);
    const numeric = getNumeric(number);
    if (dialCodeMatch) {
      // we have a match, so we WILL be selecting a country (unless it's already selected)
      const dialCodeMatchNumeric = getNumeric(dialCodeMatch);
      const iso2Codes = this.dialCodeToIso2Map[dialCodeMatchNumeric];

      // SINGLE country found for the typed dialcode/areacode
      if (iso2Codes.length === 1) {
        // if it's already selected, then no change
        if (iso2Codes[0] === selectedIso2) {
          return null;
        }
        // it's not already selected, so change
        return iso2Codes[0];
      }

      // MULTIPLE countries found for the typed dialcode/areacode

      //* If they've just typed a dial code (from empty state), and it matches the last selected country (this.defaultCountry), then stick to that country e.g. if they select Aland Islands, then type it's dial code +358, we should stick to that country and not switch to Finland!
      if (!selectedIso2 && this.defaultCountry && iso2Codes.includes(this.defaultCountry)) {
        return this.defaultCountry;
      }

      // if they're typing a regionless NANP number and they already have a NANP country selected, then don't change the country
      const isRegionlessNanpNumber =
        selectedDialCode === "1" && isRegionlessNanp(numeric);
      if (isRegionlessNanpNumber) {
        return null;
      }

      //* Check if the right country is already selected (note: might be empty state - globe icon).
      // If the currently selected country has area codes, and they've typed more digits than the best area code match, then that means none of the area codes matched the input number, as a full area code match would have resulted in a single country match above.
      const hasAreaCodesButNoneMatched = this.selectedCountryData.areaCodes && numeric.length > dialCodeMatchNumeric.length;
      const alreadySelected = selectedIso2 && iso2Codes.includes(selectedIso2) && !hasAreaCodesButNoneMatched;
      if (!alreadySelected) {
        return iso2Codes[0];
      }
    } else if (number.charAt(0) === "+" && numeric.length) {
      //* Invalid dial code, so empty.
      //* Note: use getNumeric here because the number has not been formatted yet, so could contain bad chars.
      return "";
    } else if ((!number || number === "+") && !selectedIso2) {
      //* If no selected country, and user either clears the input, or just types a plus, then show default.
      return this.defaultCountry;
    }
    return null;
  }

  //* Remove highlighting from other list items and highlight the given item.
  private _highlightListItem(listItem: HTMLElement | null, shouldFocus: boolean): void {
    const prevItem = this.highlightedItem;
    if (prevItem) {
      prevItem.classList.remove("iti__highlight");
      prevItem.setAttribute("aria-selected", "false");
    }
    //* Set this, even if it's null, as it will clear the highlight.
    this.highlightedItem = listItem;
    if (this.highlightedItem) {
      this.highlightedItem.classList.add("iti__highlight");
      this.highlightedItem.setAttribute("aria-selected", "true");
      if (this.options.countrySearch) {
        const activeDescendant = this.highlightedItem.getAttribute("id") || "";
        this.searchInput.setAttribute("aria-activedescendant", activeDescendant);
      }
    }

    if (shouldFocus) {
      this.highlightedItem.focus();
    }
  }

  //* Find the country data for the given iso2 code
  //* the allowFail option is only used during init() for the initialCountry option, and for the iso2 returned from geoIpLookup - in these 2 cases we don't want to error out
  private _getCountryData(iso2: string, allowFail: boolean): Country | null {
    const country = this.countryByIso2.get(iso2);
    if (country) {
      return country;
    }
    if (allowFail) {
      return null;
    }
    throw new Error(`No country data for '${iso2}'`);
  }

  //* Update the selected country, dial code (if separateDialCode), placeholder, title, and active list item.
  //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
  private _setCountry(iso2?: string | null): boolean {
    const { separateDialCode, showFlags, i18n } = this.options;

    const prevIso2 = this.selectedCountryData.iso2 || "";

    //* Do this first as it will throw an error and stop if iso2 is invalid.
    this.selectedCountryData = iso2
      ? this._getCountryData(iso2, false) || {}
      : {};
    //* Update the defaultCountry - we only need the iso2 from now on, so just store that.
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    //* Update the flag class and the a11y text.
    if (this.selectedCountry) {
      const flagClass = iso2 && showFlags ? `iti__flag iti__${iso2}` : "iti__flag iti__globe";
      let ariaLabel, title;
      if (iso2) {
        const { name, dialCode } = this.selectedCountryData;
        title = name;
        ariaLabel = i18n.selectedCountryAriaLabel.replace("${countryName}", name).replace("${dialCode}", `+${dialCode}`);
      } else {
        title = i18n.noCountrySelected;
        ariaLabel = i18n.noCountrySelected;
      }
      this.selectedCountryInner.className = flagClass;
      this.selectedCountry.setAttribute("title", title);
      this.selectedCountry.setAttribute("aria-label", ariaLabel);
    }

    //* Update the selected dial code.
    if (separateDialCode) {
      const dialCode = this.selectedCountryData.dialCode
        ? `+${this.selectedCountryData.dialCode}`
        : "";
      this.selectedDialCode.innerHTML = dialCode;
      this._updateInputPadding();
    }

    //* And the input's placeholder.
    this._updatePlaceholder();

    //* Update the maximum valid number length.
    this._updateMaxLength();

    //* Return if the country has changed or not.
    return prevIso2 !== iso2;
  }

  //* Update the input padding to make space for the selected country/dial code.
  private _updateInputPadding(): void {
    if (this.selectedCountry) {
      // if all else fails, these are better than nothing
      const saneDefaultWidth = this.options.separateDialCode ? 78 : 42;
      //* offsetWidth is zero if input is in a hidden container during initialisation.
      const selectedCountryWidth = this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth() || saneDefaultWidth;
      const inputPadding = selectedCountryWidth + 6;
      if (this.showSelectedCountryOnLeft) {
        this.telInput.style.paddingLeft = `${inputPadding}px`;
      } else {
        this.telInput.style.paddingRight = `${inputPadding}px`;
      }
    }
  }

  //* Update the maximum valid number length for the currently selected country.
  private _updateMaxLength(): void {
    const { strictMode, placeholderNumberType, validationNumberTypes } = this.options;
    const { iso2 } = this.selectedCountryData;
    if (strictMode && intlTelInput.utils) {
      if (iso2) {
        const numberType = intlTelInput.utils.numberType[placeholderNumberType];
        let exampleNumber = intlTelInput.utils.getExampleNumber(
          iso2,
          false,
          numberType,
          true,
        );
        //* See if adding more digits is still valid to get the true maximum valid length.
        let validNumber = exampleNumber;
        while (intlTelInput.utils.isPossibleNumber(exampleNumber, iso2, validationNumberTypes)) {
          validNumber = exampleNumber;
          exampleNumber += "0";
        }
        const coreNumber = intlTelInput.utils.getCoreNumber(validNumber, iso2);
        this.maxCoreNumberLength = coreNumber.length;

        // hack for Belarus, because for some reason, getCoreNumber("80294911911"), aka the placeholder number, returns "294911911" (9 digits), but getCoreNumber("8029491191"), aka you're typing the penultimate digit of the placeholder number, returns "8029491191" (10 digits) and so strictMode blocks it. so we increase the max length to 10 digits to allow this penultimate digit, and then when they type the final digit, getCoreNumber will return 9 digits again, so it will be fine.
        if (iso2 === "by") {
          this.maxCoreNumberLength = coreNumber.length + 1;
        }
      } else {
        this.maxCoreNumberLength = null;
      }
    }
  }

  //* When input is in a hidden container during init, we cannot calculate the selected country width.
  //* Fix: clone the markup, make it invisible, add it to the end of the DOM, and then measure it's width.
  //* To get the right styling to apply, all we need is a shallow clone of the container,
  //* and then to inject a deep clone of the selectedCountry element.
  private _getHiddenSelectedCountryWidth(): number {
    if (this.telInput.parentNode) {
      // Use window.top as a fix for same-origin iframes (that are hidden during init) where even appending it to document.body would still be hidden. window.top accesses the top-most document, which will not be hidden.
      let body;
      try {
        body = window.top.document.body;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // fix for cross-origin iframes, where accessing window.top.document throws a security error
        body = document.body;
      }

      const containerClone = this.telInput.parentNode.cloneNode(false) as HTMLElement;
      containerClone.style.visibility = "hidden";
      body.appendChild(containerClone);

      const countryContainerClone = this.countryContainer.cloneNode() as HTMLElement;
      containerClone.appendChild(countryContainerClone);

      const selectedCountryClone = this.selectedCountry.cloneNode(true) as HTMLElement;
      countryContainerClone.appendChild(selectedCountryClone);

      const width = selectedCountryClone.offsetWidth;
      body.removeChild(containerClone);
      return width;
    }
    return 0;
  }

  //* Update the input placeholder to an example number from the currently selected country.
  private _updatePlaceholder(): void {
    const {
      autoPlaceholder,
      placeholderNumberType,
      nationalMode,
      customPlaceholder,
    } = this.options;
    const shouldSetPlaceholder =
      autoPlaceholder === "aggressive" ||
      (!this.hadInitialPlaceholder && autoPlaceholder === "polite");

    if (intlTelInput.utils && shouldSetPlaceholder) {
      const numberType = intlTelInput.utils.numberType[placeholderNumberType];
      //* Note: Must set placeholder to empty string if no country selected (globe icon showing).
      let placeholder = this.selectedCountryData.iso2
        ? intlTelInput.utils.getExampleNumber(
            this.selectedCountryData.iso2,
            nationalMode,
            numberType,
          )
        : "";

      placeholder = this._beforeSetNumber(placeholder);
      if (typeof customPlaceholder === "function") {
        placeholder = customPlaceholder(placeholder, this.selectedCountryData);
      }
      this.telInput.setAttribute("placeholder", placeholder);
    }
  }

  //* Called when the user selects a list item from the dropdown.
  private _selectListItem(listItem: HTMLElement): void {
    //* Update selected country and active list item.
    const countryChanged = this._setCountry(
      listItem.getAttribute("data-country-code"),
    );
    this._closeDropdown();

    this._updateDialCode(listItem.getAttribute("data-dial-code"));

    // reformat any existing number to the new country
    if (this.options.formatOnDisplay) {
      this._updateValFromNumber(this.telInput.value);
    }

    //* Focus the input.
    this.telInput.focus();

    if (countryChanged) {
      this._triggerCountryChange();
    }
  }

  //* Close the dropdown and unbind any listeners.
  private _closeDropdown(): void {
    this.dropdownContent.classList.add("iti__hide");
    this.selectedCountry.setAttribute("aria-expanded", "false");
    if (this.highlightedItem) {
      this.highlightedItem.setAttribute("aria-selected", "false");
    }
    if (this.options.countrySearch) {
      this.searchInput.removeAttribute("aria-activedescendant");
    }

    //* Update the arrow.
    this.dropdownArrow.classList.remove("iti__arrow--up");

    //* Unbind key events.
    if (this.options.countrySearch) {
      this.searchInput.removeEventListener("input", this._handleSearchChange);
      this.searchClearButton.removeEventListener("click", this._handleSearchClear);
    }
    document.documentElement.removeEventListener(
      "click",
      this._handleClickOffToClose,
    );
    this.countryList.removeEventListener(
      "mouseover",
      this._handleMouseoverCountryList,
    );
    this.countryList.removeEventListener("click", this._handleClickCountryList);

    //* Remove menu from container.
    if (this.options.dropdownContainer) {
      if (!this.options.useFullscreenPopup) {
        window.removeEventListener("scroll", this._handleWindowScroll);
      }
      if (this.dropdown.parentNode) {
        this.dropdown.parentNode.removeChild(this.dropdown);
      }
    }

    //* Unhook any deferred resource loads.
    if (this._handlePageLoad) {
      window.removeEventListener("load", this._handlePageLoad);
    }

    this._trigger("close:countrydropdown");
  }

  //* Check if an element is visible within it's container, else scroll until it is.
  private _scrollTo(element: HTMLElement): void {
    const container = this.countryList;
    const scrollTop = document.documentElement.scrollTop;
    const containerHeight = container.offsetHeight;
    const containerTop = container.getBoundingClientRect().top + scrollTop;
    const containerBottom = containerTop + containerHeight;
    const elementHeight = element.offsetHeight;
    const elementTop = element.getBoundingClientRect().top + scrollTop;
    const elementBottom = elementTop + elementHeight;
    const newScrollTop = elementTop - containerTop + container.scrollTop;

    if (elementTop < containerTop) {
      //* Scroll up.
      container.scrollTop = newScrollTop;
    } else if (elementBottom > containerBottom) {
      //* Scroll down.
      const heightDifference = containerHeight - elementHeight;
      container.scrollTop = newScrollTop - heightDifference;
    }
  }

  //* Replace any existing dial code with the new one
  //* Note: called from _selectListItem and setCountry
  private _updateDialCode(newDialCodeBare): void {
    const inputVal = this.telInput.value;
    //* Save having to pass this every time.
    const newDialCode = `+${newDialCodeBare}`;

    let newNumber;
    if (inputVal.charAt(0) === "+") {
      //* There's a plus so we're dealing with a replacement.
      const prevDialCode = this._getDialCode(inputVal);
      if (prevDialCode) {
        //* Current number contains a valid dial code, so replace it.
        newNumber = inputVal.replace(prevDialCode, newDialCode);
      } else {
        //* Current number contains an invalid dial code, so ditch it
        //* (no way to determine where the invalid dial code ends and the rest of the number begins)
        newNumber = newDialCode;
      }
      this.telInput.value = newNumber;
    }
  }

  //* Try and extract a valid international dial code from a full telephone number.
  //* Note: returns the raw string inc plus character and any whitespace/dots etc.
  private _getDialCode(number: string, includeAreaCode?: boolean): string {
    let dialCode = "";
    //* Only interested in international numbers (starting with a plus)
    if (number.charAt(0) === "+") {
      let numericChars = "";
      //* Iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        //* If char is number.
        //* https://stackoverflow.com/a/8935649/217866
        if (!isNaN(parseInt(c, 10))) {
          numericChars += c;
          //* If current numericChars make a valid dial code.
          if (includeAreaCode) {
            if (this.dialCodeToIso2Map[numericChars]) {
              //* Store the actual raw string (useful for matching later).
              dialCode = number.substring(0, i + 1);
            }
          } else {
            if (this.dialCodes.has(numericChars)) {
              dialCode = number.substring(0, i + 1);
              //* If we're just looking for a dial code, we can break as soon as we find one.
              break;
            }
          }
          //* Stop searching as soon as we can - in this case when we hit max len.
          if (numericChars.length === this.dialCodeMaxLen) {
            break;
          }
        }
      }
    }
    return dialCode;
  }

  //* Get the input val, adding the dial code if separateDialCode is enabled.
  private _getFullNumber(overrideVal?: string): string {
    const val = overrideVal || this.telInput.value.trim();
    const { dialCode } = this.selectedCountryData;
    let prefix;
    const numericVal = getNumeric(val);

    if (
      this.options.separateDialCode &&
      val.charAt(0) !== "+" &&
      dialCode &&
      numericVal
    ) {
      //* When using separateDialCode, it is visible so is effectively part of the typed number.
      prefix = `+${dialCode}`;
    } else {
      prefix = "";
    }
    return prefix + val;
  }

  //* Remove the dial code if separateDialCode is enabled also cap the length if the input has a maxlength attribute
  private _beforeSetNumber(fullNumber: string): string {
    let number = fullNumber;
    if (this.options.separateDialCode) {
      let dialCode = this._getDialCode(number);
      //* If there is a valid dial code.
      if (dialCode) {
        //* In case _getDialCode returned an area code as well.
        dialCode = `+${this.selectedCountryData.dialCode}`;
        //* a lot of numbers will have a space separating the dial code and the main number, and
        //* some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get rid of it.
        //* NOTE: Don't just trim all non-numerics as may want to preserve an open parenthesis etc.
        const start =
          number[dialCode.length] === " " || number[dialCode.length] === "-"
            ? dialCode.length + 1
            : dialCode.length;
          number = number.substring(start);
      }
    }

    return this._cap(number);
  }

  //* Trigger the 'countrychange' event.
  private _triggerCountryChange(): void {
    this._trigger("countrychange");
  }

  //* Format the number as the user types.
  private _formatNumberAsYouType(): string {
    const val = this._getFullNumber();
    const result = intlTelInput.utils
      ? intlTelInput.utils.formatNumberAsYouType(val, this.selectedCountryData.iso2)
      : val;
    //* If separateDialCode and they haven't (re)typed the dial code in the input as well,
    //* then remove the dial code.
    const { dialCode } = this.selectedCountryData;
    if (
      this.options.separateDialCode &&
      this.telInput.value.charAt(0) !== "+" &&
      result.includes(`+${dialCode}`)
    ) {
      const afterDialCode = result.split(`+${dialCode}`)[1] || "";
      return afterDialCode.trim();
    }
    return result;
  }

  //**************************
  //*  SECRET PUBLIC METHODS
  //**************************

  //* This is called when the geoip call returns.
  handleAutoCountry(): void {
    if (this.options.initialCountry === "auto" && intlTelInput.autoCountry) {
      //* We must set this even if there is an initial val in the input: in case the initial val is
      //* invalid and they delete it - they should see their auto country.
      this.defaultCountry = intlTelInput.autoCountry;
      const hasSelectedCountryOrGlobe = this.selectedCountryData.iso2 || this.selectedCountryInner.classList.contains("iti__globe");
      //* If no country/globe currently selected, then update the country.
      if (!hasSelectedCountryOrGlobe) {
        this.setCountry(this.defaultCountry);
      }
      this.resolveAutoCountryPromise();
    }
  }

  //* This is called when the utils request completes.
  handleUtils(): void {
    //* If the request was successful
    if (intlTelInput.utils) {
      //* If there's an initial value in the input, then format it.
      if (this.telInput.value) {
        this._updateValFromNumber(this.telInput.value);
      }
      if (this.selectedCountryData.iso2) {
        this._updatePlaceholder();
        this._updateMaxLength();
      }
    }
    this.resolveUtilsScriptPromise();
  }

  //********************
  //*  PUBLIC METHODS
  //********************

  //* Remove plugin.
  destroy(): void {
    this.telInput.iti = undefined;
    const { allowDropdown, separateDialCode } = this.options;
    if (allowDropdown) {
      //* Make sure the dropdown is closed (and unbind listeners).
      this._closeDropdown();
      this.selectedCountry.removeEventListener(
        "click",
        this._handleClickSelectedCountry,
      );
      this.countryContainer.removeEventListener(
        "keydown",
        this._handleCountryContainerKeydown,
      );
      //* Label click hack.
      const label = this.telInput.closest("label");
      if (label) {
        label.removeEventListener("click", this._handleLabelClick);
      }
    }

    //* Unbind hiddenInput listeners.
    const { form } = this.telInput;
    if (this._handleHiddenInputSubmit && form) {
      form.removeEventListener("submit", this._handleHiddenInputSubmit);
    }

    //* Unbind key events, and cut/paste events.
    this.telInput.removeEventListener("input", this._handleInputEvent as EventListener);
    if (this._handleKeydownEvent) {
      this.telInput.removeEventListener("keydown", this._handleKeydownEvent);
    }
    if (this._handlePasteEvent) {
      this.telInput.removeEventListener("paste", this._handlePasteEvent);
    }

    //* Remove attribute of id instance: data-intl-tel-input-id.
    this.telInput.removeAttribute("data-intl-tel-input-id");

    //* Restore original styling
    if (separateDialCode) {
      if (this.isRTL) {
        this.telInput.style.paddingRight = this.originalPaddingRight;
      } else {
        this.telInput.style.paddingLeft = this.originalPaddingLeft;
      }
    }

    //* Remove markup (but leave the original input).
    const wrapper = this.telInput.parentNode;
    wrapper?.parentNode?.insertBefore(this.telInput, wrapper);
    wrapper?.parentNode?.removeChild(wrapper);

    delete intlTelInput.instances[this.id];
  }

  //* Get the extension from the current number.
  getExtension(): string {
    if (intlTelInput.utils) {
      return intlTelInput.utils.getExtension(
        this._getFullNumber(),
        this.selectedCountryData.iso2,
      );
    }
    return "";
  }

  //* Format the number to the given format.
  getNumber(format?: number): string {
    if (intlTelInput.utils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInput.utils.formatNumber(
        this._getFullNumber(),
        iso2,
        format,
      );
    }
    return "";
  }

  //* Get the type of the entered number e.g. landline/mobile.
  getNumberType(): number {
    if (intlTelInput.utils) {
      return intlTelInput.utils.getNumberType(
        this._getFullNumber(),
        this.selectedCountryData.iso2,
      );
    }
    return -99;
  }

  //* Get the country data for the currently selected country.
  getSelectedCountryData(): SelectedCountryData {
    return this.selectedCountryData;
  }

  //* Get the validation error.
  getValidationError(): number {
    if (intlTelInput.utils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInput.utils.getValidationError(this._getFullNumber(), iso2);
    }
    return -99;
  }

  //* Validate the input val (with precise=false)
  isValidNumber(): boolean | null {
    return this._validateNumber(false);
  }

  //* Validate the input val (with precise=true)
  isValidNumberPrecise(): boolean | null {
    return this._validateNumber(true);
  }

  private _utilsIsPossibleNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isPossibleNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes)
      : null;
  }

  //* Shared internal validation logic to handle alpha character extension rules.
  private _validateNumber(precise: boolean): boolean | null {
    if (!this.selectedCountryData.iso2) {
      return false;
    }

    const testValidity = (s: string) => precise
      ? this._utilsIsValidNumber(s)
      : this._utilsIsPossibleNumber(s);

    const val = this._getFullNumber();
    const alphaCharPosition = val.search(/\p{L}/u);
    const hasAlphaChar = alphaCharPosition > -1;
    if (hasAlphaChar && !this.options.allowPhonewords) {
      const beforeAlphaChar = val.substring(0, alphaCharPosition);
      //* Workaround to allow some alpha chars e.g. "+1 (444) 444-4444 ext. 1234" while rejecting others e.g. "+1 (444) 444-FAST". The only legit use of alpha chars is as an extension separator, in which case, the number before it must be valid on its own.
      const beforeAlphaIsValid = testValidity(beforeAlphaChar);
      const isValid = testValidity(val);
      return beforeAlphaIsValid && isValid;
    }
    return testValidity(val);
  }

  private _utilsIsValidNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes)
      : null;
  }

  //* Update the selected country, and update the input val accordingly.
  setCountry(iso2: string): void {
    const iso2Lower = iso2?.toLowerCase();
    const currentCountry = this.selectedCountryData.iso2;
    //* There is a country change IF: either there is a new country and it's different to the current one, OR there is no new country (i.e. globe state) and there is a current country
    const isCountryChange = (iso2 && (iso2Lower !== currentCountry) || (!iso2 && currentCountry));
    if (isCountryChange) {
      this._setCountry(iso2Lower);
      this._updateDialCode(this.selectedCountryData.dialCode);
      // reformat
      if (this.options.formatOnDisplay) {
        this._updateValFromNumber(this.telInput.value);
      }
      this._triggerCountryChange();
    }
  }

  //* Set the input value and update the country.
  setNumber(number: string): void {
    //* We must update the country first, which updates this.selectedCountryData, which is used for
    //* formatting the number before displaying it.
    const countryChanged = this._updateCountryFromNumber(number);
    this._updateValFromNumber(number);
    if (countryChanged) {
      this._triggerCountryChange();
    }
    //* This is required for the React cmp to update its state correctly.
    this._trigger("input", { isSetNumber: true });
  }

  //* Set the placeholder number typ
  setPlaceholderNumberType(type: NumberType): void {
    this.options.placeholderNumberType = type;
    this._updatePlaceholder();
  }

  setDisabled(disabled: boolean): void {
    this.telInput.disabled = disabled;
    if (disabled) {
      this.selectedCountry.setAttribute("disabled", "true");
    } else {
      this.selectedCountry.removeAttribute("disabled");
    }
  }
}

/********************
 *  STATIC METHODS
 ********************/

//* Load the utils script.
const attachUtils = (source: UtilsLoader): Promise<unknown> | null => {
  //* 2 Options:
  //* 1) Not already started loading (start)
  //* 2) Already started loading (do nothing - just wait for the onload callback to fire, which will
  //* trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
  if (
    !intlTelInput.utils &&
    !intlTelInput.startedLoadingUtilsScript
  ) {
    let loadCall;
    if (typeof source === "function") {
      try {
        loadCall = Promise.resolve(source());
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof source}`));
    }

    //* Only do this once.
    intlTelInput.startedLoadingUtilsScript = true;

    return loadCall
      .then((module) => {
        const utils = module?.default;
        if (!utils || typeof utils !== "object") {
          throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");
        }

        intlTelInput.utils = utils;
        forEachInstance("handleUtils");
        return true;
      })
      .catch((error: Error) => {
        forEachInstance("rejectUtilsScriptPromise", error);
        throw error;
      });
  }
  return null;
};

//* Convenience wrapper.
const intlTelInput: IntlTelInputInterface = Object.assign(
  (input: HTMLInputElement, options?: SomeOptions): Iti => {
    const iti = new Iti(input, options);
    iti._init();
    input.setAttribute("data-intl-tel-input-id", iti.id.toString());
    intlTelInput.instances[iti.id] = iti;
    input.iti = iti;
    return iti;
  },
  {
    defaults,
    //* Using a static var like this allows us to mock it in the tests.
    documentReady: (): boolean => document.readyState === "complete",
    //* Get the country data object.
    getCountryData: (): Country[] => allCountries,
    //* A getter for the plugin instance.
    getInstance: (input: HTMLInputElement): Iti | null => {
      const id = input.getAttribute("data-intl-tel-input-id");
      return id ? intlTelInput.instances[id] : null;
    },
    //* A map from instance ID to instance object.
    instances: {},
    attachUtils,
    startedLoadingUtilsScript: false,
    startedLoadingAutoCountry: false,
    version: process.env.VERSION,
  });

export default intlTelInput;
