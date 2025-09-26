import allCountries, { Country, Iso2 } from "../../intl-tel-input/data";
import { normaliseString } from "../utils/string";
import type { AllOptions } from "../types/public-api";

export interface DialCodeProcessingResult {
  dialCodes: Set<string>;
  dialCodeMaxLen: number;
  dialCodeToIso2Map: Record<string, Iso2[]>;
}

//* Process onlyCountries or excludeCountries array if present.
export const processAllCountries = (options: AllOptions): Country[] => {
  const { onlyCountries, excludeCountries } = options;
  if (onlyCountries.length) {
    const lowerCaseOnlyCountries = onlyCountries.map((country) =>
      country.toLowerCase(),
    );
    return allCountries.filter((country) =>
      lowerCaseOnlyCountries.includes(country.iso2),
    );
  } else if (excludeCountries.length) {
    const lowerCaseExcludeCountries = excludeCountries.map((country) =>
      country.toLowerCase(),
    );
    return allCountries.filter(
      (country) => !lowerCaseExcludeCountries.includes(country.iso2),
    );
  }
  return allCountries;
};

//* Translate Countries by object literal provided on config.
export const translateCountryNames = (
  countries: Country[],
  options: AllOptions,
): void => {
  for (const c of countries) {
    const iso2 = c.iso2.toLowerCase();
    if (options.i18n[iso2]) {
      c.name = options.i18n[iso2];
    }
  }
};

//* Generate dialCodes and dialCodeToIso2Map.
export const processDialCodes = (
  countries: Country[],
  options: AllOptions,
): DialCodeProcessingResult => {
  //* Here we store just dial codes, where the key is the dial code, and the value is true
  //* e.g. { 1: true, 7: true, 20: true, ... }.
  const dialCodes = new Set<string>();
  let dialCodeMaxLen = 0;

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
  const dialCodeToIso2Map: Record<string, Iso2[]> = {};

  //* Add a dial code to this.dialCodeToIso2Map.
  const _addToDialCodeMap = (
    iso2: Iso2,
    dialCode: string,
    priority?: number,
  ) => {
    // Bail if no iso2 or dialCode (this can happen with onlyCountries or excludeCountries options).
    if (!iso2 || !dialCode) {
      return;
    }
    //* Update dialCodeMaxLen.
    if (dialCode.length > dialCodeMaxLen) {
      dialCodeMaxLen = dialCode.length;
    }
    //* If this entry doesn't already exist, then create it.
    if (!dialCodeToIso2Map.hasOwnProperty(dialCode)) {
      dialCodeToIso2Map[dialCode] = [];
    }
    const iso2List = dialCodeToIso2Map[dialCode];
    //* Bail if we already have this country for this dialCode.
    if (iso2List.includes(iso2)) {
      return;
    }
    //* Use provided priority index (can be 0), else append.
    const index = priority !== undefined ? priority : iso2List.length;
    iso2List[index] = iso2;
  };

  //* First: add dial codes.
  for (const c of countries) {
    if (!dialCodes.has(c.dialCode)) {
      dialCodes.add(c.dialCode);
    }
    // add the dial code partial matches to the map
    for (let k = 1; k < c.dialCode.length; k++) {
      const partialDialCode = c.dialCode.substring(0, k);
      _addToDialCodeMap(c.iso2, partialDialCode);
    }
    // add the full dial code to the map
    _addToDialCodeMap(c.iso2, c.dialCode, c.priority);
  }
  // if any countries have been excluded, cleanup empty array entries in dialCodeToIso2Map due to the use of c.priority to insert at specific indexes
  if (options.onlyCountries.length || options.excludeCountries.length) {
    dialCodes.forEach((dialCode) => {
      dialCodeToIso2Map[dialCode] = dialCodeToIso2Map[dialCode].filter(Boolean);
    });
  }

  //* Next: add area codes.
  //* This is a second loop over countries, to make sure we have all of the "root" countries
  //* already in the map, so that we can access them, as each time we add an area code substring
  //* to the map, we also need to include the "root" country's code, as that also matches.
  for (const c of countries) {
    //* Area codes
    if (c.areaCodes) {
      const rootIso2Code = dialCodeToIso2Map[c.dialCode][0];
      //* For each area code.
      for (const areaCode of c.areaCodes) {
        //* For each digit in the area code to add all partial matches as well.
        for (let k = 1; k < areaCode.length; k++) {
          const partialAreaCode = areaCode.substring(0, k);
          const partialDialCode = c.dialCode + partialAreaCode;
          //* Start with the root country, as that also matches this partial dial code.
          _addToDialCodeMap(rootIso2Code, partialDialCode);
          _addToDialCodeMap(c.iso2, partialDialCode);
        }
        //* Add the full area code.
        _addToDialCodeMap(c.iso2, c.dialCode + areaCode);
      }
    }
  }

  return { dialCodes, dialCodeMaxLen, dialCodeToIso2Map };
};

//* Sort countries by countryOrder option (if present), then name.
export const sortCountries = (
  countries: Country[],
  options: AllOptions,
): void => {
  if (options.countryOrder) {
    options.countryOrder = options.countryOrder.map(
      (iso2) => iso2.toLowerCase() as Iso2,
    );
  }
  countries.sort((a: Country, b: Country): number => {
    //* Primary sort: countryOrder option
    const { countryOrder } = options;
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

    //* Secondary sort: country name
    return a.name.localeCompare(b.name);
  });
};

//* Precompute and cache country search tokens to speed up filtering
export const cacheSearchTokens = (countries: Country[]): void => {
  for (const c of countries) {
    // Normalised name (lowercase, accents removed etc)
    c.normalisedName = normaliseString(c.name);
    // Name initials (first letter of each alpha sequence)
    c.initials = c.normalisedName
      .split(/[^a-z]/)
      .map((word) => word[0])
      .join("");
    // Cached +dialCode variant
    c.dialCodePlus = `+${c.dialCode}`;
  }
};
