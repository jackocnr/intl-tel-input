import allCountries, { Country, Iso2 } from "./intl-tel-input/data";
import defaultEnglishStrings from "./intl-tel-input/i18n/en";
import { defaults, applyOptionSideEffects } from "./modules/core/options";
import type {
  UtilsLoader,
  NumberType,
  AllOptions,
  SomeOptions,
  IntlTelInputInterface,
  SelectedCountryData,
} from "./modules/types/public-api";
import { getNumeric } from "./modules/utils/string";
import {
  getMatchedCountries,
  findFirstCountryStartingWith,
} from "./modules/core/countrySearch";
import UI from "./modules/core/ui";
import {
  processAllCountries,
  processDialCodes,
  translateCountryNames,
  sortCountries,
  cacheSearchTokens,
} from "./modules/data/country-data";
import {
  beforeSetNumber,
  formatNumberAsYouType,
} from "./modules/format/formatting";
import { translateCursorPosition } from "./modules/format/caret";
import { isRegionlessNanp } from "./modules/data/nanp-regionless";
import type { ItiEventMap } from "./modules/types/events";
import {
  EVENTS,
  CLASSES,
  SENTINELS,
  KEYS,
  REGEX,
  TIMINGS,
  INITIAL_COUNTRY,
  DATA_KEYS,
  ARIA,
  UK,
  INPUT_TYPES,
  DIAL,
  US,
  PLACEHOLDER_MODES,
} from "./modules/constants";

//* Populate the country names in the default language - useful if you want to use static getCountryData to populate another country dropdown etc.
for (const c of allCountries) {
  c.name = defaultEnglishStrings[c.iso2];
}

declare global {
  interface HTMLInputElement {
    iti?: Iti;
  }
}

//* These vars persist through all instances of the plugin.
let id = 0;

// build a Set for iso2 runtime validation (lightweight)
const iso2Set: Set<Iso2> = new Set(allCountries.map((c) => c.iso2));
const isIso2 = (val: string): val is Iso2 => iso2Set.has(val as Iso2);

//* This is our plugin class that we will create an instance of
// eslint-disable-next-line no-unused-vars
export class Iti {
  //* PUBLIC FIELDS - READONLY
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  readonly id: number;
  // accessed externally via iti.promise.then(...)
  readonly promise: Promise<[unknown, unknown]>;

  //* PRIVATE FIELDS - READONLY
  private readonly ui: UI;
  private readonly options: AllOptions;
  private readonly isAndroid: boolean;
  // country data
  private readonly countries: Country[];
  private readonly dialCodeMaxLen: number;
  private readonly dialCodeToIso2Map: Record<string, Iso2[]>;
  private readonly dialCodes: Set<string>;
  private readonly countryByIso2: Map<Iso2, Country>;

  //* PRIVATE FIELDS - NOT READONLY
  private selectedCountryData: SelectedCountryData;
  private maxCoreNumberLength: number | null;
  private defaultCountry: Iso2;
  private abortController: AbortController;
  private dropdownAbortController: AbortController | null;
  private userNumeralSet: "ascii" | "arabic-indic" | "persian";

  private resolveAutoCountryPromise: (value?: unknown) => void;
  private rejectAutoCountryPromise: (reason?: unknown) => void;
  private resolveUtilsScriptPromise: (value?: unknown) => void;
  private rejectUtilsScriptPromise: (reason?: unknown) => void;

  constructor(input: HTMLInputElement, customOptions: SomeOptions = {}) {
    this.id = id++;

    //* Process specified options / defaults.
    this.options = { ...defaults, ...customOptions } as AllOptions;
    applyOptionSideEffects(this.options, defaultEnglishStrings);

    this.ui = new UI(input, this.options, this.id);
    this.isAndroid = Iti._getIsAndroid();
    this.promise = this._createInitPromises();

    //* Process onlyCountries or excludeCountries array if present.
    this.countries = processAllCountries(this.options);

    //* Generate this.dialCodes and this.dialCodeToIso2Map.
    const { dialCodes, dialCodeMaxLen, dialCodeToIso2Map } = processDialCodes(
      this.countries,
    );
    this.dialCodes = dialCodes;
    this.dialCodeMaxLen = dialCodeMaxLen;
    this.dialCodeToIso2Map = dialCodeToIso2Map;

    //* Build fast iso2 -> country map for O(1) lookups (used by _getCountryData).
    this.countryByIso2 = new Map(this.countries.map((c) => [c.iso2, c]));

    this._init();
  }

  private static _getIsAndroid(): boolean {
    return typeof navigator !== "undefined"
      ? /Android/i.test(navigator.userAgent)
      : false;
  }

  private _updateNumeralSet(str: string): void {
    // If any Arabic-Indic digits, then label it as that set. Same for Persian. Otherwise assume ASCII.
    if (/[\u0660-\u0669]/.test(str)) {
      this.userNumeralSet = "arabic-indic";
    } else if (/[\u06F0-\u06F9]/.test(str)) {
      this.userNumeralSet = "persian";
    } else {
      this.userNumeralSet = "ascii";
    }
  }

  private _mapAsciiToUserNumerals(str: string): string {
    if (!this.userNumeralSet) {
      this._updateNumeralSet(this.ui.telInput.value);
    }
    if (this.userNumeralSet === "ascii") {
      return str;
    }
    const base = this.userNumeralSet === "arabic-indic" ? 0x0660 : 0x06f0;
    return str.replace(/[0-9]/g, (d) => String.fromCharCode(base + Number(d)));
  }

  // Normalize Eastern Arabic (U+0660-0669) and Persian/Extended Arabic-Indic (U+06F0-06F9) numerals to ASCII 0-9
  private _normaliseNumerals(str: string): string {
    if (!str) {
      return "";
    }
    this._updateNumeralSet(str);
    if (this.userNumeralSet === "ascii") {
      return str;
    }
    const base = this.userNumeralSet === "arabic-indic" ? 0x0660 : 0x06f0;
    const regex = this.userNumeralSet === "arabic-indic" ? /[\u0660-\u0669]/g : /[\u06F0-\u06F9]/g;
    return str.replace(regex, (ch) => String.fromCharCode(0x30 + (ch.charCodeAt(0) - base)));
  }

  private _getTelInputValue(): string {
    const inputValue = this.ui.telInput.value.trim();
    return this._normaliseNumerals(inputValue);
  }

  private _setTelInputValue(asciiValue: string): void {
    this.ui.telInput.value = this._mapAsciiToUserNumerals(asciiValue);
  }

  private _createInitPromises(): Promise<[unknown, unknown]> {
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
    return Promise.all([autoCountryPromise, utilsScriptPromise]);
  }

  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init(): void {
    //* In various situations there could be no country selected initially, but we need to be able
    //* to assume this variable exists.
    this.selectedCountryData = {} as SelectedCountryData;

    // init event controller
    this.abortController = new AbortController();

    //* Process the country data: country name translations, countryOrder etc.
    this._processCountryData();

    //* generate the markup.
    this.ui.generateMarkup(this.countries);

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
    //* Translate country names according to i18n option.
    translateCountryNames(this.countries, this.options);

    //* Sort countries by countryOrder option (if present), then name.
    sortCountries(this.countries, this.options);

    //* Precompute and cache country search tokens to speed up filtering
    cacheSearchTokens(this.countries);
  }

  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  private _setInitialState(overrideAutoCountry: boolean = false): void {
    //* Fix firefox bug: when first load page (with input with value set to number with intl dial code)
    //* and initialising plugin removes the dial code from the input, then refresh page,
    //* and we try to init plugin again but this time on number without dial code so show globe icon.
    const attributeValueRaw = this.ui.telInput.getAttribute("value");
    const attributeValue = this._normaliseNumerals(attributeValueRaw);
    const inputValue = this._getTelInputValue();
    const useAttribute =
      attributeValue &&
      attributeValue.startsWith("+") &&
      (!inputValue || !inputValue.startsWith("+"));
    const val = useAttribute ? attributeValue : inputValue;
    const dialCode = this._getDialCode(val);
    const isRegionlessNanpNumber = isRegionlessNanp(val);
    const { initialCountry, geoIpLookup } = this.options;
    const isAutoCountry =
      initialCountry === INITIAL_COUNTRY.AUTO && geoIpLookup;

    //* If we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
    //* country, else fall back to the default country.
    if (dialCode && !isRegionlessNanpNumber) {
      this._updateCountryFromNumber(val);
    } else if (!isAutoCountry || overrideAutoCountry) {
      const lowerInitialCountry = initialCountry
        ? initialCountry.toLowerCase()
        : "";
      //* See if we should select a country.
      if (isIso2(lowerInitialCountry)) {
        this._setCountry(lowerInitialCountry);
      } else {
        if (dialCode && isRegionlessNanpNumber) {
          //* Has intl dial code, is regionless nanp, and no initialCountry, so default to US.
          this._setCountry(US.ISO2);
        } else {
          //* Display the empty state (globe icon).
          this._setCountry("");
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
    if (
      (this.ui.hiddenInput || this.ui.hiddenInputCountry) &&
      this.ui.telInput.form
    ) {
      this._initHiddenInputListener();
    }
  }

  //* Update hidden input on form submit.
  private _initHiddenInputListener(): void {
    const handleHiddenInputSubmit = (): void => {
      if (this.ui.hiddenInput) {
        this.ui.hiddenInput.value = this.getNumber();
      }
      if (this.ui.hiddenInputCountry) {
        this.ui.hiddenInputCountry.value = this.selectedCountryData.iso2 || "";
      }
    };
    this.ui.telInput.form?.addEventListener("submit", handleHiddenInputSubmit, {
      signal: this.abortController.signal,
    });
  }

  //* initialise the dropdown listeners.
  private _initDropdownListeners(): void {
    const signal = this.abortController.signal;
    //* Hack for input nested inside label (which is valid markup): clicking the selected country to
    //* open the dropdown would then automatically trigger a 2nd click on the input which would
    //* close it again.
    const handleLabelClick = (e: Event): void => {
      //* If the dropdown is closed, then focus the input, else ignore the click.
      if (this.ui.dropdownContent.classList.contains(CLASSES.HIDE)) {
        this.ui.telInput.focus();
      } else {
        e.preventDefault();
      }
    };
    const label = this.ui.telInput.closest("label");
    if (label) {
      label.addEventListener("click", handleLabelClick, { signal });
    }

    //* Toggle country dropdown on click.
    const handleClickSelectedCountry = (): void => {
      const dropdownClosed = this.ui.dropdownContent.classList.contains(
        CLASSES.HIDE,
      );
      if (
        dropdownClosed &&
        !this.ui.telInput.disabled &&
        !this.ui.telInput.readOnly
      ) {
        this._openDropdown();
      }
    };
    this.ui.selectedCountry.addEventListener(
      "click",
      handleClickSelectedCountry,
      {
        signal,
      },
    );

    //* Open dropdown if selected country is focused and they press up/down/space/enter.
    const handleCountryContainerKeydown = (e: KeyboardEvent): void => {
      const isDropdownHidden = this.ui.dropdownContent.classList.contains(
        CLASSES.HIDE,
      );

      if (
        isDropdownHidden &&
        (
          [KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.SPACE, KEYS.ENTER] as string[]
        ).includes(e.key)
      ) {
        //* Prevent form from being submitted if "ENTER" was pressed.
        e.preventDefault();
        //* Prevent event from being handled again by document.
        e.stopPropagation();
        this._openDropdown();
      }

      //* Allow navigation from dropdown to input on TAB.
      if (e.key === KEYS.TAB) {
        this._closeDropdown();
      }
    };
    this.ui.countryContainer.addEventListener(
      "keydown",
      handleCountryContainerKeydown,
      { signal },
    );
  }

  //* Init many requests: utils script / geo ip lookup.
  private _initRequests(): void {
    const { loadUtils, initialCountry, geoIpLookup } = this.options;

    //* If the user has specified the path to the utils script, fetch it on window.load, else resolve.
    if (loadUtils && !intlTelInput.utils) {
      const doAttachUtils = () => {
        //* Catch and ignore any errors to prevent unhandled-promise failures.
        //* The error from `attachUtils()` is also surfaced in each instance's
        //* `promise` property, so it's not getting lost by being ignored here.
        intlTelInput.attachUtils(loadUtils)?.catch(() => {});
      };

      //* If the plugin is being initialised after the window.load event has already been fired.
      if (intlTelInput.documentReady()) {
        doAttachUtils();
      } else {
        const handlePageLoad = (): void => {
          doAttachUtils();
        };
        //* Wait until the load event so we don't block any other requests e.g. the flags image.
        window.addEventListener("load", handlePageLoad, {
          signal: this.abortController.signal,
        });
      }
    } else {
      this.resolveUtilsScriptPromise();
    }

    //* Don't bother with IP lookup if we already have a selected country.
    const isAutoCountry =
      initialCountry === INITIAL_COUNTRY.AUTO && geoIpLookup;
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
            if (isIso2(iso2Lower)) {
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
    this.ui.searchInput.value = "+";
    this._filterCountriesByQuery("");
  }

  //* Initialize the tel input listeners.
  private _initTelInputListeners(): void {
    this._bindInputListener();
    this._maybeBindKeydownListener();
    this._maybeBindPasteListener();
  }

  private _bindInputListener(): void {
    const {
      strictMode,
      formatAsYouType,
      separateDialCode,
      allowDropdown,
      countrySearch,
    } = this.options;
    let userOverrideFormatting = false;
    //* If the initial val contains any alpha chars (e.g. the extension separator "ext."), then set the override, as libphonenumber's AYT-formatter cannot handle alphas.
    if (REGEX.ALPHA_UNICODE.test(this._getTelInputValue())) {
      userOverrideFormatting = true;
    }

    //* On input event: (1) Update selected country, (2) Format-as-you-type.
    //* Note that this fires AFTER the input is updated.
    const handleInputEvent = (e: InputEvent): void => {
      const inputValue = this._getTelInputValue();
      //* Android workaround for handling plus when separateDialCode enabled (as impossible to handle with keydown/keyup, for which e.key always returns "Unidentified", see https://stackoverflow.com/q/59584061/217866)
      if (
        this.isAndroid &&
        e?.data === "+" &&
        separateDialCode &&
        allowDropdown &&
        countrySearch
      ) {
        const currentCaretPos = this.ui.telInput.selectionStart || 0;
        const valueBeforeCaret = inputValue.substring(0, currentCaretPos - 1);
        const valueAfterCaret = inputValue.substring(currentCaretPos);
        this._setTelInputValue(valueBeforeCaret + valueAfterCaret);
        this._openDropdownWithPlus();
        return;
      }

      //* Update selected country.
      if (this._updateCountryFromNumber(inputValue)) {
        this._triggerCountryChange();
      }

      //* If user types their own formatting char (not a plus or a numeric), or they paste something, then set the override.
      const isFormattingChar = e?.data && REGEX.NON_PLUS_NUMERIC.test(e.data);
      const isPaste =
        e?.inputType === INPUT_TYPES.PASTE && inputValue;
      if (isFormattingChar || (isPaste && !strictMode)) {
        userOverrideFormatting = true;
      }
      //* If user removes all formatting chars, then reset the override.
      else if (!REGEX.NON_PLUS_NUMERIC.test(inputValue)) {
        userOverrideFormatting = false;
      }

      const isSetNumber = e?.detail && e.detail["isSetNumber"];
      // only do formatAsYouType if userNumeralSet is ascii as too complicated to maintain caret position with RTL numeral sets - when these numbers contain spaces, they're treated as words, and so they get reversed in a way that breaks our calculations
      const isAscii = this.userNumeralSet === "ascii";
      //* Handle format-as-you-type, unless userOverrideFormatting, or isSetNumber.
      if (formatAsYouType && !userOverrideFormatting && !isSetNumber && isAscii) {
        //* Maintain caret position after reformatting.
        const currentCaretPos = this.ui.telInput.selectionStart || 0;
        const valueBeforeCaret = inputValue.substring(
          0,
          currentCaretPos,
        );
        const relevantCharsBeforeCaret = valueBeforeCaret.replace(
          REGEX.NON_PLUS_NUMERIC_GLOBAL,
          "",
        ).length;
        const isDeleteForwards = e?.inputType === INPUT_TYPES.DELETE_FWD;
        const fullNumber = this._getFullNumber();
        const formattedValue = formatNumberAsYouType(
          fullNumber,
          inputValue,
          intlTelInput.utils,
          this.selectedCountryData,
          this.options.separateDialCode,
        );
        const newCaretPos = translateCursorPosition(
          relevantCharsBeforeCaret,
          formattedValue,
          currentCaretPos,
          isDeleteForwards,
        );
        // Preserve user's numeral set in displayed value
        this._setTelInputValue(formattedValue);
        // WARNING: calling setSelectionRange triggers a focus on iOS
        this.ui.telInput.setSelectionRange(newCaretPos, newCaretPos);
      }
    };
    //* This handles individual key presses as well as cut/paste events
    //* the advantage of the "input" event over "keyup" etc is that "input" only fires when the value changes,
    //* whereas "keyup" fires even for shift key, arrow key presses etc.
    this.ui.telInput.addEventListener(
      "input",
      handleInputEvent as EventListener,
      {
        signal: this.abortController.signal,
      },
    );
  }

  private _maybeBindKeydownListener(): void {
    const { strictMode, separateDialCode, allowDropdown, countrySearch } =
      this.options;
    if (strictMode || separateDialCode) {
      //* On keydown event: (1) if strictMode then prevent invalid characters, (2) if separateDialCode then handle plus key
      //* Note that this fires BEFORE the input is updated.
      const handleKeydownEvent = (e: KeyboardEvent): void => {
        //* Only interested in actual character presses, rather than ctrl, alt, command, arrow keys, delete/backspace, cut/copy/paste etc.
        if (
          e.key &&
          e.key.length === 1 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey
        ) {
          //* If separateDialCode, handle the plus key differently: open dropdown and put plus in the search input instead.
          if (
            separateDialCode &&
            allowDropdown &&
            countrySearch &&
            e.key === "+"
          ) {
            e.preventDefault();
            this._openDropdownWithPlus();
            return;
          }
          //* If strictMode, prevent invalid characters.
          if (strictMode) {
            const inputValue = this._getTelInputValue();
            const alreadyHasPlus = inputValue.startsWith("+");
            const isInitialPlus =
              !alreadyHasPlus &&
              this.ui.telInput.selectionStart === 0 &&
              e.key === "+";
            // note that we normalise numerals here so this numerics check works, but then later we continue using the original e.key value
            const normalisedKey = this._normaliseNumerals(e.key);
            const isNumeric = /^[0-9]$/.test(normalisedKey);
            const isAllowedChar = separateDialCode
              ? isNumeric
              : isInitialPlus || isNumeric;

            // insert the new character in the right place
            const input = this.ui.telInput;
            const selStart = input.selectionStart;
            const selEnd = input.selectionEnd;
            const before = inputValue.slice(0, selStart);
            const after = inputValue.slice(selEnd);
            const newValue = before + e.key + after;
            const newFullNumber = this._getFullNumber(newValue);
            const coreNumber = intlTelInput.utils.getCoreNumber(
              newFullNumber,
              this.selectedCountryData.iso2,
            );
            const hasExceededMaxLength =
              this.maxCoreNumberLength &&
              coreNumber.length > this.maxCoreNumberLength;

            const newCountry = this._getNewCountryFromNumber(newFullNumber);
            const isChangingDialCode = newCountry !== null;

            // ignore the char if (1) it's not an allowed char, or (2) this new char will exceed the max length and this char will not change the selected country and it's not the initial plus (aka they're starting to type a dial code)
            if (
              !isAllowedChar ||
              (hasExceededMaxLength && !isChangingDialCode && !isInitialPlus)
            ) {
              e.preventDefault();
            }
          }
        }
      };
      this.ui.telInput.addEventListener("keydown", handleKeydownEvent, {
        signal: this.abortController.signal,
      });
    }
  }

  private _maybeBindPasteListener(): void {
    // Sanitise pasted values in strictMode
    if (this.options.strictMode) {
      const handlePasteEvent = (e: ClipboardEvent): void => {
        // in strict mode we always control the pasted value
        e.preventDefault();

        // shortcuts
        const input = this.ui.telInput;
        const selStart = input.selectionStart;
        const selEnd = input.selectionEnd;
        const inputValue = this._getTelInputValue();
        const before = inputValue.slice(0, selStart);
        const after = inputValue.slice(selEnd);
        const iso2 = this.selectedCountryData.iso2;

        const pastedRaw = e.clipboardData.getData("text");
        const pasted = this._normaliseNumerals(pastedRaw);
        // only allow a plus in the pasted content if there's not already one in the input, or the existing one is selected to be replaced by the pasted content
        const initialCharSelected = selStart === 0 && selEnd > 0;
        const allowLeadingPlus =
          !inputValue.startsWith("+") || initialCharSelected;
        // just numerics and pluses
        const allowedChars = pasted.replace(REGEX.NON_PLUS_NUMERIC_GLOBAL, "");
        const hasLeadingPlus = allowedChars.startsWith("+");
        // just numerics
        const numerics = allowedChars.replace(/\+/g, "");
        const sanitised =
          hasLeadingPlus && allowLeadingPlus ? `+${numerics}` : numerics;
        let newVal = before + sanitised + after;

        // utils.getCoreNumber doesn't work for very short numbers, so only bother checking once we have a few chars
        // (fixes bug where you couldn't paste the first digit of a number)
        if (newVal.length > 5) {
          let coreNumber = intlTelInput.utils.getCoreNumber(newVal, iso2);

          // utils.getCoreNumber returns empty string for very long numbers
          // if this is the case, keep trimming the new value until we have a valid core number (or nothing left)
          while (coreNumber.length === 0 && newVal.length > 0) {
            newVal = newVal.slice(0, -1);
            coreNumber = intlTelInput.utils.getCoreNumber(newVal, iso2);
          }
          // if no valid core number can be found, then just ignore the paste
          if (!coreNumber) {
            return;
          }
          if (
            this.maxCoreNumberLength &&
            coreNumber.length > this.maxCoreNumberLength
          ) {
            if (input.selectionEnd === inputValue.length) {
              // if they try to paste too many digits at the end, then just trim the excess
              const trimLength = coreNumber.length - this.maxCoreNumberLength;
              newVal = newVal.slice(0, newVal.length - trimLength);
            } else {
              // if they try to paste too many digits in the middle, then just ignore the paste entirely
              return;
            }
          }
        }
        // preserve pasted numeral set in display
        this._setTelInputValue(newVal);
        const caretPos = selStart + sanitised.length;
        input.setSelectionRange(caretPos, caretPos);

        // trigger format-as-you-type and country update etc
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      };
      this.ui.telInput.addEventListener("paste", handlePasteEvent, {
        signal: this.abortController.signal,
      });
    }
  }

  //* Adhere to the input's maxlength attr.
  private _cap(number: string): string {
    const max = Number(this.ui.telInput.getAttribute("maxlength"));
    return max && number.length > max ? number.substring(0, max) : number;
  }

  //* Trigger a custom event on the input (typed via ItiEventMap).
  private _trigger<K extends keyof ItiEventMap>(
    name: K,
    detailProps: ItiEventMap[K] = {} as ItiEventMap[K],
  ): void {
    const e = new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail: detailProps,
    });
    this.ui.telInput.dispatchEvent(e);
  }

  //* Open the dropdown.
  private _openDropdown(): void {
    const { fixDropdownWidth, countrySearch } = this.options;

    // create a fresh AbortController for dropdown-scoped listeners
    this.dropdownAbortController = new AbortController();

    if (fixDropdownWidth) {
      this.ui.dropdownContent.style.width = `${this.ui.telInput.offsetWidth}px`;
    }
    this.ui.dropdownContent.classList.remove(CLASSES.HIDE);
    this.ui.selectedCountry.setAttribute(ARIA.EXPANDED, "true");

    this._setDropdownPosition();

    if (countrySearch) {
      //* When countrySearch enabled, every time the dropdown is opened we reset by highlighting the first item and scrolling to top.
      const firstCountryItem = this.ui.countryList
        .firstElementChild as HTMLElement;
      if (firstCountryItem) {
        this.ui.highlightListItem(firstCountryItem, false);
        this.ui.countryList.scrollTop = 0;
      }
      this.ui.searchInput.focus();
    }

    //* Bind all the dropdown-related listeners: mouseover, click, click-off, keydown.
    this._bindDropdownListeners();

    //* Update the arrow.
    this.ui.dropdownArrow.classList.add(CLASSES.ARROW_UP);

    this._trigger(EVENTS.OPEN_COUNTRY_DROPDOWN);
  }

  //* Set the dropdown position
  private _setDropdownPosition(): void {
    if (this.options.dropdownContainer) {
      this.options.dropdownContainer.appendChild(this.ui.dropdown);
    }

    if (!this.options.useFullscreenPopup) {
      // getBoundingClientRect is relative to the viewport, so when you scroll down, pos.top goes down, hence needing to add on scrollTop below
      const inputPosRelativeToVP = this.ui.telInput.getBoundingClientRect();
      const inputHeight = this.ui.telInput.offsetHeight;

      //* If dropdownContainer is enabled, calculate postion.
      if (this.options.dropdownContainer) {
        //* Calculate position.
        this.ui.dropdown.style.top = `${inputPosRelativeToVP.top + inputHeight}px`;
        this.ui.dropdown.style.left = `${inputPosRelativeToVP.left}px`;

        //* Close menu on window scroll.
        const handleWindowScroll = (): void => this._closeDropdown();
        window.addEventListener("scroll", handleWindowScroll, {
          signal: this.dropdownAbortController.signal,
        });
      }
    }
  }

  //* We only bind dropdown listeners when the dropdown is open.
  private _bindDropdownListeners(): void {
    const signal = this.dropdownAbortController.signal;
    this._bindDropdownMouseoverListener(signal);
    this._bindDropdownCountryClickListener(signal);
    this._bindDropdownClickOffListener(signal);
    this._bindDropdownKeydownListener(signal);
    if (this.options.countrySearch) {
      this._bindDropdownSearchListeners(signal);
    }
  }

  //* When mouse over a list item, just highlight that one
  //* we add the class "highlight", so if they hit "enter" we know which one to select.
  private _bindDropdownMouseoverListener(signal: AbortSignal): void {
    const handleMouseoverCountryList = (e: MouseEvent): void => {
      //* Handle event delegation, as we're listening for this event on the countryList.
      const listItem: HTMLElement | null = (e.target as HTMLElement)?.closest(
        `.${CLASSES.COUNTRY_ITEM}`,
      );
      if (listItem) {
        this.ui.highlightListItem(listItem, false);
      }
    };
    this.ui.countryList.addEventListener(
      "mouseover",
      handleMouseoverCountryList,
      {
        signal,
      },
    );
  }

  //* Listen for country selection.
  private _bindDropdownCountryClickListener(signal: AbortSignal): void {
    const handleClickCountryList = (e: MouseEvent): void => {
      const listItem: HTMLElement | null = (e.target as HTMLElement)?.closest(
        `.${CLASSES.COUNTRY_ITEM}`,
      );
      if (listItem) {
        this._selectListItem(listItem);
      }
    };
    this.ui.countryList.addEventListener("click", handleClickCountryList, {
      signal,
    });
  }

  //* Click off to close (except when this initial opening click is bubbling up).
  //* We cannot just stopPropagation as it may be needed to close another instance.
  private _bindDropdownClickOffListener(signal: AbortSignal): void {
    const handleClickOffToClose = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const clickedInsideDropdown = !!target.closest(
        `#iti-${this.id}__dropdown-content`,
      );
      // only close if clicked outside (allow clicks on country search input/clear button/no results message etc)
      if (!clickedInsideDropdown) {
        this._closeDropdown();
      }
    };
    // Use setTimeout to allow this event listener to be bound after the current thread of execution, which is where the opening click is happening (which would otherwise immediately trigger click-off-to-close so the dropdown would never open)
    setTimeout(() => {
      document.documentElement.addEventListener(
        "click",
        handleClickOffToClose,
        { signal },
      );
    }, 0);
  }

  //* Listen for up/down scrolling, enter to select, or escape to close.
  //* Use keydown as keypress doesn't fire for non-char keys and we want to catch if they
  //* just hit down and hold it to scroll down (no keyup event).
  //* Listen on the document because that's where key events are triggered if no input has focus.
  private _bindDropdownKeydownListener(signal: AbortSignal): void {
    let query = "";
    let queryTimer: NodeJS.Timeout | null = null;
    const handleKeydownOnDropdown = (e: KeyboardEvent): void => {
      //* prevent down key from scrolling the whole page, and enter key from submitting a form etc.
      const allowedKeys = [
        KEYS.ARROW_UP,
        KEYS.ARROW_DOWN,
        KEYS.ENTER,
        KEYS.ESC,
      ] as string[];
      if (allowedKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();

        //* Up and down to navigate.
        if (e.key === KEYS.ARROW_UP || e.key === KEYS.ARROW_DOWN) {
          this._handleUpDownKey(e.key);
        }
        //* Enter to select.
        else if (e.key === KEYS.ENTER) {
          this._handleEnterKey();
        }
        //* Esc to close
        else if (e.key === KEYS.ESC) {
          this._closeDropdown();
          // Accessibility: re-focus the select country button (this is how native <select> elements behave)
          this.ui.selectedCountry.focus();
        }
      }

      //* When countrySearch disabled: Listen for alpha chars to perform hidden search.
      //* Regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866.
      if (!this.options.countrySearch && REGEX.HIDDEN_SEARCH_CHAR.test(e.key)) {
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
        }, TIMINGS.HIDDEN_SEARCH_RESET_MS);
      }
    };
    document.addEventListener("keydown", handleKeydownOnDropdown, { signal });
  }

  //* Search input listeners when countrySearch enabled.
  private _bindDropdownSearchListeners(signal: AbortSignal): void {
    const doFilter = (): void => {
      const inputQuery = this.ui.searchInput.value.trim();
      this._filterCountriesByQuery(inputQuery);
      // show/hide clear button
      if (this.ui.searchInput.value) {
        this.ui.searchClearButton.classList.remove(CLASSES.HIDE);
      } else {
        this.ui.searchClearButton.classList.add(CLASSES.HIDE);
      }
    };

    let keyupTimer: NodeJS.Timeout | null = null;
    const handleSearchChange = (): void => {
      //* Filtering country nodes is expensive (lots of DOM manipulation), so rate limit it.
      if (keyupTimer) {
        clearTimeout(keyupTimer);
      }
      keyupTimer = setTimeout(() => {
        doFilter();
        keyupTimer = null;
      }, 100);
    };
    this.ui.searchInput.addEventListener("input", handleSearchChange, {
      signal,
    });

    const handleSearchClear = (): void => {
      this.ui.searchInput.value = "";
      this.ui.searchInput.focus();
      doFilter();
    };
    // Prevent click from closing dropdown, clear text, refocus input, and reset filter
    this.ui.searchClearButton.addEventListener("click", handleSearchClear, {
      signal,
    });
  }

  //* Hidden search (countrySearch disabled): Find the first list item whose name starts with the query string.
  private _searchForCountry(query: string): void {
    // moved logic to findFirstCountryStartingWith (pure helper) for reuse & testability
    const match = findFirstCountryStartingWith(this.countries, query);
    if (match) {
      const listItem = match.nodeById[this.id];
      //* Update highlighting and scroll.
      this.ui.highlightListItem(listItem, false);
      this.ui.scrollTo(listItem);
    }
  }

  //* Country search: Filter the countries according to the search query.
  private _filterCountriesByQuery(query: string): void {
    let matchedCountries: Country[];

    if (query === "") {
      // reset - back to all countries
      matchedCountries = this.countries;
    } else {
      matchedCountries = getMatchedCountries(this.countries, query);
    }
    this.ui.filterCountries(matchedCountries);
  }

  //* Highlight the next/prev item in the list (and ensure it is visible).
  private _handleUpDownKey(key: string): void {
    let next =
      key === KEYS.ARROW_UP
        ? (this.ui.highlightedItem?.previousElementSibling as HTMLElement)
        : (this.ui.highlightedItem?.nextElementSibling as HTMLElement);
    if (!next && this.ui.countryList.childElementCount > 1) {
      //* Otherwise, we must be at the end, so loop round again.
      next =
        key === KEYS.ARROW_UP
          ? (this.ui.countryList.lastElementChild as HTMLElement)
          : (this.ui.countryList.firstElementChild as HTMLElement);
    }
    if (next) {
      //* Make sure the next item is visible
      //* (before calling focus(), which can cause the next item to scroll to the middle of the dropdown, which is jarring).
      this.ui.scrollTo(next);
      //* If country search enabled, don't lose focus from the search input on up/down
      this.ui.highlightListItem(next, false);
    }
  }

  //* Select the currently highlighted item.
  private _handleEnterKey(): void {
    if (this.ui.highlightedItem) {
      this._selectListItem(this.ui.highlightedItem);
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
        (!number.startsWith("+") && !this.options.separateDialCode);
      const { NATIONAL, INTERNATIONAL } = intlTelInput.utils.numberFormat;
      const format = useNational ? NATIONAL : INTERNATIONAL;
      number = intlTelInput.utils.formatNumber(
        number,
        this.selectedCountryData.iso2,
        format,
      );
    }

    number = this._beforeSetNumber(number);
    this._setTelInputValue(number);
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

  // if there is a selected country, and the number doesn't start with a dial code, then add it
  private _ensureHasDialCode(number: string): string {
    const { dialCode, nationalPrefix } = this.selectedCountryData;
    const alreadyHasPlus = number.startsWith("+");
    if (alreadyHasPlus || !dialCode) {
      return number;
    }
    //* Don't remove "nationalPrefix" digit if separateDialCode is enabled, as it can be part of a valid area code e.g. in Russia then have area codes starting with 8, which is also the national prefix digit.
    const hasPrefix =
      nationalPrefix &&
      number.startsWith(nationalPrefix) &&
      !this.options.separateDialCode;
    const cleanNumber = hasPrefix ? number.substring(1) : number;
    return `+${dialCode}${cleanNumber}`;
  }

  // Get the country ISO2 code from the given number
  // BUT ONLY IF ITS CHANGED FROM THE CURRENTLY SELECTED COUNTRY
  // NOTE: consider refactoring this to be more clear
  private _getNewCountryFromNumber(fullNumber: string): Iso2 | "" | null {
    const plusIndex = fullNumber.indexOf("+");
    //* If it contains a plus, discard any chars before it e.g. accidental space char.
    //* This keeps the selected country auto-updating correctly, which we want as
    //* libphonenumber's validation/getNumber methods will ignore these chars anyway.
    let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
    const selectedIso2 = this.selectedCountryData.iso2;
    const selectedDialCode = this.selectedCountryData.dialCode;

    //* Ensure the number starts with the dial code (if there is a selected country), for getDialCode to work properly (e.g. if number is entered in national format, or with separateDialCode enabled)
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
      if (
        !selectedIso2 &&
        this.defaultCountry &&
        iso2Codes.includes(this.defaultCountry)
      ) {
        return this.defaultCountry;
      }

      // if they're typing a regionless NANP number and they already have a NANP country selected, then don't change the country
      const isRegionlessNanpNumber =
        selectedDialCode === DIAL.NANP && isRegionlessNanp(numeric);
      if (isRegionlessNanpNumber) {
        return null;
      }

      // if the currently selected country has area codes and the entered number already has a full match to one of them, then don't change the country
      const { areaCodes, priority } = this.selectedCountryData;
      if (areaCodes) {
        const dialCodeAreaCodes = areaCodes.map(
          (areaCode) => `${selectedDialCode}${areaCode}`,
        );
        for (const dialCodeAreaCode of dialCodeAreaCodes) {
          if (numeric.startsWith(dialCodeAreaCode)) {
            // it's a full area code match, so the right country is already selected
            return null;
          }
        }
      }

      // If the currently selected country has area codes (and it's not the "main" country, which only has partial area code coverage), and they've typed more digits than the best area code match, then that means none of the area codes matched the input number, as a full area code match would have been caught above.
      const isMainCountry = priority === 0;
      const hasAreaCodesButNoneMatched =
        areaCodes &&
        !isMainCountry &&
        numeric.length > dialCodeMatchNumeric.length;
      const isValidSelection =
        selectedIso2 &&
        iso2Codes.includes(selectedIso2) &&
        !hasAreaCodesButNoneMatched;
      // extra protection: don't return isoCodes[0] if it's already selected
      const alreadySelected = selectedIso2 === iso2Codes[0];

      if (!isValidSelection && !alreadySelected) {
        return iso2Codes[0];
      }
    } else if (number.startsWith("+") && numeric.length) {
      //* If the user is still typing a prefix of the currently selected country's dial code, don't change yet.
      const currentDial = this.selectedCountryData.dialCode || "";
      if (currentDial && currentDial.startsWith(numeric)) {
        return null;
      }
      //* Invalid dial code (or prefix of a different country), so empty.
      //* Note: use getNumeric here because the number has not been formatted yet, so could contain bad chars.
      return "";
    } else if ((!number || number === "+") && !selectedIso2) {
      //* If no selected country, and user either clears the input, or just types a plus, then show default.
      return this.defaultCountry;
    }
    return null;
  }

  //* Update the selected country, dial code (if separateDialCode), placeholder, title, and selected list item.
  //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
  private _setCountry(iso2: Iso2 | ""): boolean {
    const { separateDialCode, showFlags, i18n, allowDropdown } = this.options;

    const prevIso2 = this.selectedCountryData.iso2 || "";

    if (allowDropdown) {
      // Update the selected list item in the dropdown
      this.ui.updateSelectedItem(iso2);
    }

    this.selectedCountryData = iso2
      ? (this.countryByIso2.get(iso2) as Country)
      : ({} as SelectedCountryData);

    //* Update the defaultCountry - we only need the iso2 from now on, so just store that.
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    //* Update the selected flag class and the a11y text.
    if (this.ui.selectedCountry) {
      const flagClass =
        iso2 && showFlags
          ? `${CLASSES.FLAG} iti__${iso2}`
          : `${CLASSES.FLAG} ${CLASSES.GLOBE}`;
      let ariaLabel, title;
      if (iso2) {
        const { name, dialCode } = this.selectedCountryData;
        title = name;
        ariaLabel = i18n.selectedCountryAriaLabel
          .replace("${countryName}", name)
          .replace("${dialCode}", `+${dialCode}`);
      } else {
        title = i18n.noCountrySelected;
        ariaLabel = i18n.noCountrySelected;
      }
      this.ui.selectedCountryInner.className = flagClass;
      this.ui.selectedCountry.setAttribute("title", title);
      this.ui.selectedCountry.setAttribute(ARIA.LABEL, ariaLabel);
    }

    //* Update the selected dial code.
    if (separateDialCode) {
      const dialCode = this.selectedCountryData.dialCode
        ? `+${this.selectedCountryData.dialCode}`
        : "";
      this.ui.selectedDialCode.textContent = dialCode;
      this.ui.updateInputPadding();
    }

    //* Update the input's placeholder.
    this._updatePlaceholder();

    //* Update the maximum valid number length.
    this._updateMaxLength();

    //* Return if the country has changed or not.
    return prevIso2 !== iso2;
  }

  //* Update the maximum valid number length for the currently selected country.
  private _updateMaxLength(): void {
    const { strictMode, placeholderNumberType, validationNumberTypes } =
      this.options;
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
        while (
          intlTelInput.utils.isPossibleNumber(
            exampleNumber,
            iso2,
            validationNumberTypes,
          )
        ) {
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

  //* Update the input placeholder to an example number from the currently selected country.
  private _updatePlaceholder(): void {
    const {
      autoPlaceholder,
      placeholderNumberType,
      nationalMode,
      customPlaceholder,
    } = this.options;
    const shouldSetPlaceholder =
      autoPlaceholder === PLACEHOLDER_MODES.AGGRESSIVE ||
      (!this.ui.hadInitialPlaceholder && autoPlaceholder === PLACEHOLDER_MODES.POLITE);

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
      this.ui.telInput.setAttribute("placeholder", placeholder);
    }
  }

  //* Called when the user selects a list item from the dropdown.
  private _selectListItem(listItem: HTMLElement): void {
    //* Update selected country and active list item.
    const iso2 = listItem.dataset[DATA_KEYS.COUNTRY_CODE] as Iso2;
    const countryChanged = this._setCountry(iso2);
    this._closeDropdown();

    const dialCode = listItem.dataset[DATA_KEYS.DIAL_CODE];
    this._updateDialCode(dialCode);

    // reformat any existing number to the new country
    if (this.options.formatOnDisplay) {
      const inputValue = this._getTelInputValue();
      this._updateValFromNumber(inputValue);
    }

    //* Focus the input.
    this.ui.telInput.focus();

    if (countryChanged) {
      this._triggerCountryChange();
    }
  }

  //* Close the dropdown and unbind any listeners.
  private _closeDropdown(): void {
    // we call closeDropdown in places where it might not even be open e.g. in destroy()
    if (this.ui.dropdownContent.classList.contains(CLASSES.HIDE)) {
      return;
    }
    this.ui.dropdownContent.classList.add(CLASSES.HIDE);
    this.ui.selectedCountry.setAttribute(ARIA.EXPANDED, "false");

    if (this.options.countrySearch) {
      this.ui.searchInput.removeAttribute(ARIA.ACTIVE_DESCENDANT);
      // only clear the highlighted item if countrySearch is enabled as this gets reset each time the dropdown is opened
      if (this.ui.highlightedItem) {
        this.ui.highlightedItem.classList.remove(CLASSES.HIGHLIGHT);
        this.ui.highlightedItem = null;
      }
    }

    //* Update the arrow.
    this.ui.dropdownArrow.classList.remove(CLASSES.ARROW_UP);

    //* Unbind dropdown-scoped events in one go
    this.dropdownAbortController.abort();
    this.dropdownAbortController = null;

    //* Remove dropdown from container.
    if (this.options.dropdownContainer) {
      this.ui.dropdown.remove();
    }

    this._trigger(EVENTS.CLOSE_COUNTRY_DROPDOWN);
  }

  //* Replace any existing dial code with the new one
  //* Note: called from _selectListItem and setCountry
  private _updateDialCode(newDialCodeBare: string): void {
    const inputVal = this._getTelInputValue();
    //* Save having to pass this every time.
    const newDialCode = `+${newDialCodeBare}`;

    let newNumber;
    if (inputVal.startsWith("+")) {
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
      this._setTelInputValue(newNumber);
    }
  }

  //* Try and extract a valid international dial code from a full telephone number.
  //* Note: returns the raw string inc plus character and any whitespace/dots etc.
  private _getDialCode(number: string, includeAreaCode?: boolean): string {
    let dialCode = "";
    //* Only interested in international numbers (starting with a plus)
    if (number.startsWith("+")) {
      let numericChars = "";
      let foundBaseDialCode = false;
      //* Iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        //* If char is number.
        if (/[0-9]/.test(c)) {
          numericChars += c;
          const hasMapEntry = Boolean(this.dialCodeToIso2Map[numericChars]);
          if (!hasMapEntry) {
            // if no mapping for this prefix, stop searching
            break;
          }

          // If we've hit a valid base dial code, record it
          if (this.dialCodes.has(numericChars)) {
            dialCode = number.substring(0, i + 1);
            foundBaseDialCode = true;
            // if we're not considering area codes, we can stop at the first valid base dial code
            if (!includeAreaCode) {
              break;
            }
          } else if (includeAreaCode && foundBaseDialCode) {
            // Only extend beyond a valid base dial code (avoid partial prefixes like +88 for +880)
            dialCode = number.substring(0, i + 1);
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
    const val = overrideVal ? this._normaliseNumerals(overrideVal) : this._getTelInputValue();
    const { dialCode } = this.selectedCountryData;
    let prefix;
    const numericVal = getNumeric(val);

    if (
      this.options.separateDialCode &&
      !val.startsWith("+") &&
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
    const dialCode = this._getDialCode(fullNumber);
    const number = beforeSetNumber(
      fullNumber,
      dialCode,
      this.options.separateDialCode,
      this.selectedCountryData,
    );
    return this._cap(number);
  }

  //* Trigger the 'countrychange' event.
  private _triggerCountryChange(): void {
    this._trigger(EVENTS.COUNTRY_CHANGE);
  }

  //**************************
  //*  SECRET PUBLIC METHODS
  //**************************

  //* This is called when the geoip call returns.
  handleAutoCountry(): void {
    if (
      this.options.initialCountry === INITIAL_COUNTRY.AUTO &&
      intlTelInput.autoCountry
    ) {
      //* We must set this even if there is an initial val in the input: in case the initial val is
      //* invalid and they delete it - they should see their auto country.
      this.defaultCountry = intlTelInput.autoCountry;
      const hasSelectedCountryOrGlobe =
        this.selectedCountryData.iso2 ||
        this.ui.selectedCountryInner.classList.contains(CLASSES.GLOBE);
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
      const inputValue = this._getTelInputValue();
      //* If there's an initial value in the input, then format it.
      if (inputValue) {
        this._updateValFromNumber(inputValue);
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
    // it is possible to call destroy twice, so check there is anything left to destroy
    if (!this.ui.telInput) {
      return;
    }
    if (this.options.allowDropdown) {
      //* Make sure the dropdown is closed (and unbind listeners).
      this._closeDropdown();
    }

    //* Abort all listeners registered via the main controller
    this.abortController.abort();
    this.abortController = null;

    //* Remove all added DOM elements and classes.
    this.ui.destroy();

    if (intlTelInput.instances instanceof Map) {
      intlTelInput.instances.delete(this.id);
    } else {
      delete (intlTelInput.instances as any)[this.id];
    }
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
      const fullNumber = this._getFullNumber();
      const formattedNumber = intlTelInput.utils.formatNumber(
        fullNumber,
        iso2,
        format,
      );
      return this._mapAsciiToUserNumerals(formattedNumber);
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
    return SENTINELS.UNKNOWN_NUMBER_TYPE;
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
    return SENTINELS.UNKNOWN_VALIDATION_ERROR;
  }

  //* Validate the input val using number length only
  isValidNumber(): boolean | null {
    // custom validation for UK mobile numbers - useful when validationNumberTypes=["MOBILE", "FIXED_LINE"], where UK fixed_line numbers can be much shorter than mobile numbers
    const { dialCode, iso2 } = this.selectedCountryData;
    if (dialCode === UK.DIAL_CODE && intlTelInput.utils) {
      const number = this._getFullNumber();
      const coreNumber = intlTelInput.utils.getCoreNumber(number, iso2);
      // UK mobile numbers (starting with a 7) must have a core number that is 10 digits long (excluding dial code/national prefix)
      if (
        coreNumber[0] === UK.MOBILE_PREFIX &&
        coreNumber.length !== UK.MOBILE_CORE_LENGTH
      ) {
        return false;
      }
    }
    return this._validateNumber(false);
  }

  //* Validate the input val with precise validation
  isValidNumberPrecise(): boolean | null {
    return this._validateNumber(true);
  }

  private _utilsIsPossibleNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isPossibleNumber(
          val,
          this.selectedCountryData.iso2,
          this.options.validationNumberTypes,
        )
      : null;
  }

  //* Shared internal validation logic to handle alpha character extension rules.
  private _validateNumber(precise: boolean): boolean | null {
    if (!intlTelInput.utils) {
      return null;
    }
    if (!this.selectedCountryData.iso2) {
      return false;
    }

    const testValidity = (s: string) =>
      precise ? this._utilsIsValidNumber(s) : this._utilsIsPossibleNumber(s);

    const val = this._getFullNumber();
    const alphaCharPosition = val.search(REGEX.ALPHA_UNICODE);
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
      ? intlTelInput.utils.isValidNumber(
          val,
          this.selectedCountryData.iso2,
          this.options.validationNumberTypes,
        )
      : null;
  }

  //* Update the selected country, and update the input val accordingly.
  setCountry(iso2: Iso2): void {
    const iso2Lower = iso2?.toLowerCase() as Iso2;
    // handle invalid iso2
    if (!isIso2(iso2Lower)) {
      throw new Error(`Invalid country code: '${iso2Lower}'`);
    }

    const currentCountry = this.selectedCountryData.iso2;
    //* There is a country change IF: either there is a new country and it's different to the current one, OR there is no new country (i.e. globe state) and there is a current country
    const isCountryChange =
      (iso2 && iso2Lower !== currentCountry) || (!iso2 && currentCountry);
    if (isCountryChange) {
      this._setCountry(iso2Lower);
      this._updateDialCode(this.selectedCountryData.dialCode);
      // reformat
      if (this.options.formatOnDisplay) {
        const inputValue = this._getTelInputValue();
        this._updateValFromNumber(inputValue);
      }
      this._triggerCountryChange();
    }
  }

  //* Set the input value and update the country.
  setNumber(number: string): void {
    const normalisedNumber = this._normaliseNumerals(number);
    //* We must update the country first, which updates this.selectedCountryData, which is used for
    //* formatting the number before displaying it.
    const countryChanged = this._updateCountryFromNumber(normalisedNumber);
    this._updateValFromNumber(normalisedNumber);
    if (countryChanged) {
      this._triggerCountryChange();
    }
    //* This is required for the React cmp to update its state correctly.
    this._trigger(EVENTS.INPUT, { isSetNumber: true });
  }

  //* Set the placeholder number typ
  setPlaceholderNumberType(type: NumberType): void {
    this.options.placeholderNumberType = type;
    this._updatePlaceholder();
  }

  setDisabled(disabled: boolean): void {
    this.ui.telInput.disabled = disabled;
    if (disabled) {
      this.ui.selectedCountry.setAttribute("disabled", "true");
    } else {
      this.ui.selectedCountry.removeAttribute("disabled");
    }
  }
}

/********************
 *  STATIC METHODS
 ********************/

//* Load the utils script.
const attachUtils = (source: UtilsLoader): Promise<boolean> | null => {
  //* 2 Options:
  //* 1) Not already started loading (start)
  //* 2) Already started loading (do nothing - just wait for the onload callback to fire, which will
  //* trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
  if (!intlTelInput.utils && !intlTelInput.startedLoadingUtilsScript) {
    let loadCall;
    if (typeof source === "function") {
      try {
        loadCall = Promise.resolve(source());
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(
        new TypeError(
          `The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof source}`,
        ),
      );
    }

    //* Only do this once.
    intlTelInput.startedLoadingUtilsScript = true;

    return loadCall
      .then((module) => {
        const utils = module?.default;
        if (!utils || typeof utils !== "object") {
          throw new TypeError(
            "The loader function passed to attachUtils did not resolve to a module object with utils as its default export.",
          );
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

//* Run a method on each instance of the plugin.
type InstanceMethodMap = {
  handleUtils: () => void;
  handleAutoCountry: () => void;
  rejectAutoCountryPromise: (reason?: unknown) => void;
  rejectUtilsScriptPromise: (reason?: unknown) => void;
};

const forEachInstance = <K extends keyof InstanceMethodMap>(
  method: K,
  ...args: Parameters<InstanceMethodMap[K]>
): void => {
  Object.values(intlTelInput.instances).forEach((instance) => {
    const fn = (instance as unknown as InstanceMethodMap)[method];
    if (typeof fn === "function") {
      fn.apply(instance, args);
    }
  });
};

const intlTelInput: IntlTelInputInterface = Object.assign(
  (input: HTMLInputElement, options?: SomeOptions): Iti => {
    const iti = new Iti(input, options);
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
      const id = input.dataset.intlTelInputId;
      return id ? intlTelInput.instances[id] : null;
    },
    //* A map from instance ID to instance object.
    instances: {},
    attachUtils,
    startedLoadingUtilsScript: false,
    startedLoadingAutoCountry: false,
    version: process.env.VERSION,
  },
);

export default intlTelInput;
