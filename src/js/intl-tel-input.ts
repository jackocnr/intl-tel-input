import allCountries, { Country } from "./intl-tel-input/data";
import { I18n } from "./intl-tel-input/i18n/types";
import defaultEnglishStrings from "./intl-tel-input/i18n/en";

//* Populate the country names in the default language - useful if you want to use static getCountryData to populate another country dropdown etc.
for (let i = 0; i < allCountries.length; i++) {
  allCountries[i].name = defaultEnglishStrings[allCountries[i].iso2];
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
  loadUtils: (source: string|UtilsLoader) => Promise<unknown> | null;
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
  getNumberType: (number: string, iso2: string | undefined) => number;
  getValidationError(number: string, iso2: string | undefined): number;
  isPossibleNumber(number: string, iso2: string | undefined, numberType?: string): boolean;
  isValidNumber: (number: string, iso2: string | undefined) => boolean;
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
type SelectedCountryData = Country | { name?: string, iso2?: string, dialCode?: string };
interface AllOptions {
  allowDropdown: boolean;
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
  loadUtilsOnInit: string|UtilsLoader;
  nationalMode: boolean;
  onlyCountries: string[];
  placeholderNumberType: NumberType;
  showFlags: boolean;
  separateDialCode: boolean;
  strictMode: boolean;
  useFullscreenPopup: boolean;
  /** @deprecated Please use the `loadUtilsOnInit` option. */
  utilsScript: string|UtilsLoader;
  validationNumberType: NumberType | null;
}

//* Export this as useful in react component too.
export type SomeOptions = Partial<AllOptions>;

//* These vars persist through all instances of the plugin.
let id = 0;
const defaults: AllOptions = {
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
  //* Specify the path to the libphonenumber script to enable validation/formatting.
  loadUtilsOnInit: "",
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
  useFullscreenPopup:
    typeof navigator !== "undefined" && typeof window !== "undefined"
      ? //* We cannot just test screen size as some smartphones/website meta tags will report desktop resolutions.
        //* Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
        /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth <= 500
      : false,
  //* Deprecated! Use `loadUtilsOnInit` instead.
  utilsScript: "",
  //* The number type to enforce during validation.
  validationNumberType: "MOBILE",
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
    const areaCode = numeric.substr(1, 3);
    return regionlessNanpNumbers.indexOf(areaCode) !== -1;
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
const createEl = (name: string, attrs: object | null, container?: HTMLElement): HTMLElement => {
  const el = document.createElement(name);
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
  private dialCodeToIso2Map: object;
  private dialCodes: object;
  private countryContainer: HTMLElement;
  private selectedCountry: HTMLElement;
  private selectedCountryInner: HTMLElement;
  private selectedCountryA11yText: HTMLElement;
  private selectedDialCode: HTMLElement;
  private dropdownArrow: HTMLElement;
  private dropdownContent: HTMLElement;
  private searchInput: HTMLInputElement;
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
  private _handleWindowScroll: () => void;
  private _handleMouseoverCountryList: (e: MouseEvent) => void;
  private _handleClickCountryList: (e: Event) => void;
  private _handleClickOffToClose: () => void;
  private _handleKeydownOnDropdown: (e: KeyboardEvent) => void;
  private _handleSearchChange: () => void;
  private _handlePageLoad: () => void;

  private resolveAutoCountryPromise: (value?: unknown) => void;
  private rejectAutoCountryPromise: (reason?: unknown) => void;
  private resolveUtilsScriptPromise: (value?: unknown) => void;
  private rejectUtilsScriptPromise: (reason?: unknown) => void;

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

    //* Check if input has one parent with RTL.
    this.isRTL = !!this.telInput.closest("[dir=rtl]");

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
    if (dialCode.length > this.dialCodeMaxLen) {
      this.dialCodeMaxLen = dialCode.length;
    }
    if (!this.dialCodeToIso2Map.hasOwnProperty(dialCode)) {
      this.dialCodeToIso2Map[dialCode] = [];
    }
    //* Bail if we already have this country for this dialCode.
    for (let i = 0; i < this.dialCodeToIso2Map[dialCode].length; i++) {
      if (this.dialCodeToIso2Map[dialCode][i] === iso2) {
        return;
      }
    }
    //* Check for undefined as 0 is falsy.
    const index =
      priority !== undefined ? priority : this.dialCodeToIso2Map[dialCode].length;
    this.dialCodeToIso2Map[dialCode][index] = iso2;
  }

  //* Process onlyCountries or excludeCountries array if present.
  private _processAllCountries(): void {
    const { onlyCountries, excludeCountries } = this.options;
    if (onlyCountries.length) {
      const lowerCaseOnlyCountries = onlyCountries.map((country) =>
        country.toLowerCase(),
      );
      this.countries = allCountries.filter(
        (country) => lowerCaseOnlyCountries.indexOf(country.iso2) > -1,
      );
    } else if (excludeCountries.length) {
      const lowerCaseExcludeCountries = excludeCountries.map(
        (country) => country.toLowerCase(),
      );
      this.countries = allCountries.filter(
        (country) => lowerCaseExcludeCountries.indexOf(country.iso2) === -1,
      );
    } else {
      this.countries = allCountries;
    }
  }

  //* Translate Countries by object literal provided on config.
  private _translateCountryNames(): void {
    for (let i = 0; i < this.countries.length; i++) {
      const iso2 = this.countries[i].iso2.toLowerCase();
      if (this.options.i18n.hasOwnProperty(iso2)) {
        this.countries[i].name = this.options.i18n[iso2];
      }
    }
  }

  //* Generate this.dialCodes and this.dialCodeToIso2Map.
  private _processDialCodes(): void {
    //* Here we store just dial codes, where the key is the dial code, and the value is true
    //* e.g. { 1: true, 7: true, 20: true, ... }.
    this.dialCodes = {};
    this.dialCodeMaxLen = 0;

    //* Here we map dialCodes (inc both dialCode and dialCode+areaCode) to iso2 codes e.g.
    /*
     * {
     *   1: [ 'us', 'ca', ... ],    # all NANP countries
     *   12: [ 'us', 'ca', ... ],   # subset of NANP countries
     *   120: [ 'us', 'ca' ],       # just US and Canada
     *   1204: [ 'ca' ],            # only Canada
     *   ...
     *  }
     */
    this.dialCodeToIso2Map = {};

    //* First: add dial codes.
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      if (!this.dialCodes[c.dialCode]) {
        this.dialCodes[c.dialCode] = true;
      }
      this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
    }

    //* Next: add area codes.
    //* This is a second loop over countries, to make sure we have all of the "root" countries
    //* already in the map, so that we can access them, as each time we add an area code substring
    //* to the map, we also need to include the "root" country's code, as that also matches.
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      //* Area codes
      if (c.areaCodes) {
        const rootIso2Code = this.dialCodeToIso2Map[c.dialCode][0];
        //* For each area code.
        for (let j = 0; j < c.areaCodes.length; j++) {
          const areaCode = c.areaCodes[j];
          //* For each digit in the area code to add all partial matches as well.
          for (let k = 1; k < areaCode.length; k++) {
            const partialDialCode = c.dialCode + areaCode.substr(0, k);
            //* Start with the root country, as that also matches this dial code.
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
    let parentClass = "iti";
    if (allowDropdown) {
      parentClass += " iti--allow-dropdown";
    }
    if (showFlags) {
      parentClass += " iti--show-flags";
    }
    if (containerClass) {
      parentClass += ` ${containerClass}`;
    }
    if (!useFullscreenPopup) {
      parentClass += " iti--inline-dropdown";
    }

    const wrapper = createEl("div", { class: parentClass });
    this.telInput.parentNode?.insertBefore(wrapper, this.telInput);

    //* If we need a countryContainer
    if (allowDropdown || showFlags || separateDialCode) {
      this.countryContainer = createEl(
        "div",
        { class: "iti__country-container" },
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
            "aria-label": this.options.i18n.selectedCountryAriaLabel,
            "aria-haspopup": "true",
            "aria-controls": `iti-${this.id}__dropdown-content`,
            "role": "combobox",
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
      const selectedCountryPrimary = createEl("div", { class: "iti__selected-country-primary" }, this.selectedCountry);

      //* This is where we will add the selected flag (or globe) class later
      this.selectedCountryInner = createEl("div", { class: "iti__flag" }, selectedCountryPrimary);
      this.selectedCountryA11yText = createEl(
        "span",
        { class: "iti__a11y-text" },
        this.selectedCountryInner,
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
          { class: "iti__selected-dial-code" },
          this.selectedCountry,
        );
      }

      if (allowDropdown) {
        const extraClasses = fixDropdownWidth ? "" : "iti--flexible-dropdown-width";
        this.dropdownContent = createEl("div", {
          id: `iti-${this.id}__dropdown-content`,
          class: `iti__dropdown-content iti__hide ${extraClasses}`,
        });
  
        if (countrySearch) {
          this.searchInput = createEl(
            "input",
            {
              type: "text",
              class: "iti__search-input",
              placeholder: i18n.searchPlaceholder,
              role: "combobox",
              "aria-expanded": "true",
              "aria-label": i18n.searchPlaceholder,
              "aria-controls": `iti-${this.id}__country-listbox`,
              "aria-autocomplete": "list",
              "autocomplete": "off",
            },
            this.dropdownContent,
          ) as HTMLInputElement;
          this.searchResultsA11yText = createEl(
            "span",
            { class: "iti__a11y-text" },
            this.dropdownContent,
          );
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
          this._updateSearchResultsText();
        }
  
        //* Create dropdownContainer markup.
        if (dropdownContainer) {
          let dropdownClasses = "iti iti--container";
          if (useFullscreenPopup) {
            dropdownClasses += " iti--fullscreen-popup";
          } else {
            dropdownClasses += " iti--inline-dropdown";
          }
          this.dropdown = createEl("div", { class: dropdownClasses });
          this.dropdown.appendChild(this.dropdownContent);
        } else {
          this.countryContainer.appendChild(this.dropdownContent);
        }
      }
    }

    wrapper.appendChild(this.telInput);
    this._updateInputPadding();

    if (hiddenInput) {
      const telInputName = this.telInput.getAttribute("name") || "";
      const names = hiddenInput(telInputName);

      if (names.phone) {
        //* Create hidden input for the full international number.
        this.hiddenInput = createEl("input", {
          type: "hidden",
          name: names.phone,
        }) as HTMLInputElement;
        wrapper.appendChild(this.hiddenInput);
      }

      if (names.country) {
        //* Create hidden input for the selected country iso2 code.
        this.hiddenInputCountry = createEl("input", {
          type: "hidden",
          name: names.country,
        }) as HTMLInputElement;
        wrapper.appendChild(this.hiddenInputCountry);
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
      content += `<span class='iti__dial-code'>+${c.dialCode}</span>`;

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
      //* Only intercept this event if we're opening the dropdown
      //* else let it bubble up to the top ("click-off-to-close" listener)
      //* we cannot just stopPropagation as it may be needed to close another instance.
      if (
        this.dropdownContent.classList.contains("iti__hide") &&
        !this.telInput.disabled &&
        !this.telInput.readOnly
      ) {
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
    let { loadUtilsOnInit, utilsScript, initialCountry, geoIpLookup } = this.options;

    if (!loadUtilsOnInit && utilsScript) {
      console.warn("intl-tel-input: The `utilsScript` option is deprecated and will be removed in a future release! Please use the `loadUtilsOnInit` option instead.");
      loadUtilsOnInit = utilsScript;
    }

    //* If the user has specified the path to the utils script, fetch it on window.load, else resolve.
    if (loadUtilsOnInit && !intlTelInput.utils) {
      this._handlePageLoad = () => {
        window.removeEventListener("load", this._handlePageLoad);
        //* Catch and ignore any errors to prevent unhandled-promise failures.
        //* The error from `loadUtils()` is also surfaced in each instance's
        //* `promise` property, so it's not getting lost by being ignored here.
        intlTelInput.loadUtils(loadUtilsOnInit)?.catch(() => {});
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
    this._filterCountries("", true);
  }

  //* Initialize the tel input listeners.
  private _initTelInputListeners(): void {
    const { strictMode, formatAsYouType, separateDialCode, formatOnDisplay, allowDropdown, countrySearch } = this.options;
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

      const disableFormatOnSetNumber = e?.detail && e.detail["isSetNumber"] && !formatOnDisplay;
      //* Handle format-as-you-type, unless userOverrideFormatting, or disableFormatOnSetNumber.
      if (formatAsYouType && !userOverrideFormatting && !disableFormatOnSetNumber) {
        //* Maintain caret position after reformatting.
        const currentCaretPos = this.telInput.selectionStart || 0;
        const valueBeforeCaret = this.telInput.value.substring(0, currentCaretPos);
        const relevantCharsBeforeCaret = valueBeforeCaret.replace(/[^+0-9]/g, "").length;
        const isDeleteForwards = e?.inputType === "deleteContentForward";
        const formattedValue = this._formatNumberAsYouType();
        const newCaretPos = translateCursorPosition(relevantCharsBeforeCaret, formattedValue, currentCaretPos, isDeleteForwards);
        this.telInput.value = formattedValue;
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

            let isChangingDialCode = false;
            if (alreadyHasPlus) {
              const currentCountry = this.selectedCountryData.iso2;
              const newCountry = this._getCountryFromNumber(newFullNumber);
              isChangingDialCode = newCountry !== currentCountry;
            }

            // ignore the char if (1) it's not an allowed char, or (2) this new char will exceed the max length and this char will not change the selected country and it's not the initial plus (aka they're starting to type a dial code)
            if (!isAllowedChar || (hasExceededMaxLength && !isChangingDialCode && !isInitialPlus)) {
              e.preventDefault();
            }
          }
        }
      };
      this.telInput.addEventListener("keydown", this._handleKeydownEvent);
    }
  }

  //* Adhere to the input's maxlength attr.
  private _cap(number: string): string {
    const max = parseInt(this.telInput.getAttribute("maxlength") || "", 10);
    return max && number.length > max ? number.substr(0, max) : number;
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
    let isOpening = true;
    this._handleClickOffToClose = (): void => {
      if (!isOpening) {
        this._closeDropdown();
      }
      isOpening = false;
    };
    document.documentElement.addEventListener(
      "click",
      this._handleClickOffToClose,
    );

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
        if (inputQuery) {
          this._filterCountries(inputQuery);
        } else {
          this._filterCountries("", true);
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
  
      //* Stop propagation on search input click, so doesn't trigger click-off-to-close listener.
      this.searchInput.addEventListener("click", (e) => e.stopPropagation());
    }
  }

  //* Hidden search (countrySearch disabled): Find the first list item whose name starts with the query string.
  private _searchForCountry(query: string): void {
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      const startsWith = c.name.substr(0, query.length).toLowerCase() === query;
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
  private _filterCountries(query: string, isReset: boolean = false): void {
    let noCountriesAddedYet = true;
    this.countryList.innerHTML = "";
    const normalisedQuery = normaliseString(query);
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      const normalisedCountryName = normaliseString(c.name);
      //* Initials: split on non-alpha chars (ignore ampersand, hyphen, dot etc) and take the first letter of each part.
      const countryInitials = c.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map(word => word[0]).join("").toLowerCase();
      const fullDialCode = `+${c.dialCode}`;
      if (
        isReset ||
        normalisedCountryName.includes(normalisedQuery) ||
        fullDialCode.includes(normalisedQuery) ||
        c.iso2.includes(normalisedQuery) ||
        countryInitials.includes(normalisedQuery)
      ) {
        const listItem = c.nodeById[this.id];
        if (listItem) {
          this.countryList.appendChild(listItem);
        }
        //* Highlight the first item.
        if (noCountriesAddedYet) {
          this._highlightListItem(listItem, false);
          noCountriesAddedYet = false;
        }
      }
    }
    //* If no countries are shown, unhighlight the previously highlighted item.
    if (noCountriesAddedYet) {
      this._highlightListItem(null, false);
    }
    //* Scroll to top (useful if user had previously scrolled down).
    this.countryList.scrollTop = 0;
    this._updateSearchResultsText();
  }

  //* Update search results text (for a11y).
  private _updateSearchResultsText(): void {
    const { i18n } = this.options;
    const count = this.countryList.childElementCount;
    let searchText;
    if (count === 0) {
      searchText = i18n.zeroSearchResults;
    } else if (count === 1) {
      searchText = i18n.oneSearchResult;
    } else {
      // eslint-disable-next-line no-template-curly-in-string
      searchText = i18n.multipleSearchResults.replace("${count}", count.toString());
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
    const iso2 = this._getCountryFromNumber(fullNumber);
    if (iso2 !== null) {
      return this._setCountry(iso2);
    }
    return false;
  }

  private _getCountryFromNumber(fullNumber: string): string | null {
    const plusIndex = fullNumber.indexOf("+");
    //* If it contains a plus, discard any chars before it e.g. accidental space char.
    //* This keeps the selected country auto-updating correctly, which we want as
    //* libphonenumber's validation/getNumber methods will ignore these chars anyway.
    let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;

    //* If we already have US/Canada selected, make sure the number starts
    //* with a +1 so _getDialCode will be able to extract the area code
    //* update: if we don't yet have selectedCountryData, but we're here (trying to update the country
    //* from the number), that means we're initialising the plugin with a number that already has a
    //* dial code, so fine to ignore this bit
    const selectedDialCode = this.selectedCountryData.dialCode;
    const isNanp = selectedDialCode === "1";
    if (number && isNanp && number.charAt(0) !== "+") {
      if (number.charAt(0) !== "1") {
        number = `1${number}`;
      }
      number = `+${number}`;
    }

    //* If separateDialCode enabled, then consider the selected dial code to be part of the number.
    if (
      this.options.separateDialCode &&
      selectedDialCode &&
      number.charAt(0) !== "+"
    ) {
      number = `+${selectedDialCode}${number}`;
    }

    //* Try and extract valid dial code from input.
    const dialCode = this._getDialCode(number, true);
    const numeric = getNumeric(number);
    if (dialCode) {
      const iso2Codes = this.dialCodeToIso2Map[getNumeric(dialCode)];
      //* Check if the right country is already selected. this should be false if the number is
      //* longer than the matched dial code because in this case we need to make sure that if
      //* there are multiple country matches, that the first one is selected (note: we could
      //* just check that here, but it requires the same loop that we already have later).
      const alreadySelected =
        iso2Codes.indexOf(this.selectedCountryData.iso2) !== -1 &&
        numeric.length <= dialCode.length - 1;
      const isRegionlessNanpNumber =
        selectedDialCode === "1" && isRegionlessNanp(numeric);

      //* Only update the country if:
      //* A) NOT (we currently have a NANP country selected, and the number is a regionlessNanp)
      //* AND
      //* B) the right country is not already selected
      if (!isRegionlessNanpNumber && !alreadySelected) {
        //* If using onlyCountries option, iso2Codes[0] may be empty, so we must find the first non-empty index.
        for (let j = 0; j < iso2Codes.length; j++) {
          if (iso2Codes[j]) {
            return iso2Codes[j];
          }
        }
      }
    } else if (number.charAt(0) === "+" && numeric.length) {
      //* Invalid dial code, so empty.
      //* Note: use getNumeric here because the number has not been formatted yet, so could contain bad chars.
      return "";
    } else if ((!number || number === "+") && !this.selectedCountryData.iso2) {
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
      const activeDescendant = this.highlightedItem.getAttribute("id") || "";
      this.selectedCountry.setAttribute("aria-activedescendant", activeDescendant);
      if (this.options.countrySearch) {
        this.searchInput.setAttribute("aria-activedescendant", activeDescendant);
      }
    }

    if (shouldFocus) {
      this.highlightedItem.focus();
    }
  }

  //* Find the country data for the given iso2 code
  //* the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
  private _getCountryData(iso2: string, allowFail: boolean): Country | null {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].iso2 === iso2) {
        return this.countries[i];
      }
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

    const prevCountry = this.selectedCountryData.iso2
      ? this.selectedCountryData
      : {};

    //* Do this first as it will throw an error and stop if iso2 is invalid.
    this.selectedCountryData = iso2
      ? this._getCountryData(iso2, false) || {}
      : {};
    //* Update the defaultCountry - we only need the iso2 from now on, so just store that.
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    //* Update the flag class and the a11y text.
    if (this.selectedCountryInner) {
      let flagClass = "";
      let a11yText = "";
      if (iso2 && showFlags) {
        flagClass = `iti__flag iti__${iso2}`;
        a11yText = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`;
      } else {
        flagClass = "iti__flag iti__globe";
        a11yText = i18n.noCountrySelected;
      }
      this.selectedCountryInner.className = flagClass;
      this.selectedCountryA11yText.textContent = a11yText;
    }

    this._setSelectedCountryTitleAttribute(iso2, separateDialCode);

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
    return prevCountry.iso2 !== iso2;
  }

  //* Update the input padding to make space for the selected country/dial code.
  private _updateInputPadding(): void {
    if (this.selectedCountry) {
      //* offsetWidth is zero if input is in a hidden container during initialisation.
      const selectedCountryWidth = this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth();
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
    const { strictMode, placeholderNumberType, validationNumberType } = this.options;
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
        while (intlTelInput.utils.isPossibleNumber(exampleNumber, iso2, validationNumberType)) {
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

  private _setSelectedCountryTitleAttribute(iso2: string | null = null, separateDialCode: boolean): void {
    if (!this.selectedCountry) {
      return;
    }

    let title;
    if (iso2 && !separateDialCode) {
      title = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}`;
    } else if (iso2) {
      //* For screen reader output, we don't want to include the dial code in the reader output twice
      //* so just use the selected country name here:
      title = this.selectedCountryData.name;
    } else {
      title = "Unknown";
    }

    this.selectedCountry.setAttribute("title", title);
  }

  //* When the input is in a hidden container during initialisation, we must inject some markup
  //* into the end of the DOM to calculate the correct offsetWidth.
  //* NOTE: this is only used when separateDialCode is enabled, so countryContainer and selectedCountry
  //* will definitely exist.
  private _getHiddenSelectedCountryWidth(): number {
    //* To get the right styling to apply, all we need is a shallow clone of the container,
    //* and then to inject a deep clone of the selectedCountry element.
    if (this.telInput.parentNode) {
      const containerClone = this.telInput.parentNode.cloneNode(false) as HTMLElement;
      containerClone.style.visibility = "hidden";
      document.body.appendChild(containerClone);

      const countryContainerClone = this.countryContainer.cloneNode() as HTMLElement;
      containerClone.appendChild(countryContainerClone);

      const selectedCountryClone = this.selectedCountry.cloneNode(true) as HTMLElement;
      countryContainerClone.appendChild(selectedCountryClone);

      const width = selectedCountryClone.offsetWidth;
      document.body.removeChild(containerClone);
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
    this.selectedCountry.removeAttribute("aria-activedescendant");
    if (this.highlightedItem) {
      this.highlightedItem.setAttribute("aria-selected", "false");
    }
    if (this.options.countrySearch) {
      this.searchInput.removeAttribute("aria-activedescendant");
    }

    //* Update the arrow.
    this.dropdownArrow.classList.remove("iti__arrow--up");

    //* Unbind key events.
    document.removeEventListener("keydown", this._handleKeydownOnDropdown);
    if (this.options.countrySearch) {
      this.searchInput.removeEventListener("input", this._handleSearchChange);
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
              dialCode = number.substr(0, i + 1);
            }
          } else {
            if (this.dialCodes[numericChars]) {
              dialCode = number.substr(0, i + 1);
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
        number = number.substr(start);
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

  //* Validate the input val
  isValidNumber(): boolean | null {
    //* If there isn't a valid country selected, then it's not a valid number.
    if (!this.selectedCountryData.iso2) {
      return false;
    }
    const val = this._getFullNumber();
    const alphaCharPosition = val.search(/\p{L}/u);
    if (alphaCharPosition > -1) {
      const beforeAlphaChar = val.substring(0, alphaCharPosition);
      //* Workaround to allow some alpha chars e.g. "+1 (444) 444-4444 ext. 1234" while rejecting others e.g. "+1 (444) 444-FAST". The only legit use of alpha chars is as an extension separator, in which case, the number before it must be valid on its own.
      const beforeAlphaIsValid = this._utilsIsPossibleNumber(beforeAlphaChar);
      const isValid = this._utilsIsPossibleNumber(val);
      return beforeAlphaIsValid && isValid;
    }
    return this._utilsIsPossibleNumber(val);
  }

  private _utilsIsPossibleNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isPossibleNumber(val, this.selectedCountryData.iso2, this.options.validationNumberType)
      : null;
  }

  //* Validate the input val (precise)
  isValidNumberPrecise(): boolean | null {
    //* If there isn't a valid country selected, then it's not a valid number.
    if (!this.selectedCountryData.iso2) {
      return false;
    }
    const val = this._getFullNumber();
    const alphaCharPosition = val.search(/\p{L}/u);
    if (alphaCharPosition > -1) {
      const beforeAlphaChar = val.substring(0, alphaCharPosition);
      //* Workaround to allow some alpha chars e.g. "+1 (444) 444-4444 ext. 1234" while rejecting others e.g. "+1 (444) 444-FAST". The only legit use of alpha chars is as an extension separator, in which case, the number before it must be valid on its own.
      const beforeAlphaIsValid = this._utilsIsValidNumber(beforeAlphaChar);
      const isValid = this._utilsIsValidNumber(val);
      return beforeAlphaIsValid && isValid;
    }
    return this._utilsIsValidNumber(val);
  }

  private _utilsIsValidNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2)
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
const loadUtils = (source: string|UtilsLoader): Promise<unknown> | null => {
  //* 2 Options:
  //* 1) Not already started loading (start)
  //* 2) Already started loading (do nothing - just wait for the onload callback to fire, which will
  //* trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
  if (
    !intlTelInput.utils &&
    !intlTelInput.startedLoadingUtilsScript
  ) {
    let loadCall;
    if (typeof source === "string") {
      loadCall = import(/* webpackIgnore: true */ /* @vite-ignore */ source);
    } else if (typeof source === "function") {
      try {
        loadCall = source();
        if (!(loadCall instanceof Promise)) {
          throw new TypeError(`The function passed to loadUtils must return a promise for the utilities module, not ${typeof loadCall}`);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(new TypeError(`The argument passed to loadUtils must be a URL string or a function that returns a promise for the utilities module, not ${typeof source}`));
    }

    //* Only do this once.
    intlTelInput.startedLoadingUtilsScript = true;

    return loadCall
      .then((module) => {
        const utils = module?.default;
        if (!utils || typeof utils !== "object") {
          if (typeof source === "string") {
            throw new TypeError(`The module loaded from ${source} did not set utils as its default export.`);
          } else {
            throw new TypeError("The loader function passed to loadUtils did not resolve to a module object with utils as its default export.");
          }
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
    loadUtils,
    startedLoadingUtilsScript: false,
    startedLoadingAutoCountry: false,
    version: process.env.VERSION,
  });

export default intlTelInput;
