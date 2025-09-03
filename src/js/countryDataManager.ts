import { Country } from "./intl-tel-input/data";
import { I18n } from "./intl-tel-input/i18n/types";

// Regionless NANP numbers
const regionlessNanpNumbers = [
  "800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889",
];

//* Normalise string: turns "Réunion" into "Reunion".
//* from https://stackoverflow.com/a/37511463
const normaliseString = (s: string = ""): string => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export interface CountryProcessingOptions {
  onlyCountries: string[];
  excludeCountries: string[];
  countryOrder: string[] | null;
  i18n: I18n;
}

// CDM = CountryDataManager
export class CDM {
  countries: Country[] = [];
  dialCodes: Set<string> = new Set();
  dialCodeToIso2Map: Record<string, string[]> = {};
  dialCodeMaxLen = 0;
  countryByIso2: Map<string, Country> = new Map();

  private allCountries: Country[];

  constructor(allCountries: Country[]) {
    this.allCountries = allCountries;
  }

  prepare(options: CountryProcessingOptions): void {
    this._filterCountries(options.onlyCountries, options.excludeCountries);
    this._sortCountries(options.countryOrder);
    this._translateNames(options.i18n);
    this._processDialCodes();
    this._cacheSearchTokens();
    this._indexCountriesByIso2();
  }

  //* Extract the numeric digits from the given string.
  static getNumeric(s: string): string {
    return s.replace(/\D/g, "");
  }

  //* Check if the given number is a regionless NANP number (expects the number to contain an international dial code)
  static isRegionlessNanp(number: string): boolean {
    const numeric = CDM.getNumeric(number);
    if (numeric.charAt(0) === "1") {
      const areaCode = numeric.substring(1, 4);
      return regionlessNanpNumbers.includes(areaCode);
    }
    return false;
  }

  // Try and extract a valid international dial code from a full telephone number.
  // NOTE: returns the raw string including the leading plus and any formatting chars (spaces, dots, etc.).
  // When includeAreaCode=true, we allow temporary matches that include progressively typed area code
  // digits (so the UI can switch countries early while the user is still typing).
  getDialCode(number: string, includeAreaCode?: boolean): string {
    let dialCode = "";
    //* Only interested in international numbers (starting with a plus)
    if (number.charAt(0) === "+") {
      let numericChars = "";
      //* Iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        // isDigit check from https://stackoverflow.com/a/8935688
        const isDigit = c >= "0" && c <= "9";
        if (isDigit) {
          numericChars += c;
           //* If current numericChars make a valid dial code.
          if (includeAreaCode) {
            if (this.dialCodeToIso2Map[numericChars]) {
              //* Store the actual raw string (useful for matching later).
              dialCode = number.substring(0, i + 1);
            }
          } else if (this.dialCodes.has(numericChars)) {
            dialCode = number.substring(0, i + 1);
            //* If we're just looking for a dial code, we can break as soon as we find one.
            break;
          }
          //* Stop searching as soon as we can - in this case when we hit max len.
          if (numericChars.length === this.dialCodeMaxLen) break;
        }
      }
    }
    return dialCode;
  }

  // Ensure the provided number starts with the currently selected country's dial code.
  static ensureHasDialCode(
    number: string,
    selectedCountryData: Partial<Country>,
    separateDialCode?: boolean,
  ): string {
    const { dialCode, nationalPrefix } = selectedCountryData;
    const alreadyHasPlus = number.charAt(0) === "+";
    if (alreadyHasPlus || !dialCode) {
      return number;
    }
    //* Don't remove "nationalPrefix" digit if separateDialCode is enabled, as it can be part of a valid area code (e.g. Russia where '8' is both national prefix and the first area code digit)
    const hasPrefix = nationalPrefix && number.charAt(0) === nationalPrefix && !separateDialCode;
    const cleanNumber = hasPrefix ? number.substring(1) : number;
    return `+${dialCode}${cleanNumber}`;
  }

  // Determine the ISO2 of a new country to select based on the entered fullNumber.
  resolveNewCountryIso2(
    fullNumber: string,
    selectedCountryData: Partial<Country>,
    defaultCountry: string | undefined,
    separateDialCode: boolean,
  ): string | null {
    // Normalise input (strip anything before first '+').
    const plusIndex = fullNumber.indexOf("+");
    let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;

    // Ensure it starts with a dial code, for getDialCode to work properly, e.g. if entered in national format, or with separateDialCode enabled
    const { iso2: selectedIso2, dialCode: selectedDialCode, areaCodes } = selectedCountryData;
    number = CDM.ensureHasDialCode(number, selectedCountryData, separateDialCode);

    // Extract the (possibly partial) dial code (including area code progression) while typing.
    const dialCodeMatch = this.getDialCode(number, true);
    const numeric = CDM.getNumeric(number);

    if (dialCodeMatch) {
      const dialCodeMatchNumeric = CDM.getNumeric(dialCodeMatch);
      const iso2Codes = this.dialCodeToIso2Map[dialCodeMatchNumeric];

      //* If they've just typed a dial code (from empty state), and it matches the last selected country, then stick to that country e.g. if they select Aland Islands, then type it's dial code +358, we should stick to that country and not switch to Finland!
      if (!selectedIso2 && defaultCountry && iso2Codes.includes(defaultCountry)) {
        return defaultCountry;
      }

      //* Check if the right country is already selected (note: might be empty state - globe icon).
      // If the currently selected country has area codes, but none of them even partially matched the input number, then we need to switch to the default country for this dial code, so alreadySelected should be false
      const hasAreaCodesButNoneMatched = areaCodes && numeric.length > dialCodeMatchNumeric.length;
      const alreadySelected = selectedIso2 && iso2Codes.includes(selectedIso2) && !hasAreaCodesButNoneMatched;
      const isRegionlessNanpNumber = selectedDialCode === "1" && CDM.isRegionlessNanp(numeric);

      //* Only update the country if:
      //* A) NOT (we currently have a NANP country selected, and the number is a regionlessNanp)
      //* AND
      //* B) the right country is not already selected
      if (!isRegionlessNanpNumber && !alreadySelected) {
        //* If using onlyCountries option, iso2Codes[0] may be empty, so we must find the first non-empty index.
        for (const iso2 of iso2Codes) {
          if (iso2) return iso2;
        }
      }
    } else if (number.charAt(0) === "+" && numeric.length) {
      //* Invalid dial code, so empty.
      return "";
    } else if ((!number || number === "+") && !selectedIso2) {
      //* If no selected country, and user either clears the input, or just types a plus, then show default.
      return defaultCountry || null;
    }
    return null;
  }

  //* Process onlyCountries or excludeCountries array if present.
  private _filterCountries(only: string[], exclude: string[]): void {
    if (only.length) {
      const onlyLc = only.map(c => c.toLowerCase());
      this.countries = this.allCountries.filter(c => onlyLc.includes(c.iso2));
    }
    if (exclude.length) {
      const excludeLc = exclude.map(c => c.toLowerCase());
      this.countries = this.countries.filter(c => !excludeLc.includes(c.iso2));
    }
    this.countries = this.allCountries;
  }

  //* Sort countries by countryOrder option (if present), then name.
  private _sortCountries(countryOrder: string[] | null): void {
    //* Primary sort: countryOrder option.
    let order: string[] | null = countryOrder;
    if (order) {
      order = order.map(c => c.toLowerCase());
    }
    this.countries.sort((a, b) => {
      if (order) {
        const ai = order.indexOf(a.iso2);
        const bi = order.indexOf(b.iso2);
        const aExists = ai > -1;
        const bExists = bi > -1;
        if (aExists || bExists) {
          if (aExists && bExists) return ai - bi;
          return aExists ? -1 : 1;
        }
      }
      //* Secondary sort: country name.
      return a.name.localeCompare(b.name);
    });
  }

  //* Translate Countries by object literal provided on config.
  private _translateNames(i18n: I18n): void {
    for (const c of this.countries) {
      const iso2 = c.iso2.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(i18n, iso2)) {
        c.name = (i18n as any)[iso2];
      }
    }
  }

  //* Add a dial code to this.dialCodeToIso2Map.
  private _addToDialCodeMap(iso2: string, dialCode: string, priority?: number): void {
    //* Update dialCodeMaxLen.
    if (dialCode.length > this.dialCodeMaxLen) {
      this.dialCodeMaxLen = dialCode.length;
    }
    //* If this entry doesn't already exist, then create it.
    if (!Object.prototype.hasOwnProperty.call(this.dialCodeToIso2Map, dialCode)) {
      this.dialCodeToIso2Map[dialCode] = [];
    }
    const list = this.dialCodeToIso2Map[dialCode];
    //* Bail if we already have this country for this dialCode.
    if (list.includes(iso2)) return;
    //* Use provided priority index (can be 0), else append.
    const index = priority !== undefined ? priority : list.length;
    list[index] = iso2;
  }

  //* Generate this.dialCodes and this.dialCodeToIso2Map.
  private _processDialCodes(): void {
    //* Here we store just dial codes, where the key is the dial code, and the value is true
    //* e.g. { 1: true, 7: true, 20: true, ... }.
    this.dialCodes = new Set();

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
    this.dialCodeMaxLen = 0;

    //* First: add dial codes.
    for (const c of this.countries) {
      if (!this.dialCodes.has(c.dialCode)) this.dialCodes.add(c.dialCode);
      this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
    }

    //* Next: add area codes.
    //* This is a second loop over countries, to make sure we have all of the "root" countries
    //* already in the map, so that we can access them, as each time we add an area code substring
    //* to the map, we also need to include the "root" country's code, as that also matches.
    for (const c of this.countries) {
      if (c.areaCodes) {
        const rootIso2 = this.dialCodeToIso2Map[c.dialCode][0];
        //* For each area code.
        for (const area of c.areaCodes) {
          //* For each digit in the area code to add all partial matches as well.
          for (let k = 1; k < area.length; k++) {
            const partial = area.substring(0, k);
            const partialDial = c.dialCode + partial;
            //* Start with the root country, as that also matches this partial dial code.
            this._addToDialCodeMap(rootIso2, partialDial);
            this._addToDialCodeMap(c.iso2, partialDial);
          }
          //* Add the full area code.
          this._addToDialCodeMap(c.iso2, c.dialCode + area);
        }
      }
    }
  }

  //* Precompute and cache country search tokens to speed up filtering
  private _cacheSearchTokens(): void {
    for (const c of this.countries) {
      c.normalisedName = normaliseString(c.name);
      c.initials = c.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map(w => w[0]).join("").toLowerCase();
      c.dialCodePlus = `+${c.dialCode}`;
    }
  }

  // Hidden search (no search input): find first country whose name starts with query
  searchByNamePrefix(query: string): Country | null {
    const q = query.toLowerCase();
    for (const c of this.countries) {
      if (c.name.substring(0, q.length).toLowerCase() === q) return c;
    }
    return null;
  }

  // Full search used when search input enabled. Returns ordered array of matches.
  filter(query: string, isReset = false): Country[] {
    const normalisedQuery = normaliseString(query.trim());
    const len = normalisedQuery.length;
    if (isReset || len === 0) return [...this.countries];

    // search result groups, in order of priority
    // first, exact ISO2 matches, then name starts with, then name contains, dial code match etc.
    const iso2Matches: Country[] = [];
    const nameStartWith: Country[] = [];
    const nameContains: Country[] = [];
    const dialCodeMatches: Country[] = [];
    const dialCodeContains: Country[] = [];
    const initialsMatches: Country[] = [];

    for (const c of this.countries) {
      const normalisedName = c.normalisedName || "";
      const dialCodePlus = c.dialCodePlus || "";
      const initials = c.initials || "";
      if (c.iso2 === normalisedQuery) iso2Matches.push(c);
      else if (normalisedName.startsWith(normalisedQuery)) nameStartWith.push(c);
      else if (normalisedName.includes(normalisedQuery)) nameContains.push(c);
      else if (normalisedQuery === c.dialCode || normalisedQuery === dialCodePlus) dialCodeMatches.push(c);
      else if (dialCodePlus.includes(normalisedQuery)) dialCodeContains.push(c);
      else if (initials.includes(normalisedQuery)) initialsMatches.push(c);
    }

    const sortByPriority = (a: Country, b: Country) => (a.priority - b.priority);
    // Combine result groups in correct order (and respect country priority order within each group)
    return [
      ...iso2Matches.sort(sortByPriority),
      ...nameStartWith.sort(sortByPriority),
      ...nameContains.sort(sortByPriority),
      ...dialCodeMatches.sort(sortByPriority),
      ...dialCodeContains.sort(sortByPriority),
      ...initialsMatches.sort(sortByPriority),
    ];
  }

  //* Build quick lookup map from iso2 -> country object.
  private _indexCountriesByIso2(): void {
    this.countryByIso2 = new Map(this.countries.map(c => [c.iso2, c]));
  }
}
