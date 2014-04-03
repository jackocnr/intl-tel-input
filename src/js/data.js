// Tell JSHint to ignore this warning: "character may get silently deleted by one or more browsers"
// jshint -W100

// Array of country objects for the flag dropdown.
// Each contains a name, country code (ISO 3166-1 alpha-2) and dial code.
// Originally from https://github.com/mledoze/countries
// then modified using the following JavaScript:
/*
var result = [];
_.each(countries, function(c) {
  // ignore countries without a dial code
  if (c.callingCode[0].length) {
    result.push({
      // var locals contains country names with localised versions in brackets
      n: _.findWhere(locals, {
        countryCode: c.cca2
      }).name,
      i: c.cca2.toLowerCase(),
      d: c.callingCode[0]
    });
  }
});
JSON.stringify(result);
*/
// then with a couple of manual re-arrangements to be alphabetical
// then changed Kazakhstan from +76 to +7
// then manually removed quotes from property names as not required

// Note: using single char property names to keep filesize down
// n = name
// i = iso2 (2-char country code)
// d = dial code
var allCountries = $.each([{
  n: "Afghanistan (‫افغانستان‬‎)",
  i: "af",
  d: "93"
}, {
  n: "Åland Islands (Åland)",
  i: "ax",
  d: "358"
}, {
  n: "Albania (Shqipëri)",
  i: "al",
  d: "355"
}, {
  n: "Algeria (‫الجزائر‬‎)",
  i: "dz",
  d: "213"
}, {
  n: "American Samoa",
  i: "as",
  d: "1684"
}, {
  n: "Andorra",
  i: "ad",
  d: "376"
}, {
  n: "Angola",
  i: "ao",
  d: "244"
}, {
  n: "Anguilla",
  i: "ai",
  d: "1264"
}, {
  n: "Antigua and Barbuda",
  i: "ag",
  d: "1268"
}, {
  n: "Argentina",
  i: "ar",
  d: "54"
}, {
  n: "Armenia (Հայաստան)",
  i: "am",
  d: "374"
}, {
  n: "Aruba",
  i: "aw",
  d: "297"
}, {
  n: "Australia",
  i: "au",
  d: "61"
}, {
  n: "Austria (Österreich)",
  i: "at",
  d: "43"
}, {
  n: "Azerbaijan (Azərbaycan)",
  i: "az",
  d: "994"
}, {
  n: "Bahamas",
  i: "bs",
  d: "1242"
}, {
  n: "Bahrain (‫البحرين‬‎)",
  i: "bh",
  d: "973"
}, {
  n: "Bangladesh (বাংলাদেশ)",
  i: "bd",
  d: "880"
}, {
  n: "Barbados",
  i: "bb",
  d: "1246"
}, {
  n: "Belarus (Беларусь)",
  i: "by",
  d: "375"
}, {
  n: "Belgium (België)",
  i: "be",
  d: "32"
}, {
  n: "Belize",
  i: "bz",
  d: "501"
}, {
  n: "Benin (Bénin)",
  i: "bj",
  d: "229"
}, {
  n: "Bermuda",
  i: "bm",
  d: "1441"
}, {
  n: "Bhutan (འབྲུག)",
  i: "bt",
  d: "975"
}, {
  n: "Bolivia",
  i: "bo",
  d: "591"
}, {
  n: "Bosnia and Herzegovina (Босна и Херцеговина)",
  i: "ba",
  d: "387"
}, {
  n: "Botswana",
  i: "bw",
  d: "267"
}, {
  n: "Brazil (Brasil)",
  i: "br",
  d: "55"
}, {
  n: "British Indian Ocean Territory",
  i: "io",
  d: "246"
}, {
  n: "British Virgin Islands",
  i: "vg",
  d: "1284"
}, {
  n: "Brunei",
  i: "bn",
  d: "673"
}, {
  n: "Bulgaria (България)",
  i: "bg",
  d: "359"
}, {
  n: "Burkina Faso",
  i: "bf",
  d: "226"
}, {
  n: "Burundi (Uburundi)",
  i: "bi",
  d: "257"
}, {
  n: "Cambodia (កម្ពុជា)",
  i: "kh",
  d: "855"
}, {
  n: "Cameroon (Cameroun)",
  i: "cm",
  d: "237"
}, {
  n: "Canada",
  i: "ca",
  d: "1"
}, {
  n: "Cape Verde (Kabu Verdi)",
  i: "cv",
  d: "238"
}, {
  n: "Caribbean Netherlands",
  i: "bq",
  d: "5997"
}, {
  n: "Cayman Islands",
  i: "ky",
  d: "1345"
}, {
  n: "Central African Republic (République centrafricaine)",
  i: "cf",
  d: "236"
}, {
  n: "Chad (Tchad)",
  i: "td",
  d: "235"
}, {
  n: "Chile",
  i: "cl",
  d: "56"
}, {
  n: "China (中国)",
  i: "cn",
  d: "86"
}, {
  n: "Christmas Island",
  i: "cx",
  d: "61"
}, {
  n: "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))",
  i: "cc",
  d: "61"
}, {
  n: "Colombia",
  i: "co",
  d: "57"
}, {
  n: "Comoros (‫جزر القمر‬‎)",
  i: "km",
  d: "269"
}, {
  n: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
  i: "cd",
  d: "243"
}, {
  n: "Congo (Republic) (Congo-Brazzaville)",
  i: "cg",
  d: "242"
}, {
  n: "Cook Islands",
  i: "ck",
  d: "682"
}, {
  n: "Costa Rica",
  i: "cr",
  d: "506"
}, {
  n: "Côte d’Ivoire",
  i: "ci",
  d: "225"
}, {
  n: "Croatia (Hrvatska)",
  i: "hr",
  d: "385"
}, {
  n: "Cuba",
  i: "cu",
  d: "53"
}, {
  n: "Curaçao",
  i: "cw",
  d: "5999"
}, {
  n: "Cyprus (Κύπρος)",
  i: "cy",
  d: "357"
}, {
  n: "Czech Republic (Česká republika)",
  i: "cz",
  d: "420"
}, {
  n: "Denmark (Danmark)",
  i: "dk",
  d: "45"
}, {
  n: "Djibouti",
  i: "dj",
  d: "253"
}, {
  n: "Dominica",
  i: "dm",
  d: "1767"
}, {
  n: "Dominican Republic (República Dominicana)",
  i: "do",
  d: "1809"
}, {
  n: "Ecuador",
  i: "ec",
  d: "593"
}, {
  n: "Egypt (‫مصر‬‎)",
  i: "eg",
  d: "20"
}, {
  n: "El Salvador",
  i: "sv",
  d: "503"
}, {
  n: "Equatorial Guinea (Guinea Ecuatorial)",
  i: "gq",
  d: "240"
}, {
  n: "Eritrea",
  i: "er",
  d: "291"
}, {
  n: "Estonia (Eesti)",
  i: "ee",
  d: "372"
}, {
  n: "Ethiopia",
  i: "et",
  d: "251"
}, {
  n: "Falkland Islands (Islas Malvinas)",
  i: "fk",
  d: "500"
}, {
  n: "Faroe Islands (Føroyar)",
  i: "fo",
  d: "298"
}, {
  n: "Fiji",
  i: "fj",
  d: "679"
}, {
  n: "Finland (Suomi)",
  i: "fi",
  d: "358"
}, {
  n: "France",
  i: "fr",
  d: "33"
}, {
  n: "French Guiana (Guyane française)",
  i: "gf",
  d: "594"
}, {
  n: "French Polynesia (Polynésie française)",
  i: "pf",
  d: "689"
}, {
  n: "Gabon",
  i: "ga",
  d: "241"
}, {
  n: "Gambia",
  i: "gm",
  d: "220"
}, {
  n: "Georgia (საქართველო)",
  i: "ge",
  d: "995"
}, {
  n: "Germany (Deutschland)",
  i: "de",
  d: "49"
}, {
  n: "Ghana (Gaana)",
  i: "gh",
  d: "233"
}, {
  n: "Gibraltar",
  i: "gi",
  d: "350"
}, {
  n: "Greece (Ελλάδα)",
  i: "gr",
  d: "30"
}, {
  n: "Greenland (Kalaallit Nunaat)",
  i: "gl",
  d: "299"
}, {
  n: "Grenada",
  i: "gd",
  d: "1473"
}, {
  n: "Guadeloupe",
  i: "gp",
  d: "590"
}, {
  n: "Guam",
  i: "gu",
  d: "1671"
}, {
  n: "Guatemala",
  i: "gt",
  d: "502"
}, {
  n: "Guernsey",
  i: "gg",
  d: "44"
}, {
  n: "Guinea (Guinée)",
  i: "gn",
  d: "224"
}, {
  n: "Guinea-Bissau (Guiné Bissau)",
  i: "gw",
  d: "245"
}, {
  n: "Guyana",
  i: "gy",
  d: "592"
}, {
  n: "Haiti",
  i: "ht",
  d: "509"
}, {
  n: "Honduras",
  i: "hn",
  d: "504"
}, {
  n: "Hong Kong (香港)",
  i: "hk",
  d: "852"
}, {
  n: "Hungary (Magyarország)",
  i: "hu",
  d: "36"
}, {
  n: "Iceland (Ísland)",
  i: "is",
  d: "354"
}, {
  n: "India (भारत)",
  i: "in",
  d: "91"
}, {
  n: "Indonesia",
  i: "id",
  d: "62"
}, {
  n: "Iran (‫ایران‬‎)",
  i: "ir",
  d: "98"
}, {
  n: "Iraq (‫العراق‬‎)",
  i: "iq",
  d: "964"
}, {
  n: "Ireland",
  i: "ie",
  d: "353"
}, {
  n: "Isle of Man",
  i: "im",
  d: "44"
}, {
  n: "Israel (‫ישראל‬‎)",
  i: "il",
  d: "972"
}, {
  n: "Italy (Italia)",
  i: "it",
  d: "39"
}, {
  n: "Jamaica",
  i: "jm",
  d: "1876"
}, {
  n: "Japan (日本)",
  i: "jp",
  d: "81"
}, {
  n: "Jersey",
  i: "je",
  d: "44"
}, {
  n: "Jordan (‫الأردن‬‎)",
  i: "jo",
  d: "962"
}, {
  n: "Kazakhstan (Казахстан)",
  i: "kz",
  d: "7"
}, {
  n: "Kenya",
  i: "ke",
  d: "254"
}, {
  n: "Kiribati",
  i: "ki",
  d: "686"
}, {
  n: "Kosovo (Kosovë)",
  i: "xk",
  d: "377"
}, {
  n: "Kuwait (‫الكويت‬‎)",
  i: "kw",
  d: "965"
}, {
  n: "Kyrgyzstan (Кыргызстан)",
  i: "kg",
  d: "996"
}, {
  n: "Laos (ລາວ)",
  i: "la",
  d: "856"
}, {
  n: "Latvia (Latvija)",
  i: "lv",
  d: "371"
}, {
  n: "Lebanon (‫لبنان‬‎)",
  i: "lb",
  d: "961"
}, {
  n: "Lesotho",
  i: "ls",
  d: "266"
}, {
  n: "Liberia",
  i: "lr",
  d: "231"
}, {
  n: "Libya (‫ليبيا‬‎)",
  i: "ly",
  d: "218"
}, {
  n: "Liechtenstein",
  i: "li",
  d: "423"
}, {
  n: "Lithuania (Lietuva)",
  i: "lt",
  d: "370"
}, {
  n: "Luxembourg",
  i: "lu",
  d: "352"
}, {
  n: "Macau (澳門)",
  i: "mo",
  d: "853"
}, {
  n: "Macedonia (FYROM) (Македонија)",
  i: "mk",
  d: "389"
}, {
  n: "Madagascar (Madagasikara)",
  i: "mg",
  d: "261"
}, {
  n: "Malawi",
  i: "mw",
  d: "265"
}, {
  n: "Malaysia",
  i: "my",
  d: "60"
}, {
  n: "Maldives",
  i: "mv",
  d: "960"
}, {
  n: "Mali",
  i: "ml",
  d: "223"
}, {
  n: "Malta",
  i: "mt",
  d: "356"
}, {
  n: "Marshall Islands",
  i: "mh",
  d: "692"
}, {
  n: "Martinique",
  i: "mq",
  d: "596"
}, {
  n: "Mauritania (‫موريتانيا‬‎)",
  i: "mr",
  d: "222"
}, {
  n: "Mauritius (Moris)",
  i: "mu",
  d: "230"
}, {
  n: "Mayotte",
  i: "yt",
  d: "262"
}, {
  n: "Mexico (México)",
  i: "mx",
  d: "52"
}, {
  n: "Micronesia",
  i: "fm",
  d: "691"
}, {
  n: "Moldova (Republica Moldova)",
  i: "md",
  d: "373"
}, {
  n: "Monaco",
  i: "mc",
  d: "377"
}, {
  n: "Mongolia (Монгол)",
  i: "mn",
  d: "976"
}, {
  n: "Montenegro (Crna Gora)",
  i: "me",
  d: "382"
}, {
  n: "Montserrat",
  i: "ms",
  d: "1664"
}, {
  n: "Morocco (‫المغرب‬‎)",
  i: "ma",
  d: "212"
}, {
  n: "Mozambique (Moçambique)",
  i: "mz",
  d: "258"
}, {
  n: "Myanmar (Burma) (မြန်မာ)",
  i: "mm",
  d: "95"
}, {
  n: "Namibia (Namibië)",
  i: "na",
  d: "264"
}, {
  n: "Nauru",
  i: "nr",
  d: "674"
}, {
  n: "Nepal (नेपाल)",
  i: "np",
  d: "977"
}, {
  n: "Netherlands (Nederland)",
  i: "nl",
  d: "31"
}, {
  n: "New Caledonia (Nouvelle-Calédonie)",
  i: "nc",
  d: "687"
}, {
  n: "New Zealand",
  i: "nz",
  d: "64"
}, {
  n: "Nicaragua",
  i: "ni",
  d: "505"
}, {
  n: "Niger (Nijar)",
  i: "ne",
  d: "227"
}, {
  n: "Nigeria",
  i: "ng",
  d: "234"
}, {
  n: "Niue",
  i: "nu",
  d: "683"
}, {
  n: "Norfolk Island",
  i: "nf",
  d: "672"
}, {
  n: "North Korea (조선 민주주의 인민 공화국)",
  i: "kp",
  d: "850"
}, {
  n: "Northern Mariana Islands",
  i: "mp",
  d: "1670"
}, {
  n: "Norway (Norge)",
  i: "no",
  d: "47"
}, {
  n: "Oman (‫عُمان‬‎)",
  i: "om",
  d: "968"
}, {
  n: "Pakistan (‫پاکستان‬‎)",
  i: "pk",
  d: "92"
}, {
  n: "Palau",
  i: "pw",
  d: "680"
}, {
  n: "Palestine (‫فلسطين‬‎)",
  i: "ps",
  d: "970"
}, {
  n: "Panama (Panamá)",
  i: "pa",
  d: "507"
}, {
  n: "Papua New Guinea",
  i: "pg",
  d: "675"
}, {
  n: "Paraguay",
  i: "py",
  d: "595"
}, {
  n: "Peru (Perú)",
  i: "pe",
  d: "51"
}, {
  n: "Philippines",
  i: "ph",
  d: "63"
}, {
  n: "Pitcairn Islands",
  i: "pn",
  d: "64"
}, {
  n: "Poland (Polska)",
  i: "pl",
  d: "48"
}, {
  n: "Portugal",
  i: "pt",
  d: "351"
}, {
  n: "Puerto Rico",
  i: "pr",
  d: "1787"
}, {
  n: "Qatar (‫قطر‬‎)",
  i: "qa",
  d: "974"
}, {
  n: "Réunion (La Réunion)",
  i: "re",
  d: "262"
}, {
  n: "Romania (România)",
  i: "ro",
  d: "40"
}, {
  n: "Russia (Россия)",
  i: "ru",
  d: "7"
}, {
  n: "Rwanda",
  i: "rw",
  d: "250"
}, {
  n: "Saint Barthélemy (Saint-Barthélemy)",
  i: "bl",
  d: "590"
}, {
  n: "Saint Helena",
  i: "sh",
  d: "290"
}, {
  n: "Saint Kitts and Nevis",
  i: "kn",
  d: "1869"
}, {
  n: "Saint Lucia",
  i: "lc",
  d: "1758"
}, {
  n: "Saint Martin (Saint-Martin (partie française))",
  i: "mf",
  d: "590"
}, {
  n: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
  i: "pm",
  d: "508"
}, {
  n: "Saint Vincent and the Grenadines",
  i: "vc",
  d: "1784"
}, {
  n: "Samoa",
  i: "ws",
  d: "685"
}, {
  n: "San Marino",
  i: "sm",
  d: "378"
}, {
  n: "São Tomé and Príncipe (São Tomé e Príncipe)",
  i: "st",
  d: "239"
}, {
  n: "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
  i: "sa",
  d: "966"
}, {
  n: "Senegal (Sénégal)",
  i: "sn",
  d: "221"
}, {
  n: "Serbia (Србија)",
  i: "rs",
  d: "381"
}, {
  n: "Seychelles",
  i: "sc",
  d: "248"
}, {
  n: "Sierra Leone",
  i: "sl",
  d: "232"
}, {
  n: "Singapore",
  i: "sg",
  d: "65"
}, {
  n: "Sint Maarten",
  i: "sx",
  d: "1721"
}, {
  n: "Slovakia (Slovensko)",
  i: "sk",
  d: "421"
}, {
  n: "Slovenia (Slovenija)",
  i: "si",
  d: "386"
}, {
  n: "Solomon Islands",
  i: "sb",
  d: "677"
}, {
  n: "Somalia (Soomaaliya)",
  i: "so",
  d: "252"
}, {
  n: "South Africa",
  i: "za",
  d: "27"
}, {
  n: "South Georgia & South Sandwich Islands",
  i: "gs",
  d: "500"
}, {
  n: "South Korea (대한민국)",
  i: "kr",
  d: "82"
}, {
  n: "South Sudan (‫جنوب السودان‬‎)",
  i: "ss",
  d: "211"
}, {
  n: "Spain (España)",
  i: "es",
  d: "34"
}, {
  n: "Sri Lanka (ශ්‍රී ලංකාව)",
  i: "lk",
  d: "94"
}, {
  n: "Sudan (‫السودان‬‎)",
  i: "sd",
  d: "249"
}, {
  n: "Suriname",
  i: "sr",
  d: "597"
}, {
  n: "Svalbard and Jan Mayen (Svalbard og Jan Mayen)",
  i: "sj",
  d: "4779"
}, {
  n: "Swaziland",
  i: "sz",
  d: "268"
}, {
  n: "Sweden (Sverige)",
  i: "se",
  d: "46"
}, {
  n: "Switzerland (Schweiz)",
  i: "ch",
  d: "41"
}, {
  n: "Syria (‫سوريا‬‎)",
  i: "sy",
  d: "963"
}, {
  n: "Taiwan (台灣)",
  i: "tw",
  d: "886"
}, {
  n: "Tajikistan",
  i: "tj",
  d: "992"
}, {
  n: "Tanzania",
  i: "tz",
  d: "255"
}, {
  n: "Thailand (ไทย)",
  i: "th",
  d: "66"
}, {
  n: "Timor-Leste",
  i: "tl",
  d: "670"
}, {
  n: "Togo",
  i: "tg",
  d: "228"
}, {
  n: "Tokelau",
  i: "tk",
  d: "690"
}, {
  n: "Tonga",
  i: "to",
  d: "676"
}, {
  n: "Trinidad and Tobago",
  i: "tt",
  d: "1868"
}, {
  n: "Tunisia (‫تونس‬‎)",
  i: "tn",
  d: "216"
}, {
  n: "Turkey (Türkiye)",
  i: "tr",
  d: "90"
}, {
  n: "Turkmenistan",
  i: "tm",
  d: "993"
}, {
  n: "Turks and Caicos Islands",
  i: "tc",
  d: "1649"
}, {
  n: "Tuvalu",
  i: "tv",
  d: "688"
}, {
  n: "Uganda",
  i: "ug",
  d: "256"
}, {
  n: "Ukraine (Україна)",
  i: "ua",
  d: "380"
}, {
  n: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
  i: "ae",
  d: "971"
}, {
  n: "United Kingdom",
  i: "gb",
  d: "44"
}, {
  n: "United States",
  i: "us",
  d: "1"
}, {
  n: "U.S. Virgin Islands",
  i: "vi",
  d: "1340"
}, {
  n: "Uruguay",
  i: "uy",
  d: "598"
}, {
  n: "Uzbekistan (Oʻzbekiston)",
  i: "uz",
  d: "998"
}, {
  n: "Vanuatu",
  i: "vu",
  d: "678"
}, {
  n: "Vatican City (Città del Vaticano)",
  i: "va",
  d: "379"
}, {
  n: "Venezuela",
  i: "ve",
  d: "58"
}, {
  n: "Vietnam (Việt Nam)",
  i: "vn",
  d: "84"
}, {
  n: "Wallis and Futuna",
  i: "wf",
  d: "681"
}, {
  n: "Western Sahara (‫الصحراء الغربية‬‎)",
  i: "eh",
  d: "212"
}, {
  n: "Yemen (‫اليمن‬‎)",
  i: "ye",
  d: "967"
}, {
  n: "Zambia",
  i: "zm",
  d: "260"
}, {
  n: "Zimbabwe",
  i: "zw",
  d: "263"
}], function(i, c) {
  c.name = c.n;
  c.iso2 = c.i;
  c.dialCode = c.d;
  delete c.n;
  delete c.i;
  delete c.d;
});

// JavaScript object mapping dial code to country code.
// This is used when the user enters a number,
// to quickly look up the corresponding country code.
// Generated from the above array using this JavaScript:
/*
var uniqueDCs = _.unique(_.pluck(intlDataFull.countries, dialCode));
var cCodes = {};
_.each(uniqueDCs, function(dc) {
  cCodes[dc] = _.pluck(_.filter(intlDataFull.countries, function(c) {
    return c[dialCode] == dc;
  }), iso2);
});
 */
// Then reference this google code project for clash priority:
// http://libphonenumber.googlecode.com/svn/trunk/javascript/i18n/phonenumbers/metadata.js
// then updated vatican city to +379
var allCountryCodes = {
  "1": ["us", "ca"],
  "7": ["ru", "kz"],
  "20": ["eg"],
  "27": ["za"],
  "30": ["gr"],
  "31": ["nl"],
  "32": ["be"],
  "33": ["fr"],
  "34": ["es"],
  "36": ["hu"],
  "39": ["it"],
  "40": ["ro"],
  "41": ["ch"],
  "43": ["at"],
  "44": ["gb", "gg", "im", "je"],
  "45": ["dk"],
  "46": ["se"],
  "47": ["no"],
  "48": ["pl"],
  "49": ["de"],
  "51": ["pe"],
  "52": ["mx"],
  "53": ["cu"],
  "54": ["ar"],
  "55": ["br"],
  "56": ["cl"],
  "57": ["co"],
  "58": ["ve"],
  "60": ["my"],
  "61": ["au", "cc", "cx"],
  "62": ["id"],
  "63": ["ph"],
  "64": ["nz", "pn"],
  "65": ["sg"],
  "66": ["th"],
  "81": ["jp"],
  "82": ["kr"],
  "84": ["vn"],
  "86": ["cn"],
  "90": ["tr"],
  "91": ["in"],
  "92": ["pk"],
  "93": ["af"],
  "94": ["lk"],
  "95": ["mm"],
  "98": ["ir"],
  "211": ["ss"],
  "212": ["ma", "eh"],
  "213": ["dz"],
  "216": ["tn"],
  "218": ["ly"],
  "220": ["gm"],
  "221": ["sn"],
  "222": ["mr"],
  "223": ["ml"],
  "224": ["gn"],
  "225": ["ci"],
  "226": ["bf"],
  "227": ["ne"],
  "228": ["tg"],
  "229": ["bj"],
  "230": ["mu"],
  "231": ["lr"],
  "232": ["sl"],
  "233": ["gh"],
  "234": ["ng"],
  "235": ["td"],
  "236": ["cf"],
  "237": ["cm"],
  "238": ["cv"],
  "239": ["st"],
  "240": ["gq"],
  "241": ["ga"],
  "242": ["cg"],
  "243": ["cd"],
  "244": ["ao"],
  "245": ["gw"],
  "246": ["io"],
  "248": ["sc"],
  "249": ["sd"],
  "250": ["rw"],
  "251": ["et"],
  "252": ["so"],
  "253": ["dj"],
  "254": ["ke"],
  "255": ["tz"],
  "256": ["ug"],
  "257": ["bi"],
  "258": ["mz"],
  "260": ["zm"],
  "261": ["mg"],
  "262": ["re", "yt"],
  "263": ["zw"],
  "264": ["na"],
  "265": ["mw"],
  "266": ["ls"],
  "267": ["bw"],
  "268": ["sz"],
  "269": ["km"],
  "290": ["sh"],
  "291": ["er"],
  "297": ["aw"],
  "298": ["fo"],
  "299": ["gl"],
  "350": ["gi"],
  "351": ["pt"],
  "352": ["lu"],
  "353": ["ie"],
  "354": ["is"],
  "355": ["al"],
  "356": ["mt"],
  "357": ["cy"],
  "358": ["fi", "ax"],
  "359": ["bg"],
  "370": ["lt"],
  "371": ["lv"],
  "372": ["ee"],
  "373": ["md"],
  "374": ["am"],
  "375": ["by"],
  "376": ["ad"],
  "377": ["mc", "xk"],
  "378": ["sm"],
  "379": ["va"],
  "380": ["ua"],
  "381": ["rs"],
  "382": ["me"],
  "385": ["hr"],
  "386": ["si"],
  "387": ["ba"],
  "389": ["mk"],
  "420": ["cz"],
  "421": ["sk"],
  "423": ["li"],
  "500": ["fk", "gs"],
  "501": ["bz"],
  "502": ["gt"],
  "503": ["sv"],
  "504": ["hn"],
  "505": ["ni"],
  "506": ["cr"],
  "507": ["pa"],
  "508": ["pm"],
  "509": ["ht"],
  "590": ["gp", "bl", "mf"],
  "591": ["bo"],
  "592": ["gy"],
  "593": ["ec"],
  "594": ["gf"],
  "595": ["py"],
  "596": ["mq"],
  "597": ["sr"],
  "598": ["uy"],
  "670": ["tl"],
  "672": ["nf"],
  "673": ["bn"],
  "674": ["nr"],
  "675": ["pg"],
  "676": ["to"],
  "677": ["sb"],
  "678": ["vu"],
  "679": ["fj"],
  "680": ["pw"],
  "681": ["wf"],
  "682": ["ck"],
  "683": ["nu"],
  "685": ["ws"],
  "686": ["ki"],
  "687": ["nc"],
  "688": ["tv"],
  "689": ["pf"],
  "690": ["tk"],
  "691": ["fm"],
  "692": ["mh"],
  "850": ["kp"],
  "852": ["hk"],
  "853": ["mo"],
  "855": ["kh"],
  "856": ["la"],
  "880": ["bd"],
  "886": ["tw"],
  "960": ["mv"],
  "961": ["lb"],
  "962": ["jo"],
  "963": ["sy"],
  "964": ["iq"],
  "965": ["kw"],
  "966": ["sa"],
  "967": ["ye"],
  "968": ["om"],
  "970": ["ps"],
  "971": ["ae"],
  "972": ["il"],
  "973": ["bh"],
  "974": ["qa"],
  "975": ["bt"],
  "976": ["mn"],
  "977": ["np"],
  "992": ["tj"],
  "993": ["tm"],
  "994": ["az"],
  "995": ["ge"],
  "996": ["kg"],
  "998": ["uz"],
  "1204": ["ca"],
  "1236": ["ca"],
  "1242": ["bs"],
  "1246": ["bb"],
  "1249": ["ca"],
  "1250": ["ca"],
  "1264": ["ai"],
  "1268": ["ag"],
  "1284": ["vg"],
  "1289": ["ca"],
  "1306": ["ca"],
  "1340": ["vi"],
  "1343": ["ca"],
  "1345": ["ky"],
  "1365": ["ca"],
  "1387": ["ca"],
  "1403": ["ca"],
  "1416": ["ca"],
  "1418": ["ca"],
  "1431": ["ca"],
  "1437": ["ca"],
  "1438": ["ca"],
  "1441": ["bm"],
  "1450": ["ca"],
  "1473": ["gd"],
  "1506": ["ca"],
  "1514": ["ca"],
  "1519": ["ca"],
  "1548": ["ca"],
  "1579": ["ca"],
  "1581": ["ca"],
  "1587": ["ca"],
  "1604": ["ca"],
  "1613": ["ca"],
  "1639": ["ca"],
  "1647": ["ca"],
  "1649": ["tc"],
  "1664": ["ms"],
  "1670": ["mp"],
  "1671": ["gu"],
  "1672": ["ca"],
  "1684": ["as"],
  "1705": ["ca"],
  "1709": ["ca"],
  "1721": ["sx"],
  "1742": ["ca"],
  "1758": ["lc"],
  "1767": ["dm"],
  "1778": ["ca"],
  "1780": ["ca"],
  "1782": ["ca"],
  "1784": ["vc"],
  "1787": ["pr"],
  "1807": ["ca"],
  "1809": ["do"],
  "1819": ["ca"],
  "1825": ["ca"],
  "1867": ["ca"],
  "1868": ["tt"],
  "1869": ["kn"],
  "1873": ["ca"],
  "1876": ["jm"],
  "1902": ["ca"],
  "1905": ["ca"],
  "4779": ["sj"],
  "5997": ["bq"],
  "5999": ["cw"]
};
