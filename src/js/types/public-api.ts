import type { Country, Iso2 } from "../data.js";
import type { I18n } from "../i18n/types.js";
import type { NUMBER_TYPE_SET, PLACEHOLDER_MODES } from "../constants.js";

// Loader for the utils module
export type UtilsLoader = () => Promise<{ default: ItiUtils }>;

// Library utils (loaded lazily)
export type ItiUtils = {
  formatNumber(
    number: string,
    iso2: string | undefined,
    format?: number,
  ): string;
  formatNumberAsYouType(number: string, iso2: string | undefined): string;
  getCoreNumber(number: string, iso2: string | undefined): string;
  getExampleNumber(
    iso2: string | undefined,
    nationalMode: boolean,
    numberType: number,
    useE164?: boolean,
  ): string;
  getExtension(number: string, iso2: string | undefined): string;
  getNumberType(number: string, iso2: string | undefined): number;
  getValidationError(number: string, iso2: string | undefined): number;
  isPossibleNumber(
    number: string,
    iso2: string | undefined,
    numberType?: NumberType[] | null,
  ): boolean;
  isValidNumber(
    number: string,
    iso2: string | undefined,
    numberType?: NumberType[] | null,
  ): boolean;
  numberFormat: {
    NATIONAL: number;
    INTERNATIONAL: number;
    E164: number;
    RFC3966: number;
  };
  numberType: {
    [key: string]: number;
    FIXED_LINE: number;
    MOBILE: number;
    FIXED_LINE_OR_MOBILE: number;
    TOLL_FREE: number;
    PREMIUM_RATE: number;
    SHARED_COST: number;
    VOIP: number;
    PERSONAL_NUMBER: number;
    PAGER: number;
    UAN: number;
    VOICEMAIL: number;
    UNKNOWN: number;
  };
  validationError: {
    IS_POSSIBLE: number;
    INVALID_COUNTRY_CODE: number;
    TOO_SHORT: number;
    TOO_LONG: number;
    IS_POSSIBLE_LOCAL_ONLY: number;
    INVALID_LENGTH: number;
  };
};

// Exported to match the dist public surface: dts-bundle-generator hoists
// these utility types to the top level of dist/js/intlTelInput.d.ts because
// NumberType / AllOptions reference them, so they're already visible to
// consumers. Mirror that here so source-path resolution sees the same set.
export type SetValues<T> = T extends ReadonlySet<infer U> ? U : never;

export type NumberType = SetValues<typeof NUMBER_TYPE_SET>;

export type ValueOf<T> = T[keyof T];

// All configurable options
export interface AllOptions {
  allowDropdown: boolean;
  allowedNumberTypes: NumberType[] | null;
  allowNumberExtensions: boolean;
  allowPhonewords: boolean;
  autoPlaceholder: ValueOf<typeof PLACEHOLDER_MODES>;
  containerClass: string;
  countryNameLocale: string;
  countryNameOverrides: Partial<Record<Iso2, string>>;
  countryOrder: Iso2[] | null;
  countrySearch: boolean;
  customPlaceholder:
    | ((
        selectedCountryPlaceholder: string,
        selectedCountryData: SelectedCountryData,
      ) => string)
    | null;
  dropdownAlwaysOpen: boolean;
  dropdownContainer: HTMLElement | null;
  excludeCountries: Iso2[] | null;
  fixDropdownWidth: boolean;
  formatAsYouType: boolean;
  formatOnDisplay: boolean;
  geoIpLookup: (() => Promise<Iso2>) | null;
  hiddenInput:
    | ((telInputName: string) => { phone: string; country?: string })
    | null;
  i18n: I18n;
  initialCountry: Iso2 | "auto" | "";
  loadUtils: UtilsLoader | null;
  nationalMode: boolean;
  onlyCountries: Iso2[] | null;
  placeholderNumberType: NumberType;
  searchInputClass: string;
  separateDialCode: boolean;
  strictRejectAnimation: boolean;
  showFlags: boolean;
  strictMode: boolean;
  useFullscreenPopup: boolean;
}

// Partial options accepted by the factory
export type SomeOptions = Partial<AllOptions>;

// The public-facing subset of Country exposed via getSelectedCountryData and events.
export type SelectedCountryData = Pick<
  Country,
  "iso2" | "dialCode" | "name"
> | null;
