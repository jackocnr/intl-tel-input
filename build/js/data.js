/*
 * International Telephone Input v21.2.1
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// UMD
(function(factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    window.allCountries = factory();
  }
}(() => {

var factoryOutput = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/js/intl-tel-input/data.ts
  var data_exports = {};
  __export(data_exports, {
    default: () => data_default
  });

  // src/js/i18n/en/countries.mjs
  var countries_default = {
    af: "Afghanistan",
    ax: "\xC5land Islands",
    al: "Albania",
    dz: "Algeria",
    as: "American Samoa",
    ad: "Andorra",
    ao: "Angola",
    ai: "Anguilla",
    aq: "Antarctica",
    ag: "Antigua & Barbuda",
    ar: "Argentina",
    am: "Armenia",
    aw: "Aruba",
    au: "Australia",
    at: "Austria",
    az: "Azerbaijan",
    bs: "Bahamas",
    bh: "Bahrain",
    bd: "Bangladesh",
    bb: "Barbados",
    by: "Belarus",
    be: "Belgium",
    bz: "Belize",
    bj: "Benin",
    bm: "Bermuda",
    bt: "Bhutan",
    bo: "Bolivia",
    ba: "Bosnia & Herzegovina",
    bw: "Botswana",
    bv: "Bouvet Island",
    br: "Brazil",
    io: "British Indian Ocean Territory",
    vg: "British Virgin Islands",
    bn: "Brunei",
    bg: "Bulgaria",
    bf: "Burkina Faso",
    bi: "Burundi",
    kh: "Cambodia",
    cm: "Cameroon",
    ca: "Canada",
    cv: "Cape Verde",
    bq: "Caribbean Netherlands",
    ky: "Cayman Islands",
    cf: "Central African Republic",
    td: "Chad",
    cl: "Chile",
    cn: "China",
    cx: "Christmas Island",
    cc: "Cocos (Keeling) Islands",
    co: "Colombia",
    km: "Comoros",
    cg: "Congo - Brazzaville",
    cd: "Congo - Kinshasa",
    ck: "Cook Islands",
    cr: "Costa Rica",
    ci: "C\xF4te d\u2019Ivoire",
    hr: "Croatia",
    cu: "Cuba",
    cw: "Cura\xE7ao",
    cy: "Cyprus",
    cz: "Czechia",
    dk: "Denmark",
    dj: "Djibouti",
    dm: "Dominica",
    do: "Dominican Republic",
    ec: "Ecuador",
    eg: "Egypt",
    sv: "El Salvador",
    gq: "Equatorial Guinea",
    er: "Eritrea",
    ee: "Estonia",
    sz: "Eswatini",
    et: "Ethiopia",
    fk: "Falkland Islands",
    fo: "Faroe Islands",
    fj: "Fiji",
    fi: "Finland",
    fr: "France",
    gf: "French Guiana",
    pf: "French Polynesia",
    tf: "French Southern Territories",
    ga: "Gabon",
    gm: "Gambia",
    ge: "Georgia",
    de: "Germany",
    gh: "Ghana",
    gi: "Gibraltar",
    gr: "Greece",
    gl: "Greenland",
    gd: "Grenada",
    gp: "Guadeloupe",
    gu: "Guam",
    gt: "Guatemala",
    gg: "Guernsey",
    gn: "Guinea",
    gw: "Guinea-Bissau",
    gy: "Guyana",
    ht: "Haiti",
    hm: "Heard & McDonald Islands",
    hn: "Honduras",
    hk: "Hong Kong SAR China",
    hu: "Hungary",
    is: "Iceland",
    in: "India",
    id: "Indonesia",
    ir: "Iran",
    iq: "Iraq",
    ie: "Ireland",
    im: "Isle of Man",
    il: "Israel",
    it: "Italy",
    jm: "Jamaica",
    jp: "Japan",
    je: "Jersey",
    jo: "Jordan",
    kz: "Kazakhstan",
    ke: "Kenya",
    ki: "Kiribati",
    kw: "Kuwait",
    kg: "Kyrgyzstan",
    la: "Laos",
    lv: "Latvia",
    lb: "Lebanon",
    ls: "Lesotho",
    lr: "Liberia",
    ly: "Libya",
    li: "Liechtenstein",
    lt: "Lithuania",
    lu: "Luxembourg",
    mo: "Macao SAR China",
    mg: "Madagascar",
    mw: "Malawi",
    my: "Malaysia",
    mv: "Maldives",
    ml: "Mali",
    mt: "Malta",
    mh: "Marshall Islands",
    mq: "Martinique",
    mr: "Mauritania",
    mu: "Mauritius",
    yt: "Mayotte",
    mx: "Mexico",
    fm: "Micronesia",
    md: "Moldova",
    mc: "Monaco",
    mn: "Mongolia",
    me: "Montenegro",
    ms: "Montserrat",
    ma: "Morocco",
    mz: "Mozambique",
    mm: "Myanmar (Burma)",
    na: "Namibia",
    nr: "Nauru",
    np: "Nepal",
    nl: "Netherlands",
    nc: "New Caledonia",
    nz: "New Zealand",
    ni: "Nicaragua",
    ne: "Niger",
    ng: "Nigeria",
    nu: "Niue",
    nf: "Norfolk Island",
    kp: "North Korea",
    mk: "North Macedonia",
    mp: "Northern Mariana Islands",
    no: "Norway",
    om: "Oman",
    pk: "Pakistan",
    pw: "Palau",
    ps: "Palestinian Territories",
    pa: "Panama",
    pg: "Papua New Guinea",
    py: "Paraguay",
    pe: "Peru",
    ph: "Philippines",
    pn: "Pitcairn Islands",
    pl: "Poland",
    pt: "Portugal",
    pr: "Puerto Rico",
    qa: "Qatar",
    re: "R\xE9union",
    ro: "Romania",
    ru: "Russia",
    rw: "Rwanda",
    ws: "Samoa",
    sm: "San Marino",
    st: "S\xE3o Tom\xE9 & Pr\xEDncipe",
    sa: "Saudi Arabia",
    sn: "Senegal",
    rs: "Serbia",
    sc: "Seychelles",
    sl: "Sierra Leone",
    sg: "Singapore",
    sx: "Sint Maarten",
    sk: "Slovakia",
    si: "Slovenia",
    sb: "Solomon Islands",
    so: "Somalia",
    za: "South Africa",
    gs: "South Georgia & South Sandwich Islands",
    kr: "South Korea",
    ss: "South Sudan",
    es: "Spain",
    lk: "Sri Lanka",
    bl: "St. Barth\xE9lemy",
    sh: "St. Helena",
    kn: "St. Kitts & Nevis",
    lc: "St. Lucia",
    mf: "St. Martin",
    pm: "St. Pierre & Miquelon",
    vc: "St. Vincent & Grenadines",
    sd: "Sudan",
    sr: "Suriname",
    sj: "Svalbard & Jan Mayen",
    se: "Sweden",
    ch: "Switzerland",
    sy: "Syria",
    tw: "Taiwan",
    tj: "Tajikistan",
    tz: "Tanzania",
    th: "Thailand",
    tl: "Timor-Leste",
    tg: "Togo",
    tk: "Tokelau",
    to: "Tonga",
    tt: "Trinidad & Tobago",
    tn: "Tunisia",
    tr: "Turkey",
    tm: "Turkmenistan",
    tc: "Turks & Caicos Islands",
    tv: "Tuvalu",
    um: "U.S. Outlying Islands",
    vi: "U.S. Virgin Islands",
    ug: "Uganda",
    ua: "Ukraine",
    ae: "United Arab Emirates",
    gb: "United Kingdom",
    us: "United States",
    uy: "Uruguay",
    uz: "Uzbekistan",
    vu: "Vanuatu",
    va: "Vatican City",
    ve: "Venezuela",
    vn: "Vietnam",
    wf: "Wallis & Futuna",
    eh: "Western Sahara",
    ye: "Yemen",
    zm: "Zambia",
    zw: "Zimbabwe"
  };

  // src/js/intl-tel-input/data.ts
  var rawCountryData = [
    [
      countries_default["af"],
      "af",
      "93"
    ],
    [
      countries_default["al"],
      "al",
      "355"
    ],
    [
      countries_default["dz"],
      "dz",
      "213"
    ],
    [
      countries_default["as"],
      "as",
      "1",
      5,
      ["684"]
    ],
    [
      countries_default["ad"],
      "ad",
      "376"
    ],
    [
      countries_default["ao"],
      "ao",
      "244"
    ],
    [
      countries_default["ai"],
      "ai",
      "1",
      6,
      ["264"]
    ],
    [
      countries_default["ag"],
      "ag",
      "1",
      7,
      ["268"]
    ],
    [
      countries_default["ar"],
      "ar",
      "54"
    ],
    [
      countries_default["am"],
      "am",
      "374"
    ],
    [
      countries_default["aw"],
      "aw",
      "297"
    ],
    [
      "Ascension Island",
      "ac",
      "247"
    ],
    [
      countries_default["au"],
      "au",
      "61",
      0
    ],
    [
      countries_default["at"],
      "at",
      "43"
    ],
    [
      countries_default["az"],
      "az",
      "994"
    ],
    [
      countries_default["bs"],
      "bs",
      "1",
      8,
      ["242"]
    ],
    [
      countries_default["bh"],
      "bh",
      "973"
    ],
    [
      countries_default["bd"],
      "bd",
      "880"
    ],
    [
      countries_default["bb"],
      "bb",
      "1",
      9,
      ["246"]
    ],
    [
      countries_default["by"],
      "by",
      "375"
    ],
    [
      countries_default["be"],
      "be",
      "32"
    ],
    [
      countries_default["bz"],
      "bz",
      "501"
    ],
    [
      countries_default["bj"],
      "bj",
      "229"
    ],
    [
      countries_default["bm"],
      "bm",
      "1",
      10,
      ["441"]
    ],
    [
      countries_default["bt"],
      "bt",
      "975"
    ],
    [
      countries_default["bo"],
      "bo",
      "591"
    ],
    [
      countries_default["ba"],
      "ba",
      "387"
    ],
    [
      countries_default["bw"],
      "bw",
      "267"
    ],
    [
      countries_default["br"],
      "br",
      "55"
    ],
    [
      countries_default["io"],
      "io",
      "246"
    ],
    [
      countries_default["vg"],
      "vg",
      "1",
      11,
      ["284"]
    ],
    [
      countries_default["bn"],
      "bn",
      "673"
    ],
    [
      countries_default["bg"],
      "bg",
      "359"
    ],
    [
      countries_default["bf"],
      "bf",
      "226"
    ],
    [
      countries_default["bi"],
      "bi",
      "257"
    ],
    [
      countries_default["kh"],
      "kh",
      "855"
    ],
    [
      countries_default["cm"],
      "cm",
      "237"
    ],
    [
      countries_default["ca"],
      "ca",
      "1",
      1,
      ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "879", "902", "905"]
    ],
    [
      countries_default["cv"],
      "cv",
      "238"
    ],
    [
      countries_default["bq"],
      "bq",
      "599",
      1,
      ["3", "4", "7"]
    ],
    [
      countries_default["ky"],
      "ky",
      "1",
      12,
      ["345"]
    ],
    [
      countries_default["cf"],
      "cf",
      "236"
    ],
    [
      countries_default["td"],
      "td",
      "235"
    ],
    [
      countries_default["cl"],
      "cl",
      "56"
    ],
    [
      countries_default["cn"],
      "cn",
      "86"
    ],
    [
      countries_default["cx"],
      "cx",
      "61",
      2,
      ["89164"]
    ],
    [
      countries_default["cc"],
      "cc",
      "61",
      1,
      ["89162"]
    ],
    [
      countries_default["co"],
      "co",
      "57"
    ],
    [
      countries_default["km"],
      "km",
      "269"
    ],
    [
      countries_default["cg"],
      "cg",
      "242"
    ],
    [
      countries_default["cd"],
      "cd",
      "243"
    ],
    [
      countries_default["ck"],
      "ck",
      "682"
    ],
    [
      countries_default["cr"],
      "cr",
      "506"
    ],
    [
      countries_default["ci"],
      "ci",
      "225"
    ],
    [
      countries_default["hr"],
      "hr",
      "385"
    ],
    [
      countries_default["cu"],
      "cu",
      "53"
    ],
    [
      countries_default["cw"],
      "cw",
      "599",
      0
    ],
    [
      countries_default["cy"],
      "cy",
      "357"
    ],
    [
      countries_default["cz"],
      "cz",
      "420"
    ],
    [
      countries_default["dk"],
      "dk",
      "45"
    ],
    [
      countries_default["dj"],
      "dj",
      "253"
    ],
    [
      countries_default["dm"],
      "dm",
      "1",
      13,
      ["767"]
    ],
    [
      countries_default["do"],
      "do",
      "1",
      2,
      ["809", "829", "849"]
    ],
    [
      countries_default["ec"],
      "ec",
      "593"
    ],
    [
      countries_default["eg"],
      "eg",
      "20"
    ],
    [
      countries_default["sv"],
      "sv",
      "503"
    ],
    [
      countries_default["gq"],
      "gq",
      "240"
    ],
    [
      countries_default["er"],
      "er",
      "291"
    ],
    [
      countries_default["ee"],
      "ee",
      "372"
    ],
    [
      countries_default["sz"],
      "sz",
      "268"
    ],
    [
      countries_default["et"],
      "et",
      "251"
    ],
    [
      countries_default["fk"],
      "fk",
      "500"
    ],
    [
      countries_default["fo"],
      "fo",
      "298"
    ],
    [
      countries_default["fj"],
      "fj",
      "679"
    ],
    [
      countries_default["fi"],
      "fi",
      "358",
      0
    ],
    [
      countries_default["fr"],
      "fr",
      "33"
    ],
    [
      countries_default["gf"],
      "gf",
      "594"
    ],
    [
      countries_default["pf"],
      "pf",
      "689"
    ],
    [
      countries_default["ga"],
      "ga",
      "241"
    ],
    [
      countries_default["gm"],
      "gm",
      "220"
    ],
    [
      countries_default["ge"],
      "ge",
      "995"
    ],
    [
      countries_default["de"],
      "de",
      "49"
    ],
    [
      countries_default["gh"],
      "gh",
      "233"
    ],
    [
      countries_default["gi"],
      "gi",
      "350"
    ],
    [
      countries_default["gr"],
      "gr",
      "30"
    ],
    [
      countries_default["gl"],
      "gl",
      "299"
    ],
    [
      countries_default["gd"],
      "gd",
      "1",
      14,
      ["473"]
    ],
    [
      countries_default["gp"],
      "gp",
      "590",
      0
    ],
    [
      countries_default["gu"],
      "gu",
      "1",
      15,
      ["671"]
    ],
    [
      countries_default["gt"],
      "gt",
      "502"
    ],
    [
      countries_default["gg"],
      "gg",
      "44",
      1,
      ["1481", "7781", "7839", "7911"]
    ],
    [
      countries_default["gn"],
      "gn",
      "224"
    ],
    [
      countries_default["gw"],
      "gw",
      "245"
    ],
    [
      countries_default["gy"],
      "gy",
      "592"
    ],
    [
      countries_default["ht"],
      "ht",
      "509"
    ],
    [
      countries_default["hn"],
      "hn",
      "504"
    ],
    [
      countries_default["hk"],
      "hk",
      "852"
    ],
    [
      countries_default["hu"],
      "hu",
      "36"
    ],
    [
      countries_default["is"],
      "is",
      "354"
    ],
    [
      countries_default["in"],
      "in",
      "91"
    ],
    [
      countries_default["id"],
      "id",
      "62"
    ],
    [
      countries_default["ir"],
      "ir",
      "98"
    ],
    [
      countries_default["iq"],
      "iq",
      "964"
    ],
    [
      countries_default["ie"],
      "ie",
      "353"
    ],
    [
      countries_default["im"],
      "im",
      "44",
      2,
      ["1624", "74576", "7524", "7924", "7624"]
    ],
    [
      countries_default["il"],
      "il",
      "972"
    ],
    [
      countries_default["it"],
      "it",
      "39",
      0
    ],
    [
      countries_default["jm"],
      "jm",
      "1",
      4,
      ["876", "658"]
    ],
    [
      countries_default["jp"],
      "jp",
      "81"
    ],
    [
      countries_default["je"],
      "je",
      "44",
      3,
      ["1534", "7509", "7700", "7797", "7829", "7937"]
    ],
    [
      countries_default["jo"],
      "jo",
      "962"
    ],
    [
      countries_default["kz"],
      "kz",
      "7",
      1,
      ["33", "7"]
    ],
    [
      countries_default["ke"],
      "ke",
      "254"
    ],
    [
      countries_default["ki"],
      "ki",
      "686"
    ],
    [
      "Kosovo",
      "xk",
      "383"
    ],
    [
      countries_default["kw"],
      "kw",
      "965"
    ],
    [
      countries_default["kg"],
      "kg",
      "996"
    ],
    [
      countries_default["la"],
      "la",
      "856"
    ],
    [
      countries_default["lv"],
      "lv",
      "371"
    ],
    [
      countries_default["lb"],
      "lb",
      "961"
    ],
    [
      countries_default["ls"],
      "ls",
      "266"
    ],
    [
      countries_default["lr"],
      "lr",
      "231"
    ],
    [
      countries_default["ly"],
      "ly",
      "218"
    ],
    [
      countries_default["li"],
      "li",
      "423"
    ],
    [
      countries_default["lt"],
      "lt",
      "370"
    ],
    [
      countries_default["lu"],
      "lu",
      "352"
    ],
    [
      countries_default["mo"],
      "mo",
      "853"
    ],
    [
      countries_default["mg"],
      "mg",
      "261"
    ],
    [
      countries_default["mw"],
      "mw",
      "265"
    ],
    [
      countries_default["my"],
      "my",
      "60"
    ],
    [
      countries_default["mv"],
      "mv",
      "960"
    ],
    [
      countries_default["ml"],
      "ml",
      "223"
    ],
    [
      countries_default["mt"],
      "mt",
      "356"
    ],
    [
      countries_default["mh"],
      "mh",
      "692"
    ],
    [
      countries_default["mq"],
      "mq",
      "596"
    ],
    [
      countries_default["mr"],
      "mr",
      "222"
    ],
    [
      countries_default["mu"],
      "mu",
      "230"
    ],
    [
      countries_default["yt"],
      "yt",
      "262",
      1,
      ["269", "639"]
    ],
    [
      countries_default["mx"],
      "mx",
      "52"
    ],
    [
      countries_default["fm"],
      "fm",
      "691"
    ],
    [
      countries_default["md"],
      "md",
      "373"
    ],
    [
      countries_default["mc"],
      "mc",
      "377"
    ],
    [
      countries_default["mn"],
      "mn",
      "976"
    ],
    [
      countries_default["me"],
      "me",
      "382"
    ],
    [
      countries_default["ms"],
      "ms",
      "1",
      16,
      ["664"]
    ],
    [
      countries_default["ma"],
      "ma",
      "212",
      0
    ],
    [
      countries_default["mz"],
      "mz",
      "258"
    ],
    [
      countries_default["mm"],
      "mm",
      "95"
    ],
    [
      countries_default["na"],
      "na",
      "264"
    ],
    [
      countries_default["nr"],
      "nr",
      "674"
    ],
    [
      countries_default["np"],
      "np",
      "977"
    ],
    [
      countries_default["nl"],
      "nl",
      "31"
    ],
    [
      countries_default["nc"],
      "nc",
      "687"
    ],
    [
      countries_default["nz"],
      "nz",
      "64"
    ],
    [
      countries_default["ni"],
      "ni",
      "505"
    ],
    [
      countries_default["ne"],
      "ne",
      "227"
    ],
    [
      countries_default["ng"],
      "ng",
      "234"
    ],
    [
      countries_default["nu"],
      "nu",
      "683"
    ],
    [
      countries_default["nf"],
      "nf",
      "672"
    ],
    [
      countries_default["kp"],
      "kp",
      "850"
    ],
    [
      countries_default["mk"],
      "mk",
      "389"
    ],
    [
      countries_default["mp"],
      "mp",
      "1",
      17,
      ["670"]
    ],
    [
      countries_default["no"],
      "no",
      "47",
      0
    ],
    [
      countries_default["om"],
      "om",
      "968"
    ],
    [
      countries_default["pk"],
      "pk",
      "92"
    ],
    [
      countries_default["pw"],
      "pw",
      "680"
    ],
    [
      countries_default["ps"],
      "ps",
      "970"
    ],
    [
      countries_default["pa"],
      "pa",
      "507"
    ],
    [
      countries_default["pg"],
      "pg",
      "675"
    ],
    [
      countries_default["py"],
      "py",
      "595"
    ],
    [
      countries_default["pe"],
      "pe",
      "51"
    ],
    [
      countries_default["ph"],
      "ph",
      "63"
    ],
    [
      countries_default["pl"],
      "pl",
      "48"
    ],
    [
      countries_default["pt"],
      "pt",
      "351"
    ],
    [
      countries_default["pr"],
      "pr",
      "1",
      3,
      ["787", "939"]
    ],
    [
      countries_default["qa"],
      "qa",
      "974"
    ],
    [
      countries_default["re"],
      "re",
      "262",
      0
    ],
    [
      countries_default["ro"],
      "ro",
      "40"
    ],
    [
      countries_default["ru"],
      "ru",
      "7",
      0
    ],
    [
      countries_default["rw"],
      "rw",
      "250"
    ],
    [
      countries_default["ws"],
      "ws",
      "685"
    ],
    [
      countries_default["sm"],
      "sm",
      "378"
    ],
    [
      countries_default["st"],
      "st",
      "239"
    ],
    [
      countries_default["sa"],
      "sa",
      "966"
    ],
    [
      countries_default["sn"],
      "sn",
      "221"
    ],
    [
      countries_default["rs"],
      "rs",
      "381"
    ],
    [
      countries_default["sc"],
      "sc",
      "248"
    ],
    [
      countries_default["sl"],
      "sl",
      "232"
    ],
    [
      countries_default["sg"],
      "sg",
      "65"
    ],
    [
      countries_default["sx"],
      "sx",
      "1",
      21,
      ["721"]
    ],
    [
      countries_default["sk"],
      "sk",
      "421"
    ],
    [
      countries_default["si"],
      "si",
      "386"
    ],
    [
      countries_default["sb"],
      "sb",
      "677"
    ],
    [
      countries_default["so"],
      "so",
      "252"
    ],
    [
      countries_default["za"],
      "za",
      "27"
    ],
    [
      countries_default["kr"],
      "kr",
      "82"
    ],
    [
      countries_default["ss"],
      "ss",
      "211"
    ],
    [
      countries_default["es"],
      "es",
      "34"
    ],
    [
      countries_default["lk"],
      "lk",
      "94"
    ],
    [
      countries_default["bl"],
      "bl",
      "590",
      1
    ],
    [
      countries_default["sh"],
      "sh",
      "290"
    ],
    [
      countries_default["kn"],
      "kn",
      "1",
      18,
      ["869"]
    ],
    [
      countries_default["lc"],
      "lc",
      "1",
      19,
      ["758"]
    ],
    [
      countries_default["mf"],
      "mf",
      "590",
      2
    ],
    [
      countries_default["pm"],
      "pm",
      "508"
    ],
    [
      countries_default["vc"],
      "vc",
      "1",
      20,
      ["784"]
    ],
    [
      countries_default["sd"],
      "sd",
      "249"
    ],
    [
      countries_default["sr"],
      "sr",
      "597"
    ],
    [
      countries_default["sj"],
      "sj",
      "47",
      1,
      ["79"]
    ],
    [
      countries_default["se"],
      "se",
      "46"
    ],
    [
      countries_default["ch"],
      "ch",
      "41"
    ],
    [
      countries_default["sy"],
      "sy",
      "963"
    ],
    [
      countries_default["tw"],
      "tw",
      "886"
    ],
    [
      countries_default["tj"],
      "tj",
      "992"
    ],
    [
      countries_default["tz"],
      "tz",
      "255"
    ],
    [
      countries_default["th"],
      "th",
      "66"
    ],
    [
      countries_default["tl"],
      "tl",
      "670"
    ],
    [
      countries_default["tg"],
      "tg",
      "228"
    ],
    [
      countries_default["tk"],
      "tk",
      "690"
    ],
    [
      countries_default["to"],
      "to",
      "676"
    ],
    [
      countries_default["tt"],
      "tt",
      "1",
      22,
      ["868"]
    ],
    [
      countries_default["tn"],
      "tn",
      "216"
    ],
    [
      countries_default["tr"],
      "tr",
      "90"
    ],
    [
      countries_default["tm"],
      "tm",
      "993"
    ],
    [
      countries_default["tc"],
      "tc",
      "1",
      23,
      ["649"]
    ],
    [
      countries_default["tv"],
      "tv",
      "688"
    ],
    [
      countries_default["ug"],
      "ug",
      "256"
    ],
    [
      countries_default["ua"],
      "ua",
      "380"
    ],
    [
      countries_default["ae"],
      "ae",
      "971"
    ],
    [
      countries_default["gb"],
      "gb",
      "44",
      0
    ],
    [
      countries_default["us"],
      "us",
      "1",
      0
    ],
    [
      countries_default["uy"],
      "uy",
      "598"
    ],
    [
      countries_default["vi"],
      "vi",
      "1",
      24,
      ["340"]
    ],
    [
      countries_default["uz"],
      "uz",
      "998"
    ],
    [
      countries_default["vu"],
      "vu",
      "678"
    ],
    [
      countries_default["va"],
      "va",
      "39",
      1,
      ["06698"]
    ],
    [
      countries_default["ve"],
      "ve",
      "58"
    ],
    [
      countries_default["vn"],
      "vn",
      "84"
    ],
    [
      countries_default["wf"],
      "wf",
      "681"
    ],
    [
      countries_default["eh"],
      "eh",
      "212",
      1,
      ["5288", "5289"]
    ],
    [
      countries_default["ye"],
      "ye",
      "967"
    ],
    [
      countries_default["zm"],
      "zm",
      "260"
    ],
    [
      countries_default["zw"],
      "zw",
      "263"
    ],
    [
      countries_default["ax"],
      "ax",
      "358",
      1,
      ["18"]
    ]
  ];
  var allCountries = [];
  for (let i = 0; i < rawCountryData.length; i++) {
    const c = rawCountryData[i];
    allCountries[i] = {
      name: c[0],
      iso2: c[1],
      dialCode: c[2],
      priority: c[3] || 0,
      areaCodes: c[4] || null,
      nodeById: {}
    };
  }
  var data_default = allCountries;
  return __toCommonJS(data_exports);
})();

// UMD
  return factoryOutput.default;
}));
