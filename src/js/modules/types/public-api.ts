import type { Country, Iso2 } from "../../intl-tel-input/data";
import type { I18n } from "../../intl-tel-input/i18n/types";
// Type-only import to avoid runtime circular dependency. This is erased after compilation.
import type { Iti } from "../../intl-tel-input";
import type { PLACEHOLDER_MODES } from "../constants";

// Loader for the utils module
export type UtilsLoader = () => Promise<{ default: ItiUtils }>;

// Library utilities (loaded lazily)
export type ItiUtils = {
  formatNumber(
    number: string,
    iso2: string | undefined,
    format?: number
  ): string;
  formatNumberAsYouType(number: string, iso2: string | undefined): string;
  getCoreNumber(number: string, iso2: string | undefined): string;
  getExampleNumber(
    iso2: string | undefined,
    nationalMode: boolean,
    numberType: number,
    useE164?: boolean
  ): string;
  getExtension(number: string, iso2: string | undefined): string;
  getNumberType(number: string, iso2: string | undefined): number;
  getValidationError(number: string, iso2: string | undefined): number;
  isPossibleNumber(
    number: string,
    iso2: string | undefined,
    numberType?: NumberType[] | null
  ): boolean;
  isValidNumber(
    number: string,
    iso2: string | undefined,
    numberType?: NumberType[] | null
  ): boolean;
  numberFormat: {
    NATIONAL: number;
    INTERNATIONAL: number;
    E164: number;
    RFC3966: number;
  };
  numberType: Record<string, number>;
};

// Number types exposed publicly
export type NumberType =
  | "FIXED_LINE_OR_MOBILE"
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

type ValueOf<T> = T[keyof T];

// All configurable options
export interface AllOptions {
  allowDropdown: boolean;
  allowPhonewords: boolean;
  autoPlaceholder: ValueOf<typeof PLACEHOLDER_MODES>;
  containerClass: string;
  countryOrder: Iso2[] | null;
  countrySearch: boolean;
  customPlaceholder:
    | ((
        selectedCountryPlaceholder: string,
        selectedCountryData: SelectedCountryData
      ) => string)
    | null;
  dropdownContainer: HTMLElement | null;
  excludeCountries: Iso2[];
  fixDropdownWidth: boolean;
  formatAsYouType: boolean;
  formatOnDisplay: boolean;
  geoIpLookup:
    | ((success: (iso2: Iso2) => void, failure: () => void) => void)
    | null;
  hiddenInput:
    | ((telInputName: string) => { phone: string; country?: string })
    | null;
  i18n: I18n;
  initialCountry: Iso2 | "auto" | "";
  loadUtils: UtilsLoader | null;
  nationalMode: boolean;
  onlyCountries: Iso2[];
  placeholderNumberType: NumberType;
  showFlags: boolean;
  separateDialCode: boolean;
  strictMode: boolean;
  useFullscreenPopup: boolean;
  validationNumberTypes: NumberType[] | null;
}

// Partial options accepted by the factory
export type SomeOptions = Partial<AllOptions>;

// Public interface for the factory function (kept here for consumers)
export interface IntlTelInputInterface {
  (input: HTMLInputElement, options?: SomeOptions): Iti;
  autoCountry?: Iso2;
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

// A discriminated union for when there may be no selected country yet.
// - When selected: it's a full Country (iso2 is present)
// - When none selected: it's an empty object literal (iso2 is absent)
type EmptyObject = Record<string, never>;
export type SelectedCountryData = Country | EmptyObject;
