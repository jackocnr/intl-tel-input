var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// react-native/src/intl-tel-input/react-native.tsx
var react_native_exports = {};
__export(react_native_exports, {
  default: () => react_native_default,
  intlTelInput: () => intl_tel_input_default
});
module.exports = __toCommonJS(react_native_exports);

// src/js/intl-tel-input/data.ts
var rawCountryData = [
  [
    "af",
    // Afghanistan
    "93"
  ],
  [
    "ax",
    // Åland Islands
    "358",
    1
  ],
  [
    "al",
    // Albania
    "355"
  ],
  [
    "dz",
    // Algeria
    "213"
  ],
  [
    "as",
    // American Samoa
    "1",
    5,
    ["684"]
  ],
  [
    "ad",
    // Andorra
    "376"
  ],
  [
    "ao",
    // Angola
    "244"
  ],
  [
    "ai",
    // Anguilla
    "1",
    6,
    ["264"]
  ],
  [
    "ag",
    // Antigua and Barbuda
    "1",
    7,
    ["268"]
  ],
  [
    "ar",
    // Argentina
    "54"
  ],
  [
    "am",
    // Armenia
    "374"
  ],
  [
    "aw",
    // Aruba
    "297"
  ],
  [
    "ac",
    // Ascension Island
    "247"
  ],
  [
    "au",
    // Australia
    "61",
    0,
    null,
    "0"
  ],
  [
    "at",
    // Austria
    "43"
  ],
  [
    "az",
    // Azerbaijan
    "994"
  ],
  [
    "bs",
    // Bahamas
    "1",
    8,
    ["242"]
  ],
  [
    "bh",
    // Bahrain
    "973"
  ],
  [
    "bd",
    // Bangladesh
    "880"
  ],
  [
    "bb",
    // Barbados
    "1",
    9,
    ["246"]
  ],
  [
    "by",
    // Belarus
    "375"
  ],
  [
    "be",
    // Belgium
    "32"
  ],
  [
    "bz",
    // Belize
    "501"
  ],
  [
    "bj",
    // Benin
    "229"
  ],
  [
    "bm",
    // Bermuda
    "1",
    10,
    ["441"]
  ],
  [
    "bt",
    // Bhutan
    "975"
  ],
  [
    "bo",
    // Bolivia
    "591"
  ],
  [
    "ba",
    // Bosnia and Herzegovina
    "387"
  ],
  [
    "bw",
    // Botswana
    "267"
  ],
  [
    "br",
    // Brazil
    "55"
  ],
  [
    "io",
    // British Indian Ocean Territory
    "246"
  ],
  [
    "vg",
    // British Virgin Islands
    "1",
    11,
    ["284"]
  ],
  [
    "bn",
    // Brunei
    "673"
  ],
  [
    "bg",
    // Bulgaria
    "359"
  ],
  [
    "bf",
    // Burkina Faso
    "226"
  ],
  [
    "bi",
    // Burundi
    "257"
  ],
  [
    "kh",
    // Cambodia
    "855"
  ],
  [
    "cm",
    // Cameroon
    "237"
  ],
  [
    "ca",
    // Canada
    "1",
    1,
    ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "879", "902", "905"]
  ],
  [
    "cv",
    // Cape Verde
    "238"
  ],
  [
    "bq",
    // Caribbean Netherlands
    "599",
    1,
    ["3", "4", "7"]
  ],
  [
    "ky",
    // Cayman Islands
    "1",
    12,
    ["345"]
  ],
  [
    "cf",
    // Central African Republic
    "236"
  ],
  [
    "td",
    // Chad
    "235"
  ],
  [
    "cl",
    // Chile
    "56"
  ],
  [
    "cn",
    // China
    "86"
  ],
  [
    "cx",
    // Christmas Island
    "61",
    2,
    ["89164"],
    "0"
  ],
  [
    "cc",
    // Cocos (Keeling) Islands
    "61",
    1,
    ["89162"],
    "0"
  ],
  [
    "co",
    // Colombia
    "57"
  ],
  [
    "km",
    // Comoros
    "269"
  ],
  [
    "cg",
    // Congo (Brazzaville)
    "242"
  ],
  [
    "cd",
    // Congo (Kinshasa)
    "243"
  ],
  [
    "ck",
    // Cook Islands
    "682"
  ],
  [
    "cr",
    // Costa Rica
    "506"
  ],
  [
    "ci",
    // Côte d'Ivoire
    "225"
  ],
  [
    "hr",
    // Croatia
    "385"
  ],
  [
    "cu",
    // Cuba
    "53"
  ],
  [
    "cw",
    // Curaçao
    "599",
    0
  ],
  [
    "cy",
    // Cyprus
    "357"
  ],
  [
    "cz",
    // Czech Republic
    "420"
  ],
  [
    "dk",
    // Denmark
    "45"
  ],
  [
    "dj",
    // Djibouti
    "253"
  ],
  [
    "dm",
    // Dominica
    "1",
    13,
    ["767"]
  ],
  [
    "do",
    // Dominican Republic
    "1",
    2,
    ["809", "829", "849"]
  ],
  [
    "ec",
    // Ecuador
    "593"
  ],
  [
    "eg",
    // Egypt
    "20"
  ],
  [
    "sv",
    // El Salvador
    "503"
  ],
  [
    "gq",
    // Equatorial Guinea
    "240"
  ],
  [
    "er",
    // Eritrea
    "291"
  ],
  [
    "ee",
    // Estonia
    "372"
  ],
  [
    "sz",
    // Eswatini
    "268"
  ],
  [
    "et",
    // Ethiopia
    "251"
  ],
  [
    "fk",
    // Falkland Islands (Malvinas)
    "500"
  ],
  [
    "fo",
    // Faroe Islands
    "298"
  ],
  [
    "fj",
    // Fiji
    "679"
  ],
  [
    "fi",
    // Finland
    "358",
    0
  ],
  [
    "fr",
    // France
    "33"
  ],
  [
    "gf",
    // French Guiana
    "594"
  ],
  [
    "pf",
    // French Polynesia
    "689"
  ],
  [
    "ga",
    // Gabon
    "241"
  ],
  [
    "gm",
    // Gambia
    "220"
  ],
  [
    "ge",
    // Georgia
    "995"
  ],
  [
    "de",
    // Germany
    "49"
  ],
  [
    "gh",
    // Ghana
    "233"
  ],
  [
    "gi",
    // Gibraltar
    "350"
  ],
  [
    "gr",
    // Greece
    "30"
  ],
  [
    "gl",
    // Greenland
    "299"
  ],
  [
    "gd",
    // Grenada
    "1",
    14,
    ["473"]
  ],
  [
    "gp",
    // Guadeloupe
    "590",
    0
  ],
  [
    "gu",
    // Guam
    "1",
    15,
    ["671"]
  ],
  [
    "gt",
    // Guatemala
    "502"
  ],
  [
    "gg",
    // Guernsey
    "44",
    1,
    ["1481", "7781", "7839", "7911"],
    "0"
  ],
  [
    "gn",
    // Guinea
    "224"
  ],
  [
    "gw",
    // Guinea-Bissau
    "245"
  ],
  [
    "gy",
    // Guyana
    "592"
  ],
  [
    "ht",
    // Haiti
    "509"
  ],
  [
    "hn",
    // Honduras
    "504"
  ],
  [
    "hk",
    // Hong Kong SAR China
    "852"
  ],
  [
    "hu",
    // Hungary
    "36"
  ],
  [
    "is",
    // Iceland
    "354"
  ],
  [
    "in",
    // India
    "91"
  ],
  [
    "id",
    // Indonesia
    "62"
  ],
  [
    "ir",
    // Iran
    "98"
  ],
  [
    "iq",
    // Iraq
    "964"
  ],
  [
    "ie",
    // Ireland
    "353"
  ],
  [
    "im",
    // Isle of Man
    "44",
    2,
    ["1624", "74576", "7524", "7924", "7624"],
    "0"
  ],
  [
    "il",
    // Israel
    "972"
  ],
  [
    "it",
    // Italy
    "39",
    0
  ],
  [
    "jm",
    // Jamaica
    "1",
    4,
    ["876", "658"]
  ],
  [
    "jp",
    // Japan
    "81"
  ],
  [
    "je",
    // Jersey
    "44",
    3,
    ["1534", "7509", "7700", "7797", "7829", "7937"],
    "0"
  ],
  [
    "jo",
    // Jordan
    "962"
  ],
  [
    "kz",
    // Kazakhstan
    "7",
    1,
    ["33", "7"],
    "8"
  ],
  [
    "ke",
    // Kenya
    "254"
  ],
  [
    "ki",
    // Kiribati
    "686"
  ],
  [
    "xk",
    // Kosovo
    "383"
  ],
  [
    "kw",
    // Kuwait
    "965"
  ],
  [
    "kg",
    // Kyrgyzstan
    "996"
  ],
  [
    "la",
    // Laos
    "856"
  ],
  [
    "lv",
    // Latvia
    "371"
  ],
  [
    "lb",
    // Lebanon
    "961"
  ],
  [
    "ls",
    // Lesotho
    "266"
  ],
  [
    "lr",
    // Liberia
    "231"
  ],
  [
    "ly",
    // Libya
    "218"
  ],
  [
    "li",
    // Liechtenstein
    "423"
  ],
  [
    "lt",
    // Lithuania
    "370"
  ],
  [
    "lu",
    // Luxembourg
    "352"
  ],
  [
    "mo",
    // Macao SAR China
    "853"
  ],
  [
    "mg",
    // Madagascar
    "261"
  ],
  [
    "mw",
    // Malawi
    "265"
  ],
  [
    "my",
    // Malaysia
    "60"
  ],
  [
    "mv",
    // Maldives
    "960"
  ],
  [
    "ml",
    // Mali
    "223"
  ],
  [
    "mt",
    // Malta
    "356"
  ],
  [
    "mh",
    // Marshall Islands
    "692"
  ],
  [
    "mq",
    // Martinique
    "596"
  ],
  [
    "mr",
    // Mauritania
    "222"
  ],
  [
    "mu",
    // Mauritius
    "230"
  ],
  [
    "yt",
    // Mayotte
    "262",
    1,
    ["269", "639"],
    "0"
  ],
  [
    "mx",
    // Mexico
    "52"
  ],
  [
    "fm",
    // Micronesia
    "691"
  ],
  [
    "md",
    // Moldova
    "373"
  ],
  [
    "mc",
    // Monaco
    "377"
  ],
  [
    "mn",
    // Mongolia
    "976"
  ],
  [
    "me",
    // Montenegro
    "382"
  ],
  [
    "ms",
    // Montserrat
    "1",
    16,
    ["664"]
  ],
  [
    "ma",
    // Morocco
    "212",
    0,
    null,
    "0"
  ],
  [
    "mz",
    // Mozambique
    "258"
  ],
  [
    "mm",
    // Myanmar (Burma)
    "95"
  ],
  [
    "na",
    // Namibia
    "264"
  ],
  [
    "nr",
    // Nauru
    "674"
  ],
  [
    "np",
    // Nepal
    "977"
  ],
  [
    "nl",
    // Netherlands
    "31"
  ],
  [
    "nc",
    // New Caledonia
    "687"
  ],
  [
    "nz",
    // New Zealand
    "64"
  ],
  [
    "ni",
    // Nicaragua
    "505"
  ],
  [
    "ne",
    // Niger
    "227"
  ],
  [
    "ng",
    // Nigeria
    "234"
  ],
  [
    "nu",
    // Niue
    "683"
  ],
  [
    "nf",
    // Norfolk Island
    "672"
  ],
  [
    "kp",
    // North Korea
    "850"
  ],
  [
    "mk",
    // North Macedonia
    "389"
  ],
  [
    "mp",
    // Northern Mariana Islands
    "1",
    17,
    ["670"]
  ],
  [
    "no",
    // Norway
    "47",
    0
  ],
  [
    "om",
    // Oman
    "968"
  ],
  [
    "pk",
    // Pakistan
    "92"
  ],
  [
    "pw",
    // Palau
    "680"
  ],
  [
    "ps",
    // Palestinian Territories
    "970"
  ],
  [
    "pa",
    // Panama
    "507"
  ],
  [
    "pg",
    // Papua New Guinea
    "675"
  ],
  [
    "py",
    // Paraguay
    "595"
  ],
  [
    "pe",
    // Peru
    "51"
  ],
  [
    "ph",
    // Philippines
    "63"
  ],
  [
    "pl",
    // Poland
    "48"
  ],
  [
    "pt",
    // Portugal
    "351"
  ],
  [
    "pr",
    // Puerto Rico
    "1",
    3,
    ["787", "939"]
  ],
  [
    "qa",
    // Qatar
    "974"
  ],
  [
    "re",
    // Réunion
    "262",
    0,
    null,
    "0"
  ],
  [
    "ro",
    // Romania
    "40"
  ],
  [
    "ru",
    // Russia
    "7",
    0,
    null,
    "8"
  ],
  [
    "rw",
    // Rwanda
    "250"
  ],
  [
    "ws",
    // Samoa
    "685"
  ],
  [
    "sm",
    // San Marino
    "378"
  ],
  [
    "st",
    // São Tomé & Príncipe
    "239"
  ],
  [
    "sa",
    // Saudi Arabia
    "966"
  ],
  [
    "sn",
    // Senegal
    "221"
  ],
  [
    "rs",
    // Serbia
    "381"
  ],
  [
    "sc",
    // Seychelles
    "248"
  ],
  [
    "sl",
    // Sierra Leone
    "232"
  ],
  [
    "sg",
    // Singapore
    "65"
  ],
  [
    "sx",
    // Sint Maarten
    "1",
    21,
    ["721"]
  ],
  [
    "sk",
    // Slovakia
    "421"
  ],
  [
    "si",
    // Slovenia
    "386"
  ],
  [
    "sb",
    // Solomon Islands
    "677"
  ],
  [
    "so",
    // Somalia
    "252"
  ],
  [
    "za",
    // South Africa
    "27"
  ],
  [
    "kr",
    // South Korea
    "82"
  ],
  [
    "ss",
    // South Sudan
    "211"
  ],
  [
    "es",
    // Spain
    "34"
  ],
  [
    "lk",
    // Sri Lanka
    "94"
  ],
  [
    "bl",
    // St. Barthélemy
    "590",
    1
  ],
  [
    "sh",
    // St. Helena
    "290"
  ],
  [
    "kn",
    // St. Kitts & Nevis
    "1",
    18,
    ["869"]
  ],
  [
    "lc",
    // St. Lucia
    "1",
    19,
    ["758"]
  ],
  [
    "mf",
    // St. Martin
    "590",
    2
  ],
  [
    "pm",
    // St. Pierre & Miquelon
    "508"
  ],
  [
    "vc",
    // St. Vincent & Grenadines
    "1",
    20,
    ["784"]
  ],
  [
    "sd",
    // Sudan
    "249"
  ],
  [
    "sr",
    // Suriname
    "597"
  ],
  [
    "sj",
    // Svalbard & Jan Mayen
    "47",
    1,
    ["79"]
  ],
  [
    "se",
    // Sweden
    "46"
  ],
  [
    "ch",
    // Switzerland
    "41"
  ],
  [
    "sy",
    // Syria
    "963"
  ],
  [
    "tw",
    // Taiwan
    "886"
  ],
  [
    "tj",
    // Tajikistan
    "992"
  ],
  [
    "tz",
    // Tanzania
    "255"
  ],
  [
    "th",
    // Thailand
    "66"
  ],
  [
    "tl",
    // Timor-Leste
    "670"
  ],
  [
    "tg",
    // Togo
    "228"
  ],
  [
    "tk",
    // Tokelau
    "690"
  ],
  [
    "to",
    // Tonga
    "676"
  ],
  [
    "tt",
    // Trinidad & Tobago
    "1",
    22,
    ["868"]
  ],
  [
    "tn",
    // Tunisia
    "216"
  ],
  [
    "tr",
    // Turkey
    "90"
  ],
  [
    "tm",
    // Turkmenistan
    "993"
  ],
  [
    "tc",
    // Turks & Caicos Islands
    "1",
    23,
    ["649"]
  ],
  [
    "tv",
    // Tuvalu
    "688"
  ],
  [
    "ug",
    // Uganda
    "256"
  ],
  [
    "ua",
    // Ukraine
    "380"
  ],
  [
    "ae",
    // United Arab Emirates
    "971"
  ],
  [
    "gb",
    // United Kingdom
    "44",
    0,
    null,
    "0"
  ],
  [
    "us",
    // United States
    "1",
    0
  ],
  [
    "uy",
    // Uruguay
    "598"
  ],
  [
    "vi",
    // U.S. Virgin Islands
    "1",
    24,
    ["340"]
  ],
  [
    "uz",
    // Uzbekistan
    "998"
  ],
  [
    "vu",
    // Vanuatu
    "678"
  ],
  [
    "va",
    // Vatican City
    "39",
    1,
    ["06698"]
  ],
  [
    "ve",
    // Venezuela
    "58"
  ],
  [
    "vn",
    // Vietnam
    "84"
  ],
  [
    "wf",
    // Wallis & Futuna
    "681"
  ],
  [
    "eh",
    // Western Sahara
    "212",
    1,
    ["5288", "5289"],
    "0"
  ],
  [
    "ye",
    // Yemen
    "967"
  ],
  [
    "zm",
    // Zambia
    "260"
  ],
  [
    "zw",
    // Zimbabwe
    "263"
  ]
];
var allCountries = [];
for (let i = 0; i < rawCountryData.length; i++) {
  const c = rawCountryData[i];
  allCountries[i] = {
    name: "",
    // this is now populated in the plugin
    iso2: c[0],
    dialCode: c[1],
    priority: c[2] || 0,
    areaCodes: c[3] || null,
    nodeById: {},
    nationalPrefix: c[4] || null
  };
}
var data_default = allCountries;

// src/js/intl-tel-input/i18n/en/countries.ts
var countryTranslations = {
  ad: "Andorra",
  ae: "United Arab Emirates",
  af: "Afghanistan",
  ag: "Antigua & Barbuda",
  ai: "Anguilla",
  al: "Albania",
  am: "Armenia",
  ao: "Angola",
  ar: "Argentina",
  as: "American Samoa",
  at: "Austria",
  au: "Australia",
  aw: "Aruba",
  ax: "\xC5land Islands",
  az: "Azerbaijan",
  ba: "Bosnia & Herzegovina",
  bb: "Barbados",
  bd: "Bangladesh",
  be: "Belgium",
  bf: "Burkina Faso",
  bg: "Bulgaria",
  bh: "Bahrain",
  bi: "Burundi",
  bj: "Benin",
  bl: "St. Barth\xE9lemy",
  bm: "Bermuda",
  bn: "Brunei",
  bo: "Bolivia",
  bq: "Caribbean Netherlands",
  br: "Brazil",
  bs: "Bahamas",
  bt: "Bhutan",
  bw: "Botswana",
  by: "Belarus",
  bz: "Belize",
  ca: "Canada",
  cc: "Cocos (Keeling) Islands",
  cd: "Congo - Kinshasa",
  cf: "Central African Republic",
  cg: "Congo - Brazzaville",
  ch: "Switzerland",
  ci: "C\xF4te d\u2019Ivoire",
  ck: "Cook Islands",
  cl: "Chile",
  cm: "Cameroon",
  cn: "China",
  co: "Colombia",
  cr: "Costa Rica",
  cu: "Cuba",
  cv: "Cape Verde",
  cw: "Cura\xE7ao",
  cx: "Christmas Island",
  cy: "Cyprus",
  cz: "Czechia",
  de: "Germany",
  dj: "Djibouti",
  dk: "Denmark",
  dm: "Dominica",
  do: "Dominican Republic",
  dz: "Algeria",
  ec: "Ecuador",
  ee: "Estonia",
  eg: "Egypt",
  eh: "Western Sahara",
  er: "Eritrea",
  es: "Spain",
  et: "Ethiopia",
  fi: "Finland",
  fj: "Fiji",
  fk: "Falkland Islands",
  fm: "Micronesia",
  fo: "Faroe Islands",
  fr: "France",
  ga: "Gabon",
  gb: "United Kingdom",
  gd: "Grenada",
  ge: "Georgia",
  gf: "French Guiana",
  gg: "Guernsey",
  gh: "Ghana",
  gi: "Gibraltar",
  gl: "Greenland",
  gm: "Gambia",
  gn: "Guinea",
  gp: "Guadeloupe",
  gq: "Equatorial Guinea",
  gr: "Greece",
  gt: "Guatemala",
  gu: "Guam",
  gw: "Guinea-Bissau",
  gy: "Guyana",
  hk: "Hong Kong SAR China",
  hn: "Honduras",
  hr: "Croatia",
  ht: "Haiti",
  hu: "Hungary",
  id: "Indonesia",
  ie: "Ireland",
  il: "Israel",
  im: "Isle of Man",
  in: "India",
  io: "British Indian Ocean Territory",
  iq: "Iraq",
  ir: "Iran",
  is: "Iceland",
  it: "Italy",
  je: "Jersey",
  jm: "Jamaica",
  jo: "Jordan",
  jp: "Japan",
  ke: "Kenya",
  kg: "Kyrgyzstan",
  kh: "Cambodia",
  ki: "Kiribati",
  km: "Comoros",
  kn: "St. Kitts & Nevis",
  kp: "North Korea",
  kr: "South Korea",
  kw: "Kuwait",
  ky: "Cayman Islands",
  kz: "Kazakhstan",
  la: "Laos",
  lb: "Lebanon",
  lc: "St. Lucia",
  li: "Liechtenstein",
  lk: "Sri Lanka",
  lr: "Liberia",
  ls: "Lesotho",
  lt: "Lithuania",
  lu: "Luxembourg",
  lv: "Latvia",
  ly: "Libya",
  ma: "Morocco",
  mc: "Monaco",
  md: "Moldova",
  me: "Montenegro",
  mf: "St. Martin",
  mg: "Madagascar",
  mh: "Marshall Islands",
  mk: "North Macedonia",
  ml: "Mali",
  mm: "Myanmar (Burma)",
  mn: "Mongolia",
  mo: "Macao SAR China",
  mp: "Northern Mariana Islands",
  mq: "Martinique",
  mr: "Mauritania",
  ms: "Montserrat",
  mt: "Malta",
  mu: "Mauritius",
  mv: "Maldives",
  mw: "Malawi",
  mx: "Mexico",
  my: "Malaysia",
  mz: "Mozambique",
  na: "Namibia",
  nc: "New Caledonia",
  ne: "Niger",
  nf: "Norfolk Island",
  ng: "Nigeria",
  ni: "Nicaragua",
  nl: "Netherlands",
  no: "Norway",
  np: "Nepal",
  nr: "Nauru",
  nu: "Niue",
  nz: "New Zealand",
  om: "Oman",
  pa: "Panama",
  pe: "Peru",
  pf: "French Polynesia",
  pg: "Papua New Guinea",
  ph: "Philippines",
  pk: "Pakistan",
  pl: "Poland",
  pm: "St. Pierre & Miquelon",
  pr: "Puerto Rico",
  ps: "Palestinian Territories",
  pt: "Portugal",
  pw: "Palau",
  py: "Paraguay",
  qa: "Qatar",
  re: "R\xE9union",
  ro: "Romania",
  rs: "Serbia",
  ru: "Russia",
  rw: "Rwanda",
  sa: "Saudi Arabia",
  sb: "Solomon Islands",
  sc: "Seychelles",
  sd: "Sudan",
  se: "Sweden",
  sg: "Singapore",
  sh: "St. Helena",
  si: "Slovenia",
  sj: "Svalbard & Jan Mayen",
  sk: "Slovakia",
  sl: "Sierra Leone",
  sm: "San Marino",
  sn: "Senegal",
  so: "Somalia",
  sr: "Suriname",
  ss: "South Sudan",
  st: "S\xE3o Tom\xE9 & Pr\xEDncipe",
  sv: "El Salvador",
  sx: "Sint Maarten",
  sy: "Syria",
  sz: "Eswatini",
  tc: "Turks & Caicos Islands",
  td: "Chad",
  tg: "Togo",
  th: "Thailand",
  tj: "Tajikistan",
  tk: "Tokelau",
  tl: "Timor-Leste",
  tm: "Turkmenistan",
  tn: "Tunisia",
  to: "Tonga",
  tr: "Turkey",
  tt: "Trinidad & Tobago",
  tv: "Tuvalu",
  tw: "Taiwan",
  tz: "Tanzania",
  ua: "Ukraine",
  ug: "Uganda",
  us: "United States",
  uy: "Uruguay",
  uz: "Uzbekistan",
  va: "Vatican City",
  vc: "St. Vincent & Grenadines",
  ve: "Venezuela",
  vg: "British Virgin Islands",
  vi: "U.S. Virgin Islands",
  vn: "Vietnam",
  vu: "Vanuatu",
  wf: "Wallis & Futuna",
  ws: "Samoa",
  ye: "Yemen",
  yt: "Mayotte",
  za: "South Africa",
  zm: "Zambia",
  zw: "Zimbabwe"
};
var countries_default = countryTranslations;

// src/js/intl-tel-input/i18n/en/interface.ts
var interfaceTranslations = {
  selectedCountryAriaLabel: "Selected country",
  noCountrySelected: "No country selected",
  countryListAriaLabel: "List of countries",
  searchPlaceholder: "Search",
  zeroSearchResults: "No results found",
  oneSearchResult: "1 result found",
  multipleSearchResults: "${count} results found",
  // additional countries (not supported by country-list library)
  ac: "Ascension Island",
  xk: "Kosovo"
};
var interface_default = interfaceTranslations;

// src/js/intl-tel-input/i18n/en/index.ts
var allTranslations = { ...countries_default, ...interface_default };
var en_default = allTranslations;

// react-native/src/intl-tel-input.ts
for (let i = 0; i < data_default.length; i++) {
  data_default[i].name = en_default[data_default[i].iso2];
}
var id = 0;
var instances = {};
var defaults = {
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
  useFullscreenPopup: false,
  // React Native will handle this differently
  //* The number type to enforce during validation.
  validationNumberTypes: ["MOBILE"]
};
var regionlessNanpNumbers = [
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
  "889"
];
var getNumeric = (s) => s.replace(/\D/g, "");
var normaliseString = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
var isRegionlessNanp = (number) => {
  const numeric = getNumeric(number);
  if (numeric.charAt(0) === "1") {
    const areaCode = numeric.substr(1, 3);
    return regionlessNanpNumbers.includes(areaCode);
  }
  return false;
};
var forEachInstance = (method, ...args) => {
  Object.values(instances).forEach((instance) => instance[method](...args));
};
var Iti = class {
  constructor(textInput, customOptions = {}) {
    //* Current input value - to be set by React Native component
    this.currentInputValue = "";
    this.id = id++;
    this.textInput = textInput;
    this.options = Object.assign({}, defaults, customOptions);
    this.hadInitialPlaceholder = textInput?.props?.placeholder ? Boolean(textInput.props.placeholder) : false;
    this.eventCallbacks = {};
    this._init();
    instances[this.id] = this;
  }
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init() {
    const autoCountryPromise = new Promise((resolve, reject) => {
      this.resolveAutoCountryPromise = resolve;
      this.rejectAutoCountryPromise = reject;
    });
    const utilsScriptPromise = new Promise((resolve, reject) => {
      this.resolveUtilsScriptPromise = resolve;
      this.rejectUtilsScriptPromise = reject;
    });
    this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
    this.selectedCountryData = {};
    this.dialCodeToIso2Map = {};
    this.dialCodes = {};
    this.maxCoreNumberLength = null;
    this.defaultCountry = "";
    this._processCountryData();
    this._setInitialState();
    this._initRequests();
  }
  //********************
  //*  PRIVATE METHODS
  //********************
  //* Prepare all of the country data, including onlyCountries, excludeCountries, countryOrder options.
  _processCountryData() {
    this._processAllCountries();
    this._processDialCodes();
    this._translateCountryNames();
    this._sortCountries();
  }
  //* Process onlyCountries or excludeCountries array if present.
  _processAllCountries() {
    const { onlyCountries, excludeCountries } = this.options;
    if (onlyCountries.length) {
      const lowerCaseOnlyCountries = onlyCountries.map(
        (country) => country.toLowerCase()
      );
      this.countries = data_default.filter(
        (country) => lowerCaseOnlyCountries.includes(country.iso2)
      );
    } else if (excludeCountries.length) {
      const lowerCaseExcludeCountries = excludeCountries.map(
        (country) => country.toLowerCase()
      );
      this.countries = data_default.filter(
        (country) => !lowerCaseExcludeCountries.includes(country.iso2)
      );
    } else {
      this.countries = data_default;
    }
  }
  //* Translate Countries by object literal provided on config.
  _translateCountryNames() {
    for (let i = 0; i < this.countries.length; i++) {
      const iso2 = this.countries[i].iso2.toLowerCase();
      if (this.options.i18n.hasOwnProperty(iso2)) {
        this.countries[i].name = this.options.i18n[iso2];
      }
    }
  }
  //* Sort countries by countryOrder option (if present), then name.
  _sortCountries() {
    if (this.options.countryOrder) {
      this.options.countryOrder = this.options.countryOrder.map((country) => country.toLowerCase());
    }
    this.countries.sort((a, b) => {
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
      return a.name.localeCompare(b.name);
    });
  }
  //* Add a dial code to this.dialCodeToIso2Map.
  _addToDialCodeMap(iso2, dialCode, priority) {
    if (dialCode.length > this.dialCodeMaxLen) {
      this.dialCodeMaxLen = dialCode.length;
    }
    if (!this.dialCodeToIso2Map.hasOwnProperty(dialCode)) {
      this.dialCodeToIso2Map[dialCode] = [];
    }
    for (let i = 0; i < this.dialCodeToIso2Map[dialCode].length; i++) {
      if (this.dialCodeToIso2Map[dialCode][i] === iso2) {
        return;
      }
    }
    const index = priority !== void 0 ? priority : this.dialCodeToIso2Map[dialCode].length;
    this.dialCodeToIso2Map[dialCode][index] = iso2;
  }
  //* Generate this.dialCodes and this.dialCodeToIso2Map.
  _processDialCodes() {
    this.dialCodes = {};
    this.dialCodeMaxLen = 0;
    this.dialCodeToIso2Map = {};
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      if (!this.dialCodes[c.dialCode]) {
        this.dialCodes[c.dialCode] = true;
      }
      this._addToDialCodeMap(c.iso2, c.dialCode, c.priority);
    }
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      if (c.areaCodes) {
        const rootIso2Code = this.dialCodeToIso2Map[c.dialCode][0];
        for (let j = 0; j < c.areaCodes.length; j++) {
          const areaCode = c.areaCodes[j];
          for (let k = 1; k < areaCode.length; k++) {
            const partialAreaCode = areaCode.substring(0, k);
            const partialDialCode = c.dialCode + partialAreaCode;
            this._addToDialCodeMap(rootIso2Code, partialDialCode);
            this._addToDialCodeMap(c.iso2, partialDialCode);
          }
          this._addToDialCodeMap(c.iso2, c.dialCode + areaCode);
        }
      }
    }
  }
  //* Init many requests: utils script / geo ip lookup.
  _initRequests() {
    let { loadUtils, initialCountry, geoIpLookup } = this.options;
    if (loadUtils && !intlTelInput.utils) {
      intlTelInput.attachUtils(loadUtils)?.catch(() => {
        forEachInstance("rejectUtilsScriptPromise");
      });
    } else {
      if (intlTelInput.utils) {
        this.handleUtils();
      } else {
        this.resolveUtilsScriptPromise();
      }
    }
    const isAutoCountry = initialCountry === "auto" && geoIpLookup;
    if (isAutoCountry && !this.selectedCountryData.iso2) {
      this._loadAutoCountry();
    } else {
      this.resolveAutoCountryPromise();
    }
  }
  //* Perform the geo ip lookup.
  _loadAutoCountry() {
    if (intlTelInput.autoCountry) {
      this.handleAutoCountry();
    } else if (!intlTelInput.startedLoadingAutoCountry) {
      intlTelInput.startedLoadingAutoCountry = true;
      if (typeof this.options.geoIpLookup === "function") {
        this.options.geoIpLookup(
          (iso2 = "") => {
            const iso2Lower = iso2.toLowerCase();
            const isValidIso2 = iso2Lower && this._getCountryData(iso2Lower, true);
            if (isValidIso2) {
              intlTelInput.autoCountry = iso2Lower;
              setTimeout(() => forEachInstance("handleAutoCountry"));
            } else {
              this._setInitialState(true);
              forEachInstance("rejectAutoCountryPromise");
            }
          },
          () => {
            this._setInitialState(true);
            forEachInstance("rejectAutoCountryPromise");
          }
        );
      }
    }
  }
  //* Get country data by iso2 code.
  _getCountryData(iso2, allowFail) {
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
  _setInitialState(overrideAutoCountry = false) {
    const { initialCountry, geoIpLookup } = this.options;
    const isAutoCountry = initialCountry === "auto" && geoIpLookup;
    if (!isAutoCountry || overrideAutoCountry) {
      const lowerInitialCountry = initialCountry ? initialCountry.toLowerCase() : "";
      const isValidInitialCountry = lowerInitialCountry && this._getCountryData(lowerInitialCountry, true);
      if (isValidInitialCountry) {
        this._setCountry(lowerInitialCountry);
      } else {
        if (this.options.countryOrder && this.options.countryOrder.length > 0) {
          const firstCountryInOrder = this.options.countryOrder[0].toLowerCase();
          const isValidFirstCountry = this._getCountryData(firstCountryInOrder, true);
          if (isValidFirstCountry) {
            this._setCountry(firstCountryInOrder);
          } else {
            this._setCountry();
          }
        } else {
          this._setCountry();
        }
      }
    }
  }
  //* Update the selected country, and update the input val accordingly.
  _setCountry(iso2) {
    const prevCountry = this.selectedCountryData;
    const { showFlags, separateDialCode } = this.options;
    this.selectedCountryData = iso2 ? this._getCountryData(iso2, false) || {} : {};
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }
    this._updatePlaceholder();
    return prevCountry.iso2 !== iso2;
  }
  //* This is called when the geoip call returns.
  handleAutoCountry() {
    if (this.options.initialCountry === "auto" && intlTelInput.autoCountry) {
      this.defaultCountry = intlTelInput.autoCountry;
      const hasSelectedCountryOrGlobe = this.selectedCountryData.iso2;
      if (!hasSelectedCountryOrGlobe) {
        this.setCountry(this.defaultCountry);
      }
      this.resolveAutoCountryPromise();
    }
  }
  //* This is called when the utils request completes.
  handleUtils() {
    if (intlTelInput.utils) {
      if (this.selectedCountryData.iso2) {
        this._updatePlaceholder();
      }
      this.resolveUtilsScriptPromise();
    } else {
      this.rejectUtilsScriptPromise();
    }
  }
  //* Get the current placeholder and trigger update (for React Native component).
  updateAndGetPlaceholder() {
    return this._updatePlaceholder();
  }
  //********************
  //*  PUBLIC METHODS
  //********************
  //* Get the extension from the current number.
  getExtension() {
    if (intlTelInput.utils) {
      return intlTelInput.utils.getExtension(
        this._getFullNumber(),
        this.selectedCountryData.iso2
      );
    }
    return "";
  }
  //* Format the number to the given format.
  getNumber(format) {
    if (intlTelInput.utils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInput.utils.formatNumber(
        this._getFullNumber(),
        iso2,
        format
      );
    }
    return "";
  }
  //* Get the type of the entered number e.g. landline/mobile.
  getNumberType() {
    if (intlTelInput.utils) {
      return intlTelInput.utils.getNumberType(
        this._getFullNumber(),
        this.selectedCountryData.iso2
      );
    }
    return -99;
  }
  //* Get the country data for the currently selected country.
  getSelectedCountryData() {
    return this.selectedCountryData;
  }
  //* Get the processed countries list (after filtering and sorting).
  getCountries() {
    return this.countries;
  }
  //* Get the current options.
  getOptions() {
    return this.options;
  }
  //* Get the current placeholder (using the same logic as the main implementation).
  getPlaceholder() {
    return this._updatePlaceholder();
  }
  //* Set whether the input had an initial placeholder (for React Native component).
  setHadInitialPlaceholder(hadPlaceholder) {
    this.hadInitialPlaceholder = hadPlaceholder;
  }
  //* Set the placeholder number type
  setPlaceholderNumberType(type) {
    this.options.placeholderNumberType = type;
    this._updatePlaceholder();
  }
  //* Set the maximum core number length (for React Native component maxLength support)
  setMaxLength(maxLength) {
    this.maxCoreNumberLength = maxLength;
  }
  //* Get the validation error.
  getValidationError() {
    if (intlTelInput.utils) {
      const { iso2 } = this.selectedCountryData;
      return intlTelInput.utils.getValidationError(this._getFullNumber(), iso2);
    }
    return -99;
  }
  //* Validate the input val
  isValidNumber() {
    if (!this.selectedCountryData.iso2) {
      return false;
    }
    const val = this._getFullNumber();
    return intlTelInput.utils ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Validate the input val (precise)
  isValidNumberPrecise() {
    if (!this.selectedCountryData.iso2) {
      return false;
    }
    const val = this._getFullNumber();
    return intlTelInput.utils ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Update the selected country, and update the input val accordingly.
  setCountry(iso2) {
    const iso2Lower = iso2?.toLowerCase();
    const currentCountry = this.selectedCountryData.iso2;
    const isCountryChange = iso2 && iso2Lower !== currentCountry || !iso2 && currentCountry;
    if (isCountryChange) {
      this._setCountry(iso2Lower);
      this._updateDialCode(this.selectedCountryData.dialCode || "");
      this._triggerCountryChange();
    }
  }
  //* Set the current input value (called by React Native component)
  setInputValue(value) {
    this.currentInputValue = value;
  }
  //* Set the input value and update the country (like main implementation)
  setNumber(number) {
    const countryChanged = this._updateCountryFromNumber(number);
    this._updateValFromNumber(number);
    if (countryChanged) {
      this._triggerCountryChange();
    }
    this._trigger("input", { isSetNumber: true });
  }
  //* Set event callbacks for React Native component
  setEventCallbacks(callbacks) {
    this.eventCallbacks = callbacks;
  }
  //* Get the current input value (for React Native component)
  getCurrentInputValue() {
    return this.currentInputValue;
  }
  //* Format number as you type (exposed for React Native component)
  formatNumberAsYouType() {
    return this._formatNumberAsYouType();
  }
  //* Update country from number (exposed for React Native component)
  updateCountryFromNumber(fullNumber) {
    return this._updateCountryFromNumber(fullNumber);
  }
  //* Set the disabled state (for React Native component)
  setDisabled(disabled) {
    if (this.textInput?.current?.setNativeProps) {
      this.textInput.current.setNativeProps({ editable: !disabled });
    }
    this._trigger("disabledchange", { disabled });
  }
  //* Get the TextInput ref (React Native specific)
  getTextInput() {
    return this.textInput;
  }
  //* Set placeholder using setNativeProps for performance (React Native specific)
  setPlaceholderNative(placeholder) {
    if (this.textInput?.current?.setNativeProps) {
      this.textInput.current.setNativeProps({ placeholder });
    }
  }
  //* Destroy the instance (cleanup)
  destroy() {
    this.currentInputValue = "";
    this.selectedCountryData = {};
    delete instances[this.id];
  }
  //* Helper method to get full number
  _getFullNumber(overrideVal) {
    const val = overrideVal || this.currentInputValue.trim();
    const { dialCode } = this.selectedCountryData;
    let prefix;
    let numericVal = getNumeric(val);
    if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
      prefix = `+${dialCode}`;
    } else {
      prefix = "";
    }
    return prefix + val;
  }
  //* Remove the dial code if separateDialCode is enabled also cap the length if maxLength is set
  _beforeSetNumber(fullNumber) {
    let number = fullNumber;
    if (this.options.separateDialCode) {
      let dialCode = this._getDialCode(number);
      if (dialCode) {
        dialCode = `+${this.selectedCountryData.dialCode}`;
        const start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
        number = number.substring(start);
      }
    }
    return this._cap(number);
  }
  //* Adhere to maxLength constraint (for React Native component compatibility)
  _cap(number) {
    const max = this.maxCoreNumberLength;
    return max && number.length > max ? number.substring(0, max) : number;
  }
  //* Extract dial code from number
  _getDialCode(number, includeAreaCode) {
    let dialCode = "";
    if (number.charAt(0) === "+") {
      let numericChars = "";
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i);
        if (!isNaN(parseInt(c, 10))) {
          numericChars += c;
          if (includeAreaCode) {
            if (this.dialCodeToIso2Map[numericChars]) {
              dialCode = number.substring(0, i + 1);
            }
          } else {
            if (this.dialCodes[numericChars]) {
              dialCode = number.substring(0, i + 1);
              break;
            }
          }
          if (numericChars.length === this.dialCodeMaxLen) {
            break;
          }
        }
      }
    }
    return dialCode;
  }
  //* Ensure the number starts with the dial code (ported from main implementation)
  _ensureHasDialCode(number) {
    const { dialCode, nationalPrefix } = this.selectedCountryData;
    const alreadyHasPlus = number.charAt(0) === "+";
    if (alreadyHasPlus || !dialCode) {
      return number;
    }
    const hasPrefix = nationalPrefix && number.charAt(0) === nationalPrefix && !this.options.separateDialCode;
    const cleanNumber = hasPrefix ? number.substring(1) : number;
    return `+${dialCode}${cleanNumber}`;
  }
  //* Get country from number (updated to match main implementation logic)
  _getCountryFromNumber(fullNumber) {
    const plusIndex = fullNumber.indexOf("+");
    let number = plusIndex ? fullNumber.substring(plusIndex) : fullNumber;
    const selectedIso2 = this.selectedCountryData.iso2;
    const selectedDialCode = this.selectedCountryData.dialCode;
    number = this._ensureHasDialCode(number);
    const dialCodeMatch = this._getDialCode(number, true);
    const numeric = getNumeric(number);
    if (dialCodeMatch) {
      const dialCodeMatchNumeric = getNumeric(dialCodeMatch);
      const iso2Codes = this.dialCodeToIso2Map[dialCodeMatchNumeric];
      if (!selectedIso2 && this.defaultCountry && iso2Codes.includes(this.defaultCountry)) {
        return this.defaultCountry;
      }
      const alreadySelected = selectedIso2 && iso2Codes.includes(selectedIso2) && (numeric.length === dialCodeMatchNumeric.length || !this.selectedCountryData.areaCodes);
      const isRegionlessNanpNumber = selectedDialCode === "1" && isRegionlessNanp(numeric);
      if (!isRegionlessNanpNumber && !alreadySelected) {
        for (let j = 0; j < iso2Codes.length; j++) {
          if (iso2Codes[j]) {
            return iso2Codes[j];
          }
        }
      }
    } else if (number.charAt(0) === "+" && numeric.length) {
      return "";
    } else if ((!number || number === "+") && !this.selectedCountryData.iso2) {
      return this.defaultCountry;
    }
    return null;
  }
  //* Update country from number
  _updateCountryFromNumber(fullNumber) {
    const iso2 = this._getCountryFromNumber(fullNumber);
    if (iso2 !== null) {
      return this._setCountry(iso2);
    }
    return false;
  }
  //* Format number as you type
  _formatNumberAsYouType() {
    const val = this._getFullNumber();
    const result = intlTelInput.utils ? intlTelInput.utils.formatNumberAsYouType(val, this.selectedCountryData.iso2) : val;
    return this._beforeSetNumber(result);
  }
  //* Update the input placeholder to an example number from the currently selected country.
  _updatePlaceholder() {
    const {
      autoPlaceholder,
      placeholderNumberType,
      nationalMode,
      customPlaceholder
    } = this.options;
    const shouldSetPlaceholder = autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && autoPlaceholder === "polite";
    if (intlTelInput.utils && shouldSetPlaceholder) {
      const numberType = intlTelInput.utils.numberType[placeholderNumberType];
      let placeholder = this.selectedCountryData.iso2 ? intlTelInput.utils.getExampleNumber(
        this.selectedCountryData.iso2,
        nationalMode,
        numberType
      ) : "";
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
  _updateValFromNumber(fullNumber) {
    let number = fullNumber;
    if (this.options.formatOnDisplay && intlTelInput.utils && this.selectedCountryData) {
      const useNational = this.options.nationalMode || number.charAt(0) !== "+" && !this.options.separateDialCode;
      const { NATIONAL, INTERNATIONAL } = intlTelInput.utils.numberFormat;
      const format = useNational ? NATIONAL : INTERNATIONAL;
      number = intlTelInput.utils.formatNumber(
        number,
        this.selectedCountryData.iso2,
        format
      );
    }
    number = this._beforeSetNumber(number);
    this.currentInputValue = number;
  }
  //* Update the maximum valid number length for the currently selected country.
  _updateMaxLength() {
    const { strictMode, placeholderNumberType, validationNumberTypes } = this.options;
    const { iso2 } = this.selectedCountryData;
    if (strictMode && intlTelInput.utils) {
      if (iso2) {
        const numberType = intlTelInput.utils.numberType[placeholderNumberType];
        let exampleNumber = intlTelInput.utils.getExampleNumber(
          iso2,
          false,
          numberType,
          true
        );
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
  _utilsIsPossibleNumber(val) {
    return intlTelInput.utils ? intlTelInput.utils.isPossibleNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Check if number is valid using utils
  _utilsIsValidNumber(val) {
    return intlTelInput.utils ? intlTelInput.utils.isValidNumber(val, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Trigger a custom event (React Native compatible)
  _trigger(name, detailProps = {}) {
    if (this.eventCallbacks && this.eventCallbacks[name]) {
      this.eventCallbacks[name](detailProps);
    }
  }
  //* Trigger the 'countrychange' event.
  _triggerCountryChange() {
    this._trigger("countrychange");
  }
  //* Replace any existing dial code with the new one (adapted for React Native)
  _updateDialCode(newDialCodeBare) {
    const inputVal = this.currentInputValue;
    const newDialCode = `+${newDialCodeBare}`;
    let newNumber;
    if (inputVal.charAt(0) === "+") {
      const prevDialCode = this._getDialCode(inputVal);
      if (prevDialCode) {
        newNumber = inputVal.replace(prevDialCode, newDialCode);
      } else {
        newNumber = newDialCode;
      }
      this.currentInputValue = this._cap(newNumber);
    }
  }
  //* Search for countries by name (React Native compatible)
  _searchForCountry(query) {
    const results = [];
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
  _filterCountries(query, isReset = false) {
    if (isReset || !query.trim()) {
      return this.countries;
    }
    const results = [];
    const normalisedQuery = normaliseString(query);
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      const normalisedCountryName = normaliseString(c.name);
      const countryInitials = c.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map((word) => word[0]).join("").toLowerCase();
      const fullDialCode = `+${c.dialCode}`;
      if (normalisedCountryName.includes(normalisedQuery) || fullDialCode.includes(normalisedQuery) || c.iso2.includes(normalisedQuery) || countryInitials.includes(normalisedQuery)) {
        results.push(c);
      }
    }
    return results;
  }
  //* Update search results text (for accessibility - React Native compatible)
  _updateSearchResultsText(count) {
    const { i18n } = this.options;
    let searchText;
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
  searchCountries(query) {
    return this._filterCountries(query);
  }
};
var attachUtils = async (source) => {
  if (!source || typeof source !== "function") {
    return Promise.reject(new TypeError("The loader function passed to attachUtils must be a function."));
  }
  let loadCall;
  try {
    loadCall = Promise.resolve(source());
  } catch (error) {
    return Promise.reject(error);
  }
  try {
    const module2 = await loadCall;
    const utils = module2?.default;
    if (!utils || typeof utils !== "object") {
      throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");
    }
    intlTelInput.utils = utils;
    forEachInstance("handleUtils");
    return utils;
  } catch (error) {
    forEachInstance("rejectUtilsScriptPromise", error);
    throw error;
  }
};
var intlTelInput = Object.assign(
  (inputRef, options) => {
    const iti = new Iti(inputRef, options);
    iti._init();
    instances[iti.id] = iti;
    return iti;
  },
  {
    defaults,
    //* Using a static var like this allows us to mock it in the tests.
    documentReady: () => true,
    //* Get the country data object.
    getCountryData: () => data_default,
    //* A getter for the plugin instance.
    getInstance: (id2) => {
      return instances[id2] || null;
    },
    //* A map from instance ID to instance object.
    instances,
    attachUtils,
    startedLoadingUtilsScript: false,
    startedLoadingAutoCountry: false,
    version: "25.3.1"
  }
);
var intl_tel_input_default = intlTelInput;

// react-native/src/intl-tel-input/react-native.tsx
var import_react = __toESM(require("react"));
var import_react_native = require("react-native");
var getCountryFlag = (iso2) => {
  if (!iso2 || iso2.length !== 2) return "\u{1F3F3}\uFE0F";
  const codePoints = iso2.toUpperCase().split("").map(
    (char) => 127462 + char.charCodeAt(0) - "A".charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
};
var IntlTelInput = (0, import_react.forwardRef)(function IntlTelInput2({
  initialValue = "",
  onChangeNumber = () => {
  },
  onChangeCountry = () => {
  },
  onChangeValidity = () => {
  },
  onChangeErrorCode = () => {
  },
  usePreciseValidation = false,
  initOptions = {},
  inputProps = {},
  disabled = void 0,
  style,
  countrySelectorStyle,
  flagStyle,
  textStyle,
  inputStyle,
  dropdownContainerStyle,
  dropdownStyle,
  countryNameStyle,
  dialCodeStyle
}, ref) {
  const [phoneNumber, setPhoneNumber] = (0, import_react.useState)(initialValue);
  const [selectedCountry, setSelectedCountry] = (0, import_react.useState)(null);
  const [isDropdownVisible, setIsDropdownVisible] = (0, import_react.useState)(false);
  const [filteredCountries, setFilteredCountries] = (0, import_react.useState)([]);
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [placeholder, setPlaceholder] = (0, import_react.useState)("");
  const textInputRef = (0, import_react.useRef)(null);
  const itiRef = (0, import_react.useRef)(null);
  const [processedCountries, setProcessedCountries] = (0, import_react.useState)([]);
  const getSearchPlaceholder = (0, import_react.useCallback)(() => {
    if (itiRef.current) {
      const options = itiRef.current.getOptions();
      return options.i18n?.searchPlaceholder || "Search countries...";
    }
    return "Search countries...";
  }, []);
  const updatePlaceholder = () => {
    if (itiRef.current) {
      const hasInitialPlaceholder = Boolean(inputProps?.placeholder);
      itiRef.current.setHadInitialPlaceholder(hasInitialPlaceholder);
      const placeholderText = itiRef.current.getPlaceholder();
      setPlaceholder(placeholderText || inputProps?.placeholder || "Phone number");
    } else {
      setPlaceholder(inputProps?.placeholder || "Phone number");
    }
  };
  const update = (0, import_react.useCallback)(() => {
    if (itiRef.current) {
      const num = itiRef.current.getNumber() || "";
      const countryIso = itiRef.current.getSelectedCountryData().iso2 || "";
      const currentInputValue = itiRef.current.getCurrentInputValue();
      let displayValue = currentInputValue;
      if (initOptions.separateDialCode) {
        const selectedCountryData = itiRef.current.getSelectedCountryData();
        if (selectedCountryData.dialCode && currentInputValue.startsWith(`+${selectedCountryData.dialCode}`)) {
          const dialCodeLength = selectedCountryData.dialCode.length + 1;
          displayValue = currentInputValue.substring(dialCodeLength).replace(/^[\s-]/, "");
        }
      }
      setPhoneNumber(displayValue);
      onChangeNumber(num);
      onChangeCountry(countryIso);
      if (countryIso) {
        const country = processedCountries.find((c) => c.iso2 === countryIso);
        if (country) {
          setSelectedCountry(country);
        }
      }
      const isValid = usePreciseValidation ? itiRef.current.isValidNumberPrecise() : itiRef.current.isValidNumber();
      if (isValid) {
        onChangeValidity(true);
        onChangeErrorCode(null);
      } else {
        const errorCode = itiRef.current.getValidationError();
        onChangeValidity(false);
        onChangeErrorCode(errorCode);
      }
    }
  }, [onChangeCountry, onChangeErrorCode, onChangeNumber, onChangeValidity, usePreciseValidation, processedCountries, initOptions.separateDialCode]);
  (0, import_react.useEffect)(() => {
    if (!itiRef.current) {
      itiRef.current = intl_tel_input_default(textInputRef.current, initOptions);
      if (inputProps?.maxLength) {
        itiRef.current.setMaxLength(inputProps.maxLength);
      }
      const countries = itiRef.current.getCountries();
      setProcessedCountries(countries);
      if (initialValue) {
        itiRef.current.setNumber(initialValue);
        const formattedValue = itiRef.current.getCurrentInputValue() || initialValue;
        setPhoneNumber(formattedValue);
      }
      const selectedCountryData = itiRef.current.getSelectedCountryData();
      if (selectedCountryData.iso2) {
        const country = countries.find((c) => c.iso2 === selectedCountryData.iso2);
        if (country) {
          setSelectedCountry(country);
          onChangeCountry(country.iso2);
        }
      } else {
        const isAutoCountry = initOptions.initialCountry === "auto" && initOptions.geoIpLookup;
        if (!isAutoCountry) {
          const firstCountry = countries[0];
          if (firstCountry) {
            setSelectedCountry(firstCountry);
            onChangeCountry(firstCountry.iso2);
            itiRef.current.setCountry(firstCountry.iso2);
          }
        }
      }
      itiRef.current.promise.then(() => {
        update();
        const finalSelectedCountryData = itiRef.current?.getSelectedCountryData();
        if (finalSelectedCountryData?.iso2 && !selectedCountry) {
          const country = countries.find((c) => c.iso2 === finalSelectedCountryData.iso2);
          if (country) {
            setSelectedCountry(country);
            onChangeCountry(country.iso2);
          }
        }
      }).catch(() => {
      });
    }
  }, [initOptions, onChangeCountry, update]);
  (0, import_react.useEffect)(() => {
    updatePlaceholder();
  }, [selectedCountry]);
  (0, import_react.useEffect)(() => {
    if (itiRef.current) {
      itiRef.current.promise.then(() => {
        updatePlaceholder();
        const currentValue = itiRef.current?.getCurrentInputValue();
        if (currentValue) {
          itiRef.current?.setNumber(currentValue);
          const formattedValue = itiRef.current?.getCurrentInputValue() || currentValue;
          setPhoneNumber(formattedValue);
        }
      }).catch(() => {
      });
    }
    return () => {
      if (itiRef.current) {
        itiRef.current.destroy();
        itiRef.current = null;
      }
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const utilsAvailable = !!intl_tel_input_default.utils;
    if (utilsAvailable) {
      updatePlaceholder();
    }
  }, [intl_tel_input_default.utils]);
  (0, import_react.useEffect)(() => {
  }, [disabled]);
  (0, import_react.useEffect)(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(processedCountries);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = processedCountries.filter(
        (country) => country.name.toLowerCase().includes(query) || country.iso2.toLowerCase().includes(query) || country.dialCode.includes(query)
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery, processedCountries]);
  const handlePhoneNumberChange = (0, import_react.useCallback)((text) => {
    if (itiRef.current) {
      itiRef.current.setInputValue(text);
      const countryChanged = itiRef.current.updateCountryFromNumber(text);
      let formattedText = text;
      if (initOptions.formatAsYouType !== false) {
        formattedText = itiRef.current.formatNumberAsYouType();
      }
      setPhoneNumber(formattedText);
      if (countryChanged) {
        update();
      } else {
        onChangeNumber(formattedText);
        const isValid = usePreciseValidation ? itiRef.current.isValidNumberPrecise() : itiRef.current.isValidNumber();
        const errorCode = itiRef.current.getValidationError();
        onChangeValidity(isValid ?? false);
        onChangeErrorCode(isValid ? null : errorCode);
      }
    } else {
      setPhoneNumber(text);
      onChangeNumber(text);
      const isValid = text.length > 0;
      onChangeValidity(isValid);
      onChangeErrorCode(isValid ? null : 0);
    }
  }, [onChangeNumber, onChangeValidity, onChangeErrorCode, usePreciseValidation, initOptions.formatAsYouType, update]);
  const handleCountrySelect = (0, import_react.useCallback)((country) => {
    setSelectedCountry(country);
    setIsDropdownVisible(false);
    setSearchQuery("");
    if (itiRef.current) {
      itiRef.current.setCountry(country.iso2);
      update();
    } else {
      onChangeCountry(country.iso2);
    }
  }, [onChangeCountry, update]);
  (0, import_react.useImperativeHandle)(ref, () => ({
    getInstance: () => itiRef.current,
    getInput: () => textInputRef.current
  }));
  const renderCountryItem = ({ item }) => /* @__PURE__ */ import_react.default.createElement(
    import_react_native.TouchableOpacity,
    {
      style: [styles.countryItem, dropdownStyle],
      onPress: () => handleCountrySelect(item)
    },
    initOptions.showFlags !== false && /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: [styles.flag, flagStyle] }, getCountryFlag(item.iso2)),
    /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: [styles.countryName, countryNameStyle] }, item.name),
    /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: [styles.dialCode, dialCodeStyle] }, "+", item.dialCode)
  );
  return /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { style: styles.container }, /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { style: [styles.inputContainer, style] }, initOptions.allowDropdown !== false && /* @__PURE__ */ import_react.default.createElement(
    import_react_native.TouchableOpacity,
    {
      style: [styles.countrySelector, countrySelectorStyle],
      onPress: () => setIsDropdownVisible(true),
      disabled: disabled || false
    },
    initOptions.showFlags !== false && selectedCountry && /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: [styles.selectedFlag, flagStyle] }, getCountryFlag(selectedCountry.iso2)),
    /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: styles.dropdownArrow }, "\u25BC"),
    initOptions.separateDialCode && selectedCountry && /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: [styles.selectedDialCode, textStyle] }, "+", selectedCountry.dialCode)
  ), /* @__PURE__ */ import_react.default.createElement(
    import_react_native.TextInput,
    {
      ref: textInputRef,
      style: [styles.textInput, textStyle, inputStyle],
      value: phoneNumber,
      onChangeText: handlePhoneNumberChange,
      placeholder: placeholder || "Phone number",
      keyboardType: "phone-pad",
      editable: disabled !== true,
      ...inputProps
    }
  )), /* @__PURE__ */ import_react.default.createElement(
    import_react_native.Modal,
    {
      visible: isDropdownVisible,
      animationType: "slide",
      onRequestClose: () => setIsDropdownVisible(false)
    },
    /* @__PURE__ */ import_react.default.createElement(import_react_native.SafeAreaView, { style: [styles.modalContainer, dropdownContainerStyle] }, /* @__PURE__ */ import_react.default.createElement(import_react_native.View, { style: styles.modalHeader }, /* @__PURE__ */ import_react.default.createElement(
      import_react_native.TouchableOpacity,
      {
        style: styles.closeButton,
        onPress: () => setIsDropdownVisible(false)
      },
      /* @__PURE__ */ import_react.default.createElement(import_react_native.Text, { style: styles.closeButtonText }, "\u2715")
    )), initOptions.countrySearch !== false && /* @__PURE__ */ import_react.default.createElement(
      import_react_native.TextInput,
      {
        style: styles.searchInput,
        value: searchQuery,
        onChangeText: setSearchQuery,
        placeholder: getSearchPlaceholder(),
        autoFocus: true
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_react_native.FlatList,
      {
        data: filteredCountries,
        renderItem: renderCountryItem,
        keyExtractor: (item) => item.iso2,
        style: styles.countryList
      }
    ))
  ));
});
var styles = import_react_native.StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  selectedFlag: {
    fontSize: 20,
    marginRight: 4
  },
  selectedDialCode: {
    marginLeft: 8
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666"
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: import_react_native.Platform.OS === "ios" ? 44 : 0
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  closeButton: {
    padding: 8
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  searchInput: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16
  },
  countryList: {
    flex: 1
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  flag: {
    fontSize: 20,
    marginRight: 12
  },
  countryName: {
    flex: 1,
    fontSize: 16
  },
  dialCode: {
    fontSize: 16,
    color: "#666"
  }
});
var react_native_default = IntlTelInput;
