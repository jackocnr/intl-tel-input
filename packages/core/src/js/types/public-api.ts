import type { Country, Iso2 } from "../data.js";
import type { I18n } from "../i18n/types.js";
import type {
  NUMBER_FORMATS,
  NUMBER_TYPES,
  PLACEHOLDER_MODES,
  VALIDATION_ERRORS,
} from "../constants.js";

// Loader for the utils module
export type UtilsLoader = () => Promise<{ default: ItiUtils }>;

// Library utils (loaded lazily)
export type ItiUtils = {
  formatNumber(
    number: string,
    iso2: string | undefined,
    format?: NumberFormat,
  ): string;
  formatNumberAsYouType(number: string, iso2: string | undefined): string;
  getCoreNumber(number: string, iso2: string | undefined): string;
  getExampleNumber(
    iso2: string | undefined,
    nationalMode: boolean,
    numberType: NumberType,
    useE164?: boolean,
  ): string;
  getExtension(number: string, iso2: string | undefined): string;
  getNumberType(number: string, iso2: string | undefined): NumberType | null;
  getValidationError(
    number: string,
    iso2: string | undefined,
  ): ValidationError | null;
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
};

// Exported to match the dist public surface: dts-bundle-generator hoists
// these utility types to the top level of dist/js/intlTelInput.d.ts because
// NumberType / AllOptions reference them, so they're already visible to
// consumers. Mirror that here so source-path resolution sees the same set.
export type ArrayValues<T extends readonly unknown[]> = T[number];

export type NumberFormat = ArrayValues<typeof NUMBER_FORMATS>;
export type NumberType = ArrayValues<typeof NUMBER_TYPES>;
export type ValidationError = ArrayValues<typeof VALIDATION_ERRORS>;

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

// Exposed via getSelectedCountryData and events. Null when no country is selected.
export type SelectedCountryData = Country | null;
