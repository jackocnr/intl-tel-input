//* Array of country objects for the country dropdown.
// By default, it's sorted in English alphabetical order, on country name.

//* Criteria for the plugin to support a given country/territory:
//* - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
//* - It has a flag in the flag-icons project: https://github.com/lipis/flag-icons/tree/main/flags/4x3
//* - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml

//* Criteria for the plugin to support area codes for a given country/territory:
//* - The area codes cover all valid numbers for that territory (there are no valid numbers outside of those area codes)
//* - The area codes are exclusive to that territory (i.e. they are not shared with another territory)

//* Each country array has the following information:
//* [
//*   iso2 code,
//*   International dial code,
//*   Priority (if >1 country with same dial code),
//*   Area codes (string array), [OPTIONAL]
//*   National prefix, [OPTIONAL - only required if using area codes]
//* ]

export const rawCountryData = [
  [
    "af", // Afghanistan
    "93",
    0,
    null,
    "0",
  ],
  [
    "ax", // Åland Islands
    "358",
    1,
    ["18", "4"], // (4 is a mobile range shared with FI)
    "0",
  ],
  [
    "al", // Albania
    "355",
    0,
    null,
    "0",
  ],
  [
    "dz", // Algeria
    "213",
    0,
    null,
    "0",
  ],
  [
    "as", // American Samoa
    "1",
    5,
    ["684"],
    "1",
  ],
  [
    "ad", // Andorra
    "376",
  ],
  [
    "ao", // Angola
    "244",
  ],
  [
    "ai", // Anguilla
    "1",
    6,
    ["264"],
    "1",
  ],
  [
    "ag", // Antigua and Barbuda
    "1",
    7,
    ["268"],
    "1",
  ],
  [
    "ar", // Argentina
    "54",
    0,
    null,
    "0",
  ],
  [
    "am", // Armenia
    "374",
    0,
    null,
    "0",
  ],
  [
    "aw", // Aruba
    "297",
  ],
  [
    "ac", // Ascension Island
    "247",
  ],
  [
    "au", // Australia
    "61",
    0,
    ["4"], // (mobile range shared with CX and CC)
    "0",
  ],
  [
    "at", // Austria
    "43",
    0,
    null,
    "0",
  ],
  [
    "az", // Azerbaijan
    "994",
    0,
    null,
    "0",
  ],
  [
    "bs", // Bahamas
    "1",
    8,
    ["242"],
    "1",
  ],
  [
    "bh", // Bahrain
    "973",
  ],
  [
    "bd", // Bangladesh
    "880",
    0,
    null,
    "0",
  ],
  [
    "bb", // Barbados
    "1",
    9,
    ["246"],
    "1",
  ],
  [
    "by", // Belarus
    "375",
    0,
    null,
    "8",
  ],
  [
    "be", // Belgium
    "32",
    0,
    null,
    "0",
  ],
  [
    "bz", // Belize
    "501",
  ],
  [
    "bj", // Benin
    "229",
  ],
  [
    "bm", // Bermuda
    "1",
    10,
    ["441"],
    "1",
  ],
  [
    "bt", // Bhutan
    "975",
  ],
  [
    "bo", // Bolivia
    "591",
    0,
    null,
    "0",
  ],
  [
    "ba", // Bosnia and Herzegovina
    "387",
    0,
    null,
    "0",
  ],
  [
    "bw", // Botswana
    "267",
  ],
  [
    "br", // Brazil
    "55",
    0,
    null,
    "0",
  ],
  [
    "io", // British Indian Ocean Territory
    "246",
  ],
  [
    "vg", // British Virgin Islands
    "1",
    11,
    ["284"],
    "1",
  ],
  [
    "bn", // Brunei
    "673",
  ],
  [
    "bg", // Bulgaria
    "359",
    0,
    null,
    "0",
  ],
  [
    "bf", // Burkina Faso
    "226",
  ],
  [
    "bi", // Burundi
    "257",
  ],
  [
    "kh", // Cambodia
    "855",
    0,
    null,
    "0",
  ],
  [
    "cm", // Cameroon
    "237",
  ],
  [
    "ca", // Canada
    "1",
    1,
    ["204", "226", "236", "249", "250", "257", "263", "289", "306", "343", "354", "365", "367", "368", "382", "403", "416", "418", "428", "431", "437", "438", "450", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "879", "902", "905", "942"],
    "1",
  ],
  [
    "cv", // Cape Verde
    "238",
  ],
  [
    "bq", // Caribbean Netherlands
    "599",
    1,
    ["3", "4", "7"],
  ],
  [
    "ky", // Cayman Islands
    "1",
    12,
    ["345"],
    "1",
  ],
  [
    "cf", // Central African Republic
    "236",
  ],
  [
    "td", // Chad
    "235",
  ],
  [
    "cl", // Chile
    "56",
  ],
  [
    "cn", // China
    "86",
    0,
    null,
    "0",
  ],
  [
    "cx", // Christmas Island
    "61",
    2,
    ["4", "89164"], // (4 is a mobile range shared with AU and CC)
    "0",
  ],
  [
    "cc", // Cocos (Keeling) Islands
    "61",
    1,
    ["4", "89162"], // (4 is a mobile range shared with AU and CX)
    "0",
  ],
  [
    "co", // Colombia
    "57",
    0,
    null,
    "0",
  ],
  [
    "km", // Comoros
    "269",
  ],
  [
    "cg", // Congo (Brazzaville)
    "242",
  ],
  [
    "cd", // Congo (Kinshasa)
    "243",
    0,
    null,
    "0",
  ],
  [
    "ck", // Cook Islands
    "682",
  ],
  [
    "cr", // Costa Rica
    "506",
  ],
  [
    "ci", // Côte d'Ivoire
    "225",
  ],
  [
    "hr", // Croatia
    "385",
    0,
    null,
    "0",
  ],
  [
    "cu", // Cuba
    "53",
    0,
    null,
    "0",
  ],
  [
    "cw", // Curaçao
    "599",
    0,
  ],
  [
    "cy", // Cyprus
    "357",
  ],
  [
    "cz", // Czech Republic
    "420",
  ],
  [
    "dk", // Denmark
    "45",
  ],
  [
    "dj", // Djibouti
    "253",
  ],
  [
    "dm", // Dominica
    "1",
    13,
    ["767"],
    "1",
  ],
  [
    "do", // Dominican Republic
    "1",
    2,
    ["809", "829", "849"],
    "1",
  ],
  [
    "ec", // Ecuador
    "593",
    0,
    null,
    "0",
  ],
  [
    "eg", // Egypt
    "20",
    0,
    null,
    "0",
  ],
  [
    "sv", // El Salvador
    "503",
  ],
  [
    "gq", // Equatorial Guinea
    "240",
  ],
  [
    "er", // Eritrea
    "291",
    0,
    null,
    "0",
  ],
  [
    "ee", // Estonia
    "372",
  ],
  [
    "sz", // Eswatini
    "268",
  ],
  [
    "et", // Ethiopia
    "251",
    0,
    null,
    "0",
  ],
  [
    "fk", // Falkland Islands (Malvinas)
    "500",
  ],
  [
    "fo", // Faroe Islands
    "298",
  ],
  [
    "fj", // Fiji
    "679",
  ],
  [
    "fi", // Finland
    "358",
    0,
    ["4"], // (mobile range shared with AX)
    "0",
  ],
  [
    "fr", // France
    "33",
    0,
    null,
    "0",
  ],
  [
    "gf", // French Guiana
    "594",
    0,
    null,
    "0",
  ],
  [
    "pf", // French Polynesia
    "689",
  ],
  [
    "ga", // Gabon
    "241",
  ],
  [
    "gm", // Gambia
    "220",
  ],
  [
    "ge", // Georgia
    "995",
    0,
    null,
    "0",
  ],
  [
    "de", // Germany
    "49",
    0,
    null,
    "0",
  ],
  [
    "gh", // Ghana
    "233",
    0,
    null,
    "0",
  ],
  [
    "gi", // Gibraltar
    "350",
  ],
  [
    "gr", // Greece
    "30",
  ],
  [
    "gl", // Greenland
    "299",
  ],
  [
    "gd", // Grenada
    "1",
    14,
    ["473"],
    "1",
  ],
  [
    "gp", // Guadeloupe
    "590",
    0,
    null,
    "0",
  ],
  [
    "gu", // Guam
    "1",
    15,
    ["671"],
    "1",
  ],
  [
    "gt", // Guatemala
    "502",
  ],
  [
    "gg", // Guernsey
    "44",
    1,
    ["1481", "7781", "7839", "7911"],
    "0",
  ],
  [
    "gn", // Guinea
    "224",
  ],
  [
    "gw", // Guinea-Bissau
    "245",
  ],
  [
    "gy", // Guyana
    "592",
  ],
  [
    "ht", // Haiti
    "509",
  ],
  [
    "hn", // Honduras
    "504",
  ],
  [
    "hk", // Hong Kong SAR China
    "852",
  ],
  [
    "hu", // Hungary
    "36",
    0,
    null,
    "06",
  ],
  [
    "is", // Iceland
    "354",
  ],
  [
    "in", // India
    "91",
    0,
    null,
    "0",
  ],
  [
    "id", // Indonesia
    "62",
    0,
    null,
    "0",
  ],
  [
    "ir", // Iran
    "98",
    0,
    null,
    "0",
  ],
  [
    "iq", // Iraq
    "964",
    0,
    null,
    "0",
  ],
  [
    "ie", // Ireland
    "353",
    0,
    null,
    "0",
  ],
  [
    "im", // Isle of Man
    "44",
    2,
    ["1624", "74576", "7524", "7624", "7924"],
    "0",
  ],
  [
    "il", // Israel
    "972",
    0,
    null,
    "0",
  ],
  [
    "it", // Italy
    "39",
    0,
    ["3"], // (mobile range shared with VA)
  ],
  [
    "jm", // Jamaica
    "1",
    4,
    ["658", "876"],
    "1",
  ],
  [
    "jp", // Japan
    "81",
    0,
    null,
    "0",
  ],
  [
    "je", // Jersey
    "44",
    3,
    ["1534", "7509", "7700", "7797", "7829", "7937"],
    "0",
  ],
  [
    "jo", // Jordan
    "962",
    0,
    null,
    "0",
  ],
  [
    "kz", // Kazakhstan
    "7",
    1,
    ["33", "7"], // (33 is shared with RU)
    "8",
  ],
  [
    "ke", // Kenya
    "254",
    0,
    null,
    "0",
  ],
  [
    "ki", // Kiribati
    "686",
    0,
    null,
    "0",
  ],
  [
    "xk", // Kosovo
    "383",
    0,
    null,
    "0",
  ],
  [
    "kw", // Kuwait
    "965",
  ],
  [
    "kg", // Kyrgyzstan
    "996",
    0,
    null,
    "0",
  ],
  [
    "la", // Laos
    "856",
    0,
    null,
    "0",
  ],
  [
    "lv", // Latvia
    "371",
  ],
  [
    "lb", // Lebanon
    "961",
    0,
    null,
    "0",
  ],
  [
    "ls", // Lesotho
    "266",
  ],
  [
    "lr", // Liberia
    "231",
    0,
    null,
    "0",
  ],
  [
    "ly", // Libya
    "218",
    0,
    null,
    "0",
  ],
  [
    "li", // Liechtenstein
    "423",
    0,
    null,
    "0",
  ],
  [
    "lt", // Lithuania
    "370",
    0,
    null,
    "0",
  ],
  [
    "lu", // Luxembourg
    "352",
  ],
  [
    "mo", // Macao SAR China
    "853",
  ],
  [
    "mg", // Madagascar
    "261",
    0,
    null,
    "0",
  ],
  [
    "mw", // Malawi
    "265",
    0,
    null,
    "0",
  ],
  [
    "my", // Malaysia
    "60",
    0,
    null,
    "0",
  ],
  [
    "mv", // Maldives
    "960",
  ],
  [
    "ml", // Mali
    "223",
  ],
  [
    "mt", // Malta
    "356",
  ],
  [
    "mh", // Marshall Islands
    "692",
    0,
    null,
    "1",
  ],
  [
    "mq", // Martinique
    "596",
    0,
    null,
    "0",
  ],
  [
    "mr", // Mauritania
    "222",
  ],
  [
    "mu", // Mauritius
    "230",
  ],
  [
    "yt", // Mayotte
    "262",
    1,
    ["269", "639"],
    "0",
  ],
  [
    "mx", // Mexico
    "52",
  ],
  [
    "fm", // Micronesia
    "691",
  ],
  [
    "md", // Moldova
    "373",
    0,
    null,
    "0",
  ],
  [
    "mc", // Monaco
    "377",
    0,
    null,
    "0",
  ],
  [
    "mn", // Mongolia
    "976",
    0,
    null,
    "0",
  ],
  [
    "me", // Montenegro
    "382",
    0,
    null,
    "0",
  ],
  [
    "ms", // Montserrat
    "1",
    16,
    ["664"],
    "1",
  ],
  [
    "ma", // Morocco
    "212",
    0,
    ["6", "7"], // (mobile ranges shared with EH)
    "0",
  ],
  [
    "mz", // Mozambique
    "258",
  ],
  [
    "mm", // Myanmar (Burma)
    "95",
    0,
    null,
    "0",
  ],
  [
    "na", // Namibia
    "264",
    0,
    null,
    "0",
  ],
  [
    "nr", // Nauru
    "674",
  ],
  [
    "np", // Nepal
    "977",
    0,
    null,
    "0",
  ],
  [
    "nl", // Netherlands
    "31",
    0,
    null,
    "0",
  ],
  [
    "nc", // New Caledonia
    "687",
  ],
  [
    "nz", // New Zealand
    "64",
    0,
    null,
    "0",
  ],
  [
    "ni", // Nicaragua
    "505",
  ],
  [
    "ne", // Niger
    "227",
  ],
  [
    "ng", // Nigeria
    "234",
    0,
    null,
    "0",
  ],
  [
    "nu", // Niue
    "683",
  ],
  [
    "nf", // Norfolk Island
    "672",
  ],
  [
    "kp", // North Korea
    "850",
    0,
    null,
    "0",
  ],
  [
    "mk", // North Macedonia
    "389",
    0,
    null,
    "0",
  ],
  [
    "mp", // Northern Mariana Islands
    "1",
    17,
    ["670"],
    "1",
  ],
  [
    "no", // Norway
    "47",
    0,
    ["4", "9"], // (mobile ranges shared with SJ)
  ],
  [
    "om", // Oman
    "968",
  ],
  [
    "pk", // Pakistan
    "92",
    0,
    null,
    "0",
  ],
  [
    "pw", // Palau
    "680",
  ],
  [
    "ps", // Palestinian Territories
    "970",
    0,
    null,
    "0",
  ],
  [
    "pa", // Panama
    "507",
  ],
  [
    "pg", // Papua New Guinea
    "675",
  ],
  [
    "py", // Paraguay
    "595",
    0,
    null,
    "0",
  ],
  [
    "pe", // Peru
    "51",
    0,
    null,
    "0",
  ],
  [
    "ph", // Philippines
    "63",
    0,
    null,
    "0",
  ],
  [
    "pl", // Poland
    "48",
  ],
  [
    "pt", // Portugal
    "351",
  ],
  [
    "pr", // Puerto Rico
    "1",
    3,
    ["787", "939"],
    "1",
  ],
  [
    "qa", // Qatar
    "974",
  ],
  [
    "re", // Réunion
    "262",
    0,
    null,
    "0",
  ],
  [
    "ro", // Romania
    "40",
    0,
    null,
    "0",
  ],
  [
    "ru", // Russia
    "7",
    0,
    ["33"], // (shared with KZ)
    "8",
  ],
  [
    "rw", // Rwanda
    "250",
    0,
    null,
    "0",
  ],
  [
    "ws", // Samoa
    "685",
  ],
  [
    "sm", // San Marino
    "378",
  ],
  [
    "st", // São Tomé & Príncipe
    "239",
  ],
  [
    "sa", // Saudi Arabia
    "966",
    0,
    null,
    "0",
  ],
  [
    "sn", // Senegal
    "221",
  ],
  [
    "rs", // Serbia
    "381",
    0,
    null,
    "0",
  ],
  [
    "sc", // Seychelles
    "248",
  ],
  [
    "sl", // Sierra Leone
    "232",
    0,
    null,
    "0",
  ],
  [
    "sg", // Singapore
    "65",
  ],
  [
    "sx", // Sint Maarten
    "1",
    21,
    ["721"],
    "1",
  ],
  [
    "sk", // Slovakia
    "421",
    0,
    null,
    "0",
  ],
  [
    "si", // Slovenia
    "386",
    0,
    null,
    "0",
  ],
  [
    "sb", // Solomon Islands
    "677",
  ],
  [
    "so", // Somalia
    "252",
    0,
    null,
    "0",
  ],
  [
    "za", // South Africa
    "27",
    0,
    null,
    "0",
  ],
  [
    "kr", // South Korea
    "82",
    0,
    null,
    "0",
  ],
  [
    "ss", // South Sudan
    "211",
    0,
    null,
    "0",
  ],
  [
    "es", // Spain
    "34",
  ],
  [
    "lk", // Sri Lanka
    "94",
    0,
    null,
    "0",
  ],
  [
    "bl", // St. Barthélemy
    "590",
    1,
    null,
    "0",
  ],
  [
    "sh", // St. Helena
    "290",
  ],
  [
    "kn", // St. Kitts & Nevis
    "1",
    18,
    ["869"],
    "1",
  ],
  [
    "lc", // St. Lucia
    "1",
    19,
    ["758"],
    "1",
  ],
  [
    "mf", // St. Martin
    "590",
    2,
    null,
    "0",
  ],
  [
    "pm", // St. Pierre & Miquelon
    "508",
    0,
    null,
    "0",
  ],
  [
    "vc", // St. Vincent & Grenadines
    "1",
    20,
    ["784"],
    "1",
  ],
  [
    "sd", // Sudan
    "249",
    0,
    null,
    "0",
  ],
  [
    "sr", // Suriname
    "597",
  ],
  [
    "sj", // Svalbard & Jan Mayen
    "47",
    1,
    ["4", "79", "9"], // (4 and 9 are mobile ranges shared with NO)
  ],
  [
    "se", // Sweden
    "46",
    0,
    null,
    "0",
  ],
  [
    "ch", // Switzerland
    "41",
    0,
    null,
    "0",
  ],
  [
    "sy", // Syria
    "963",
    0,
    null,
    "0",
  ],
  [
    "tw", // Taiwan
    "886",
    0,
    null,
    "0",
  ],
  [
    "tj", // Tajikistan
    "992",
  ],
  [
    "tz", // Tanzania
    "255",
    0,
    null,
    "0",
  ],
  [
    "th", // Thailand
    "66",
    0,
    null,
    "0",
  ],
  [
    "tl", // Timor-Leste
    "670",
  ],
  [
    "tg", // Togo
    "228",
  ],
  [
    "tk", // Tokelau
    "690",
  ],
  [
    "to", // Tonga
    "676",
  ],
  [
    "tt", // Trinidad & Tobago
    "1",
    22,
    ["868"],
    "1",
  ],
  [
    "tn", // Tunisia
    "216",
  ],
  [
    "tr", // Turkey
    "90",
    0,
    null,
    "0",
  ],
  [
    "tm", // Turkmenistan
    "993",
    0,
    null,
    "8",
  ],
  [
    "tc", // Turks & Caicos Islands
    "1",
    23,
    ["649"],
    "1",
  ],
  [
    "tv", // Tuvalu
    "688",
  ],
  [
    "vi", // U.S. Virgin Islands
    "1",
    24,
    ["340"],
    "1",
  ],
  [
    "ug", // Uganda
    "256",
    0,
    null,
    "0",
  ],
  [
    "ua", // Ukraine
    "380",
    0,
    null,
    "0",
  ],
  [
    "ae", // United Arab Emirates
    "971",
    0,
    null,
    "0",
  ],
  [
    "gb", // United Kingdom
    "44",
    0,
    null,
    "0",
  ],
  [
    "us", // United States
    "1",
    0,
    null,
    "1",
  ],
  [
    "uy", // Uruguay
    "598",
    0,
    null,
    "0",
  ],
  [
    "uz", // Uzbekistan
    "998",
  ],
  [
    "vu", // Vanuatu
    "678",
  ],
  [
    "va", // Vatican City
    "39",
    1,
    ["06698", "3"], // (3 is a mobile range shared with IT)
  ],
  [
    "ve", // Venezuela
    "58",
    0,
    null,
    "0",
  ],
  [
    "vn", // Vietnam
    "84",
    0,
    null,
    "0",
  ],
  [
    "wf", // Wallis & Futuna
    "681",
  ],
  [
    "eh", // Western Sahara
    "212",
    1,
    ["5288", "5289", "6", "7"], // (6 and 7 are mobile ranges shared with MA)
    "0",
  ],
  [
    "ye", // Yemen
    "967",
    0,
    null,
    "0",
  ],
  [
    "zm", // Zambia
    "260",
    0,
    null,
    "0",
  ],
  [
    "zw", // Zimbabwe
    "263",
    0,
    null,
    "0",
  ],
] as const;

export type Iso2 = typeof rawCountryData[number][0];

export type Country = {
  iso2: Iso2;
  dialCode: string;
  priority: number;
  areaCodes: string[] | null;
  nationalPrefix: string | null;

  // the following fields are populated by the plugin
  name: string;
  // Map instance id to corresponding country dropdown <li> element
  nodeById: { [instanceId: number]: HTMLElement };
  // derived fields, cached for country search efficiency
  normalisedName: string;
  initials: string;
  dialCodePlus: string;
};

const allCountries: Country[] = [];
//* Loop over all of the countries above, restructuring the data to be objects with named keys.
for (const c of rawCountryData) {
  allCountries.push({
    name: "", // populated in the plugin
    iso2: c[0],
    dialCode: c[1],
    priority: c[2] || 0,
    areaCodes: c[3] || null,
    nodeById: {}, // populated by the plugin
    nationalPrefix: c[4] || null,
    normalisedName: "", // populated in the plugin
    initials: "", // populated in the plugin
    dialCodePlus: "", // populated in the plugin
  });
}

export default allCountries;
