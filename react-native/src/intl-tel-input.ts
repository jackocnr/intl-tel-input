import allCountries, { Country } from "./intl-tel-input/data";
import { I18n } from "./intl-tel-input/i18n/types";
import defaultEnglishStrings from "./intl-tel-input/i18n/en";

//* Populate the country names in the default language - useful if you want to use static getCountryData to populate another country dropdown etc.
for (let i = 0; i < allCountries.length; i++) {
  allCountries[i].name = defaultEnglishStrings[allCountries[i].iso2];
}

type UtilsLoader = () => Promise<{default: ItiUtils}>;

interface IntlTelInputInterface {
  (inputRef: any, options?: SomeOptions): Iti;
  autoCountry?: string;
  defaults: AllOptions;
  documentReady: () => boolean;
  getCountryData: () => Country[];
  getInstance: (id: number) => Iti | null;
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
  autoPlaceholder: string;
  containerClass: string;
  countryOrder: string[] | null;
  countrySearch: boolean;
  customPlaceholder: ((selectedCountryPlaceholder: string, selectedCountryData: object) => string) | null;
  // dropdownContainer: not applicable in React Native;
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
//* Track all instances for React Native (similar to main version)
const instances: { [key: string]: Iti } = {};
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
  useFullscreenPopup: false, // React Native will handle this differently
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
    const areaCode = numeric.substr(1, 3);
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
    //* Special case: delete forwards (fn + delete on a mac):
    //* Wait until hit one extra relevant char, and put the cursor just before it (after any formatting chars).
    if (isDeleteForwards && count === relevantChars + 1) {
      return i;
    }
  }
  return formattedValue.length;
};

//* Run a method on each instance of the plugin (similar to main version).
const forEachInstance = (method: string, ...args: any[]): void => {
  Object.values(instances).forEach((instance) => instance[method](...args));
};

//* This is our plugin class that we will create an instance of
// eslint-disable-next-line no-unused-vars
export class Iti {
  //* Public properties
  id: number;
  promise: Promise<[unknown, unknown]>;

  //* Private properties
  private textInput: any; // React Native TextInput ref
  private options: AllOptions;
  private selectedCountryData: SelectedCountryData;
  private countries: Country[];
  private dialCodeMaxLen: number;
  private dialCodeToIso2Map: { [key: string]: string[] };
  private dialCodes: { [key: string]: boolean };
  private maxCoreNumberLength: number | null;
  private defaultCountry: string;
  private hadInitialPlaceholder: boolean;
  private eventCallbacks: { [key: string]: (detailProps?: object) => void };

  private resolveAutoCountryPromise: (value?: unknown) => void;
  private rejectAutoCountryPromise: (reason?: unknown) => void;
  private resolveUtilsScriptPromise: (value?: unknown) => void;
  private rejectUtilsScriptPromise: (reason?: unknown) => void;

  constructor(textInput: any, customOptions: SomeOptions = {}) {
    this.id = id++;
    this.textInput = textInput;

    //* Process specified options / defaults.
    this.options = Object.assign({}, defaults, customOptions);

    //* For React Native, determine initial placeholder from textInput props if available
    this.hadInitialPlaceholder = textInput?.props?.placeholder ? Boolean(textInput.props.placeholder) : false;

    //* Initialize event callbacks for React Native component
    this.eventCallbacks = {};

    //* Initialize the instance
    this._init();

    //* Track this instance
    instances[this.id] = this;
  }

  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init(): void {
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
    this.dialCodeToIso2Map = {};
    this.dialCodes = {};
    this.maxCoreNumberLength = null;
    this.defaultCountry = "";

    //* Process all the data: onlyCountries, excludeCountries, countryOrder etc.
    this._processCountryData();

    //* Set the initial state of the selected country.
    this._setInitialState();

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
    for (let i = 0; i < this.countries.length; i++) {
      const iso2 = this.countries[i].iso2.toLowerCase();
      if (this.options.i18n.hasOwnProperty(iso2)) {
        this.countries[i].name = this.options.i18n[iso2];
      }
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
    //* Update dialCodeMaxLen.
    if (dialCode.length > this.dialCodeMaxLen) {
      this.dialCodeMaxLen = dialCode.length;
    }
    //* If this entry doesn't already exist, then create it.
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

  //* Generate this.dialCodes and this.dialCodeToIso2Map.
  private _processDialCodes(): void {
    //* Here we store just dial codes, where the key is the dial code, and the value is true
    //* e.g. { 1: true, 7: true, 20: true, ... }.
    this.dialCodes = {};
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

  //* Init many requests: utils script / geo ip lookup.
  private _initRequests(): void {
    // eslint-disable-next-line prefer-const
    let { loadUtils, initialCountry, geoIpLookup } = this.options;

    //* If the user has specified the path to the utils script, fetch it on window.load, else resolve.
    if (loadUtils && !intlTelInput.utils) {
      //* For React Native, we can load utils immediately since there's no window.load event
      //* attachUtils will call handleUtils on all instances when utils are loaded
      intlTelInput.attachUtils(loadUtils)?.catch(() => {
        forEachInstance("rejectUtilsScriptPromise");
      });
    } else {
      //* If utils are already available (e.g., in WithUtils version), call handleUtils
      if (intlTelInput.utils) {
        this.handleUtils();
      } else {
        this.resolveUtilsScriptPromise();
      }
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

  //* Get country data by iso2 code.
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

  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  private _setInitialState(overrideAutoCountry: boolean = false): void {
    const { initialCountry, geoIpLookup } = this.options;
    const isAutoCountry = initialCountry === "auto" && geoIpLookup;

    if (!isAutoCountry || overrideAutoCountry) {
      const lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
      const isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
      //* See if we should select a country.
      if (isValidInitialCountry) {
        this._setCountry(lowerInitialCountry);
      } else {
        //* If no initial country specified but countryOrder is provided, use the first country from the order
        if (this.options.countryOrder && this.options.countryOrder.length > 0) {
          const firstCountryInOrder = this.options.countryOrder[0].toLowerCase();
          const isValidFirstCountry = this._getCountryData(firstCountryInOrder, true);
          if (isValidFirstCountry) {
            this._setCountry(firstCountryInOrder);
          } else {
            //* Display the empty state (globe icon).
            this._setCountry();
          }
        } else {
          //* Display the empty state (globe icon).
          this._setCountry();
        }
      }
    }
  }

  //* Update the selected country, and update the input val accordingly.
  private _setCountry(iso2?: string): boolean {
    const prevCountry = this.selectedCountryData;
    const { showFlags, separateDialCode } = this.options;

    //* Do this first as it will throw an error and stop if iso2 is invalid.
    this.selectedCountryData = iso2
      ? this._getCountryData(iso2, false) || {}
      : {};
    //* Update the defaultCountry - we only need the iso2 from now on, so just store that.
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    //* Update the placeholder (same as main version)
    this._updatePlaceholder();

    //* Return if the country has changed or not.
    return prevCountry.iso2 !== iso2;
  }

  //* This is called when the geoip call returns.
  handleAutoCountry(): void {
    if (this.options.initialCountry === "auto" && intlTelInput.autoCountry) {
      //* We must set this even if there is an initial val in the input: in case the initial val is
      //* invalid and they delete it - they should see their auto country.
      this.defaultCountry = intlTelInput.autoCountry;
      const hasSelectedCountryOrGlobe = this.selectedCountryData.iso2;
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
      //* Update placeholder now that utils are available (same as main version)
      if (this.selectedCountryData.iso2) {
        this._updatePlaceholder();
      }
      this.resolveUtilsScriptPromise();
    } else {
      this.rejectUtilsScriptPromise();
    }
  }

  //* Get the current placeholder and trigger update (for React Native component).
  updateAndGetPlaceholder(): string {
    return this._updatePlaceholder();
  }

  //********************
  //*  PUBLIC METHODS
  //********************

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

  //* Get the processed countries list (after filtering and sorting).
  getCountries(): Country[] {
    return this.countries;
  }

  //* Get the current options.
  getOptions(): AllOptions {
    return this.options;
  }

  //* Get the current placeholder (using the same logic as the main implementation).
  getPlaceholder(): string {
    return this._updatePlaceholder();
  }

  //* Set whether the input had an initial placeholder (for React Native component).
  setHadInitialPlaceholder(hadPlaceholder: boolean): void {
    this.hadInitialPlaceholder = hadPlaceholder;
  }

  //* Set the placeholder number type
  setPlaceholderNumberType(type: NumberType): void {
    this.options.placeholderNumberType = type;
    this._updatePlaceholder();
  }

  //* Set the maximum core number length (for React Native component maxLength support)
  setMaxLength(maxLength: number | null): void {
    this.maxCoreNumberLength = maxLength;
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
    return intlTelInput.utils
      ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes)
      : null;
  }

  //* Validate the input val (precise)
  isValidNumberPrecise(): boolean | null {
    //* If there isn't a valid country selected, then it's not a valid number.
    if (!this.selectedCountryData.iso2) {
      return false;
    }
    const val = this._getFullNumber();
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
      this._updateDialCode(this.selectedCountryData.dialCode || "");
      this._triggerCountryChange();
    }
  }

  //* Current input value - to be set by React Native component
  private currentInputValue: string = "";

  //* Set the current input value (called by React Native component)
  setInputValue(value: string): void {
    this.currentInputValue = value;
  }

  //* Set the input value and update the country (like main implementation)
  setNumber(number: string): void {
    //* We must update the country first, which updates this.selectedCountryData, which is used for
    //* formatting the number before displaying it.
    const countryChanged = this._updateCountryFromNumber(number);
    this._updateValFromNumber(number);
    if (countryChanged) {
      this._triggerCountryChange();
    }
    //* This is required for the React Native component to update its state correctly.
    this._trigger("input", { isSetNumber: true });
  }

  //* Set event callbacks for React Native component
  setEventCallbacks(callbacks: { [key: string]: (detailProps?: object) => void }): void {
    this.eventCallbacks = callbacks;
  }

  //* Get the current input value (for React Native component)
  getCurrentInputValue(): string {
    return this.currentInputValue;
  }

  //* Format number as you type (exposed for React Native component)
  formatNumberAsYouType(): string {
    return this._formatNumberAsYouType();
  }

  //* Update country from number (exposed for React Native component)
  updateCountryFromNumber(fullNumber: string): boolean {
    return this._updateCountryFromNumber(fullNumber);
  }

  //* Set the disabled state (for React Native component)
  setDisabled(disabled: boolean): void {
    //* For React Native, we can use setNativeProps for performance if textInput is available
    if (this.textInput?.current?.setNativeProps) {
      this.textInput.current.setNativeProps({ editable: !disabled });
    }
    //* Also trigger an event that the React Native component can listen to
    this._trigger("disabledchange", { disabled });
  }

  //* Get the TextInput ref (React Native specific)
  getTextInput(): any {
    return this.textInput;
  }

  //* Set placeholder using setNativeProps for performance (React Native specific)
  setPlaceholderNative(placeholder: string): void {
    if (this.textInput?.current?.setNativeProps) {
      this.textInput.current.setNativeProps({ placeholder });
    }
  }

  //* Destroy the instance (cleanup)
  destroy(): void {
    //* For React Native, we don't have DOM elements to clean up
    //* Just reset the instance state
    this.currentInputValue = "";
    this.selectedCountryData = {};

    //* Remove from instances tracking
    delete instances[this.id];
  }

  //* Helper method to get full number
  private _getFullNumber(overrideVal?: string): string {
    const val = overrideVal || this.currentInputValue.trim();
    const { dialCode } = this.selectedCountryData;
    let prefix: string | undefined;
    let numericVal = getNumeric(val);

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

  //* Remove the dial code if separateDialCode is enabled also cap the length if maxLength is set
  private _beforeSetNumber(fullNumber: string): string {
    let number = fullNumber;
    if (this.options.separateDialCode) {
      let dialCode = this._getDialCode(number);
      //* If there is a valid dial code
      if (dialCode) {
        //* In case _getDialCode returned an area code as well
        dialCode = `+${this.selectedCountryData.dialCode}`;
        //* A lot of numbers will have a space separating the dial code and the main number, and
        //* some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get rid of it.
        //* NOTE: Don't just trim all non-numerics as may want to preserve an open parenthesis etc.
        const start = number[dialCode.length] === " " || number[dialCode.length] === "-"
          ? dialCode.length + 1
          : dialCode.length;
        number = number.substring(start);
      }
    }
    return this._cap(number);
  }

  //* Adhere to maxLength constraint (for React Native component compatibility)
  private _cap(number: string): string {
    //* For React Native, we need to get maxLength from the component
    //* This will be set by the React Native component if needed
    const max = this.maxCoreNumberLength;
    return max && number.length > max ? number.substring(0, max) : number;
  }

  //* Extract dial code from number
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
            if (this.dialCodes[numericChars]) {
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

  //* Ensure the number starts with the dial code (ported from main implementation)
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

  //* Get country from number (updated to match main implementation logic)
  private _getCountryFromNumber(fullNumber: string): string | null {
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
      const dialCodeMatchNumeric = getNumeric(dialCodeMatch);
      const iso2Codes = this.dialCodeToIso2Map[dialCodeMatchNumeric];

      //* If they've just typed a dial code (from empty state), and it matches the last selected country, then stick to that country.
      //* e.g. if they select Aland Islands, then type it's dial code +358, we should stick to that country and not switch to Finland!
      if (!selectedIso2 && this.defaultCountry && iso2Codes.includes(this.defaultCountry)) {
        return this.defaultCountry;
      }

      //* Check if the right country is already selected (note: might be empty state - globe icon).
      //* NOTE: the number of digits typed can only be the same as or more than the matched dial code (plus area code) digits
      //* If they're the same length, that's a perfect match. Otherwise, they've typed more digits than the best match, in which case, if this country supports area codes, we should default to the first country that fits the matched dial code.
      const alreadySelected = selectedIso2 && iso2Codes.includes(selectedIso2) && (numeric.length === dialCodeMatchNumeric.length || !this.selectedCountryData.areaCodes);

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

  //* Update country from number
  private _updateCountryFromNumber(fullNumber: string): boolean {
    const iso2 = this._getCountryFromNumber(fullNumber);
    if (iso2 !== null) {
      return this._setCountry(iso2);
    }
    return false;
  }

  //* Format number as you type
  private _formatNumberAsYouType(): string {
    const val = this._getFullNumber();
    const result = intlTelInput.utils
      ? intlTelInput.utils.formatNumberAsYouType(val, this.selectedCountryData.iso2)
      : val;
    return this._beforeSetNumber(result);
  }

  //* Update the input placeholder to an example number from the currently selected country.
  private _updatePlaceholder(): string {
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
      return placeholder;
    }
    return "";
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
    //* For React Native, we update the currentInputValue instead of DOM
    this.currentInputValue = number;
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
      } else {
        this.maxCoreNumberLength = null;
      }
    }
  }

  //* Check if number is possible using utils
  private _utilsIsPossibleNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isPossibleNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes)
      : null;
  }

  //* Check if number is valid using utils
  private _utilsIsValidNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes)
      : null;
  }

  //* Trigger a custom event (React Native compatible)
  private _trigger(name: string, detailProps: object = {}): void {
    //* For React Native, we can't dispatch DOM events
    //* Instead, we'll store the event data for the component to access
    //* The React Native component should implement event handling
    if (this.eventCallbacks && this.eventCallbacks[name]) {
      this.eventCallbacks[name](detailProps);
    }
  }

  //* Trigger the 'countrychange' event.
  private _triggerCountryChange(): void {
    this._trigger("countrychange");
  }

  //* Replace any existing dial code with the new one (adapted for React Native)
  private _updateDialCode(newDialCodeBare: string): void {
    const inputVal = this.currentInputValue;
    //* Save having to pass this every time.
    const newDialCode = `+${newDialCodeBare}`;
    let newNumber: string;

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
      this.currentInputValue = this._cap(newNumber);
    }
  }

  //* Search for countries by name (React Native compatible)
  private _searchForCountry(query: string): Country[] {
    const results: Country[] = [];
    const normalisedQuery = normaliseString(query);

    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      const normalisedCountryName = normaliseString(c.name);
      const startsWith = normalisedCountryName.substring(0, query.length).toLowerCase() === query.toLowerCase();
      if (startsWith) {
        results.push(c);
      }
    }
    return results;
  }

  //* Filter countries according to the search query (React Native compatible)
  private _filterCountries(query: string, isReset: boolean = false): Country[] {
    if (isReset || !query.trim()) {
      return this.countries;
    }

    const results: Country[] = [];
    const normalisedQuery = normaliseString(query);

    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      const normalisedCountryName = normaliseString(c.name);
      //* Initials: split on non-alpha chars and take the first letter of each part.
      const countryInitials = c.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map(word => word[0]).join("").toLowerCase();
      const fullDialCode = `+${c.dialCode}`;

      if (
        normalisedCountryName.includes(normalisedQuery) ||
        fullDialCode.includes(normalisedQuery) ||
        c.iso2.includes(normalisedQuery) ||
        countryInitials.includes(normalisedQuery)
      ) {
        results.push(c);
      }
    }
    return results;
  }

  //* Update search results text (for accessibility - React Native compatible)
  private _updateSearchResultsText(count: number): string {
    const { i18n } = this.options;
    let searchText: string;

    if (count === 0) {
      searchText = i18n.zeroSearchResults || "No search results";
    } else if (count === 1) {
      searchText = i18n.oneSearchResult || "1 search result";
    } else {
      searchText = (i18n.multipleSearchResults || "${count} search results").replace("${count}", count.toString());
    }
    return searchText;
  }

  //* Public method to search countries (for React Native component)
  searchCountries(query: string): Country[] {
    return this._filterCountries(query);
  }
}

//* Load the utils script.
const attachUtils = async (
  source: UtilsLoader,
): Promise<unknown> => {
  if (!source || typeof source !== "function") {
    return Promise.reject(new TypeError("The loader function passed to attachUtils must be a function."));
  }

  let loadCall: Promise<{default: ItiUtils}>;
  try {
    loadCall = Promise.resolve(source());
  } catch (error) {
    return Promise.reject(error);
  }

  try {
    const module = await loadCall;
    const utils = module?.default;
    if (!utils || typeof utils !== "object") {
      throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");
    }

    //* Set the utils object on the global intlTelInput object.
    intlTelInput.utils = utils;

    //* Call handleUtils on all instances (same as main version)
    forEachInstance("handleUtils");
    return utils;
  } catch (error: unknown) {
    forEachInstance("rejectUtilsScriptPromise", error);
    throw error;
  }
};

//* Convenience wrapper - supports both function and object patterns like main implementation.
const intlTelInput: IntlTelInputInterface = Object.assign(
  (inputRef: any, options?: SomeOptions): Iti => {
    //* For React Native, inputRef is a TextInput ref (can be null)
    //* Create the Iti instance with the textInput ref, similar to main implementation
    const iti = new Iti(inputRef, options);
    iti._init();
    //* Track this instance like the main implementation
    instances[iti.id] = iti;
    return iti;
  },
  {
    defaults,
    //* Using a static var like this allows us to mock it in the tests.
    documentReady: (): boolean => true,
    //* Get the country data object.
    getCountryData: (): Country[] => allCountries,
    //* A getter for the plugin instance.
    getInstance: (id: number): Iti | null => {
      return instances[id] || null;
    },
    //* A map from instance ID to instance object.
    instances,
    attachUtils,
    startedLoadingUtilsScript: false,
    startedLoadingAutoCountry: false,
    version: process.env.VERSION,
  });

export default intlTelInput;