import { mergeModels as g2, useModel as yd, ref as r0, onMounted as vd, watch as Id, onUnmounted as Sd, withDirectives as _d, openBlock as Nd, createElementBlock as Ad, mergeProps as wd, vModelText as Ld } from "vue";
const C2 = [
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
], e1 = [];
for (let v = 0; v < C2.length; v++) {
  const $ = C2[v];
  e1[v] = {
    name: "",
    // this is now populated in the plugin
    iso2: $[0],
    dialCode: $[1],
    priority: $[2] || 0,
    areaCodes: $[3] || null,
    nodeById: {},
    nationalPrefix: $[4] || null
  };
}
const Td = {
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
  ax: "Åland Islands",
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
  bl: "St. Barthélemy",
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
  ci: "Côte d’Ivoire",
  ck: "Cook Islands",
  cl: "Chile",
  cm: "Cameroon",
  cn: "China",
  co: "Colombia",
  cr: "Costa Rica",
  cu: "Cuba",
  cv: "Cape Verde",
  cw: "Curaçao",
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
  re: "Réunion",
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
  st: "São Tomé & Príncipe",
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
}, Ed = {
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
}, v2 = { ...Td, ...Ed };
for (let v = 0; v < e1.length; v++)
  e1[v].name = v2[e1[v].iso2];
let Md = 0;
const I2 = {
  //* Whether or not to allow the dropdown.
  allowDropdown: !0,
  //* Add a placeholder in the input with an example number for the selected country.
  autoPlaceholder: "polite",
  //* Modify the parentClass.
  containerClass: "",
  //* The order of the countries in the dropdown. Defaults to alphabetical.
  countryOrder: null,
  //* Add a country search input at the top of the dropdown.
  countrySearch: !0,
  //* Modify the auto placeholder.
  customPlaceholder: null,
  //* Append menu to specified element.
  dropdownContainer: null,
  //* Don't display these countries.
  excludeCountries: [],
  //* Fix the dropdown width to the input width (rather than being as wide as the longest country name).
  fixDropdownWidth: !0,
  //* Format the number as the user types
  formatAsYouType: !0,
  //* Format the input value during initialisation and on setNumber.
  formatOnDisplay: !0,
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
  nationalMode: !0,
  //* Display only these countries.
  onlyCountries: [],
  //* Number type to use for placeholders.
  placeholderNumberType: "MOBILE",
  //* Show flags - for both the selected country, and in the country dropdown
  showFlags: !0,
  //* Display the international dial code next to the selected flag.
  separateDialCode: !1,
  //* Only allow certain chars e.g. a plus followed by numeric digits, and cap at max valid length.
  strictMode: !1,
  //* Use full screen popup instead of dropdown for country list.
  useFullscreenPopup: typeof navigator < "u" && typeof window < "u" ? (
    //* We cannot just test screen size as some smartphones/website meta tags will report desktop resolutions.
    //* Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
    /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 500
  ) : !1,
  //* The number type to enforce during validation.
  validationNumberTypes: ["MOBILE"]
}, bd = [
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
], B1 = (v) => v.replace(/\D/g, ""), m2 = (v = "") => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(), y2 = (v) => {
  const $ = B1(v);
  if ($.charAt(0) === "1") {
    const i = $.substr(1, 3);
    return bd.includes(i);
  }
  return !1;
}, Dd = (v, $, i, o) => {
  if (i === 0 && !o)
    return 0;
  let u = 0;
  for (let a = 0; a < $.length; a++) {
    if (/[+0-9]/.test($[a]) && u++, u === v && !o)
      return a + 1;
    if (o && u === v + 1)
      return a;
  }
  return $.length;
}, b = (v, $, i) => {
  const o = document.createElement(v);
  return $ && Object.entries($).forEach(([u, a]) => o.setAttribute(u, a)), i && i.appendChild(o), o;
}, C1 = (v, ...$) => {
  const { instances: i } = m;
  Object.values(i).forEach((o) => o[v](...$));
};
class Pd {
  constructor($, i = {}) {
    this.id = Md++, this.telInput = $, this.highlightedItem = null, this.options = Object.assign({}, I2, i), this.hadInitialPlaceholder = !!$.getAttribute("placeholder");
  }
  //* Can't be private as it's called from intlTelInput convenience wrapper.
  _init() {
    this.options.useFullscreenPopup && (this.options.fixDropdownWidth = !1), this.options.onlyCountries.length === 1 && (this.options.initialCountry = this.options.onlyCountries[0]), this.options.separateDialCode && (this.options.nationalMode = !1), this.options.allowDropdown && !this.options.showFlags && !this.options.separateDialCode && (this.options.nationalMode = !1), this.options.useFullscreenPopup && !this.options.dropdownContainer && (this.options.dropdownContainer = document.body), this.isAndroid = typeof navigator < "u" ? /Android/i.test(navigator.userAgent) : !1, this.isRTL = !!this.telInput.closest("[dir=rtl]");
    const $ = this.options.allowDropdown || this.options.separateDialCode;
    this.showSelectedCountryOnLeft = this.isRTL ? !$ : $, this.options.separateDialCode && (this.isRTL ? this.originalPaddingRight = this.telInput.style.paddingRight : this.originalPaddingLeft = this.telInput.style.paddingLeft), this.options.i18n = { ...v2, ...this.options.i18n };
    const i = new Promise((u, a) => {
      this.resolveAutoCountryPromise = u, this.rejectAutoCountryPromise = a;
    }), o = new Promise((u, a) => {
      this.resolveUtilsScriptPromise = u, this.rejectUtilsScriptPromise = a;
    });
    this.promise = Promise.all([i, o]), this.selectedCountryData = {}, this._processCountryData(), this._generateMarkup(), this._setInitialState(), this._initListeners(), this._initRequests();
  }
  //********************
  //*  PRIVATE METHODS
  //********************
  //* Prepare all of the country data, including onlyCountries, excludeCountries, countryOrder options.
  _processCountryData() {
    this._processAllCountries(), this._processDialCodes(), this._translateCountryNames(), this._sortCountries();
  }
  //* Sort countries by countryOrder option (if present), then name.
  _sortCountries() {
    this.options.countryOrder && (this.options.countryOrder = this.options.countryOrder.map(($) => $.toLowerCase())), this.countries.sort(($, i) => {
      const { countryOrder: o } = this.options;
      if (o) {
        const u = o.indexOf($.iso2), a = o.indexOf(i.iso2), c = u > -1, g = a > -1;
        if (c || g)
          return c && g ? u - a : c ? -1 : 1;
      }
      return $.name.localeCompare(i.name);
    });
  }
  //* Add a dial code to this.dialCodeToIso2Map.
  _addToDialCodeMap($, i, o) {
    i.length > this.dialCodeMaxLen && (this.dialCodeMaxLen = i.length), this.dialCodeToIso2Map.hasOwnProperty(i) || (this.dialCodeToIso2Map[i] = []);
    for (let a = 0; a < this.dialCodeToIso2Map[i].length; a++)
      if (this.dialCodeToIso2Map[i][a] === $)
        return;
    const u = o !== void 0 ? o : this.dialCodeToIso2Map[i].length;
    this.dialCodeToIso2Map[i][u] = $;
  }
  //* Process onlyCountries or excludeCountries array if present.
  _processAllCountries() {
    const { onlyCountries: $, excludeCountries: i } = this.options;
    if ($.length) {
      const o = $.map(
        (u) => u.toLowerCase()
      );
      this.countries = e1.filter(
        (u) => o.includes(u.iso2)
      );
    } else if (i.length) {
      const o = i.map(
        (u) => u.toLowerCase()
      );
      this.countries = e1.filter(
        (u) => !o.includes(u.iso2)
      );
    } else
      this.countries = e1;
  }
  //* Translate Countries by object literal provided on config.
  _translateCountryNames() {
    for (let $ = 0; $ < this.countries.length; $++) {
      const i = this.countries[$].iso2.toLowerCase();
      this.options.i18n.hasOwnProperty(i) && (this.countries[$].name = this.options.i18n[i]);
    }
  }
  //* Generate this.dialCodes and this.dialCodeToIso2Map.
  _processDialCodes() {
    this.dialCodes = {}, this.dialCodeMaxLen = 0, this.dialCodeToIso2Map = {};
    for (let $ = 0; $ < this.countries.length; $++) {
      const i = this.countries[$];
      this.dialCodes[i.dialCode] || (this.dialCodes[i.dialCode] = !0), this._addToDialCodeMap(i.iso2, i.dialCode, i.priority);
    }
    for (let $ = 0; $ < this.countries.length; $++) {
      const i = this.countries[$];
      if (i.areaCodes) {
        const o = this.dialCodeToIso2Map[i.dialCode][0];
        for (let u = 0; u < i.areaCodes.length; u++) {
          const a = i.areaCodes[u];
          for (let c = 1; c < a.length; c++) {
            const g = a.substr(0, c), p = i.dialCode + g;
            this._addToDialCodeMap(o, p), this._addToDialCodeMap(i.iso2, p);
          }
          this._addToDialCodeMap(i.iso2, i.dialCode + a);
        }
      }
    }
  }
  //* Generate all of the markup for the plugin: the selected country overlay, and the dropdown.
  _generateMarkup() {
    var S, D, V;
    this.telInput.classList.add("iti__tel-input"), !this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete")) && this.telInput.setAttribute("autocomplete", "off");
    const {
      allowDropdown: $,
      separateDialCode: i,
      showFlags: o,
      containerClass: u,
      hiddenInput: a,
      dropdownContainer: c,
      fixDropdownWidth: g,
      useFullscreenPopup: p,
      countrySearch: _,
      i18n: I
    } = this.options;
    let A = "iti";
    $ && (A += " iti--allow-dropdown"), o && (A += " iti--show-flags"), u && (A += ` ${u}`), p || (A += " iti--inline-dropdown");
    const N = b("div", { class: A });
    if ((S = this.telInput.parentNode) == null || S.insertBefore(N, this.telInput), $ || o || i) {
      this.countryContainer = b(
        "div",
        { class: "iti__country-container" },
        N
      ), this.showSelectedCountryOnLeft ? this.countryContainer.style.left = "0px" : this.countryContainer.style.right = "0px", $ ? (this.selectedCountry = b(
        "button",
        {
          type: "button",
          class: "iti__selected-country",
          "aria-expanded": "false",
          "aria-label": this.options.i18n.selectedCountryAriaLabel,
          "aria-haspopup": "true",
          "aria-controls": `iti-${this.id}__dropdown-content`,
          role: "combobox"
        },
        this.countryContainer
      ), this.telInput.disabled && this.selectedCountry.setAttribute("disabled", "true")) : this.selectedCountry = b(
        "div",
        { class: "iti__selected-country" },
        this.countryContainer
      );
      const k = b("div", { class: "iti__selected-country-primary" }, this.selectedCountry);
      if (this.selectedCountryInner = b("div", { class: "iti__flag" }, k), this.selectedCountryA11yText = b(
        "span",
        { class: "iti__a11y-text" },
        this.selectedCountryInner
      ), $ && (this.dropdownArrow = b(
        "div",
        { class: "iti__arrow", "aria-hidden": "true" },
        k
      )), i && (this.selectedDialCode = b(
        "div",
        { class: "iti__selected-dial-code" },
        this.selectedCountry
      )), $) {
        const R = g ? "" : "iti--flexible-dropdown-width";
        if (this.dropdownContent = b("div", {
          id: `iti-${this.id}__dropdown-content`,
          class: `iti__dropdown-content iti__hide ${R}`
        }), _ && (this.searchInput = b(
          "input",
          {
            type: "text",
            class: "iti__search-input",
            placeholder: I.searchPlaceholder,
            role: "combobox",
            "aria-expanded": "true",
            "aria-label": I.searchPlaceholder,
            "aria-controls": `iti-${this.id}__country-listbox`,
            "aria-autocomplete": "list",
            autocomplete: "off"
          },
          this.dropdownContent
        ), this.searchResultsA11yText = b(
          "span",
          { class: "iti__a11y-text" },
          this.dropdownContent
        )), this.countryList = b(
          "ul",
          {
            class: "iti__country-list",
            id: `iti-${this.id}__country-listbox`,
            role: "listbox",
            "aria-label": I.countryListAriaLabel
          },
          this.dropdownContent
        ), this._appendListItems(), _ && this._updateSearchResultsText(), c) {
          let G = "iti iti--container";
          p ? G += " iti--fullscreen-popup" : G += " iti--inline-dropdown", this.dropdown = b("div", { class: G }), this.dropdown.appendChild(this.dropdownContent);
        } else
          this.countryContainer.appendChild(this.dropdownContent);
      }
    }
    if (N.appendChild(this.telInput), this._updateInputPadding(), a) {
      const k = this.telInput.getAttribute("name") || "", R = a(k);
      if (R.phone) {
        const G = (D = this.telInput.form) == null ? void 0 : D.querySelector(`input[name="${R.phone}"]`);
        G ? this.hiddenInput = G : (this.hiddenInput = b("input", {
          type: "hidden",
          name: R.phone
        }), N.appendChild(this.hiddenInput));
      }
      if (R.country) {
        const G = (V = this.telInput.form) == null ? void 0 : V.querySelector(`input[name="${R.country}"]`);
        G ? this.hiddenInputCountry = G : (this.hiddenInputCountry = b("input", {
          type: "hidden",
          name: R.country
        }), N.appendChild(this.hiddenInputCountry));
      }
    }
  }
  //* For each country: add a country list item <li> to the countryList <ul> container.
  _appendListItems() {
    for (let $ = 0; $ < this.countries.length; $++) {
      const i = this.countries[$], o = $ === 0 ? "iti__highlight" : "", u = b(
        "li",
        {
          id: `iti-${this.id}__item-${i.iso2}`,
          class: `iti__country ${o}`,
          tabindex: "-1",
          role: "option",
          "data-dial-code": i.dialCode,
          "data-country-code": i.iso2,
          "aria-selected": "false"
        },
        this.countryList
      );
      i.nodeById[this.id] = u;
      let a = "";
      this.options.showFlags && (a += `<div class='iti__flag iti__${i.iso2}'></div>`), a += `<span class='iti__country-name'>${i.name}</span>`, a += `<span class='iti__dial-code'>+${i.dialCode}</span>`, u.insertAdjacentHTML("beforeend", a);
    }
  }
  //* Set the initial state of the input value and the selected country by:
  //* 1. Extracting a dial code from the given number
  //* 2. Using explicit initialCountry
  _setInitialState($ = !1) {
    const i = this.telInput.getAttribute("value"), o = this.telInput.value, a = i && i.charAt(0) === "+" && (!o || o.charAt(0) !== "+") ? i : o, c = this._getDialCode(a), g = y2(a), { initialCountry: p, geoIpLookup: _ } = this.options, I = p === "auto" && _;
    if (c && !g)
      this._updateCountryFromNumber(a);
    else if (!I || $) {
      const A = p ? p.toLowerCase() : "";
      A && this._getCountryData(A, !0) ? this._setCountry(A) : c && g ? this._setCountry("us") : this._setCountry();
    }
    a && this._updateValFromNumber(a);
  }
  //* Initialise the main event listeners: input keyup, and click selected country.
  _initListeners() {
    this._initTelInputListeners(), this.options.allowDropdown && this._initDropdownListeners(), (this.hiddenInput || this.hiddenInputCountry) && this.telInput.form && this._initHiddenInputListener();
  }
  //* Update hidden input on form submit.
  _initHiddenInputListener() {
    var $;
    this._handleHiddenInputSubmit = () => {
      this.hiddenInput && (this.hiddenInput.value = this.getNumber()), this.hiddenInputCountry && (this.hiddenInputCountry.value = this.getSelectedCountryData().iso2 || "");
    }, ($ = this.telInput.form) == null || $.addEventListener(
      "submit",
      this._handleHiddenInputSubmit
    );
  }
  //* initialise the dropdown listeners.
  _initDropdownListeners() {
    this._handleLabelClick = (i) => {
      this.dropdownContent.classList.contains("iti__hide") ? this.telInput.focus() : i.preventDefault();
    };
    const $ = this.telInput.closest("label");
    $ && $.addEventListener("click", this._handleLabelClick), this._handleClickSelectedCountry = () => {
      this.dropdownContent.classList.contains("iti__hide") && !this.telInput.disabled && !this.telInput.readOnly && this._openDropdown();
    }, this.selectedCountry.addEventListener("click", this._handleClickSelectedCountry), this._handleCountryContainerKeydown = (i) => {
      this.dropdownContent.classList.contains("iti__hide") && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(i.key) && (i.preventDefault(), i.stopPropagation(), this._openDropdown()), i.key === "Tab" && this._closeDropdown();
    }, this.countryContainer.addEventListener(
      "keydown",
      this._handleCountryContainerKeydown
    );
  }
  //* Init many requests: utils script / geo ip lookup.
  _initRequests() {
    let { loadUtils: $, initialCountry: i, geoIpLookup: o } = this.options;
    $ && !m.utils ? (this._handlePageLoad = () => {
      var a;
      window.removeEventListener("load", this._handlePageLoad), (a = m.attachUtils($)) == null || a.catch(() => {
      });
    }, m.documentReady() ? this._handlePageLoad() : window.addEventListener("load", this._handlePageLoad)) : this.resolveUtilsScriptPromise(), i === "auto" && o && !this.selectedCountryData.iso2 ? this._loadAutoCountry() : this.resolveAutoCountryPromise();
  }
  //* Perform the geo ip lookup.
  _loadAutoCountry() {
    m.autoCountry ? this.handleAutoCountry() : m.startedLoadingAutoCountry || (m.startedLoadingAutoCountry = !0, typeof this.options.geoIpLookup == "function" && this.options.geoIpLookup(
      ($ = "") => {
        const i = $.toLowerCase();
        i && this._getCountryData(i, !0) ? (m.autoCountry = i, setTimeout(() => C1("handleAutoCountry"))) : (this._setInitialState(!0), C1("rejectAutoCountryPromise"));
      },
      () => {
        this._setInitialState(!0), C1("rejectAutoCountryPromise");
      }
    ));
  }
  _openDropdownWithPlus() {
    this._openDropdown(), this.searchInput.value = "+", this._filterCountries("", !0);
  }
  //* Initialize the tel input listeners.
  _initTelInputListeners() {
    const { strictMode: $, formatAsYouType: i, separateDialCode: o, formatOnDisplay: u, allowDropdown: a, countrySearch: c } = this.options;
    let g = !1;
    new RegExp("\\p{L}", "u").test(this.telInput.value) && (g = !0), this._handleInputEvent = (p) => {
      if (this.isAndroid && (p == null ? void 0 : p.data) === "+" && o && a && c) {
        const N = this.telInput.selectionStart || 0, S = this.telInput.value.substring(0, N - 1), D = this.telInput.value.substring(N);
        this.telInput.value = S + D, this._openDropdownWithPlus();
        return;
      }
      this._updateCountryFromNumber(this.telInput.value) && this._triggerCountryChange();
      const _ = (p == null ? void 0 : p.data) && /[^+0-9]/.test(p.data), I = (p == null ? void 0 : p.inputType) === "insertFromPaste" && this.telInput.value;
      _ || I && !$ ? g = !0 : /[^+0-9]/.test(this.telInput.value) || (g = !1);
      const A = (p == null ? void 0 : p.detail) && p.detail.isSetNumber && !u;
      if (i && !g && !A) {
        const N = this.telInput.selectionStart || 0, D = this.telInput.value.substring(0, N).replace(/[^+0-9]/g, "").length, V = (p == null ? void 0 : p.inputType) === "deleteContentForward", k = this._formatNumberAsYouType(), R = Dd(D, k, N, V);
        this.telInput.value = k, this.telInput.setSelectionRange(R, R);
      }
    }, this.telInput.addEventListener("input", this._handleInputEvent), ($ || o) && (this._handleKeydownEvent = (p) => {
      if (p.key && p.key.length === 1 && !p.altKey && !p.ctrlKey && !p.metaKey) {
        if (o && a && c && p.key === "+") {
          p.preventDefault(), this._openDropdownWithPlus();
          return;
        }
        if ($) {
          const _ = this.telInput.value, I = _.charAt(0) === "+", A = !I && this.telInput.selectionStart === 0 && p.key === "+", N = /^[0-9]$/.test(p.key), S = o ? N : A || N, D = _.slice(0, this.telInput.selectionStart) + p.key + _.slice(this.telInput.selectionEnd), V = this._getFullNumber(D), k = m.utils.getCoreNumber(V, this.selectedCountryData.iso2), R = this.maxCoreNumberLength && k.length > this.maxCoreNumberLength;
          let G = !1;
          if (I) {
            const x1 = this.selectedCountryData.iso2;
            G = this._getCountryFromNumber(V) !== x1;
          }
          (!S || R && !G && !A) && p.preventDefault();
        }
      }
    }, this.telInput.addEventListener("keydown", this._handleKeydownEvent));
  }
  //* Adhere to the input's maxlength attr.
  _cap($) {
    const i = parseInt(this.telInput.getAttribute("maxlength") || "", 10);
    return i && $.length > i ? $.substr(0, i) : $;
  }
  //* Trigger a custom event on the input.
  _trigger($, i = {}) {
    const o = new CustomEvent($, {
      bubbles: !0,
      cancelable: !0,
      detail: i
    });
    this.telInput.dispatchEvent(o);
  }
  //* Open the dropdown.
  _openDropdown() {
    const { fixDropdownWidth: $, countrySearch: i } = this.options;
    if ($ && (this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`), this.dropdownContent.classList.remove("iti__hide"), this.selectedCountry.setAttribute("aria-expanded", "true"), this._setDropdownPosition(), i) {
      const o = this.countryList.firstElementChild;
      o && (this._highlightListItem(o, !1), this.countryList.scrollTop = 0), this.searchInput.focus();
    }
    this._bindDropdownListeners(), this.dropdownArrow.classList.add("iti__arrow--up"), this._trigger("open:countrydropdown");
  }
  //* Set the dropdown position
  _setDropdownPosition() {
    if (this.options.dropdownContainer && this.options.dropdownContainer.appendChild(this.dropdown), !this.options.useFullscreenPopup) {
      const $ = this.telInput.getBoundingClientRect(), i = this.telInput.offsetHeight;
      this.options.dropdownContainer && (this.dropdown.style.top = `${$.top + i}px`, this.dropdown.style.left = `${$.left}px`, this._handleWindowScroll = () => this._closeDropdown(), window.addEventListener("scroll", this._handleWindowScroll));
    }
  }
  //* We only bind dropdown listeners when the dropdown is open.
  _bindDropdownListeners() {
    this._handleMouseoverCountryList = (u) => {
      var c;
      const a = (c = u.target) == null ? void 0 : c.closest(".iti__country");
      a && this._highlightListItem(a, !1);
    }, this.countryList.addEventListener(
      "mouseover",
      this._handleMouseoverCountryList
    ), this._handleClickCountryList = (u) => {
      var c;
      const a = (c = u.target) == null ? void 0 : c.closest(".iti__country");
      a && this._selectListItem(a);
    }, this.countryList.addEventListener("click", this._handleClickCountryList);
    let $ = !0;
    this._handleClickOffToClose = () => {
      $ || this._closeDropdown(), $ = !1;
    }, document.documentElement.addEventListener(
      "click",
      this._handleClickOffToClose
    );
    let i = "", o = null;
    if (this._handleKeydownOnDropdown = (u) => {
      ["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(u.key) && (u.preventDefault(), u.stopPropagation(), u.key === "ArrowUp" || u.key === "ArrowDown" ? this._handleUpDownKey(u.key) : u.key === "Enter" ? this._handleEnterKey() : u.key === "Escape" && this._closeDropdown()), !this.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(u.key) && (u.stopPropagation(), o && clearTimeout(o), i += u.key.toLowerCase(), this._searchForCountry(i), o = setTimeout(() => {
        i = "";
      }, 1e3));
    }, document.addEventListener("keydown", this._handleKeydownOnDropdown), this.options.countrySearch) {
      const u = () => {
        const c = this.searchInput.value.trim();
        c ? this._filterCountries(c) : this._filterCountries("", !0);
      };
      let a = null;
      this._handleSearchChange = () => {
        a && clearTimeout(a), a = setTimeout(() => {
          u(), a = null;
        }, 100);
      }, this.searchInput.addEventListener("input", this._handleSearchChange), this.searchInput.addEventListener("click", (c) => c.stopPropagation());
    }
  }
  //* Hidden search (countrySearch disabled): Find the first list item whose name starts with the query string.
  _searchForCountry($) {
    for (let i = 0; i < this.countries.length; i++) {
      const o = this.countries[i];
      if (o.name.substr(0, $.length).toLowerCase() === $) {
        const a = o.nodeById[this.id];
        this._highlightListItem(a, !1), this._scrollTo(a);
        break;
      }
    }
  }
  //* Country search enabled: Filter the countries according to the search query.
  _filterCountries($, i = !1) {
    let o = !0;
    this.countryList.innerHTML = "";
    const u = m2($);
    for (let a = 0; a < this.countries.length; a++) {
      const c = this.countries[a], g = m2(c.name), p = c.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map((I) => I[0]).join("").toLowerCase(), _ = `+${c.dialCode}`;
      if (i || g.includes(u) || _.includes(u) || c.iso2.includes(u) || p.includes(u)) {
        const I = c.nodeById[this.id];
        I && this.countryList.appendChild(I), o && (this._highlightListItem(I, !1), o = !1);
      }
    }
    o && this._highlightListItem(null, !1), this.countryList.scrollTop = 0, this._updateSearchResultsText();
  }
  //* Update search results text (for a11y).
  _updateSearchResultsText() {
    const { i18n: $ } = this.options, i = this.countryList.childElementCount;
    let o;
    i === 0 ? o = $.zeroSearchResults : i === 1 ? o = $.oneSearchResult : o = $.multipleSearchResults.replace("${count}", i.toString()), this.searchResultsA11yText.textContent = o;
  }
  //* Highlight the next/prev item in the list (and ensure it is visible).
  _handleUpDownKey($) {
    var o, u;
    let i = $ === "ArrowUp" ? (o = this.highlightedItem) == null ? void 0 : o.previousElementSibling : (u = this.highlightedItem) == null ? void 0 : u.nextElementSibling;
    !i && this.countryList.childElementCount > 1 && (i = $ === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild), i && (this._scrollTo(i), this._highlightListItem(i, !1));
  }
  //* Select the currently highlighted item.
  _handleEnterKey() {
    this.highlightedItem && this._selectListItem(this.highlightedItem);
  }
  //* Update the input's value to the given val (format first if possible)
  //* NOTE: this is called from _setInitialState, handleUtils and setNumber.
  _updateValFromNumber($) {
    let i = $;
    if (this.options.formatOnDisplay && m.utils && this.selectedCountryData) {
      const o = this.options.nationalMode || i.charAt(0) !== "+" && !this.options.separateDialCode, { NATIONAL: u, INTERNATIONAL: a } = m.utils.numberFormat, c = o ? u : a;
      i = m.utils.formatNumber(
        i,
        this.selectedCountryData.iso2,
        c
      );
    }
    i = this._beforeSetNumber(i), this.telInput.value = i;
  }
  //* Check if need to select a new country based on the given number
  //* Note: called from _setInitialState, keyup handler, setNumber.
  _updateCountryFromNumber($) {
    const i = this._getCountryFromNumber($);
    return i !== null ? this._setCountry(i) : !1;
  }
  _ensureHasDialCode($) {
    const { dialCode: i, nationalPrefix: o } = this.selectedCountryData;
    if ($.charAt(0) === "+" || !i)
      return $;
    const c = o && $.charAt(0) === o && !this.options.separateDialCode ? $.substring(1) : $;
    return `+${i}${c}`;
  }
  _getCountryFromNumber($) {
    const i = $.indexOf("+");
    let o = i ? $.substring(i) : $;
    const u = this.selectedCountryData.iso2, a = this.selectedCountryData.dialCode;
    o = this._ensureHasDialCode(o);
    const c = this._getDialCode(o, !0), g = B1(o);
    if (c) {
      const p = B1(c), _ = this.dialCodeToIso2Map[p];
      if (!u && this.defaultCountry && _.includes(this.defaultCountry))
        return this.defaultCountry;
      const I = u && _.includes(u) && (g.length === p.length || !this.selectedCountryData.areaCodes);
      if (!(a === "1" && y2(g)) && !I) {
        for (let N = 0; N < _.length; N++)
          if (_[N])
            return _[N];
      }
    } else {
      if (o.charAt(0) === "+" && g.length)
        return "";
      if ((!o || o === "+") && !this.selectedCountryData.iso2)
        return this.defaultCountry;
    }
    return null;
  }
  //* Remove highlighting from other list items and highlight the given item.
  _highlightListItem($, i) {
    const o = this.highlightedItem;
    if (o && (o.classList.remove("iti__highlight"), o.setAttribute("aria-selected", "false")), this.highlightedItem = $, this.highlightedItem) {
      this.highlightedItem.classList.add("iti__highlight"), this.highlightedItem.setAttribute("aria-selected", "true");
      const u = this.highlightedItem.getAttribute("id") || "";
      this.selectedCountry.setAttribute("aria-activedescendant", u), this.options.countrySearch && this.searchInput.setAttribute("aria-activedescendant", u);
    }
    i && this.highlightedItem.focus();
  }
  //* Find the country data for the given iso2 code
  //* the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
  _getCountryData($, i) {
    for (let o = 0; o < this.countries.length; o++)
      if (this.countries[o].iso2 === $)
        return this.countries[o];
    if (i)
      return null;
    throw new Error(`No country data for '${$}'`);
  }
  //* Update the selected country, dial code (if separateDialCode), placeholder, title, and active list item.
  //* Note: called from _setInitialState, _updateCountryFromNumber, _selectListItem, setCountry.
  _setCountry($) {
    const { separateDialCode: i, showFlags: o, i18n: u } = this.options, a = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
    if (this.selectedCountryData = $ ? this._getCountryData($, !1) || {} : {}, this.selectedCountryData.iso2 && (this.defaultCountry = this.selectedCountryData.iso2), this.selectedCountryInner) {
      let c = "", g = "";
      $ && o ? (c = `iti__flag iti__${$}`, g = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`) : (c = "iti__flag iti__globe", g = u.noCountrySelected), this.selectedCountryInner.className = c, this.selectedCountryA11yText.textContent = g;
    }
    if (this._setSelectedCountryTitleAttribute($, i), i) {
      const c = this.selectedCountryData.dialCode ? `+${this.selectedCountryData.dialCode}` : "";
      this.selectedDialCode.innerHTML = c, this._updateInputPadding();
    }
    return this._updatePlaceholder(), this._updateMaxLength(), a.iso2 !== $;
  }
  //* Update the input padding to make space for the selected country/dial code.
  _updateInputPadding() {
    if (this.selectedCountry) {
      const i = (this.selectedCountry.offsetWidth || this._getHiddenSelectedCountryWidth()) + 6;
      this.showSelectedCountryOnLeft ? this.telInput.style.paddingLeft = `${i}px` : this.telInput.style.paddingRight = `${i}px`;
    }
  }
  //* Update the maximum valid number length for the currently selected country.
  _updateMaxLength() {
    const { strictMode: $, placeholderNumberType: i, validationNumberTypes: o } = this.options, { iso2: u } = this.selectedCountryData;
    if ($ && m.utils)
      if (u) {
        const a = m.utils.numberType[i];
        let c = m.utils.getExampleNumber(
          u,
          !1,
          a,
          !0
        ), g = c;
        for (; m.utils.isPossibleNumber(c, u, o); )
          g = c, c += "0";
        const p = m.utils.getCoreNumber(g, u);
        this.maxCoreNumberLength = p.length, u === "by" && (this.maxCoreNumberLength = p.length + 1);
      } else
        this.maxCoreNumberLength = null;
  }
  _setSelectedCountryTitleAttribute($ = null, i) {
    if (!this.selectedCountry)
      return;
    let o;
    $ && !i ? o = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}` : $ ? o = this.selectedCountryData.name : o = "Unknown", this.selectedCountry.setAttribute("title", o);
  }
  //* When the input is in a hidden container during initialisation, we must inject some markup
  //* into the end of the DOM to calculate the correct offsetWidth.
  //* NOTE: this is only used when separateDialCode is enabled, so countryContainer and selectedCountry
  //* will definitely exist.
  _getHiddenSelectedCountryWidth() {
    if (this.telInput.parentNode) {
      const $ = this.telInput.parentNode.cloneNode(!1);
      $.style.visibility = "hidden", document.body.appendChild($);
      const i = this.countryContainer.cloneNode();
      $.appendChild(i);
      const o = this.selectedCountry.cloneNode(!0);
      i.appendChild(o);
      const u = o.offsetWidth;
      return document.body.removeChild($), u;
    }
    return 0;
  }
  //* Update the input placeholder to an example number from the currently selected country.
  _updatePlaceholder() {
    const {
      autoPlaceholder: $,
      placeholderNumberType: i,
      nationalMode: o,
      customPlaceholder: u
    } = this.options, a = $ === "aggressive" || !this.hadInitialPlaceholder && $ === "polite";
    if (m.utils && a) {
      const c = m.utils.numberType[i];
      let g = this.selectedCountryData.iso2 ? m.utils.getExampleNumber(
        this.selectedCountryData.iso2,
        o,
        c
      ) : "";
      g = this._beforeSetNumber(g), typeof u == "function" && (g = u(g, this.selectedCountryData)), this.telInput.setAttribute("placeholder", g);
    }
  }
  //* Called when the user selects a list item from the dropdown.
  _selectListItem($) {
    const i = this._setCountry(
      $.getAttribute("data-country-code")
    );
    this._closeDropdown(), this._updateDialCode($.getAttribute("data-dial-code")), this.telInput.focus(), i && this._triggerCountryChange();
  }
  //* Close the dropdown and unbind any listeners.
  _closeDropdown() {
    this.dropdownContent.classList.add("iti__hide"), this.selectedCountry.setAttribute("aria-expanded", "false"), this.selectedCountry.removeAttribute("aria-activedescendant"), this.highlightedItem && this.highlightedItem.setAttribute("aria-selected", "false"), this.options.countrySearch && this.searchInput.removeAttribute("aria-activedescendant"), this.dropdownArrow.classList.remove("iti__arrow--up"), document.removeEventListener("keydown", this._handleKeydownOnDropdown), this.options.countrySearch && this.searchInput.removeEventListener("input", this._handleSearchChange), document.documentElement.removeEventListener(
      "click",
      this._handleClickOffToClose
    ), this.countryList.removeEventListener(
      "mouseover",
      this._handleMouseoverCountryList
    ), this.countryList.removeEventListener("click", this._handleClickCountryList), this.options.dropdownContainer && (this.options.useFullscreenPopup || window.removeEventListener("scroll", this._handleWindowScroll), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)), this._handlePageLoad && window.removeEventListener("load", this._handlePageLoad), this._trigger("close:countrydropdown");
  }
  //* Check if an element is visible within it's container, else scroll until it is.
  _scrollTo($) {
    const i = this.countryList, o = document.documentElement.scrollTop, u = i.offsetHeight, a = i.getBoundingClientRect().top + o, c = a + u, g = $.offsetHeight, p = $.getBoundingClientRect().top + o, _ = p + g, I = p - a + i.scrollTop;
    if (p < a)
      i.scrollTop = I;
    else if (_ > c) {
      const A = u - g;
      i.scrollTop = I - A;
    }
  }
  //* Replace any existing dial code with the new one
  //* Note: called from _selectListItem and setCountry
  _updateDialCode($) {
    const i = this.telInput.value, o = `+${$}`;
    let u;
    if (i.charAt(0) === "+") {
      const a = this._getDialCode(i);
      a ? u = i.replace(a, o) : u = o, this.telInput.value = u;
    }
  }
  //* Try and extract a valid international dial code from a full telephone number.
  //* Note: returns the raw string inc plus character and any whitespace/dots etc.
  _getDialCode($, i) {
    let o = "";
    if ($.charAt(0) === "+") {
      let u = "";
      for (let a = 0; a < $.length; a++) {
        const c = $.charAt(a);
        if (!isNaN(parseInt(c, 10))) {
          if (u += c, i)
            this.dialCodeToIso2Map[u] && (o = $.substr(0, a + 1));
          else if (this.dialCodes[u]) {
            o = $.substr(0, a + 1);
            break;
          }
          if (u.length === this.dialCodeMaxLen)
            break;
        }
      }
    }
    return o;
  }
  //* Get the input val, adding the dial code if separateDialCode is enabled.
  _getFullNumber($) {
    const i = $ || this.telInput.value.trim(), { dialCode: o } = this.selectedCountryData;
    let u;
    const a = B1(i);
    return this.options.separateDialCode && i.charAt(0) !== "+" && o && a ? u = `+${o}` : u = "", u + i;
  }
  //* Remove the dial code if separateDialCode is enabled also cap the length if the input has a maxlength attribute
  _beforeSetNumber($) {
    let i = $;
    if (this.options.separateDialCode) {
      let o = this._getDialCode(i);
      if (o) {
        o = `+${this.selectedCountryData.dialCode}`;
        const u = i[o.length] === " " || i[o.length] === "-" ? o.length + 1 : o.length;
        i = i.substr(u);
      }
    }
    return this._cap(i);
  }
  //* Trigger the 'countrychange' event.
  _triggerCountryChange() {
    this._trigger("countrychange");
  }
  //* Format the number as the user types.
  _formatNumberAsYouType() {
    const $ = this._getFullNumber(), i = m.utils ? m.utils.formatNumberAsYouType($, this.selectedCountryData.iso2) : $, { dialCode: o } = this.selectedCountryData;
    return this.options.separateDialCode && this.telInput.value.charAt(0) !== "+" && i.includes(`+${o}`) ? (i.split(`+${o}`)[1] || "").trim() : i;
  }
  //**************************
  //*  SECRET PUBLIC METHODS
  //**************************
  //* This is called when the geoip call returns.
  handleAutoCountry() {
    this.options.initialCountry === "auto" && m.autoCountry && (this.defaultCountry = m.autoCountry, this.selectedCountryData.iso2 || this.selectedCountryInner.classList.contains("iti__globe") || this.setCountry(this.defaultCountry), this.resolveAutoCountryPromise());
  }
  //* This is called when the utils request completes.
  handleUtils() {
    m.utils && (this.telInput.value && this._updateValFromNumber(this.telInput.value), this.selectedCountryData.iso2 && (this._updatePlaceholder(), this._updateMaxLength())), this.resolveUtilsScriptPromise();
  }
  //********************
  //*  PUBLIC METHODS
  //********************
  //* Remove plugin.
  destroy() {
    var a, c;
    const { allowDropdown: $, separateDialCode: i } = this.options;
    if ($) {
      this._closeDropdown(), this.selectedCountry.removeEventListener(
        "click",
        this._handleClickSelectedCountry
      ), this.countryContainer.removeEventListener(
        "keydown",
        this._handleCountryContainerKeydown
      );
      const g = this.telInput.closest("label");
      g && g.removeEventListener("click", this._handleLabelClick);
    }
    const { form: o } = this.telInput;
    this._handleHiddenInputSubmit && o && o.removeEventListener("submit", this._handleHiddenInputSubmit), this.telInput.removeEventListener("input", this._handleInputEvent), this._handleKeydownEvent && this.telInput.removeEventListener("keydown", this._handleKeydownEvent), this.telInput.removeAttribute("data-intl-tel-input-id"), i && (this.isRTL ? this.telInput.style.paddingRight = this.originalPaddingRight : this.telInput.style.paddingLeft = this.originalPaddingLeft);
    const u = this.telInput.parentNode;
    (a = u == null ? void 0 : u.parentNode) == null || a.insertBefore(this.telInput, u), (c = u == null ? void 0 : u.parentNode) == null || c.removeChild(u), delete m.instances[this.id];
  }
  //* Get the extension from the current number.
  getExtension() {
    return m.utils ? m.utils.getExtension(
      this._getFullNumber(),
      this.selectedCountryData.iso2
    ) : "";
  }
  //* Format the number to the given format.
  getNumber($) {
    if (m.utils) {
      const { iso2: i } = this.selectedCountryData;
      return m.utils.formatNumber(
        this._getFullNumber(),
        i,
        $
      );
    }
    return "";
  }
  //* Get the type of the entered number e.g. landline/mobile.
  getNumberType() {
    return m.utils ? m.utils.getNumberType(
      this._getFullNumber(),
      this.selectedCountryData.iso2
    ) : -99;
  }
  //* Get the country data for the currently selected country.
  getSelectedCountryData() {
    return this.selectedCountryData;
  }
  //* Get the validation error.
  getValidationError() {
    if (m.utils) {
      const { iso2: $ } = this.selectedCountryData;
      return m.utils.getValidationError(this._getFullNumber(), $);
    }
    return -99;
  }
  //* Validate the input val
  isValidNumber() {
    if (!this.selectedCountryData.iso2)
      return !1;
    const $ = this._getFullNumber(), i = $.search(new RegExp("\\p{L}", "u"));
    if (i > -1) {
      const o = $.substring(0, i), u = this._utilsIsPossibleNumber(o), a = this._utilsIsPossibleNumber($);
      return u && a;
    }
    return this._utilsIsPossibleNumber($);
  }
  _utilsIsPossibleNumber($) {
    return m.utils ? m.utils.isPossibleNumber($, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Validate the input val (precise)
  isValidNumberPrecise() {
    if (!this.selectedCountryData.iso2)
      return !1;
    const $ = this._getFullNumber(), i = $.search(new RegExp("\\p{L}", "u"));
    if (i > -1) {
      const o = $.substring(0, i), u = this._utilsIsValidNumber(o), a = this._utilsIsValidNumber($);
      return u && a;
    }
    return this._utilsIsValidNumber($);
  }
  _utilsIsValidNumber($) {
    return m.utils ? m.utils.isValidNumber($, this.selectedCountryData.iso2, this.options.validationNumberTypes) : null;
  }
  //* Update the selected country, and update the input val accordingly.
  setCountry($) {
    const i = $ == null ? void 0 : $.toLowerCase(), o = this.selectedCountryData.iso2;
    ($ && i !== o || !$ && o) && (this._setCountry(i), this._updateDialCode(this.selectedCountryData.dialCode), this._triggerCountryChange());
  }
  //* Set the input value and update the country.
  setNumber($) {
    const i = this._updateCountryFromNumber($);
    this._updateValFromNumber($), i && this._triggerCountryChange(), this._trigger("input", { isSetNumber: !0 });
  }
  //* Set the placeholder number typ
  setPlaceholderNumberType($) {
    this.options.placeholderNumberType = $, this._updatePlaceholder();
  }
  setDisabled($) {
    this.telInput.disabled = $, $ ? this.selectedCountry.setAttribute("disabled", "true") : this.selectedCountry.removeAttribute("disabled");
  }
}
const Rd = (v) => {
  if (!m.utils && !m.startedLoadingUtilsScript) {
    let $;
    if (typeof v == "function")
      try {
        $ = Promise.resolve(v());
      } catch (i) {
        return Promise.reject(i);
      }
    else
      return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof v}`));
    return m.startedLoadingUtilsScript = !0, $.then((i) => {
      const o = i == null ? void 0 : i.default;
      if (!o || typeof o != "object")
        throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");
      return m.utils = o, C1("handleUtils"), !0;
    }).catch((i) => {
      throw C1("rejectUtilsScriptPromise", i), i;
    });
  }
  return null;
}, m = Object.assign(
  (v, $) => {
    const i = new Pd(v, $);
    return i._init(), v.setAttribute("data-intl-tel-input-id", i.id.toString()), m.instances[i.id] = i, i;
  },
  {
    defaults: I2,
    //* Using a static var like this allows us to mock it in the tests.
    documentReady: () => document.readyState === "complete",
    //* Get the country data object.
    getCountryData: () => e1,
    //* A getter for the plugin instance.
    getInstance: (v) => {
      const $ = v.getAttribute("data-intl-tel-input-id");
      return $ ? m.instances[$] : null;
    },
    //* A map from instance ID to instance object.
    instances: {},
    attachUtils: Rd,
    startedLoadingUtilsScript: !1,
    startedLoadingAutoCountry: !1,
    version: "25.3.0"
  }
);
(function() {
  var v = this || self;
  function $(d) {
    d.ka = void 0, d.v = function() {
      return d.ka ? d.ka : d.ka = new d();
    };
  }
  function i(d, t) {
    d = d.split(".");
    var e = v;
    d[0] in e || typeof e.execScript > "u" || e.execScript("var " + d[0]);
    for (var n; d.length && (n = d.shift()); ) d.length || t === void 0 ? e[n] && e[n] !== Object.prototype[n] ? e = e[n] : e = e[n] = {} : e[n] = t;
  }
  function o(d, t) {
    function e() {
    }
    e.prototype = t.prototype, d.la = t.prototype, d.prototype = new e(), d.prototype.constructor = d, d.ua = function(n, r, s) {
      for (var l = Array(arguments.length - 2), h = 2; h < arguments.length; h++) l[h - 2] = arguments[h];
      return t.prototype[r].apply(n, l);
    };
  }
  function u(d, t) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, u);
    else {
      const e = Error().stack;
      e && (this.stack = e);
    }
    d && (this.message = String(d)), t !== void 0 && (this.cause = t);
  }
  o(u, Error), u.prototype.name = "CustomError";
  function a(d, t) {
    d = d.split("%s");
    let e = "";
    const n = d.length - 1;
    for (let r = 0; r < n; r++) e += d[r] + (r < t.length ? t[r] : "%s");
    u.call(this, e + d[n]);
  }
  o(a, u), a.prototype.name = "AssertionError";
  function c(d, t) {
    throw new a("Failure" + (d ? ": " + d : ""), Array.prototype.slice.call(arguments, 1));
  }
  const g = Array.prototype.indexOf ? function(d, t, e) {
    return Array.prototype.indexOf.call(d, t, e);
  } : function(d, t, e) {
    if (e = e == null ? 0 : 0 > e ? Math.max(0, d.length + e) : e, typeof d == "string") return typeof t != "string" || t.length != 1 ? -1 : d.indexOf(t, e);
    for (; e < d.length; e++) if (e in d && d[e] === t) return e;
    return -1;
  };
  function p(d, t) {
    return 0 <= g(d, t);
  }
  function _(d, t) {
    return d > t ? 1 : d < t ? -1 : 0;
  }
  var I = class {
    constructor(d) {
      if (A !== A) throw Error("SafeUrl is not meant to be built directly");
      this.g = d;
    }
    toString() {
      return this.g.toString();
    }
  }, A = {};
  new I("about:invalid#zClosurez"), new I("about:blank");
  const N = {};
  class S {
    constructor() {
      if (N !== N) throw Error("SafeStyle is not meant to be built directly");
    }
    toString() {
      return "";
    }
  }
  new S();
  function D(d) {
    const t = [];
    let e = 0;
    for (const n in d) t[e++] = d[n];
    return t;
  }
  function V(d, t) {
    d: {
      for (const e in d) if (t.call(void 0, d[e], e, d)) {
        t = e;
        break d;
      }
      t = void 0;
    }
    return t && d[t];
  }
  const k = {};
  class R {
    constructor() {
      if (k !== k) throw Error("SafeStyleSheet is not meant to be built directly");
    }
    toString() {
      return "";
    }
  }
  new R();
  const G = {};
  class x1 {
    constructor() {
      var t = v.trustedTypes && v.trustedTypes.emptyHTML || "";
      if (G !== G) throw Error("SafeHtml is not meant to be built directly");
      this.g = t;
    }
    toString() {
      return this.g.toString();
    }
  }
  new x1();
  function s0(d) {
    return String(d).replace(/\-([a-z])/g, function(t, e) {
      return e.toUpperCase();
    });
  }
  function m1(d) {
    var t = document;
    return typeof d == "string" ? t.getElementById(d) : d;
  }
  function S2() {
  }
  function O1(d, t, e) {
    if (t == null) e.push("null");
    else {
      if (typeof t == "object") {
        if (Array.isArray(t)) {
          var n = t;
          t = n.length, e.push("[");
          for (var r = "", s = 0; s < t; s++) e.push(r), r = n[s], O1(d, r, e), r = ",";
          e.push("]");
          return;
        }
        if (t instanceof String || t instanceof Number || t instanceof Boolean) t = t.valueOf();
        else {
          e.push("{"), s = "";
          for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (r = t[n], typeof r != "function" && (e.push(s), u0(n, e), e.push(":"), O1(d, r, e), s = ","));
          e.push("}");
          return;
        }
      }
      switch (typeof t) {
        case "string":
          u0(t, e);
          break;
        case "number":
          e.push(isFinite(t) && !isNaN(t) ? String(t) : "null");
          break;
        case "boolean":
          e.push(String(t));
          break;
        case "function":
          e.push("null");
          break;
        default:
          throw Error("Unknown type: " + typeof t);
      }
    }
  }
  var o0 = { '"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\v": "\\u000b" }, _2 = /\uffff/.test("￿") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
  function u0(d, t) {
    t.push('"', d.replace(_2, function(e) {
      let n = o0[e];
      return n || (n = "\\u" + (e.charCodeAt(0) | 65536).toString(16).slice(1), o0[e] = n), n;
    }), '"');
  }
  function N2(d, t) {
    switch (this.g = d, this.o = t.name, this.j = !!t.aa, this.h = t.i, this.u = t.type, this.s = !1, this.h) {
      case L2:
      case T2:
      case E2:
      case M2:
      case b2:
      case w2:
      case A2:
        this.s = !0;
    }
    this.l = t.defaultValue;
  }
  var A2 = 1, w2 = 2, L2 = 3, T2 = 4, E2 = 6, M2 = 16, b2 = 18;
  function D2(d, t) {
    for (this.h = d, this.g = {}, d = 0; d < t.length; d++) {
      var e = t[d];
      this.g[e.g] = e;
    }
  }
  function k1(d) {
    return d = D(d.g), d.sort(function(t, e) {
      return t.g - e.g;
    }), d;
  }
  function P2(d, t) {
    return V(d.g, function(e) {
      return e.o == t;
    }) || null;
  }
  function B() {
    this.h = {}, this.j = this.m().g, this.g = this.l = null;
  }
  function l0(d, t) {
    for (var e in d.h) {
      var n = Number(e);
      d.j[n] || t.call(d, n, d.h[e]);
    }
  }
  B.prototype.has = function(d) {
    return T(this, d.g);
  }, B.prototype.get = function(d, t) {
    return f(this, d.g, t);
  }, B.prototype.set = function(d, t) {
    M(this, d.g, t);
  }, B.prototype.add = function(d, t) {
    h0(this, d.g, t);
  };
  function a0(d, t) {
    for (var e = k1(d.m()), n = 0; n < e.length; n++) {
      var r = e[n], s = r.g;
      if (T(t, s)) {
        d.g && delete d.g[r.g];
        var l = r.h == 11 || r.h == 10;
        if (r.j) {
          r = L(t, s);
          for (var h = 0; h < r.length; h++) h0(d, s, l ? r[h].clone() : r[h]);
        } else r = y1(t, s), l ? (l = y1(d, s)) ? a0(l, r) : M(d, s, r.clone()) : M(d, s, r);
      }
    }
  }
  B.prototype.clone = function() {
    var d = new this.constructor();
    return d != this && (d.h = {}, d.g && (d.g = {}), a0(d, this)), d;
  };
  function T(d, t) {
    return d.h[t] != null;
  }
  function y1(d, t) {
    var e = d.h[t];
    if (e == null) return null;
    if (d.l) {
      if (!(t in d.g)) {
        var n = d.l, r = d.j[t];
        if (e != null) if (r.j) {
          for (var s = [], l = 0; l < e.length; l++) s[l] = n.g(r, e[l]);
          e = s;
        } else e = n.g(r, e);
        return d.g[t] = e;
      }
      return d.g[t];
    }
    return e;
  }
  function f(d, t, e) {
    var n = y1(d, t);
    return d.j[t].j ? n[e || 0] : n;
  }
  function C(d, t) {
    if (T(d, t)) d = f(d, t);
    else d: {
      if (d = d.j[t], d.l === void 0) if (t = d.u, t === Boolean) d.l = !1;
      else if (t === Number) d.l = 0;
      else if (t === String) d.l = d.s ? "0" : "";
      else {
        d = new t();
        break d;
      }
      d = d.l;
    }
    return d;
  }
  function L(d, t) {
    return y1(d, t) || [];
  }
  function j(d, t) {
    return d.j[t].j ? T(d, t) ? d.h[t].length : 0 : T(d, t) ? 1 : 0;
  }
  function M(d, t, e) {
    d.h[t] = e, d.g && (d.g[t] = e);
  }
  function h0(d, t, e) {
    d.h[t] || (d.h[t] = []), d.h[t].push(e), d.g && delete d.g[t];
  }
  function F1(d, t) {
    delete d.h[t], d.g && delete d.g[t];
  }
  function v1(d, t) {
    var e = [], n;
    for (n in t) n != 0 && e.push(new N2(n, t[n]));
    return new D2(d, e);
  }
  function n1() {
  }
  n1.prototype.h = function(d, t) {
    return d.h == 11 || d.h == 10 ? this.l(t) : typeof t != "number" || isFinite(t) ? t : t.toString();
  }, n1.prototype.j = function(d, t) {
    return d = new d.h(), this.o(d, t), d;
  }, n1.prototype.g = function(d, t) {
    if (d.h == 11 || d.h == 10) return t instanceof B ? t : this.j(d.u.prototype.m(), t);
    if (d.h == 14) return typeof t == "string" && c0.test(t) && (d = Number(t), 0 < d) ? d : t;
    if (!d.s) return t;
    if (d = d.u, d === String) {
      if (typeof t == "number") return String(t);
    } else if (d === Number && typeof t == "string" && (t === "Infinity" || t === "-Infinity" || t === "NaN" || c0.test(t))) return Number(t);
    return t;
  };
  var c0 = /^-?[0-9]+$/;
  function X(d, t, e) {
    this.s = d, this.$ = t, this.u = e;
  }
  o(X, n1), X.prototype.l = function(d) {
    for (var t = k1(d.m()), e = {}, n = 0; n < t.length; n++) {
      var r = t[n], s = r.g;
      switch (this.s) {
        case 1:
          s = r.o;
          break;
        case 2:
          s = s0(r.o.replace(/_/g, "-"));
      }
      if (d.has(r)) if (r.j) {
        var l = [];
        for (e[s] = l, s = 0; s < j(d, r.g); s++) l.push(this.h(r, d.get(r, s)));
      } else e[s] = this.h(r, d.get(r));
    }
    return l0(d, function(h, y) {
      y !== null && (e[h] = y);
    }), e;
  }, X.prototype.h = function(d, t) {
    return this.$ && d.h == 8 && typeof t == "boolean" ? t ? 1 : 0 : X.la.h.call(this, d, t);
  }, X.prototype.g = function(d, t) {
    return d.h == 8 && typeof t == "number" ? !!t : X.la.g.call(this, d, t);
  }, X.prototype.o = function(d, t) {
    var e = d.m(), n;
    for (n in t) {
      var r = t[n], s = !/[^0-9]/.test(n);
      if (s) var l = e.g[parseInt(n, 10)] || null;
      else this.s == 2 && (n = String(n).replace(/([A-Z])/g, "-$1").toLowerCase().replace(/\-/g, "_")), l = P2(e, n);
      if (l) if (l.j) for (s = 0; s < r.length; s++) d.add(l, this.g(l, r[s]));
      else d.set(l, this.g(l, r));
      else s ? (l = d, s = Number(n), l.h[s] = r, l.g && delete l.g[s]) : this.u || c("Failed to find field: " + n);
    }
  };
  function E(d, t) {
    d != null && this.g.apply(this, arguments);
  }
  E.prototype.h = "", E.prototype.set = function(d) {
    this.h = "" + d;
  }, E.prototype.g = function(d, t, e) {
    if (this.h += String(d), t != null) for (let n = 1; n < arguments.length; n++) this.h += arguments[n];
    return this;
  };
  function x(d) {
    d.h = "";
  }
  E.prototype.toString = function() {
    return this.h;
  };
  function i1() {
    B.call(this);
  }
  o(i1, B);
  var f0 = null;
  function w() {
    B.call(this);
  }
  o(w, B);
  var p0 = null;
  function q() {
    B.call(this);
  }
  o(q, B);
  var g0 = null;
  i1.prototype.m = function() {
    var d = f0;
    return d || (f0 = d = v1(i1, { 0: { name: "NumberFormat", ja: "i18n.phonenumbers.NumberFormat" }, 1: { name: "pattern", required: !0, i: 9, type: String }, 2: { name: "format", required: !0, i: 9, type: String }, 3: { name: "leading_digits_pattern", aa: !0, i: 9, type: String }, 4: { name: "national_prefix_formatting_rule", i: 9, type: String }, 6: { name: "national_prefix_optional_when_formatting", i: 8, defaultValue: !1, type: Boolean }, 5: { name: "domestic_carrier_code_formatting_rule", i: 9, type: String } })), d;
  }, i1.m = i1.prototype.m, w.prototype.m = function() {
    var d = p0;
    return d || (p0 = d = v1(w, { 0: { name: "PhoneNumberDesc", ja: "i18n.phonenumbers.PhoneNumberDesc" }, 2: { name: "national_number_pattern", i: 9, type: String }, 9: { name: "possible_length", aa: !0, i: 5, type: Number }, 10: { name: "possible_length_local_only", aa: !0, i: 5, type: Number }, 6: { name: "example_number", i: 9, type: String } })), d;
  }, w.m = w.prototype.m, q.prototype.m = function() {
    var d = g0;
    return d || (g0 = d = v1(q, {
      0: { name: "PhoneMetadata", ja: "i18n.phonenumbers.PhoneMetadata" },
      1: { name: "general_desc", i: 11, type: w },
      2: { name: "fixed_line", i: 11, type: w },
      3: { name: "mobile", i: 11, type: w },
      4: { name: "toll_free", i: 11, type: w },
      5: { name: "premium_rate", i: 11, type: w },
      6: { name: "shared_cost", i: 11, type: w },
      7: { name: "personal_number", i: 11, type: w },
      8: { name: "voip", i: 11, type: w },
      21: { name: "pager", i: 11, type: w },
      25: { name: "uan", i: 11, type: w },
      27: { name: "emergency", i: 11, type: w },
      28: { name: "voicemail", i: 11, type: w },
      29: { name: "short_code", i: 11, type: w },
      30: { name: "standard_rate", i: 11, type: w },
      31: { name: "carrier_specific", i: 11, type: w },
      33: { name: "sms_services", i: 11, type: w },
      24: { name: "no_international_dialling", i: 11, type: w },
      9: { name: "id", required: !0, i: 9, type: String },
      10: { name: "country_code", i: 5, type: Number },
      11: { name: "international_prefix", i: 9, type: String },
      17: { name: "preferred_international_prefix", i: 9, type: String },
      12: { name: "national_prefix", i: 9, type: String },
      13: { name: "preferred_extn_prefix", i: 9, type: String },
      15: {
        name: "national_prefix_for_parsing",
        i: 9,
        type: String
      },
      16: { name: "national_prefix_transform_rule", i: 9, type: String },
      18: { name: "same_mobile_and_fixed_line_pattern", i: 8, defaultValue: !1, type: Boolean },
      19: { name: "number_format", aa: !0, i: 11, type: i1 },
      20: { name: "intl_number_format", aa: !0, i: 11, type: i1 },
      22: { name: "main_country_for_code", i: 8, defaultValue: !1, type: Boolean },
      23: { name: "leading_digits", i: 9, type: String },
      26: { name: "leading_zero_possible", i: 8, defaultValue: !1, type: Boolean }
    })), d;
  }, q.m = q.prototype.m;
  function I1() {
  }
  o(I1, n1), I1.prototype.j = function(d, t) {
    return d = new d.h(), d.l = this, d.h = t, d.g = {}, d;
  }, I1.prototype.o = function() {
    throw Error("Unimplemented");
  };
  function Q() {
  }
  o(Q, I1), Q.prototype.l = function(d) {
    for (var t = k1(d.m()), e = [], n = 0; n < t.length; n++) {
      var r = t[n];
      if (d.has(r)) {
        var s = r.g;
        if (r.j) {
          e[s] = [];
          for (var l = 0; l < j(d, r.g); l++) e[s][l] = this.h(r, d.get(r, l));
        } else e[s] = this.h(r, d.get(r));
      }
    }
    return l0(d, function(h, y) {
      e[h] = y;
    }), e;
  }, Q.prototype.h = function(d, t) {
    return d.h == 8 ? t ? 1 : 0 : n1.prototype.h.apply(this, arguments);
  }, Q.prototype.g = function(d, t) {
    return d.h == 8 ? !!t : n1.prototype.g.apply(this, arguments);
  }, Q.prototype.j = function(d, t) {
    return Q.la.j.call(this, d, t);
  };
  function d1() {
    B.call(this);
  }
  o(d1, B);
  var C0 = null, R2 = { ta: 0, sa: 1, ra: 5, qa: 10, pa: 20 };
  d1.prototype.m = function() {
    var d = C0;
    return d || (C0 = d = v1(d1, { 0: { name: "PhoneNumber", ja: "i18n.phonenumbers.PhoneNumber" }, 1: { name: "country_code", required: !0, i: 5, type: Number }, 2: { name: "national_number", required: !0, i: 4, type: Number }, 3: { name: "extension", i: 9, type: String }, 4: { name: "italian_leading_zero", i: 8, type: Boolean }, 8: { name: "number_of_leading_zeros", i: 5, defaultValue: 1, type: Number }, 5: { name: "raw_input", i: 9, type: String }, 6: { name: "country_code_source", i: 14, defaultValue: 0, type: R2 }, 7: {
      name: "preferred_domestic_carrier_code",
      i: 9,
      type: String
    } })), d;
  }, d1.ctor = d1, d1.ctor.m = d1.prototype.m;
  var Z = {
    1: "US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),
    7: ["RU", "KZ"],
    20: ["EG"],
    27: ["ZA"],
    30: ["GR"],
    31: ["NL"],
    32: ["BE"],
    33: ["FR"],
    34: ["ES"],
    36: ["HU"],
    39: ["IT", "VA"],
    40: ["RO"],
    41: ["CH"],
    43: ["AT"],
    44: ["GB", "GG", "IM", "JE"],
    45: ["DK"],
    46: ["SE"],
    47: ["NO", "SJ"],
    48: ["PL"],
    49: ["DE"],
    51: ["PE"],
    52: ["MX"],
    53: ["CU"],
    54: ["AR"],
    55: ["BR"],
    56: ["CL"],
    57: ["CO"],
    58: ["VE"],
    60: ["MY"],
    61: ["AU", "CC", "CX"],
    62: ["ID"],
    63: ["PH"],
    64: ["NZ"],
    65: ["SG"],
    66: ["TH"],
    81: ["JP"],
    82: ["KR"],
    84: ["VN"],
    86: ["CN"],
    90: ["TR"],
    91: ["IN"],
    92: ["PK"],
    93: ["AF"],
    94: ["LK"],
    95: ["MM"],
    98: ["IR"],
    211: ["SS"],
    212: ["MA", "EH"],
    213: ["DZ"],
    216: ["TN"],
    218: ["LY"],
    220: ["GM"],
    221: ["SN"],
    222: ["MR"],
    223: ["ML"],
    224: ["GN"],
    225: ["CI"],
    226: ["BF"],
    227: ["NE"],
    228: ["TG"],
    229: ["BJ"],
    230: ["MU"],
    231: ["LR"],
    232: ["SL"],
    233: ["GH"],
    234: ["NG"],
    235: ["TD"],
    236: ["CF"],
    237: ["CM"],
    238: ["CV"],
    239: ["ST"],
    240: ["GQ"],
    241: ["GA"],
    242: ["CG"],
    243: ["CD"],
    244: ["AO"],
    245: ["GW"],
    246: ["IO"],
    247: ["AC"],
    248: ["SC"],
    249: ["SD"],
    250: ["RW"],
    251: ["ET"],
    252: ["SO"],
    253: ["DJ"],
    254: ["KE"],
    255: ["TZ"],
    256: ["UG"],
    257: ["BI"],
    258: ["MZ"],
    260: ["ZM"],
    261: ["MG"],
    262: ["RE", "YT"],
    263: ["ZW"],
    264: ["NA"],
    265: ["MW"],
    266: ["LS"],
    267: ["BW"],
    268: ["SZ"],
    269: ["KM"],
    290: ["SH", "TA"],
    291: ["ER"],
    297: ["AW"],
    298: ["FO"],
    299: ["GL"],
    350: ["GI"],
    351: ["PT"],
    352: ["LU"],
    353: ["IE"],
    354: ["IS"],
    355: ["AL"],
    356: ["MT"],
    357: ["CY"],
    358: ["FI", "AX"],
    359: ["BG"],
    370: ["LT"],
    371: ["LV"],
    372: ["EE"],
    373: ["MD"],
    374: ["AM"],
    375: ["BY"],
    376: ["AD"],
    377: ["MC"],
    378: ["SM"],
    380: ["UA"],
    381: ["RS"],
    382: ["ME"],
    383: ["XK"],
    385: ["HR"],
    386: ["SI"],
    387: ["BA"],
    389: ["MK"],
    420: ["CZ"],
    421: ["SK"],
    423: ["LI"],
    500: ["FK"],
    501: ["BZ"],
    502: ["GT"],
    503: ["SV"],
    504: ["HN"],
    505: ["NI"],
    506: ["CR"],
    507: ["PA"],
    508: ["PM"],
    509: ["HT"],
    590: ["GP", "BL", "MF"],
    591: ["BO"],
    592: ["GY"],
    593: ["EC"],
    594: ["GF"],
    595: ["PY"],
    596: ["MQ"],
    597: ["SR"],
    598: ["UY"],
    599: ["CW", "BQ"],
    670: ["TL"],
    672: ["NF"],
    673: ["BN"],
    674: ["NR"],
    675: ["PG"],
    676: ["TO"],
    677: ["SB"],
    678: ["VU"],
    679: ["FJ"],
    680: ["PW"],
    681: ["WF"],
    682: ["CK"],
    683: ["NU"],
    685: ["WS"],
    686: ["KI"],
    687: ["NC"],
    688: ["TV"],
    689: ["PF"],
    690: ["TK"],
    691: ["FM"],
    692: ["MH"],
    800: ["001"],
    808: ["001"],
    850: ["KP"],
    852: ["HK"],
    853: ["MO"],
    855: ["KH"],
    856: ["LA"],
    870: ["001"],
    878: ["001"],
    880: ["BD"],
    881: ["001"],
    882: ["001"],
    883: ["001"],
    886: ["TW"],
    888: ["001"],
    960: ["MV"],
    961: ["LB"],
    962: ["JO"],
    963: ["SY"],
    964: ["IQ"],
    965: ["KW"],
    966: ["SA"],
    967: ["YE"],
    968: ["OM"],
    970: ["PS"],
    971: ["AE"],
    972: ["IL"],
    973: ["BH"],
    974: ["QA"],
    975: ["BT"],
    976: ["MN"],
    977: ["NP"],
    979: ["001"],
    992: ["TJ"],
    993: ["TM"],
    994: ["AZ"],
    995: ["GE"],
    996: ["KG"],
    998: ["UZ"]
  }, m0 = {
    AC: [, [
      ,
      ,
      "(?:[01589]\\d|[46])\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [5, 6]
    ], [, , "6[2-467]\\d{3}", , , , "62889", , , [5]], [, , "4\\d{4}", , , , "40123", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AC", 247, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "[01589]\\d{5}", , , , "542011", , , [6]], , , [, , , , , , , , , [-1]]],
    AD: [
      ,
      [, , "(?:1|6\\d)\\d{7}|[136-9]\\d{5}", , , , , , , [6, 8, 9]],
      [, , "[78]\\d{5}", , , , "712345", , , [6]],
      [, , "690\\d{6}|[36]\\d{5}", , , , "312345", , , [6, 9]],
      [, , "180[02]\\d{4}", , , , "18001234", , , [8]],
      [, , "[19]\\d{5}", , , , "912345", , , [6]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "AD",
      376,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{3})", "$1 $2", ["[136-9]"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["1"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , "1800\\d{4}", , , , , , , [8]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    AE: [, [, , "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", , , , , , , [5, 6, 7, 8, 9, 10, 11, 12]], [, , "[2-4679][2-8]\\d{6}", , , , "22345678", , , [8], [7]], [, , "5[024-68]\\d{7}", , , , "501234567", , , [9]], [, , "400\\d{6}|800\\d{2,9}", , , , "800123456"], [
      ,
      ,
      "900[02]\\d{5}",
      ,
      ,
      ,
      "900234567",
      ,
      ,
      [9]
    ], [, , "700[05]\\d{5}", , , , "700012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AE", 971, "00", "0", , , "0", , , , [[, "([2-4679])(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-4679][2-8]"], "0$1"], [, "(5\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], [, "([479]00)(\\d)(\\d{5})", "$1 $2 $3", ["[479]00"], "$1"], [, "([68]00)(\\d{2,9})", "$1 $2", ["[68]00"], "$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "600[25]\\d{5}", , , , "600212345", , , [9]], , , [, , , , , , , , , [-1]]],
    AF: [, [, , "[2-7]\\d{8}", , , , , , , [9], [7]], [
      ,
      ,
      "(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",
      ,
      ,
      ,
      "234567890",
      ,
      ,
      ,
      [7]
    ], [, , "7(?:[014-9]\\d|2[89]|3[01])\\d{6}", , , , "701234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AF", 93, "00", "0", , , "0", , , , [[, "([2-7]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    AG: [, [, , "(?:268|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}", , , , "2684601234", , , , [7]], [
      ,
      ,
      "268(?:464|7(?:1[3-9]|2\\d|3[246]|64|[78][0-689]))\\d{4}",
      ,
      ,
      ,
      "2684641234",
      ,
      ,
      ,
      [7]
    ], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "26848[01]\\d{4}", , , , "2684801234", , , , [7]], "AG", 1, "011", "1", , , "1", , , , , , [, , "26840[69]\\d{4}", , , , "2684061234", , , , [7]], , "268", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    AI: [, [, , "(?:264|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "2644(?:6[12]|9[78])\\d{4}", , , , "2644612345", , , , [7]], [
      ,
      ,
      "264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",
      ,
      ,
      ,
      "2642351234",
      ,
      ,
      ,
      [7]
    ], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "AI", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "264", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    AL: [, [, , "(?:(?:[2-58]|6\\d)\\d\\d|700)\\d{5}|(?:8\\d{2,3}|900)\\d{3}", , , , , , , [6, 7, 8, 9], [5]], [
      ,
      ,
      "(?:[2358](?:[16-9]\\d[2-9]|[2-5][2-9]\\d)|4(?:[2-57-9][2-9]\\d|6\\d{2}))\\d{4}",
      ,
      ,
      ,
      "22345678",
      ,
      ,
      [8],
      [5, 6, 7]
    ], [, , "6(?:[689][2-9]|7[2-6])\\d{6}", , , , "662123456", , , [9]], [, , "800\\d{4}", , , , "8001234", , , [7]], [, , "900[1-9]\\d{2}", , , , "900123", , , [6]], [, , "808[1-9]\\d{2}", , , , "808123", , , [6]], [, , "700[2-9]\\d{4}", , , , "70021234", , , [8]], [, , , , , , , , , [-1]], "AL", 355, "00", "0", , , "0", , , , [[, "(4)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[0-6]"], "0$1"], [, "(6\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4[7-9]"], "0$1"], [
      ,
      "(\\d{3})(\\d{3,5})",
      "$1 $2",
      ["[235][16-9]|[79]|8[016-9]"],
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    AM: [
      ,
      [, , "(?:[1-489]\\d|55|60|77)\\d{6}", , , , , , , [8], [5, 6]],
      [, , "(?:1[0-2]\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2|47\\d)\\d{5}", , , , "10123456", , , , [5, 6]],
      [, , "(?:4[1349]|55|77|88|9[13-9])\\d{6}", , , , "77123456"],
      [, , "800\\d{5}", , , , "80012345"],
      [, , "90[016]\\d{5}", , , , "90012345"],
      [, , "80[1-4]\\d{5}", , , , "80112345"],
      [, , , , , , , , , [-1]],
      [, , "60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|90)\\d{4}", , , , "60271234"],
      "AM",
      374,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], [, "(\\d{2})(\\d{6})", "$1 $2", ["4[1349]|[5-7]|88|9[1-9]"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["[23]"], "(0$1)"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8|90"], "0 $1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    AO: [
      ,
      [, , "[29]\\d{8}", , , , , , , [9]],
      [, , "2\\d(?:[25-9]\\d|\\d[25-9])\\d{5}", , , , "222123456"],
      [, , "9[1-49]\\d{7}", , , , "923123456"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "AO",
      244,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    AR: [
      ,
      [, , "(?:11|(?:[2368]|9\\d)\\d)\\d{8}", , , , , , , [10, 11], [6, 7, 8]],
      [
        ,
        ,
        "11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:[07]\\d|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|6[013-9])|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[012789]\\d|3[1-6]|4[02-9]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:0[0124-9]|[1-357]\\d|4[24-7]|6[02-9]|8[0-79]|9[1236-8])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[069]\\d|1[1568]|2[013-9]|3[145]|4[0-35-9]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[01578]\\d|2[15-7]|3[0-24-9]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}",
        ,
        ,
        ,
        "1123456789",
        ,
        ,
        [10],
        [6, 7, 8]
      ],
      [, , "675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})", , , , "91123456789", , , , [6, 7, 8]],
      [, , "800\\d{7}", , , , "8001234567", , , [10]],
      [, , "60[04579]\\d{7}", , , , "6001234567", , , [10]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "AR",
      54,
      "00",
      "0",
      ,
      ,
      "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?",
      "9$1",
      ,
      ,
      [[, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], [, "(\\d{2})(\\d{4})", "$1-$2", ["[2-9]"], "$1"], [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-9]"], "$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9]"], "$1"], [, "(9)(11)(\\d{4})(\\d{4})", "$2 15-$3-$4", ["911"], "0$1"], [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", [
        "9(?:2[2-4689]|3[3-8])",
        "9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))",
        "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))",
        "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"
      ], "0$1"], [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9[23]"], "0$1"], [, "(11)(\\d{4})(\\d{4})", "$1 $2-$3", ["11"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", [
        "2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])",
        "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))",
        "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"
      ], "0$1", , 1], [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1], [, "(\\d{3})", "$1", ["1[0-2]|911"], "$1"]],
      [[, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], [, "(9)(11)(\\d{4})(\\d{4})", "$1 $2 $3-$4", ["911"]], [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3-$4", [
        "9(?:2[2-4689]|3[3-8])",
        "9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))",
        "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))",
        "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"
      ]], [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3-$4", ["9[23]"]], [
        ,
        "(11)(\\d{4})(\\d{4})",
        "$1 $2-$3",
        ["11"],
        "0$1",
        ,
        1
      ], [
        ,
        "(\\d{3})(\\d{3})(\\d{4})",
        "$1 $2-$3",
        ["2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],
        "0$1",
        ,
        1
      ], [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , "810\\d{7}", , , , , , , [10]],
      [, , "810\\d{7}", , , , "8101234567", , , [10]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    AS: [, [, , "(?:[58]\\d\\d|684|900)\\d{7}", , , , , , , [10], [7]], [, , "6846(?:22|33|44|55|77|88|9[19])\\d{4}", , , , "6846221234", , , , [7]], [, , "684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}", , , , "6847331234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [
      ,
      ,
      "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
      ,
      ,
      ,
      "5002345678"
    ], [, , , , , , , , , [-1]], "AS", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "684", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    AT: [
      ,
      [, , "[1-35-9]\\d{8,12}|4(?:[0-24-9]\\d{4,11}|3(?:[05]\\d{3,10}|[2-467]\\d{3,4}|8\\d{3,6}|9\\d{3,7}))|[1-35-8]\\d{7}|[1-35-7]\\d{5,6}|[15]\\d{4}|1\\d{3}", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [3]],
      [
        ,
        ,
        "1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}",
        ,
        ,
        ,
        "1234567890",
        ,
        ,
        ,
        [3]
      ],
      [, , "6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}", , , , "664123456", , , [7, 8, 9, 10, 11, 12, 13]],
      [, , "800\\d{6,10}", , , , "800123456", , , [9, 10, 11, 12, 13]],
      [, , "9(?:0[01]|3[019])\\d{6,10}", , , , "900123456", , , [9, 10, 11, 12, 13]],
      [, , "8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}", , , , "810123456", , , [8, 9, 10, 11, 12, 13]],
      [, , , , , , , , , [-1]],
      [, , "5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|7[28]0\\d{6,10}", , , , "780123456", , , [5, 6, 7, 8, 9, 10, 11, 12, 13]],
      "AT",
      43,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(116\\d{3})", "$1", ["116"], "$1"], [
        ,
        "(1)(\\d{3,12})",
        "$1 $2",
        ["1"],
        "0$1"
      ], [, "(5\\d)(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], [, "(5\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5[079]"], "0$1"], [, "(5\\d)(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5[079]"], "0$1"], [, "(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:[28]0|32)|[89]"], "0$1"], [, "(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], [, "(\\d{4})(\\d{3,9})", "$1 $2", ["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:[24][1-8]|35|[5-79])"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    AU: [
      ,
      [, , "1\\d{4,9}|(?:[2-478]\\d\\d|550)\\d{6}", , , , , , , [5, 6, 7, 8, 9, 10]],
      [, , "[237]\\d{8}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|[6-8]\\d{4}|9(?:[02-9]\\d{3}|1(?:[0-57-9]\\d{2}|6[0135-9]\\d)))\\d{3}", , , , "212345678", , , [9], [8]],
      [, , "4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2457-9]|9[017-9])\\d{6}", , , , "412345678", , , [9]],
      [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]],
      [, , "19(?:0[0126]\\d|[679])\\d{5}", , , , "1900123456", , , [8, 10]],
      [, , "13(?:00\\d{3}|45[0-4]|\\d)\\d{3}", , , , "1300123456", , , [6, 8, 10]],
      [, , , , , , , , , [-1]],
      [, , "(?:14(?:5\\d|71)|550\\d)\\d{5}", , , , "550123456", , , [9]],
      "AU",
      61,
      "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011)|001[14-689]",
      "0",
      ,
      ,
      "0",
      ,
      "0011",
      ,
      [
        [, "([2378])(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"],
        [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|[45]"], "0$1"],
        [, "(16)(\\d{3,4})", "$1 $2", ["16"], "0$1"],
        [, "(16)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"],
        [, "(1[389]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[389]0", "1(?:[38]0|9)0"]],
        [, "(180)(2\\d{3})", "$1 $2", ["180", "1802"]],
        [, "(19\\d)(\\d{3})", "$1 $2", ["19[13]"]],
        [, "(19\\d{2})(\\d{4})", "$1 $2", ["19[679]"]],
        [, "(13)(\\d{2})(\\d{2})", "$1 $2 $3", ["13[1-9]"]]
      ],
      ,
      [, , "16\\d{3,7}", , , , "1612345", , , [5, 6, 7, 8, 9]],
      1,
      ,
      [, , "1(?:3(?:00\\d{3}|45[0-4]|\\d)\\d{3}|80(?:0\\d{6}|2\\d{3}))", , , , , , , [6, 7, 8, 10]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    AW: [, [, , "(?:[25-79]\\d\\d|800)\\d{4}", , , , , , , [7]], [, , "5(?:2\\d|8[1-9])\\d{4}", , , , "5212345"], [
      ,
      ,
      "(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",
      ,
      ,
      ,
      "5601234"
    ], [, , "800\\d{4}", , , , "8001234"], [, , "900\\d{4}", , , , "9001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:28\\d|501)\\d{4}", , , , "5011234"], "AW", 297, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    AX: [, [, , "1\\d{5,11}|(?:[27]|4\\d)\\d{4,9}|[356]0\\d{6,8}|800\\d{4,7}|[35]0\\d{4,5}", , , , , , , [5, 6, 7, 8, 9, 10, 11, 12]], [, , "18[1-8]\\d{3,9}", , , , "181234567", , , [6, 7, 8, 9, 10, 11, 12]], [, , "4\\d{5,10}|50\\d{4,8}", , , , "412345678", , , [
      6,
      7,
      8,
      9,
      10,
      11
    ]], [, , "800\\d{4,7}", , , , "8001234567", , , [7, 8, 9, 10]], [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AX", 358, "00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))", "0", , , "0", , "00", , , , [, , , , , , , , , [-1]], , , [, , "[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})", , , , , , , [5, 6, 7, 8, 9, 10]], [
      ,
      ,
      "[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})",
      ,
      ,
      ,
      "10112345",
      ,
      ,
      [5, 6, 7, 8, 9, 10]
    ], , , [, , , , , , , , , [-1]]],
    AZ: [, [, , "(?:(?:(?:[12457]\\d|60|88)\\d|365)\\d{3}|900200)\\d{3}", , , , , , , [9], [7]], [, , "(?:1[28]\\d{3}|2(?:02|1[24]|2[2-4]|33|[45]2|6[23])\\d{2}|365(?:[0-46-9]\\d|5[0-35-9]))\\d{4}", , , , "123123456", , , , [7]], [, , "(?:36554|(?:4[04]|5[015]|60|7[07])\\d{3})\\d{4}", , , , "401234567"], [, , "88\\d{7}", , , , "881234567"], [, , "900200\\d{3}", , , , "900200123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AZ", 994, "00", "0", , , "0", , , , [[
      ,
      "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["1[28]|2(?:[0-36]|[45]2)|365"],
      "(0$1)"
    ], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[4-8]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BA: [, [, , "(?:[3589]\\d|49|6\\d\\d?|70)\\d{6}", , , , , , , [8, 9], [6]], [, , "(?:3(?:[05679][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}", , , , "30212345", , , [8], [6]], [
      ,
      ,
      "6(?:0(?:3\\d|40)|[1-356]\\d|44[0-6]|71[137])\\d{5}",
      ,
      ,
      ,
      "61123456"
    ], [, , "8[08]\\d{6}", , , , "80123456", , , [8]], [, , "9[0246]\\d{6}", , , , "90123456", , , [8]], [, , "8[12]\\d{6}", , , , "82123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BA", 387, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-356]|[7-9]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6[047]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "70(?:3[0146]|[56]0)\\d{4}", , , , "70341234", , , [8]], , , [, , , , , , , , , [-1]]],
    BB: [, [
      ,
      ,
      "(?:246|[58]\\d\\d|900)\\d{7}",
      ,
      ,
      ,
      ,
      ,
      ,
      [10],
      [7]
    ], [, , "246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7(?:37|57)|9(?:1[89]|63))\\d{4}", , , , "2464123456", , , , [7]], [, , "246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|69[5-7]|8(?:[2-5]\\d|83))\\d{4}", , , , "2462501234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}|246976\\d{4}", , , , "9002123456", , , , [7]], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [
      ,
      ,
      "24631\\d{5}",
      ,
      ,
      ,
      "2463101234",
      ,
      ,
      ,
      [7]
    ], "BB", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "246", [, , , , , , , , , [-1]], [, , "246(?:292|367|4(?:1[7-9]|3[01]|44|67)|736)\\d{4}", , , , "2464301234", , , , [7]], , , [, , , , , , , , , [-1]]],
    BD: [, [, , "[13469]\\d{9}|8[0-79]\\d{7,8}|[2-7]\\d{8}|[2-9]\\d{7}|[3-689]\\d{6}|[57-9]\\d{5}", , , , , , , [6, 7, 8, 9, 10]], [
      ,
      ,
      "2(?:[45]\\d{3}|7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|41|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[01367]|7[15]|8[0146-9]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8)|62\\d{2})|71\\d{2}|8(?:[18]|23|54)\\d{2}|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}",
      ,
      ,
      ,
      "27111234",
      ,
      ,
      [6, 7, 8, 9]
    ], [, , "(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}", , , , "1812345678", , , [10]], [, , "80[03]\\d{7}", , , , "8001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "96(?:0[469]|1[0-4]|3[389]|6[69]|7[78])\\d{6}", , , , "9604123456", , , [10]], "BD", 880, "00", "0", , , "0", , , , [[, "(2)(\\d{7,8})", "$1-$2", ["2"], "0$1"], [, "(\\d{2})(\\d{4,6})", "$1-$2", ["[3-79]1"], "0$1"], [
      ,
      "(\\d{4})(\\d{3,6})",
      "$1-$2",
      ["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[01367])"],
      "0$1"
    ], [, "(\\d{3})(\\d{3,7})", "$1-$2", ["[3-79][2-9]|8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BE: [, [, , "4\\d{8}|[1-9]\\d{7}", , , , , , , [8, 9]], [, , "(?:(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|9[2-4])\\d|8(?:0[2-8]|[1-79]\\d))\\d{5}", , , , "12345678", , , [8]], [, , "4(?:5[56]|6[0135-8]|[79]\\d|8[3-9])\\d{6}", , , , "470123456", , , [9]], [, , "800[1-9]\\d{4}", , , , "80012345", , , [8]], [
      ,
      ,
      "(?:70(?:2[0-57]|3[0457]|44|69|7[0579])|90(?:0[0-35-8]|1[36]|2[0-3568]|3[0135689]|4[2-68]|5[1-68]|6[0-378]|7[23568]|9[34679]))\\d{4}",
      ,
      ,
      ,
      "90012345",
      ,
      ,
      [8]
    ], [, , "7879\\d{4}", , , , "78791234", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BE", 32, "00", "0", , , "0", , , , [[, "(\\d{3,4})", "$1", ["1(?:0[0-8]|1[027]|2[0139]|3[019]|4[0159]|5[1569]|6[136]|[78])|[2-9]"]], [, "(\\d{6})", "$1", ["116", "116[01]", "116(?:00|11)", "116(?:000|117)"]], [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|4[23]|9[2-4]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-7]|8(?:0[2-8]|[1-79])"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"], [
      ,
      "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["4"],
      "0$1"
    ]], [[, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|4[23]|9[2-4]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-7]|8(?:0[2-8]|[1-79])"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "78(?:0[57]|1[0458]|2[25]|3[5-8]|48|[56]0|7[078])\\d{4}", , , , "78102345", , , [8]], , , [, , , , , , , , , [-1]]],
    BF: [, [
      ,
      ,
      "[25-7]\\d{7}",
      ,
      ,
      ,
      ,
      ,
      ,
      [8]
    ], [, , "2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}", , , , "20491234"], [, , "(?:5[124-8]|[67]\\d)\\d{6}", , , , "70123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BF", 226, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[25-7]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BG: [, [, , "[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", , , , , , , [6, 7, 8, 9], [4, 5]], [
      ,
      ,
      "2\\d{5,7}|(?:[36]\\d|5[1-9]|8[1-6]|9[1-7])\\d{5,6}|(?:4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}",
      ,
      ,
      ,
      "2123456",
      ,
      ,
      [6, 7, 8],
      [4, 5]
    ], [, , "(?:8[7-9]\\d|9(?:8\\d|9[69]))\\d{6}|4(?:3[0789]|8\\d)\\d{5}", , , , "48123456", , , [8, 9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "90\\d{6}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , "700\\d{5}", , , , "70012345", , , [8]], [, , , , , , , , , [-1]], "BG", 359, "00", "0", , , "0", , , , [[, "(2)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], [, "(2)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["43[124-7]|70[1-9]"], "0$1"], [
      ,
      "(\\d{3})(\\d{3})(\\d{2})",
      "$1 $2 $3",
      ["43[124-7]|70[1-9]"],
      "0$1"
    ], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[78]00"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["99[69]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["48|8[7-9]|9[08]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BH: [, [, , "[136-9]\\d{7}", , , , , , , [8]], [
      ,
      ,
      "(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d\\d))\\d{4}",
      ,
      ,
      ,
      "17001234"
    ], [, , "(?:3(?:[1-4679]\\d|5[013-69]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:3[03-9]|[69]\\d|7[0-6])))\\d{4}", , , , "36001234"], [, , "80\\d{6}", , , , "80123456"], [, , "(?:87|9[014578])\\d{6}", , , , "90123456"], [, , "84\\d{6}", , , , "84123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BH", 973, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[1367]|8[047]|9[014578]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BI: [, [, , "(?:[267]\\d|31)\\d{6}", , , , , , , [8]], [, , "22\\d{6}", , , , "22201234"], [
      ,
      ,
      "(?:29|31|6[189]|7[125-9])\\d{6}",
      ,
      ,
      ,
      "79561234"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BI", 257, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|6[189]|7[125-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BJ: [
      ,
      [, , "[2689]\\d{7}", , , , , , , [8]],
      [, , "2(?:02|1[037]|2[45]|3[68])\\d{5}", , , , "20211234"],
      [, , "(?:6\\d|9[03-9])\\d{6}", , , , "90011234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "857[58]\\d{4}", , , , "85751234"],
      "BJ",
      229,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "81\\d{6}", , , , "81123456"],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    BL: [, [, , "(?:590|69\\d)\\d{6}", , , , , , , [9]], [, , "590(?:2[7-9]|5[12]|87)\\d{4}", , , , "590271234"], [, , "69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}", , , , "690001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BL", 590, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BM: [, [
      ,
      ,
      "(?:441|[58]\\d\\d|900)\\d{7}",
      ,
      ,
      ,
      ,
      ,
      ,
      [10],
      [7]
    ], [, , "441(?:2(?:02|23|61|[3479]\\d)|[46]\\d{2}|5(?:4\\d|60|89)|824)\\d{4}", , , , "4412345678", , , , [7]], [, , "441(?:[37]\\d|5[0-39])\\d{5}", , , , "4413701234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "BM", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "441", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BN: [, [, , "[2-578]\\d{6}", , , , , , , [7]], [
      ,
      ,
      "(?:2(?:[013-9]\\d|2[0-7])|[3-5]\\d\\d)\\d{4}",
      ,
      ,
      ,
      "2345678"
    ], [, , "(?:22[89]|[78]\\d\\d)\\d{4}", , , , "7123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BN", 673, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BO: [, [, , "(?:[2-467]\\d{3}|80017)\\d{4}", , , , , , , [8, 9], [7]], [
      ,
      ,
      "(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}",
      ,
      ,
      ,
      "22123456",
      ,
      ,
      [8],
      [7]
    ], [, , "[67]\\d{7}", , , , "71234567", , , [8]], [, , "80017\\d{4}", , , , "800171234", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BO", 591, "00(1\\d)?", "0", , , "0(1\\d)?", , , , [[, "([234])(\\d{7})", "$1 $2", ["[2-4]"], , "0$CC $1"], [, "([67]\\d{7})", "$1", ["[67]"], , "0$CC $1"], [, "(800)(\\d{2})(\\d{4})", "$1 $2 $3", ["800"], , "0$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BQ: [, [, , "(?:[34]1|7\\d)\\d{5}", , , , , , , [7]], [
      ,
      ,
      "(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}",
      ,
      ,
      ,
      "7151234"
    ], [, , "(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}", , , , "3181234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BQ", 599, "00", , , , , , , , , , [, , , , , , , , , [-1]], , "[347]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BR: [
      ,
      [, , "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", , , , , , , [8, 9, 10, 11]],
      [, , "(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}", , , , "1123456789", , , [10], [8]],
      [, , "(?:[189][1-9]|2[12478])(?:7|9\\d)\\d{7}|(?:3[1-578]|[46][1-9]|5[13-5]|7[13-579])(?:[6-9]|9\\d)\\d{7}", , , , "11961234567", , , [10, 11], [8]],
      [, , "800\\d{6,7}", , , , "800123456", , , [9, 10]],
      [, , "(?:300|[59]00\\d?)\\d{6}", , , , "300123456", , , [9, 10]],
      [, , "(?:300\\d(?:\\d{2})?|4(?:0(?:0\\d|20)|370))\\d{4}", , , , "40041234", , , [8, 10]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "BR",
      55,
      "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)",
      "0",
      ,
      ,
      "0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?",
      "$2",
      ,
      ,
      [[, "(\\d{4})(\\d{4})", "$1-$2", [
        "300|4(?:0[02]|37)",
        "300|4(?:0(?:0|20)|370)"
      ]], [, "([3589]00)(\\d{2,3})(\\d{4})", "$1 $2 $3", ["[3589]00"], "0$1"], [, "(\\d{3,5})", "$1", ["1[125689]"]], [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9](?:0[1-9]|[1-9])"]], [, "(\\d{5})(\\d{4})", "$1-$2", ["9(?:0[1-9]|[1-9])"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]9"], "($1)", "0 $CC ($1)"]],
      [[, "(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "300|4(?:0(?:0|20)|370)"]], [
        ,
        "([3589]00)(\\d{2,3})(\\d{4})",
        "$1 $2 $3",
        ["[3589]00"],
        "0$1"
      ], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]9"], "($1)", "0 $CC ($1)"]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , "(?:300\\d|40(?:0\\d|20))\\d{4}", , , , , , , [8]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    BS: [, [, , "(?:242|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-4]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}", , , , "2423456789", , , , [7]], [
      ,
      ,
      "242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}",
      ,
      ,
      ,
      "2423591234",
      ,
      ,
      ,
      [7]
    ], [, , "242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456", , , , [7]], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "BS", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "242", [, , , , , , , , , [-1]], [, , "242225[0-46-9]\\d{3}", , , , "2422250123"], , , [, , , , , , , , , [-1]]],
    BT: [, [, , "[17]\\d{7}|[2-8]\\d{6}", , , , , , , [7, 8], [6]], [, , "(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}", , , , "2345678", , , [7], [6]], [
      ,
      ,
      "(?:1[67]|77)\\d{6}",
      ,
      ,
      ,
      "17123456",
      ,
      ,
      [8]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BT", 975, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1|77"]], [, "([2-8])(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BW: [, [, , "(?:(?:[2-6]|7\\d)\\d|90)\\d{5}", , , , , , , [7, 8]], [
      ,
      ,
      "(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}",
      ,
      ,
      ,
      "2401234",
      ,
      ,
      [7]
    ], [, , "7(?:[1-6]\\d|7[014-8])\\d{5}", , , , "71123456", , , [8]], [, , , , , , , , , [-1]], [, , "90\\d{5}", , , , "9012345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "79[12][01]\\d{4}", , , , "79101234", , , [8]], "BW", 267, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-6]"]], [, "(\\d{2})(\\d{5})", "$1 $2", ["90"]], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    BY: [
      ,
      [
        ,
        ,
        "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",
        ,
        ,
        ,
        ,
        ,
        ,
        [6, 7, 8, 9, 10, 11],
        [5]
      ],
      [, , "(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}", , , , "152450911", , , [9], [5, 6, 7]],
      [, , "(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}", , , , "294911911", , , [9]],
      [, , "8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}", , , , "8011234567"],
      [, , "(?:810|902)\\d{7}", , , , "9021234567", , , [10]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "249\\d{6}", , , , "249123456", , , [9]],
      "BY",
      375,
      "810",
      "8",
      ,
      ,
      "8?0?",
      ,
      "8~10",
      ,
      [[, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["17[0-3589]|2[4-9]|[34]", "17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"], "8 0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])", "1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"], "8 0$1"], [
        ,
        "(\\d{4})(\\d{2})(\\d{3})",
        "$1 $2-$3",
        ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],
        "8 0$1"
      ], [, "([89]\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8[01]|9"], "8 $1"], [, "(82\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["82"], "8 $1"], [, "(800)(\\d{3})", "$1 $2", ["800"], "8 $1"], [, "(800)(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , "8(?:0[13]|10|20\\d)\\d{7}|800\\d{3,7}|902\\d{7}"],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    BZ: [
      ,
      [, , "(?:0800\\d|[2-8])\\d{6}", , , , , , , [7, 11]],
      [, , "(?:2(?:[02]\\d|36)|[3-58][02]\\d|7(?:[02]\\d|32))\\d{4}", , , , "2221234", , , [7]],
      [, , "6[0-35-7]\\d{5}", , , , "6221234", , , [7]],
      [, , "0800\\d{7}", , , , "08001234123", , , [11]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "BZ",
      501,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], [, "(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    CA: [
      ,
      [, , "(?:[2-8]\\d|90)\\d{8}", , , , , , , [10], [7]],
      [
        ,
        ,
        "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
        ,
        ,
        ,
        "5062345678",
        ,
        ,
        ,
        [7]
      ],
      [, , "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}", , , , "2042345678", , , , [7]],
      [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
      [, , "900[2-9]\\d{6}", , , , "9002123456"],
      [, , , , , , , , , [-1]],
      [, , "(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}", , , , "5002345678"],
      [, , "600[2-9]\\d{6}", , , , "6002012345"],
      "CA",
      1,
      "011",
      "1",
      ,
      ,
      "1",
      ,
      ,
      1,
      ,
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    CC: [, [, , "1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}", , , , , , , [6, 7, 8, 9, 10]], [, , "8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:08|22|68)|4[29]8|62\\d|70[23]|959))\\d{3}", , , , "891621234", , , [9], [8]], [, , "4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2547-9]|9[017-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "19(?:0[0126]\\d|[679])\\d{5}", , , , "1900123456", , , [8, 10]], [
      ,
      ,
      "13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",
      ,
      ,
      ,
      "1300123456",
      ,
      ,
      [6, 8, 10]
    ], [, , , , , , , , , [-1]], [, , "(?:14(?:5\\d|71)|550\\d)\\d{5}", , , , "550123456", , , [9]], "CC", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CD: [
      ,
      [, , "[189]\\d{8}|[1-68]\\d{6}", , , , , , , [7, 9]],
      [, , "12\\d{7}|[1-6]\\d{6}", , , , "1234567"],
      [, , "(?:8(?:[0-2459]\\d\\d|8)|9[017-9]\\d\\d)\\d{5}", , , , "991234567"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "CD",
      243,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], [, "(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["12"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    CF: [
      ,
      [, , "(?:[27]\\d{3}|8776)\\d{4}", , , , , , , [8]],
      [, , "2[12]\\d{6}", , , , "21612345"],
      [, , "7[0257]\\d{6}", , , , "70012345"],
      [, , , , , , , , , [-1]],
      [, , "8776\\d{4}", , , , "87761234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "CF",
      236,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    CG: [, [, , "(?:(?:0\\d|80)\\d|222)\\d{6}", , , , , , , [9]], [, , "222[1-589]\\d{5}", , , , "222123456"], [, , "0[14-6]\\d{7}", , , , "061234567"], [, , , , , , , , , [-1]], [, , "80(?:0\\d\\d|11[0-4])\\d{4}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CG", 242, "00", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["801"]], [
      ,
      "(\\d{2})(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["[02]"]
    ], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CH: [, [, , "8\\d{11}|[2-9]\\d{8}", , , , , , , [9, 12]], [, , "(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}", , , , "212345678", , , [9]], [, , "7[5-9]\\d{7}", , , , "781234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "90[016]\\d{6}", , , , "900123456", , , [9]], [, , "84[0248]\\d{6}", , , , "840123456", , , [9]], [, , "878\\d{6}", , , , "878123456", , , [9]], [, , , , , , , , , [-1]], "CH", 41, "00", "0", , , "0", , , , [[
      ,
      "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["2[12467]|3[1-4]|4[134]|5[12568]|6[12]|7(?:[15-9]|4[0248])|[89]1"],
      "0$1"
    ], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8(?:00|4[0248]|78)|90[016]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["860"], "0$1"]], , [, , "74[0248]\\d{6}", , , , "740123456", , , [9]], , , [, , , , , , , , , [-1]], [, , "5[18]\\d{7}", , , , "581234567", , , [9]], , , [, , "860\\d{9}", , , , "860123456789", , , [12]]],
    CI: [, [, , "[02-8]\\d{7}", , , , , , , [8]], [
      ,
      ,
      "(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",
      ,
      ,
      ,
      "21234567"
    ], [, , "(?:[07][1-9]|[45]\\d|6[014-9]|8[4-9])\\d{6}", , , , "01234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CI", 225, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[02-8]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CK: [
      ,
      [, , "[2-8]\\d{4}", , , , , , , [5]],
      [, , "(?:2\\d|3[13-7]|4[1-5])\\d{3}", , , , "21234"],
      [, , "[5-8]\\d{4}", , , , "71234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "CK",
      682,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{3})", "$1 $2", ["[2-8]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    CL: [, [, , "(?:1230|[2-57-9]\\d|6\\d{1,3})\\d{7}", , , , , , , [9, 10, 11]], [, , "2(?:1962\\d{4}|2\\d{7}|32[0-46-8]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[3-9]\\d)\\d{6}", , , , "221234567", , , [9]], [
      ,
      ,
      "2(?:1962\\d{4}|2\\d{7}|32[0-46-8]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[3-9]\\d)\\d{6}",
      ,
      ,
      ,
      "961234567",
      ,
      ,
      [9]
    ], [, , "800\\d{6}|1230\\d{7}", , , , "800123456", , , [9, 11]], [, , , , , , , , , [-1]], [, , "600\\d{7,8}", , , , "6001234567", , , [10, 11]], [, , , , , , , , , [-1]], [, , "44\\d{7}", , , , "441234567", , , [9]], "CL", 56, "(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0", , , , , , , 1, [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"]], [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], [
      ,
      "([68]00)(\\d{3})(\\d{3,4})",
      "$1 $2 $3",
      ["[68]00"]
    ], [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["600"]], [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["123", "1230"]], [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)"], [, "(\\d{4,5})", "$1", ["[1-9]"], "$1"]], [
      [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)"],
      [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"],
      [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"]],
      [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]],
      [, "([68]00)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[68]00"]],
      [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["600"]],
      [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["123", "1230"]],
      [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)"]
    ], [, , , , , , , , , [-1]], , , [, , "600\\d{7,8}", , , , , , , [10, 11]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CM: [, [, , "(?:[26]\\d\\d|88)\\d{6}", , , , , , , [8, 9]], [, , "2(?:22|33|4[23])\\d{6}", , , , "222123456", , , [9]], [, , "6[5-9]\\d{7}", , , , "671234567", , , [9]], [, , "88\\d{6}", , , , "88012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CM", 237, "00", , , , , , , , [[
      ,
      "(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["88"]
    ], [, "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CN: [, [, , "(?:(?:(?:1[03-68]|2\\d)\\d\\d|[3-79])\\d|8[0-57-9])\\d{7}|[1-579]\\d{10}|8[0-57-9]\\d{8,9}|[1-79]\\d{9}|[1-9]\\d{7}|[12]\\d{6}", , , , , , , [7, 8, 9, 10, 11, 12], [5, 6]], [
      ,
      ,
      "21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-4689]|6[2368]|9[02-9])|8(?:078|1[236-8]|2[5-7]|3\\d|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})",
      ,
      ,
      ,
      "1012345678",
      ,
      ,
      ,
      [5, 6]
    ], [, , "1(?:[38]\\d{3}|4[57]\\d{2}|5[0-35-9]\\d{2}|66\\d{2}|7(?:[0-35-8]\\d{2}|40[0-5])|9[89]\\d{2})\\d{6}", , , , "13123456789", , , [11]], [, , "(?:10)?800\\d{7}", , , , "8001234567", , , [10, 12]], [, , "16[08]\\d{5}", , , , "16812345", , , [8]], [
      ,
      ,
      "400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",
      ,
      ,
      ,
      "4001234567",
      ,
      ,
      [7, 8, 9, 10, 11],
      [5, 6]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CN", 86, "(?:1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))?00", "0", , , "(1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))|0", , "00", , [[, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]], [, "(\\d{5,6})", "$1", ["100|95"]], [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"], "0$1", "$CC $1"], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d\\d[19]", "[3-9]\\d\\d(?:10|9[56])"], "0$1", "$CC $1"], [
      ,
      "(\\d{3,4})(\\d{4})",
      "$1 $2",
      ["[2-9]"]
    ], [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1], [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"], "0$1", "$CC $1", 1], [
      ,
      "(\\d{3})(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
      "0$1",
      "$CC $1",
      1
    ], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"], "0$1", "$CC $1", 1], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["807", "8078"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1(?:[3-57-9]|66)"], , "$CC $1"], [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]], [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]], [[, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]], [
      ,
      "(\\d{2})(\\d{5,6})",
      "$1 $2",
      ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"],
      "0$1",
      "$CC $1"
    ], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d\\d[19]", "[3-9]\\d\\d(?:10|9[56])"], "0$1", "$CC $1"], [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1], [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"], "0$1", "$CC $1", 1], [
      ,
      "(\\d{3})(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
      "0$1",
      "$CC $1",
      1
    ], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"], "0$1", "$CC $1", 1], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["807", "8078"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1(?:[3-57-9]|66)"], , "$CC $1"], [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]], [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]], [, , , , , , , , , [-1]], , , [
      ,
      ,
      "(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}",
      ,
      ,
      ,
      ,
      ,
      ,
      [10, 11, 12]
    ], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CO: [, [, , "(?:1\\d|3)\\d{9}|[124-8]\\d{7}", , , , , , , [8, 10, 11], [7]], [, , "[124-8][2-9]\\d{6}", , , , "12345678", , , [8], [7]], [, , "3(?:0[0-5]|1\\d|2[0-3]|5[01])\\d{7}", , , , "3211234567", , , [10]], [, , "1800\\d{7}", , , , "18001234567", , , [11]], [, , "19(?:0[01]|4[78])\\d{7}", , , , "19001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CO", 57, "00(?:4(?:[14]4|56)|[579])", "0", , , "0([3579]|4(?:44|56))?", , , , [[
      ,
      "(\\d)(\\d{7})",
      "$1 $2",
      ["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]", "1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"],
      "($1)",
      "0$CC $1"
    ], [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"], [, "(1)(\\d{3})(\\d{7})", "$1-$2-$3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"], "0$1"]], [[, "(\\d)(\\d{7})", "$1 $2", ["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]", "1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"], "($1)", "0$CC $1"], [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"], [, "(1)(\\d{3})(\\d{7})", "$1 $2 $3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CR: [, [
      ,
      ,
      "(?:8\\d|90)\\d{8}|[24-8]\\d{7}",
      ,
      ,
      ,
      ,
      ,
      ,
      [8, 10]
    ], [, , "2(?:[024-7]\\d{2}|1(?:0[7-9]|[1-9]\\d))\\d{4}", , , , "22123456", , , [8]], [, , "5(?:0[01]|7[0-3])\\d{5}|6(?:[0-4]\\d{3}|500[01])\\d{3}|(?:7[0-3]|8[3-9])\\d{6}", , , , "83123456", , , [8]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "90[059]\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "210[0-6]\\d{4}|4\\d{7}|5100\\d{4}", , , , "40001234", , , [8]], "CR", 506, "00", , , , "(19(?:0[012468]|1[09]|20|66|77|99))", , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[24-7]|8[3-9]"], , "$CC $1"], [
      ,
      "(\\d{3})(\\d{3})(\\d{4})",
      "$1-$2-$3",
      ["[89]0"],
      ,
      "$CC $1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CU: [, [, , "[2-57]\\d{7}|[2-47]\\d{6}|[34]\\d{5}", , , , , , , [6, 7, 8], [4, 5]], [, , "2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}", , , , "71234567", , , , [4, 5]], [, , "5\\d{7}", , , , "51234567", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CU", 53, "119", "0", , , "0", , , , [[, "(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], [
      ,
      "(\\d{2})(\\d{4,6})",
      "$1 $2",
      ["[2-4]"],
      "(0$1)"
    ], [, "(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CV: [
      ,
      [, , "[2-59]\\d{6}", , , , , , , [7]],
      [, , "2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}", , , , "2211234"],
      [, , "(?:[34][36]|5[1-389]|9\\d)\\d{5}", , , , "9911234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "CV",
      238,
      "0",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-59]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    CW: [, [, , "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", , , , , , , [7, 8]], [, , "9(?:(?:[48]\\d|50)\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}", , , , "94151234"], [, , "9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}", , , , "95181234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "60[0-2]\\d{4}", , , , "6001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CW", 599, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], , [, , "955\\d{5}", , , , "95581234", , , [8]], 1, "[69]", [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CX: [, [, , "1\\d{5,9}|(?:[48]\\d\\d|550)\\d{6}", , , , , , , [6, 7, 8, 9, 10]], [, , "8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:21|49|78|81)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", , , , "891641234", , , [9], [8]], [, , "4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[0-2547-9]|9[017-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "19(?:0[0126]\\d|[679])\\d{5}", , , , "1900123456", , , [8, 10]], [
      ,
      ,
      "13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",
      ,
      ,
      ,
      "1300123456",
      ,
      ,
      [6, 8, 10]
    ], [, , , , , , , , , [-1]], [, , "(?:14(?:5\\d|71)|550\\d)\\d{5}", , , , "550123456", , , [9]], "CX", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    CY: [, [, , "(?:[279]\\d|[58]0)\\d{6}", , , , , , , [8]], [, , "2[2-6]\\d{6}", , , , "22345678"], [, , "9[4-79]\\d{6}", , , , "96123456"], [, , "800\\d{5}", , , , "80001234"], [, , "90[09]\\d{5}", , , , "90012345"], [, , "80[1-9]\\d{5}", , , , "80112345"], [, , "700\\d{5}", , , , "70012345"], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], "CY", 357, "00", , , , , , , , [[, "(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:50|77)\\d{6}", , , , "77123456"], , , [, , , , , , , , , [-1]]],
    CZ: [, [, , "(?:[2-578]\\d|60|9\\d{1,4})\\d{7}", , , , , , , [9, 10, 11, 12]], [, , "(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}", , , , "212345678", , , [9]], [, , "(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}", , , , "601123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "9(?:0[05689]|76)\\d{6}", , , , "900123456", , , [9]], [, , "8[134]\\d{7}", , , , "811234567", , , [9]], [
      ,
      ,
      "70[01]\\d{6}",
      ,
      ,
      ,
      "700123456",
      ,
      ,
      [9]
    ], [, , "9[17]0\\d{6}", , , , "910123456", , , [9]], "CZ", 420, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], [, "(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9[36]"]], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["96"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "9(?:5\\d|7[2-4])\\d{6}", , , , "972123456", , , [9]], , , [, , "9(?:3\\d{9}|6\\d{7,10})", , , , "93123456789"]],
    DE: [, [
      ,
      ,
      "(?:1|[358]\\d{11})\\d{3}|[1-35689]\\d{13}|4(?:[0-8]\\d{5,12}|9(?:[05]\\d|44|6[1-8])\\d{9})|[1-35-9]\\d{6,12}|49(?:[0-357]\\d|[46][1-8])\\d{4,8}|49(?:[0-3579]\\d|4[1-9]|6[0-8])\\d{3}|[1-9]\\d{5}|[13-68]\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [3]
    ], [, , "2\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|4(?:0\\d{3,12}|[1-8]\\d{4,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|6(?:\\d{5,13}|9\\d{3,12})|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-8]\\d|9\\d?)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})", , , , "30123456", , , [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [3, 4]], [
      ,
      ,
      "1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7\\d{8,9})",
      ,
      ,
      ,
      "15123456789",
      ,
      ,
      [10, 11]
    ], [, , "800\\d{7,12}", , , , "8001234567890", , , [10, 11, 12, 13, 14, 15]], [, , "137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})", , , , "9001234567", , , [10, 11]], [, , "1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})", , , , "18012345", , , [7, 8, 9, 10, 11, 12, 13, 14]], [, , "700\\d{8}", , , , "70012345678", , , [11]], [, , , , , , , , , [-1]], "DE", 49, "00", "0", , , "0", , , , [[, "(1\\d{2})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], [, "(15\\d{3})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"], [, "(1\\d{3})(\\d{7})", "$1 $2", ["15"], "0$1"], [
      ,
      "(\\d{2})(\\d{3,11})",
      "$1 $2",
      ["3[02]|40|[68]9"],
      "0$1"
    ], [, "(\\d{3})(\\d{3,11})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)", "2(?:0[1-389]|1(?:[14]|2[0-8])|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)"], "0$1"], [
      ,
      "(\\d{4})(\\d{2,11})",
      "$1 $2",
      ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|[7-9](?:0[1-9]|[1-9])", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|[49][1246]|6[1-4]|7[13468]|8[13568])|6(?:0[1356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|[7-9](?:0[1-9]|[1-9])"],
      "0$1"
    ], [, "(3\\d{4})(\\d{1,10})", "$1 $2", ["3"], "0$1"], [, "(800)(\\d{7,12})", "$1 $2", ["800"], "0$1"], [, "(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:37|80)|900", "1(?:37|80)|900[1359]"], "0$1"], [, "(1\\d{2})(\\d{5,11})", "$1 $2", ["181"], "0$1"], [, "(18\\d{3})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], [, "(18\\d{2})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], [, "(18\\d)(\\d{8})", "$1 $2", ["18[2-579]"], "0$1"], [, "(700)(\\d{4})(\\d{4})", "$1 $2 $3", ["700"], "0$1"], [, "(138)(\\d{4})", "$1 $2", ["138"], "0$1"], [
      ,
      "(15[013-68])(\\d{2})(\\d{8})",
      "$1 $2 $3",
      ["15[013-68]"],
      "0$1"
    ], [, "(15[279]\\d)(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], [, "(1[67]\\d)(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"]], , [, , "16(?:4\\d{1,10}|[89]\\d{1,11})", , , , "16412345", , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]], , , [, , , , , , , , , [-1]], [, , "18(?:1\\d{5,11}|[2-9]\\d{8})", , , , "18500123456", , , [8, 9, 10, 11, 12, 13, 14]], , , [
      ,
      ,
      "1(?:5(?:(?:2\\d55|7\\d99|9\\d33)\\d{7}|(?:[034568]00|113)\\d{8})|6(?:013|255|399)\\d{7,8}|7(?:[015]13|[234]55|[69]33|[78]99)\\d{7,8})",
      ,
      ,
      ,
      "177991234567",
      ,
      ,
      [12, 13]
    ]],
    DJ: [, [, , "(?:2\\d|77)\\d{6}", , , , , , , [8]], [, , "2(?:1[2-5]|7[45])\\d{5}", , , , "21360003"], [, , "77\\d{6}", , , , "77831001"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "DJ", 253, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    DK: [
      ,
      [, , "[2-9]\\d{7}", , , , , , , [8]],
      [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", , , , "32123456"],
      [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", , , , "32123456"],
      [, , "80\\d{6}", , , , "80123456"],
      [, , "90\\d{6}", , , , "90123456"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "DK",
      45,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      1,
      [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    DM: [, [, , "(?:[58]\\d\\d|767|900)\\d{7}", , , , , , , [10], [7]], [, , "767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}", , , , "7674201234", , , , [7]], [, , "767(?:2(?:[234689]5|7[5-7])|31[5-7]|61[1-7])\\d{4}", , , , "7672251234", , , , [7]], [
      ,
      ,
      "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",
      ,
      ,
      ,
      "8002123456"
    ], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "DM", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "767", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    DO: [, [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [
      ,
      ,
      "8(?:[04]9[2-9]\\d{6}|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d{2}|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9]))\\d{4})",
      ,
      ,
      ,
      "8092345678",
      ,
      ,
      ,
      [7]
    ], [, , "8[024]9[2-9]\\d{6}", , , , "8092345678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "DO", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "8[024]9", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    DZ: [, [, , "(?:[1-4]|[5-79]\\d|80)\\d{7}", , , , , , , [8, 9]], [, , "(?:(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d|9619)\\d{5}", , , , "12345678"], [
      ,
      ,
      "(?:(?:5[4-6]|7[7-9])\\d|6(?:[569]\\d|7[0-6]))\\d{6}",
      ,
      ,
      ,
      "551234567",
      ,
      ,
      [9]
    ], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "80[3-689]1\\d{5}", , , , "808123456", , , [9]], [, , "80[12]1\\d{5}", , , , "801123456", , , [9]], [, , , , , , , , , [-1]], [, , "98[23]\\d{6}", , , , "983123456", , , [9]], "DZ", 213, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    EC: [
      ,
      [, , "1800\\d{6,7}|(?:[2-7]|9\\d)\\d{7}", , , , , , , [8, 9, 10, 11], [7]],
      [, , "[2-7][2-7]\\d{6}", , , , "22123456", , , [8], [7]],
      [, , "9(?:(?:39|[57][89]|[89]\\d)\\d|6(?:[0-27-9]\\d|30))\\d{5}", , , , "991234567", , , [9]],
      [, , "1800\\d{6,7}", , , , "18001234567", , , [10, 11]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "[2-7]890\\d{4}", , , , "28901234", , , [8]],
      "EC",
      593,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[247]|[356][2-8]"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [
        ,
        "(1800)(\\d{3})(\\d{3,4})",
        "$1 $2 $3",
        ["180", "1800"],
        "$1"
      ]],
      [[, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[247]|[356][2-8]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [, "(1800)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["180", "1800"], "$1"]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    EE: [, [, , "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d\\d|900)\\d{4}", , , , , , , [7, 8, 10]], [, , "(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}", , , , "3212345", , , [7]], [
      ,
      ,
      "(?:5\\d|8[1-4])\\d{6}|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}",
      ,
      ,
      ,
      "51234567",
      ,
      ,
      [7, 8]
    ], [, , "800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}", , , , "80012345"], [, , "(?:40\\d\\d|900)\\d{4}", , , , "9001234", , , [7, 8]], [, , , , , , , , , [-1]], [, , "70[0-2]\\d{5}", , , , "70012345", , , [8]], [, , , , , , , , , [-1]], "EE", 372, "00", , , , , , , , [
      [, "(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],
      [, "(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-4])", "[45]|8(?:00[1-9]|[1-4])"]],
      [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]],
      [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["80"]]
    ], , [, , , , , , , , , [-1]], , , [, , "800[2-9]\\d{3}", , , , , , , [7]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    EG: [, [, , "(?:[189]\\d?|[24-6])\\d{8}|[13]\\d{7}", , , , , , , [8, 9, 10], [7]], [, , "(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|5\\d|7[23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}", , , , "234567890", , , [8, 9], [7]], [, , "1[0125]\\d{8}", , , , "1001234567", , , [10]], [
      ,
      ,
      "800\\d{7}",
      ,
      ,
      ,
      "8001234567",
      ,
      ,
      [10]
    ], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "EG", 20, "00", "0", , , "0", , , , [[, "(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], [, "(\\d{2})(\\d{6,7})", "$1 $2", ["1(?:3|5[239])|[4-6]|[89][2-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1[0-25]|[89]00"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    EH: [, [, , "[5-8]\\d{8}", , , , , , , [9]], [, , "528[89]\\d{5}", , , , "528812345"], [
      ,
      ,
      "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",
      ,
      ,
      ,
      "650123456"
    ], [, , "80\\d{7}", , , , "801234567"], [, , "89\\d{7}", , , , "891234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5924[01]\\d{4}", , , , "592401234"], "EH", 212, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    ER: [, [, , "[178]\\d{6}", , , , , , , [7], [6]], [, , "1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}", , , , "8370362", , , , [6]], [, , "17[1-3]\\d{4}|7\\d{6}", , , , "7123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ER", 291, "00", "0", , , "0", , , , [[
      ,
      "(\\d)(\\d{3})(\\d{3})",
      "$1 $2 $3",
      ,
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    ES: [, [, , "(?:51|[6-9]\\d)\\d{7}", , , , , , , [9]], [, , "(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])\\d{4}|9(?:(?:(?:[135]\\d|[28][0-8]|4[1-9])\\d\\d|7(?:[124-9]\\d\\d|3(?:[0-8]\\d|9[1-9])))\\d\\d|6(?:[0-8]\\d{4}|9(?:0(?:[0-57-9]\\d\\d|6(?:0[0-8]|1[1-9]|[2-9]\\d))|[1-9]\\d{3}))))\\d\\d", , , , "810123456"], [, , "(?:(?:6\\d|7[1-48])\\d{5}|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d", , , , "612345678"], [, , "[89]00\\d{6}", , , , "800123456"], [
      ,
      ,
      "80[367]\\d{6}",
      ,
      ,
      ,
      "803123456"
    ], [, , "90[12]\\d{6}", , , , "901123456"], [, , "70\\d{7}", , , , "701234567"], [, , , , , , , , , [-1]], "ES", 34, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[568]|7[0-48]|9(?:0[12]|[1-8])"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "51\\d{7}", , , , "511234567"], , , [, , , , , , , , , [-1]]],
    ET: [, [, , "(?:11|[2-59]\\d)\\d{7}", , , , , , , [9], [7]], [
      ,
      ,
      "(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:18|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",
      ,
      ,
      ,
      "111112345",
      ,
      ,
      ,
      [7]
    ], [, , "9\\d{8}", , , , "911234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ET", 251, "00", "0", , , "0", , , , [[, "([1-59]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-59]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    FI: [
      ,
      [, , "(?:1\\d|[2-689])\\d{4,10}|7\\d{4,9}", , , , , , , [5, 6, 7, 8, 9, 10, 11, 12]],
      [, , "1(?:[3569][1-8]\\d{3,9}|[47]\\d{5,10})|2[1-8]\\d{3,9}|3(?:[1-8]\\d{3,9}|9\\d{4,8})|[5689][1-8]\\d{3,9}", , , , "1312345678"],
      [
        ,
        ,
        "4(?:[0-8]\\d{4,9}|9\\d{3,8})|50\\d{4,8}",
        ,
        ,
        ,
        "412345678",
        ,
        ,
        [6, 7, 8, 9, 10, 11]
      ],
      [, , "800\\d{4,7}", , , , "8001234567", , , [7, 8, 9, 10]],
      [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "FI",
      358,
      "00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))",
      "0",
      ,
      ,
      "0",
      ,
      "00",
      ,
      [[, "(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]0|[6-8])0"], "0$1"], [, "(75\\d{3})", "$1", ["75[12]"], "0$1"], [, "(116\\d{3})", "$1", ["116"], "$1"], [, "(\\d{2})(\\d{4,10})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"], [, "(\\d)(\\d{4,11})", "$1 $2", ["[25689][1-8]|3"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      1,
      ,
      [, , "[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})", , , , , , , [5, 6, 7, 8, 9, 10]],
      [, , "[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})", , , , "10112345", , , [5, 6, 7, 8, 9, 10]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    FJ: [, [, , "(?:(?:0800\\d|[235-9])\\d|45)\\d{5}", , , , , , , [7, 11]], [, , "(?:(?:3[0-5]|8[58])\\d|6(?:03|[25-7]\\d))\\d{4}", , , , "3212345", , , [7]], [
      ,
      ,
      "(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",
      ,
      ,
      ,
      "7012345",
      ,
      ,
      [7]
    ], [, , "0800\\d{7}", , , , "08001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FJ", 679, "0(?:0|52)", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    FK: [
      ,
      [, , "[2-7]\\d{4}", , , , , , , [5]],
      [, , "[2-47]\\d{4}", , , , "31234"],
      [, , "[56]\\d{4}", , , , "51234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "FK",
      500,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    FM: [, [, , "[39]\\d{6}", , , , , , , [7]], [, , "(?:3[2357]0[1-9]|9[2-6]\\d\\d)\\d{3}", , , , "3201234"], [, , "(?:3[2357]0[1-9]|9[2-7]\\d\\d)\\d{3}", , , , "3501234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FM", 691, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["3(?:20|[357])|9", "3(?:20[1-9]|[357])|9"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    FO: [, [
      ,
      ,
      "(?:[2-8]\\d|90)\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [6]
    ], [, , "(?:20|[3-4]\\d|8[19])\\d{4}", , , , "201234"], [, , "(?:[27][1-9]|5\\d)\\d{4}", , , , "211234"], [, , "80[257-9]\\d{3}", , , , "802123"], [, , "90(?:[1345][15-7]|2[125-7]|99)\\d{2}", , , , "901123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:6[0-36]|88)\\d{4}", , , , "601234"], "FO", 298, "00", , , , "(10(?:01|[12]0|88))", , , , [[, "(\\d{6})", "$1", , , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    FR: [, [, , "[1-9]\\d{8}", , , , , , , [9]], [, , "[1-5]\\d{8}", , , , "123456789"], [
      ,
      ,
      "(?:6\\d{2}|7(?:00|[3-9]\\d))\\d{6}",
      ,
      ,
      ,
      "612345678"
    ], [, , "80[0-5]\\d{6}", , , , "801234567"], [, , "8[129]\\d{7}", , , , "891123456"], [, , "884\\d{6}", , , , "884012345"], [, , , , , , , , , [-1]], [, , "9\\d{8}", , , , "912345678"], "FR", 33, "00", "0", , , "0", , , , [[, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"], [, "(1\\d{2})(\\d{3})", "$1 $2", ["11"], "$1"], [, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"]], [[, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"], [
      ,
      "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["8"],
      "0 $1"
    ]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "80[6-9]\\d{6}", , , , "806123456"], , , [, , , , , , , , , [-1]]],
    GA: [
      ,
      [, , "(?:0\\d|[2-7])\\d{6}", , , , , , , [7, 8]],
      [, , "01\\d{6}", , , , "01441234", , , [8]],
      [, , "(?:0[2-7]|[2-7])\\d{6}", , , , "06031234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "GA",
      241,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    GB: [, [, , "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", , , , , , , [7, 9, 10], [4, 5, 6, 8]], [
      ,
      ,
      "2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{7}|1(?:1(?:3[0-58]|4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])|21[0-7]|31[0-8]|[4-69]1\\d)\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[28][02-57-9]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[2-46-8]\\d{2}|16977[23]\\d{3}",
      ,
      ,
      ,
      "1212345678",
      ,
      ,
      [9, 10],
      [4, 5, 6, 7, 8]
    ], [, , "7(?:[1-3]\\d{3}|4(?:[0-46-9]\\d{2}|5(?:[0-689]\\d|7[0-57-9]))|5(?:0[0-8]|[13-9]\\d|2[0-35-9])\\d|7(?:0(?:0[01]|[1-9]\\d)|[1-7]\\d{2}|8[02-9]\\d|9[0-689]\\d)|8(?:[014-9]\\d|[23][0-8])\\d|9(?:[024-9]\\d{2}|1(?:[02-9]\\d|1[028])|3[0-689]\\d))\\d{5}", , , , "7400123456", , , [10]], [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})", , , , "8001234567"], [, , "(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}", , , , "9012345678", , , [10]], [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", , , , "8431234567", , , [
      7,
      10
    ]], [, , "70\\d{8}", , , , "7012345678", , , [10]], [, , "56\\d{8}", , , , "5612345678", , , [10]], "GB", 44, "00", "0", " x", , "0", , , , [[, "(7\\d{3})(\\d{6})", "$1 $2", ["7(?:[1-57-9]|62)", "7(?:[1-57-9]|624)"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2|5[56]|7[06]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:[02-9]1|1)|3|9[018]"], "0$1"], [, "(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], [
      ,
      "(1\\d{3})(\\d{5,6})",
      "$1 $2",
      ["1"],
      "0$1"
    ], [, "(800)(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], [, "(845)(46)(4\\d)", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], [, "(8\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8(?:4[2-5]|7[0-3])"], "0$1"], [, "(80\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1"], [, "(800)(\\d{6})", "$1 $2", ["800"], "0$1"]], , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", , , , "7640123456", , , [10]], 1, , [, , , , , , , , , [-1]], [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    GD: [
      ,
      [, , "(?:473|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]],
      [, , "473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|68|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}", , , , "4732691234", , , , [7]],
      [, , "473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}", , , , "4734031234", , , , [7]],
      [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
      [, , "900[2-9]\\d{6}", , , , "9002123456"],
      [, , , , , , , , , [-1]],
      [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
      [, , , , , , , , , [-1]],
      "GD",
      1,
      "011",
      "1",
      ,
      ,
      "1",
      ,
      ,
      ,
      ,
      ,
      [, , , , , , , , , [-1]],
      ,
      "473",
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    GE: [, [, , "(?:[3-57]\\d\\d|800)\\d{6}", , , , , , , [9], [6]], [, , "(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}", , , , "322123456", , , , [6]], [, , "(?:5(?:[14]4|5[0157-9]|68|7[0147-9]|9[1-35-9])|790)\\d{6}", , , , "555123456"], [, , "800\\d{6}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "706\\d{6}", , , , "706123456"], "GE", 995, "00", "0", , , "0", , , , [[
      ,
      "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["[348]"],
      "0$1"
    ], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5|790"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "706\\d{6}"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GF: [, [, , "[56]94\\d{6}", , , , , , , [9]], [, , "594(?:[023]\\d|1[01]|4[03-9]|5[6-9]|6[0-3]|80|9[014])\\d{4}", , , , "594101234"], [, , "694(?:[0-249]\\d|3[0-48])\\d{4}", , , , "694201234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GF", 594, "00", "0", , , "0", , , , [[
      ,
      "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["[56]"],
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GG: [, [, , "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", , , , , , , [7, 9, 10], [6]], [, , "1481[25-9]\\d{5}", , , , "1481256789", , , [10], [6]], [, , "7(?:781\\d|839\\d|911[17])\\d{5}", , , , "7781123456", , , [10]], [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})", , , , "8001234567"], [, , "(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}", , , , "9012345678", , , [10]], [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", , , , "8431234567", , , [7, 10]], [
      ,
      ,
      "70\\d{8}",
      ,
      ,
      ,
      "7012345678",
      ,
      ,
      [10]
    ], [, , "56\\d{8}", , , , "5612345678", , , [10]], "GG", 44, "00", "0", , , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", , , , "7640123456", , , [10]], , , [, , , , , , , , , [-1]], [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]], , , [, , , , , , , , , [-1]]],
    GH: [, [, , "(?:[235]\\d{3}|800)\\d{5}", , , , , , , [8, 9], [7]], [
      ,
      ,
      "3(?:0(?:[237]\\d|80)|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",
      ,
      ,
      ,
      "302345678",
      ,
      ,
      [9],
      [7]
    ], [, , "(?:2[034678]\\d|5(?:[0457]\\d|6[01]))\\d{6}", , , , "231234567", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GH", 233, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "800\\d{5}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GI: [, [, , "(?:[25]\\d\\d|629)\\d{5}", , , , , , , [8]], [
      ,
      ,
      "2(?:(?:00\\d|2(?:2[2457]|50))\\d|1(?:6[24-7]\\d|90[0-2]))\\d{3}",
      ,
      ,
      ,
      "20012345"
    ], [, , "(?:5[46-8]\\d|629)\\d{5}", , , , "57123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GI", 350, "00", , , , , , , , [[, "(\\d{3})(\\d{5})", "$1 $2", ["2"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GL: [, [, , "(?:19|[2-689]\\d)\\d{4}", , , , , , , [6]], [, , "(?:19|3[1-7]|6[14689]|8[14-79]|9\\d)\\d{4}", , , , "321000"], [, , "(?:[25][1-9]|4[2-9])\\d{4}", , , , "221234"], [, , "80\\d{4}", , , , "801234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [
      ,
      ,
      "3[89]\\d{4}",
      ,
      ,
      ,
      "381234"
    ], "GL", 299, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-689]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GM: [, [, , "[2-9]\\d{6}", , , , , , , [7]], [, , "(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}", , , , "5661234"], [, , "[23679]\\d{6}", , , , "3012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GM", 220, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GN: [
      ,
      [, , "(?:30|6\\d\\d|722)\\d{6}", , , , , , , [8, 9]],
      [, , "30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}", , , , "30241234", , , [8]],
      [, , "6[02356]\\d{7}", , , , "601123456", , , [9]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "722\\d{6}", , , , "722123456", , , [9]],
      "GN",
      224,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    GP: [, [, , "(?:590|69\\d)\\d{6}", , , , , , , [9]], [, , "590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}", , , , "590201234"], [, , "69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}", , , , "690001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GP", 590, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[56]"], "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    GQ: [, [, , "(?:222|(?:3\\d|55|[89]0)\\d)\\d{6}", , , , , , , [9]], [, , "3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}", , , , "333091234"], [, , "(?:222|55[15])\\d{6}", , , , "222123456"], [, , "80\\d[1-9]\\d{5}", , , , "800123456"], [, , "90\\d[1-9]\\d{5}", , , , "900123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GQ", 240, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], [, "(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GR: [, [
      ,
      ,
      "(?:[268]\\d|[79]0)\\d{8}",
      ,
      ,
      ,
      ,
      ,
      ,
      [10]
    ], [, , "2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}", , , , "2123456789"], [, , "6(?:8[57-9]|9\\d)\\d{7}", , , , "6912345678"], [, , "800\\d{7}", , , , "8001234567"], [
      ,
      ,
      "90[19]\\d{7}",
      ,
      ,
      ,
      "9091234567"
    ], [, , "8(?:0[16]|12|25)\\d{7}", , , , "8011234567"], [, , "70\\d{8}", , , , "7012345678"], [, , , , , , , , , [-1]], "GR", 30, "00", , , , , , , , [[, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[3-8]1|[689]"]], [, "(\\d{4})(\\d{6})", "$1 $2", ["2"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GT: [, [, , "(?:1\\d{3}|[2-7])\\d{7}", , , , , , , [8, 11]], [, , "[267][2-9]\\d{6}", , , , "22456789", , , [8]], [, , "[3-5]\\d{7}", , , , "51234567", , , [8]], [
      ,
      ,
      "18[01]\\d{8}",
      ,
      ,
      ,
      "18001112222",
      ,
      ,
      [11]
    ], [, , "19\\d{9}", , , , "19001112222", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GT", 502, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GU: [, [, , "(?:[58]\\d\\d|671|900)\\d{7}", , , , , , , [10], [7]], [
      ,
      ,
      "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[079]7|2[0167]|3[45]|47|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",
      ,
      ,
      ,
      "6713001234",
      ,
      ,
      ,
      [7]
    ], [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[079]7|2[0167]|3[45]|47|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}", , , , "6713001234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "GU", 1, "011", "1", , , "1", , , 1, , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , "671", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GW: [, [, , "[49]\\d{8}|4\\d{6}", , , , , , , [7, 9]], [, , "443\\d{6}", , , , "443201234", , , [9]], [, , "9(?:5\\d|6[569]|77)\\d{6}", , , , "955012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "40\\d{5}", , , , "4012345", , , [7]], "GW", 245, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["40"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    GY: [, [
      ,
      ,
      "(?:(?:(?:[2-46]\\d|77)\\d|862)\\d|9008)\\d{3}",
      ,
      ,
      ,
      ,
      ,
      ,
      [7]
    ], [, , "(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}", , , , "2201234"], [, , "6\\d{6}", , , , "6091234"], [, , "(?:289|862)\\d{4}", , , , "2891234"], [, , "9008\\d{3}", , , , "9008123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GY", 592, "001", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-46-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    HK: [, [
      ,
      ,
      "8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",
      ,
      ,
      ,
      ,
      ,
      ,
      [5, 6, 7, 8, 9, 11]
    ], [, , "(?:2(?:[13-8]\\d|2[013-9]|9[0-24-9])\\d|3(?:(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69])\\d|8(?:4[04]|9\\d))|58(?:0[1-8]|1[2-9]))\\d{4}", , , , "21234567", , , [8]], [, , "(?:46(?:0[0-6]|10|4[0-57-9])|5(?:(?:[1-59][0-46-9]|6[0-4689])\\d|7(?:[0-2469]\\d|30))|6(?:(?:0[1-9]|[13-59]\\d|[68][0-57-9]|7[0-79])\\d|2(?:[0-57-9]\\d|6[01]))|707[1-5]|8480|9(?:(?:0[1-9]|1[02-9]|[358][0-8]|[467]\\d)\\d|2(?:[0-8]\\d|9[03-9])))\\d{4}", , , , "51234567", , , [8]], [, , "800\\d{6}", , , , "800123456", , , [9]], [
      ,
      ,
      "900(?:[0-24-9]\\d{7}|3\\d{1,4})",
      ,
      ,
      ,
      "90012345678",
      ,
      ,
      [5, 6, 7, 8, 11]
    ], [, , , , , , , , , [-1]], [, , "8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}", , , , "81123456", , , [8]], [, , , , , , , , , [-1]], "HK", 852, "00(?:30|5[09]|[126-9]?)", , , , , , "00", , [[, "(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], , [
      ,
      ,
      "7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",
      ,
      ,
      ,
      "71123456",
      ,
      ,
      [8]
    ], , , [, , , , , , , , , [-1]], [, , "30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}", , , , "30161234", , , [8]], , , [, , , , , , , , , [-1]]],
    HN: [
      ,
      [, , "[237-9]\\d{7}", , , , , , , [8]],
      [, , "2(?:2(?:0[019]|1[1-36]|[23]\\d|4[04-6]|5[57]|7[013689]|8[0146-9]|9[0-2])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:08|16|4[03-5]|5\\d|6[4-6]|74)|6(?:[056]\\d|17|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034])|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}", , , , "22123456"],
      [, , "[37-9]\\d{7}", , , , "91234567"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "HN",
      504,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    HR: [, [, , "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", , , , , , , [6, 7, 8, 9]], [, , "1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}", , , , "12345678", , , [8, 9], [6, 7]], [, , "9(?:01\\d|[1259]\\d{2}|7(?:[0679]\\d|51)|8\\d{1,2})\\d{5}", , , , "921234567", , , [8, 9]], [, , "80[01]\\d{4,6}", , , , "800123456", , , [7, 8, 9]], [
      ,
      ,
      "6(?:[01]\\d{0,2}|[459]\\d{2})\\d{4}",
      ,
      ,
      ,
      "611234",
      ,
      ,
      [6, 7, 8]
    ], [, , , , , , , , , [-1]], [, , "7[45]\\d{6}", , , , "74123456", , , [8]], [, , , , , , , , , [-1]], "HR", 385, "00", "0", , , "0", , , , [[, "(1)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], [, "([2-5]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"], [, "(9\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], [, "(6[01])(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], [, "([67]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"], [, "(80[01])(\\d{2})(\\d{2,3})", "$1 $2 $3", ["80[01]"], "0$1"], [
      ,
      "(80[01])(\\d{3})(\\d{3})",
      "$1 $2 $3",
      ["80[01]"],
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:62\\d?|72)\\d{6}", , , , "62123456", , , [8, 9]], , , [, , , , , , , , , [-1]]],
    HT: [, [, , "[2-489]\\d{7}", , , , , , , [8]], [, , "2(?:2\\d|5[1-5]|81|9[149])\\d{5}", , , , "22453300"], [, , "[34]\\d{7}", , , , "34101234"], [, , "8\\d{7}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}", , , , "98901234"], "HT", 509, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-489]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    HU: [, [, , "[2357]\\d{8}|[1-9]\\d{7}", , , , , , , [8, 9], [6]], [, , "(?:1\\d|2[2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|7[2-9]|8[2-57-9]|9[2-69])\\d{6}", , , , "12345678", , , [8], [6]], [, , "(?:[257]0|3[01])\\d{7}", , , , "201234567", , , [9]], [, , "[48]0\\d{6}", , , , "80123456", , , [8]], [, , "9[01]\\d{6}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "21\\d{7}", , , , "211234567", , , [9]], "HU", 36, "00", "06", , , "06", , , , [[, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "($1)"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "($1)"]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , , [, , "[48]0\\d{6}", , , , , , , [8]], [, , "38\\d{7}", , , , "381234567", , , [9]], , , [, , , , , , , , , [-1]]],
    ID: [, [, , "(?:[1-36]|8\\d{5})\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}", , , , , , , [7, 8, 9, 10, 11, 12], [5, 6]], [
      ,
      ,
      "2(?:1(?:14\\d{3}|500\\d{3}|\\d{7,8})|2\\d{6,8}|4\\d{7,8})|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:19?|[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",
      ,
      ,
      ,
      "218350123",
      ,
      ,
      [7, 8, 9, 10, 11],
      [5, 6]
    ], [, , "(?:2(?:1(?:3[145]|4[01]|5[1-469]|60|8[0359])|2(?:88|9[1256])|3[1-4]9|4(?:36|91)|5(?:1[349]|[2-4]9)|6[0-7]9|7(?:[1-36]9|4[39])|8[1-5]9|9[1-48]9)|3(?:19[1-3]|2[12]9|3[13]9|4(?:1[69]|39)|5[14]9|6(?:1[69]|2[89])|709)|4[13]19|5(?:1(?:19|8[39])|4[129]9|6[12]9)|6(?:19[12]|2(?:[23]9|77))|7(?:1[13]9|2[15]9|419|5(?:1[89]|29)|6[15]9|7[178]9))\\d{5,6}|8[1-35-9]\\d{7,10}", , , , "812345678", , , [9, 10, 11, 12]], [, , "177\\d{6,8}|800\\d{5,7}", , , , "8001234567", , , [8, 9, 10, 11]], [
      ,
      ,
      "809\\d{7}",
      ,
      ,
      ,
      "8091234567",
      ,
      ,
      [10]
    ], [, , "804\\d{7}", , , , "8041234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ID", 62, "0(?:0[1789]|10(?:00|1[67]))", "0", , , "0", , , , [[, "(\\d{2})(\\d{5,8})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], [, "(\\d{3})(\\d{5,8})", "$1 $2", ["2[035-9]|[36][02-9]|[4579]"], "(0$1)"], [, "(8\\d{2})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], [, "(8\\d{2})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], [, "(1)(500)(\\d{3})", "$1 $2 $3", ["150", "1500"], "$1"], [, "(177)(\\d{6,8})", "$1 $2", ["177"], "0$1"], [
      ,
      "(800)(\\d{5,7})",
      "$1 $2",
      ["800"],
      "0$1"
    ], [, "(804)(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], [, "(80\\d)(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80[79]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "8071\\d{6}", , , , , , , [10]], [, , "1500\\d{3}|8071\\d{6}", , , , "8071123456", , , [7, 10]], , , [, , , , , , , , , [-1]]],
    IE: [, [, , "[148]\\d{9}|[124-9]\\d{8}|[124-69]\\d{7}|[24-69]\\d{6}", , , , , , , [7, 8, 9, 10], [5, 6]], [
      ,
      ,
      "1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})",
      ,
      ,
      ,
      "2212345",
      ,
      ,
      ,
      [5, 6]
    ], [, , "8(?:22\\d{6}|[35-9]\\d{7})", , , , "850123456", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , "15(?:1[2-8]|[2-8]0|9[089])\\d{6}", , , , "1520123456", , , [10]], [, , "18[59]0\\d{6}", , , , "1850123456", , , [10]], [, , "700\\d{6}", , , , "700123456", , , [9]], [, , "76\\d{7}", , , , "761234567", , , [9]], "IE", 353, "00", "0", , , "0", , , , [
      [, "(1)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"],
      [, "(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"],
      [, "(\\d{3})(\\d{5})", "$1 $2", ["40[24]|50[45]"], "(0$1)"],
      [, "(48)(\\d{4})(\\d{4})", "$1 $2 $3", ["48"], "(0$1)"],
      [, "(818)(\\d{3})(\\d{3})", "$1 $2 $3", ["818"], "(0$1)"],
      [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[24-69]|7[14]"], "(0$1)"],
      [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["76|8[35-9]"], "0$1"],
      [, "(8\\d)(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8[35-9]5"], "0$1"],
      [, "(700)(\\d{3})(\\d{3})", "$1 $2 $3", ["700"], "0$1"],
      [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:5|8[059])", "1(?:5|8[059]0)"], "$1"]
    ], , [, , , , , , , , , [-1]], , , [, , "18[59]0\\d{6}", , , , , , , [10]], [
      ,
      ,
      "818\\d{6}",
      ,
      ,
      ,
      "818123456",
      ,
      ,
      [9]
    ], , , [, , "8[35-9]5\\d{7}", , , , "8551234567", , , [10]]],
    IL: [, [, , "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", , , , , , , [7, 8, 9, 10, 11, 12]], [, , "(?:153\\d{1,2}|[2-489])\\d{7}", , , , "21234567", , , [8, 11, 12], [7]], [, , "5(?:[0-489][2-9]\\d|5(?:01|2[2-5]|3[23]|4[45]|5[015689]|6[6-8]|7[0-267]|8[7-9]|9[1-9])|6\\d{2})\\d{5}", , , , "502345678", , , [9]], [, , "1(?:80[019]\\d{3}|255)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}", , , , "1919123456", , , [8, 9, 10]], [
      ,
      ,
      "1700\\d{6}",
      ,
      ,
      ,
      "1700123456",
      ,
      ,
      [10]
    ], [, , , , , , , , , [-1]], [, , "7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6[58]\\d|7\\d{2}|8(?:2\\d|33|55|77|81)|9[2579]\\d)\\d{5}", , , , "771234567", , , [9]], "IL", 972, "0(?:0|1[2-9])", "0", , , "0", , , , [[, "([2-489])(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], [, "([57]\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], [, "(153)(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["153"]], [, "(1)([7-9]\\d{2})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], [, "(1255)(\\d{3})", "$1-$2", ["125", "1255"]], [
      ,
      "(1200)(\\d{3})(\\d{3})",
      "$1-$2-$3",
      ["120", "1200"]
    ], [, "(1212)(\\d{2})(\\d{2})", "$1-$2-$3", ["121", "1212"]], [, "(1599)(\\d{6})", "$1-$2", ["159", "1599"]], [, "(151)(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["151"]]], , [, , , , , , , , , [-1]], , , [, , "1700\\d{6}", , , , , , , [10]], [, , "1599\\d{6}", , , , "1599123456", , , [10]], , , [, , "151\\d{8,9}", , , , "15112340000", , , [11, 12]]],
    IM: [
      ,
      [, , "(?:1624|(?:[3578]\\d|90)\\d\\d)\\d{6}", , , , , , , [10], [6]],
      [, , "1624[5-8]\\d{5}", , , , "1624756789", , , , [6]],
      [, , "7(?:4576|[59]24\\d|624[0-4689])\\d{5}", , , , "7924123456"],
      [, , "808162\\d{4}", , , , "8081624567"],
      [, , "(?:872299|90[0167]624)\\d{4}", , , , "9016247890"],
      [, , "8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}", , , , "8456247890"],
      [, , "70\\d{8}", , , , "7012345678"],
      [, , "56\\d{8}", , , , "5612345678"],
      "IM",
      44,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      ,
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}", , , , "5512345678"],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    IN: [, [, , "(?:00800|1\\d{0,5}|[2-9]\\d\\d)\\d{7}", , , , , , , [8, 9, 10, 11, 12, 13], [6, 7]], [
      ,
      ,
      "(?:11|2[02]|33|4[04]|79|80)[2-7]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}",
      ,
      ,
      ,
      "7410410123",
      ,
      ,
      [10],
      [6, 7, 8]
    ], [
      ,
      ,
      "(?:6(?:0(?:0[0-3569]|26|33)\\d|1279|2(?:[06]\\d|3[02589]|8[0-479]|9[0-79])\\d|3(?:0[0-79]\\d|5(?:0[0-6]|[1-9]\\d)|6[0-4679]\\d|7[0-24-9]\\d|[89]\\d{2})|9(?:0[019]|13)\\d)|7(?:0\\d{3}|19[0-5]\\d|2(?:[0235679]\\d{2}|[14][017-9]\\d|8(?:[0-59]\\d|[678][089]))|3(?:[05-8]\\d{2}|1(?:[089]\\d|11|7[02-8])|2(?:[0-49][089]|[5-8]\\d)|3[017-9]\\d|4(?:[07-9]\\d|11)|9(?:[016-9]\\d|[2-5][089]))|4(?:0\\d{2}|1(?:[015-9]\\d|[23][089]|4[089])|2(?:0[089]|[1-7][089]|[89]\\d)|3(?:[0-8][089]|9\\d)|4(?:[089]\\d|11|7[02-8])|[56]\\d[089]|7(?:[089]\\d|11|7[02-8])|8(?:[0-24-7][089]|[389]\\d)|9(?:[0-6][089]|7[089]|[89]\\d))|5(?:[0346-8]\\d{2}|1(?:[07-9]\\d|11)|2(?:[04-9]\\d|[123][089])|5[017-9]\\d|9(?:[0-6][089]|[7-9]\\d))|6(?:0(?:[0-47]\\d|[5689][089])|(?:1[0-257-9]|[6-9]\\d)\\d|2(?:[0-4]\\d|[5-9][089])|3(?:[02-8][089]|[19]\\d)|4\\d[089]|5(?:[0-367][089]|[4589]\\d))|7(?:0(?:0[02-9]|[13-7][089]|[289]\\d)|[1-9]\\d{2})|8(?:[0-79]\\d{2}|8(?:[089]\\d|11|7[02-9]))|9(?:[089]\\d{2}|313|7(?:[02-8]\\d|9[07-9])))|8(?:0(?:[01589]\\d{2}|6[67]\\d|7(?:[02-8]\\d|9[04-9]))|1(?:[0-57-9]\\d{2}|6(?:[089]\\d|7[02-8]))|2(?:0(?:[089]\\d|7[02-8])|[14](?:[089]\\d|7[02-8])|[235-9]\\d{2})|3(?:[0357-9]\\d{2}|1(?:[089]\\d|7[02-8])|2(?:[089]\\d|7[02-8])|4\\d{2}|6(?:[089]\\d|7[02-8]))|[45]\\d{3}|6(?:[02457-9]\\d{2}|1(?:[089]\\d|7[02-8])|3(?:[089]\\d|7[02-8])|6(?:[08]\\d|7[02-8]|9\\d))|7(?:0[07-9]\\d|[1-69]\\d{2}|[78](?:[089]\\d|7[02-8]))|8(?:[0-25-9]\\d{2}|3(?:[089]\\d|7[02-8])|4(?:[0489]\\d|7[02-8]))|9(?:[02-9]\\d{2}|1(?:[0289]\\d|7[02-8])))|9\\d{4})\\d{5}",
      ,
      ,
      ,
      "8123456789",
      ,
      ,
      [10]
    ], [, , "00800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))", , , , "1800123456"], [, , "186[12]\\d{9}", , , , "1861123456789", , , [13]], [, , "1860\\d{7}", , , , "18603451234", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IN", 91, "00", "0", , , "0", , , , [[, "(\\d{8})", "$1", ["561", "5616", "56161"], "$1", , 1], [
      ,
      "(\\d{5})(\\d{5})",
      "$1 $2",
      [
        "6(?:0[023]|12|2[03689]|3[05-9]|9[019])|7(?:[02-8]|19|9[037-9])|8(?:0[015-9]|[1-9])|9",
        "6(?:0(?:0|26|33)|127|2(?:[06]|3[02589]|8[0-379]|9[0-4679])|3(?:0[0-79]|5[0-46-9]|6[0-4679]|7[0-24-9]|[89])|9[019])|7(?:[07]|19[0-5]|2(?:[0235-9]|[14][017-9])|3(?:[025-9]|[134][017-9])|4(?:[0-35689]|[47][017-9])|5(?:[02-46-9]|[15][017-9])|6(?:[02-9]|1[0-257-9])|8(?:[0-79]|8[0189])|9(?:[089]|31|7[02-9]))|8(?:0(?:[01589]|6[67]|7[02-9])|1(?:[0-57-9]|6[07-9])|2(?:[014][07-9]|[235-9])|3(?:[03-57-9]|[126][07-9])|[45]|6(?:[02457-9]|[136][07-9])|7(?:[078][07-9]|[1-69])|8(?:[0-25-9]|3[07-9]|4[047-9])|9(?:[02-9]|1[027-9]))|9",
        "6(?:0(?:0|26|33)|1279|2(?:[06]|3[02589]|8[0-379]|9[0-4679])|3(?:0[0-79]|5[0-46-9]|6[0-4679]|7[0-24-9]|[89])|9[019])|7(?:0|19[0-5]|2(?:[0235-79]|[14][017-9]|8(?:[0-69]|[78][089]))|3(?:[05-8]|1(?:[0189]|7[02-9])|2(?:[0-49][089]|[5-8])|3[017-9]|4(?:[07-9]|11)|9(?:[01689]|[2-5][089]|7[0189]))|4(?:[056]|1(?:[0135-9]|[24][089])|[29](?:[0-7][089]|[89])|3(?:[0-8][089]|9)|[47](?:[089]|11|7[02-8])|8(?:[0-24-7][089]|[389]))|5(?:[0346-9]|[15][017-9]|2(?:[03-9]|[12][089]))|6(?:[0346-9]|1[0-257-9]|2(?:[0-4]|[5-9][089])|5(?:[0-367][089]|[4589]))|7(?:0(?:[02-9]|1[089])|[1-9])|8(?:[0-79]|8(?:0[0189]|11|8[013-9]|9))|9(?:[089]|313|7(?:[02-8]|9[07-9])))|8(?:0(?:[01589]|6[67]|7(?:[02-8]|9[04-9]))|1(?:[0-57-9]|6(?:[089]|7[02-8]))|2(?:[014](?:[089]|7[02-8])|[235-9])|3(?:[03-57-9]|[126](?:[089]|7[02-8]))|[45]|6(?:[02457-9]|[136](?:[089]|7[02-8]))|7(?:0[07-9]|[1-69]|[78](?:[089]|7[02-8]))|8(?:[0-25-9]|3(?:[089]|7[02-8])|4(?:[0489]|7[02-8]))|9(?:[02-9]|1(?:[0289]|7[02-8])))|9"
      ],
      "0$1",
      ,
      1
    ], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-9]|80[2-46]"], "0$1", , 1], [
      ,
      "(\\d{3})(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["1(?:2[0-249]|3[0-25]|4[145]|[59][14]|[68][1-9]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1|9[15])|6(?:12|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"],
      "0$1",
      ,
      1
    ], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[23579]|[468][1-9])|[2-8]"], "0$1", , 1], [, "(\\d{2})(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3 $4", ["008"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], "$1", , 1], [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3", ["160", "1600"], "$1", , 1], [, "(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], "$1", , 1], [, "(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["180", "1800"], "$1", , 1], [, "(\\d{4})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["186", "1860"], "$1", , 1], [
      ,
      "(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
      "$1 $2 $3 $4",
      ["18[06]"],
      "$1",
      ,
      1
    ]], , [, , , , , , , , , [-1]], , , [, , "00800\\d{7}|1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))"], [, , "140\\d{7}", , , , "1409305260", , , [10]], , , [, , , , , , , , , [-1]]],
    IO: [, [, , "3\\d{6}", , , , , , , [7]], [, , "37\\d{5}", , , , "3709100"], [, , "38\\d{5}", , , , "3801234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IO", 246, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["3"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    IQ: [, [
      ,
      ,
      "(?:1|[2-6]\\d?|7\\d\\d)\\d{7}",
      ,
      ,
      ,
      ,
      ,
      ,
      [8, 9, 10],
      [6, 7]
    ], [, , "1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}", , , , "12345678", , , [8, 9], [6, 7]], [, , "7[3-9]\\d{8}", , , , "7912345678", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IQ", 964, "00", "0", , , "0", , , , [[, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], [, "([2-6]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    IR: [
      ,
      [, , "[1-9]\\d{9}|[1-8]\\d{5,6}", , , , , , , [6, 7, 10], [4, 5, 8]],
      [, , "(?:(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:\\d{8}|(?:[16]|[289]\\d?)\\d{3}))|94(?:000|11[0-7]|2\\d{2}|30[01]|4(?:11|40))\\d{5}", , , , "2123456789", , , , [4, 5, 8]],
      [, , "9(?:0(?:[1-35]\\d{2}|44\\d)|[13]\\d{3}|2[0-2]\\d{2}|9(?:[01]\\d{2}|44\\d|8(?:10|88)|9(?:0[013]|1[134]|21|9[89])))\\d{5}", , , , "9123456789", , , [10]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "993\\d{7}", , , , "9932123456", , , [10]],
      "IR",
      98,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"], [, "(\\d{2})(\\d{4,5})", "$1 $2", ["[1-8]"], "0$1"], [, "(\\d{4,5})", "$1", ["96"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , "(?:9411[1-7]|94440)\\d{5}", , , , , , , [10]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    IS: [
      ,
      [, , "(?:38\\d|[4-9])\\d{6}", , , , , , , [7, 9]],
      [
        ,
        ,
        "(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}",
        ,
        ,
        ,
        "4101234",
        ,
        ,
        [7]
      ],
      [, , "(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-8]\\d|9[0-3])|8(?:2[0-59]|[3469]\\d|5[1-9]|8[28]))\\d{4}", , , , "6111234"],
      [, , "800\\d{4}", , , , "8001234", , , [7]],
      [, , "90\\d{5}", , , , "9011234", , , [7]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "49\\d{5}", , , , "4921234", , , [7]],
      "IS",
      354,
      "00|1(?:0(?:01|[12]0)|100)",
      ,
      ,
      ,
      ,
      ,
      "00",
      ,
      [[, "(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "809\\d{4}", , , , "8091234", , , [7]],
      ,
      ,
      [, , "(?:689|8(?:7[0189]|80)|95[48])\\d{4}", , , , "6891234", , , [7]]
    ],
    IT: [, [, , "0\\d{6}(?:\\d{4})?|3[0-8]\\d{9}|(?:[0138]\\d?|55)\\d{8}|[08]\\d{5}(?:\\d{2})?", , , , , , , [6, 7, 8, 9, 10, 11]], [
      ,
      ,
      "0(?:(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d|6(?:[0-57-9]\\d\\d|6(?:[0-8]\\d|9[0-79])))\\d{1,6}",
      ,
      ,
      ,
      "0212345678"
    ], [, , "33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}", , , , "3123456789", , , [9, 10, 11]], [, , "80(?:0\\d{3}|3)\\d{3}", , , , "800123456", , , [6, 9]], [, , "(?:(?:0878|1(?:44|6[346])\\d)\\d\\d|89(?:2|(?:4[5-9]|(?:5[5-9]|9)\\d\\d)\\d))\\d{3}|89[45][0-4]\\d\\d", , , , "899123456", , , [6, 8, 9, 10]], [, , "84(?:[08]\\d{3}|[17])\\d{3}", , , , "848123456", , , [6, 9]], [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]], [, , "55\\d{8}", , , , "5512345678", , , [10]], "IT", 39, "00", , , , , , , , [[, "(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], [
      ,
      "(\\d{3})(\\d{3,6})",
      "$1 $2",
      ["0[13-57-9][0159]|8(?:03|4[17]|9[245])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]
    ], [, "(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["894"]], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[67]|99)|[38]"]], [, "(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]"]], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3"]], [, "(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], [
      ,
      "(\\d{4})(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["0"]
    ]], , [, , , , , , , , , [-1]], 1, , [, , "848\\d{6}", , , , , , , [9]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    JE: [, [, , "(?:1534|(?:[3578]\\d|90)\\d\\d)\\d{6}", , , , , , , [10], [6]], [, , "1534[0-24-8]\\d{5}", , , , "1534456789", , , , [6]], [, , "7(?:509\\d|7(?:00[378]|97[7-9])|829\\d|937\\d)\\d{5}", , , , "7797712345"], [, , "80(?:07(?:35|81)|8901)\\d{4}", , , , "8007354567"], [, , "(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}", , , , "9018105678"], [, , "8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}", , , , "8447034567"], [
      ,
      ,
      "701511\\d{4}",
      ,
      ,
      ,
      "7015115678"
    ], [, , "56\\d{8}", , , , "5612345678"], "JE", 44, "00", "0", , , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", , , , "7640123456"], , , [, , , , , , , , , [-1]], [, , "3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}", , , , "5512345678"], , , [, , , , , , , , , [-1]]],
    JM: [, [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [
      ,
      ,
      "876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[0237-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}",
      ,
      ,
      ,
      "8765230123",
      ,
      ,
      ,
      [7]
    ], [, , "876(?:2[14-9]\\d|[348]\\d{2}|5(?:0[3-9]|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}", , , , "8762101234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "JM", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "876", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    JO: [, [
      ,
      ,
      "(?:(?:(?:[268]|7\\d)\\d|32|53)\\d|900)\\d{5}",
      ,
      ,
      ,
      ,
      ,
      ,
      [8, 9]
    ], [, , "(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[05]0|3(?:00|33)|4(?:0[0-25]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:[029]0|7[08]))\\d{4}", , , , "62001234", , , [8]], [
      ,
      ,
      "7(?:55[0-49]|(?:7[025-9]|[89][0-25-9])\\d)\\d{5}",
      ,
      ,
      ,
      "790123456",
      ,
      ,
      [9]
    ], [, , "80\\d{6}", , , , "80012345", , , [8]], [, , "900\\d{5}", , , , "90012345", , , [8]], [, , "85\\d{6}", , , , "85012345", , , [8]], [, , "70\\d{7}", , , , "700123456", , , [9]], [, , , , , , , , , [-1]], "JO", 962, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["8|900"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7[457-9]"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["7"], "0$1"]], , [, , "74(?:66|77)\\d{5}", , , , "746612345", , , [9]], , , [, , , , , , , , , [-1]], [
      ,
      ,
      "8(?:10|8\\d)\\d{5}",
      ,
      ,
      ,
      "88101234",
      ,
      ,
      [8]
    ], , , [, , , , , , , , , [-1]]],
    JP: [, [, , "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", , , , , , , [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]], [, , "(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}", , , , "312345678", , , [9]], [, , "[7-9]0[1-9]\\d{7}", , , , "9012345678", , , [10]], [
      ,
      ,
      "(?:00(?:(?:37|66)\\d{4,11}|777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)|(?:120|800\\d)\\d{4})\\d\\d",
      ,
      ,
      ,
      "120123456"
    ], [, , "990\\d{6}", , , , "990123456", , , [9]], [, , , , , , , , , [-1]], [, , "60\\d{7}", , , , "601234567", , , [9]], [, , "50[1-9]\\d{7}", , , , "5012345678", , , [10]], "JP", 81, "010", "0", , , "0", , , , [
      [, "(\\d{4})(\\d{4})", "$1-$2", ["007", "0077", "00777", "00777[01]"]],
      [, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"],
      [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", [
        "1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
        "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))",
        "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"
      ], "0$1"],
      [
        ,
        "(\\d{3})(\\d{2})(\\d{4})",
        "$1-$2-$3",
        [
          "1(?:[2-46]|5[2-8]|7[2-689]|8[2-7]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
          "1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))",
          "1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
          "1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"
        ],
        "0$1"
      ],
      [
        ,
        "(\\d{2})(\\d{3})(\\d{4})",
        "$1-$2-$3",
        ["1(?:1[235-8]|[57-9])|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)", "1(?:1[235-8]|[57-9])|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])", "1(?:1[235-8]|[57-9])|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])"],
        "0$1"
      ],
      [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:[34]7|[56]9|74|9[14-79])|82|993"], "0$1"],
      [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])"], "0$1"],
      [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["2[2-9]|4|7[235-9]|9[49]"], "0$1"],
      [, "(\\d{4})(\\d{2})(\\d{3,4})", "$1-$2-$3", ["007"]],
      [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
      [, "(\\d{4})(\\d{2})(\\d{4})", "$1-$2-$3", ["008"]],
      [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]|80"], "0$1"],
      [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1-$2-$3", ["0"]],
      [, "(\\d{4})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["0"]],
      [, "(\\d{4})(\\d{5})(\\d{5,6})", "$1-$2-$3", ["0"]],
      [, "(\\d{4})(\\d{6})(\\d{6,7})", "$1-$2-$3", ["0"]]
    ], [[, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", [
      "1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
      "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))",
      "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"
    ], "0$1"], [
      ,
      "(\\d{3})(\\d{2})(\\d{4})",
      "$1-$2-$3",
      [
        "1(?:[2-46]|5[2-8]|7[2-689]|8[2-7]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
        "1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))",
        "1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
        "1(?:[2-46]|5(?:[236-8]|[45][2-69])|7[2-689]|8[2-7]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|[67]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"
      ],
      "0$1"
    ], [
      ,
      "(\\d{2})(\\d{3})(\\d{4})",
      "$1-$2-$3",
      ["1(?:1[235-8]|[57-9])|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)", "1(?:1[235-8]|[57-9])|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])", "1(?:1[235-8]|[57-9])|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])"],
      "0$1"
    ], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:[34]7|[56]9|74|9[14-79])|82|993"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["2[2-9]|4|7[235-9]|9[49]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]|80"], "0$1"]], [, , "20\\d{8}", , , , "2012345678", , , [10]], , , [, , "00(?:(?:37|66)\\d{4,11}|777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d"], [
      ,
      ,
      "570\\d{6}",
      ,
      ,
      ,
      "570123456",
      ,
      ,
      [9]
    ], , , [, , , , , , , , , [-1]]],
    KE: [, [, , "(?:(?:2|80)0\\d?|[4-7]\\d\\d|900)\\d{6}|[4-6]\\d{6,7}", , , , , , , [7, 8, 9, 10]], [, , "20\\d{6,7}|4(?:0\\d{6,7}|[136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|2\\d{7}|6\\d{6,7})", , , , "202012345", , , [7, 8, 9]], [, , "7\\d{8}", , , , "712123456", , , [9]], [, , "800[24-8]\\d{5,6}", , , , "800223456", , , [9, 10]], [, , "900[02-9]\\d{5}", , , , "900223456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KE", 254, "000", "0", , , "005|0", , , , [[
      ,
      "(\\d{2})(\\d{5,7})",
      "$1 $2",
      ["[24-6]"],
      "0$1"
    ], [, "(\\d{3})(\\d{6})", "$1 $2", ["7"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    KG: [, [, , "(?:[235-7]\\d|99)\\d{7}|800\\d{6,7}", , , , , , , [9, 10], [5, 6]], [, , "(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}", , , , "312123456", , , [9], [5, 6]], [
      ,
      ,
      "(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|7(?:[07]\\d|55)|99[69])\\d{6}",
      ,
      ,
      ,
      "700123456",
      ,
      ,
      [9]
    ], [, , "800\\d{6,7}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KG", 996, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[25-79]|31[25]"], "0$1"], [, "(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[36]|[2-9])"], "0$1"], [, "(\\d{3})(\\d{3})(\\d)(\\d{3})", "$1 $2 $3 $4", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    KH: [, [, , "1\\d{9}|[1-9]\\d{7,8}", , , , , , , [8, 9, 10], [6, 7]], [
      ,
      ,
      "(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}",
      ,
      ,
      ,
      "23756789",
      ,
      ,
      [8, 9],
      [6, 7]
    ], [, , "(?:1(?:[013-79]\\d|[28]\\d{1,2})|2[3-6]48|3(?:[18]\\d{2}|[2-6]48)|4[2-4]48|5[2-5]48|6(?:[016-9]\\d|[2-5]48)|7(?:[07-9]\\d|[16]\\d{2}|[2-5]48)|8(?:[013-79]\\d|8\\d{2})|9(?:6\\d{2}|7\\d{1,2}|[0-589]\\d))\\d{5}", , , , "91234567", , , [8, 9]], [, , "1800(?:1\\d|2[019])\\d{4}", , , , "1800123456", , , [10]], [, , "1900(?:1\\d|2[09])\\d{4}", , , , "1900123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KH", 855, "00[14-9]", "0", , , "0", , , , [[
      ,
      "(\\d{2})(\\d{3})(\\d{3,4})",
      "$1 $2 $3",
      ["1\\d[1-9]|[2-9]"],
      "0$1"
    ], [, "(1[89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[89]0", "1[89]00"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    KI: [, [, , "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", , , , , , , [5, 8]], [, , "(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}|(?:65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d{2}|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500)))\\d{3}", , , , "31234"], [, , "(?:6(?:200[01]|30[01]\\d)|7(?:200[01]|3(?:0[0-5]\\d|140)))\\d{3}", , , , "72001234", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], [, , "30(?:0[01]\\d{2}|12(?:11|20))\\d{2}", , , , "30010000", , , [8]], "KI", 686, "00", , , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    KM: [, [, , "[3478]\\d{6}", , , , , , , [7]], [, , "7[4-7]\\d{5}", , , , "7712345"], [, , "[34]\\d{6}", , , , "3212345"], [, , , , , , , , , [-1]], [, , "8\\d{6}", , , , "8001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KM", 269, "00", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    KN: [, [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}", , , , "8692361234", , , , [7]], [, , "869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}", , , , "8697652917", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "KN", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "869", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    KP: [, [, , "(?:(?:19\\d|2)\\d|85)\\d{6}", , , , , , , [8, 10], [6, 7]], [, , "2\\d{7}|85\\d{6}", , , , "21234567", , , [8], [6, 7]], [, , "19[123]\\d{7}", , , , "1921234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KP", 850, "00|99", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [
      ,
      ,
      "2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [8]
    ], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    KR: [, [, , "(?:00[1-9]\\d{2,4}|[12]|5\\d{3})\\d{7}|(?:(?:00|[13-6])\\d|70)\\d{8}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}", , , , , , , [5, 6, 8, 9, 10, 11, 12, 13, 14], [3, 7]], [, , "2[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})", , , , "22123456", , , [5, 6, 8, 9, 10], [3, 7]], [, , "1[0-26-9]\\d{7,8}", , , , "1000000000", , , [9, 10]], [, , "(?:00(?:3(?:08|68\\d)|798\\d{1,3})|80\\d)\\d{6}", , , , "801234567", , , [9, 11, 12, 13, 14]], [, , "60[2-9]\\d{6}", , , , "602345678", , , [9]], [, , , , , , , , , [-1]], [
      ,
      ,
      "50\\d{8,9}",
      ,
      ,
      ,
      "5012345678",
      ,
      ,
      [10, 11]
    ], [, , "70\\d{8}", , , , "7012345678", , , [10]], "KR", 82, "00(?:[1259]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "0", , , "0(8[1-46-8]|85\\d{2})?", , , , [[, "(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1", "0$CC-$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["1(?:5[246-9]|6[046-8]|8[03579])", "1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"], "$1", "0$CC-$1"], [, "(\\d{5})", "$1", ["1[016-9]1", "1[016-9]11", "1[016-9]114"], "0$1", "0$CC-$1"], [
      ,
      "(\\d)(\\d{3,4})(\\d{4})",
      "$1-$2-$3",
      ["2[1-9]"],
      "0$1",
      "0$CC-$1"
    ], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60[2-9]|80"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]0"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["50"], "0$1", "0$CC-$1"], [, "(\\d{5})(\\d{3})(\\d{3})", "$1 $2 $3", ["003", "0030", "00308"], "$1", "0$CC-$1"], [
      ,
      "(\\d{5})(\\d{3,4})(\\d{4})",
      "$1 $2 $3",
      ["00[37]", "00(?:36|79)", "00(?:36|79)8"],
      "$1",
      "0$CC-$1"
    ], [, "(\\d{5})(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["007", "0079", "00798"], "$1", "0$CC-$1"]], [[, "(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1", "0$CC-$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["1(?:5[246-9]|6[046-8]|8[03579])", "1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"], "$1", "0$CC-$1"], [, "(\\d{5})", "$1", ["1[016-9]1", "1[016-9]11", "1[016-9]114"], "0$1", "0$CC-$1"], [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2[1-9]"], "0$1", "0$CC-$1"], [
      ,
      "(\\d{2})(\\d{3})(\\d{4})",
      "$1-$2-$3",
      ["60[2-9]|80"],
      "0$1",
      "0$CC-$1"
    ], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]0"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["50"], "0$1", "0$CC-$1"]], [, , "15\\d{7,8}", , , , "1523456789", , , [9, 10]], , , [, , "00(?:3(?:08|68\\d)|798\\d{1,3})\\d{6}", , , , , , , [11, 12, 13, 14]], [, , "1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))\\d{4}", , , , "15441234", , , [8]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    KW: [
      ,
      [, , "(?:18|[2569]\\d\\d)\\d{5}", , , , , , , [7, 8]],
      [, , "2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}", , , , "22345678", , , [8]],
      [, , "(?:5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25]))|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|222|7(?:0[013-9]|[67]\\d)|9(?:[069]\\d|3[039]))|9(?:(?:0[09]|22|4[01479]|55|6[0679]|8[057-9]|9\\d)\\d|11[01]|7(?:02|[1-9]\\d)))\\d{4}", , , , "50012345", , , [8]],
      [, , "18\\d{5}", , , , "1801234", , , [7]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "KW",
      965,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], [, "(\\d{3})(\\d{5})", "$1 $2", ["[25]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    KY: [, [, , "(?:345|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}", , , , "3452221234", , , , [7]], [, , "345(?:32[1-9]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[67]|2[2-9]|3[689]))\\d{4}", , , , "3453231234", , , , [7]], [
      ,
      ,
      "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",
      ,
      ,
      ,
      "8002345678"
    ], [, , "900[2-9]\\d{6}|345976\\d{4}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "KY", 1, "011", "1", , , "1", , , , , , [, , "345849\\d{4}", , , , "3458491234"], , "345", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    KZ: [, [, , "(?:33622|(?:7\\d|80)\\d{3})\\d{5}", , , , , , , [10]], [
      ,
      ,
      "33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}",
      ,
      ,
      ,
      "7123456789"
    ], [, , "7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}", , , , "7710009998"], [, , "800\\d{7}", , , , "8001234567"], [, , "809\\d{7}", , , , "8091234567"], [, , , , , , , , , [-1]], [, , "808\\d{7}", , , , "8081234567"], [, , "751\\d{7}", , , , "7511234567"], "KZ", 7, "810", "8", , , "8", , "8~10", , , , [, , , , , , , , , [-1]], , , [, , "751\\d{7}"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LA: [, [, , "(?:2\\d|3)\\d{8}|(?:[235-8]\\d|41)\\d{6}", , , , , , , [8, 9, 10], [6]], [, , "(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}", , , , "21212862", , , [8, 9], [6]], [
      ,
      ,
      "20(?:2[2389]|5[24-689]|7[6-8]|9[1-35-9])\\d{6}",
      ,
      ,
      ,
      "2023123456",
      ,
      ,
      [10]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LA", 856, "00", "0", , , "0", , , , [[, "(20)(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["20"], "0$1"], [, "([2-8]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], [, "(30)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LB: [, [, , "[7-9]\\d{7}|[13-9]\\d{6}", , , , , , , [7, 8]], [
      ,
      ,
      "(?:(?:[14-69]\\d|8[02-9])\\d|7(?:[2-57]\\d|62|8[0-7]|9[04-9]))\\d{4}",
      ,
      ,
      ,
      "1123456",
      ,
      ,
      [7]
    ], [, , "(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3]))\\d{5}", , , , "71123456"], [, , , , , , , , , [-1]], [, , "9[01]\\d{6}", , , , "90123456", , , [8]], [, , "80\\d{6}", , , , "80123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LB", 961, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[78]|9[01]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LC: [, [
      ,
      ,
      "(?:[58]\\d\\d|758|900)\\d{7}",
      ,
      ,
      ,
      ,
      ,
      ,
      [10],
      [7]
    ], [, , "758(?:4(?:30|5[0-9]|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}", , , , "7584305678", , , , [7]], [, , "758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[01]))\\d{4}", , , , "7582845678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "LC", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "758", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LI: [, [, , "(?:(?:[2378]|6\\d\\d)\\d|90)\\d{5}", , , , , , , [7, 9]], [, , "(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}", , , , "2345678", , , [7]], [, , "6(?:5(?:09|1\\d|20)|6(?:0[0-6]|10|2[06-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}", , , , "660234567"], [, , "80(?:02[28]|9\\d{2})\\d{2}", , , , "8002222", , , [7]], [, , "90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}", , , , "9002222", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LI", 423, "00", "0", , , "0|10(?:01|20|66)", , , , [[
      ,
      "(\\d{3})(\\d{2})(\\d{2})",
      "$1 $2 $3",
      ["[237-9]"]
    ], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[56]"]], [, "(69)(7\\d{2})(\\d{4})", "$1 $2 $3", ["697"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "870(?:28|87)\\d{2}", , , , "8702812", , , [7]], , , [, , "697(?:42|56|[78]\\d)\\d{4}", , , , "697861234", , , [9]]],
    LK: [, [, , "(?:[1-7]\\d|[89]1)\\d{7}", , , , , , , [9], [7]], [, , "1(?:1[2-57]\\d{6}|973\\d{5})|(?:2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7]|[89]1)[2-57]\\d{6}", , , , "112345678", , , , [7]], [, , "7[0125-8]\\d{7}", , , , "712345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], "LK", 94, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LR: [, [, , "(?:[25]\\d|33|77|88)\\d{7}|(?:2\\d|[45])\\d{6}", , , , , , , [7, 8, 9]], [, , "(?:2\\d{3}|33333)\\d{4}", , , , "21234567", , , [8, 9]], [, , "(?:(?:(?:20|77|88)\\d|330|555)\\d|4[67])\\d{5}|5\\d{6}", , , , "770123456", , , [7, 9]], [, , , , , , , , , [-1]], [
      ,
      ,
      "332(?:02|[2-5]\\d)\\d{4}",
      ,
      ,
      ,
      "332021234",
      ,
      ,
      [9]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LR", 231, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["4[67]|5"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[257]|33|88"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LS: [, [, , "(?:[256]\\d\\d|800)\\d{5}", , , , , , , [8]], [, , "2\\d{7}", , , , "22123456"], [, , "[56]\\d{7}", , , , "50123456"], [, , "800[256]\\d{4}", , , , "80021234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], "LS", 266, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LT: [, [, , "(?:[3469]\\d|52|[78]0)\\d{6}", , , , , , , [8]], [, , "(?:3[1478]|4[124-6]|52)\\d{6}", , , , "31234567"], [, , "6\\d{7}", , , , "61234567"], [, , "800\\d{5}", , , , "80012345"], [, , "9(?:0[0239]|10)\\d{5}", , , , "90012345"], [, , "808\\d{5}", , , , "80812345"], [, , "700\\d{5}", , , , "70012345"], [, , , , , , , , , [-1]], "LT", 370, "00", "8", , , "[08]", , , , [[
      ,
      "([34]\\d)(\\d{6})",
      "$1 $2",
      ["37|4(?:1|5[45]|6[2-4])"],
      "(8-$1)",
      ,
      1
    ], [, "([3-6]\\d{2})(\\d{5})", "$1 $2", ["3[148]|4(?:[24]|6[09])|528|6"], "(8-$1)", , 1], [, "([7-9]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", , 1], [, "(5)(2\\d{2})(\\d{4})", "$1 $2 $3", ["52[0-79]"], "(8-$1)", , 1]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "70[67]\\d{5}", , , , "70712345"], , , [, , , , , , , , , [-1]]],
    LU: [, [, , "[2457-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5(?:[013-9]\\d{1,8}|2\\d{1,3}))|6\\d{8}", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11]], [
      ,
      ,
      "2[2-9]\\d{2,9}|(?:3(?:[0-46-9]\\d|5[013-9])|[457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8}",
      ,
      ,
      ,
      "27123456"
    ], [, , "6(?:[269][18]|5[158]|7[189]|81)\\d{6}", , , , "628123456", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "90[015]\\d{5}", , , , "90012345", , , [8]], [, , "801\\d{5}", , , , "80112345", , , [8]], [, , , , , , , , , [-1]], [, , "20(?:1\\d{5}|[2-689]\\d{1,7})", , , , "20201234", , , [4, 5, 6, 7, 8, 9, 10]], "LU", 352, "00", , , , "(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)", , , , [[, "(\\d{2})(\\d{3})", "$1 $2", ["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"], , "$CC $1"], [
      ,
      "(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3",
      ["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"],
      ,
      "$CC $1"
    ], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})", "$1 $2 $3 $4", ["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:0[2-9]|[1-9])|9(?:0[2-46-9]|[1-9])"], , "$CC $1"], [
      ,
      "(\\d{3})(\\d{2})(\\d{3})",
      "$1 $2 $3",
      ["70|80[01]|90[015]"],
      ,
      "$CC $1"
    ], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    LV: [, [, , "(?:[268]\\d|90)\\d{6}", , , , , , , [8]], [, , "6\\d{7}", , , , "63123456"], [, , "2\\d{7}", , , , "21234567"], [, , "80\\d{6}", , , , "80123456"], [, , "90\\d{6}", , , , "90123456"], [, , "81\\d{6}", , , , "81123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LV", 371, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , , [, , , , , , , , , [-1]]],
    LY: [, [, , "(?:[2569]\\d|71)\\d{7}", , , , , , , [9], [7]], [, , "(?:2[1345]|5[1347]|6[123479]|71)\\d{7}", , , , "212345678", , , , [7]], [, , "9[1-6]\\d{7}", , , , "912345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LY", 218, "00", "0", , , "0", , , , [[, "([25-79]\\d)(\\d{7})", "$1-$2", ["[25-79]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MA: [, [, , "[5-8]\\d{8}", , , , , , , [9]], [
      ,
      ,
      "5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",
      ,
      ,
      ,
      "520123456"
    ], [, , "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}", , , , "650123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89\\d{7}", , , , "891234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5924[01]\\d{4}", , , , "592401234"], "MA", 212, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{6})", "$1-$2", ["5(?:2[015-7]|3[0-4])|[67]"], "0$1"], [, "(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9]|9)|892", "5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|9)|892"], "0$1"], [, "(\\d{5})(\\d{4})", "$1-$2", ["5[23]"], "0$1"], [
      ,
      "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["5"],
      "0$1"
    ], [, "(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MC: [, [, , "(?:(?:[349]|6\\d)\\d\\d|870)\\d{5}", , , , , , , [8, 9]], [, , "(?:870|9[2-47-9]\\d)\\d{5}", , , , "99123456", , , [8]], [, , "(?:(?:3|6\\d)\\d\\d|4(?:4\\d|5[1-9]))\\d{5}", , , , "612345678"], [, , "90\\d{6}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MC", 377, "00", "0", , , "0", , , , [
      [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[39]"]],
      [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"],
      [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["8"]],
      [, "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]
    ], , [, , , , , , , , , [-1]], , , [, , "870\\d{5}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MD: [
      ,
      [, , "(?:[235-7]\\d|[89]0)\\d{6}", , , , , , , [8]],
      [, , "(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}", , , , "22212345"],
      [, , "(?:562|6\\d\\d|7(?:[189]\\d|6[07]|7[457-9]))\\d{5}", , , , "62112345"],
      [, , "800\\d{5}", , , , "80012345"],
      [, , "90[056]\\d{5}", , , , "90012345"],
      [, , "808\\d{5}", , , , "80812345"],
      [, , , , , , , , , [-1]],
      [, , "3[08]\\d{6}", , , , "30123456"],
      "MD",
      373,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "803\\d{5}", , , , "80312345"],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    ME: [, [, , "(?:20|[3-79]\\d|80\\d?)\\d{6}", , , , , , , [8, 9], [6]], [
      ,
      ,
      "(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:[01][2467]|2[2-467]))\\d{5}",
      ,
      ,
      ,
      "30234567",
      ,
      ,
      [8],
      [6]
    ], [, , "6(?:00\\d|3[024]\\d|6[0-25]\\d|[7-9]\\d{2})\\d{4}", , , , "67622901", , , [8]], [, , "80(?:[0-2578]|9\\d)\\d{5}", , , , "80080002"], [, , "(?:9(?:4[1568]|5[178]))\\d{5}", , , , "94515151", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "78[1-49]\\d{5}", , , , "78108780", , , [8]], "ME", 382, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-57-9]|6[036-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "77[1-9]\\d{5}", , , , "77273012", , , [8]], , , [, , , , , , , , , [-1]]],
    MF: [, [
      ,
      ,
      "(?:590|69\\d)\\d{6}",
      ,
      ,
      ,
      ,
      ,
      ,
      [9]
    ], [, , "590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}", , , , "590271234"], [, , "69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}", , , , "690001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MF", 590, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MG: [
      ,
      [, , "[23]\\d{8}", , , , , , , [9], [7]],
      [, , "20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}", , , , "202123456", , , , [7]],
      [, , "3[2-49]\\d{7}", , , , "321234567"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "22\\d{7}", , , , "221234567"],
      "MG",
      261,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "([23]\\d)(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    MH: [
      ,
      [, , "(?:(?:[256]\\d|45)\\d|329)\\d{4}", , , , , , , [7]],
      [, , "(?:247|528|625)\\d{4}", , , , "2471234"],
      [, , "(?:(?:23|54)5|329|45[56])\\d{4}", , , , "2351234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "635\\d{4}", , , , "6351234"],
      "MH",
      692,
      "011",
      "1",
      ,
      ,
      "1",
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    MK: [, [, , "[2-578]\\d{7}", , , , , , , [8], [6, 7]], [, , "(?:2(?:[23]\\d|5[0-24578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}", , , , "22012345", , , , [6, 7]], [, , "7(?:[0-25-8]\\d{2}|3[2-4]\\d|421|9[23]\\d)\\d{4}", , , , "72345678"], [, , "800\\d{5}", , , , "80012345"], [, , "5[02-9]\\d{6}", , , , "50012345"], [
      ,
      ,
      "8(?:0[1-9]|[1-9]\\d)\\d{5}",
      ,
      ,
      ,
      "80123456"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MK", 389, "00", "0", , , "0", , , , [[, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], [, "([347]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], [, "([58]\\d{2})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    ML: [, [, , "(?:[246-9]\\d|50)\\d{6}", , , , , , , [8]], [, , "(?:2(?:0(?:2\\d|7[0-8])|1(?:2[67]|[4-689]\\d))|4(?:0[0-4]|4[1-39])\\d)\\d{4}", , , , "20212345"], [
      ,
      ,
      "(?:2(?:079|17\\d)|50\\d{2}|[679]\\d{3}|8[239]\\d{2})\\d{4}",
      ,
      ,
      ,
      "65012345"
    ], [, , "80\\d{6}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ML", 223, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]], [, "(\\d{4})", "$1", ["67|74"]]], [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]], [, , , , , , , , , [-1]], , , [, , "80\\d{6}"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MM: [, [, , "(?:1|[24-7]\\d)\\d{5,7}|8\\d{6,9}|9(?:[0-46-9]\\d{6,8}|5\\d{6})|2\\d{5}", , , , , , , [6, 7, 8, 9, 10], [5]], [
      ,
      ,
      "1(?:2\\d{1,2}|[35]\\d|4(?:\\d|2[2-469]|39|6[25]|70)|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|2[246]\\d{4}|39\\d{4}|62\\d{4}|70\\d{4}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2(?:[25-8]|4(?:80)?)|3(?:2(?:02)?|[36]|4(?:70)?|56?)|[46][2-6]|5(?:[35]|4(?:70)?))\\d{4}|5(?:2(?:2(?:\\d{1,2})?|[35-8]|4(?:70)?)|3[2-68]|4(?:21?|4(?:70)?|[5-8])|5[23]|6[2-4]|7(?:[235-8]|4(?:80)?)|8(?:[25-7]|4(?:70)?)|9(?:[235-7]|4(?:70)?))\\d{4}|6(?:0[23]|1(?:2(?:0|4\\d)?|[356])|2[2-6]|3(?:[25-6]|4(?:70)?)|4(?:2(?:4\\d)?|[3-6])|5[2-4]|6[2-8]|7(?:[2367]|4(?:\\d|39|[67]0)|5\\d?|8[145]\\d)|8[245]|9(?:20?|4))\\d{4}|7(?:[04](?:[25-8]|4(?:70)?)|1(?:20?|[35-7]|4(?:70)?)|22|3[2-4]|5(?:[235-7]|4(?:70)?))\\d{4}|8(?:1(?:2\\d{1,2}|[35689]\\d|4(?:70)?\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3(?:2|4(?:70)?)\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}",
      ,
      ,
      ,
      "1234567",
      ,
      ,
      [6, 7, 8, 9],
      [5]
    ], [, , "17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3(?:[0-36]|4[069])\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|6(?:1\\d|9\\d{2}|\\d)|7(?:3|5[0-2]|[6-9]\\d)\\d|8(?:\\d|9\\d{2})|9(?:1\\d|[5-7]\\d{2}|[089]))\\d{5}", , , , "92123456", , , [7, 8, 9, 10]], [, , "80080[01][1-9]\\d{3}", , , , "8008001234", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:1(?:333|468)|2468)\\d{4}", , , , "13331234", , , [8]], "MM", 95, "00", "0", , , "0", , , , [[
      ,
      "(\\d)(\\d{3})(\\d{3,4})",
      "$1 $2 $3",
      ["1|2[245]"],
      "0$1"
    ], [, "(2)(\\d{4})(\\d{4})", "$1 $2 $3", ["251"], "0$1"], [, "(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[4-8]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-8]"], "0$1"], [, "(9)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], [, "(9)([34]\\d{4})(\\d{4})", "$1 $2 $3", ["9(?:3[0-36]|4[0-57-9])"], "0$1"], [, "(9)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92[56]"], "0$1"], [
      ,
      "(9)(\\d{3})(\\d{3})(\\d{2})",
      "$1 $2 $3 $4",
      ["93"],
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MN: [, [, , "[12]\\d{8,9}|[1257-9]\\d{7}", , , , , , , [8, 9, 10], [6, 7]], [, , "[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}", , , , "50123456", , , , [6, 7]], [, , "(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}", , , , "88123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "7[05-8]\\d{6}", , , , "75123456", , , [8]], "MN", 976, "001", "0", , , "0", , , , [[
      ,
      "([12]\\d)(\\d{2})(\\d{4})",
      "$1 $2 $3",
      ["[12]1"],
      "0$1"
    ], [, "([12]2\\d)(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], [, "([12]\\d{3})(\\d{5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)2"], "0$1"], [, "(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"], "$1"], [, "([12]\\d{4})(\\d{4,5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)[4-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MO: [, [, , "(?:28|[68]\\d)\\d{6}", , , , , , , [8]], [, , "(?:28[2-57-9]|8(?:11|[2-57-9]\\d))\\d{5}", , , , "28212345"], [
      ,
      ,
      "6(?:[2356]\\d\\d|8(?:[02][5-9]|[1478]\\d|[356][0-4]))\\d{4}",
      ,
      ,
      ,
      "66123456"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MO", 853, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MP: [, [, , "(?:[58]\\d\\d|(?:67|90)0)\\d{7}", , , , , , , [10], [7]], [, , "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}", , , , "6702345678", , , , [7]], [
      ,
      ,
      "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",
      ,
      ,
      ,
      "6702345678",
      ,
      ,
      ,
      [7]
    ], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "MP", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , "670", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MQ: [, [, , "(?:596|69\\d)\\d{6}", , , , , , , [9]], [, , "596(?:0[0-7]|10|2[7-9]|3[05-9]|4[0-46-8]|[5-7]\\d|8[09]|9[4-8])\\d{4}", , , , "596301234"], [
      ,
      ,
      "69(?:6(?:[0-47-9]\\d|5[0-6]|6[0-4])|727)\\d{4}",
      ,
      ,
      ,
      "696201234"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MQ", 596, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[56]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MR: [
      ,
      [, , "(?:[2-4]\\d\\d|800)\\d{5}", , , , , , , [8]],
      [, , "(?:25[08]|35\\d|45[1-7])\\d{5}", , , , "35123456"],
      [, , "[2-4][0-46-9]\\d{6}", , , , "22123456"],
      [, , "800\\d{5}", , , , "80012345"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "MR",
      222,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    MS: [
      ,
      [, , "(?:(?:[58]\\d\\d|900)\\d\\d|66449)\\d{5}", , , , , , , [10], [7]],
      [, , "664491\\d{4}", , , , "6644912345", , , , [7]],
      [, , "66449[2-6]\\d{4}", , , , "6644923456", , , , [7]],
      [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"],
      [, , "900[2-9]\\d{6}", , , , "9002123456"],
      [, , , , , , , , , [-1]],
      [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
      [, , , , , , , , , [-1]],
      "MS",
      1,
      "011",
      "1",
      ,
      ,
      "1",
      ,
      ,
      ,
      ,
      ,
      [, , , , , , , , , [-1]],
      ,
      "664",
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    MT: [
      ,
      [, , "(?:(?:[2579]\\d\\d|800)\\d|3550)\\d{4}", , , , , , , [8]],
      [, , "2(?:0(?:[169]\\d|3[1-4])|[1-357]\\d\\d)\\d{4}", , , , "21001234"],
      [, , "(?:7(?:210|[79]\\d\\d)|9(?:2(?:1[01]|31)|69[67]|8(?:1[1-3]|89|97)|9\\d\\d))\\d{4}", , , , "96961234"],
      [, , "800[3467]\\d{4}", , , , "80071234"],
      [, , "5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}", , , , "50037123"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "3550\\d{4}", , , , "35501234"],
      "MT",
      356,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]],
      ,
      [, , "7117\\d{4}", , , , "71171234"],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "501\\d{5}", , , , "50112345"],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    MU: [, [, , "(?:[2-468]|5\\d)\\d{6}", , , , , , , [7, 8]], [, , "(?:2(?:[03478]\\d|1[0-7]|6[1-79])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}", , , , "54480123"], [, , "5(?:2[589]\\d|4(?:2[1-389]|[489]\\d|7[1-9])|7\\d{2}|8(?:[0-689]\\d|7[15-8])|9[0-8]\\d)\\d{4}", , , , "52512345", , , [8]], [, , "80[012]\\d{4}", , , , "8001234", , , [7]], [
      ,
      ,
      "30\\d{5}",
      ,
      ,
      ,
      "3012345",
      ,
      ,
      [7]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3(?:20|9\\d)\\d{4}", , , , "3201234", , , [7]], "MU", 230, "0(?:0|[2-7]0|33)", , , , , , "020", , [[, "([2-46-9]\\d{2})(\\d{4})", "$1 $2", ["[2-46-9]"]], [, "(5\\d{3})(\\d{4})", "$1 $2", ["5"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MV: [, [, , "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", , , , , , , [7, 10]], [, , "(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024-68]|8[024689]))\\d{4}", , , , "6701234", , , [7]], [
      ,
      ,
      "(?:46[46]|(?:7[2-9]|9[14-9])\\d)\\d{4}",
      ,
      ,
      ,
      "7712345",
      ,
      ,
      [7]
    ], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MV", 960, "0(?:0|19)", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[367]|4(?:00|[56])|9[14-9]"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "4[05]0\\d{4}", , , , "4001234", , , [7]], , , [, , , , , , , , , [-1]]],
    MW: [, [, , "1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}", , , , , , , [7, 9]], [, , "(?:1[2-9]|21\\d\\d)\\d{5}", , , , "1234567"], [
      ,
      ,
      "(?:111|(?:77|88|99)\\d)\\d{6}",
      ,
      ,
      ,
      "991234567",
      ,
      ,
      [9]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "31\\d{7}", , , , "310123456", , , [9]], "MW", 265, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[179]|88"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MX: [, [, , "(?:1\\d|[2-9])\\d{9}", , , , , , , [10, 11], [
      7,
      8
    ]], [, , "(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}", , , , "2221234567", , , [10], [7, 8]], [
      ,
      ,
      "1(?:(?:33|55|81)\\d{8}|(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})",
      ,
      ,
      ,
      "12221234567",
      ,
      ,
      [11]
    ], [, , "8(?:00|88)\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , "300\\d{7}", , , , "3001234567", , , [10]], [, , "500\\d{7}", , , , "5001234567", , , [10]], [, , , , , , , , , [-1]], "MX", 52, "0[09]", "01", , , "0[12]|04[45](\\d{10})", "1$1", , , [
      [, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1],
      [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1],
      [, "(1)([358]\\d)(\\d{4})(\\d{4})", "044 $2 $3 $4", ["1(?:33|55|81)"], "$1", , 1],
      [, "(1)(\\d{3})(\\d{3})(\\d{4})", "044 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"], "$1", , 1]
    ], [[, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1], [, "(1)([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3 $4", ["1(?:33|55|81)"]], [, "(1)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    MY: [, [, , "(?:1\\d\\d?|3\\d|[4-9])\\d{7}", , , , , , , [8, 9, 10], [6, 7]], [, , "(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[346]\\d|5[0-489]|7[1-9]|8[0-567-9]|9[23])|6(?:2[2-9]|3[135789]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|8[0-35-9]|6[5-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}", , , , "323856789", , , [8, 9], [6, 7]], [
      ,
      ,
      "1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])\\d|1(?:[1-5]\\d{2}|6(?:0[5-9]|[1-9]\\d))\\d|[23679][2-9]\\d{2}|4(?:[235-9]\\d{2}|400)|59\\d{3}|8(?:1[23]\\d|[236]\\d{2}|4(?:[06]\\d|7[0-4])|5[7-9]\\d|7[016-9]\\d|8(?:[01]\\d|[27][0-4])|9[0-8]\\d))\\d{4}",
      ,
      ,
      ,
      "123456789",
      ,
      ,
      [9, 10]
    ], [, , "1[378]00\\d{6}", , , , "1300123456", , , [10]], [, , "1600\\d{6}", , , , "1600123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "154(?:6(?:0\\d|1[0-3])|8(?:[25]1|4[0189]|7[0-4679]))\\d{4}", , , , "1546012345", , , [10]], "MY", 60, "00", "0", , , "0", , , , [
      [, "([4-79])(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"],
      [, "(3)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"],
      [, "([18]\\d)(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1[02-46-9][1-9]|8"], "0$1"],
      [, "(1)([36-8]00)(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1[36-8]0", "1[36-8]00"]],
      [, "(11)(\\d{4})(\\d{4})", "$1-$2 $3", ["11"], "0$1"],
      [, "(15[49])(\\d{3})(\\d{4})", "$1-$2 $3", ["15[49]"], "0$1"]
    ], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    MZ: [, [, , "(?:2|8\\d)\\d{7}", , , , , , , [8, 9]], [, , "2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}", , , , "21123456", , , [8]], [, , "8[2-7]\\d{7}", , , , "821234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MZ", 258, "00", , , , , , , , [
      [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-7]"]],
      [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]
    ], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    NA: [, [, , "[68]\\d{7,8}", , , , , , , [8, 9]], [
      ,
      ,
      "6(?:1(?:[02-4]\\d\\d|17)|2(?:17|54\\d|69|70)|3(?:17|2[0237]\\d|34|6[289]|7[01]|81)|4(?:17|(?:27|41|5[25])\\d|69|7[01])|5(?:17|2[236-8]\\d|69|7[01])|6(?:17|26\\d|38|42|69|7[01])|7(?:17|(?:2[2-4]|30)\\d|6[89]|7[01]))\\d{4}|6(?:1(?:2[2-7]|3[01378]|4[0-4]|69|7[014])|25[0-46-8]|32\\d|4(?:2[0-27]|4[016]|5[0-357])|52[02-9]|62[56]|7(?:2[2-69]|3[013]))\\d{4}",
      ,
      ,
      ,
      "61221234"
    ], [, , "(?:60|8[1245])\\d{7}", , , , "811234567", , , [9]], [, , "80\\d{7}", , , , "800123456", , , [9]], [, , "8701\\d{5}", , , , "870123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "8(?:3\\d\\d|86)\\d{5}", , , , "88612345"], "NA", 264, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8[0-5]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , , [, , , , , , , , , [-1]]],
    NC: [, [, , "[2-57-9]\\d{5}", , , , , , , [6]], [, , "(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}", , , , "201234"], [, , "(?:5[0-4]|[79]\\d|8[0-79])\\d{4}", , , , "751234"], [, , , , , , , , , [-1]], [, , "36\\d{4}", , , , "366711"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NC", 687, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[247-9]|3[0-6]|5[0-4]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    NE: [, [, , "[0289]\\d{7}", , , , , , , [8]], [
      ,
      ,
      "2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",
      ,
      ,
      ,
      "20201234"
    ], [, , "(?:8[04589]|9\\d)\\d{6}", , , , "93123456"], [, , "08\\d{6}", , , , "08123456"], [, , "09\\d{6}", , , , "09123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NE", 227, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["09|[289]"]], [, "(08)(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    NF: [
      ,
      [, , "[13]\\d{5}", , , , , , , [6], [5]],
      [, , "(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}", , , , "106609", , , , [5]],
      [, , "3[58]\\d{4}", , , , "381234", , , , [5]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "NF",
      672,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{4})", "$1 $2", ["1"]], [, "(\\d)(\\d{5})", "$1 $2", ["3"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    NG: [, [, , "[78]\\d{10,13}|[7-9]\\d{9}|[1-9]\\d{7}|[124-7]\\d{6}", , , , , , , [7, 8, 10, 11, 12, 13, 14], [5, 6]], [
      ,
      ,
      "[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}",
      ,
      ,
      ,
      "18040123",
      ,
      ,
      [7, 8],
      [5, 6]
    ], [
      ,
      ,
      "(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[1-689]\\d|7[0-3])|8(?:0(?:1[01]|[2-9]\\d)|1(?:[0-8]\\d|9[01]))|90[235-9]\\d)\\d{6}",
      ,
      ,
      ,
      "8021234567",
      ,
      ,
      [8, 10]
    ], [, , "800\\d{7,11}", , , , "80017591759", , , [10, 11, 12, 13, 14]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NG", 234, "009", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-6]|7(?:0[1-9]|[1-79])|8[2-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["70|8[01]|90[235-9]"], "0$1"], [, "([78]00)(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]00"], "0$1"], [
      ,
      "([78]00)(\\d{5})(\\d{5,6})",
      "$1 $2 $3",
      ["[78]00"],
      "0$1"
    ], [, "(78)(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "700\\d{7,11}", , , , "7001234567", , , [10, 11, 12, 13, 14]], , , [, , , , , , , , , [-1]]],
    NI: [, [, , "(?:1800|[25-8]\\d{3})\\d{4}", , , , , , , [8]], [, , "2\\d{7}", , , , "21234567"], [, , "(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}", , , , "81234567"], [, , "1800\\d{4}", , , , "18001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NI", 505, "00", , , , , , , , [[
      ,
      "(\\d{4})(\\d{4})",
      "$1 $2",
      ["[125-8]"]
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    NL: [, [, , "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8])|[89]\\d{0,3})\\d{6}|1\\d{4,5}", , , , , , , [5, 6, 7, 8, 9, 10]], [, , "(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}", , , , "101234567", , , [9]], [
      ,
      ,
      "6[1-58]\\d{7}",
      ,
      ,
      ,
      "612345678",
      ,
      ,
      [9]
    ], [, , "800\\d{4,7}", , , , "8001234", , , [7, 8, 9, 10]], [, , "90[069]\\d{4,7}", , , , "9061234", , , [7, 8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:85|91)\\d{7}", , , , "851234567", , , [9]], "NL", 31, "00", "0", , , "0", , , , [
      [, "(\\d{2})(\\d{3,4})", "$1 $2", ["140", "140[1-578]"]],
      [, "(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"],
      [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|[78]|91"], "0$1"],
      [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:1[13-578]|[67]|8[0-467])|[25]|3[124]|4[17-9]"], "0$1"],
      [, "(\\d)(\\d{8})", "$1 $2", ["6[1-58]"], "0$1"],
      [, "(\\d{2})(\\d{7})", "$1 $2", ["6"], "0$1"]
    ], , [, , "66\\d{7}", , , , "662345678", , , [9]], , , [, , "140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])", , , , , , , [5, 6]], [, , "140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])|8[478]\\d{7}", , , , "14020", , , [5, 6, 9]], , , [, , , , , , , , , [-1]]],
    NO: [, [
      ,
      ,
      "(?:0|[2-9]\\d{3})\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [5, 8]
    ], [, , "(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}", , , , "21234567", , , [8]], [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", , , , "40612345", , , [8]], [, , "80[01]\\d{5}", , , , "80012345", , , [8]], [, , "82[09]\\d{5}", , , , "82012345", , , [8]], [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]], [, , "880\\d{5}", , , , "88012345", , , [8]], [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]], "NO", 47, "00", , , , , , , , [[, "([489]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]"]], [, "([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], 1, , [, , , , , , , , , [-1]], [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", , , , "01234"], , , [, , "81[23]\\d{5}", , , , "81212345", , , [8]]],
    NP: [
      ,
      [, , "9\\d{9}|[1-9]\\d{7}", , , , , , , [8, 10], [6, 7]],
      [, , "(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}", , , , "14567890", , , [8], [6, 7]],
      [, , "9(?:6[0-3]|7[245]|8[0-24-68])\\d{7}", , , , "9841234567", , , [10]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "NP",
      977,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(1)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], [, "(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-69]|7[15-9])"], "0$1"], [, "(9\\d{2})(\\d{7})", "$1-$2", ["9(?:6[013]|7[245]|8)"], "$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    NR: [, [, , "(?:444|55\\d|888)\\d{4}", , , , , , , [7]], [, , "(?:444|888)\\d{4}", , , , "4441234"], [, , "55[4-9]\\d{4}", , , , "5551234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NR", 674, "00", , , , , , , , [[
      ,
      "(\\d{3})(\\d{4})",
      "$1 $2",
      ["[458]"]
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    NU: [, [, , "(?:[47]|888\\d)\\d{3}", , , , , , , [4, 7]], [, , "[47]\\d{3}", , , , "7012", , , [4]], [, , "888[4-9]\\d{3}", , , , "8884012", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NU", 683, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    NZ: [, [, , "[28]\\d{7,9}|[346]\\d{7}|(?:508|[79]\\d)\\d{6,7}", , , , , , , [8, 9, 10], [7]], [
      ,
      ,
      "(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}",
      ,
      ,
      ,
      "32345678",
      ,
      ,
      [8],
      [7]
    ], [, , "2(?:[028]\\d{7,8}|1\\d{6,8}|[79]\\d{7})", , , , "211234567"], [, , "508\\d{6,7}|80\\d{6,8}", , , , "800123456"], [, , "90\\d{6,7}", , , , "900123456", , , [8, 9]], [, , , , , , , , , [-1]], [, , "70\\d{7}", , , , "701234567", , , [9]], [, , , , , , , , , [-1]], "NZ", 64, "0(?:0|161)", "0", , , "0", , "00", , [[, "(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["240|[346]|7[2-57-9]|9[1-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["21"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:1[1-9]|[69]|7[0-35-9])|70|86"], "0$1"], [
      ,
      "(2\\d)(\\d{3,4})(\\d{4})",
      "$1 $2 $3",
      ["2[028]"],
      "0$1"
    ], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["90"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|5|[89]0"], "0$1"]], , [, , "[28]6\\d{6,7}", , , , "26123456", , , [8, 9]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    OM: [, [, , "(?:[279]\\d{3}|500|8007\\d?)\\d{4}", , , , , , , [7, 8, 9]], [, , "2[2-6]\\d{6}", , , , "23123456", , , [8]], [, , "(?:7[19]\\d|9(?:0[1-9]|[1-9]\\d))\\d{5}", , , , "92123456", , , [8]], [, , "(?:500|8007\\d?)\\d{4}", , , , "80071234"], [, , "900\\d{5}", , , , "90012345", , , [8]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "OM", 968, "00", , , , , , , , [[, "(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], [, "(\\d{2})(\\d{6})", "$1 $2", ["2"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[79]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    PA: [, [, , "(?:[1-57-9]|6\\d)\\d{6}", , , , , , , [7, 8]], [
      ,
      ,
      "(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|[68][58]|7[0167]|9[39])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[026-9])|3(?:[089]\\d|1[014-7]|2[0-35]|33|4[0-579]|55|6[068]|7[06-8])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[05]|7[0-24-9]|8[7-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",
      ,
      ,
      ,
      "2001234",
      ,
      ,
      [7]
    ], [, , "(?:1[16]1|21[89]|6(?:[02-9]\\d|1[0-5])\\d|8(?:1[01]|7[23]))\\d{4}", , , , "61234567"], [, , "800\\d{4}", , , , "8001234", , , [7]], [, , "(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}", , , , "8601234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PA", 507, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], [, "(\\d{4})(\\d{4})", "$1-$2", ["6"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    PE: [, [, , "(?:[14-8]|9\\d)\\d{7}", , , , , , , [8, 9], [6, 7]], [
      ,
      ,
      "(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}",
      ,
      ,
      ,
      "11234567",
      ,
      ,
      [8],
      [6, 7]
    ], [, , "9\\d{8}", , , , "912345678", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "805\\d{5}", , , , "80512345", , , [8]], [, , "801\\d{5}", , , , "80112345", , , [8]], [, , "80[24]\\d{5}", , , , "80212345", , , [8]], [, , , , , , , , , [-1]], "PE", 51, "19(?:1[124]|77|90)00", "0", " Anexo ", , "0", , , , [[, "(1)(\\d{7})", "$1 $2", ["1"], "(0$1)"], [, "([4-8]\\d)(\\d{6})", "$1 $2", ["[4-7]|8[2-4]"], "(0$1)"], [, "(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "$1"]], , [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    PF: [, [, , "[48]\\d{7}|4\\d{5}", , , , , , , [6, 8]], [, , "4(?:[09][45689]\\d|4)\\d{4}", , , , "40412345"], [, , "8[79]\\d{6}", , , , "87123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PF", 689, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4[09]|8[79]"]], [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]]], , [, , , , , , , , , [-1]], , , [, , "44\\d{4}", , , , , , , [6]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    PG: [, [
      ,
      ,
      "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",
      ,
      ,
      ,
      ,
      ,
      ,
      [7, 8]
    ], [, , "(?:3[0-2]\\d|4[257]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}", , , , "3123456", , , [7]], [, , "(?:7(?:[0-689]\\d|75)|81\\d)\\d{5}", , , , "70123456", , , [8]], [, , "180\\d{4}", , , , "1801234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "2(?:0[0-47]|7[568])\\d{4}", , , , "2751234", , , [7]], "PG", 675, "140[1-3]|00", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[13-689]|27"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["20|[78]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    PH: [
      ,
      [, , "(?:1800\\d{2,4}|2|[89]\\d{4})\\d{5}|[3-8]\\d{8}|[28]\\d{7}", , , , , , , [6, 8, 9, 10, 11, 12, 13], [5, 7]],
      [, , "2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})", , , , "21234567", , , [6, 8, 9, 10], [5, 7]],
      [, , "(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[235-9]|5[056]|6[5-7]|7[34-79]|89|9[4-9]))\\d{7}", , , , "9051234567", , , [10]],
      [, , "1800\\d{7,9}", , , , "180012345678", , , [11, 12, 13]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "PH",
      63,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], [, "(2)(\\d{5})", "$1 $2", ["2"], "(0$1)"], [, "(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], [, "(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], [, "([3-8]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-8]"], "(0$1)"], [
        ,
        "(\\d{3})(\\d{3})(\\d{4})",
        "$1 $2 $3",
        ["81|9"],
        "0$1"
      ], [, "(1800)(\\d{3})(\\d{4})", "$1 $2 $3", ["180", "1800"]], [, "(1800)(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["180", "1800"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    PK: [, [, , "(?:122|[24-8]\\d{4,5}|9(?:[013-9]\\d{2,4}|2(?:[01]\\d\\d|2(?:[025-8]\\d|1[01]))\\d))\\d{6}|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", , , , , , , [8, 9, 10, 11, 12], [6, 7]], [
      ,
      ,
      "(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}",
      ,
      ,
      ,
      "2123456789",
      ,
      ,
      [9, 10],
      [6, 7, 8]
    ], [, , "3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}", , , , "3012345678", , , [10]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "900\\d{5}", , , , "90012345", , , [8]], [, , , , , , , , , [-1]], [, , "122\\d{6}", , , , "122044444", , , [9]], [, , , , , , , , , [-1]], "PK", 92, "00", "0", , , "0", , , , [[, "([89]00)(\\d{3})(\\d{2})", "$1 $2 $3", ["[89]00"], "0$1"], [, "(1\\d{3})(\\d{5})", "$1 $2", ["1"], "$1"], [, "(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], [
      ,
      "(\\d{3})(\\d{6,7})",
      "$1 $2",
      ["2[349]|45|54|60|72|8[2-5]|9[2-469]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-469])\\d[2-9]"],
      "(0$1)"
    ], [, "(58\\d{3})(\\d{5})", "$1 $2", ["58[126]"], "(0$1)"], [, "(3\\d{2})(\\d{7})", "$1 $2", ["3"], "0$1"], [, "(\\d{2})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"], "(0$1)"], [, "(\\d{3})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", [
      "2[349]|45|54|60|72|8[2-5]|9[2-9]",
      "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1",
      "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11",
      "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"
    ], "(0$1)"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}", , , , "21111825888", , , [11, 12]], , , [, , , , , , , , , [-1]]],
    PL: [, [, , "[1-9]\\d{6}(?:\\d{2})?|6\\d{5}(?:\\d{2})?", , , , , , , [
      6,
      7,
      8,
      9
    ]], [, , "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:\\d{7}|19\\d{3})", , , , "123456789", , , [7, 9]], [, , "(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}", , , , "512345678", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "70[01346-8]\\d{6}", , , , "701234567", , , [9]], [, , "801\\d{6}", , , , "801234567", , , [9]], [, , , , , , , , , [-1]], [, , "39\\d{7}", , , , "391234567", , , [9]], "PL", 48, "00", , , , , , , , [[, "(\\d{3})(\\d{3})", "$1 $2", ["11[68]|64"]], [, "(\\d{5})", "$1", ["19"]], [
      ,
      "(\\d{2})(\\d{2})(\\d{3})",
      "$1 $2 $3",
      ["1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]
    ], [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["26|39|45|5[0137]|6[0469]|7[02389]|8[08]"]], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]]], , [, , "64\\d{4,7}", , , , "641234567"], , , [, , , , , , , , , [-1]], [, , "804\\d{6}", , , , "804123456", , , [9]], , , [, , , , , , , , , [-1]]],
    PM: [, [, , "[45]\\d{5}", , , , , , , [6]], [
      ,
      ,
      "(?:4[1-3]|50)\\d{4}",
      ,
      ,
      ,
      "430123"
    ], [, , "(?:4[02-4]|5[05])\\d{4}", , , , "551234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PM", 508, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    PR: [
      ,
      [, , "(?:[589]\\d\\d|787)\\d{7}", , , , , , , [10], [7]],
      [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]],
      [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]],
      [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"],
      [, , "900[2-9]\\d{6}", , , , "9002345678"],
      [, , , , , , , , , [-1]],
      [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"],
      [, , , , , , , , , [-1]],
      "PR",
      1,
      "011",
      "1",
      ,
      ,
      "1",
      ,
      ,
      1,
      ,
      ,
      [, , , , , , , , , [-1]],
      ,
      "787|939",
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    PS: [, [, , "(?:(?:1\\d|5)\\d\\d|[2489]2)\\d{6}", , , , , , , [8, 9, 10], [7]], [, , "(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}", , , , "22234567", , , [8], [7]], [, , "5[69]\\d{7}", , , , "599123456", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , , , , , , , , [-1]], [
      ,
      ,
      "1700\\d{6}",
      ,
      ,
      ,
      "1700123456",
      ,
      ,
      [10]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PS", 970, "00", "0", , , "0", , , , [[, "([2489])(2\\d{2})(\\d{4})", "$1 $2 $3", ["[2489]2"], "0$1"], [, "(5[69]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["5[69]"], "0$1"], [, "(1[78]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[78]0", "1[78]00"], "$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    PT: [
      ,
      [, , "(?:[26-9]\\d|30)\\d{7}", , , , , , , [9]],
      [, , "2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}", , , , "212345678"],
      [, , "9(?:[1-36]\\d\\d|480)\\d{5}", , , , "912345678"],
      [, , "80[02]\\d{6}", , , , "800123456"],
      [, , "(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}", , , , "760123456"],
      [, , "80(?:8\\d|9[1579])\\d{5}", , , , "808123456"],
      [, , "884[0-4689]\\d{5}", , , , "884123456"],
      [, , "30\\d{7}", , , , "301234567"],
      "PT",
      351,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "70(?:7\\d|8[17])\\d{5}", , , , "707123456"],
      ,
      ,
      [, , "600\\d{6}", , , , "600110000"]
    ],
    PW: [, [
      ,
      ,
      "(?:[25-8]\\d\\d|345|488|900)\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [7]
    ], [, , "(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}", , , , "2771234"], [, , "(?:6[2-4689]0|77\\d|88[0-4])\\d{4}", , , , "6201234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PW", 680, "01[12]", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    PY: [, [, , "(?:[2-46-9]\\d|5[0-8])\\d{7}|[2-9]\\d{5,7}", , , , , , , [6, 7, 8, 9], [5]], [
      ,
      ,
      "(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}",
      ,
      ,
      ,
      "212345678",
      ,
      ,
      [7, 8, 9],
      [5, 6]
    ], [, , "9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}", , , , "961456789", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "8700[0-4]\\d{4}", , , , "870012345", , , [9]], "PY", 595, "00", "0", , , "0", , , , [
      [, "(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"],
      [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"],
      [, "(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"],
      [, "(\\d{3})(\\d{6})", "$1 $2", ["9[1-9]"], "0$1"],
      [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["870", "8700"]],
      [, "(\\d{3})(\\d{4,5})", "$1 $2", ["[2-8][1-9]"], "(0$1)"],
      [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8][1-9]"], "0$1"]
    ], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "[2-9]0\\d{4,7}", , , , "201234567"], , , [, , , , , , , , , [-1]]],
    QA: [
      ,
      [, , "(?:(?:2|[3-7]\\d)\\d\\d|800)\\d{4}", , , , , , , [7, 8]],
      [, , "4[04]\\d{6}", , , , "44123456", , , [8]],
      [, , "[35-7]\\d{7}", , , , "33123456", , , [8]],
      [, , "800\\d{4}", , , , "8001234", , , [7]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "QA",
      974,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{4})", "$1 $2", ["2[126]|8"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]]],
      ,
      [, , "2(?:[12]\\d|61)\\d{4}", , , , "2123456", , , [7]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    RE: [, [, , "(?:26|[68]\\d)\\d{7}", , , , , , , [9]], [, , "262\\d{6}", , , , "262161234"], [, , "69(?:2\\d\\d|3(?:0[0-46]|1[013]|2[0-2]|3[0-39]|4\\d|5[05]|6[0-26]|7[0-27]|8[0-38]|9[0-479]))\\d{4}", , , , "692123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89[1-37-9]\\d{6}", , , , "891123456"], [
      ,
      ,
      "8(?:1[019]|2[0156]|84|90)\\d{6}",
      ,
      ,
      ,
      "810123456"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RE", 262, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[268]"], "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    RO: [, [, , "(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}", , , , , , , [6, 9]], [, , "[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d", , , , "211234567"], [, , "7(?:(?:[02-7]\\d|8[03-8]|99)\\d|1(?:[01]\\d|20))\\d{5}", , , , "712034567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [
      ,
      ,
      "90[036]\\d{6}",
      ,
      ,
      ,
      "900123456",
      ,
      ,
      [9]
    ], [, , "801\\d{6}", , , , "801123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RO", 40, "00", "0", " int ", , "0", , , , [[, "(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], [, "(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2379]|80"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "37\\d{7}", , , , "372123456", , , [9]], , , [, , , , , , , , , [-1]]],
    RS: [, [
      ,
      ,
      "[127]\\d{6,11}|3(?:[0-79]\\d{5,10}|8(?:[02-9]\\d{4,9}|1\\d{4,5}))|6\\d{7,9}|800\\d{3,9}|90\\d{4,8}|7\\d{5}",
      ,
      ,
      ,
      ,
      ,
      ,
      [6, 7, 8, 9, 10, 11, 12],
      [5]
    ], [, , "(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}", , , , "10234567", , , [7, 8, 9, 10, 11, 12], [5, 6]], [, , "6(?:[0-689]|7\\d)\\d{6,7}", , , , "601234567", , , [8, 9, 10]], [, , "800\\d{3,9}", , , , "80012345"], [, , "(?:90[0169]|78\\d)\\d{3,7}", , , , "90012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RS", 381, "00", "0", , , "0", , , , [[, "([23]\\d{2})(\\d{4,9})", "$1 $2", ["(?:2[389]|39)0"], "0$1"], [
      ,
      "([1-3]\\d)(\\d{5,10})",
      "$1 $2",
      ["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"],
      "0$1"
    ], [, "(6\\d)(\\d{6,8})", "$1 $2", ["6"], "0$1"], [, "([89]\\d{2})(\\d{3,9})", "$1 $2", ["[89]"], "0$1"], [, "(7[26])(\\d{4,9})", "$1 $2", ["7[26]"], "0$1"], [, "(7[08]\\d)(\\d{4,9})", "$1 $2", ["7[08]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "7[06]\\d{4,10}", , , , "700123456"], , , [, , , , , , , , , [-1]]],
    RU: [, [, , "[347-9]\\d{9}", , , , , , , [10]], [
      ,
      ,
      "(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",
      ,
      ,
      ,
      "3011234567"
    ], [, , "9\\d{9}", , , , "9123456789"], [, , "80[04]\\d{7}", , , , "8001234567"], [, , "80[39]\\d{7}", , , , "8091234567"], [, , , , , , , , , [-1]], [, , "808\\d{7}", , , , "8081234567"], [, , , , , , , , , [-1]], "RU", 7, "810", "8", , , "8", , "8~10", , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1-$2-$3", ["[1-79]"], "$1", , 1], [, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[3489]"], "8 ($1)", , 1], [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1]], [[, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[3489]"], "8 ($1)", , 1], [
      ,
      "(7\\d{2})(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["7"],
      "8 ($1)",
      ,
      1
    ]], [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    RW: [, [, , "(?:06|[27]\\d\\d|[89]00)\\d{6}", , , , , , , [8, 9]], [, , "(?:06|2[258]\\d)\\d{6}", , , , "250123456"], [, , "7[238]\\d{7}", , , , "720123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "900\\d{6}", , , , "900123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RW", 250, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]], [
      ,
      "(\\d{3})(\\d{3})(\\d{3})",
      "$1 $2 $3",
      ["[7-9]"],
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SA: [, [, , "(?:(?:[15]|8\\d)\\d|92)\\d{7}", , , , , , , [9, 10], [7]], [, , "1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}", , , , "112345678", , , [9], [7]], [, , "5(?:[013-689]\\d|7[0-36-8])\\d{6}", , , , "512345678", , , [9]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "925\\d{6}", , , , "925012345", , , [9]], [, , "920\\d{6}", , , , "920012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SA", 966, "00", "0", , , "0", , , , [[
      ,
      "(1\\d)(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["1[1-467]"],
      "0$1"
    ], [, "(5\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], [, "(92\\d{2})(\\d{5})", "$1 $2", ["92"], "$1"], [, "(800)(\\d{3})(\\d{4})", "$1 $2 $3", ["800"], "$1"], [, "(811)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["811"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "811\\d{7}", , , , "8110123456"], , , [, , , , , , , , , [-1]]],
    SB: [, [, , "(?:[1-6]|[7-9]\\d\\d)\\d{4}", , , , , , , [5, 7]], [, , "(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}", , , , "40123", , , [5]], [
      ,
      ,
      "(?:48|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d)\\d{3}",
      ,
      ,
      ,
      "7421234"
    ], [, , "1[38]\\d{3}", , , , "18123", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5[12]\\d{3}", , , , "51123", , , [5]], "SB", 677, "0[01]", , , , , , , , [[, "(\\d{2})(\\d{5})", "$1 $2", ["7[1-9]|8[4-9]|9(?:1[2-9]|2[013-9]|3[0-2]|[46]|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SC: [
      ,
      [, , "(?:(?:(?:[24]\\d|64)\\d|971)\\d|8000)\\d{3}", , , , , , , [7]],
      [, , "4[2-46]\\d{5}", , , , "4217123"],
      [, , "2[5-8]\\d{5}", , , , "2510123"],
      [, , "8000\\d{3}", , , , "8000000"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "(?:64\\d|971)\\d{4}", , , , "6412345"],
      "SC",
      248,
      "0(?:[02]|10?)",
      ,
      ,
      ,
      ,
      ,
      "00",
      ,
      [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    SD: [, [, , "[19]\\d{8}", , , , , , , [9]], [, , "1(?:5\\d|8[3567])\\d{6}", , , , "151231234"], [, , "(?:1[0-2]|9[0-3569])\\d{7}", , , , "911231234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SD", 249, "00", "0", , , "0", , , , [[
      ,
      "(\\d{2})(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ,
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SE: [, [, , "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|[27]\\d{5}", , , , , , , [6, 7, 8, 9, 10, 12]], [
      ,
      ,
      "1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:[0246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:[03]\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8\\d{6,8}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})",
      ,
      ,
      ,
      "8123456",
      ,
      ,
      [7, 8, 9]
    ], [, , "7[02369]\\d{7}", , , , "701234567", , , [9]], [, , "20\\d{4,7}", , , , "20123456", , , [6, 7, 8, 9]], [, , "649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}", , , , "9001234567", , , [7, 8, 9, 10]], [, , "77(?:0\\d{3}(?:\\d{3})?|[1-7]\\d{6})", , , , "771234567", , , [6, 9]], [, , "75[1-8]\\d{6}", , , , "751234567", , , [9]], [, , , , , , , , , [-1]], "SE", 46, "00", "0", , , "0", , , , [[, "([1-469]\\d)(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1"], [, "(9[034]\\d)(\\d{4})", "$1-$2", ["9(?:00|39|44)"], "0$1"], [
      ,
      "(8)(\\d{2,3})(\\d{2,3})(\\d{2})",
      "$1-$2 $3 $4",
      ["8"],
      "0$1"
    ], [, "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"], [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"], [
      ,
      "(7\\d)(\\d{3})(\\d{2})(\\d{2})",
      "$1-$2 $3 $4",
      ["7"],
      "0$1"
    ], [, "(77)(\\d{2})(\\d{2})", "$1-$2$3", ["77"], "0$1"], [, "(20)(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1"], [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9[034]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["25[245]|67[3-6]"], "0$1"]], [[, "([1-469]\\d)(\\d{3})(\\d{2})", "$1 $2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"]], [, "(9[034]\\d)(\\d{4})", "$1 $2", ["9(?:00|39|44)"]], [, "(8)(\\d{2,3})(\\d{2,3})(\\d{2})", "$1 $2 $3 $4", ["8"]], [
      ,
      "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]
    ], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]], [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1 $2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]], [, "(7\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7"]], [, "(77)(\\d{2})(\\d{2})", "$1 $2 $3", ["77"]], [
      ,
      "(20)(\\d{2,3})(\\d{2})",
      "$1 $2 $3",
      ["20"]
    ], [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["9[034]"]], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["25[245]|67[3-6]"]]], [, , "74[02-9]\\d{6}", , , , "740123456", , , [9]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "(?:25[245]|67[3-6])\\d{9}", , , , "254123456789", , , [12]]],
    SG: [, [, , "(?:1\\d{3}|[369]|7000|8(?:\\d{2})?)\\d{7}", , , , , , , [8, 10, 11]], [, , "6[1-9]\\d{6}", , , , "61234567", , , [8]], [, , "(?:8[1-8]|9[0-8])\\d{6}", , , , "81234567", , , [8]], [
      ,
      ,
      "(?:18|8)00\\d{7}",
      ,
      ,
      ,
      "18001234567",
      ,
      ,
      [10, 11]
    ], [, , "1900\\d{7}", , , , "19001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3[12]\\d{6}", , , , "31234567", , , [8]], "SG", 65, "0[0-3]\\d", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[369]|8[1-8]"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1[89]"]], [, "(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["70"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "7000\\d{7}", , , , "70001234567", , , [11]], , , [, , , , , , , , , [-1]]],
    SH: [, [, , "(?:[256]\\d|8)\\d{3}", , , , , , , [4, 5]], [
      ,
      ,
      "2(?:[0-57-9]\\d|6[4-9])\\d\\d",
      ,
      ,
      ,
      "22158"
    ], [, , "[56]\\d{4}", , , , "51234", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "262\\d\\d", , , , "26212", , , [5]], "SH", 290, "00", , , , , , , , , , [, , , , , , , , , [-1]], 1, "[256]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SI: [, [, , "[1-8]\\d{7}|90\\d{4,6}|8\\d{4,6}", , , , , , , [5, 6, 7, 8]], [, , "(?:1\\d|[25][2-8]|3[24-8]|4[24-8]|7[3-8])\\d{6}", , , , "11234567", , , [8], [7]], [, , "(?:[37][01]\\d|4[0139]\\d|51\\d|6(?:[48]\\d|5[15-7]|9[69]))\\d{5}", , , , "31234567", , , [8]], [
      ,
      ,
      "80\\d{4,6}",
      ,
      ,
      ,
      "80123456",
      ,
      ,
      [6, 7, 8]
    ], [, , "90\\d{4,6}|89[1-3]\\d{2,5}", , , , "90123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:59|8[1-3])\\d{6}", , , , "59012345", , , [8]], "SI", 386, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[12]|[34][24-8]|5[2-8]|7[3-8]"], "(0$1)"], [, "([3-7]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], [, "([89][09])(\\d{3,6})", "$1 $2", ["[89][09]"], "0$1"], [, "([58]\\d{2})(\\d{5})", "$1 $2", ["59|8[1-3]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    SJ: [, [, , "(?:0|(?:[4589]\\d|79)\\d\\d)\\d{4}", , , , , , , [5, 8]], [, , "79\\d{6}", , , , "79123456", , , [8]], [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", , , , "41234567", , , [8]], [, , "80[01]\\d{5}", , , , "80012345", , , [8]], [, , "82[09]\\d{5}", , , , "82012345", , , [8]], [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]], [, , "880\\d{5}", , , , "88012345", , , [8]], [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]], "SJ", 47, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", , , , "01234"], , , [
      ,
      ,
      "81[23]\\d{5}",
      ,
      ,
      ,
      "81212345",
      ,
      ,
      [8]
    ]],
    SK: [
      ,
      [, , "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", , , , , , , [6, 7, 9]],
      [, , "(?:2(?:16|[2-9]\\d{3})|[3-5][1-8]\\d{3})\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d", , , , "221234567"],
      [, , "9(?:0(?:[1-8]\\d|9[1-9])|(?:1[0-24-9]|[45]\\d)\\d)\\d{5}", , , , "912123456", , , [9]],
      [, , "800\\d{6}", , , , "800123456", , , [9]],
      [, , "9(?:00|[78]\\d)\\d{6}", , , , "900123456", , , [9]],
      [, , "8[5-9]\\d{7}", , , , "850123456", , , [9]],
      [, , , , , , , , , [-1]],
      [, , "6(?:02|5[0-4]|9[0-6])\\d{6}", , , , "690123456", , , [9]],
      "SK",
      421,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], [, "(\\d{4})(\\d{3})", "$1 $2", ["909", "9090"], "0$1"], [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"]],
      ,
      [, , "9090\\d{3}", , , , "9090123", , , [7]],
      ,
      ,
      [
        ,
        ,
        "(?:(?:602|8(?:00|[5-9]\\d))\\d{3}|9(?:0(?:0\\d{3}|90)|[78]\\d{4}))\\d{3}",
        ,
        ,
        ,
        ,
        ,
        ,
        [7, 9]
      ],
      [, , "96\\d{7}", , , , "961234567", , , [9]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    SL: [, [, , "(?:[2-578]\\d|66|99)\\d{6}", , , , , , , [8], [6]], [, , "[235]2[2-4][2-9]\\d{4}", , , , "22221234", , , , [6]], [, , "(?:2[15]|3[013-5]|4[04]|5[05]|66|7[5-9]|8[08]|99)\\d{6}", , , , "25123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SL", 232, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{6})", "$1 $2", , "(0$1)"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SM: [, [
      ,
      ,
      "(?:0549|[5-7]\\d)\\d{6}",
      ,
      ,
      ,
      ,
      ,
      ,
      [8, 10],
      [6]
    ], [, , "0549(?:8[0157-9]|9\\d)\\d{4}", , , , "0549886377", , , [10], [6]], [, , "6[16]\\d{6}", , , , "66661212", , , [8]], [, , , , , , , , , [-1]], [, , "7[178]\\d{6}", , , , "71123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5[158]\\d{6}", , , , "58001110", , , [8]], "SM", 378, "00", , , , "([89]\\d{5})", "0549$1", , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], [, "(0549)(\\d{6})", "$1 $2", ["054", "0549"]], [, "(\\d{6})", "0549 $1", ["[89]"]]], [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], [
      ,
      "(0549)(\\d{6})",
      "($1) $2",
      ["054", "0549"]
    ], [, "(\\d{6})", "(0549) $1", ["[89]"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SN: [
      ,
      [, , "(?:[378]\\d{4}|93330)\\d{4}", , , , , , , [9]],
      [, , "3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}", , , , "301012345"],
      [, , "7(?:[06-8]\\d|21|90)\\d{6}", , , , "701234567"],
      [, , "800\\d{6}", , , , "800123456"],
      [, , "88[4689]\\d{6}", , , , "884123456"],
      [, , "81[02468]\\d{6}", , , , "810123456"],
      [, , , , , , , , , [-1]],
      [, , "(?:3(?:392|9[01]\\d)\\d|93330)\\d{4}", , , , "933301234"],
      "SN",
      221,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    SO: [, [, , "[346-9]\\d{8}|[12679]\\d{7}|(?:[1-4]\\d|59)\\d{5}|[1348]\\d{5}", , , , , , , [6, 7, 8, 9]], [, , "(?:1\\d{1,2}|2[0-79]\\d|3[0-46-8]?\\d|4[0-7]?\\d|59\\d|8[125])\\d{4}", , , , "4012345", , , [6, 7]], [
      ,
      ,
      "(?:15\\d|2(?:4\\d|8)|3[59]\\d{2}|4[89]\\d{2}|6[1-9]?\\d{2}|7(?:[1-8]\\d|9\\d{1,2})|8[08]\\d{2}|9(?:0[67]|[2-9])\\d)\\d{5}",
      ,
      ,
      ,
      "71123456",
      ,
      ,
      [7, 8, 9]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SO", 252, "00", "0", , , "0", , , , [[, "(\\d{6})", "$1", ["[134]"]], [, "(\\d)(\\d{6})", "$1 $2", ["[13-5]|2[0-79]"]], [, "(\\d)(\\d{7})", "$1 $2", ["24|[67]"]], [, "(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], [, "(\\d{2})(\\d{5,7})", "$1 $2", ["15|28|6[1-35-9]|799|9[2-9]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3[59]|4[89]|6[24-6]|79|8[08]|90"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SR: [
      ,
      [, , "(?:[2-5]|68|[78]\\d)\\d{5}", , , , , , , [6, 7]],
      [, , "(?:2[1-3]|3[0-7]|(?:4|68)\\d|5[2-58])\\d{4}", , , , "211234"],
      [, , "(?:7[124-7]|8[125-9])\\d{5}", , , , "7412345", , , [7]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "56\\d{4}", , , , "561234", , , [6]],
      "SR",
      597,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{3})", "$1-$2", ["[2-4]|5[2-58]"]], [, "(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["5"]], [, "(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    SS: [, [
      ,
      ,
      "[19]\\d{8}",
      ,
      ,
      ,
      ,
      ,
      ,
      [9]
    ], [, , "18\\d{7}", , , , "181234567"], [, , "(?:12|9[1257])\\d{7}", , , , "977123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SS", 211, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    ST: [, [, , "(?:22|9\\d)\\d{5}", , , , , , , [7]], [, , "22\\d{5}", , , , "2221234"], [, , "9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d\\d)\\d{3}", , , , "9812345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], "ST", 239, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SV: [, [, , "[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?", , , , , , , [7, 8, 11]], [, , "2[1-6]\\d{6}", , , , "21234567", , , [8]], [, , "[67]\\d{7}", , , , "70123456", , , [8]], [, , "800\\d{4}(?:\\d{4})?", , , , "8001234", , , [7, 11]], [, , "900\\d{4}(?:\\d{4})?", , , , "9001234", , , [7, 11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SV", 503, "00", , , , , , , , [
      [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]"]],
      [, "(\\d{4})(\\d{4})", "$1 $2", ["[267]"]],
      [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]
    ], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SX: [, [, , "(?:(?:[58]\\d\\d|900)\\d|7215)\\d{6}", , , , , , , [10], [7]], [, , "7215(?:4[2-8]|8[239]|9[056])\\d{4}", , , , "7215425678", , , , [7]], [, , "7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}", , , , "7215205678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [
      ,
      ,
      "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
      ,
      ,
      ,
      "5002345678"
    ], [, , , , , , , , , [-1]], "SX", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "721", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SY: [, [, , "[1-39]\\d{8}|[1-5]\\d{7}", , , , , , , [8, 9], [6, 7]], [, , "(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}", , , , "112345678", , , , [6, 7]], [, , "9(?:22|[3-589]\\d|6[024-9])\\d{6}", , , , "944567890", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SY", 963, "00", "0", , , "0", , , , [[
      ,
      "(\\d{2})(\\d{3})(\\d{3,4})",
      "$1 $2 $3",
      ["[1-5]"],
      "0$1",
      ,
      1
    ], [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", , 1]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    SZ: [, [, , "(?:0800|(?:[237]\\d|900)\\d\\d)\\d{4}", , , , , , , [8, 9]], [, , "[23][2-5]\\d{6}", , , , "22171234", , , [8]], [, , "7[6-9]\\d{6}", , , , "76123456", , , [8]], [, , "0800\\d{4}", , , , "08001234", , , [8]], [, , "900\\d{6}", , , , "900012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "70\\d{6}", , , , "70012345", , , [8]], "SZ", 268, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], [
      ,
      "(\\d{5})(\\d{4})",
      "$1 $2",
      ["9"]
    ]], , [, , , , , , , , , [-1]], , , [, , "0800\\d{4}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TA: [, [, , "8\\d{3}", , , , , , , [4]], [, , "8\\d{3}", , , , "8999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TA", 290, "00", , , , , , , , , , [, , , , , , , , , [-1]], , "8", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TC: [, [, , "(?:[58]\\d\\d|649|900)\\d{7}", , , , , , , [10], [7]], [, , "649(?:712|9(?:4\\d|50))\\d{4}", , , , "6497121234", , , , [7]], [
      ,
      ,
      "649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}",
      ,
      ,
      ,
      "6492311234",
      ,
      ,
      ,
      [7]
    ], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "64971[01]\\d{4}", , , , "6497101234", , , , [7]], "TC", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "649", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TD: [, [, , "(?:22|[69]\\d|77)\\d{6}", , , , , , , [8]], [, , "22(?:[37-9]0|5[0-5]|6[89])\\d{4}", , , , "22501234"], [, , "(?:6[023568]|77|9\\d)\\d{6}", , , , "63012345"], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TD", 235, "00|16", , , , , , "00", , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TG: [, [, , "[279]\\d{7}", , , , , , , [8]], [, , "2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}", , , , "22212345"], [, , "(?:7[09]|9[0-36-9])\\d{6}", , , , "90112345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TG", 228, "00", , , , , , , , [[
      ,
      "(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
      "$1 $2 $3 $4",
      ["[279]"]
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TH: [, [, , "(?:1\\d\\d?|[2-57]|[689]\\d)\\d{7}", , , , , , , [8, 9, 10]], [, , "(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}", , , , "21234567", , , [8]], [, , "(?:14|6[1-6]|[89]\\d)\\d{7}", , , , "812345678", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , "1900\\d{6}", , , , "1900123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "6[08]\\d{7}", , , , "601234567", , , [9]], "TH", 66, "00[1-9]", "0", , , "0", , , , [[
      ,
      "(\\d)(\\d{3})(\\d{4})",
      "$1 $2 $3",
      ["2"],
      "0$1"
    ], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["14|[3-9]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TJ: [
      ,
      [, , "(?:[3-59]\\d|77|88)\\d{7}", , , , , , , [9], [3, 5, 7]],
      [, , "(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}", , , , "372123456", , , , [3, 5, 7]],
      [, , "(?:41[18]|(?:5[05]|77|88|9[0-35-9])\\d)\\d{6}", , , , "917123456"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "TJ",
      992,
      "810",
      "8",
      ,
      ,
      "8",
      ,
      "8~10",
      ,
      [[, "([349]\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"], , , 1], [, "([457-9]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[148]|[578]|9(?:[0235-9]|1[59])"], , , 1], [, "(331700)(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317", "33170", "331700"], , , 1], [, "(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]", "3(?:[1245]|3(?:[02-9]|1[0-589]))"], , , 1]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    TK: [, [, , "[2-47]\\d{3,6}", , , , , , , [4, 5, 6, 7]], [, , "(?:2[2-4]|[34]\\d)\\d{2,5}", , , , "3101"], [
      ,
      ,
      "7[2-4]\\d{2,5}",
      ,
      ,
      ,
      "7290"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TK", 690, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TL: [, [, , "(?:[2-4]\\d|7\\d\\d?|[89]0)\\d{5}", , , , , , , [7, 8]], [, , "(?:2[1-5]|3[1-9]|4[1-4])\\d{5}", , , , "2112345", , , [7]], [, , "7[3-8]\\d{6}", , , , "77212345", , , [8]], [, , "80\\d{5}", , , , "8012345", , , [7]], [, , "90\\d{5}", , , , "9012345", , , [7]], [, , , , , , , , , [-1]], [, , "70\\d{5}", , , , "7012345", , , [7]], [, , , , , , , , , [-1]], "TL", 670, "00", , , , , , , , [[
      ,
      "(\\d{3})(\\d{4})",
      "$1 $2",
      ["[2-489]|70"]
    ], [, "(\\d{4})(\\d{4})", "$1 $2", ["7"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TM: [, [, , "[1-6]\\d{7}", , , , , , , [8]], [, , "(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}", , , , "12345678"], [, , "6[1-9]\\d{6}", , , , "66123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TM", 993, "810", "8", , , "8", , , , [
      [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"],
      [, "(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"],
      [, "(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"]
    ], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TN: [
      ,
      [, , "[2-57-9]\\d{7}", , , , , , , [8]],
      [, , "(?:(?:3[0-2]|7\\d)\\d{3}|81200)\\d{3}", , , , "30010123"],
      [, , "(?:(?:[259]\\d|4[0-6])\\d\\d|3(?:001|1(?:[1-35]\\d|40)|240|(?:6[0-4]|91)\\d))\\d{4}", , , , "20123456"],
      [, , "8010\\d{4}", , , , "80101234"],
      [, , "88\\d{6}", , , , "88123456"],
      [, , "8[12]10\\d{4}", , , , "81101234"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "TN",
      216,
      "00",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    TO: [, [, , "(?:(?:080|[56])0|[2-4]\\d|[78]\\d(?:\\d{2})?)\\d{3}", , , , , , , [5, 7]], [, , "(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}", , , , "20123", , , [5]], [, , "(?:7[578]|8[46-9])\\d{5}", , , , "7715123", , , [7]], [, , "0800\\d{3}", , , , "0800222", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TO", 676, "00", , , , , , , , [
      [, "(\\d{2})(\\d{3})", "$1-$2", ["[2-6]|7[014]|8[05]"]],
      [, "(\\d{3})(\\d{4})", "$1 $2", ["7[578]|8"]],
      [, "(\\d{4})(\\d{3})", "$1 $2", ["0"]]
    ], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TR: [
      ,
      [, , "(?:[2-58]\\d\\d|900)\\d{7}|4\\d{6}", , , , , , , [7, 10]],
      [, , "(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}", , , , "2123456789", , , [10]],
      [, , "5(?:(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{2}|6161)\\d{5}", , , , "5012345678", , , [10]],
      [, , "800\\d{7}", , , , "8001234567", , , [10]],
      [, , "(?:8[89]8|900)\\d{7}", , , , "9001234567", , , [10]],
      [, , , , , , , , , [-1]],
      [, , "592(?:21[12]|461)\\d{4}", , , , "5922121234", , , [10]],
      [, , , , , , , , , [-1]],
      "TR",
      90,
      "00",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|4(?:[0-35-9]|4[0-35-9])"], "(0$1)", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[02-69]|1[06])"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["51|[89]"], "0$1", , 1], [, "(444)(\\d{1})(\\d{3})", "$1 $2 $3", ["444"], , , 1]],
      ,
      [, , "512\\d{7}", , , , "5123456789", , , [10]],
      ,
      ,
      [
        ,
        ,
        "444\\d{4}",
        ,
        ,
        ,
        ,
        ,
        ,
        [7]
      ],
      [, , "444\\d{4}|850\\d{7}", , , , "4441444"],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    TT: [, [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "868(?:2(?:01|[23]\\d)|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}", , , , "8682211234", , , , [7]], [, , "868(?:2(?:6[6-9]|[789]\\d)|3(?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}", , , , "8682911234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [
      ,
      ,
      "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
      ,
      ,
      ,
      "5002345678"
    ], [, , , , , , , , , [-1]], "TT", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "868", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "868619\\d{4}", , , , "8686191234", , , , [7]]],
    TV: [, [, , "(?:2|7\\d\\d|90)\\d{4}", , , , , , , [5, 6, 7]], [, , "2[02-9]\\d{3}", , , , "20123", , , [5]], [, , "(?:7[01]\\d|90)\\d{4}", , , , "901234", , , [6, 7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TV", 688, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    TW: [, [
      ,
      ,
      "(?:[24589]|7\\d)\\d{8}|[2-8]\\d{7}|2\\d{6}",
      ,
      ,
      ,
      ,
      ,
      ,
      [7, 8, 9, 10]
    ], [, , "(?:2(?:[235-8]\\d{3}|4\\d{2,3})|3[2-9]\\d{2}|4(?:[239]\\d|[78])\\d{2}|5[2-8]\\d{2}|6[235-79]\\d{2}|7[1-9]\\d{2}|8(?:2(?:3\\d|66)|[7-9]\\d{2}))\\d{4}", , , , "221234567", , , [8, 9]], [, , "9[0-8]\\d{7}", , , , "912345678", , , [9]], [, , "80[0-79]\\d{6}", , , , "800123456", , , [9]], [, , "20(?:2|[013-9]\\d{2})\\d{4}", , , , "203123456", , , [7, 9]], [, , , , , , , , , [-1]], [, , "99\\d{7}", , , , "990123456", , , [9]], [, , "70\\d{8}", , , , "7012345678", , , [10]], "TW", 886, "0(?:0[25679]|19)", "0", "#", , "0", , , , [[
      ,
      "(20)(\\d)(\\d{4})",
      "$1 $2 $3",
      ["202"],
      "0$1"
    ], [, "([258]0)(\\d{3})(\\d{4})", "$1 $2 $3", ["20[013-9]|50[0-46-9]|80[0-79]"], "0$1"], [, "([2-8])(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[25][2-8]|[346]|[78][1-9]"], "0$1"], [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], [, "(70)(\\d{4})(\\d{4})", "$1 $2 $3", ["70"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "50[0-46-9]\\d{6}", , , , "500123456", , , [9]], , , [, , , , , , , , , [-1]]],
    TZ: [
      ,
      [, , "(?:[26-8]\\d|41|90)\\d{7}", , , , , , , [9]],
      [, , "2[2-8]\\d{7}", , , , "222345678"],
      [, , "(?:6[2-9]|7[13-9])\\d{7}", , , , "621234567"],
      [, , "80[08]\\d{6}", , , , "800123456"],
      [, , "90\\d{7}", , , , "900123456"],
      [, , "8(?:40|6[01])\\d{6}", , , , "840123456"],
      [, , , , , , , , , [-1]],
      [, , "41\\d{7}", , , , "412345678"],
      "TZ",
      255,
      "00[056]",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2|41"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , "(?:8(?:[04]0|6[01])|90\\d)\\d{6}"],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    UA: [, [, , "[3-9]\\d{8}", , , , , , , [9], [5, 6, 7]], [
      ,
      ,
      "(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",
      ,
      ,
      ,
      "311234567",
      ,
      ,
      ,
      [5, 6, 7]
    ], [, , "(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}", , , , "391234567"], [, , "800\\d{6}", , , , "800123456"], [, , "900[2-49]\\d{5}", , , , "900212345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "89[1-579]\\d{6}", , , , "891234567"], "UA", 380, "00", "0", , , "0", , "0~0", , [[, "([3-9]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[38]9|4(?:[45][0-5]|87)|5(?:0|[67][37])|6[36-8]|7|9[1-9]", "[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9]"], "0$1"], [, "([3-689]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", [
      "(?:3[1-8]|4[136-8])2|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90",
      "3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90"
    ], "0$1"], [, "([3-6]\\d{3})(\\d{5})", "$1 $2", ["3(?:[1-46-8]|5[013-9])|4(?:[137][013-9]|[45][6-9]|6|8[4-6])|5(?:[1245][013-9]|3|6[0135689]|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])", "3(?:[1-46-8](?:[013-9]|22)|5[013-9])|4(?:[137][013-9]|[45][6-9]|6(?:[013-9]|22)|8[4-6])|5(?:[1245][013-9]|3|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])"], "0$1"]], , [, , , , , , , , , [-1]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    UG: [
      ,
      [, , "(?:(?:[29]0|[347]\\d)\\d|800)\\d{6}", , , , , , , [9], [5, 6, 7]],
      [, , "20(?:[0147]\\d{3}|2(?:40|[5-9]\\d)\\d|3(?:0[0-4]|[2367]\\d)\\d|5[0-4]\\d{2}|6(?:00[0-2]|30[0-4]|[5-9]\\d{2})|8[0-2]\\d{2})\\d{3}|[34]\\d{8}", , , , "312345678", , , , [5, 6, 7]],
      [, , "7(?:[0157-9]\\d{2}|2(?:[03]\\d|60)|30\\d|4[0-4]\\d)\\d{5}", , , , "712345678"],
      [, , "800[123]\\d{5}", , , , "800123456"],
      [, , "90[123]\\d{6}", , , , "901123456"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "UG",
      256,
      "00[057]",
      "0",
      ,
      ,
      "0",
      ,
      ,
      ,
      [[, "(\\d{3})(\\d{6})", "$1 $2", ["20[0-8]|4(?:6[45]|[7-9])|[7-9]", "20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])|[7-9]"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["3|4(?:[1-5]|6[0-36-9])"], "0$1"], [, "(2024)(\\d{5})", "$1 $2", ["202", "2024"], "0$1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    US: [, [, , "[2-9]\\d{9}", , , , , , , [10], [7]], [
      ,
      ,
      "(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",
      ,
      ,
      ,
      "2015550123",
      ,
      ,
      ,
      [7]
    ], [
      ,
      ,
      "(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",
      ,
      ,
      ,
      "2015550123",
      ,
      ,
      ,
      [7]
    ], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "US", 1, "011", "1", , , "1", , , 1, [[, "(\\d{3})(\\d{4})", "$1-$2", , , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", , , , 1]], [[, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3"]], [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , "710[2-9]\\d{6}", , , , "7102123456"], , , [, , , , , , , , , [-1]]],
    UY: [, [
      ,
      ,
      "(?:[249]\\d\\d|80)\\d{5}|9\\d{6}",
      ,
      ,
      ,
      ,
      ,
      ,
      [7, 8]
    ], [, , "2\\d{7}|4[2-7]\\d{6}", , , , "21231234", , , [8], [7]], [, , "9[1-9]\\d{6}", , , , "94231234", , , [8]], [, , "80[05]\\d{4}", , , , "8001234", , , [7]], [, , "90[0-8]\\d{4}", , , , "9001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "UY", 598, "0(?:1[3-9]\\d|0)", "0", " int. ", , "0", , "00", , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[24]"]], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9[1-9]"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]0"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    UZ: [
      ,
      [, , "[679]\\d{8}", , , , , , , [9], [7]],
      [, , "(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}", , , , "669050123", , , , [7]],
      [
        ,
        ,
        "6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}",
        ,
        ,
        ,
        "912345678"
      ],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "UZ",
      998,
      "810",
      "8",
      ,
      ,
      "8",
      ,
      "8~10",
      ,
      [[, "([679]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[679]"], "8 $1"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    VA: [, [, , "0\\d{6}(?:\\d{4})?|3[0-8]\\d{9}|(?:[0138]\\d?|55)\\d{8}|[08]\\d{5}(?:\\d{2})?", , , , , , , [6, 7, 8, 9, 10, 11]], [, , "06698\\d{1,6}", , , , "0669812345"], [, , "33\\d{9}|3[1-9]\\d{8}|3[2-9]\\d{7}", , , , "3123456789", , , [9, 10, 11]], [
      ,
      ,
      "80(?:0\\d{3}|3)\\d{3}",
      ,
      ,
      ,
      "800123456",
      ,
      ,
      [6, 9]
    ], [, , "(?:(?:0878|1(?:44|6[346])\\d)\\d\\d|89(?:2|(?:4[5-9]|(?:5[5-9]|9)\\d\\d)\\d))\\d{3}|89[45][0-4]\\d\\d", , , , "899123456", , , [6, 8, 9, 10]], [, , "84(?:[08]\\d{3}|[17])\\d{3}", , , , "848123456", , , [6, 9]], [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]], [, , "55\\d{8}", , , , "5512345678", , , [10]], "VA", 39, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , "848\\d{6}", , , , , , , [9]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    VC: [, [, , "(?:[58]\\d\\d|784|900)\\d{7}", , , , , , , [10], [7]], [
      ,
      ,
      "784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",
      ,
      ,
      ,
      "7842661234",
      ,
      ,
      ,
      [7]
    ], [, , "784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4]))\\d{4}", , , , "7844301234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VC", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "784", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    VE: [, [, , "(?:(?:[24]\\d|50)\\d|[89]00)\\d{7}", , , , , , , [10], [7]], [
      ,
      ,
      "(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}",
      ,
      ,
      ,
      "2121234567",
      ,
      ,
      ,
      [7]
    ], [, , "4(?:1[24-8]|2[46])\\d{7}", , , , "4121234567"], [, , "800\\d{7}", , , , "8001234567"], [, , "900\\d{7}", , , , "9001234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "VE", 58, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{7})", "$1-$2", , "0$1", "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    VG: [, [, , "(?:284|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "284(?:(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}|496[0-5]\\d{3})", , , , "2842291234", , , , [7]], [
      ,
      ,
      "284(?:(?:3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|99)|54[0-57])\\d{4}|496[6-9]\\d{3})",
      ,
      ,
      ,
      "2843001234",
      ,
      ,
      ,
      [7]
    ], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VG", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "284", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    VI: [, [, , "(?:(?:34|90)0|[58]\\d\\d)\\d{7}", , , , , , , [10], [7]], [
      ,
      ,
      "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",
      ,
      ,
      ,
      "3406421234",
      ,
      ,
      ,
      [7]
    ], [, , "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}", , , , "3406421234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VI", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , "340", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    VN: [, [
      ,
      ,
      "[12]\\d{9}|[135-9]\\d{8}|(?:[16]\\d?|[78])\\d{6}",
      ,
      ,
      ,
      ,
      ,
      ,
      [7, 8, 9, 10]
    ], [, , "2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|8[2-7]|9[0-4679])\\d{7}", , , , "2101234567", , , [10]], [, , "(?:(?:1(?:2\\d|6[2-9]|8[68]|99)|3\\d|7[06-9])\\d|5(?:2[23]|[689]\\d)|8(?:[1-58]\\d|6[5689]|9[689])|9(?:[0-8]\\d|9[013-9]))\\d{6}", , , , "912345678", , , [9, 10]], [, , "1800\\d{4,6}", , , , "1800123456", , , [8, 9, 10]], [, , "1900\\d{4,6}", , , , "1900123456", , , [8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:67|99)2\\d{6}", , , , "992012345", , , [9]], "VN", 84, "00", "0", , , "0", , , , [[
      ,
      "(\\d{3})(\\d{4})",
      "$1 $2",
      ["[17]99"],
      "0$1",
      ,
      1
    ], [, "(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", , 1], [, "(\\d{3})(\\d{4,5})", "$1 $2", ["69"], "0$1", , 1], [, "(\\d{4})(\\d{4,6})", "$1 $2", ["1[89]0"], , , 1], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[69]"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3578]"], "0$1", , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", , 1], [, "(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1", , 1]], , [, , , , , , , , , [-1]], , , [
      ,
      ,
      "(?:[17]99|69\\d\\d?)\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [7, 8]
    ], [, , "(?:[17]99|69\\d\\d?|80\\d)\\d{4}", , , , "1992000", , , [7, 8]], , , [, , , , , , , , , [-1]]],
    VU: [, [, , "(?:(?:[23]|[57]\\d\\d|900)\\d|[48]8)\\d{3}", , , , , , , [5, 7]], [, , "(?:(?:2[02-9]|88)\\d|3(?:[5-7]\\d|8[0-8])|48[4-9])\\d\\d", , , , "22123", , , [5]], [, , "(?:5(?:[0-689]\\d|7[2-5])|7[013-7]\\d)\\d{4}", , , , "5912345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "VU", 678, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[579]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [
      ,
      ,
      "(?:3[03]|900\\d)\\d{3}",
      ,
      ,
      ,
      "30123"
    ], , , [, , , , , , , , , [-1]]],
    WF: [, [, , "(?:[45]0|68|72|8\\d)\\d{4}", , , , , , , [6]], [, , "(?:50|68|72)\\d{4}", , , , "501234"], [, , "(?:50|68|72|8[23])\\d{4}", , , , "501234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "WF", 681, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[4-8]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "[48]0\\d{4}", , , , "401234"]],
    WS: [, [, , "(?:[2-6]|8\\d(?:\\d{4})?)\\d{4}|[78]\\d{6}", , , , , , , [5, 6, 7, 10]], [
      ,
      ,
      "(?:[2-5]\\d|6[1-9])\\d{3}",
      ,
      ,
      ,
      "22123",
      ,
      ,
      [5]
    ], [, , "(?:7[25-7]|8(?:[3-7]|9\\d{3}))\\d{5}", , , , "7212345", , , [7, 10]], [, , "800\\d{3}", , , , "800123", , , [6]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "WS", 685, "0", , , , , , , , [[, "(\\d{5})", "$1", ["[2-6]"]], [, "(\\d{3})(\\d{3,7})", "$1 $2", ["8"]], [, "(\\d{2})(\\d{5})", "$1 $2", ["7"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    XK: [, [, , "(?:[23]\\d{2,3}|4\\d\\d|[89]00)\\d{5}", , , , , , , [8, 9]], [, , "(?:2[89]|39)0\\d{6}|[23][89]\\d{6}", , , , "28012345"], [
      ,
      ,
      "4[3-79]\\d{6}",
      ,
      ,
      ,
      "43201234",
      ,
      ,
      [8]
    ], [, , "800\\d{5}", , , , "80001234", , , [8]], [, , "900\\d{5}", , , , "90001234", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "XK", 383, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    YE: [, [, , "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", , , , , , , [7, 8, 9], [6]], [
      ,
      ,
      "(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}",
      ,
      ,
      ,
      "1234567",
      ,
      ,
      [7, 8],
      [6]
    ], [, , "7[0137]\\d{7}", , , , "712345678", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "YE", 967, "00", "0", , , "0", , , , [[, "([1-7])(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"], [, "(7\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["7[0137]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    YT: [, [, , "(?:(?:26|63)9|80\\d)\\d{6}", , , , , , , [9]], [, , "269(?:0[67]|5[01]|6\\d|[78]0)\\d{4}", , , , "269601234"], [
      ,
      ,
      "639(?:0[0-79]|1[019]|[267]\\d|3[09]|[45]0|9[04-79])\\d{4}",
      ,
      ,
      ,
      "639012345"
    ], [, , "80\\d{7}", , , , "801234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "YT", 262, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    ZA: [, [, , "[1-9]\\d{8}|8\\d{4,7}", , , , , , , [5, 6, 7, 8, 9]], [, , "(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}", , , , "101234567", , , [9]], [, , "(?:6\\d|7[0-46-9]|8[1-5])\\d{7}|8[1-4]\\d{3,6}", , , , "711234567"], [, , "80\\d{7}", , , , "801234567", , , [9]], [, , "(?:86[2-9]|9[0-2]\\d)\\d{6}", , , , "862345678", , , [9]], [
      ,
      ,
      "860\\d{6}",
      ,
      ,
      ,
      "860123456",
      ,
      ,
      [9]
    ], [, , , , , , , , , [-1]], [, , "87\\d{7}", , , , "871234567", , , [9]], "ZA", 27, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1[0-8]|[24-9]|3[1-69]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "861\\d{6}", , , , "861123456", , , [9]], , , [, , , , , , , , , [-1]]],
    ZM: [, [, , "(?:(?:21|9\\d)\\d|800)\\d{6}", , , , , , , [9], [6, 7]], [
      ,
      ,
      "21[1-8]\\d{6}",
      ,
      ,
      ,
      "211234567",
      ,
      ,
      ,
      [6, 7]
    ], [, , "9[4-9]\\d{7}", , , , "955123456"], [, , "800\\d{6}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ZM", 260, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{4})", "$1 $2", , "$1"], [, "([1-8])(\\d{2})(\\d{4})", "$1 $2 $3", ["[1-8]"], "$1"], [, "([29]\\d)(\\d{7})", "$1 $2", ["[29]"], "0$1"], [, "(800)(\\d{3})(\\d{3})", "$1 $2 $3", ["800"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    ZW: [, [
      ,
      ,
      "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{7})|(?:[38]\\d|7)\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [5, 6, 7, 8, 9, 10],
      [3, 4]
    ], [
      ,
      ,
      "(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|37|6[78]|75\\d|98|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|[4-8]|9\\d)|2(?:0\\d{2}|12|292|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|1[2-4]|26|[37]2|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83\\d|2582\\d{2}|65[2-8])\\d{2}|(?:4\\d{6,7}|9[2-9]\\d{4,5})",
      ,
      ,
      ,
      "1312345",
      ,
      ,
      ,
      [3, 4]
    ], [, , "(?:7(?:1\\d|3[2-9]|7[1-9]|8[2-5])|8644)\\d{6}", , , , "712345678", , , [9, 10]], [, , "80(?:[01]\\d|20|8[0-8])\\d{3}", , , , "8001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "86(?:1[12]|30|55|77|8[368])\\d{6}", , , , "8686123456", , , [10]], "ZW", 263, "00", "0", , , "0", , , , [[, "([49])(\\d{3})(\\d{2,4})", "$1 $2 $3", ["4|9[2-9]"], "0$1"], [, "(7\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], [, "(86\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["86[24]"], "0$1"], [
      ,
      "([2356]\\d{2})(\\d{3,5})",
      "$1 $2",
      ["2(?:0[45]|2[278]|[49]8|[78])|3(?:[09]8|17|3[78]|7[1569]|8[37])|5[15][78]|6(?:[29]8|37|[68][78]|75)"],
      "0$1"
    ], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329"], "0$1"], [, "([1-356]\\d)(\\d{3,5})", "$1 $2", ["1[3-9]|2[02569]|3[0-69]|5[05689]|6"], "0$1"], [, "([235]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[23]9|54"], "0$1"], [, "([25]\\d{3})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258[23]|5483"], "0$1"], [, "(8\\d{3})(\\d{6})", "$1 $2", ["86"], "0$1"], [
      ,
      "(80\\d)(\\d{4})",
      "$1 $2",
      ["80"],
      "0$1"
    ]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    800: [, [, , "\\d{8}", , , , , , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "\\d{8}", , , , "12345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 800, , , , , , , , 1, [[, "(\\d{4})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    808: [
      ,
      [, , "\\d{8}", , , , , , , [8]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "\\d{8}", , , , "12345678"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "001",
      808,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      1,
      [[, "(\\d{4})(\\d{4})", "$1 $2"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    870: [, [, , "[35-7]\\d{8}", , , , , , , [9]], [, , , , , , , , , [-1]], [, , "(?:[356]\\d|7[6-8])\\d{7}", , , , "301234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 870, , , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    878: [
      ,
      [, , "10\\d{10}", , , , , , , [12]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , "10\\d{10}", , , , "101234567890"],
      "001",
      878,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      1,
      [[, "(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    881: [, [, , "[67]\\d{8}", , , , , , , [9]], [, , , , , , , , , [-1]], [, , "[67]\\d{8}", , , , "612345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 881, , , , , , , , , [[, "(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[67]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , , [, , , , , , , , , [-1]]],
    882: [, [, , "[13]\\d{6}(?:\\d{2,5})?|1\\d{7}", , , , , , , [7, 8, 9, 10, 11, 12]], [, , , , , , , , , [-1]], [, , "3(?:(?:2\\d|37)\\d\\d|4(?:2|7\\d{3}))\\d{4}", , , , "3421234", , , [7, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])|6\\d{1,6})|3(?:45|9\\d{3})\\d{3})\\d{4}", , , , "390123456789"], "001", 882, , , , , , , , , [
      [, "(\\d{2})(\\d{5})", "$1 $2", ["16|342"]],
      [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1"]],
      [, "(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]],
      [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"]],
      [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]],
      [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]],
      [, "(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[13]"]]
    ], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "348[57]\\d{7}", , , , "34851234567", , , [11]]],
    883: [, [, , "51\\d{7}(?:\\d{3})?", , , , , , , [9, 12]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [
      ,
      ,
      "51[013]0\\d{8}|5100\\d{5}",
      ,
      ,
      ,
      "510012345"
    ], "001", 883, , , , , , , , 1, [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["510"]], [, "(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["5"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
    888: [
      ,
      [, , "\\d{11}", , , , , , , [11]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      "001",
      888,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      1,
      [[, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]],
      ,
      [, , , , , , , , , [-1]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "\\d{11}", , , , "12345678901"],
      ,
      ,
      [, , , , , , , , , [-1]]
    ],
    979: [, [, , "\\d{9}", , , , , , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "\\d{9}", , , , "123456789"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 979, , , , , , , , 1, [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]]
  };
  function F() {
    this.g = {};
  }
  $(F);
  var o1 = { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", "０": "0", "１": "1", "２": "2", "３": "3", "４": "4", "５": "5", "６": "6", "７": "7", "８": "8", "９": "9", "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9" }, y0 = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "*": "*",
    "#": "#"
  }, G2 = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "０": "0",
    "１": "1",
    "２": "2",
    "３": "3",
    "４": "4",
    "５": "5",
    "６": "6",
    "７": "7",
    "８": "8",
    "９": "9",
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    A: "2",
    B: "2",
    C: "2",
    D: "3",
    E: "3",
    F: "3",
    G: "4",
    H: "4",
    I: "4",
    J: "5",
    K: "5",
    L: "5",
    M: "6",
    N: "6",
    O: "6",
    P: "7",
    Q: "7",
    R: "7",
    S: "7",
    T: "8",
    U: "8",
    V: "8",
    W: "9",
    X: "9",
    Y: "9",
    Z: "9"
  }, B2 = /[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?/, x2 = RegExp("[+＋]+"), u1 = RegExp("^[+＋]+"), v0 = RegExp("([0-9０-９٠-٩۰-۹])"), O2 = RegExp("[+＋0-9０-９٠-٩۰-۹]"), k2 = /[\\\/] *x/, F2 = RegExp("[^0-9０-９٠-٩۰-۹A-Za-z#]+$"), K2 = /(?:.*?[A-Za-z]){3}.*/, I0 = RegExp(
    "(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \\t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|[;,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\\.．]?[  \\t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)$",
    "i"
  ), U2 = RegExp(
    "^[0-9０-９٠-٩۰-۹]{2}$|^[+＋]*(?:[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～*]*[0-9０-９٠-٩۰-۹]){3,}[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～*A-Za-z0-9０-９٠-٩۰-۹]*(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \\t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|[;,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\\.．]?[  \\t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)?$",
    "i"
  ), S0 = /(\$\d)/, V2 = /\$NP/, H2 = /\$FG/, W2 = /\$CC/, j2 = /^\(?\$1\)?$/;
  function _0(d) {
    return 2 > d.length ? !1 : W(U2, d);
  }
  function N0(d) {
    return W(K2, d) ? $1(d, G2) : $1(d, o1);
  }
  function A0(d) {
    var t = N0(d.toString());
    x(d), d.g(t);
  }
  function w0(d) {
    return d != null && (j(d, 9) != 1 || L(d, 9)[0] != -1);
  }
  function $1(d, t) {
    for (var e = new E(), n, r = d.length, s = 0; s < r; ++s) n = d.charAt(s), n = t[n.toUpperCase()], n != null && e.g(n);
    return e.toString();
  }
  function l1(d) {
    return d != null && isNaN(d) && d.toUpperCase() in m0;
  }
  F.prototype.format = function(d, t) {
    if (f(d, 2) == 0 && T(d, 5)) {
      var e = C(d, 5);
      if (0 < e.length) return e;
    }
    e = C(d, 1);
    var n = Y(d);
    if (t == 0) return a1(e, 0, n, "");
    if (!(e in Z)) return n;
    var r = J(this, e, z(e));
    return d = _1(d, r, t), n = U1(n, r, t), a1(e, t, n, d);
  };
  function J(d, t, e) {
    return e == "001" ? H(d, "" + t) : H(d, e);
  }
  function K1(d, t, e) {
    if (!l1(e)) return d.format(t, 1);
    var n = C(t, 1), r = Y(t);
    if (!(n in Z)) return r;
    if (n == 1) {
      if (e != null && p(Z[1], e.toUpperCase())) return n + " " + d.format(t, 2);
    } else if (n == Z1(d, e)) return d.format(t, 2);
    var s = H(d, e), l = C(s, 11);
    return e = "", W(B2, l) ? e = l : T(s, 17) && (e = C(s, 17)), d = J(d, n, z(n)), r = U1(r, d, 1), t = _1(t, d, 1), 0 < e.length ? e + " " + n + " " + r + t : a1(n, 1, r, t);
  }
  function Y(d) {
    if (!T(d, 2)) return "";
    var t = "" + f(d, 2);
    return T(d, 4) && f(d, 4) && 0 < C(d, 8) ? Array(C(d, 8) + 1).join("0") + t : t;
  }
  function a1(d, t, e, n) {
    switch (t) {
      case 0:
        return "+" + d + e + n;
      case 1:
        return "+" + d + " " + e + n;
      case 3:
        return "tel:+" + d + "-" + e + n;
      default:
        return e + n;
    }
  }
  function U1(d, t, e, n) {
    return t = L(t, 20).length == 0 || e == 2 ? L(t, 19) : L(t, 20), t = S1(t, d), t == null ? d : L0(d, t, e, n);
  }
  function S1(d, t) {
    for (var e, n = d.length, r = 0; r < n; ++r) {
      e = d[r];
      var s = j(e, 3);
      if ((s == 0 || t.search(f(e, 3, s - 1)) == 0) && (s = new RegExp(f(e, 1)), W(s, t))) return e;
    }
    return null;
  }
  function L0(d, t, e, n) {
    var r = C(t, 2), s = new RegExp(f(t, 1)), l = C(t, 5);
    return e == 2 && n != null && 0 < n.length && 0 < l.length ? (t = l.replace(W2, n), r = r.replace(S0, t), d = d.replace(s, r)) : (t = C(t, 4), d = e == 2 && t != null && 0 < t.length ? d.replace(s, r.replace(S0, t)) : d.replace(s, r)), e == 3 && (d = d.replace(RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]+"), ""), d = d.replace(RegExp(
      "[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]+",
      "g"
    ), "-")), d;
  }
  function _1(d, t, e) {
    return T(d, 3) && f(d, 3).length != 0 ? e == 3 ? ";ext=" + f(d, 3) : T(t, 13) ? f(t, 13) + C(d, 3) : " ext. " + C(d, 3) : "";
  }
  function N1(d, t) {
    switch (t) {
      case 4:
        return f(d, 5);
      case 3:
        return f(d, 4);
      case 1:
        return f(d, 3);
      case 0:
      case 2:
        return f(d, 2);
      case 5:
        return f(d, 6);
      case 6:
        return f(d, 8);
      case 7:
        return f(d, 7);
      case 8:
        return f(d, 21);
      case 9:
        return f(d, 25);
      case 10:
        return f(d, 28);
      default:
        return f(d, 1);
    }
  }
  function V1(d, t) {
    var e = j1(d, t);
    return d = J(d, C(t, 1), e), d == null ? -1 : (t = Y(t), H1(t, d));
  }
  function H1(d, t) {
    return K(d, f(t, 1)) ? K(d, f(t, 5)) ? 4 : K(d, f(t, 4)) ? 3 : K(d, f(t, 6)) ? 5 : K(d, f(t, 8)) ? 6 : K(d, f(t, 7)) ? 7 : K(d, f(t, 21)) ? 8 : K(d, f(t, 25)) ? 9 : K(d, f(t, 28)) ? 10 : K(d, f(t, 2)) ? f(t, 18) || K(d, f(t, 3)) ? 2 : 0 : !f(t, 18) && K(d, f(t, 3)) ? 1 : -1 : -1;
  }
  function H(d, t) {
    if (t == null) return null;
    t = t.toUpperCase();
    var e = d.g[t];
    if (e == null) {
      if (e = m0[t], e == null) return null;
      e = new Q().j(q.m(), e), d.g[t] = e;
    }
    return e;
  }
  function K(d, t) {
    var e = d.length;
    return 0 < j(t, 9) && g(L(t, 9), e) == -1 ? !1 : W(C(t, 2), d);
  }
  function W1(d, t) {
    var e = j1(d, t);
    return T0(d, t, e);
  }
  function T0(d, t, e) {
    var n = C(t, 1), r = J(d, n, e);
    return r == null || e != "001" && n != Z1(d, e) ? !1 : (d = Y(t), H1(d, r) != -1);
  }
  function j1(d, t) {
    if (t == null) return null;
    var e = C(t, 1);
    if (e = Z[e], e == null) d = null;
    else if (e.length == 1) d = e[0];
    else d: {
      t = Y(t);
      for (var n, r = e.length, s = 0; s < r; s++) {
        n = e[s];
        var l = H(d, n);
        if (T(l, 23)) {
          if (t.search(f(l, 23)) == 0) {
            d = n;
            break d;
          }
        } else if (H1(t, l) != -1) {
          d = n;
          break d;
        }
      }
      d = null;
    }
    return d;
  }
  function z(d) {
    return d = Z[d], d == null ? "ZZ" : d[0];
  }
  function Z1(d, t) {
    if (d = H(d, t), d == null) throw Error("Invalid region code: " + t);
    return C(d, 10);
  }
  function E0(d, t) {
    return d = h1(d, t, -1), d == 0 || d == 4;
  }
  function A1(d, t, e, n) {
    var r = N1(e, n), s = j(r, 9) == 0 ? L(f(e, 1), 9) : L(r, 9);
    if (r = L(r, 10), n == 2) if (w0(N1(e, 0))) d = N1(e, 1), w0(d) && (s = s.concat(j(d, 9) == 0 ? L(f(e, 1), 9) : L(d, 9)), s.sort(_), r.length == 0 ? r = L(d, 10) : (r = r.concat(L(d, 10)), r.sort(_)));
    else return A1(d, t, e, 1);
    return s[0] == -1 ? 5 : (t = t.length, -1 < g(r, t) ? 4 : (e = s[0], e == t ? 0 : e > t ? 2 : s[s.length - 1] < t ? 3 : -1 < g(s, t, 1) ? 0 : 5));
  }
  function h1(d, t, e) {
    var n = Y(t);
    return t = C(t, 1), t in Z ? (t = J(d, t, z(t)), A1(d, n, t, e)) : 1;
  }
  function M0(d, t) {
    if (d = d.toString(), d.length == 0 || d.charAt(0) == "0") return 0;
    for (var e, n = d.length, r = 1; 3 >= r && r <= n; ++r) if (e = parseInt(d.substring(0, r), 10), e in Z) return t.g(d.substring(r)), e;
    return 0;
  }
  function b0(d, t, e, n, r, s) {
    if (t.length == 0) return 0;
    t = new E(t);
    var l;
    e != null && (l = f(e, 11)), l == null && (l = "NonMatch");
    var h = t.toString();
    if (h.length == 0) l = 20;
    else if (u1.test(h)) h = h.replace(u1, ""), x(t), t.g(N0(h)), l = 1;
    else {
      if (h = new RegExp(l), A0(t), l = t.toString(), l.search(h) == 0) {
        h = l.match(h)[0].length;
        var y = l.substring(h).match(v0);
        y && y[1] != null && 0 < y[1].length && $1(y[1], o1) == "0" ? l = !1 : (x(t), t.g(l.substring(h)), l = !0);
      } else l = !1;
      l = l ? 5 : 20;
    }
    if (r && M(s, 6, l), l != 20) {
      if (2 >= t.h.length) throw Error("Phone number too short after IDD");
      if (d = M0(t, n), d != 0) return M(s, 1, d), d;
      throw Error("Invalid country calling code");
    }
    return e != null && (l = C(e, 10), h = "" + l, y = t.toString(), y.lastIndexOf(h, 0) == 0 && (h = new E(y.substring(h.length)), y = f(e, 1), y = new RegExp(C(y, 2)), D0(h, e, null), h = h.toString(), !W(y, t.toString()) && W(y, h) || A1(d, t.toString(), e, -1) == 3)) ? (n.g(h), r && M(s, 6, 10), M(s, 1, l), l) : (M(s, 1, 0), 0);
  }
  function D0(d, t, e) {
    var n = d.toString(), r = n.length, s = f(t, 15);
    if (r != 0 && s != null && s.length != 0) {
      var l = new RegExp("^(?:" + s + ")");
      if (r = l.exec(n)) {
        s = new RegExp(C(f(t, 1), 2));
        var h = W(s, n), y = r.length - 1;
        t = f(t, 16), t == null || t.length == 0 || r[y] == null || r[y].length == 0 ? (!h || W(s, n.substring(r[0].length))) && (e != null && 0 < y && r[y] != null && e.g(r[1]), d.set(n.substring(r[0].length))) : (n = n.replace(l, t), (!h || W(s, n)) && (e != null && 0 < y && e.g(r[1]), d.set(n)));
      }
    }
  }
  function t1(d, t, e) {
    if (!l1(e) && 0 < t.length && t.charAt(0) != "+") throw Error("Invalid country calling code");
    return Y1(d, t, e, !0);
  }
  function Y1(d, t, e, n) {
    if (t == null) throw Error("The string supplied did not seem to be a phone number");
    if (250 < t.length) throw Error("The string supplied is too long to be a phone number");
    var r = new E(), s = t.indexOf(";phone-context=");
    if (0 <= s) {
      var l = s + 15;
      if (t.charAt(l) == "+") {
        var h = t.indexOf(";", l);
        0 < h ? r.g(t.substring(l, h)) : r.g(t.substring(l));
      }
      l = t.indexOf("tel:"), r.g(t.substring(0 <= l ? l + 4 : 0, s));
    } else s = r.g, l = t.search(O2), 0 <= l ? (l = t.substring(l), l = l.replace(F2, ""), h = l.search(k2), 0 <= h && (l = l.substring(0, h))) : l = "", s.call(r, l);
    if (s = r.toString(), l = s.indexOf(";isub="), 0 < l && (x(r), r.g(s.substring(0, l))), !_0(r.toString())) throw Error("The string supplied did not seem to be a phone number");
    if (s = r.toString(), !(l1(e) || s != null && 0 < s.length && u1.test(s))) throw Error("Invalid country calling code");
    s = new d1(), n && M(s, 5, t);
    d: {
      if (t = r.toString(), l = t.search(I0), 0 <= l && _0(t.substring(0, l))) {
        h = t.match(I0);
        for (var y = h.length, P = 1; P < y; ++P) if (h[P] != null && 0 < h[P].length) {
          x(r), r.g(t.substring(0, l)), t = h[P];
          break d;
        }
      }
      t = "";
    }
    0 < t.length && M(
      s,
      3,
      t
    ), l = H(d, e), t = new E(), h = 0, y = r.toString();
    try {
      h = b0(d, y, l, t, n, s);
    } catch (U) {
      if (U.message == "Invalid country calling code" && u1.test(y)) {
        if (y = y.replace(u1, ""), h = b0(d, y, l, t, n, s), h == 0) throw U;
      } else throw U;
    }
    if (h != 0 ? (r = z(h), r != e && (l = J(d, h, r))) : (A0(r), t.g(r.toString()), e != null ? (h = C(l, 10), M(s, 1, h)) : n && F1(s, 6)), 2 > t.h.length || (l != null && (e = new E(), r = new E(t.toString()), D0(r, l, e), d = A1(d, r.toString(), l, -1), d != 2 && d != 4 && d != 5 && (t = r, n && 0 < e.toString().length && M(s, 7, e.toString()))), n = t.toString(), d = n.length, 2 > d)) throw Error("The string supplied is too short to be a phone number");
    if (17 < d) throw Error("The string supplied is too long to be a phone number");
    if (1 < n.length && n.charAt(0) == "0") {
      for (M(s, 4, !0), d = 1; d < n.length - 1 && n.charAt(d) == "0"; ) d++;
      d != 1 && M(s, 8, d);
    }
    return M(s, 2, parseInt(n, 10)), s;
  }
  function W(d, t) {
    return !!((d = typeof d == "string" ? t.match("^(?:" + d + ")$") : t.match(d)) && d[0].length == t.length);
  }
  function P0(d) {
    this.ga = RegExp(" "), this.ma = "", this.$ = new E(), this.ea = "", this.o = new E(), this.da = new E(), this.s = !0, this.fa = this.ba = this.oa = !1, this.ha = F.v(), this.ca = 0, this.h = new E(), this.ia = !1, this.u = "", this.g = new E(), this.j = [], this.na = d, this.l = B0(this, this.na);
  }
  var R0 = new q();
  M(R0, 11, "NA");
  var Z2 = /\[([^\[\]])*\]/g, Y2 = /\d(?=[^,}][^,}])/g, z2 = RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*(\\$\\d[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*)+$"), G0 = /[- ]/;
  function B0(d, t) {
    var e = d.ha;
    return t = l1(t) ? Z1(e, t) : 0, d = H(d.ha, z(t)), d ?? R0;
  }
  function x0(d) {
    for (var t = d.j.length, e = 0; e < t; ++e) {
      var n = d.j[e], r = C(n, 1);
      if (d.ea == r) return !1;
      var s = d, l = n, h = C(l, 1);
      if (h.indexOf("|") != -1) s = !1;
      else {
        h = h.replace(Z2, "\\d"), h = h.replace(Y2, "\\d"), x(s.$);
        var y = s;
        l = C(l, 2);
        var P = "999999999999999".match(h)[0];
        P.length < y.g.h.length ? y = "" : (y = P.replace(new RegExp(h, "g"), l), y = y.replace(RegExp("9", "g"), " ")), 0 < y.length ? (s.$.g(y), s = !0) : s = !1;
      }
      if (s) return d.ea = r, d.ia = G0.test(f(n, 4)), d.ca = 0, !0;
    }
    return d.s = !1;
  }
  function O0(d, t) {
    for (var e = [], n = t.length - 3, r = d.j.length, s = 0; s < r; ++s) {
      var l = d.j[s];
      j(l, 3) == 0 ? e.push(d.j[s]) : (l = f(l, 3, Math.min(n, j(l, 3) - 1)), t.search(l) == 0 && e.push(d.j[s]));
    }
    d.j = e;
  }
  function k0(d, t) {
    return d.ma = J2(d, t), d.ma;
  }
  function J2(d, t) {
    d.o.g(t);
    var e = t;
    if (v0.test(e) || d.o.h.length == 1 && x2.test(e) ? (t == "+" ? (e = t, d.da.g(t)) : (e = o1[t], d.da.g(e), d.g.g(e)), t = e) : (d.s = !1, d.oa = !0), !d.s) {
      if (!d.oa) {
        if (H0(d)) {
          if (W0(d)) return F0(d);
        } else if (0 < d.u.length && (t = d.g.toString(), x(d.g), d.g.g(d.u), d.g.g(t), t = d.h.toString(), e = t.lastIndexOf(d.u), x(d.h), d.h.g(t.substring(0, e))), d.u != V0(d)) return d.h.g(" "), F0(d);
      }
      return d.o.toString();
    }
    switch (d.da.h.length) {
      case 0:
      case 1:
      case 2:
        return d.o.toString();
      case 3:
        if (H0(d)) d.fa = !0;
        else return d.u = V0(d), z1(d);
      default:
        return d.fa ? (W0(d) && (d.fa = !1), d.h.toString() + d.g.toString()) : 0 < d.j.length ? (t = j0(d, t), e = K0(d), 0 < e.length ? e : (O0(d, d.g.toString()), x0(d) ? U0(d) : d.s ? w1(d, t) : d.o.toString())) : z1(d);
    }
  }
  function F0(d) {
    return d.s = !0, d.fa = !1, d.j = [], d.ca = 0, x(d.$), d.ea = "", z1(d);
  }
  function K0(d) {
    for (var t = d.g.toString(), e = d.j.length, n = 0; n < e; ++n) {
      var r = d.j[n], s = C(r, 1);
      if (new RegExp("^(?:" + s + ")$").test(t)) return d.ia = G0.test(f(r, 4)), t = t.replace(new RegExp(s, "g"), f(r, 2)), w1(d, t);
    }
    return "";
  }
  function w1(d, t) {
    var e = d.h.h.length;
    return d.ia && 0 < e && d.h.toString().charAt(e - 1) != " " ? d.h + " " + t : d.h + t;
  }
  function z1(d) {
    var t = d.g.toString();
    if (3 <= t.length) {
      for (var e = d.ba && 0 < j(d.l, 20) ? L(d.l, 20) : L(d.l, 19), n = e.length, r = 0; r < n; ++r) {
        var s = e[r], l;
        (l = !T(d.l, 12) || d.ba || f(s, 6)) || (l = C(s, 4), l = l.length == 0 || j2.test(l)), l && z2.test(C(s, 2)) && d.j.push(s);
      }
      return O0(d, t), t = K0(d), 0 < t.length ? t : x0(d) ? U0(d) : d.o.toString();
    }
    return w1(d, t);
  }
  function U0(d) {
    var t = d.g.toString(), e = t.length;
    if (0 < e) {
      for (var n = "", r = 0; r < e; r++) n = j0(d, t.charAt(r));
      return d.s ? w1(d, n) : d.o.toString();
    }
    return d.h.toString();
  }
  function V0(d) {
    var t = d.g.toString(), e = 0;
    if (f(d.l, 10) != 1) var n = !1;
    else n = d.g.toString(), n = n.charAt(0) == "1" && n.charAt(1) != "0" && n.charAt(1) != "1";
    return n ? (e = 1, d.h.g("1").g(" "), d.ba = !0) : T(d.l, 15) && (n = new RegExp("^(?:" + f(d.l, 15) + ")"), n = t.match(n), n != null && n[0] != null && 0 < n[0].length && (d.ba = !0, e = n[0].length, d.h.g(t.substring(0, e)))), x(d.g), d.g.g(t.substring(e)), t.substring(0, e);
  }
  function H0(d) {
    var t = d.da.toString(), e = new RegExp("^(?:\\+|" + f(d.l, 11) + ")");
    return e = t.match(e), e != null && e[0] != null && 0 < e[0].length ? (d.ba = !0, e = e[0].length, x(d.g), d.g.g(t.substring(e)), x(d.h), d.h.g(t.substring(0, e)), t.charAt(0) != "+" && d.h.g(" "), !0) : !1;
  }
  function W0(d) {
    if (d.g.h.length == 0) return !1;
    var t = new E(), e = M0(d.g, t);
    return e == 0 ? !1 : (x(d.g), d.g.g(t.toString()), t = z(e), t == "001" ? d.l = H(d.ha, "" + e) : t != d.na && (d.l = B0(d, t)), d.h.g("" + e).g(" "), d.u = "", !0);
  }
  function j0(d, t) {
    var e = d.$.toString();
    if (0 <= e.substring(d.ca).search(d.ga)) {
      var n = e.search(d.ga);
      return t = e.replace(d.ga, t), x(d.$), d.$.g(t), d.ca = n, t.substring(0, d.ca + 1);
    }
    return d.j.length == 1 && (d.s = !1), d.ea = "", d.o.toString();
  }
  var X2 = {
    AC: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AC", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    AD: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "11[0268]", , , , "110"], [, , , , , , , , , [-1]], , , , "AD", , , , , , , , , , , , , , , , , , [, , "11[0268]", , , , "110"], , [, , "11[0268]", , , , "110"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    AE: [, [, , "[149]\\d{2,3}", , , , , , , [3, 4]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AE", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "112|99[789]",
      ,
      ,
      ,
      "112",
      ,
      ,
      [3]
    ], , [, , "112|445[16]|99[789]", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "445[16]", , , , "4451", , , [4]]],
    AF: [, [, , "[14]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AF", , , , , , , , , , , , , , , , , , [, , "1(?:02|19)", , , , "119", , , [3]], , [, , "1(?:02|19)|40404", , , , "119"], [, , , , , , , , , [-1]], [, , "40404", , , , "40404", , , [5]], , [, , "40404", , , , "40404", , , [5]]],
    AG: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AG", , , , , , , , , , , , , , , , , , [, , "9(?:11|99)", , , , "911"], , [, , "176|9(?:11|99)", , , , "911"], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , "176", , , , "176"], , [, , "176", , , , "176"]],
    AI: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AI", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , "176", , , , "176"], , [, , "176", , , , "176"]],
    AL: [, [, , "[15]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "1(?:3[15]|41|16\\d{3})", , , , "116000", , , [3, 6]], [, , "5\\d{4}", , , , "50123", , , [5]], , , , "AL", , , , , , , , , , , , , , , , , , [, , "1(?:12|2[7-9])", , , , "129", , , [3]], , [
      ,
      ,
      "1(?:1(?:\\d|6(?:000|1(?:06|11|23))|8\\d{2})|2[2-9]|[349]\\d|65\\d|89[12])|5\\d{4}",
      ,
      ,
      ,
      "129"
    ], [, , , , , , , , , [-1]], [, , "123", , , , "123", , , [3]], , [, , "131|5\\d{4}", , , , "51234", , , [3, 5]]],
    AM: [, [, , "[148]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AM", , , , , , , , , , , , , , , , , , [, , "10[123]", , , , "102", , , [3]], , [, , "1\\d{2}|40404|8[1-7]\\d{2}", , , , "8711"], [, , , , , , , , , [-1]], [, , "40404", , , , "40404", , , [5]], , [, , "40404", , , , "40404", , , [5]]],
    AO: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "AO",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[235]", , , , "113"],
      ,
      [, , "11[235]", , , , "113"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    AR: [, [, , "[01389]\\d{1,4}", , , , , , , [2, 3, 4, 5]], , , [, , "[09]\\d{2}|1(?:[02-9]\\d?|1[0-24-9]?)", , , , "111", , , [2, 3]], [, , , , , , , , , [-1]], , , , "AR", , , , , , , , , , , , , , , , , , [, , "10[017]|911", , , , "101", , , [3]], , [, , "000|1(?:0[0-35-7]|1[02-5]|2[15]|9)|3372|89338|911", , , , "121"], [, , , , , , , , , [-1]], [, , "89338", , , , "89338", , , [5]], , [, , "3372|89338", , , , "3372", , , [4, 5]]],
    AS: [
      ,
      [, , "[49]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "AS",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "911", , , , "911", , , [3]],
      ,
      [, , "40404|911", , , , "911"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , "40404", , , , "40404", , , [5]]
    ],
    AT: [, [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]], , , [, , "116(?:00[06]|1(?:17|23))", , , , "116000", , , [6]], [, , , , , , , , , [-1]], , , , "AT", , , , , , , , , , , , , , , , , , [, , "1(?:[12]2|33|44)", , , , "112", , , [3]], , [, , "1(?:1(?:2|6(?:00[06]|1(?:17|23)))|22|33|44)", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    AU: [
      ,
      [, , "[0-27]\\d{2,7}", , , , , , , [3, 4, 5, 6, 7, 8]],
      ,
      ,
      [, , "1(?:258885|555)|733", , , , "733", , , [3, 4, 7]],
      [, , "1(?:2(?:34|456)|9\\d{4})", , , , "191123", , , [4, 5, 6]],
      ,
      ,
      ,
      "AU",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "000|1(?:06|12)", , , , "112", , , [3]],
      ,
      [, , "000|1(?:06|1(?:00|2|9[46])|2(?:[23]\\d|4\\d{2,3}|5\\d{3,4}|8(?:2|[013-9]\\d))|555|9\\d{4,6})|225|7(?:33|67)", , , , "112"],
      [, , "1(?:1\\d{2}|24733)|225|767", , , , "225", , , [3, 4, 6]],
      [, , "1(?:258885|555)", , , , "1555", , , [4, 7]],
      ,
      [, , "19\\d{4,6}", , , , "191123", , , [6, 7, 8]]
    ],
    AW: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , "100|911", , , , "100"], [, , , , , , , , , [-1]], , , , "AW", , , , , , , , , , , , , , , , , , [, , "100|911", , , , "100"], , [, , "1(?:00|76)|911", , , , "100"], [, , , , , , , , , [-1]], [, , "176", , , , "176"], , [
      ,
      ,
      "176",
      ,
      ,
      ,
      "176"
    ]],
    AX: [, [, , "[17]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AX", , , , , , , , , , , , , , , , , , [, , "112", , , , "112", , , [3]], , [, , "112|75[12]\\d{2}", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    AZ: [, [, , "[148]\\d{2,3}", , , , , , , [3, 4]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "AZ", , , , , , , , , , , , , , , , , , [, , "1(?:0[123]|12)", , , , "101", , , [3]], , [, , "1(?:0[123]|12)|4040|8800", , , , "101"], [, , , , , , , , , [-1]], [, , "4040|8800", , , , "4040", , , [4]], , [, , "4040|8800", , , , "4040", , , [4]]],
    BA: [, [
      ,
      ,
      "1\\d{2,5}",
      ,
      ,
      ,
      ,
      ,
      ,
      [3, 4, 5, 6]
    ], , , [, , "116\\d{3}", , , , "116000", , , [6]], [, , , , , , , , , [-1]], , , , "BA", , , , , , , , , , , , , , , , , , [, , "12[2-4]", , , , "122", , , [3]], , [, , "1(?:1(?:6(?:00[06]|1(?:1[17]|23))|8\\d{1,2})|2(?:0[0-7]|[2-5]|6[0-26]|[78]\\d{1,2})|[3-5]\\d{2}|7\\d{3})", , , , "122"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    BB: [, [, , "[2-689]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "BB", , , , , , , , , , , , , , , , , , [, , "[2359]11", , , , "211"], , [, , "[2-689]11", , , , "211"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    BD: [, [
      ,
      ,
      "[1579]\\d{2,4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [3, 4, 5]
    ], , , [, , "106", , , , "106", , , [3]], [, , , , , , , , , [-1]], , , , "BD", , , , , , , , , , , , , , , , , , [, , "1(?:0[0-2]|99)|999", , , , "999", , , [3]], , [, , "1(?:0(?:[0-39]|5(?:0\\d|[1-4])|6(\\d{2})?|7[0-4]|8[0-29])|1[16-9]|2(?:[134]|2[0-5])|3(?:1\\d?|3\\d|6[3-6])|4(?:0\\d|1\\d{2})|5[2-9]|99)|786|5012|9(?:594|99)", , , , "103"], [, , , , , , , , , [-1]], [, , "1(?:11|2[13])|786|5012|9594", , , , "9594", , , [3, 4]], , [, , "9594", , , , "9594", , , [4]]],
    BE: [, [, , "[1-9]\\d\\d(?:\\d(?:\\d{2})?)?", , , , , , , [3, 4, 6]], , , [
      ,
      ,
      "1(?:0[0-25-8]|1(?:[02]|6\\d{3})|7(?:12|77)|813)|8\\d{3}",
      ,
      ,
      ,
      "100"
    ], [, , "1(?:2(?:[03]4|1\\d)|3[01]\\d|4(?:04|1\\d))|[2-79]\\d{3}", , , , "1204", , , [4]], , , , "BE", , , , , , , , , , , , , , , , , , [, , "1(?:0[01]|12)", , , , "100", , , [3]], , [, , "1(?:0[0-8]|1(?:[027]|6(?:000|117))|2(?:0[47]|12|3[0-24]|99)|3(?:0[47]|13|99)|4(?:0[47]|14|50|99)|5(?:1[05]|5[15]|66|95)|6(?:1[167]|36|6[16])|7(?:0[07]|1[27-9]|22|33|65|7[017]|89)|81[39])|[2-9]\\d{3}", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "[2-9]\\d{3}", , , , "2000", , , [4]]],
    BF: [
      ,
      [, , "1\\d", , , , , , , [2]],
      ,
      ,
      [, , "1[78]", , , , "17"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "BF",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1[78]", , , , "17"],
      ,
      [, , "1[78]", , , , "17"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    BG: [, [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]], , , [, , "116(?:000|111)", , , , "116000", , , [6]], [, , , , , , , , , [-1]], , , , "BG", , , , , , , , , , , , , , , , , , [, , "1(?:12|50|6[06])", , , , "112", , , [3]], , [, , "1(?:1(?:2|6(?:000|111))|50|6[06])", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    BH: [
      ,
      [, , "[0189]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]],
      ,
      ,
      [, , "(?:0[167]|81)\\d{3}|[19]99", , , , "199"],
      [, , "9[148]\\d{3}", , , , "91000", , , [5]],
      ,
      ,
      ,
      "BH",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "[19]99", , , , "199", , , [3]],
      ,
      [, , "(?:0[167]|8[158])\\d{3}|1(?:[02]\\d|12|4[01]|51|8[18]|9[169])|9(?:[148]\\d{3}|9[02489])", , , , "100"],
      [, , , , , , , , , [-1]],
      [, , "(?:0[67]\\d|880|985)\\d\\d", , , , "06000", , , [5]],
      ,
      [, , "(?:880|985)\\d\\d", , , , "88000", , , [5]]
    ],
    BI: [, [, , "[16-9]\\d{2,3}", , , , , , , [3, 4]], , , [, , "11[237]|611", , , , "112", , , [3]], [, , , , , , , , , [-1]], , , , "BI", , , , , , , , , , , , , , , , , , [, , "11[237]", , , , "112", , , [3]], , [, , "1(?:1\\d|5[2-9]|6[0-256])|611|7(?:10|77|979)|8[28]8|900", , , , "110"], [, , , , , , , , , [-1]], [
      ,
      ,
      "611|7(?:10|77)|888|900",
      ,
      ,
      ,
      "611",
      ,
      ,
      [3]
    ], , [, , "(?:71|90)0", , , , "710", , , [3]]],
    BJ: [, [, , "[17]\\d{2,3}", , , , , , , [3, 4]], , , [, , "11[78]|7[3-5]\\d\\d", , , , "117"], [, , , , , , , , , [-1]], , , , "BJ", , , , , , , , , , , , , , , , , , [, , "11[78]", , , , "117", , , [3]], , [, , "1(?:1[78]|2[02-5]|60)|7[0-5]\\d\\d", , , , "117"], [, , , , , , , , , [-1]], [, , "12[02-5]", , , , "120", , , [3]], , [, , , , , , , , , [-1]]],
    BL: [, [, , "1\\d", , , , , , , [2]], , , [, , "18", , , , "18"], [, , , , , , , , , [-1]], , , , "BL", , , , , , , , , , , , , , , , , , [, , "18", , , , "18"], , [, , "18", , , , "18"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    BM: [, [
      ,
      ,
      "[19]\\d\\d",
      ,
      ,
      ,
      ,
      ,
      ,
      [3]
    ], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "BM", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "176|911", , , , "911"], [, , , , , , , , , [-1]], [, , "176", , , , "176"], , [, , "176", , , , "176"]],
    BN: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , "99[135]", , , , "991"], [, , , , , , , , , [-1]], , , , "BN", , , , , , , , , , , , , , , , , , [, , "99[135]", , , , "991"], , [, , "99[135]", , , , "991"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    BO: [, [, , "[14]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "BO", , , , , , , , , , , , , , , , , , [, , "11[089]", , , , "110", , , [3]], , [
      ,
      ,
      "11[089]|40404",
      ,
      ,
      ,
      "110"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "40404", , , , "40404", , , [5]]],
    BQ: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , "112|911", , , , "112"], [, , , , , , , , , [-1]], , , , "BQ", , , , , , , , , , , , , , , , , , [, , "112|911", , , , "112"], , [, , "1(?:12|76)|911", , , , "112"], [, , , , , , , , , [-1]], [, , "176", , , , "176"], , [, , "176", , , , "176"]],
    BR: [, [, , "[124-69]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "1(?:00|[89]\\d)|4(?:57|828)", , , , "181", , , [3, 4]], [, , , , , , , , , [-1]], , , , "BR", , , , , , , , , , , , , , , , , , [, , "1(?:12|28|9[023])|911", , , , "190", , , [3]], , [
      ,
      ,
      "1(?:0(?:[02]|3(?:1[2-579]|2[13-9]|3[124-9]|4[1-3578]|5[1-468]|6[139]|8[149]|9[168])|5[0-35-9]|6(?:0|1[0-35-8]?|2[0145]|3[0137]?|4[37-9]?|5[0-35]|6[016]?|7[137]?|8[5-8]|9[1359]))|1[25-8]|2[35789]|3(?:[024568]|3[12])|4[12568]|5\\d|6[0-8]|8[015]|9[0-4789])|2(?:7(?:330|878)|85959?)|4(?:0404?|11[12]|57|828)|55555|6(?:0\\d{4}|10000)|911",
      ,
      ,
      ,
      "168"
    ], [, , "102|27330", , , , "27330", , , [3, 5]], [, , "151|27878|4(?:0404?|11[12]|57)|55555", , , , "27878", , , [3, 4, 5]], , [, , "2(?:7(?:330|878)|85959?)|4(?:0404|828)|6(?:0\\d{4}|10000)", , , , "27878", , , [4, 5, 6]]],
    BS: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "BS", , , , , , , , , , , , , , , , , , [, , "91[19]", , , , "911"], , [, , "91[19]", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    BT: [, [, , "[14]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "BT", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "11[023]",
      ,
      ,
      ,
      "113",
      ,
      ,
      [3]
    ], , [, , "11[0-6]|40404", , , , "113"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "40404", , , , "40404", , , [5]]],
    BW: [, [, , "[19]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "99[7-9]", , , , "997", , , [3]], [, , , , , , , , , [-1]], , , , "BW", , , , , , , , , , , , , , , , , , [, , "99[7-9]", , , , "997", , , [3]], , [, , "13123|99[7-9]", , , , "997"], [, , , , , , , , , [-1]], [, , "131\\d\\d", , , , "13100", , , [5]], , [, , "131\\d\\d", , , , "13100", , , [5]]],
    BY: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "BY", , , , , , , , , , , , , , , , , , [, , "1(?:0[123]|12)", , , , "112"], , [
      ,
      ,
      "1(?:0[1-79]|1[246]|35|5[1235]|6[89]|7[5-7]|8[58]|9[1-7])",
      ,
      ,
      ,
      "112"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    BZ: [, [, , "9\\d\\d?", , , , , , , [2, 3]], , , [, , "9(?:0|11)", , , , "90"], [, , , , , , , , , [-1]], , , , "BZ", , , , , , , , , , , , , , , , , , [, , "9(?:0|11)", , , , "90"], , [, , "9(?:0|11)", , , , "90"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CA: [, [, , "[1-9]\\d\\d(?:\\d\\d(?:\\d(?:\\d{2})?)?)?", , , , , , , [3, 5, 6, 8]], , , [, , "211", , , , "211", , , [3]], [, , , , , , , , , [-1]], , , , "CA", , , , , , , , , , , , , , , , , , [, , "112|911", , , , "911", , , [3]], , [
      ,
      ,
      "1(?:12|\\d{4,5})|[25-9](?:11|\\d{4,5})|3(?:\\d{4,5}|0000\\d{3}|11)|411",
      ,
      ,
      ,
      "12345"
    ], [, , , , , , , , , [-1]], [, , "[23567]11", , , , "611", , , [3]], , [, , "[125-9]\\d{4,5}|3(?:\\d{4,5}|0000\\d{3})", , , , "30001", , , [5, 6, 8]]],
    CC: [, [, , "[01]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "CC", , , , , , , , , , , , , , , , , , [, , "000|112", , , , "112"], , [, , "000|112", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CD: [, [, , "[14]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "1(?:1[348]|77|88)", , , , "113", , , [3]], [, , , , , , , , , [-1]], , , , "CD", , , , , , , , , , , , , , , , , , [, , "1(?:1[348]|77|88)", , , , "113", , , [3]], , [
      ,
      ,
      "1(?:1[348]|23|77|88)|40404",
      ,
      ,
      ,
      "113"
    ], [, , , , , , , , , [-1]], [, , "404\\d\\d", , , , "40400", , , [5]], , [, , "404\\d\\d", , , , "40400", , , [5]]],
    CF: [, [, , "1\\d{2,3}", , , , , , , [3, 4]], , , [, , "1(?:1[78]|22\\d)", , , , "117"], [, , , , , , , , , [-1]], , , , "CF", , , , , , , , , , , , , , , , , , [, , "1(?:1[78]|22\\d)", , , , "117"], , [, , "1(?:1[478]|220)", , , , "114"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CG: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "11[178]", , , , "111"], [, , , , , , , , , [-1]], , , , "CG", , , , , , , , , , , , , , , , , , [, , "11[78]", , , , "117"], , [, , "11[126-8]", , , , "111"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    CH: [, [, , "[1-9]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "1(?:1(?:[278]|6\\d{3})|4[47])|5200", , , , "112", , , [3, 4, 6]], [, , "1(?:14|8[01589])\\d|543|83111", , , , "543", , , [3, 4, 5]], , , , "CH", , , , , , , , , , , , , , , , , , [, , "1(?:1[278]|44)", , , , "112", , , [3]], , [, , "1(?:0[78]\\d\\d|1(?:[278]|45|6(?:000|111))|4(?:[03-57]|1[45])|6(?:00|[1-46])|8(?:02|1[189]|50|7|8[08]|99))|[2-9]\\d{2,4}", , , , "112"], [, , "1(?:4(?:[035]|1\\d)|6(?:0\\d|[1-46]))", , , , "140", , , [3, 4]], [, , "5(?:20\\d|35)", , , , "535", , , [3, 4]], , [, , "[2-9]\\d{2,4}", , , , "200", , , [3, 4, 5]]],
    CI: [, [, , "[14]\\d{2,3}", , , , , , , [3, 4]], , , [, , "1(?:1[01]|[78]0)", , , , "110", , , [3]], [, , , , , , , , , [-1]], , , , "CI", , , , , , , , , , , , , , , , , , [, , "1(?:1[01]|[78]0)", , , , "110", , , [3]], , [, , "1(?:1[01]|[78]0)|4443", , , , "110"], [, , , , , , , , , [-1]], [, , "444\\d", , , , "4440", , , [4]], , [, , "444\\d", , , , "4440", , , [4]]],
    CK: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , "99[689]", , , , "996"], [, , , , , , , , , [-1]], , , , "CK", , , , , , , , , , , , , , , , , , [, , "99[689]", , , , "996"], , [, , "99[689]", , , , "996"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CL: [
      ,
      [, , "[1-9]\\d{2,4}", , , , , , , [3, 4, 5]],
      ,
      ,
      [, , "1213|4342", , , , "4342", , , [4]],
      [, , "1(?:060|211|3(?:13|[348]0|5[01])|417|560|818|9(?:19|80))|2(?:0122|22[47]|323|777|882)|3(?:0(?:51|99)|132|3(?:29|77|90)|665)|4(?:142|243|3656|4(?:02|15|77)|554)|5(?:004|4154|5(?:66|77)|995)|6(?:0700|131|222|3(?:00|66)|500|699)|7878|8(?:011|11[28]|482|889)|9(?:011|[12]00|330)", , , , "2224", , , [4, 5]],
      ,
      ,
      ,
      "CL",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "13[123]|911", , , , "133", , , [3]],
      ,
      [
        ,
        ,
        "1(?:06?0|21[13]|3(?:[02679]|13?|[348]0?|5[01]?)|4(?:0[02-6]|17|[379])|560|818|9(?:19|80))|2(?:0(?:01|122)|22[47]|323|777|882)|3(?:0(?:51|99)|132|3(?:29|37|77|90)|665)|4(?:142|243|3(?:42|656)|4(?:02|15|77)|554)|5(?:004|4154|5(?:66|77)|995)|6(?:0700|131|222|3(?:00|66)|500|699)|7878|8(?:011|11[28]|482|889)|9(?:011|1(?:1|00)|200|330)",
        ,
        ,
        ,
        "139"
      ],
      [, , "2001|3337", , , , "3337", , , [4]],
      [, , , , , , , , , [-1]],
      ,
      [, , "(?:[137-9]|[2456]\\d?)\\d{3}", , , , "5577", , , [4, 5]]
    ],
    CM: [, [, , "[18]\\d{1,3}", , , , , , , [2, 3, 4]], , , [, , "1(?:1[37]|[37])", , , , "13", , , [2, 3]], [, , , , , , , , , [-1]], , , , "CM", , , , , , , , , , , , , , , , , , [, , "1(?:1[37]|[37])", , , , "13", , , [2, 3]], , [, , "1(?:1[37]|[37])|8711", , , , "13"], [, , , , , , , , , [-1]], [, , "871\\d", , , , "8710", , , [4]], , [, , "871\\d", , , , "8710", , , [4]]],
    CN: [, [, , "[19]\\d\\d(?:\\d{2,3})?", , , , , , , [3, 5, 6]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "CN", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "1(?:1[09]|20)",
      ,
      ,
      ,
      "119",
      ,
      ,
      [3]
    ], , [, , "1(?:00\\d{2}|1[09]|20)|95\\d{3,4}", , , , "119"], [, , "100\\d{2}|95\\d{3,4}", , , , "95566", , , [5, 6]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CO: [, [, , "[148]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "CO", , , , , , , , , , , , , , , , , , [, , "1(?:1[29]|23|32|56)", , , , "112", , , [3]], , [, , "1(?:06|1[2569]|2[357]|3[27]|4[467]|5[36]|6[45]|95)|40404|85432", , , , "112"], [, , , , , , , , , [-1]], [, , "40404|85432", , , , "40404", , , [5]], , [, , "40404|85432", , , , "40404", , , [5]]],
    CR: [, [, , "[1359]\\d{2,3}", , , , , , , [3, 4]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], , , , "CR", , , , , , , , , , , , , , , , , , [, , "112|911", , , , "911", , , [3]], , [, , "1(?:0(?:00|15|2[2-4679])|1(?:1[0-35-9]|2|37|[46]6|7[57]|8[79]|9[0-379])|2(?:00|[12]2|34|55)|3(?:21|33)|4(?:0[06]|1[4-6])|5(?:15|5[15])|693|7(?:00|1[789]|2[02]|[67]7)|975)|3855|5(?:0(?:30|49)|510)|911", , , , "1022"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "3855|5(?:0(?:30|49)|510)", , , , "3855", , , [4]]],
    CU: [, [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "CU", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "10[456]",
      ,
      ,
      ,
      "106",
      ,
      ,
      [3]
    ], , [, , "1(?:0[456]|1(?:6111|8)|40)", , , , "140"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CV: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "13[0-2]", , , , "130"], [, , , , , , , , , [-1]], , , , "CV", , , , , , , , , , , , , , , , , , [, , "13[0-2]", , , , "130"], , [, , "13[0-2]", , , , "130"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CW: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , "112|911", , , , "112"], [, , , , , , , , , [-1]], , , , "CW", , , , , , , , , , , , , , , , , , [, , "112|911", , , , "112"], , [, , "1(?:12|76)|911", , , , "112"], [, , , , , , , , , [-1]], [, , "176", , , , "176"], , [, , "176", , , , "176"]],
    CX: [
      ,
      [, , "[01]\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "CX",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "000|112", , , , "112"],
      ,
      [, , "000|112", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    CY: [, [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]], , , [, , "1(?:1(?:2|6\\d{3})|99)", , , , "112"], [, , , , , , , , , [-1]], , , , "CY", , , , , , , , , , , , , , , , , , [, , "1(?:12|99)", , , , "112", , , [3]], , [, , "1(?:1(?:2|6(?:000|111))|99)", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    CZ: [, [, , "1\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [
      ,
      ,
      "1(?:1(?:2|6(?:00[06]|1(?:11|23)))|5[0568])",
      ,
      ,
      ,
      "112",
      ,
      ,
      [3, 6]
    ], [, , , , , , , , , [-1]], , , , "CZ", , , , , , , , , , , , , , , , , , [, , "1(?:12|5[0568])", , , , "112", , , [3]], , [, , "1(?:1(?:2|(?:6\\d\\d|8)\\d)|[24]\\d{3}|3\\d{3,4}|5[0568]|99)|12\\d\\d", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    DE: [, [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]], , , [, , "116\\d{3}", , , , "116000", , , [6]], [, , , , , , , , , [-1]], , , , "DE", , , , , , , , , , , , , , , , , , [, , "11[02]", , , , "112", , , [3]], , [, , "11(?:[025]|6(?:00[06]|1(?:1[17]|23)))", , , , "115"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    DJ: [, [
      ,
      ,
      "1\\d",
      ,
      ,
      ,
      ,
      ,
      ,
      [2]
    ], , , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], , , , "DJ", , , , , , , , , , , , , , , , , , [, , "1[78]", , , , "17"], , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    DK: [, [, , "1\\d\\d(?:\\d(?:\\d{2})?)?", , , , , , , [3, 4, 6]], , , [, , "11(?:[24]|6\\d{3})", , , , "112", , , [3, 6]], [, , , , , , , , , [-1]], , , , "DK", , , , , , , , , , , , , , , , , , [, , "11[24]", , , , "112", , , [3]], , [, , "1(?:1(?:[2-48]|6(?:00[06]|111))|8(?:[08]1|1[0238]|28|30|5[13]))", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    DM: [, [, , "[39]\\d\\d", , , , , , , [3]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], , , , "DM", , , , , , , , , , , , , , , , , , [, , "333|9(?:11|99)", , , , "999"], , [, , "333|9(?:11|99)", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    DO: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "DO", , , , , , , , , , , , , , , , , , [, , "112|911", , , , "112"], , [, , "112|911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    DZ: [
      ,
      [, , "[17]\\d\\d?", , , , , , , [2, 3]],
      ,
      ,
      [, , "1[47]", , , , "14", , , [2]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "DZ",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1[47]", , , , "14", , , [2]],
      ,
      [, , "1[47]|730", , , , "14"],
      [, , , , , , , , , [-1]],
      [, , "730", , , , "730", , , [3]],
      ,
      [, , "730", , , , "730", , , [3]]
    ],
    EC: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "EC", , , , , , , , , , , , , , , , , , [, , "1(?:0[12]|12)|911", , , , "911"], , [, , "1(?:0[12]|12)|911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    EE: [, [, , "1\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "1(?:1(?:[02]|6\\d{3})|2(?:05|28)|3(?:014|3(?:21|5\\d?)|660)|492|5(?:1[03]|410|501)|6(?:112|333|644)|7(?:012|127|89)|8(?:10|8[57])|9(?:0[134]|14))", , , , "110"], [
      ,
      ,
      "1(?:18(?:00|[12458]\\d?)|2(?:0(?:[02-46-8]\\d?|1[0-36])|1(?:[0-4]\\d?|6[06])|2(?:[0-4]\\d?|5[25])|[367]|4(?:0[04]|[12]\\d?|4[24]|54)|55[12457])|3(?:0(?:[02]\\d?|1[13578]|3[356])|1[1347]|2[02-5]|3(?:[01347]\\d?|2[023]|88)|4(?:[35]\\d?|4[34])|5(?:3[134]|5[035])|666)|4(?:2(?:00|4\\d?)|4(?:0[01358]|1[024]|50|7\\d?)|900)|5(?:0[0-35]|1(?:[1267]\\d?|5[0-7]|82)|2(?:[014-6]\\d?|22)|330|4(?:[35]\\d?|44)|5(?:00|[1-69]\\d?)|9(?:[159]\\d?|[38]0|77))|6(?:1(?:00|1[19]|[35-9]\\d?)|2(?:2[26]|[68]\\d?)|3(?:22|36|6[36])|5|6(?:[0-359]\\d?|6[0-26])|7(?:00|55|7\\d?|8[89])|9(?:00|1\\d?|69))|7(?:0(?:[023]\\d?|1[0578])|1(?:00|2[034]|[4-9]\\d?)|2(?:[07]\\d?|20|44)|7(?:[0-57]\\d?|9[79])|8(?:0[08]|2\\d?|8[0178])|9(?:00|97))|8(?:1[127]|8[1268]|9[269])|9(?:0(?:[02]\\d?|69|9[0269])|1[1-3689]|21))",
      ,
      ,
      ,
      "123",
      ,
      ,
      [3, 4, 5]
    ], , , , "EE", , , , , , , , , , , , , , , , , , [, , "11[02]", , , , "110", , , [3]], , [, , "1(?:1(?:[02-579]|6(?:000|111)|8(?:[09]\\d|[1-8]))|2(?:[0-245]\\d\\d?|[36-9])|3(?:[0-6]\\d\\d?|[7-9])|4(?:[05-7]|[1-489]\\d\\d?)|5(?:[0-59]\\d\\d?|[6-8])|6(?:[05]|[1-46-9]\\d\\d?)|7(?:[0-27-9]\\d\\d?|[3-6])|8(?:[02-7]|[189]\\d\\d?)|9(?:[0-2]\\d\\d?|[3-9]))", , , , "110"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [
      ,
      ,
      "1(?:(?:18|(?:3[035]|5[1-59]|6[23679]|7[0-28]|89)\\d)\\d|2(?:[014]\\d\\d|[67])|(?:44|90)\\d\\d?)|1(?:2[024]|3[0-4]|5[0-249]|6[17]|7[128]|8[189])\\d",
      ,
      ,
      ,
      "126",
      ,
      ,
      [3, 4, 5]
    ]],
    EG: [, [, , "[13]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "EG", , , , , , , , , , , , , , , , , , [, , "1(?:2[23]|80)", , , , "122", , , [3]], , [, , "1(?:2[23]|[69]\\d{3}|80)|34400", , , , "122"], [, , , , , , , , , [-1]], [, , "34400", , , , "34400", , , [5]], , [, , "34400", , , , "34400", , , [5]]],
    EH: [, [, , "1\\d\\d?", , , , , , , [2, 3]], , , [, , "1(?:[59]|77)", , , , "15"], [, , , , , , , , , [-1]], , , , "EH", , , , , , , , , , , , , , , , , , [, , "1(?:[59]|77)", , , , "15"], , [, , "1(?:[59]|77)", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    ER: [, [
      ,
      ,
      "[12]\\d\\d(?:\\d{3})?",
      ,
      ,
      ,
      ,
      ,
      ,
      [3, 6]
    ], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "ER", , , , , , , , , , , , , , , , , , [, , "1(?:1[2-46]|2(?:4422|7799))|2(?:0(?:1(?:606|917)|2(?:099|914)))", , , , "113"], , [, , "1(?:1[2-6]|2(?:4422|7799))|2(?:0(?:1(?:606|917)|2(?:099|914)))", , , , "114"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    ES: [, [, , "[0-379]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "0(?:16|6[57]|8[58])|1(?:006|1(?:2|6\\d{3})|[3-7]\\d\\d)|20\\d{4}", , , , "016", , , [3, 4, 6]], [
      ,
      ,
      "[12]2\\d(?:\\d(?:\\d{2})?)?|[79]9[57]\\d{3}|(?:1(?:18|2\\d)|2(?:[2357]\\d|80)|3[357]\\d)\\d\\d|90(?:5\\d|7)",
      ,
      ,
      ,
      "120"
    ], , , , "ES", , , , , , , , , , , , , , , , , , [, , "08[58]|112", , , , "085", , , [3]], , [, , "0(?:1[0-26]|6[0-257]|8[058]|9[12])|1(?:0[03-57]\\d{1,3}|1(?:2|6(?:000|111)|8\\d\\d)|2\\d{1,4}|[3-9]\\d\\d)|(?:2[0-2]\\d|3[357]|[79]9[57])\\d{3}|1(?:3[34]|77)|2(?:[2357]\\d|80)\\d\\d|90(?:5[124578]|7)|22\\d\\d?", , , , "010"], [, , "0(?:[16][0-2]|80|9[12])|21\\d{4}", , , , "010", , , [3, 6]], [, , "[12]2\\d{2,4}|1(?:2\\d|3[34]|77)|22\\d", , , , "120"], , [, , "(?:2[0-2]\\d|3[357]|[79]9[57])\\d{3}|2(?:[2357]\\d|80)\\d\\d", , , , "22000", , , [5, 6]]],
    ET: [, [
      ,
      ,
      "9\\d\\d?",
      ,
      ,
      ,
      ,
      ,
      ,
      [2, 3]
    ], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "ET", , , , , , , , , , , , , , , , , , [, , "9(?:11?|[23]|9[17])", , , , "991"], , [, , "9(?:11?|[23]|9[17])", , , , "991"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    FI: [, [, , "[17]\\d\\d(?:\\d{2,3})?", , , , , , , [3, 5, 6]], , , [, , "116111", , , , "116111", , , [6]], [, , , , , , , , , [-1]], , , , "FI", , , , , , , , , , , , , , , , , , [, , "112", , , , "112", , , [3]], , [, , "11(?:2|6111)|75[12]\\d{2}", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    FJ: [, [, , "[0-579]\\d(?:\\d(?:\\d{2})?)?", , , , , , , [2, 3, 5]], , , [
      ,
      ,
      "91[17]",
      ,
      ,
      ,
      "911",
      ,
      ,
      [3]
    ], [, , , , , , , , , [-1]], , , , "FJ", , , , , , , , , , , , , , , , , , [, , "91[17]", , , , "911", , , [3]], , [, , "0(?:1[34]|8[1-4])|1(?:0[1-3]|[25]9)|2[289]|30|40404|91[137]|[45]4|75", , , , "22"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "404\\d\\d", , , , "40400", , , [5]]],
    FK: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , "999", , , , "999"], [, , , , , , , , , [-1]], , , , "FK", , , , , , , , , , , , , , , , , , [, , "999", , , , "999"], , [, , "1\\d\\d|999", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    FM: [
      ,
      [, , "[39]\\d\\d(?:\\d{3})?", , , , , , , [3, 6]],
      ,
      ,
      [, , "320\\d{3}|911", , , , "911"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "FM",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "320\\d{3}|911", , , , "911"],
      ,
      [, , "(?:32022|91)1", , , , "911"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    FO: [, [, , "1\\d{2,3}", , , , , , , [3, 4]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "FO", , , , , , , , , , , , , , , , , , [, , "11[24]", , , , "112", , , [3]], , [, , "1(?:1[248]|4[124]\\d|71\\d|8[7-9]\\d)", , , , "114"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    FR: [, [, , "[1-8]\\d{1,5}", , , , , , , [2, 3, 4, 5, 6]], , , [
      ,
      ,
      "1(?:0(?:07|13)|1(?:[0459]|[68]\\d{3})|9[167])|224|3(?:[01]\\d{2}|3700)|740",
      ,
      ,
      ,
      "3010",
      ,
      ,
      [3, 4, 5, 6]
    ], [, , "36665|[4-8]\\d{4}", , , , "42000", , , [5]], , , , "FR", , , , , , , , , , , , , , , , , , [, , "1(?:[578]|12)", , , , "112", , , [2, 3]], , [, , "1(?:0\\d{2}|1(?:[02459]|6(?:000|111)|8\\d{3})|9[167]|[578])|2(?:0(?:000|20)|24)|3\\d{3,4}|6(?:1[14]|34|\\d{4})|7(?:0[06]|22|40|\\d{4})|[458]\\d{4}", , , , "1010"], [, , "10(?:14|2[23]|34|6[14]|99)|2020|3(?:646|9[07]0)|6(?:1[14]|34)|70[06]", , , , "1023", , , [3, 4]], [, , "118777|2(?:0(?:000|20)|24)|6(?:1[14]|34)|7\\d{2}", , , , "118777", , , [3, 4, 5, 6]], , [, , "(?:114|[3-8]\\d{4})", , , , "33700", , , [
      3,
      5
    ]]],
    GA: [, [, , "1\\d(?:\\d{2})?", , , , , , , [2, 4]], , , [, , "1(?:(?:3\\d|73)\\d|8)", , , , "18"], [, , , , , , , , , [-1]], , , , "GA", , , , , , , , , , , , , , , , , , [, , "1(?:(?:3\\d|73)\\d|8)", , , , "18"], , [, , "1(?:3\\d\\d|730|8)", , , , "18"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    GB: [, [, , "[1-46-9]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "1(?:05|16\\d{3}|7[56]0|8000)|2(?:202|48)|4444", , , , "116000"], [, , , , , , , , , [-1]], , , , "GB", , , , , , , , , , , , , , , , , , [, , "112|999", , , , "112", , , [3]], , [
      ,
      ,
      "1(?:0[015]|1(?:[12]|6(?:000|1(?:11|23))|8\\d{3})|2(?:[123]|50)|33|4(?:1|7\\d)|5(?:\\d|71)|7(?:0\\d|[56]0)|800\\d|9[15])|2(?:02(?:02)?|1300|2(?:02|11|2)|3(?:02|336|45)|4(?:25|8))|3[13]3|4(?:0[02]|35[01]|44[45]|5\\d)|6(?:50|\\d{4})|7(?:0\\d{3}|8(?:9|\\d{3})|9\\d{3})|8\\d{4}|9(?:01|99)",
      ,
      ,
      ,
      "150"
    ], [, , , , , , , , , [-1]], [, , "1(?:250|571|7[56]0)|2(?:02(?:02)?|1300|3336|48)|4444|901", , , , "1571", , , [3, 4, 5]], , [, , "1250|2(?:0202|1300)|7\\d{4}|8[01]\\d{3}", , , , "20202", , , [4, 5]]],
    GD: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "GD", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , "176", , , , "176"], , [, , "176", , , , "176"]],
    GE: [, [, , "[014]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "GE", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "0(?:11|22|33)|1(?:1[123]|22)",
      ,
      ,
      ,
      "112",
      ,
      ,
      [3]
    ], , [, , "0(?:11|22|33)|1(?:1[123]|22)|40404", , , , "112"], [, , , , , , , , , [-1]], [, , "40404", , , , "40404", , , [5]], , [, , "40404", , , , "40404", , , [5]]],
    GF: [, [, , "1\\d", , , , , , , [2]], , , [, , "1[578]", , , , "15"], [, , , , , , , , , [-1]], , , , "GF", , , , , , , , , , , , , , , , , , [, , "1[578]", , , , "15"], , [, , "1[578]", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    GG: [, [, , "[19]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "GG", , , , , , , , , , , , , , , , , , [, , "112|999", , , , "999", , , [3]], , [
      ,
      ,
      "1(?:0[01]|1(?:[12]|[68]\\d{3})|23|4(?:1|7\\d)|55|800\\d|9[05])|999",
      ,
      ,
      ,
      "155"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    GH: [, [, , "[14589]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "GH", , , , , , , , , , , , , , , , , , [, , "19[123]|999", , , , "999", , , [3]], , [, , "19[123]|40404|(?:54|83)00|999", , , , "999"], [, , , , , , , , , [-1]], [, , "40404|(?:54|83)00", , , , "5400", , , [4, 5]], , [, , "40404|(?:54|83)00", , , , "5400", , , [4, 5]]],
    GI: [, [, , "[158]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "1(?:00|1(?:2|6\\d{3})|23|4(?:1|7\\d)|5[15]|9[02-49])|555|80\\d\\d", , , , "100", , , [3, 4, 6]], [
      ,
      ,
      "8[1-69]\\d\\d",
      ,
      ,
      ,
      "8100",
      ,
      ,
      [4]
    ], , , , "GI", , , , , , , , , , , , , , , , , , [, , "1(?:12|9[09])", , , , "112", , , [3]], , [, , "1(?:00|1(?:2|6(?:00[06]|1(?:1[17]|23))|8\\d\\d)|23|4(?:1|7[014])|5[015]|9[02-49])|555|8[0-79]\\d\\d|8(?:00|4[0-2]|8[1-589])", , , , "100"], [, , "150|87\\d\\d", , , , "150", , , [3, 4]], [, , "1(?:18\\d\\d|23|51|9[2-4])|555|8(?:00|88)", , , , "123", , , [3, 5]], , [, , , , , , , , , [-1]]],
    GL: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "112", , , , "112"], [, , , , , , , , , [-1]], , , , "GL", , , , , , , , , , , , , , , , , , [, , "112", , , , "112"], , [, , "112", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    GM: [, [, , "1\\d\\d?", , , , , , , [2, 3]], , , [, , "1(?:1[6-8]|[6-8])", , , , "16"], [, , , , , , , , , [-1]], , , , "GM", , , , , , , , , , , , , , , , , , [, , "1(?:1[6-8]|[6-8])", , , , "16"], , [, , "1(?:1[6-8]|[6-8])", , , , "16"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    GN: [, [, , "4\\d{4}", , , , , , , [5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "GN", , , , , , , , , , , , , , , , , , [, , , , , , , , , [-1]], , [, , "40404", , , , "40404"], [, , , , , , , , , [-1]], [, , "404\\d\\d", , , , "40400"], , [, , "404\\d\\d", , , , "40400"]],
    GP: [
      ,
      [, , "1\\d", , , , , , , [2]],
      ,
      ,
      [, , "1[578]", , , , "15"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "GP",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1[578]", , , , "15"],
      ,
      [, , "1[578]", , , , "15"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    GR: [, [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]], , , [, , "1(?:00|1(?:2|6\\d{3})|66|99)", , , , "100"], [, , , , , , , , , [-1]], , , , "GR", , , , , , , , , , , , , , , , , , [, , "1(?:00|12|66|99)", , , , "100", , , [3]], , [, , "1(?:00|1(?:2|6(?:000|1(?:11|23)))|66|99)", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    GT: [, [, , "[14]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , "1(?:10|2[03])", , , , "110", , , [3]], [, , , , , , , , , [-1]], , , , "GT", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "1(?:10|2[03])",
      ,
      ,
      ,
      "110",
      ,
      ,
      [3]
    ], , [, , "1(?:10|(?:2|[57]\\d)\\d)|40404", , , , "110"], [, , , , , , , , , [-1]], [, , "404\\d\\d", , , , "40400", , , [5]], , [, , "404\\d\\d", , , , "40400", , , [5]]],
    GU: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "GU", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    GW: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "11[378]", , , , "113"], [, , , , , , , , , [-1]], , , , "GW", , , , , , , , , , , , , , , , , , [, , "11[378]", , , , "113"], , [, , "11[378]", , , , "113"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    GY: [, [, , "[019]\\d{2,3}", , , , , , , [3, 4]], , , [, , "91[1-3]", , , , "911", , , [3]], [, , , , , , , , , [-1]], , , , "GY", , , , , , , , , , , , , , , , , , [, , "91[1-3]", , , , "911", , , [3]], , [, , "0(?:02|(?:17|80)1|444|7(?:[67]7|9)|9(?:0[78]|[2-47]))|1(?:443|5[568])|91[1-3]", , , , "002"], [, , , , , , , , , [-1]], [, , "144\\d", , , , "1440", , , [4]], , [, , "144\\d", , , , "1440", , , [4]]],
    HK: [, [, , "[19]\\d{2,6}", , , , , , , [3, 4, 5, 6, 7]], , , [, , "112|99[29]", , , , "112", , , [3]], [, , , , , , , , , [-1]], , , , "HK", , , , , , , , , , , , , , , , , , [, , "112|99[29]", , , , "112", , , [3]], , [
      ,
      ,
      "1(?:0(?:(?:[0136]\\d|2[14])\\d{0,3}|8[138])|12|2(?:[0-3]\\d{0,4}|(?:58|8[13])\\d{0,3})|7(?:[135-9]\\d{0,4}|219\\d{0,2})|8(?:0(?:(?:[13]|60\\d)\\d|8)|1(?:0\\d|[2-8])|2(?:0[5-9]|(?:18|2)2|3|8[128])|(?:(?:3[0-689]\\d|7(?:2[1-389]|8[0235-9]|93))\\d|8)\\d|50[138]|6(?:1(?:11|86)|8)))|99[29]|10[0139]",
      ,
      ,
      ,
      "100"
    ], [, , , , , , , , , [-1]], [, , "1(?:0(?:8\\d|9)|85\\d\\d)", , , , "109", , , [3, 4, 5]], , [, , "992", , , , "992", , , [3]]],
    HN: [, [, , "[14]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "199", , , , "199", , , [3]], [, , , , , , , , , [-1]], , , , "HN", , , , , , , , , , , , , , , , , , [, , "199", , , , "199", , , [3]], , [, , "199|40404", , , , "199"], [, , , , , , , , , [-1]], [, , "404\\d\\d", , , , "40400", , , [5]], , [, , "404\\d\\d", , , , "40400", , , [5]]],
    HR: [, [, , "[19]\\d{1,5}", , , , , , , [2, 3, 4, 5, 6]], , , [, , "1(?:16\\d{3}|3977)", , , , "116000", , , [5, 6]], [, , "118\\d{2}", , , , "11812", , , [5]], , , , "HR", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "1(?:12|9[2-4])|9[34]",
      ,
      ,
      ,
      "112",
      ,
      ,
      [2, 3]
    ], , [, , "1(?:1(?:2|6(?:00[06]|1(?:1[17]|23))|8\\d{2})|3977|9(?:[2-5]|87))|9[34]", , , , "112"], [, , , , , , , , , [-1]], [, , "13977", , , , "13977", , , [5]], , [, , "13977", , , , "13977", , , [5]]],
    HT: [, [, , "[14]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "11[48]", , , , "114", , , [3]], [, , , , , , , , , [-1]], , , , "HT", , , , , , , , , , , , , , , , , , [, , "11[48]", , , , "114", , , [3]], , [, , "11[48]|40404", , , , "114"], [, , , , , , , , , [-1]], [, , "404\\d\\d", , , , "40400", , , [5]], , [, , "404\\d\\d", , , , "40400", , , [5]]],
    HU: [
      ,
      [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]],
      ,
      ,
      [, , "116(?:000|1(?:11|23))", , , , "116000", , , [6]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "HU",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1(?:0[457]|12)", , , , "112", , , [3]],
      ,
      [, , "1(?:0[457]|1(?:2|6(?:000|1(?:11|23))))", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    ID: [, [, , "[178]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "ID", , , , , , , , , , , , , , , , , , [, , "11[02389]", , , , "112", , , [3]], , [, , "1(?:1[02389]|40\\d{2})|71400|89887", , , , "112"], [, , , , , , , , , [-1]], [, , "71400|89887", , , , "71400", , , [5]], , [, , "71400", , , , "71400", , , [5]]],
    IE: [
      ,
      [, , "[159]\\d{2,5}", , , , , , , [3, 4, 5, 6]],
      ,
      ,
      [, , "116\\d{3}", , , , "116000", , , [6]],
      [, , "5[37]\\d{3}", , , , "53012", , , [5]],
      ,
      ,
      ,
      "IE",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "112|999", , , , "112", , , [3]],
      ,
      [, , "1(?:1(?:2|6(?:00[06]|1(?:1[17]|23))|8\\d{2})|9\\d{2})|5[0137]\\d{3}|999", , , , "112"],
      [, , "51\\d{3}", , , , "51012", , , [5]],
      [, , "51210", , , , "51210", , , [5]],
      ,
      [, , "118\\d{2}|5(?:[037]\\d{3}|1210)", , , , "51210", , , [5]]
    ],
    IL: [, [, , "1\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "IL", , , , , , , , , , , , , , , , , , [, , "1(?:0[012]|12)", , , , "112", , , [3]], , [
      ,
      ,
      "1(?:0(?:[012]|400)|1(?:[013-9]\\d|2)|[2-9]\\d{2})",
      ,
      ,
      ,
      "1455"
    ], [, , , , , , , , , [-1]], [, , "10400", , , , "10400", , , [5]], , [, , "10400", , , , "10400", , , [5]]],
    IM: [, [, , "[189]\\d\\d(?:\\d{2,3})?", , , , , , , [3, 5, 6]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "IM", , , , , , , , , , , , , , , , , , [, , "999", , , , "999", , , [3]], , [, , "1\\d{2}(?:\\d{3})?|8(?:6444|9887)|999", , , , "150"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "8(?:6444|9887)", , , , "86444", , , [5]]],
    IN: [, [, , "[12578]\\d{2,8}", , , , , , , [3, 4, 5, 6, 7, 8, 9]], , , [, , "1\\d{2,5}|777|800", , , , "105010", , , [3, 4, 5, 6]], [
      ,
      ,
      "11[67][0-2]\\d{3}|56161561",
      ,
      ,
      ,
      "1160530",
      ,
      ,
      [7, 8]
    ], , , , "IN", , , , , , , , , , , , , , , , , , [, , "1(?:0[0128]|12|298)|2611", , , , "108", , , [3, 4]], , [
      ,
      ,
      "1(?:0(?:[01248]|3[39]|5(?:010|6|[79]\\d{2})|6[3468]|7(?:[013578]|20?|4[01]|80)|9[0135-9])|1(?:00|[289]|[67][0-2]\\d{3})|2(?:1|98)|3(?:11|2[0-2]|63|[89])|4[01]|5(?:1(?:0[0-36]|[127])|5(?:[23]\\d{2}|4))|6(?:1|6[01]?)|7000|8(?:02\\d{3}|[12])|9(?:0[013-59]|12|25|4[4-9]\\d?|50|6[1347]|[89]))|2611|5(?:0(?:0(?:0\\d{1}(?:\\d{2})?|1(?:\\d{2})?|20?)|325|40\\d{1,2}|5(?:0\\d{1,4}|1\\d{2,5}|[2-79]\\d{3,5}))|1(?:0[12]\\d|234|4[2-4]\\d|555|717|818|96[49])|2(?:0(?:0[01]|[14]0)|151|2(?:[0267]\\d{1,2}|1\\d{1,4}|[3589]\\d)|3(?:1(?:\\d{1,2}|\\d{4})|2\\d|6\\d{1,2})|4[04]\\d|555|666|7[78]\\d|888|9(?:06|99\\d?))|3(?:0(?:[01]0|3\\d{1,4}|4\\d{4})|131|3[23]\\d{1,4}|553|666|776)|4(?:04|1[04]\\d?|2(?:0\\d?|4)|3(?:0\\d?|2(?:\\d|\\d{4})?)|4[04]|64(?:\\d{1,2})?|99)\\d|5(?:1[25]|3(?:[16]\\d?|5)|4[45]|5[05](?:\\d{1,2})?|6(?:5|7\\d?)|93)\\d|6(?:0(?:6\\d{1,2}|70)|16\\d{4}|3[68]|43|[67]\\d{2,3})|7(?:17(?:\\d{3})?|[27]7|57\\d{2}|8(?:7\\d?|8))\\d|8(?:3[4-69]|4[01]|5[58]|8(?:0\\d?|8(?:8\\d{2}|9))|99)\\d|9(?:00|55|6(?:4\\d?|[67])|77|88|90\\d?)\\d)|777|800",
      ,
      ,
      ,
      "108"
    ], [, , "5(?:14(?:2[5-9]|[34]\\d)|757555)", , , , "5757555", , , [5, 7]], [, , "1(?:1(?:[67][0-2]\\d{3}|[89])|21|4[01]|55330|7\\d{3}|9(?:[89]|09))|5(?:3000|6161(?:17[89]|561))", , , , "53000", , , [3, 4, 5, 6, 7, 8]], , [, , "1(?:39|90[019])|5(?:14(?:2[5-9]|[34]\\d)|6161(?:17[89]|561)|757555)", , , , "51431", , , [3, 4, 5, 7, 8]]],
    IQ: [
      ,
      [, , "[1479]\\d{2,4}", , , , , , , [3, 4, 5]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "IQ",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1(?:0[04]|15|22)", , , , "122", , , [3]],
      ,
      [, , "1(?:0[04]|15|22)|4432|71117|9988", , , , "4432"],
      [, , , , , , , , , [-1]],
      [, , "4432|71117|9988", , , , "4432", , , [4, 5]],
      ,
      [, , "4432|71117|9988", , , , "4432", , , [4, 5]]
    ],
    IR: [, [, , "[0-29]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "1[129]\\d", , , , "123", , , [3]], [, , , , , , , , , [-1]], , , , "IR", , , , , , , , , , , , , , , , , , [, , "1(?:1[025]|25)|911", , , , "112", , , [3]], , [
      ,
      ,
      "096(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19])|1(?:1[0-68]|2[0-59]|3[346-8]|4(?:[0147]|[289]0)|5(?:0[14]|1[02479]|2[0-3]|39|[49]0|65)|6(?:[16]6|[27]|90)|8(?:03|1[18]|22|3[37]|4[28]|88|99)|9[0-579])|20(?:00|1(?:[038]|1[079]|26|9[69])|2[01]|90)|9(?:11|9(?:90|0009))",
      ,
      ,
      ,
      "112"
    ], [, , "(?:096|1[58])\\d{2}", , , , "09612", , , [4, 5]], [, , "1[58]\\d{2}|99(?:90|0009)", , , , "9990", , , [4, 6]], , [, , "990009", , , , "990009", , , [6]]],
    IS: [, [, , "1\\d\\d(?:\\d(?:\\d{2})?)?", , , , , , , [3, 4, 6]], , , [, , "1(?:12|71\\d)", , , , "112", , , [3, 4]], [, , , , , , , , , [-1]], , , , "IS", , , , , , , , , , , , , , , , , , [, , "112", , , , "112", , , [3]], , [, , "1(?:1(?:[28]|61(?:16|23))|4(?:00|1[145]|4[0146])|55|7(?:00|17|7[07-9])|8(?:[02]0|1[16-9]|88)|900)", , , , "112"], [, , , , , , , , , [-1]], [, , "14[04]\\d", , , , "1400", , , [4]], , [, , "1(?:41|90)\\d", , , , "1410", , , [4]]],
    IT: [, [
      ,
      ,
      "[14]\\d{2,6}",
      ,
      ,
      ,
      ,
      ,
      ,
      [3, 4, 5, 6, 7]
    ], , , [, , "1(?:1(?:[2358]|6\\d{3})|87)", , , , "112", , , [3, 6]], [, , "(?:12|4(?:[478](?:[0-4]|[5-9]\\d\\d)|55))\\d\\d", , , , "1200", , , [4, 5, 7]], , , , "IT", , , , , , , , , , , , , , , , , , [, , "11[2358]", , , , "112", , , [3]], , [, , "1(?:0\\d{2,3}|1(?:[2-57-9]|6(?:000|111))|2\\d\\d|3[39]|4(?:82|9\\d{1,3})|5(?:00|1[58]|2[25]|3[03]|44|[59])|60|8[67]|9(?:[01]|2(?:[01]\\d\\d|[2-9])|4\\d|696))|4(?:2323|(?:3(?:[01]|[45]\\d\\d)|[478](?:[0-4]|[5-9]\\d\\d))\\d\\d|5(?:045|5\\d\\d))", , , , "112"], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , [, , "4(?:3(?:[01]|[45]\\d\\d)|[478](?:[0-4]|[5-9]\\d\\d)|5[05])\\d\\d", , , , "43000", , , [5, 7]]],
    JE: [, [, , "[129]\\d\\d(?:\\d(?:\\d{2})?)?", , , , , , , [3, 4, 6]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "JE", , , , , , , , , , , , , , , , , , [, , "112|999", , , , "999", , , [3]], , [, , "1(?:00|1(?:2|8\\d{3})|23|4(?:[14]|28|7\\d)|5\\d|7(?:0[12]|[128]|35?)|808|9[0135])|23[234]|999", , , , "150"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    JM: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "JM", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "11[029]|911",
      ,
      ,
      ,
      "112"
    ], , [, , "1(?:1[029]|76)|911", , , , "911"], [, , , , , , , , , [-1]], [, , "176", , , , "176"], , [, , "176", , , , "176"]],
    JO: [, [, , "[19]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "1(?:12|9[127])|911", , , , "112", , , [3]], [, , , , , , , , , [-1]], , , , "JO", , , , , , , , , , , , , , , , , , [, , "1(?:12|9[127])|911", , , , "112", , , [3]], , [, , "1(?:09|1[0-2]|9[0-24-79])|9(?:0903|11|8788)", , , , "109"], [, , , , , , , , , [-1]], [, , "9(?:09|87)\\d\\d", , , , "90900", , , [5]], , [, , "9(?:09|87)\\d\\d", , , , "90900", , , [5]]],
    JP: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , "11[09]", , , , "110"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "JP",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[09]", , , , "110"],
      ,
      [, , "11[09]", , , , "110"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    KE: [, [, , "[1-9]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , "1(?:1(?:6|9\\d)|5(?:01|2[127]|6(?:29|6[67])))", , , , "1501"], [, , "909\\d{2}", , , , "90912", , , [5]], , , , "KE", , , , , , , , , , , , , , , , , , [, , "112|114|999", , , , "999", , , [3]], , [
      ,
      ,
      "1(?:0(?:[07-9]|1[0-25]|400)|1(?:[02456]|9[0-579])|2[123]|3[01]|4[14]|5(?:[01][01]|2[0-24-79]|33|4[05]|5[59]|6(?:00|29|6[67]))|6[035]\\d{2}|[78]\\d|9(?:[02-9]\\d{2}|19))|(?:2[0-79]|3[0-29]|4[0-4])\\d{3}|5(?:[0-7]\\d|99)\\d{2}|(?:6[2357]|7[0-29])\\d{3}|8(?:[0-9]\\d{3}|988)|9(?:09\\d{2}|99)",
      ,
      ,
      ,
      "116"
    ], [, , , , , , , , , [-1]], [, , "1(?:0400|3[01]|4[14]|5(?:1[01]|2[25])|6[35]\\d{2})|(?:2[0-79]|3[0-29]|4[0-4])\\d{3}|5(?:[0-7]\\d|99)\\d{2}|(?:6[2357]|7[0-29])\\d{3}|8(?:988|[0-9]\\d{3})|909\\d{2}", , , , "90912"], , [, , "1(?:0400|4[14]|5(?:01|55|6(?:29|6[67]))|6[035]\\d{2})|40404|8988|909\\d{2}", , , , "8988"]],
    KG: [, [, , "[14]\\d{2,3}", , , , , , , [3, 4]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "KG", , , , , , , , , , , , , , , , , , [, , "10[123]", , , , "101", , , [3]], , [, , "10[123]|4040", , , , "101"], [, , , , , , , , , [-1]], [, , "4040", , , , "4040", , , [4]], , [
      ,
      ,
      "4040",
      ,
      ,
      ,
      "4040",
      ,
      ,
      [4]
    ]],
    KH: [, [, , "[146]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "KH", , , , , , , , , , , , , , , , , , [, , "11[789]|666", , , , "117", , , [3]], , [, , "11[789]|40404|666", , , , "117"], [, , , , , , , , , [-1]], [, , "40404", , , , "40404", , , [5]], , [, , "40404", , , , "40404", , , [5]]],
    KI: [
      ,
      [, , "[179]\\d{2,3}", , , , , , , [3, 4]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "KI",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "19[2-5]|99[2349]", , , , "192", , , [3]],
      ,
      [, , "1(?:0(?:[0-8]|5[01259])|88|9[2-5])|777|99[2349]", , , , "100"],
      [, , "103", , , , "103", , , [3]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    KM: [, [, , "1\\d", , , , , , , [2]], , , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], , , , "KM", , , , , , , , , , , , , , , , , , [, , "1[78]", , , , "17"], , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    KN: [, [, , "[39]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "KN", , , , , , , , , , , , , , , , , , [, , "333|9(?:11|99)", , , , "999"], , [, , "333|9(?:11|99)", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    KP: [, [, , "[18]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "KP", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "1(?:12|19)|819",
      ,
      ,
      ,
      "112"
    ], , [, , "1(?:12|19)|819", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    KR: [, [, , "1\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , "1(?:1[78]|28|330|82)", , , , "118", , , [3, 4]], [, , , , , , , , , [-1]], , , , "KR", , , , , , , , , , , , , , , , , , [, , "11[29]", , , , "112", , , [3]], , [, , "1(?:0(?:[01]|114)|1(?:[0247-9]|114)|2[01389]|3(?:2|3[039]|45|66|88|9[18])|[679]114|8(?:114|2))", , , , "112"], [, , , , , , , , , [-1]], [, , "1(?:0(?:[01]|114)|1(?:114|4)|[6-9]114)", , , , "100", , , [3, 5]], , [, , , , , , , , , [-1]]],
    KW: [, [, , "[18]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [
      ,
      ,
      "112",
      ,
      ,
      ,
      "112",
      ,
      ,
      [3]
    ], [, , , , , , , , , [-1]], , , , "KW", , , , , , , , , , , , , , , , , , [, , "112", , , , "112", , , [3]], , [, , "1[0-7]\\d|89887", , , , "100"], [, , , , , , , , , [-1]], [, , "898\\d\\d", , , , "89800", , , [5]], , [, , , , , , , , , [-1]]],
    KY: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "KY", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    KZ: [, [, , "[134]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "KZ", , , , , , , , , , , , , , , , , , [, , "1(?:0[123]|12)", , , , "112", , , [3]], , [
      ,
      ,
      "1(?:0[1-4]|12)|30400|4040",
      ,
      ,
      ,
      "112"
    ], [, , , , , , , , , [-1]], [, , "30400|4040", , , , "30400", , , [4, 5]], , [, , "30400|4040", , , , "30400", , , [4, 5]]],
    LA: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "LA", , , , , , , , , , , , , , , , , , [, , "19[015]", , , , "190"], , [, , "19[015]", , , , "190"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    LB: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , "1(?:12|40|75)|999", , , , "112"], [, , , , , , , , , [-1]], , , , "LB", , , , , , , , , , , , , , , , , , [, , "1(?:12|40|75)|999", , , , "112"], , [, , "1(?:12|40|75)|999", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    LC: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "LC", , , , , , , , , , , , , , , , , , [, , "9(?:11|99)", , , , "911"], , [, , "9(?:11|99)", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    LI: [, [, , "1\\d{2,3}", , , , , , , [3, 4]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "LI", , , , , , , , , , , , , , , , , , [, , "1(?:1[278]|44)", , , , "112", , , [3]], , [, , "1(?:1(?:[278]|45)|4[3-57]|50|75|81[18])", , , , "1145"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    LK: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "LK",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[02689]", , , , "119"],
      ,
      [, , "11[024-9]", , , , "119"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    LR: [, [, , "[3489]\\d{2,3}", , , , , , , [3, 4]], , , [, , "355|911", , , , "355", , , [3]], [, , , , , , , , , [-1]], , , , "LR", , , , , , , , , , , , , , , , , , [, , "355|911", , , , "355", , , [3]], , [, , "355|4040|8(?:400|933)|911", , , , "355"], [, , , , , , , , , [-1]], [, , "(?:404|8(?:40|93))\\d", , , , "4040", , , [4]], , [, , "(?:404|8(?:40|93))\\d", , , , "4040", , , [4]]],
    LS: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , "11[257]", , , , "112"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "LS",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[257]", , , , "112"],
      ,
      [, , "11[257]", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    LT: [, [, , "[01]\\d(?:\\d(?:\\d{3})?)?", , , , , , , [2, 3, 6]], , , [, , "116\\d{3}", , , , "116000", , , [6]], [, , , , , , , , , [-1]], , , , "LT", , , , , , , , , , , , , , , , , , [, , "0(?:11?|22?|33?)|1(?:0[123]|12)", , , , "112", , , [2, 3]], , [, , "0(?:11?|22?|33?)|1(?:0[123]|1(?:2|6(?:000|1(?:11|23))))", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    LU: [
      ,
      [, , "1\\d{2,5}", , , , , , , [3, 4, 5, 6]],
      ,
      ,
      [, , "116\\d{3}", , , , "116000", , , [6]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "LU",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[23]", , , , "112", , , [3]],
      ,
      [, , "1(?:1(?:[23]|6(?:000|111)|8\\d{2})|[25]\\d{3}|3\\d{2})", , , , "12123"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    LV: [
      ,
      [, , "[018]\\d{1,5}", , , , , , , [2, 3, 4, 5, 6]],
      ,
      ,
      [, , "0[1-3]|11(?:[023]|6\\d{3})", , , , "01", , , [2, 3, 6]],
      [, , "1180|821\\d\\d", , , , "1180", , , [4, 5]],
      ,
      ,
      ,
      "LV",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "0[1-3]|11[023]", , , , "01", , , [2, 3]],
      ,
      [, , "0[1-4]|1(?:1(?:[02-4]|6(?:000|111)|8[0189])|(?:5|65)5|77)|821[57]4", , , , "01"],
      [, , "1181", , , , "1181", , , [4]],
      [, , "165\\d", , , , "1650", , , [4]],
      ,
      [, , , , , , , , , [-1]]
    ],
    LY: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "LY", , , , , , , , , , , , , , , , , , [, , "19[013]", , , , "193"], , [, , "19[013]", , , , "193"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MA: [, [, , "1\\d\\d?", , , , , , , [2, 3]], , , [, , "1(?:[59]|77)", , , , "15"], [, , , , , , , , , [-1]], , , , "MA", , , , , , , , , , , , , , , , , , [, , "1(?:[59]|77)", , , , "15"], , [, , "1(?:[59]|77)", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MC: [
      ,
      [, , "1\\d\\d?", , , , , , , [2, 3]],
      ,
      ,
      [, , "1(?:12|[578])", , , , "15"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "MC",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1(?:12|[578])", , , , "15"],
      ,
      [, , "1(?:12|41|[578])", , , , "15"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    MD: [, [, , "[19]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "11(?:2|6\\d{3})|90[1-3]", , , , "112", , , [3, 6]], [, , , , , , , , , [-1]], , , , "MD", , , , , , , , , , , , , , , , , , [, , "112|90[1-3]", , , , "112", , , [3]], , [, , "1(?:1(?:2|6(?:000|1(?:11|23))|8\\d\\d?|99)|(?:4\\d\\d|6[0-389])\\d|9(?:0[04-9]|[1-4]\\d))|90[1-3]", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    ME: [
      ,
      [, , "1\\d{2,5}", , , , , , , [3, 4, 5, 6]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "ME",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1(?:12|2[234])", , , , "112", , , [3]],
      ,
      [, , "1(?:[03]\\d{2}|1(?:[013-57-9]\\d|2|6\\d{3})|2\\d{1,3}|4\\d{2,3}|5(?:\\d{2}|999)|60[06]|700|8(?:0[089]|1[0-8]|888)|9\\d{3})", , , , "1011"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    MF: [, [, , "1\\d", , , , , , , [2]], , , [, , "1[578]", , , , "15"], [, , , , , , , , , [-1]], , , , "MF", , , , , , , , , , , , , , , , , , [, , "1[578]", , , , "15"], , [, , "1[578]", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MG: [, [, , "1\\d\\d?", , , , , , , [2, 3]], , , [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , , , "MG", , , , , , , , , , , , , , , , , , [, , "11?[78]", , , , "117"], , [, , "11?[78]", , , , "117"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MH: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , "911", , , , "911"], [, , , , , , , , , [-1]], , , , "MH", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MK: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "MK", , , , , , , , , , , , , , , , , , [, , "1(?:12|9[234])", , , , "112"], , [, , "1(?:12|9[234])", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    ML: [, [, , "[136-8]\\d{1,4}", , , , , , , [2, 3, 4, 5]], , , [, , "35200|67(?:00|77)|74(?:02|44)|8000[12]", , , , "35200", , , [4, 5]], [, , "122[13]|3(?:52(?:11|2[02]|3[04-6]|99)|7574)|8002[12]", , , , "35211", , , [4, 5]], , , , "ML", , , , , , , , , , , , , , , , , , [, , "1[578]", , , , "17", , , [2]], , [, , "1(?:1(?:2|[013-9]\\d)|2(?:1[02-469]|2[13])|[578])|3(?:5(?:0(?:35|57)|2\\d{2})|[67]\\d{3})|67(?:0[09]|59|77|8[89]|99)|74(?:0[02]|44|55)|800[012][12]", , , , "1210"], [, , "37(?:433|575)|7400|8001[12]", , , , "7400", , , [4, 5]], [
      ,
      ,
      "3(?:5035|[67]\\d{3})|800[012][12]",
      ,
      ,
      ,
      "35035",
      ,
      ,
      [5]
    ], , [, , "3(?:6\\d{3}|7(?:4(?:0[24-9]|[1-9]\\d)|5\\d{2}))|7400", , , , "37575", , , [4, 5]]],
    MM: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "MM", , , , , , , , , , , , , , , , , , [, , "199", , , , "199"], , [, , "199", , , , "199"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MN: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "MN", , , , , , , , , , , , , , , , , , [, , "10[0-3]", , , , "102"], , [, , "10[0-3]", , , , "102"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MO: [, [, , "9\\d\\d", , , , , , , [3]], , , [
      ,
      ,
      "999",
      ,
      ,
      ,
      "999"
    ], [, , , , , , , , , [-1]], , , , "MO", , , , , , , , , , , , , , , , , , [, , "999", , , , "999"], , [, , "999", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MP: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "MP", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MQ: [, [, , "1\\d\\d?", , , , , , , [2, 3]], , , [, , "1(?:12|[578])", , , , "15"], [, , , , , , , , , [-1]], , , , "MQ", , , , , , , , , , , , , , , , , , [, , "1(?:12|[578])", , , , "15"], , [, , "1(?:12|[578])", , , , "15"], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , [, , , , , , , , , [-1]]],
    MR: [, [, , "1\\d", , , , , , , [2]], , , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], , , , "MR", , , , , , , , , , , , , , , , , , [, , "1[78]", , , , "17"], , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MS: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "MS", , , , , , , , , , , , , , , , , , [, , "9(?:11|99)", , , , "911"], , [, , "9(?:11|99)", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MT: [
      ,
      [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]],
      ,
      ,
      [, , "11(?:2|6\\d{3})", , , , "112"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "MT",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "112", , , , "112", , , [3]],
      ,
      [, , "11(?:2|6(?:000|1(?:11|23)))", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    MU: [, [, , "[189]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "MU", , , , , , , , , , , , , , , , , , [, , "11[45]|99[59]", , , , "999", , , [3]], , [, , "1\\d{2,4}|8\\d{3}|99\\d", , , , "995"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    MV: [
      ,
      [, , "[14]\\d{2,3}", , , , , , , [3, 4]],
      ,
      ,
      [, , "1(?:02|1[89])", , , , "102", , , [3]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "MV",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1(?:02|1[89])", , , , "102", , , [3]],
      ,
      [, , "1(?:[0-37-9]|[4-6]\\d)\\d|4040|1[45]1", , , , "100"],
      [, , , , , , , , , [-1]],
      [, , "1[45]1", , , , "141", , , [3]],
      ,
      [, , , , , , , , , [-1]]
    ],
    MW: [, [, , "[189]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "199|99[7-9]", , , , "199", , , [3]], [, , , , , , , , , [-1]], , , , "MW", , , , , , , , , , , , , , , , , , [, , "199|99[7-9]", , , , "199", , , [3]], , [, , "199|80400|99[7-9]", , , , "199"], [, , , , , , , , , [-1]], [, , "804\\d\\d", , , , "80400", , , [5]], , [, , "804\\d\\d", , , , "80400", , , [5]]],
    MX: [
      ,
      [, , "[0579]\\d{2,4}", , , , , , , [3, 4, 5]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , "53053|7766", , , , "7766", , , [4, 5]],
      ,
      ,
      ,
      "MX",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "0(?:6[0568]|80)|911", , , , "066", , , [3]],
      ,
      [, , "0(?:[249]0|3[01]|5[015]|6[01568]|7[0-578]|8[089])|53053|7766|911", , , , "030"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    MY: [, [, , "[1369]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "MY", , , , , , , , , , , , , , , , , , [, , "112|999", , , , "999", , , [3]], , [
      ,
      ,
      "1(?:0(?:[01348]|[569]\\d)|1(?:[02]|1[128]|311)|2(?:0[125]|[13-6]|2\\d{0,2})|3(?:09\\d|[1-39]\\d{1,2}|6|[5-7]\\d{0,2})|5(?:[12]\\d|454|5\\d{1,2}|77|888|999?)|7(?:[136-9]\\d|[45]\\d{1,2})|8(?:18?|2|8[18])|9(?:[03]\\d|[124]\\d?|68|71|9[0679]))|3[23679]\\d{3}|66628|99[1-469]",
      ,
      ,
      ,
      "999"
    ], [, , "66628", , , , "66628", , , [5]], [, , , , , , , , , [-1]], , [, , "3[23679]\\d{3}|66628", , , , "36000", , , [5]]],
    MZ: [, [, , "1\\d{2,3}", , , , , , , [3, 4]], , , [, , "1(?:1[79]|9[78])", , , , "117", , , [3]], [, , , , , , , , , [-1]], , , , "MZ", , , , , , , , , , , , , , , , , , [, , "1(?:1[79]|9[78])", , , , "117", , , [3]], , [, , "1(?:[02-5]\\d\\d|1[79]|9[78])", , , , "117"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NA: [, [, , "[19]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , "10111", , , , "10111", , , [5]], [, , , , , , , , , [-1]], , , , "NA", , , , , , , , , , , , , , , , , , [, , "10111", , , , "10111", , , [5]], , [
      ,
      ,
      "(?:10|93)111|(?:1\\d|9)\\d\\d",
      ,
      ,
      ,
      "900"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NC: [, [, , "[135]\\d{1,3}", , , , , , , [2, 3, 4]], , , [, , "1(?:0(?:00|1[23]|3[0-2]|8\\d)|[5-8])|363\\d|577", , , , "15"], [, , , , , , , , , [-1]], , , , "NC", , , , , , , , , , , , , , , , , , [, , "1[5-8]", , , , "15", , , [2]], , [, , "1(?:0(?:0[06]|1[02-46]|20|3[0-25]|42|5[058]|77|88)|[5-8])|3631|5[6-8]\\d", , , , "15"], [, , "5(?:67|88)", , , , "567", , , [3]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NE: [, [, , "[1-3578]\\d(?:\\d(?:\\d{3})?)?", , , , , , , [2, 3, 6]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "NE", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "1[578]|723141",
      ,
      ,
      ,
      "17",
      ,
      ,
      [2, 6]
    ], , [, , "1(?:0[01]|1[12]|2[034]|3[013]|40|55?|60|7|8)|222|333|555|723141|888", , , , "112"], [, , , , , , , , , [-1]], [, , "1(?:0[01]|1[12]|2[034]|3[013]|40|55|60)|222|333|555|888", , , , "100", , , [3]], , [, , , , , , , , , [-1]]],
    NF: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "NF", , , , , , , , , , , , , , , , , , [, , "9(?:11|55|77)", , , , "911"], , [, , "9(?:11|55|77)", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NG: [
      ,
      [, , "[14]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "NG",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "199", , , , "199", , , [3]],
      ,
      [, , "199|40700", , , , "199"],
      [, , , , , , , , , [-1]],
      [, , "40700", , , , "40700", , , [5]],
      ,
      [, , "40700", , , , "40700", , , [5]]
    ],
    NI: [, [, , "[12467]\\d{2,3}", , , , , , , [3, 4]], , , [, , "1(?:1[58]|2[08])|737\\d", , , , "115"], [, , , , , , , , , [-1]], , , , "NI", , , , , , , , , , , , , , , , , , [, , "1(?:1[58]|2[08])", , , , "115", , , [3]], , [, , "1(?:1[58]|[29]00)|[26]100|4878|7(?:(?:01|10)0|373)|12[0158]", , , , "115"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NL: [, [, , "[1349]\\d\\d(?:\\d(?:\\d{2})?)?", , , , , , , [3, 4, 6]], , , [
      ,
      ,
      "11(?:2|6\\d{3})|911",
      ,
      ,
      ,
      "112",
      ,
      ,
      [3, 6]
    ], [, , , , , , , , , [-1]], , , , "NL", , , , , , , , , , , , , , , , , , [, , "112|911", , , , "112", , , [3]], , [, , "1(?:1(?:2|6(?:00[06]|1(?:11|23)))|2(?:0[0-4]|3[34]|44)|3[03-9]\\d|400|8(?:[02-9]\\d|1[0-79]))|[34]000|911", , , , "112"], [, , , , , , , , , [-1]], [, , "120\\d", , , , "1200", , , [4]], , [, , "[34]00\\d", , , , "3000", , , [4]]],
    NO: [, [, , "1\\d\\d(?:\\d(?:\\d{2})?)?", , , , , , , [3, 4, 6]], , , [, , "1161(?:1[17]|23)", , , , "116117", , , [6]], [, , , , , , , , , [-1]], , , , "NO", , , , , , , , , , , , , , , , , , [, , "11[023]", , , , "112", , , [3]], , [
      ,
      ,
      "1(?:1(?:[0239]|61(?:1[17]|23))|2[048]|4(?:12|[59])|7[57]|90)",
      ,
      ,
      ,
      "112"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NP: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "NP", , , , , , , , , , , , , , , , , , [, , "1(?:0[0-3]|12)", , , , "112"], , [, , "1(?:0[0-3]|12)", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NR: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "11[0-2]", , , , "110"], [, , , , , , , , , [-1]], , , , "NR", , , , , , , , , , , , , , , , , , [, , "11[0-2]", , , , "110"], , [, , "1(?:1[0-2]|23|92)", , , , "110"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    NU: [, [, , "[019]\\d\\d", , , , , , , [3]], , , [
      ,
      ,
      "999",
      ,
      ,
      ,
      "999"
    ], [, , , , , , , , , [-1]], , , , "NU", , , , , , , , , , , , , , , , , , [, , "999", , , , "999"], , [, , "01[05]|101|999", , , , "010"], [, , , , , , , , , [-1]], [, , "010", , , , "010"], , [, , , , , , , , , [-1]]],
    NZ: [, [, , "\\d{3,4}", , , , , , , [3, 4]], , , [, , , , , , , , , [-1]], [, , "018", , , , "018", , , [3]], , , , "NZ", , , , , , , , , , , , , , , , , , [, , "111", , , , "111", , , [3]], , [, , "018|1(?:11|234|371|7[03]7|944)|[2-57-9]\\d{2,3}|6(?:161|26[0-3]|742)", , , , "111"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "018|1(?:234|371|7[03]7|944)|[2-57-9]\\d{2,3}|6(?:161|26[0-3]|742)", , , , "4098"]],
    OM: [, [
      ,
      ,
      "9\\d{3}",
      ,
      ,
      ,
      ,
      ,
      ,
      [4]
    ], , , [, , "999\\d", , , , "9990"], [, , , , , , , , , [-1]], , , , "OM", , , , , , , , , , , , , , , , , , [, , "999\\d", , , , "9990"], , [, , "9999", , , , "9999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    PA: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , "911", , , , "911"], [, , , , , , , , , [-1]], , , , "PA", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "10[2-4]|911", , , , "102"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    PE: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "PE",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1(?:05|1[67])", , , , "105"],
      ,
      [, , "1(?:05|1[67])", , , , "105"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    PF: [, [, , "1\\d", , , , , , , [2]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "PF", , , , , , , , , , , , , , , , , , [, , "1[578]", , , , "15"], , [, , "1[578]", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    PG: [, [, , "[01]\\d{2,6}", , , , , , , [3, 4, 5, 6, 7]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "PG", , , , , , , , , , , , , , , , , , [, , "000|11[01]", , , , "000", , , [3]], , [, , "000|1(?:1[01]|5\\d{2}|6\\d{2,5})", , , , "000"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "16\\d{2,5}", , , , "1612", , , [4, 5, 6, 7]]],
    PH: [, [
      ,
      ,
      "[19]\\d\\d",
      ,
      ,
      ,
      ,
      ,
      ,
      [3]
    ], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "PH", , , , , , , , , , , , , , , , , , [, , "11[27]|911", , , , "117"], , [, , "11[27]|911", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    PK: [, [, , "1\\d{1,3}", , , , , , , [2, 3, 4]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "PK", , , , , , , , , , , , , , , , , , [, , "1(?:1(?:22?|5)|[56])", , , , "112"], , [, , "1(?:1(?:22?|5)|[56])", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    PL: [
      ,
      [, , "[19]\\d\\d(?:\\d{2,3})?", , , , , , , [3, 5, 6]],
      ,
      ,
      [, , "116\\d{3}", , , , "116000", , , [6]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "PL",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "112|99[789]", , , , "112", , , [3]],
      ,
      [, , "1(?:1(?:2|6(?:000|1(?:11|23))|8(?:000|91[23]))|9\\d{3})|9(?:8[4-7]|9[1-9])", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    PM: [, [, , "[13]\\d(?:\\d{2})?", , , , , , , [2, 4]], , , [, , "1[578]", , , , "15", , , [2]], [, , , , , , , , , [-1]], , , , "PM", , , , , , , , , , , , , , , , , , [, , "1[578]", , , , "15", , , [2]], , [, , "1[578]|3103", , , , "15"], [, , , , , , , , , [-1]], [, , "310\\d", , , , "3100", , , [4]], , [, , , , , , , , , [-1]]],
    PR: [
      ,
      [, , "9\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "PR",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "911", , , , "911"],
      ,
      [, , "911", , , , "911"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    PS: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "166", , , , "166"], [, , , , , , , , , [-1]], , , , "PS", , , , , , , , , , , , , , , , , , [, , "10[0-2]", , , , "100"], , [, , "1(?:0[0-2]|44|66|99)", , , , "199"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    PT: [, [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]], , , [, , "11(?:[25]|6\\d{3})", , , , "112"], [, , , , , , , , , [-1]], , , , "PT", , , , , , , , , , , , , , , , , , [, , "11[25]", , , , "112", , , [3]], , [, , "11(?:[2578]|6(?:000|111))", , , , "112"], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , [, , , , , , , , , [-1]]],
    PW: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , "911", , , , "911"], [, , , , , , , , , [-1]], , , , "PW", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    PY: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "PY", , , , , , , , , , , , , , , , , , [, , "128|911", , , , "911"], , [, , "1[1-4]\\d|911", , , , "123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    QA: [
      ,
      [, , "[129]\\d{2,4}", , , , , , , [3, 4, 5]],
      ,
      ,
      [, , "999", , , , "999", , , [3]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "QA",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "999", , , , "999", , , [3]],
      ,
      [, , "(?:1|20)\\d\\d|9(?:[27]\\d{3}|99)", , , , "100"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    RE: [, [, , "1\\d\\d?", , , , , , , [2, 3]], , , [, , "1(?:12|[578])", , , , "15"], [, , , , , , , , , [-1]], , , , "RE", , , , , , , , , , , , , , , , , , [, , "1(?:12|[578])", , , , "15"], , [, , "1(?:12|[578])", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    RO: [
      ,
      [, , "[18]\\d\\d(?:\\d(?:\\d{2})?)?", , , , , , , [3, 4, 6]],
      ,
      ,
      [, , "11(?:2|6\\d{3})", , , , "112", , , [3, 6]],
      [, , "(?:1(?:18\\d|[24])|8[48])\\d\\d", , , , "1200", , , [4, 6]],
      ,
      ,
      ,
      "RO",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "112", , , , "112", , , [3]],
      ,
      [, , "1(?:1(?:2|6(?:000|111)|8(?:300|932))|[24]\\d\\d|9(?:21|3[02]|5[178]))|8[48]\\d\\d", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , "(?:1[24]|8[48])\\d\\d", , , , "1200", , , [4]]
    ],
    RS: [, [, , "[19]\\d{1,5}", , , , , , , [2, 3, 4, 5, 6]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "RS", , , , , , , , , , , , , , , , , , [, , "112|9[234]", , , , "112", , , [2, 3]], , [, , "1[189]\\d{1,4}|9[234]", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    RU: [, [, , "[01]\\d\\d?", , , , , , , [2, 3]], , , [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , , , "RU", , , , , , , , , , , , , , , , , , [, , "0[1-3]|1(?:0[1-3]|12)", , , , "112"], , [, , "0[1-4]|1(?:0[1-4]|12)", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    RW: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "112", , , , "112"], [, , , , , , , , , [-1]], , , , "RW", , , , , , , , , , , , , , , , , , [, , "112", , , , "112"], , [, , "112", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SA: [, [, , "[19]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "116111|937|998", , , , "116111", , , [3, 6]], [, , , , , , , , , [-1]], , , , "SA", , , , , , , , , , , , , , , , , , [
      ,
      ,
      "112|9(?:11|9[79])",
      ,
      ,
      ,
      "999",
      ,
      ,
      [3]
    ], , [, , "1(?:1(?:00|2|6111)|410|9(?:00|1[89]|9(?:099|22|91)))|9(?:0[24-79]|11|3[379]|40|66|8[5-9]|9[02-9])", , , , "937"], [, , "1410", , , , "1410", , , [4]], [, , "1(?:100|410)|90[24679]", , , , "902", , , [3, 4]], , [, , , , , , , , , [-1]]],
    SB: [, [, , "[127-9]\\d\\d", , , , , , , [3]], , , [, , "999", , , , "999"], [, , , , , , , , , [-1]], , , , "SB", , , , , , , , , , , , , , , , , , [, , "999", , , , "999"], , [, , "1(?:[02]\\d|1[12]|[35][01]|[49][1-9]|6[2-9]|7[7-9]|8[0-8])|269|777|835|9(?:[01]1|22|33|55|77|88|99)", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SC: [, [
      ,
      ,
      "[19]\\d{2,3}",
      ,
      ,
      ,
      ,
      ,
      ,
      [3, 4]
    ], , , [, , "999", , , , "999", , , [3]], [, , , , , , , , , [-1]], , , , "SC", , , , , , , , , , , , , , , , , , [, , "999", , , , "999", , , [3]], , [, , "1(?:0\\d|1[027]|2[0-8]|3[13]|4[0-2]|[59][15]|6[1-9]|7[124-6]|8[158])|9(?:6\\d\\d|99)", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SD: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "SD", , , , , , , , , , , , , , , , , , [, , "999", , , , "999"], , [, , "999", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SE: [, [, , "[1-37-9]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [
      ,
      ,
      "116\\d{3}",
      ,
      ,
      ,
      "116000",
      ,
      ,
      [6]
    ], [, , "11811[89]|72\\d{3}", , , , "118118", , , [5, 6]], , , , "SE", , , , , , , , , , , , , , , , , , [, , "112|90000", , , , "112", , , [3, 5]], , [, , "11(?:[25]|313|4\\d{2}|6(?:00[06]|11[17]|123)|7[0-8]|8(?:1(?:[02-9]\\d|1[013-9])|[02-46-9]\\d{2}))|2(?:2[02358]|33|4[01]|50|6[1-4])|32[13]|7\\d{4}|8(?:22|88)|9(?:0(?:000|1(?:[02-9]\\d|1[013-9])|[2-4]\\d{2}|510)|12)", , , , "11313"], [, , , , , , , , , [-1]], [, , "2(?:2[02358]|33|4[01]|50|6[1-4])|32[13]|8(?:22|88)|912", , , , "222", , , [3]], , [, , "7\\d{4}", , , , "72123", , , [5]]],
    SG: [, [
      ,
      ,
      "[179]\\d{2,4}",
      ,
      ,
      ,
      ,
      ,
      ,
      [3, 4, 5]
    ], , , [, , "99[359]", , , , "993", , , [3]], [, , , , , , , , , [-1]], , , , "SG", , , , , , , , , , , , , , , , , , [, , "99[359]", , , , "993", , , [3]], , [, , "1(?:[0136]\\d\\d|[57]\\d{2,3}|[89](?:0[1-9]|[1-9]\\d))|77222|99[02-9]", , , , "990"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , "772\\d\\d", , , , "77200", , , [5]]],
    SH: [, [, , "[19]\\d{2,3}", , , , , , , [3, 4]], , , [, , "9(?:11|99)", , , , "911", , , [3]], [, , , , , , , , , [-1]], , , , "SH", , , , , , , , , , , , , , , , , , [, , "9(?:11|99)", , , , "911", , , [3]], , [, , "1\\d{2,3}|9(?:11|99)", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SI: [
      ,
      [, , "1\\d\\d(?:\\d{3})?", , , , , , , [3, 6]],
      ,
      ,
      [, , "116(?:000|1(?:11|23))", , , , "116000", , , [6]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "SI",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[23]", , , , "112", , , [3]],
      ,
      [, , "11(?:[23]|6(?:000|1(?:11|23)))", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    SJ: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "SJ", , , , , , , , , , , , , , , , , , [, , "11[023]", , , , "112"], , [, , "11[023]", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SK: [, [, , "1\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [
      ,
      ,
      "1(?:1(?:2|6\\d{3})|5[058])",
      ,
      ,
      ,
      "112",
      ,
      ,
      [3, 6]
    ], [, , , , , , , , , [-1]], , , , "SK", , , , , , , , , , , , , , , , , , [, , "1(?:12|5[058])", , , , "112", , , [3]], , [, , "1(?:1(?:2|6(?:000|111)|8[0-8])|[248]\\d{3}|5[0589])", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SL: [, [, , "[069]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "SL", , , , , , , , , , , , , , , , , , [, , "(?:01|99)9", , , , "999", , , [3]], , [, , "(?:01|99)9|60400", , , , "999"], [, , , , , , , , , [-1]], [, , "60400", , , , "60400", , , [5]], , [, , "60400", , , , "60400", , , [5]]],
    SM: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "SM",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[358]", , , , "113"],
      ,
      [, , "11[358]", , , , "113"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    SN: [, [, , "[12]\\d{1,5}", , , , , , , [2, 3, 4, 5, 6]], , , [, , "1(?:515|[78])|2(?:00|1)\\d{3}", , , , "17", , , [2, 4, 5, 6]], [, , "2(?:0[246]|[468])\\d{3}", , , , "24000", , , [5, 6]], , , , "SN", , , , , , , , , , , , , , , , , , [, , "1[78]", , , , "17", , , [2]], , [, , "1(?:1[69]|(?:[246]\\d|51)\\d)|2(?:0[0-246]|[12468])\\d{3}|1[278]", , , , "12"], [, , "2(?:01|2)\\d{3}", , , , "22000", , , [5, 6]], [, , "1[46]\\d\\d", , , , "1400", , , [4]], , [
      ,
      ,
      "2[468]\\d{3}",
      ,
      ,
      ,
      "24000",
      ,
      ,
      [5]
    ]],
    SO: [, [, , "[57-9]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "SO", , , , , , , , , , , , , , , , , , [, , "555|888|999", , , , "555"], , [, , "555|777|888|999", , , , "777"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SR: [, [, , "1\\d{2,3}", , , , , , , [3, 4]], , , [, , "115", , , , "115", , , [3]], [, , , , , , , , , [-1]], , , , "SR", , , , , , , , , , , , , , , , , , [, , "115", , , , "115", , , [3]], , [, , "1\\d{2,3}", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    ST: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , "112", , , , "112"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "ST",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "112", , , , "112"],
      ,
      [, , "112", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    SV: [, [, , "[49]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "911", , , , "911", , , [3]], [, , , , , , , , , [-1]], , , , "SV", , , , , , , , , , , , , , , , , , [, , "911", , , , "911", , , [3]], , [, , "40404|911", , , , "911"], [, , , , , , , , , [-1]], [, , "404\\d\\d", , , , "40400", , , [5]], , [, , "404\\d\\d", , , , "40400", , , [5]]],
    SX: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "SX", , , , , , , , , , , , , , , , , , [, , "919", , , , "919"], , [, , "919", , , , "919"], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , [, , , , , , , , , [-1]]],
    SY: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "SY", , , , , , , , , , , , , , , , , , [, , "11[023]", , , , "112"], , [, , "11[023]", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    SZ: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , "999", , , , "999"], [, , , , , , , , , [-1]], , , , "SZ", , , , , , , , , , , , , , , , , , [, , "999", , , , "999"], , [, , "999", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TC: [
      ,
      [, , "9\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "TC",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "9(?:11|99)", , , , "911"],
      ,
      [, , "9(?:11|99)", , , , "911"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    TD: [, [, , "1\\d", , , , , , , [2]], , , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], , , , "TD", , , , , , , , , , , , , , , , , , [, , "1[78]", , , , "17"], , [, , "1[78]", , , , "17"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TG: [, [, , "1\\d{2,3}", , , , , , , [3, 4]], , , [, , "1(?:1[78]|7[127])", , , , "117", , , [3]], [, , , , , , , , , [-1]], , , , "TG", , , , , , , , , , , , , , , , , , [, , "1(?:1[78]|7[127])", , , , "117", , , [3]], , [, , "1(?:011|1[078]|7[127])", , , , "110"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TH: [
      ,
      [, , "1\\d{2,3}", , , , , , , [3, 4]],
      ,
      ,
      [, , "1(?:1(?:00|2[03]|3[3479]|55|7[67]|9[0246])|5(?:55|78)|6(?:44|6[79]|88|9[16])|88\\d|9[19])", , , , "191"],
      [, , "1(?:113|2[23]\\d|5(?:09|56))", , , , "1113", , , [4]],
      ,
      ,
      ,
      "TH",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "1(?:669|9[19])", , , , "191"],
      ,
      [
        ,
        ,
        "1(?:0[0-2]|1(?:0[03]|1[1-35]|2[0358]|3[03-79]|4[02-489]|5[04-9]|6[04-79]|7[03-9]|8[027-9]|9[02-79])|2(?:22|3[89])|3(?:18|2[23]|3[013]|5[56]|6[45]|73)|477|5(?:0\\d|4[0-37-9]|5[1-8]|6[01679]|7[12568]|8[0-24589]|9[013589])|6(?:0[0-29]|2[03]|4[3-6]|6[1-9]|7[0257-9]|8[0158]|9[014-9])|7(?:19|7[27]|90)|888|9[19])",
        ,
        ,
        ,
        "100"
      ],
      [, , "1(?:1(?:03|1[15]|2[58]|3[056]|4[02-49]|5[046-9]|[68]\\d|7[03-589]|9[579])|(?:3[1-35]|7[17])\\d|5(?:0[0-8]|4[0-378]|5[1-478]|[689]\\d|7[156])|6(?:0\\d|20|4[356]|6[1-68]|7[057-9]|8[015]|9[0457-9]))", , , , "1103", , , [4]],
      [, , "114\\d", , , , "1140", , , [4]],
      ,
      [, , , , , , , , , [-1]]
    ],
    TJ: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "TJ", , , , , , , , , , , , , , , , , , [, , "1(?:0[1-3]|12)", , , , "112"], , [, , "1(?:0[1-3]|12)", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TL: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , "11[25]", , , , "112"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "TL",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[25]", , , , "112"],
      ,
      [, , "1(?:0[02]|1[25]|2[0138]|72|9[07])", , , , "100"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    TM: [, [, , "0\\d", , , , , , , [2]], , , [, , "0[1-3]", , , , "01"], [, , , , , , , , , [-1]], , , , "TM", , , , , , , , , , , , , , , , , , [, , "0[1-3]", , , , "01"], , [, , "0[1-3]", , , , "01"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TN: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "19[078]", , , , "190"], [, , , , , , , , , [-1]], , , , "TN", , , , , , , , , , , , , , , , , , [, , "19[078]", , , , "190"], , [
      ,
      ,
      "19[078]",
      ,
      ,
      ,
      "190"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TO: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , "9(?:11|22|33|99)", , , , "911"], [, , , , , , , , , [-1]], , , , "TO", , , , , , , , , , , , , , , , , , [, , "9(?:11|22|33|99)", , , , "911"], , [, , "9(?:11|22|33|99)", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TR: [, [, , "[1-9]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , "1(?:22|3[126]|4[04]|5[16-9]|6[18]|77|83)", , , , "183", , , [3]], [, , , , , , , , , [-1]], , , , "TR", , , , , , , , , , , , , , , , , , [, , "1(?:1[02]|55)", , , , "112", , , [3]], , [
      ,
      ,
      "1(?:1(?:[0239]|811)|2[126]|3(?:[126]|37?|[58]6|65)|4(?:[014]|71)|5(?:[135-9]|07|78)|6(?:[02]6|[1389]|99)|7[0-79]|8(?:\\d|63|95))|2(?:077|268|4(?:17|23)|5(?:7[26]|82)|6[14]4|8\\d{2}|9(?:30|89))|3(?:0(?:05|72)|353|4(?:06|30|64)|502|674|747|851|9(?:1[29]|60))|4(?:0(?:25|3[12]|[47]2)|3(?:3[13]|[89]1)|439|5(?:43|55)|717|832)|5(?:145|290|[4-6]\\d{2}|772|833|9(?:[06]1|92))|6(?:236|6(?:12|39|8[59])|769)|7890|8(?:688|7(?:28|65)|85[06])|9(?:159|290)",
      ,
      ,
      ,
      "112"
    ], [, , "2850|5420", , , , "5420", , , [4]], [, , , , , , , , , [-1]], , [, , "1(?:3(?:37|[58]6|65)|4(?:4|71)|5(?:07|78)|6(?:[02]6|99)|8(?:3|63|95))|2(?:077|268|4(?:17|23)|5(?:7[26]|82)|6[14]4|8\\d{2}|9(?:30|89))|3(?:0(?:05|72)|353|4(?:06|30|64)|502|674|747|851|9(?:1[29]|60))|4(?:0(?:25|3[12]|[47]2)|3(?:3[13]|[89]1)|439|5(?:43|55)|717|832)|5(?:145|290|[4-6]\\d{2}|772|833|9(?:[06]1|92))|6(?:236|6(?:12|39|8[59])|769)|7890|8(?:688|7(?:28|65)|85[06])|9(?:159|290)", , , , "5420", , , [3, 4]]],
    TT: [, [, , "9\\d\\d", , , , , , , [3]], , , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], [, , , , , , , , , [-1]], , , , "TT", , , , , , , , , , , , , , , , , , [, , "99[09]", , , , "999"], , [, , "99[09]", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TV: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , "911", , , , "911"], [, , , , , , , , , [-1]], , , , "TV", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "1\\d\\d|911", , , , "100"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    TW: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "TW", , , , , , , , , , , , , , , , , , [, , "11[029]", , , , "110"], , [, , "11[029]", , , , "110"], [, , , , , , , , , [-1]], [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ], , [, , , , , , , , , [-1]]],
    TZ: [, [, , "[149]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]], , , [, , "11[12]|999", , , , "111", , , [3]], [, , , , , , , , , [-1]], , , , "TZ", , , , , , , , , , , , , , , , , , [, , "11[12]|999", , , , "111", , , [3]], , [, , "11[12]|46400|999", , , , "111"], [, , , , , , , , , [-1]], [, , "464\\d\\d", , , , "46400", , , [5]], , [, , "464\\d\\d", , , , "46400", , , [5]]],
    UA: [, [, , "[189]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "116(?:000|1(?:11|23))", , , , "116000", , , [6]], [, , , , , , , , , [-1]], , , , "UA", , , , , , , , , , , , , , , , , , [, , "1(?:0[1-3]|12)", , , , "112", , , [3]], , [
      ,
      ,
      "1(?:0(?:[1-49]|6\\d{2})|1(?:2|6(?:000|1(?:11|23))|8\\d{1,2})|[278]\\d|4\\d{3}|5(?:1|\\d{2})|6\\d{2})|[89]00\\d{1,2}",
      ,
      ,
      ,
      "112"
    ], [, , , , , , , , , [-1]], [, , "(?:118|[89]00)\\d{1,2}", , , , "11812", , , [4, 5]], , [, , , , , , , , , [-1]]],
    UG: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "UG", , , , , , , , , , , , , , , , , , [, , "999", , , , "999"], , [, , "999", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    US: [, [, , "[1-9]\\d{2,5}", , , , , , , [3, 4, 5, 6]], , , [, , "611", , , , "611", , , [3]], [
      ,
      ,
      "2(?:4280|5209|7(?:449|663))|3(?:2340|3786|5564|8(?:135|254))|4(?:1(?:366|463)|3355|6(?:157|327)|7553|8(?:221|277))|5(?:2944|4892|5928|9(?:187|342))|69388|7(?:2(?:078|087)|3(?:288|909)|6426)|8(?:6234|9616)|9(?:5297|6(?:040|835)|7(?:294|688)|9(?:689|796))",
      ,
      ,
      ,
      "24280",
      ,
      ,
      [5]
    ], , , , "US", , , , , , , , , , , , , , , , , , [, , "112|911", , , , "911", , , [3]], , [, , "1(?:1(?:2|5[1-47]|[68]\\d|7[0-57]|98))|[2-9](?:11|\\d{3,5})", , , , "911"], [, , "2(?:3333|42242|56447|6688|75622|9002)|3(?:1010|2665|7404)|40404|560560|6(?:0060|22639|5246|7622)|7(?:0701|3822|4666)|8(?:38255|4816|72265)|99099", , , , "73822", , , [5, 6]], [, , "[2-9]\\d{3}|33669|[2356]11", , , , "33669", , , [3, 4, 5]], , [, , "[2-9]\\d{4,5}", , , , "20566", , , [5, 6]]],
    UY: [
      ,
      [, , "[19]\\d{2,3}", , , , , , , [3, 4]],
      ,
      ,
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "UY",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "128|911", , , , "911", , , [3]],
      ,
      [, , "1(?:0[4-9]|1[2368]|2[0-3568]|787)|911", , , , "104"],
      [, , "1787", , , , "1787", , , [4]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    UZ: [, [, , "[04]\\d(?:\\d(?:\\d{2})?)?", , , , , , , [2, 3, 5]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "UZ", , , , , , , , , , , , , , , , , , [, , "0(?:0[123]|[123]|50)", , , , "01", , , [2, 3]], , [, , "0(?:0[123]|[123]|50)|45400", , , , "01"], [, , , , , , , , , [-1]], [, , "45400", , , , "45400", , , [5]], , [, , "45400", , , , "45400", , , [5]]],
    VA: [
      ,
      [, , "1\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , "11[2358]", , , , "112"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "VA",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "11[2358]", , , , "112"],
      ,
      [, , "11[2358]", , , , "112"],
      [, , , , , , , , , [-1]],
      [, , , , , , , , , [-1]],
      ,
      [, , , , , , , , , [-1]]
    ],
    VC: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "VC", , , , , , , , , , , , , , , , , , [, , "9(?:11|99)", , , , "911"], , [, , "9(?:11|99)", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    VE: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "VE", , , , , , , , , , , , , , , , , , [, , "1(?:12|71)|911", , , , "171"], , [, , "1(?:12|71)|911", , , , "171"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [-1]
    ]],
    VG: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "VG", , , , , , , , , , , , , , , , , , [, , "9(?:11|99)", , , , "911"], , [, , "9(?:11|99)", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    VI: [, [, , "9\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "VI", , , , , , , , , , , , , , , , , , [, , "911", , , , "911"], , [, , "911", , , , "911"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    VN: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "11[3-5]", , , , "113"], [, , , , , , , , , [-1]], , , , "VN", , , , , , , , , , , , , , , , , , [, , "11[3-5]", , , , "113"], , [
      ,
      ,
      "11[3-5]",
      ,
      ,
      ,
      "113"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    VU: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "112", , , , "112"], [, , , , , , , , , [-1]], , , , "VU", , , , , , , , , , , , , , , , , , [, , "112", , , , "112"], , [, , "112", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    WF: [, [, , "1\\d", , , , , , , [2]], , , [, , "1[578]", , , , "15"], [, , , , , , , , , [-1]], , , , "WF", , , , , , , , , , , , , , , , , , [, , "1[578]", , , , "15"], , [, , "1[578]", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    WS: [
      ,
      [, , "[19]\\d\\d", , , , , , , [3]],
      ,
      ,
      [, , "9(?:11|9[4-69])", , , , "911"],
      [, , , , , , , , , [-1]],
      ,
      ,
      ,
      "WS",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "9(?:11|9[4-69])", , , , "911"],
      ,
      [, , "1(?:1[12]|2[0-6])|9(?:11|9[4-79])", , , , "111"],
      [, , , , , , , , , [-1]],
      [, , "12[0-6]", , , , "120"],
      ,
      [, , , , , , , , , [-1]]
    ],
    XK: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , "1(?:12|9[2-4])", , , , "112"], [, , , , , , , , , [-1]], , , , "XK", , , , , , , , , , , , , , , , , , [, , "1(?:12|9[2-4])", , , , "112"], , [, , "1(?:12|9[2-4])", , , , "112"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    YE: [, [, , "1\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "YE", , , , , , , , , , , , , , , , , , [, , "19[1459]", , , , "191"], , [
      ,
      ,
      "19[1459]",
      ,
      ,
      ,
      "191"
    ], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    YT: [, [, , "1\\d\\d?", , , , , , , [2, 3]], , , [, , "1(?:12|5)", , , , "15"], [, , , , , , , , , [-1]], , , , "YT", , , , , , , , , , , , , , , , , , [, , "1(?:12|5)", , , , "15"], , [, , "1(?:12|5)", , , , "15"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    ZA: [, [, , "[134]\\d{2,4}", , , , , , , [3, 4, 5]], , , [, , "1(?:01\\d\\d|12)", , , , "112", , , [3, 5]], [, , "41(?:348|851)", , , , "41348", , , [5]], , , , "ZA", , , , , , , , , , , , , , , , , , [, , "1(?:01\\d\\d|12)", , , , "112", , , [3, 5]], , [
      ,
      ,
      "1(?:0(?:1(?:11|77)|20|7)|1[12]|77(?:3[237]|[45]7|6[279]|9[26]))|[34]\\d{4}",
      ,
      ,
      ,
      "107"
    ], [, , "3(?:078[23]|7(?:064|567)|8126)|4(?:2699|3(?:699|94[16])|7751|8837)", , , , "30782", , , [5]], [, , "111", , , , "111", , , [3]], , [, , "[34]\\d{4}", , , , "30000", , , [5]]],
    ZM: [, [, , "[19]\\d\\d", , , , , , , [3]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , , "ZM", , , , , , , , , , , , , , , , , , [, , "(?:112|99[139])", , , , "999"], , [, , "(?:112|99[139])", , , , "999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , [, , , , , , , , , [-1]]],
    ZW: [
      ,
      [, , "[139]\\d\\d(?:\\d{2})?", , , , , , , [3, 5]],
      ,
      ,
      [, , "9(?:5[023]|61)", , , , "961", , , [3]],
      [, , "3\\d{4}", , , , "30123", , , [5]],
      ,
      ,
      ,
      "ZW",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      [, , "(?:112|99[3-59])", , , , "999", , , [3]],
      ,
      [, , "11[2469]|3\\d{4}|9(?:5[023]|6[0-25]|9[3-59])", , , , "999"],
      [, , , , , , , , , [-1]],
      [, , "(?:114|9(?:5[023]|6[0-25]))", , , , "114", , , [3]],
      ,
      [, , , , , , , , , [-1]]
    ]
  };
  function Z0() {
    this.g = {};
  }
  $(Z0);
  function L1(d) {
    return (d = Z[d]) ? d : [];
  }
  function Y0(d, t, e) {
    var n = L1(C(t, 1));
    return !p(n, e) || (d = T1(d, e), !d) || (t = E1(t), e = f(d, 1), !J1(t, e)) ? !1 : (d = f(d, 29), J1(t, d));
  }
  function T1(d, t) {
    if (!t) return null;
    t = t.toUpperCase();
    var e = d.g[t];
    if (e == null) {
      if (e = X2[t], e == null) return null;
      e = new Q().j(q.m(), e), d.g[t] = e;
    }
    return e;
  }
  function E1(d) {
    if (!T(d, 2)) return "";
    var t = "" + f(d, 2);
    return T(d, 4) && f(d, 4) && 0 < C(d, 8) ? Array(C(d, 8) + 1).join("0") + t : t;
  }
  function J1(d, t) {
    return 0 < L(t, 9).length && !p(L(t, 9), d.length) ? !1 : W(C(t, 2), d.toString());
  }
  i("phoneNumberParser", function() {
    var d = m1("phoneNumber").value, t = m1("defaultCountry").value, e = m1("carrierCode").value, n = new E();
    try {
      var r = F.v(), s = t1(r, d, t);
      n.g(`****Parsing Result:****
`);
      var l = n.g, h = new X(1).l(s);
      const G1 = [];
      O1(new S2(), h, G1), l.call(n, G1.join("")), n.g(`

****Validation Results:****`);
      var y = E0(r, s);
      if (n.g(`
Result from isPossibleNumber(): `), n.g(y), y) {
        var P = W1(r, s);
        switch (n.g(`
Result from isValidNumber(): `), n.g(P), P && t && t != "ZZ" && (n.g(`
Result from isValidNumberForRegion(): `), n.g(T0(
          r,
          s,
          t
        ))), n.g(`
Phone Number region: `), n.g(j1(r, s)), n.g(`
Result from getNumberType(): `), V1(r, s)) {
          case 0:
            n.g("FIXED_LINE");
            break;
          case 1:
            n.g("MOBILE");
            break;
          case 2:
            n.g("FIXED_LINE_OR_MOBILE");
            break;
          case 3:
            n.g("TOLL_FREE");
            break;
          case 4:
            n.g("PREMIUM_RATE");
            break;
          case 5:
            n.g("SHARED_COST");
            break;
          case 6:
            n.g("VOIP");
            break;
          case 7:
            n.g("PERSONAL_NUMBER");
            break;
          case 8:
            n.g("PAGER");
            break;
          case 9:
            n.g("UAN");
            break;
          case -1:
            n.g("UNKNOWN");
        }
      } else {
        switch (n.g(`
Result from isPossibleNumberWithReason(): `), h1(
          r,
          s,
          -1
        )) {
          case 1:
            n.g("INVALID_COUNTRY_CODE");
            break;
          case 2:
            n.g("TOO_SHORT");
            break;
          case 3:
            n.g("TOO_LONG");
        }
        n.g(`
Note: numbers that are not possible have type UNKNOWN, an unknown region, and are considered invalid.`);
      }
      var U = Z0.v();
      n.g(`

****ShortNumberInfo Results:****`), n.g(`
Result from isPossibleShortNumber: `);
      var c1 = n.g;
      d: {
        var z0 = L1(C(s, 1)), q2 = E1(s).length;
        for (l = 0; l < z0.length; l++) {
          var J0 = T1(U, z0[l]);
          if (J0) {
            var Q2 = L(f(J0, 1), 9);
            if (p(Q2, q2)) {
              var X0 = !0;
              break d;
            }
          }
        }
        X0 = !1;
      }
      c1.call(n, X0), n.g(`
Result from isValidShortNumber: `);
      var dd = n.g, r1 = L1(C(s, 1));
      d: if (r1.length === 0) var f1 = null;
      else if (r1.length === 1) f1 = r1[0];
      else {
        var td = E1(s);
        for (c1 = 0; c1 < r1.length; c1++) {
          var q0 = r1[c1], Q0 = T1(U, q0);
          if (Q0 && J1(td, f(Q0, 29))) {
            f1 = q0;
            break d;
          }
        }
        f1 = null;
      }
      var ed = 1 < r1.length && f1 != null ? !0 : Y0(U, s, f1);
      dd.call(n, ed), n.g(`
Result from isPossibleShortNumberForRegion: `);
      var nd = n.g, id = L1(C(s, 1));
      if (p(id, t)) {
        var d2 = T1(U, t);
        if (d2)
          var $d = E1(s).length, q1 = p(L(f(d2, 1), 9), $d);
        else q1 = !1;
      } else q1 = !1;
      nd.call(n, q1), n.g(`
Result from isValidShortNumberForRegion: `), n.g(Y0(U, s, t)), n.g(`

****Formatting Results:**** `), n.g(`
E164 format: `), n.g(P ? r.format(s, 0) : "invalid"), n.g(`
Original format: `);
      var rd = n.g, Q1;
      if (Q1 = T(s, 5)) {
        var t2 = C(s, 1), e2 = J(r, t2, z(t2));
        if (e2 == null) var n2 = !1;
        else {
          var sd = Y(s);
          n2 = S1(L(e2, 19), sd) != null;
        }
        Q1 = !n2;
      }
      if (Q1) var d0 = C(s, 5);
      else if (T(s, 6)) {
        switch (f(s, 6)) {
          case 1:
            var O = r.format(s, 1);
            break;
          case 5:
            O = K1(r, s, t);
            break;
          case 10:
            O = r.format(s, 1).substring(1);
            break;
          default:
            var p1 = z(C(s, 1)), i2 = H(r, p1);
            if (i2 == null) var M1 = null;
            else {
              var t0 = C(
                i2,
                12
              );
              M1 = t0.length == 0 ? null : t0 = t0.replace("~", "");
            }
            var g1 = r.format(s, 2);
            if (M1 == null || M1.length == 0) O = g1;
            else {
              d: {
                var od = C(s, 5);
                U = M1;
                var $2 = $1(od, o1);
                if ($2.lastIndexOf(U, 0) == 0) try {
                  var r2 = W1(r, Y1(r, $2.substring(U.length), p1, !1));
                  break d;
                } catch {
                }
                r2 = !1;
              }
              if (r2) O = g1;
              else {
                var ud = H(r, p1), ld = Y(s), e0 = S1(L(ud, 19), ld);
                if (e0 == null) O = g1;
                else {
                  var s1 = C(e0, 4), s2 = s1.indexOf("$1");
                  if (0 >= s2) O = g1;
                  else if (s1 = s1.substring(0, s2), s1 = $1(s1, o1), s1.length == 0) O = g1;
                  else {
                    var o2 = e0.clone();
                    F1(o2, 4), p1 = [o2];
                    var b1 = C(s, 1), D1 = Y(s);
                    if (b1 in Z) {
                      var u2 = J(r, b1, z(b1)), n0 = S1(p1, D1);
                      if (n0 == null) var l2 = D1;
                      else {
                        var i0 = n0.clone(), P1 = C(n0, 4);
                        if (0 < P1.length) {
                          var a2 = C(u2, 12);
                          0 < a2.length ? (P1 = P1.replace(V2, a2).replace(H2, "$1"), M(i0, 4, P1)) : F1(i0, 4);
                        }
                        l2 = L0(D1, i0, 2);
                      }
                      var ad = _1(s, u2, 2);
                      O = a1(b1, 2, l2, ad);
                    } else O = D1;
                  }
                }
              }
            }
        }
        var $0 = C(s, 5);
        if (O != null && 0 < $0.length) {
          var hd = $1(O, y0), cd = $1($0, y0);
          hd != cd && (O = $0);
        }
        d0 = O;
      } else d0 = r.format(s, 2);
      if (rd.call(n, d0), n.g(`
National format: `), n.g(r.format(s, 2)), n.g(`
International format: `), n.g(P ? r.format(s, 1) : "invalid"), n.g(`
Out-of-country format from US: `), n.g(P ? K1(r, s, "US") : "invalid"), n.g(`
Out-of-country format from Switzerland: `), n.g(P ? K1(r, s, "CH") : "invalid"), 0 < e.length) {
        n.g(`
National format with carrier code: `);
        var fd = n.g, R1 = C(s, 1), h2 = Y(s);
        if (R1 in Z)
          var c2 = J(r, R1, z(R1)), pd = _1(s, c2, 2), gd = U1(h2, c2, 2, e), f2 = a1(R1, 2, gd, pd);
        else f2 = h2;
        fd.call(n, f2);
      }
      n.g(`

****AsYouTypeFormatter Results****`);
      var Cd = new P0(t), md = d.length;
      for (t = 0; t < md; ++t) {
        var p2 = d.charAt(t);
        n.g(`
Char entered: `), n.g(p2), n.g(" Output: "), n.g(k0(Cd, p2));
      }
    } catch (G1) {
      n.g(`
` + G1.toString());
    }
    return m1("output").value = n.toString(), !1;
  });
  const X1 = { FIXED_LINE: 0, MOBILE: 1, FIXED_LINE_OR_MOBILE: 2, TOLL_FREE: 3, PREMIUM_RATE: 4, SHARED_COST: 5, VOIP: 6, PERSONAL_NUMBER: 7, PAGER: 8, UAN: 9, VOICEMAIL: 10, UNKNOWN: -1 };
  i("intlTelInputUtilsTemp", {}), i("intlTelInputUtilsTemp.formatNumberAsYouType", (d, t) => {
    try {
      const e = d.replace(/[^+0-9]/g, ""), n = new P0(t);
      t = "";
      for (let r = 0; r < e.length; r++) t = k0(n, e.charAt(r));
      return t;
    } catch {
      return d;
    }
  }), i("intlTelInputUtilsTemp.formatNumber", (d, t, e) => {
    try {
      const n = F.v(), r = t1(n, d, t);
      return E0(n, r) ? n.format(r, typeof e > "u" ? 0 : e) : d;
    } catch {
      return d;
    }
  }), i("intlTelInputUtilsTemp.getExampleNumber", (d, t, e, n) => {
    try {
      const y = F.v();
      d: {
        var r = y;
        if (l1(d)) {
          var s = N1(H(r, d), e);
          try {
            if (T(s, 6)) {
              var l = f(s, 6), h = Y1(r, l, d, !1);
              break d;
            }
          } catch {
          }
        }
        h = null;
      }
      return y.format(h, n ? 0 : t ? 2 : 1);
    } catch {
      return "";
    }
  }), i("intlTelInputUtilsTemp.getExtension", (d, t) => {
    try {
      return f(t1(F.v(), d, t), 3);
    } catch {
      return "";
    }
  }), i("intlTelInputUtilsTemp.getNumberType", (d, t) => {
    try {
      const e = F.v(), n = t1(e, d, t);
      return V1(e, n);
    } catch {
      return -99;
    }
  }), i("intlTelInputUtilsTemp.getValidationError", (d, t) => {
    if (!t) return 1;
    try {
      const e = F.v(), n = t1(e, d, t);
      return h1(e, n, -1);
    } catch (e) {
      return e.message === "Invalid country calling code" ? 1 : 3 >= d.length || e.message === "Phone number too short after IDD" || e.message === "The string supplied is too short to be a phone number" ? 2 : e.message === "The string supplied is too long to be a phone number" ? 3 : -99;
    }
  }), i("intlTelInputUtilsTemp.isValidNumber", (d, t, e) => {
    try {
      const n = F.v(), r = t1(n, d, t), s = W1(n, r);
      if (e) {
        const l = e.map((h) => X1[h]);
        return s && l.includes(V1(n, r));
      }
      return s;
    } catch {
      return !1;
    }
  }), i("intlTelInputUtilsTemp.isPossibleNumber", (d, t, e) => {
    try {
      const n = F.v(), r = t1(n, d, t);
      if (e) {
        e.includes("FIXED_LINE_OR_MOBILE") && (e.includes("MOBILE") || e.push("MOBILE"), e.includes("FIXED_LINE") || e.push("FIXED_LINE"));
        for (let s of e) if (h1(n, r, X1[s]) === 0) return !0;
        return !1;
      }
      return h1(n, r, -1) === 0;
    } catch {
      return !1;
    }
  }), i("intlTelInputUtilsTemp.getCoreNumber", (d, t) => {
    try {
      return f(t1(F.v(), d, t), 2).toString();
    } catch {
      return "";
    }
  }), i("intlTelInputUtilsTemp.numberFormat", { E164: 0, INTERNATIONAL: 1, NATIONAL: 2, RFC3966: 3 }), i("intlTelInputUtilsTemp.numberType", X1), i("intlTelInputUtilsTemp.validationError", { IS_POSSIBLE: 0, INVALID_COUNTRY_CODE: 1, TOO_SHORT: 2, TOO_LONG: 3, IS_POSSIBLE_LOCAL_ONLY: 4, INVALID_LENGTH: 5 });
})();
const Gd = window.intlTelInputUtilsTemp;
delete window.intlTelInputUtilsTemp;
m.utils = Gd;
const Od = {
  __name: "IntlTelInputWithUtils",
  props: /* @__PURE__ */ g2({
    disabled: {
      type: Boolean,
      default: !1
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ""
    }
  }, {
    modelValue: {
      type: String,
      default: ""
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ g2([
    "changeNumber",
    "changeCountry",
    "changeValidity",
    "changeErrorCode"
  ], ["update:modelValue"]),
  setup(v, { expose: $, emit: i }) {
    const o = yd(v, "modelValue"), u = v, a = i, c = r0(), g = r0(), p = r0(!1), _ = () => g.value ? u.options.strictMode ? g.value.isValidNumberPrecise() : g.value.isValidNumber() : null, I = () => {
      let S = _();
      p.value !== S && (p.value = S, a("changeValidity", !!S), a(
        "changeErrorCode",
        S ? null : g.value.getValidationError()
      ));
    }, A = () => {
      var S;
      a("changeNumber", ((S = g.value) == null ? void 0 : S.getNumber()) ?? ""), I();
    }, N = () => {
      var S;
      a("changeCountry", ((S = g.value) == null ? void 0 : S.getSelectedCountryData().iso2) ?? ""), A(), I();
    };
    return vd(() => {
      c.value && (g.value = m(c.value, u.options), u.value && g.value.setNumber(u.value), u.disabled && g.value.setDisabled(u.disabled));
    }), Id(
      () => u.disabled,
      (S) => {
        var D;
        return (D = g.value) == null ? void 0 : D.setDisabled(S);
      }
    ), Sd(() => {
      var S;
      return (S = g.value) == null ? void 0 : S.destroy();
    }), $({ instance: g, input: c }), (S, D) => _d((Nd(), Ad("input", wd({
      ref_key: "input",
      ref: c,
      "onUpdate:modelValue": D[0] || (D[0] = (V) => o.value = V),
      type: "tel",
      onCountrychange: N,
      onInput: A
    }, v.inputProps), null, 16)), [
      [
        Ld,
        o.value,
        void 0,
        { lazy: !0 }
      ]
    ]);
  }
};
export {
  Od as default
};
