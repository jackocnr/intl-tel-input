import type { Country, Iso2 } from "../data.js";
import type { UiTranslations } from "../locale/types.js";
import type {
  NUMBER_FORMATS,
  NUMBER_TYPES,
  PLACEHOLDER_POLICY,
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
    numberType: NumberType,
    format: NumberFormat,
  ): string;
  getExtension(number: string, iso2: string | undefined): string;
  getNumberType(number: string, iso2: string | undefined): NumberType | null;
  getValidationError(
    number: string,
    iso2: string | undefined,
  ): ValidationError | null;
  isValidNumber(
    number: string,
    iso2: string | undefined,
    numberType?: NumberType[] | null,
  ): boolean;
  isValidNumberPrecise(
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

export type CountrySelectorMode = "OFF" | "DROPDOWN" | "FULLSCREEN" | "AUTO";

// All configurable options
export interface AllOptions {
  countrySelectorMode: CountrySelectorMode;
  allowedNumberTypes: NumberType[] | null;
  allowNumberExtensions: boolean;
  allowPhonewords: boolean;
  containerClass: string;
  countryNameLocale: string;
  countryNameOverrides: Partial<Record<Iso2, string>>;
  countryOrder: Iso2[] | null;
  countrySearch: boolean;
  customPlaceholder:
    | ((
        exampleNumber: string,
        selectedCountry: SelectedCountry,
      ) => string)
    | null;
  dropdownAlwaysOpen: boolean;
  dropdownParent: HTMLElement | null;
  excludeCountries: Iso2[] | null;
  matchDropdownWidth: boolean;
  formatAsYouType: boolean;
  hiddenInputs:
    | ((telInputName: string) => { phone: string; country?: string })
    | null;
  uiTranslations: UiTranslations;
  initialCountry: Iso2 | "";
  initialCountryLookup: (() => Promise<Iso2>) | null;
  loadUtils: UtilsLoader | null;
  numberDisplayFormat: Exclude<NumberFormat, "RFC3966">;
  onlyCountries: Iso2[] | null;
  placeholderNumberPolicy: ValueOf<typeof PLACEHOLDER_POLICY>;
  placeholderNumberType: NumberType;
  searchInputClass: string;
  separateDialCode: boolean;
  strictRejectAnimation: boolean;
  showFlags: boolean;
  strictMode: boolean;
}

// Partial options accepted by the factory
export type SomeOptions = Partial<AllOptions>;

// Exposed via getSelectedCountry and events. Null when no country is selected.
export type SelectedCountry = Country | null;
