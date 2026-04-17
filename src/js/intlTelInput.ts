import allCountries, { type Country, type Iso2, isIso2 } from "./data";
import {
  defaults,
  normaliseOptions,
  applyOptionSideEffects,
  validateOptions,
} from "./core/options";
import type {
  UtilsLoader,
  ItiUtils,
  NumberType,
  AllOptions,
  SomeOptions,
  SelectedCountryData,
} from "./types/public-api";
import { getNumeric } from "./helpers/string";
import UI from "./core/ui";
import {
  processAllCountries,
  processDialCodes,
  sortCountries,
  cacheSearchTokens,
  generateCountryNames,
} from "./data/country-data";
import { hasRegionlessDialCode } from "./data/intl-regionless";
import { beforeSetNumber, formatNumberAsYouType } from "./format/formatting";
import { translateCursorPosition } from "./format/caret";
import { isRegionlessNanp } from "./data/nanp-regionless";
import type { ItiEventMap } from "./types/events";
import {
  EVENTS,
  SENTINELS,
  REGEX,
  INITIAL_COUNTRY,
  DATA_KEYS,
  UK,
  INPUT_TYPES,
  DIAL,
  US,
  PLACEHOLDER_MODES,
} from "./constants";
import { Numerals } from "./core/numerals";
import type { ForEachInstanceArgsMap } from "./types/forEachInstanceArgsMap";
export type {
  AllOptions,
  SomeOptions,
  SelectedCountryData,
} from "./types/public-api";

declare global {
  interface HTMLInputElement {
    iti?: Iti;
  }
}

//* These vars persist through all instances of the plugin.
let id = 0;

const ensureUtils = (methodName: string): void => {
  if (!intlTelInput.utils) {
    throw new Error(
      `intlTelInput.utils is required for ${methodName}(). See: https://intl-tel-input.com/docs/utils`,
    );
  }
};

//* Mimics Promise.withResolvers (ES2024) for older runtimes (Safari < 17.4, Node < 21).
type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};
const createDeferred = <T>(): Deferred<T> => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

//* This is our plugin class that we will create an instance of
export class Iti {
  //* PUBLIC FIELDS - READONLY
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  public readonly id: number;
  // accessed externally via iti.promise.then(...)
  public readonly promise: Promise<void>;

  //* PRIVATE FIELDS
  readonly #ui: UI;
  readonly #options: AllOptions;
  readonly #isAndroid: boolean;
  // country data
  readonly #countries: Country[];
  readonly #dialCodeMaxLen: number;
  readonly #dialCodeToIso2Map: Record<string, Iso2[]>;
  readonly #dialCodes: Set<string>;
  readonly #countryByIso2: Map<Iso2, Country>;

  #selectedCountry: Country | null = null;
  #maxCoreNumberLength: number | null = null;
  #defaultCountryIso2!: Iso2;
  #destroyed = false;
  #abortController!: AbortController;
  #numerals!: Numerals;

  #autoCountryDeferred?: Deferred<void>;
  #utilsScriptDeferred?: Deferred<void>;

  public constructor(input: HTMLInputElement, customOptions: SomeOptions = {}) {
    this.id = id++;

    UI.validateInput(input);
    const validatedOptions = validateOptions(customOptions);

    //* Process specified options / defaults.
    this.#options = { ...defaults, ...validatedOptions } as AllOptions;
    normaliseOptions(this.#options);
    applyOptionSideEffects(this.#options);

    this.#ui = new UI(input, this.#options, this.id);
    this.#isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
    this.#numerals = new Numerals(input.value);
    this.promise = this.#createInitPromises(this.#options);

    //* Process onlyCountries or excludeCountries array if present.
    this.#countries = processAllCountries(this.#options);

    //* Generate this.dialCodes and this.dialCodeToIso2Map.
    const { dialCodes, dialCodeMaxLen, dialCodeToIso2Map } = processDialCodes(
      this.#countries,
    );
    this.#dialCodes = dialCodes;
    this.#dialCodeMaxLen = dialCodeMaxLen;
    this.#dialCodeToIso2Map = dialCodeToIso2Map;

    //* Build fast iso2 -> country map for O(1) lookups (used by setCountry).
    this.#countryByIso2 = new Map(this.#countries.map((c) => [c.iso2, c]));

    this.#init();
  }

  #getTelInputValue(): string {
    const inputValue = this.#ui.telInput.value.trim();
    return this.#numerals.normalise(inputValue);
  }

  #setTelInputValue(asciiValue: string): void {
    this.#ui.telInput.value = this.#numerals.denormalise(asciiValue);
  }

  #createInitPromises(options: AllOptions): Promise<void> {
    const { initialCountry, geoIpLookup, loadUtils } = options;
    const needsAutoCountryPromise =
      initialCountry === INITIAL_COUNTRY.AUTO && Boolean(geoIpLookup);
    const needsUtilsScriptPromise = Boolean(loadUtils) && !intlTelInput.utils;

    //* These promises get resolved when their individual requests complete.
    //* This way the dev can do something like iti.promise.then(...) to know when all requests are complete.
    if (needsAutoCountryPromise) {
      this.#autoCountryDeferred = createDeferred<void>();
    }
    if (needsUtilsScriptPromise) {
      this.#utilsScriptDeferred = createDeferred<void>();
    }

    return Promise.all([
      this.#autoCountryDeferred?.promise,
      this.#utilsScriptDeferred?.promise,
    ]).then(() => {});
  }

  #init(): void {
    // init event controller
    this.#abortController = new AbortController();

    //* Process the country data: country name translations, countryOrder etc.
    this.#processCountryData();

    //* generate the markup.
    this.#ui.generateMarkup(this.#countries);

    //* Set the initial state of the input value and the selected country.
    this.#setInitialState();

    //* Now that input padding is finalised, set the dropdown width.
    this.#ui.maybeEnsureDropdownWidthSet();

    //* Start all of the event listeners: input keydown, selectedCountryEl click.
    this.#initListeners();

    //* Utils script, and auto country.
    this.#initRequests();

    if (this.#options.dropdownAlwaysOpen) {
      this.#openDropdown();
    }
  }

  //********************
  //*  PRIVATE METHODS
  //********************

  //* Prepare all of the country data, including onlyCountries, excludeCountries, countryOrder options.
  #processCountryData(): void {
    //* Generate country names using Intl.DisplayNames
    generateCountryNames(this.#countries, this.#options);

    //* Sort countries by countryOrder option (if present), then name.
    sortCountries(this.#countries, this.#options);

    //* Precompute and cache country search tokens to speed up filtering
    cacheSearchTokens(this.#countries);
  }

  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  #setInitialState(overrideAutoCountry: boolean = false): void {
    //* Fix firefox bug: when first load page (with input with value set to number with intl dial code)
    //* and initialising plugin removes the dial code from the input, then refresh page,
    //* and we try to init plugin again but this time on number without dial code so show globe icon.
    const attributeValueRaw = this.#ui.telInput.getAttribute("value");
    const attributeValue = this.#numerals.normalise(attributeValueRaw ?? "");
    const inputValue = this.#getTelInputValue();
    const useAttribute =
      attributeValue &&
      attributeValue.startsWith("+") &&
      (!inputValue || !inputValue.startsWith("+"));
    const val = useAttribute ? attributeValue : inputValue;

    const dialCode = this.#getDialCode(val);
    const isRegionlessNanpNumber = isRegionlessNanp(val);
    const { initialCountry, geoIpLookup } = this.#options;
    const isAutoCountry =
      initialCountry === INITIAL_COUNTRY.AUTO && geoIpLookup;
    const doingAutoCountryLookup = isAutoCountry && !overrideAutoCountry;
    const isValidInitialCountry = isIso2(initialCountry);

    if (dialCode) {
      if (isRegionlessNanpNumber) {
        //* For regionless NANP numbers, we can't tell from the number which country to select, so defer to initialCountry, else auto country lookup, else default to US.
        if (isValidInitialCountry) {
          this.#setCountry(initialCountry);
        } else if (!doingAutoCountryLookup) {
          this.#setCountry(US.ISO2);
        }
      } else {
        this.#updateCountryFromNumber(val);
      }
    } else if (isValidInitialCountry) {
      this.#setCountry(initialCountry);
    } else if (!doingAutoCountryLookup) {
      //* No valid dial code, no valid initialCountry, and no country lookup, so default to empty (globe icon).
      this.#setCountry("");
    }

    //* Format - note this wont be run after updateDialCode as that's only called if no val.
    if (val) {
      this.#updateValFromNumber(val);
    }
  }

  //* Initialise the main event listeners: input keyup, and click selected country.
  #initListeners(): void {
    this.#bindTelInputListeners();

    if (this.#options.allowDropdown) {
      this.#ui.bindInitialDropdownListeners(
        this.#abortController!.signal,
        () => this.#openDropdown(),
        () => this.#closeDropdown(),
      );
    }
    this.#ui.bindHiddenInputSubmitListener(
      this.#abortController!.signal,
      () => this.getNumber(),
      () => this.#selectedCountry?.iso2 || "",
    );
  }

  //* Init requests: utils script / geo ip lookup.
  #initRequests(): void {
    //* (1) UTILS SCRIPT — deferred only exists when loadUtils was set and utils aren't loaded yet.
    if (this.#utilsScriptDeferred) {
      const { loadUtils } = this.#options;
      const doAttachUtils = () => {
        //* Catch and ignore any errors to prevent unhandled-promise failures.
        //* The error from `attachUtils()` is also surfaced in each instance's
        //* `promise` property, so it's not getting lost by being ignored here.
        intlTelInput.attachUtils(loadUtils!)?.catch(() => {});
      };

      //* If the plugin is being initialised after the window.load event has already been fired.
      if (intlTelInput.documentReady()) {
        doAttachUtils();
      } else {
        //* Wait until the load event so we don't block any other requests e.g. the flags image.
        window.addEventListener("load", doAttachUtils, {
          signal: this.#abortController!.signal,
        });
      }
    }

    //* (2) AUTO COUNTRY — deferred only exists when initialCountry is "auto" with a geoIpLookup.
    if (this.#autoCountryDeferred) {
      //* Don't bother with IP lookup if we already have a selected country.
      if (this.#selectedCountry) {
        this.#autoCountryDeferred.resolve();
      } else {
        this.#loadAutoCountry();
      }
    }
  }

  //* Perform the geo ip lookup.
  #loadAutoCountry(): void {
    //* 3 options:
    //* 1) Already loaded (we're done)
    //* 2) Another instance has already started loading (do nothing - just wait for loading callback to fire)
    //* 3) Not already started loading (start)
    if (intlTelInput.autoCountry) {
      this.#handleAutoCountry();
      return;
    }

    this.#ui.setLoading(true);

    //* Don't do this twice!
    if (intlTelInput.startedLoadingAutoCountry) {
      return;
    }
    intlTelInput.startedLoadingAutoCountry = true;

    if (typeof this.#options.geoIpLookup === "function") {
      const successCallback = (iso2 = "") => {
        this.#ui.setLoading(false);
        const iso2Lower = iso2.toLowerCase();
        if (isIso2(iso2Lower)) {
          intlTelInput.autoCountry = iso2Lower;
          //* Tell all instances the auto country is ready.
          //* UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
          //* away (e.g. if they have already done the geo ip lookup somewhere else). Using
          //* setTimeout means that the current thread of execution will finish before executing
          //* this, which allows the plugin to finish initialising.
          setTimeout(() => Iti.forEachInstance("handleAutoCountry"));
        } else {
          Iti.forEachInstance("handleAutoCountryFailure");
        }
      };
      const failureCallback = () => {
        this.#ui.setLoading(false);
        Iti.forEachInstance("handleAutoCountryFailure");
      };
      this.#options.geoIpLookup(successCallback, failureCallback);
    }
  }

  #openDropdownWithPlus(): void {
    this.#openDropdown();
    this.#ui.prefillSearchWithPlus();
  }

  //* Initialize the tel input listeners.
  #bindTelInputListeners(): void {
    this.#bindInputListener();
    this.#maybeBindKeydownListener();
    this.#maybeBindPasteListener();
  }

  #bindInputListener(): void {
    const {
      strictMode,
      formatAsYouType,
      separateDialCode,
      allowDropdown,
      countrySearch,
    } = this.#options;
    let userOverrideFormatting = false;
    //* If the initial val contains any alpha chars (e.g. the extension separator "ext."), then set the override, as libphonenumber's AYT-formatter cannot handle alphas.
    if (REGEX.ALPHA_UNICODE.test(this.#getTelInputValue())) {
      userOverrideFormatting = true;
    }

    //* On input event: (1) Update selected country, (2) Format-as-you-type.
    //* Note that this fires AFTER the input is updated.
    const handleInputEvent = (e: InputEvent): void => {
      const inputValue = this.#getTelInputValue();
      //* Android workaround for handling plus when separateDialCode enabled (as impossible to handle with keydown/keyup, for which e.key always returns "Unidentified", see https://stackoverflow.com/q/59584061/217866)
      if (
        this.#isAndroid &&
        e?.data === "+" &&
        separateDialCode &&
        allowDropdown &&
        countrySearch
      ) {
        const currentCaretPos = this.#ui.telInput.selectionStart || 0;
        const valueBeforeCaret = inputValue.substring(0, currentCaretPos - 1);
        const valueAfterCaret = inputValue.substring(currentCaretPos);
        this.#setTelInputValue(valueBeforeCaret + valueAfterCaret);
        this.#openDropdownWithPlus();
        return;
      }

      //* Update selected country.
      if (this.#updateCountryFromNumber(inputValue)) {
        this.#dispatchCountryChangeEvent();
      }

      //* If user types their own formatting char (not a plus or a numeric), or they paste something, then set the override.
      const isFormattingChar = e?.data && REGEX.NON_PLUS_NUMERIC.test(e.data);
      const isPaste = e?.inputType === INPUT_TYPES.PASTE && inputValue;
      if (isFormattingChar || (isPaste && !strictMode)) {
        userOverrideFormatting = true;
      } else if (!REGEX.NON_PLUS_NUMERIC.test(inputValue)) {
        //* If user removes all formatting chars, then reset the override.
        userOverrideFormatting = false;
      }

      //* This listener receives both native InputEvents (from typing) and synthetic CustomEvents
      //* (from setNumber), so we need the cast to access the custom detail property.
      const isSetNumber =
        e?.detail &&
        (e.detail as unknown as Record<string, unknown>)["isSetNumber"];
      // only do formatAsYouType if userNumeralSet is ascii as too complicated to maintain caret position with RTL numeral sets - when these numbers contain spaces, they're treated as words, and so they get reversed in a way that breaks our calculations
      const isAscii = this.#numerals.isAscii();
      //* Handle format-as-you-type, unless userOverrideFormatting, or isSetNumber.
      if (
        formatAsYouType &&
        !userOverrideFormatting &&
        !isSetNumber &&
        isAscii
      ) {
        //* Maintain caret position after reformatting.
        const currentCaretPos = this.#ui.telInput.selectionStart || 0;
        const valueBeforeCaret = inputValue.substring(0, currentCaretPos);
        const relevantCharsBeforeCaret = valueBeforeCaret.replace(
          REGEX.NON_PLUS_NUMERIC_GLOBAL,
          "",
        ).length;
        const isDeleteForwards = e?.inputType === INPUT_TYPES.DELETE_FWD;
        const fullNumber = this.#getFullNumber();
        const formattedValue = formatNumberAsYouType(
          fullNumber,
          inputValue,
          intlTelInput.utils,
          this.#selectedCountry,
          separateDialCode,
        );
        const newCaretPos = translateCursorPosition(
          relevantCharsBeforeCaret,
          formattedValue,
          currentCaretPos,
          isDeleteForwards,
        );
        // Preserve user's numeral set in displayed value
        this.#setTelInputValue(formattedValue);
        // WARNING: calling setSelectionRange triggers a focus on iOS
        this.#ui.telInput.setSelectionRange(newCaretPos, newCaretPos);
      }

      //* If separateDialCode AND typed dial code (e.g. from paste or autofill), remove typed dial code.
      if (
        separateDialCode &&
        inputValue.startsWith("+") &&
        this.#selectedCountry?.dialCode
      ) {
        const cleanNumber = beforeSetNumber(
          inputValue,
          true,
          separateDialCode,
          this.#selectedCountry,
        );
        this.#setTelInputValue(cleanNumber);
      }
    };
    //* This handles individual key presses as well as cut/paste events
    //* the advantage of the "input" event over "keyup" etc is that "input" only fires when the value changes,
    //* whereas "keyup" fires even for shift key, arrow key presses etc.
    this.#ui.telInput.addEventListener(
      "input",
      handleInputEvent as EventListener,
      {
        signal: this.#abortController!.signal,
      },
    );
  }

  #maybeBindKeydownListener(): void {
    const { strictMode, separateDialCode, allowDropdown, countrySearch } =
      this.#options;
    if (!strictMode && !separateDialCode) {
      return;
    }

    //* On keydown event: (1) if strictMode then prevent invalid characters, (2) if separateDialCode then handle plus key
    //* Note that this fires BEFORE the input is updated.
    const handleKeydownEvent = (e: KeyboardEvent): void => {
      //* Only interested in actual character presses, rather than ctrl, alt, command, arrow keys, delete/backspace, cut/copy/paste etc.
      if (!e.key || e.key.length !== 1 || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      //* If separateDialCode, handle the plus key differently: open dropdown and put plus in the search input instead.
      if (separateDialCode && allowDropdown && countrySearch && e.key === "+") {
        e.preventDefault();
        this.#openDropdownWithPlus();
        return;
      }
      //* If strictMode, prevent invalid characters.
      if (!strictMode) {
        return;
      }

      const inputValue = this.#getTelInputValue();
      const alreadyHasPlus = inputValue.startsWith("+");
      const isInitialPlus =
        !alreadyHasPlus &&
        this.#ui.telInput.selectionStart === 0 &&
        e.key === "+";
      // note that we normalise numerals here so this numerics check works, but then later we continue using the original e.key value
      const normalisedKey = this.#numerals.normalise(e.key);
      const isNumeric = /^[0-9]$/.test(normalisedKey);
      const isAllowedChar = separateDialCode
        ? isNumeric
        : isInitialPlus || isNumeric;

      // insert the new character in the right place
      const input = this.#ui.telInput;
      const selStart = input.selectionStart;
      const selEnd = input.selectionEnd;
      const before = inputValue.slice(0, selStart ?? undefined);
      const after = inputValue.slice(selEnd ?? undefined);
      const newValue = before + e.key + after;
      const newFullNumber = this.#getFullNumber(newValue);

      let hasExceededMaxLength = false;
      if (intlTelInput.utils && this.#maxCoreNumberLength) {
        const coreNumber = intlTelInput.utils.getCoreNumber(
          newFullNumber,
          this.#selectedCountry?.iso2,
        );
        hasExceededMaxLength = coreNumber.length > this.#maxCoreNumberLength;
      }

      const newCountry = this.#getNewCountryFromNumber(newFullNumber);
      const isChangingDialCode = newCountry !== null;

      // ignore the char if (1) it's not an allowed char, or (2) this new char will exceed the max length and this char will not change the selected country and it's not the initial plus (aka they're starting to type a dial code)
      if (
        !isAllowedChar ||
        (hasExceededMaxLength && !isChangingDialCode && !isInitialPlus)
      ) {
        e.preventDefault();
      }
    };
    this.#ui.telInput.addEventListener("keydown", handleKeydownEvent, {
      signal: this.#abortController!.signal,
    });
  }

  #maybeBindPasteListener(): void {
    // Sanitise pasted values in strictMode
    if (!this.#options.strictMode) {
      return;
    }

    const handlePasteEvent = (e: ClipboardEvent): void => {
      // in strict mode we always control the pasted value
      e.preventDefault();

      // shortcuts
      const input = this.#ui.telInput;
      const selStart = input.selectionStart;
      const selEnd = input.selectionEnd;
      const inputValue = this.#getTelInputValue();
      const before = inputValue.slice(0, selStart ?? undefined);
      const after = inputValue.slice(selEnd ?? undefined);
      const iso2 = this.#selectedCountry?.iso2;

      const pastedRaw = e.clipboardData!.getData("text");
      const pasted = this.#numerals.normalise(pastedRaw);
      // only allow a plus in the pasted content if there's not already one in the input, or the existing one is selected to be replaced by the pasted content
      const initialCharSelected = selStart === 0 && selEnd! > 0;
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
      if (newVal.length > 5 && intlTelInput.utils) {
        let coreNumber = intlTelInput.utils!.getCoreNumber(newVal, iso2);

        // utils.getCoreNumber returns empty string for very long numbers
        // if this is the case, keep trimming the new value until we have a valid core number (or nothing left)
        while (coreNumber.length === 0 && newVal.length > 0) {
          newVal = newVal.slice(0, -1);
          coreNumber = intlTelInput.utils!.getCoreNumber(newVal, iso2);
        }
        // if no valid core number can be found, then just ignore the paste
        if (!coreNumber) {
          return;
        }
        if (
          this.#maxCoreNumberLength &&
          coreNumber.length > this.#maxCoreNumberLength
        ) {
          if (input.selectionEnd === inputValue.length) {
            // if they try to paste too many digits at the end, then just trim the excess
            const trimLength = coreNumber.length - this.#maxCoreNumberLength;
            newVal = newVal.slice(0, newVal.length - trimLength);
          } else {
            // if they try to paste too many digits in the middle, then just ignore the paste entirely
            return;
          }
        }
      }
      // preserve pasted numeral set in display
      this.#setTelInputValue(newVal);
      const caretPos = selStart! + sanitised.length;
      input.setSelectionRange(caretPos, caretPos);

      // trigger format-as-you-type and country update etc
      input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    };
    this.#ui.telInput.addEventListener("paste", handlePasteEvent, {
      signal: this.#abortController!.signal,
    });
  }

  //* Adhere to the input's maxlength attr.
  #truncateToMaxLength(number: string): string {
    const max = Number(this.#ui.telInput.getAttribute("maxlength"));
    return max && number.length > max ? number.substring(0, max) : number;
  }

  //* Trigger a custom event on the input (typed via ItiEventMap).
  #dispatchEvent<K extends keyof ItiEventMap>(
    name: K,
    detailProps: ItiEventMap[K] = {} as ItiEventMap[K],
  ): void {
    const e = new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail: detailProps,
    });
    this.#ui.telInput.dispatchEvent(e);
  }

  //* Open the dropdown.
  #openDropdown(): void {
    this.#ui.openDropdown(
      (li) => this.#selectListItem(li),
      () => this.#closeDropdown(),
    );
    this.#dispatchEvent(EVENTS.OPEN_COUNTRY_DROPDOWN);
  }

  //* Update the input's value to the given val (format first if possible)
  //* NOTE: this is called from setInitialState, handleUtils and setNumber.
  #updateValFromNumber(fullNumber: string): void {
    const { formatOnDisplay, nationalMode, separateDialCode } = this.#options;
    let number = fullNumber;
    if (formatOnDisplay && intlTelInput.utils && this.#selectedCountry) {
      const isRegionless = hasRegionlessDialCode(fullNumber);
      const useNational =
        (nationalMode && !isRegionless) ||
        (!number.startsWith("+") && !separateDialCode);
      const { NATIONAL, INTERNATIONAL } = intlTelInput.utils.numberFormat;
      const format = useNational ? NATIONAL : INTERNATIONAL;
      number = intlTelInput.utils.formatNumber(
        number,
        this.#selectedCountry?.iso2,
        format,
      );
    }

    number = this.#prepareNumberForInput(number);
    this.#setTelInputValue(number);
  }

  //* Check if need to select a new country based on the given number
  //* Note: called from setInitialState, keyup handler, setNumber.
  #updateCountryFromNumber(fullNumber: string): boolean {
    const iso2 = this.#getNewCountryFromNumber(fullNumber);
    if (iso2 !== null) {
      return this.#setCountry(iso2);
    }
    return false;
  }

  // if there is a selected country, and the number doesn't start with a dial code, then add it
  #ensureHasDialCode(number: string): string {
    const dialCode = this.#selectedCountry?.dialCode;
    const nationalPrefix = this.#selectedCountry?.nationalPrefix;
    const alreadyHasPlus = number.startsWith("+");
    if (alreadyHasPlus || !dialCode) {
      return number;
    }
    //* Don't remove "nationalPrefix" digit if separateDialCode is enabled, as it can be part of a valid area code e.g. in Russia then have area codes starting with 8, which is also the national prefix digit.
    const hasPrefix =
      nationalPrefix &&
      number.startsWith(nationalPrefix) &&
      !this.#options.separateDialCode;
    const cleanNumber = hasPrefix ? number.substring(1) : number;
    return `+${dialCode}${cleanNumber}`;
  }

  //* Get the new country based on the input number, or return null if no change, or empty string if should be empty (e.g. if they type an invalid dial code).
  #getNewCountryFromNumber(fullNumber: string): Iso2 | "" | null {
    const plusIndex = fullNumber.indexOf("+");
    //* If it contains a plus, discard any chars before it e.g. accidental space char.
    //* This keeps the selected country auto-updating correctly, which we want as
    //* libphonenumber's validation/getNumber methods will ignore these chars anyway.
    let number = plusIndex > 0 ? fullNumber.substring(plusIndex) : fullNumber;
    const selectedIso2 = this.#selectedCountry?.iso2;
    const selectedDialCode = this.#selectedCountry?.dialCode;

    //* Ensure the number starts with the dial code (if there is a selected country), for getDialCode to work properly (e.g. if number is entered in national format, or with separateDialCode enabled)
    number = this.#ensureHasDialCode(number);

    //* Try and extract valid dial code (plus area code digits) from input.
    const dialCodeMatch = this.#getDialCode(number, true);
    const numeric = getNumeric(number);
    if (dialCodeMatch) {
      // we have a match, so we WILL be selecting a country (unless it's already selected)
      const dialCodeMatchNumeric = getNumeric(dialCodeMatch);
      const iso2Codes = this.#dialCodeToIso2Map[dialCodeMatchNumeric];

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

      //* If they've just typed a dial code (from empty state), and it matches the last selected country (this.defaultCountryIso2), then stick to that country e.g. if they select Aland Islands, then type it's dial code +358, we should stick to that country and not switch to Finland!
      if (
        !selectedIso2 &&
        this.#defaultCountryIso2 &&
        iso2Codes.includes(this.#defaultCountryIso2)
      ) {
        return this.#defaultCountryIso2;
      }

      // if they're typing a regionless NANP number and they already have a NANP country selected, then don't change the country
      const isRegionlessNanpNumber =
        selectedDialCode === DIAL.NANP && isRegionlessNanp(numeric);
      if (isRegionlessNanpNumber) {
        return null;
      }

      // if the currently selected country has area codes and the entered number already has a full match to one of them, then don't change the country
      const areaCodes = this.#selectedCountry?.areaCodes;
      const priority = this.#selectedCountry?.priority;
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
      const currentDial = this.#selectedCountry?.dialCode || "";
      if (currentDial && currentDial.startsWith(numeric)) {
        return null;
      }
      //* Invalid dial code (or prefix of a different country), so empty.
      return "";
    } else if (
      (!number || number === "+") &&
      !selectedIso2 &&
      this.#defaultCountryIso2
    ) {
      //* If no selected country, and user either clears the input, or just types a plus, then show default.
      return this.#defaultCountryIso2;
    }
    return null;
  }

  //* Update the selected country, dial code (if separateDialCode), placeholder, title, and selected list item.
  //* Note: called from setInitialState, updateCountryFromNumber, selectListItem, setCountry.
  #setCountry(iso2: Iso2 | ""): boolean {
    const prevIso2 = this.#selectedCountry?.iso2 || "";

    this.#selectedCountry = iso2
      ? (this.#countryByIso2.get(iso2) as Country)
      : null;

    //* Update the defaultCountryIso2 - we only need the iso2 from now on, so just store that.
    if (this.#selectedCountry) {
      this.#defaultCountryIso2 = this.#selectedCountry.iso2;
    }

    this.#ui.setCountry(this.#selectedCountry);

    //* Update the input's placeholder.
    this.#updatePlaceholder();

    //* Update the maximum valid number length.
    this.#updateMaxLength();

    //* Return if the country has changed or not.
    return prevIso2 !== iso2;
  }

  //* Update the maximum valid number length for the currently selected country.
  #updateMaxLength(): void {
    const { strictMode, placeholderNumberType, allowedNumberTypes } =
      this.#options;
    if (!strictMode || !intlTelInput.utils) {
      return;
    }

    const iso2 = this.#selectedCountry?.iso2;
    if (!iso2) {
      this.#maxCoreNumberLength = null;
      return;
    }

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
        allowedNumberTypes,
      )
    ) {
      validNumber = exampleNumber;
      exampleNumber += "0";
    }
    const coreNumber = intlTelInput.utils.getCoreNumber(validNumber, iso2);
    this.#maxCoreNumberLength = coreNumber.length;

    // hack for Belarus, because for some reason, getCoreNumber("80294911911"), aka the placeholder number, returns "294911911" (9 digits), but getCoreNumber("8029491191"), aka you're typing the penultimate digit of the placeholder number, returns "8029491191" (10 digits) and so strictMode blocks it. so we increase the max length to 10 digits to allow this penultimate digit, and then when they type the final digit, getCoreNumber will return 9 digits again, so it will be fine.
    if (iso2 === "by") {
      this.#maxCoreNumberLength = coreNumber.length + 1;
    }
  }

  //* Update the input placeholder to an example number from the currently selected country.
  #updatePlaceholder(): void {
    const {
      autoPlaceholder,
      placeholderNumberType,
      nationalMode,
      customPlaceholder,
    } = this.#options;
    const shouldSetPlaceholder =
      autoPlaceholder === PLACEHOLDER_MODES.AGGRESSIVE ||
      (!this.#ui.hadInitialPlaceholder &&
        autoPlaceholder === PLACEHOLDER_MODES.POLITE);

    if (!intlTelInput.utils || !shouldSetPlaceholder) {
      return;
    }

    const numberType = intlTelInput.utils.numberType[placeholderNumberType];
    //* Note: Must set placeholder to empty string if no country selected (globe icon showing).
    let placeholder = this.#selectedCountry
      ? intlTelInput.utils.getExampleNumber(
          this.#selectedCountry.iso2,
          nationalMode,
          numberType,
        )
      : "";

    placeholder = this.#prepareNumberForInput(placeholder);
    if (typeof customPlaceholder === "function") {
      placeholder = customPlaceholder(placeholder, this.#selectedCountry);
    }
    this.#ui.telInput.setAttribute("placeholder", placeholder);
  }

  //* Called when the user selects a list item from the dropdown (no-op if listItem is null).
  #selectListItem(listItem: HTMLElement | null): void {
    if (!listItem) {
      return;
    }
    //* Update selected country and active list item.
    const iso2 = listItem.dataset[DATA_KEYS.COUNTRY_CODE] as Iso2;
    const countryChanged = this.#setCountry(iso2);
    this.#closeDropdown();

    const dialCode = listItem.dataset[DATA_KEYS.DIAL_CODE];
    this.#updateDialCode(dialCode!);

    // reformat any existing number to the new country
    if (this.#options.formatOnDisplay) {
      const inputValue = this.#getTelInputValue();
      this.#updateValFromNumber(inputValue);
    }

    //* Focus the input.
    this.#ui.telInput.focus();

    if (countryChanged) {
      this.#dispatchCountryChangeEvent();
    }
  }

  //* Close the dropdown and unbind any listeners.
  #closeDropdown(isDestroy?: boolean): void {
    // we call closeDropdown in places where it might not even be open e.g. in destroy()
    if (
      this.#ui.isDropdownClosed() ||
      (this.#options.dropdownAlwaysOpen && !isDestroy)
    ) {
      return;
    }

    this.#ui.closeDropdown();
    this.#dispatchEvent(EVENTS.CLOSE_COUNTRY_DROPDOWN);
  }

  //* Replace any existing dial code with the new one
  //* Note: called from selectListItem and setCountry
  #updateDialCode(newDialCodeBare: string): void {
    const inputVal = this.#getTelInputValue();
    if (!inputVal.startsWith("+")) {
      return;
    }

    //* There's a plus so we're dealing with a replacement.
    const newDialCode = `+${newDialCodeBare}`;
    const prevDialCode = this.#getDialCode(inputVal);
    let newNumber;
    if (prevDialCode) {
      //* Current number contains a valid dial code, so replace it.
      newNumber = inputVal.replace(prevDialCode, newDialCode);
    } else {
      //* Current number contains an invalid dial code, so ditch it
      //* (no way to determine where the invalid dial code ends and the rest of the number begins)
      newNumber = newDialCode;
    }
    this.#setTelInputValue(newNumber);
  }

  //* Try and extract a valid international dial code from a full telephone number.
  //* Note: returns the raw string inc plus character and any whitespace/dots etc.
  #getDialCode(number: string, includeAreaCode?: boolean): string {
    //* Only interested in international numbers (starting with a plus)
    if (!number.startsWith("+")) {
      return "";
    }

    let dialCode = "";
    let numericChars = "";
    let foundBaseDialCode = false;
    //* Iterate over chars
    for (let i = 0; i < number.length; i++) {
      const c = number.charAt(i);
      //* If char is not a number, skip it.
      if (!/[0-9]/.test(c)) {
        continue;
      }

      numericChars += c;
      const hasMapEntry = Boolean(this.#dialCodeToIso2Map[numericChars]);
      if (!hasMapEntry) {
        // if no mapping for this prefix, stop searching
        break;
      }

      // If we've hit a valid base dial code, record it
      if (this.#dialCodes.has(numericChars)) {
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
      if (numericChars.length === this.#dialCodeMaxLen) {
        break;
      }
    }
    return dialCode;
  }

  //* Get the input val, adding the dial code if separateDialCode is enabled.
  #getFullNumber(overrideVal?: string): string {
    const val = overrideVal
      ? this.#numerals.normalise(overrideVal)
      : this.#getTelInputValue();
    const dialCode = this.#selectedCountry?.dialCode;
    let prefix;
    const numericVal = getNumeric(val);

    if (
      this.#options.separateDialCode &&
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
  #prepareNumberForInput(fullNumber: string): string {
    const hasValidDialCode = Boolean(this.#getDialCode(fullNumber));
    const number = beforeSetNumber(
      fullNumber,
      hasValidDialCode,
      this.#options.separateDialCode,
      this.#selectedCountry,
    );
    return this.#truncateToMaxLength(number);
  }

  //* Return only the public-facing subset of the selected country data.
  #getPublicCountryData(): SelectedCountryData {
    const d = this.#selectedCountry;
    if (!d) {
      return null;
    }
    const { iso2, dialCode, name } = d;
    return { iso2, dialCode, name };
  }

  //* Dispatch the 'countrychange' event.
  #dispatchCountryChangeEvent(): void {
    const countryData = this.#getPublicCountryData();
    this.#dispatchEvent(EVENTS.COUNTRY_CHANGE, countryData);
  }

  //**************************
  //*  INTERNAL METHODS
  //**************************

  //* Called when the geoip call returns.
  #handleAutoCountry(): void {
    if (!this.#autoCountryDeferred || !intlTelInput.autoCountry) {
      return;
    }

    // If destroyed, abort any UI work but still resolve the init promise
    if (this.#destroyed) {
      this.#autoCountryDeferred.resolve();
      return;
    }

    //* We must set this even if there is an initial val in the input: in case the initial val is
    //* invalid and they delete it - they should see their auto country.
    this.#defaultCountryIso2 = intlTelInput.autoCountry;
    const hasSelectedCountryOrGlobe =
      this.#selectedCountry ||
      this.#ui.isShowingGlobe();
    //* If no country/globe currently selected, then update the country.
    if (!hasSelectedCountryOrGlobe) {
      this.setCountry(this.#defaultCountryIso2);
    }
    this.#autoCountryDeferred.resolve();
  }

  //* Called when the geoip call fails or times out.
  #handleAutoCountryFailure(): void {
    // If instance destroyed, just reject the promise and avoid DOM/state ops
    if (this.#destroyed) {
      this.#autoCountryDeferred?.reject();
      return;
    }

    //* Reset the initial state
    this.#setInitialState(true);
    this.#autoCountryDeferred?.reject();
  }

  //* Called when the utils request completes.
  #handleUtils(): void {
    // If instance destroyed, avoid touching DOM/state but still resolve promise
    if (this.#destroyed) {
      this.#utilsScriptDeferred?.resolve();
      return;
    }

    //* If the request was not successful
    if (!intlTelInput.utils) {
      this.#utilsScriptDeferred?.resolve();
      return;
    }

    const inputValue = this.#getTelInputValue();
    //* If there's an initial value in the input, then format it.
    if (inputValue) {
      this.#updateValFromNumber(inputValue);
    }
    if (this.#selectedCountry) {
      this.#updatePlaceholder();
      this.#updateMaxLength();
    }
    this.#utilsScriptDeferred?.resolve();
  }

  //* Called when the utils request fails or times out.
  #handleUtilsFailure(error: unknown): void {
    // If instance destroyed, just reject the promise and avoid DOM/state ops
    if (this.#destroyed) {
      this.#utilsScriptDeferred?.reject(error);
      return;
    }

    this.#utilsScriptDeferred?.reject(error);
  }

  //********************
  //*  PUBLIC METHODS
  //********************

  //* Remove plugin.
  public destroy(): void {
    if (this.#destroyed) {
      return;
    }
    this.#destroyed = true;

    if (this.#options.allowDropdown) {
      //* Make sure the dropdown is closed (and unbind listeners).
      this.#closeDropdown(true);
    }

    //* Abort all listeners registered via the main controller
    this.#abortController.abort();

    //* Remove all added DOM elements and classes.
    this.#ui.destroy();

    //* Remove this instance from the global registry.
    intlTelInput.instances.delete(String(this.id));
  }

  // check if the instance is still valid (not destroyed)
  public isActive(): boolean {
    return !this.#destroyed;
  }

  //* Get the extension from the current number.
  public getExtension(): string {
    if (this.#destroyed) {
      return "";
    }
    ensureUtils("getExtension");

    return intlTelInput.utils!.getExtension(
      this.#getFullNumber(),
      this.#selectedCountry?.iso2,
    );
  }

  //* Format the number to the given format.
  public getNumber(format?: number): string {
    if (this.#destroyed) {
      return "";
    }
    ensureUtils("getNumber");

    const iso2 = this.#selectedCountry?.iso2;
    const fullNumber = this.#getFullNumber();
    const formattedNumber = intlTelInput.utils!.formatNumber(
      fullNumber,
      iso2,
      format,
    );
    return this.#numerals.denormalise(formattedNumber);
  }

  //* Get the type of the entered number e.g. landline/mobile.
  public getNumberType(): number {
    if (this.#destroyed) {
      return SENTINELS.UNKNOWN_NUMBER_TYPE;
    }
    ensureUtils("getNumberType");

    return intlTelInput.utils!.getNumberType(
      this.#getFullNumber(),
      this.#selectedCountry?.iso2,
    );
  }

  //* Get the country data for the currently selected country.
  public getSelectedCountryData(): SelectedCountryData {
    return this.#getPublicCountryData();
  }

  //* Get the validation error.
  public getValidationError(): number {
    if (this.#destroyed) {
      return SENTINELS.UNKNOWN_VALIDATION_ERROR;
    }
    ensureUtils("getValidationError");

    const iso2 = this.#selectedCountry?.iso2;
    return intlTelInput.utils!.getValidationError(this.#getFullNumber(), iso2);
  }

  //* Validate the input val using number length only
  public isValidNumber(): boolean | null {
    if (this.#destroyed) {
      return null;
    }
    ensureUtils("isValidNumber");

    const dialCode = this.#selectedCountry?.dialCode;
    const iso2 = this.#selectedCountry?.iso2;
    const number = this.#getFullNumber();
    const coreNumber = intlTelInput.utils!.getCoreNumber(number, iso2);
    if (coreNumber) {
      // custom validation for UK mobile numbers - useful when allowedNumberTypes=["MOBILE", "FIXED_LINE"], where UK fixed_line numbers can be much shorter than mobile numbers
      if (dialCode === UK.DIAL_CODE) {
        // UK mobile numbers (starting with a 7) must have a core number that is 10 digits long (excluding dial code/national prefix)
        if (
          coreNumber[0] === UK.MOBILE_PREFIX &&
          coreNumber.length !== UK.MOBILE_CORE_LENGTH
        ) {
          return false;
        }
      }
      // Fix for NANP and similar countries: libphonenumber can auto-prepend area codes when
      // parsing local-format numbers (e.g. "2462501" for Barbados gets expanded to "2462462501"),
      // making incomplete numbers appear "possible". Detect this by comparing the digits actually
      // typed against the national number libphonenumber derived - if the derived national number
      // is longer, the library completed digits the user never typed, so the number is incomplete.
      // Skip this check for phonewords (alpha chars), since getNumeric would undercount their digits.
      const hasAlphaChar = REGEX.ALPHA_UNICODE.test(number);
      if (!hasAlphaChar && dialCode) {
        const nationalPortion = number.startsWith("+")
          ? number.slice(1 + dialCode.length)
          : number;
        const nationalDigitCount = getNumeric(nationalPortion).length;
        if (coreNumber.length > nationalDigitCount) {
          return false;
        }
      }
    }
    return this.#validateNumber(false);
  }

  //* Validate the input val with precise validation
  public isValidNumberPrecise(): boolean | null {
    if (this.#destroyed) {
      return null;
    }
    ensureUtils("isValidNumberPrecise");

    return this.#validateNumber(true);
  }

  #utilsIsPossibleNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isPossibleNumber(
          val,
          this.#selectedCountry?.iso2,
          this.#options.allowedNumberTypes,
        )
      : null;
  }

  //* Shared internal validation logic to handle alpha character extension rules.
  #validateNumber(precise: boolean): boolean | null {
    const { allowNumberExtensions, allowPhonewords } = this.#options;

    const testValidity = (s: string) =>
      precise ? this.#utilsIsValidNumber(s) : this.#utilsIsPossibleNumber(s);

    const val = this.#getFullNumber();

    // If there's no selected country, still allow validation for regionless intl numbers (e.g. +800, +808, +870, +881, +882, +883, +888, +979).
    if (!this.#selectedCountry) {
      const isRegionlessDialCode = hasRegionlessDialCode(val);
      // if first char is plus, and next 3 chars are a regionless dial code
      if (!isRegionlessDialCode) {
        return false;
      }
    }

    if (!testValidity(val)) {
      return false;
    }

    // At this point, we know LPN says the number is valid, but we need to run extra checks

    const alphaCharPosition = val.search(REGEX.ALPHA_UNICODE);
    const hasAlphaChar = alphaCharPosition > -1;
    // if there is an alpha char, we need to check if it's allowed, either as an extension or a phone word
    if (hasAlphaChar) {
      const selectedIso2 = this.#selectedCountry?.iso2;
      const hasExtension = Boolean(
        intlTelInput.utils!.getExtension(val, selectedIso2),
      );
      if (hasExtension) {
        return allowNumberExtensions;
      }
      return allowPhonewords;
    }
    return true;
  }

  #utilsIsValidNumber(val: string): boolean | null {
    return intlTelInput.utils
      ? intlTelInput.utils.isValidNumber(
          val,
          this.#selectedCountry?.iso2,
          this.#options.allowedNumberTypes,
        )
      : null;
  }

  //* Update the selected country, and update the input val accordingly.
  public setCountry(iso2: Iso2): void {
    if (this.#destroyed) {
      return;
    }
    const iso2Lower = iso2?.toLowerCase() as Iso2;
    // handle invalid iso2
    if (!isIso2(iso2Lower)) {
      throw new Error(`Invalid country code: '${iso2Lower}'`);
    }

    const currentCountry = this.#selectedCountry?.iso2;
    //* There is a country change IF: either there is a new country and it's different to the current one, OR there is no new country (i.e. globe state) and there is a current country
    const isCountryChange =
      (iso2 && iso2Lower !== currentCountry) || (!iso2 && currentCountry);
    if (!isCountryChange) {
      return;
    }

    this.#setCountry(iso2Lower);
    this.#updateDialCode(this.#selectedCountry?.dialCode || "");
    // reformat
    if (this.#options.formatOnDisplay) {
      const inputValue = this.#getTelInputValue();
      this.#updateValFromNumber(inputValue);
    }
    this.#dispatchCountryChangeEvent();
  }

  //* Set the input value and update the country.
  public setNumber(number: string): void {
    if (this.#destroyed) {
      return;
    }
    const normalisedNumber = this.#numerals.normalise(number);
    //* We must update the country first, which updates this.selectedCountry, which is used for
    //* formatting the number before displaying it.
    const countryChanged = this.#updateCountryFromNumber(normalisedNumber);
    this.#updateValFromNumber(normalisedNumber);
    if (countryChanged) {
      this.#dispatchCountryChangeEvent();
    }
    //* This is required for the React cmp to update its state correctly.
    this.#dispatchEvent(EVENTS.INPUT, { isSetNumber: true });
  }

  //* Set the placeholder number type
  public setPlaceholderNumberType(type: NumberType): void {
    if (this.#destroyed) {
      return;
    }
    this.#options.placeholderNumberType = type;
    this.#updatePlaceholder();
  }

  // Set the disabled state of the input and dropdown.
  public setDisabled(disabled: boolean): void {
    if (this.#destroyed) {
      return;
    }
    this.#ui.setDisabled(disabled);
  }

  // Set the readonly state of the input and dropdown.
  public setReadonly(readonly: boolean): void {
    if (this.#destroyed) {
      return;
    }
    this.#ui.setReadonly(readonly);
  }

  //********************
  //*  STATIC METHODS
  //********************

  // Internal instance notification used by utils/geoip loaders.
  // Kept public so module-level helpers (e.g. attachUtils) can call it, while still allowing
  // access to private instance methods.
  static forEachInstance<M extends keyof ForEachInstanceArgsMap>(
    method: M,
    ...args: ForEachInstanceArgsMap[M]
  ): void {
    const values = [...intlTelInput.instances.values()];
    const arg = args[0];

    values.forEach((instance) => {
      if (!(instance instanceof Iti)) {
        return;
      }

      switch (method) {
        case "handleUtils":
          instance.#handleUtils();
          break;
        case "handleUtilsFailure":
          instance.#handleUtilsFailure(arg);
          break;
        case "handleAutoCountry":
          instance.#handleAutoCountry();
          break;
        case "handleAutoCountryFailure":
          instance.#handleAutoCountryFailure();
          break;
      }
    });
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
        Iti.forEachInstance("handleUtils");
        return true;
      })
      .catch((error: Error) => {
        Iti.forEachInstance("handleUtilsFailure", error);
        throw error;
      });
  }
  return null;
};

interface IntlTelInputInterface {
  (input: HTMLInputElement, options?: SomeOptions): Iti;
  autoCountry?: Iso2;
  defaults: AllOptions;
  documentReady: () => boolean;
  getCountryData: () => Country[];
  getInstance: (input: HTMLInputElement) => Iti | null;
  instances: Map<string, Iti>;
  attachUtils: (source: UtilsLoader) => Promise<unknown> | null;
  startedLoadingAutoCountry: boolean;
  startedLoadingUtilsScript: boolean;
  version: string | undefined;
  utils?: ItiUtils;
}

//* Convenience wrapper.

const intlTelInput: IntlTelInputInterface = Object.assign(
  (input: HTMLInputElement, options?: SomeOptions): Iti => {
    const iti = new Iti(input, options);
    intlTelInput.instances.set(String(iti.id), iti);
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
      return id ? (intlTelInput.instances.get(id) ?? null) : null;
    },
    //* A map from instance ID to instance object.
    instances: new Map(),
    attachUtils,
    startedLoadingUtilsScript: false,
    startedLoadingAutoCountry: false,
    version: process.env.VERSION,
  },
);

export default intlTelInput;
