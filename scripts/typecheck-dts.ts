// Consumer-style smoke test for the generated .d.ts files.
// Imports every public symbol via the package's `exports` map (resolved by
// `paths` in scripts/tsconfig.typecheck-dts.json) and uses each one, so
// `tsc --noEmit` fails if an entry-point is missing, a public type was
// renamed/removed, or a shape has drifted.
//
// Run via: npm run typecheck:dts

import intlTelInput, {
  Iti,
  type AllOptions,
  type Country,
  type ForEachInstanceArgsMap,
  type I18n,
  type IntlTelInputInterface,
  type Iso2,
  type ItiUtils,
  type NumberType,
  type SelectedCountryData,
  type SomeOptions,
  type UtilsLoader,
} from "intl-tel-input";

import utils from "intl-tel-input/utils";
import { isIso2, iso2Set, rawCountryData } from "intl-tel-input/data";
import { de, en, fr } from "intl-tel-input/i18n";
import styles from "intl-tel-input/styles";

const input: HTMLInputElement = document.createElement("input");
const options: SomeOptions = { initialCountry: "gb", separateDialCode: true };
const iti: Iti = intlTelInput(input, options);
const selected: SelectedCountryData = iti.getSelectedCountryData();
void selected;

const iface: IntlTelInputInterface = intlTelInput;
const defaults: AllOptions = iface.defaults;
void defaults;
const loader: UtilsLoader = () => import("intl-tel-input/utils");
void iface.attachUtils(loader);
void iface.getInstance(input);

const _IsoCheck: Iso2 = "gb";
void _IsoCheck;
const _knownIso: boolean = isIso2("gb");
void _knownIso;
const _set: Set<Iso2> = iso2Set;
void _set;
const _firstCountryIso: Iso2 = rawCountryData[0][0];
void _firstCountryIso;

const _countryShape: Country = {
  iso2: "gb",
  dialCode: "44",
  dialCodePlus: "+44",
  priority: 0,
  areaCodes: null,
  nationalPrefix: null,
  name: "United Kingdom",
  normalisedName: "united kingdom",
  initials: "UK",
};
void _countryShape;

const _translations: I18n = { ...en, ...de, ...fr };
void _translations;

const _numberType: NumberType = "MOBILE";
void _numberType;

const _forEachArgs: ForEachInstanceArgsMap = {} as ForEachInstanceArgsMap;
void _forEachArgs;

const _utils: ItiUtils = utils;
void _utils;

const _class: typeof Iti = Iti;
void _class;

const _styles: string = styles;
void _styles;

export {};
