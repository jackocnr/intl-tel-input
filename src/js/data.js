// Tell JSHint to ignore this warning: "character may get silently deleted by one or more browsers"
// jshint -W100

// Array of country objects for the flag dropdown.
// Each contains a name, country code (ISO 3166-1 alpha-2) and dial code.
// Originally from https://github.com/mledoze/countries

// then with a couple of manual re-arrangements to be alphabetical
// then changed Kazakhstan from +76 to +7
// and Vatican City from +379 to +39 (see issue 50)
// and Caribean Netherlands from +5997 to +599
// and Curacao from +5999 to +599
// Removed:  Kosovo, Pitcairn Islands, South Georgia

// UPDATE Sept 12th 2015
// List of regions that have iso2 country codes, which I have chosen to omit:
// (based on this information: https://en.wikipedia.org/wiki/List_of_country_calling_codes)
// AQ - Antarctica - all different country codes depending on which "base"
// BV - Bouvet Island - no calling code
// GS - South Georgia and the South Sandwich Islands - "inhospitable collection of islands" - same flag and calling code as Falkland Islands
// HM - Heard Island and McDonald Islands - no calling code
// PN - Pitcairn - tiny population (56), same calling code as New Zealand
// TF - French Southern Territories - no calling code
// UM - United States Minor Outlying Islands - no calling code

// UPDATE the criteria of supported countries or territories (see issue 297)
// Have an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// Have a country calling code: https://en.wikipedia.org/wiki/List_of_country_calling_codes
// Have a flag
// Must be supported by libphonenumber: https://github.com/googlei18n/libphonenumber

// Update: converted objects to arrays to save bytes!
// Update: added "priority" for countries with the same dialCode as others
// Update: added array of area codes for countries with the same dialCode as others

// So each country array has the following information:
// [
//    Country name,
//    iso2 code,
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes (if >1 country with same dial code)
// ]
var allCountries = [
  [
    "Afghanistan (‫افغانستان‬‎)",
    "af",
    "93",
    {
      "de": "Islamische Republik Afghanistan",
      "fr": "République islamique d'Afghanistan",
      "es": "República Islámica de Afganistán" 
    }
  ],
  [
    "Albania (Shqipëri)",
    "al",
    "355",
    {
      "de": "Republik Albanien",
      "fr": "République d'Albanie",
      "es": "República de Albania" 
    }
  ],
  [
    "Algeria (‫الجزائر‬‎)",
    "dz",
    "213",
    {
      "de": "Demokratische Volksrepublik Algerien",
      "fr": "République démocratique et populaire d'Algérie",
      "es": "República Argelina Democrática y Popular" 
    }
  ],
  [
    "American Samoa",
    "as",
    "1684",
    {
      "de": "Amerikanisch-Samoa",
      "fr": "Samoa américaines",
      "es": "Samoa Americana" 
    }
  ],
  [
    "Andorra",
    "ad",
    "376",
    {
      "de": "Fürstentum Andorra",
      "fr": "Principauté d'Andorre",
      "es": "Principado de Andorra" 
    }
  ],
  [
    "Angola",
    "ao",
    "244",
    {
      "de": "Republik Angola",
      "fr": "République d'Angola",
      "es": "República de Angola"
    }
  ],
  [
    "Anguilla",
    "ai",
    "1264",
    {
      "de": "Anguilla",
      "fr": "Anguilla",
      "es": "Anguila"
    }
  ],
  [
    "Antigua and Barbuda",
    "ag",
    "1268",
    {
      "de": "Antigua und Barbuda",
      "fr": "Antigua -et-Barbuda",
      "es": "Antigua y Barbuda"
    }
  ],
  [
    "Argentina",
    "ar",
    "54",
    {
      "de": "Argentinische Republik",
      "fr": "République argentine",
      "es": "República Argentina"
    }
  ],
  [
    "Armenia (Հայաստան)",
    "am",
    "374",
    {
      "de": "Republik Armenien",
      "fr": "République d'Arménie",
      "es": "República de Armenia"
    }
  ],
  [
    "Aruba",
    "aw",
    "297",
    {
      "de": "Aruba",
      "fr": "Aruba",
      "es": "Aruba"
    }
  ],
  [
    "Australia",
    "au",
    "61",
    {
      "de": "Commonwealth Australien",
      "fr": "Australie",
      "es": "Mancomunidad de Australia"
    },
    0
  ],
  [
    "Austria (Österreich)",
    "at",
    "43",
    {
      "de": "Republik Österreich",
      "fr": "République d'Autriche",
      "es": "República de Austria"
    }
  ],
  [
    "Azerbaijan (Azərbaycan)",
    "az",
    "994",
    {
      "de": "Republik Aserbaidschan",
      "fr": "République d'Azerbaïdjan",
      "es": "República de Azerbaiyán"
    }
  ],
  [
    "Bahamas",
    "bs",
    "1242",
    {
      "de": "Commonwealth der Bahamas",
      "fr": "Commonwealth des Bahamas",
      "es": "Commonwealth de las Bahamas"
    }
  ],
  [
    "Bahrain (‏البحرين)",
    "bh",
    "973",
    {
      "de": "Königreich Bahrain",
      "fr": "Royaume de Bahreïn",
      "es": "Reino de Bahrein"
    }
  ],
  [
    "Bangladesh (বাংলাদেশ)",
    "bd",
    "880",
    {
      "de": "Volksrepublik Bangladesch",
      "fr": "La République populaire du Bangladesh",
      "es": "República Popular de Bangladesh"
    }
  ],
  [
    "Barbados",
    "bb",
    "1246",
    {
      "de": "Barbados",
      "fr": "Barbade",
      "es": "Barbados"
    }
  ],
  [
    "Belarus (Беларусь)",
    "by",
    "375",
    {
      "de": "Republik Belarus",
      "fr": "République de Biélorussie",
      "es": "República de Belarús"
    }
  ],
  [
    "Belgium (België)",
    "be",
    "32",
    {
      "de": "Königreich Belgien",
      "fr": "Royaume de Belgique",
      "es": "Reino de Bélgica"
    }
  ],
  [
    "Belize",
    "bz",
    "501",
    {
      "de": "Belize",
      "fr": "Belize",
      "es": "Belice"
    }
  ],
  [
    "Benin (Bénin)",
    "bj",
    "229",
    {
      "de": "Republik Benin",
      "fr": "République du Bénin",
      "es": "República de Benin"
    }
  ],
  [
    "Bermuda",
    "bm",
    "1441",
    {
      "de": "Bermuda",
      "fr": "Bermudes",
      "es": "Bermuda"
    }
  ],
  [
    "Bhutan (འབྲུག)",
    "bt",
    "975",
    {
      "de": "Königreich Bhutan",
      "fr": "Royaume du Bhoutan",
      "es": "Reino de Bután"
    }
  ],
  [
    "Bolivia",
    "bo",
    "591",
    {
      "de": "Multinationaler Staat von Bolivien",
      "fr": "État plurinational de Bolivie",
      "es": "Estado Plurinacional de Bolivia"
    }
  ],
  [
    "Bosnia and Herzegovina (Босна и Херцеговина)",
    "ba",
    "387",
    {
      "de": "Bosnien und Herzegowina",
      "fr": "Bosnie-et-Herzégovine",
      "es": "Bosnia y Herzegovina"
    }
  ],
  [
    "Botswana",
    "bw",
    "267",
    {
      "de": "Republik Botsuana",
      "fr": "République du Botswana",
      "es": "República de Botswana"
    }
  ],
  [
    "Brazil (Brasil)",
    "br",
    "55",
    {
      "de": "Föderative Republik Brasilien",
      "fr": "République fédérative du Brésil",
      "es": "República Federativa del Brasil"
    }
  ],
  [
    "British Indian Ocean Territory",
    "io",
    "246",
    {
      "de": "Britisch-Indischer Ozean",
      "fr": "Territoire britannique de l' océan Indien",
      "es": "Territorio Británico del Océano Índico"
    }
  ],
  [
    "British Virgin Islands",
    "vg",
    "1284",
    {
      "de": "Jungferninseln",
      "fr": "îles Vierges",
      "es": "Islas Vírgenes"
    }
  ],
  [
    "Brunei",
    "bn",
    "673",
    {
      "de": "Nation von Brunei, Wohnung des Friedens",
      "fr": "État de Brunei Darussalam",
      "es": "Nación de Brunei, Morada de la Paz"
    }
  ],
  [
    "Bulgaria (България)",
    "bg",
    "359",
    {
      "de": "Republik Bulgarien",
      "fr": "République de Bulgarie",
      "es": "República de Bulgaria"
    }
  ],
  [
    "Burkina Faso",
    "bf",
    "226",
    {
      "de": "Burkina Faso",
      "fr": "République du Burkina",
      "es": "Burkina Faso"
    }
  ],
  [
    "Burundi (Uburundi)",
    "bi",
    "257",
    {
      "de": "Republik Burundi",
      "fr": "République du Burundi",
      "es": "República de Burundi"
    }
  ],
  [
    "Cambodia (កម្ពុជា)",
    "kh",
    "855",
    {
      "de": "Königreich Kambodscha",
      "fr": "Royaume du Cambodge",
      "es": "Reino de Camboya"
    }
  ],
  [
    "Cameroon (Cameroun)",
    "cm",
    "237",
    {
      "de": "Republik Kamerun",
      "fr": "République du Cameroun",
      "es": "República de Camerún"
    }
  ],
  [
    "Canada",
    "ca",
    "1",
    {
      "de": "Kanada",
      "fr": "Canada",
      "es": "Canadá"
    },
    1,
    ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]
  ],
  [
    "Cape Verde (Kabu Verdi)",
    "cv",
    "238",
    {
      "de": "Republik Cabo Verde",
      "fr": "République du Cap-Vert",
      "es": "República de Cabo Verde"
    }
  ],
  [
    "Caribbean Netherlands",
    "bq",
    "599",
    1
  ],
  [
    "Cayman Islands",
    "ky",
    "1345",
    {
      "de": "Cayman-Inseln",
      "fr": "Îles Caïmans",
      "es": "Islas Caimán"
    }
  ],
  [
    "Central African Republic (République centrafricaine)",
    "cf",
    "236",
    {
      "de": "Zentralafrikanische Republik",
      "fr": "République centrafricaine",
      "es": "República Centroafricana"
    }
  ],
  [
    "Chad (Tchad)",
    "td",
    "235",
    {
      "de": "Republik Tschad",
      "fr": "République du Tchad",
      "es": "República de Chad"
    }
  ],
  [
    "Chile",
    "cl",
    "56",
    {
      "de": "Republik Chile",
      "fr": "République du Chili",
      "es": "República de Chile"
    }
  ],
  [
    "China (中国)",
    "cn",
    "86",
    {
      "de": "Volksrepublik China",
      "fr": "République populaire de Chine",
      "es": "República Popular de China"
    }
  ],
  [
    "Christmas Island",
    "cx",
    "61",
    {
      "de": "Gebiet der Weihnachtsinsel",
      "fr": "Territoire de l'île Christmas",
      "es": "Territorio de la Isla de Navidad"
    },
    2
  ],
  [
    "Cocos (Keeling) Islands",
    "cc",
    "61",
    {
      "de": "Gebiet der Cocos (Keeling) Islands",
      "fr": "Territoire des îles Cocos (Keeling)",
      "es": "Territorio de los (Keeling) Islas Cocos"
    },
    1
  ],
  [
    "Colombia",
    "co",
    "57",
    {
      "de": "Republik Kolumbien",
      "fr": "République de Colombie",
      "es": "República de Colombia"
    }
  ],
  [
    "Comoros (‫جزر القمر‬‎)",
    "km",
    "269",
    {
      "de": "Union der Komoren",
      "fr": "Union des Comores",
      "es": "Unión de las Comoras"
    }
  ],
  [
    "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
    "cd",
    "243",
    {
      "de": "Demokratische Republik Kongo",
      "fr": "République démocratique du Congo",
      "es": "República Democrática del Congo"
    }
  ],
  [
    "Congo (Republic) (Congo-Brazzaville)",
    "cg",
    "242",
    {
      "de": "Republik Kongo",
      "fr": "République du Congo",
      "es": "República del Congo"
    }
  ],
  [
    "Cook Islands",
    "ck",
    "682",
    {
      "de": "Cook-Inseln",
      "fr": "Îles Cook",
      "es": "Islas Cook"
    }
  ],
  [
    "Costa Rica",
    "cr",
    "506",
    {
      "de": "Republik Costa Rica",
      "fr": "République du Costa Rica",
      "es": "República de Costa Rica"
    }
  ],
  [
    "Côte d’Ivoire",
    "ci",
    "225",
    {
      "de": "Republik Côte d'Ivoire",
      "fr": "République de Côte d' Ivoire",
      "es": "República de Côte d'Ivoire"
    }
  ],
  [
    "Croatia (Hrvatska)",
    "hr",
    "385",
    {
      "de": "Republik Kroatien",
      "fr": "République de Croatie",
      "es": "República de Croacia"
    }
  ],
  [
    "Cuba",
    "cu",
    "53",
    {
      "de": "Republik Kuba",
      "fr": "République de Cuba",
      "es": "República de Cuba"
    }
  ],
  [
    "Curaçao",
    "cw",
    "599",
    {
      "es": "País de Curazao"
    },
    0
  ],
  [
    "Cyprus (Κύπρος)",
    "cy",
    "357",
    {
      "de": "Republik Zypern",
      "fr": "République de Chypre",
      "es": "República de Chipre"
    }
  ],
  [
    "Czech Republic (Česká republika)",
    "cz",
    "420",
    {
      "de": "Tschechische Republik",
      "fr": "République tchèque",
      "es": "República Checa"
    }
  ],
  [
    "Denmark (Danmark)",
    "dk",
    "45",
    {
      "de": "Königreich Dänemark",
      "fr": "Royaume du Danemark",
      "es": "Reino de Dinamarca"
    }
  ],
  [
    "Djibouti",
    "dj",
    "253",
    {
      "de": "Republik Dschibuti",
      "fr": "République de Djibouti",
      "es": "República de Djibouti"
    }
  ],
  [
    "Dominica",
    "dm",
    "1767",
    {
      "de": "Commonwealth von Dominica",
      "fr": "Commonwealth de la Dominique",
      "es": "Mancomunidad de Dominica"
    }
  ],
  [
    "Dominican Republic (República Dominicana)",
    "do",
    "1",
    {
      "de": "Dominikanische Republik",
      "fr": "République Dominicaine",
      "es": "República Dominicana"
    },
    2,
    ["809", "829", "849"]
  ],
  [
    "Ecuador",
    "ec",
    "593",
    {
      "de": "Republik Ecuador",
      "fr": "République de l'Équateur",
      "es": "República del Ecuador"
    }
  ],
  [
    "Egypt (‫مصر‬‎)",
    "eg",
    "20",
    {
      "de": "Arabische Republik Ägypten",
      "fr": "République arabe d'Égypte",
      "es": "República Árabe de Egipto"
    }
  ],
  [
    "El Salvador",
    "sv",
    "503",
    {
      "de": "Republik El Salvador",
      "fr": "République du Salvador",
      "es": "República de El Salvador"
    }
  ],
  [
    "Equatorial Guinea (Guinea Ecuatorial)",
    "gq",
    "240",
    {
      "de": "Republik Äquatorialguinea",
      "fr": "République de Guinée équatoriale",
      "es": "República de Guinea Ecuatorial"
    }
  ],
  [
    "Eritrea",
    "er",
    "291",
    {
      "de": "Staat Eritrea",
      "fr": "État d'Érythrée",
      "es": "Estado de Eritrea"
    }
  ],
  [
    "Estonia (Eesti)",
    "ee",
    "372",
    {
      "de": "Republik Estland",
      "fr": "République d'Estonie",
      "es": "República de Estonia"
    }
  ],
  [
    "Ethiopia",
    "et",
    "251",
    {
      "de": "Demokratische Bundesrepublik Äthiopien",
      "fr": "République fédérale démocratique d'Éthiopie",
      "es": "República Democrática Federal de Etiopía"
    }
  ],
  [
    "Falkland Islands (Islas Malvinas)",
    "fk",
    "500",
    {
      "de": "Falkland-Inseln",
      "fr": "Îles Malouines",
      "es": "islas Malvinas"
    }
  ],
  [
    "Faroe Islands (Føroyar)",
    "fo",
    "298",
    {
      "de": "Färöer",
      "fr": "Îles Féroé",
      "es": "Islas Feroe"
    }
  ],
  [
    "Fiji",
    "fj",
    "679",
    {
      "de": "Republik Fidschi",
      "fr": "République des Fidji",
      "es": "República de Fiji"
    }
  ],
  [
    "Finland (Suomi)",
    "fi",
    "358",
    {
      "de": "Republik Finnland",
      "fr": "République de Finlande",
      "es": "República de Finlandia"
    },
    0
  ],
  [
    "France",
    "fr",
    "33",
    {
      "de": "Französische Republik",
      "fr": "République française",
      "es": "República francés"
    }
  ],
  [
    "French Guiana (Guyane française)",
    "gf",
    "594",
    {
      "de": "Guayana",
      "fr": "Guyane",
      "es": "Guayana"
    }
  ],
  [
    "French Polynesia (Polynésie française)",
    "pf",
    "689",
    {
      "de": "Französisch-Polynesien",
      "fr": "Polynésie française",
      "es": "Polinesia francés"
    }
  ],
  [
    "Gabon",
    "ga",
    "241",
    {
      "de": "Gabunische Republik",
      "fr": "République gabonaise",
      "es": "República de Gabón"
    }
  ],
  [
    "Gambia",
    "gm",
    "220",
    {
      "de": "Republik Gambia",
      "fr": "République de Gambie",
      "es": "República de Gambia"
    }
  ],
  [
    "Georgia (საქართველო)",
    "ge",
    "995",
    {
      "de": "Georgia",
      "fr": "République de Géorgie",
      "es": "Georgia"
    }
  ],
  [
    "Germany (Deutschland)",
    "de",
    "49",
    {
      "de": "Bundesrepublik Deutschland",
      "fr": "République fédérale d'Allemagne",
      "es": "República Federal de Alemania"
    }
  ],
  [
    "Ghana (Gaana)",
    "gh",
    "233",
    {
      "de": "Republik Ghana",
      "fr": "République du Ghana",
      "es": "República de Ghana"
    }
  ],
  [
    "Gibraltar",
    "gi",
    "350",
    {
      "de": "Gibraltar",
      "fr": "Gibraltar",
      "es": "Gibraltar"
    }
  ],
  [
    "Greece (Ελλάδα)",
    "gr",
    "30",
    {
      "de": "Hellenische Republik",
      "fr": "République hellénique",
      "es": "República Helénica"
    }
  ],
  [
    "Greenland (Kalaallit Nunaat)",
    "gl",
    "299",
    {
      "de": "Grönland",
      "fr": "Groenland",
      "es": "Groenlandia"
    }
  ],
  [
    "Grenada",
    "gd",
    "1473",
    {
      "de": "Grenada",
      "fr": "Grenade",
      "es": "Granada"
    }
  ],
  [
    "Guadeloupe",
    "gp",
    "590",
    {
      "de": "Guadeloupe",
      "fr": "Guadeloupe",
      "es": "Guadalupe"
    },
    0
  ],
  [
    "Guam",
    "gu",
    "1671",
    {
      "de": "Guam",
      "fr": "Guam",
      "es": "Guam"
    }
  ],
  [
    "Guatemala",
    "gt",
    "502",
    {
      "de": "Republik Guatemala",
      "fr": "République du Guatemala",
      "es": "República de Guatemala"
    }
  ],
  [
    "Guernsey",
    "gg",
    "44",
    {
      "de": "Guernsey",
      "fr": "Bailliage de Guernesey",
      "es": "Bailía de Guernsey"
    },
    1
  ],
  [
    "Guinea (Guinée)",
    "gn",
    "224",
    {
      "de": "Republik Guinea",
      "fr": "République de Guinée",
      "es": "República de Guinea"
    }
  ],
  [
    "Guinea-Bissau (Guiné Bissau)",
    "gw",
    "245",
    {
      "de": "Republik Guinea-Bissau",
      "fr": "République de Guinée-Bissau",
      "es": "República de Guinea-Bissau"
    }
  ],
  [
    "Guyana",
    "gy",
    "592",
    {
      "de": "Kooperative Republik Guyana",
      "fr": "République coopérative de Guyana",
      "es": "República Cooperativa de Guyana"
    }
  ],
  [
    "Haiti",
    "ht",
    "509",
    {
      "de": "Republik Haiti",
      "fr": "République d'Haïti",
      "es": "República de Haití"
    }
  ],
  [
    "Honduras",
    "hn",
    "504",
    {
      "de": "Republik Honduras",
      "fr": "République du Honduras",
      "es": "República de Honduras"
    }
  ],
  [
    "Hong Kong (香港)",
    "hk",
    "852",
    {
      "de": "Sonderverwaltungszone der Volksrepublik China",
      "fr": "Région administrative spéciale de Hong Kong de la République populaire de Chine",
      "es": "Hong Kong Región Administrativa Especial de la República Popular China"
    }
  ],
  [
    "Hungary (Magyarország)",
    "hu",
    "36",
    {
      "de": "Ungarn",
      "fr": "Hongrie",
      "es": "Hungría"
    }
  ],
  [
    "Iceland (Ísland)",
    "is",
    "354",
    {
      "de": "Island",
      "fr": "République d'Islande",
      "es": "Islandia"
    }
  ],
  [
    "India (भारत)",
    "in",
    "91",
    {
      "de": "Republik Indien",
      "fr": "République de l'Inde",
      "es": "República de la India"
    }
  ],
  [
    "Indonesia",
    "id",
    "62",
    {
      "de": "Republik Indonesien",
      "fr": "République d'Indonésie",
      "es": "República de Indonesia"
    }
  ],
  [
    "Iran (‫ایران‬‎)",
    "ir",
    "98",
    {
      "de": "Islamische Republik Iran",
      "fr": "République islamique d'Iran",
      "es": "República Islámica de Irán"
    }
  ],
  [
    "Iraq (‫العراق‬‎)",
    "iq",
    "964",
    {
      "de": "Republik Irak",
      "fr": "République d'Irak",
      "es": "República de Irak"
    }
  ],
  [
    "Ireland",
    "ie",
    "353",
    {
      "de": "Republik Irland",
      "fr": "République d'Irlande",
      "es": "República de Irlanda"
    }
  ],
  [
    "Isle of Man",
    "im",
    "44",
    {
      "de": "Isle of Man",
      "fr": "Isle of Man",
      "es": "Isla de Man"
    },
    2
  ],
  [
    "Israel (‫ישראל‬‎)",
    "il",
    "972",
    {
      "de": "Staat Israel",
      "fr": "État d'Israël",
      "es": "Estado de Israel"
    }
  ],
  [
    "Italy (Italia)",
    "it",
    "39",
    {
      "de": "Italienische Republik",
      "fr": "République italienne",
      "es": "República Italiana"
    },
    0
  ],
  [
    "Jamaica",
    "jm",
    "1876",
    {
      "de": "Jamaika",
      "fr": "Jamaïque",
      "es": "Jamaica"
    }
  ],
  [
    "Japan (日本)",
    "jp",
    "81",
    {
      "de": "Japan",
      "fr": "Japon",
      "es": "Japón"
    }
  ],
  [
    "Jersey",
    "je",
    "44",
    {
      "de": "Vogtei Jersey",
      "fr": "Bailliage de Jersey",
      "es": "Bailía de Jersey"
    },
    3
  ],
  [
    "Jordan (‫الأردن‬‎)",
    "jo",
    "962",
    {
      "de": "Haschemitisches Königreich Jordanien",
      "fr": "Royaume hachémite de Jordanie",
      "es": "Reino Hachemita de Jordania"
    }
  ],
  [
    "Kazakhstan (Казахстан)",
    "kz",
    "7",
    {
      "de": "Republik Kasachstan",
      "fr": "République du Kazakhstan",
      "es": "República de Kazajstán"
    },
    1
  ],
  [
    "Kenya",
    "ke",
    "254",
    {
      "de": "Republik Kenia",
      "fr": "République du Kenya",
      "es": "República de Kenya"
    }
  ],
  [
    "Kiribati",
    "ki",
    "686",
    {
      "de": "Unabhängige und souveräne Republik Kiribati",
      "fr": "République de Kiribati",
      "es": "República Independiente y Soberano de Kiribati"
    }
  ],
  [
    "Kuwait (‫الكويت‬‎)",
    "kw",
    "965",
    {
      "de": "Staat Kuwait",
      "fr": "État du Koweït",
      "es": "Estado de Kuwait"
    }
  ],
  [
    "Kyrgyzstan (Кыргызстан)",
    "kg",
    "996",
    {
      "de": "Kirgisische Republik",
      "fr": "République kirghize",
      "es": "República Kirguisa"
    }
  ],
  [
    "Laos (ລາວ)",
    "la",
    "856",
    {
      "de": "Laos, Demokratische Volksrepublik",
      "fr": "République démocratique populaire lao",
      "es": "República Democrática Popular Lao"
    }
  ],
  [
    "Latvia (Latvija)",
    "lv",
    "371",
    {
      "de": "Republik Lettland",
      "fr": "République de Lettonie",
      "es": "República de Letonia"
    }
  ],
  [
    "Lebanon (‫لبنان‬‎)",
    "lb",
    "961",
    {
      "de": "Libanesische Republik",
      "fr": "République libanaise",
      "es": "República Libanesa"
    }
  ],
  [
    "Lesotho",
    "ls",
    "266",
    {
      "de": "Königreich Lesotho",
      "fr": "Royaume du Lesotho",
      "es": "Reino de Lesotho"
    }
  ],
  [
    "Liberia",
    "lr",
    "231",
    {
      "de": "Republik Liberia",
      "fr": "République du Libéria",
      "es": "República de Liberia"
    }
  ],
  [
    "Libya (‫ليبيا‬‎)",
    "ly",
    "218",
    {
      "de": "Staat Libyen",
      "fr": "Grande République arabe libyenne populaire et socialiste",
      "es": "Estado de Libia"
    }
  ],
  [
    "Liechtenstein",
    "li",
    "423",
    {
      "de": "Fürstentum Liechtenstein",
      "fr": "Principauté du Liechtenstein",
      "es": "Principado de Liechtenstein"
    }
  ],
  [
    "Lithuania (Lietuva)",
    "lt",
    "370",
    {
      "de": "Republik Litauen",
      "fr": "République de Lituanie",
      "es": "República de Lituania"
    }
  ],
  [
    "Luxembourg",
    "lu",
    "352",
    {
      "de": "Großherzogtum Luxemburg,",
      "fr": "Grand-Duché de Luxembourg",
      "es": "Gran Ducado de Luxemburgo"
    }
  ],
  [
    "Macau (澳門)",
    "mo",
    "853",
    {
      "de": "Sonderverwaltungsregion Macau der Volksrepublik China",
      "fr": "Région administrative spéciale de Macao de la République populaire de Chine",
      "es": "Macao, Región Administrativa Especial de la República Popular China"
    }
  ],
  [
    "Macedonia (FYROM) (Македонија)",
    "mk",
    "389",
    {
      "de": "Republik Mazedonien",
      "fr": "République de Macédoine",
      "es": "República de Macedonia"
    }
  ],
  [
    "Madagascar (Madagasikara)",
    "mg",
    "261",
    {
      "de": "Republik Madagaskar",
      "fr": "République de Madagascar",
      "es": "República de Madagascar"
    }
  ],
  [
    "Malawi",
    "mw",
    "265",
    {
      "de": "Republik Malawi",
      "fr": "République du Malawi",
      "es": "República de Malawi"
    }
  ],
  [
    "Malaysia",
    "my",
    "60",
    {
      "de": "Malaysia",
      "fr": "Fédération de Malaisie",
      "es": "Malasia"
    }
  ],
  [
    "Maldives",
    "mv",
    "960",
    {
      "de": "Republik Malediven",
      "fr": "République des Maldives",
      "es": "República de las Maldivas"
    }
  ],
  [
    "Mali",
    "ml",
    "223",
    {
      "de": "Republik Mali",
      "fr": "République du Mali",
      "es": "República de Malí"
    }
  ],
  [
    "Malta",
    "mt",
    "356",
    {
      "de": "Republik Malta",
      "fr": "République de Malte",
      "es": "República de Malta"
    }
  ],
  [
    "Marshall Islands",
    "mh",
    "692",
    {
      "de": "Republik der Marshall-Inseln",
      "fr": "République des Îles Marshall",
      "es": "República de las Islas Marshall"
    }
  ],
  [
    "Martinique",
    "mq",
    "596",
    {
      "de": "Martinique",
      "fr": "Martinique",
      "es": "Martinica"
    }
  ],
  [
    "Mauritania (‫موريتانيا‬‎)",
    "mr",
    "222",
    {
      "de": "Islamische Republik Mauretanien",
      "fr": "République islamique de Mauritanie",
      "es": "República Islámica de Mauritania"
    }
  ],
  [
    "Mauritius (Moris)",
    "mu",
    "230",
    {
      "de": "Republik Mauritius",
      "fr": "République de Maurice",
      "es": "República de Mauricio"
    }
  ],
  [
    "Mayotte",
    "yt",
    "262",
    {
      "de": "Übersee-Département Mayotte",
      "fr": "Département de Mayotte",
      "es": "Departamento de Mayotte"
    },
    1
  ],
  [
    "Mexico (México)",
    "mx",
    "52",
    {
      "de": "Vereinigte Mexikanische Staaten",
      "fr": "États-Unis du Mexique",
      "es": "Estados Unidos Mexicanos"
    }
  ],
  [
    "Micronesia",
    "fm",
    "691",
    {
      "de": "Föderierte Staaten von Mikronesien",
      "fr": "États fédérés de Micronésie",
      "es": "Estados Federados de Micronesia"
    }
  ],
  [
    "Moldova (Republica Moldova)",
    "md",
    "373",
    {
      "de": "Republik Moldau",
      "fr": "République de Moldavie",
      "es": "República de Moldova"
    }
  ],
  [
    "Monaco",
    "mc",
    "377",
    {
      "de": "Fürstentum Monaco",
      "fr": "Principauté de Monaco",
      "es": "Principado de Mónaco"
    }
  ],
  [
    "Mongolia (Монгол)",
    "mn",
    "976",
    {
      "de": "Mongolei",
      "fr": "Mongolie",
      "es": "Mongolia"
    }
  ],
  [
    "Montenegro (Crna Gora)",
    "me",
    "382",
    {
      "de": "Montenegro",
      "fr": "Monténégro",
      "es": "Montenegro"
    }
  ],
  [
    "Montserrat",
    "ms",
    "1664",
    {
      "de": "Montserrat",
      "fr": "Montserrat",
      "es": "Montserrat"
    }
  ],
  [
    "Morocco (‫المغرب‬‎)",
    "ma",
    "212",
    {
      "de": "Königreich Marokko",
      "fr": "Royaume du Maroc",
      "es": "Reino de Marruecos"
    },
    0
  ],
  [
    "Mozambique (Moçambique)",
    "mz",
    "258",
    {
      "de": "Republik Mosambik",
      "fr": "République du Mozambique",
      "es": "República de Mozambique"
    }
  ],
  [
    "Myanmar (Burma) (မြန်မာ)",
    "mm",
    "95",
    {
      "de": "Republik der Union von Myanmar",
      "fr": "République de l'Union du Myanmar",
      "es": "República de la Unión de Myanmar"
    }
  ],
  [
    "Namibia (Namibië)",
    "na",
    "264",
    {
      "de": "Republik Namibia",
      "fr": "République de Namibie",
      "es": "República de Namibia"
    }
  ],
  [
    "Nauru",
    "nr",
    "674",
    {
      "de": "Republik Nauru",
      "fr": "République de Nauru",
      "es": "República de Nauru"
    }
  ],
  [
    "Nepal (नेपाल)",
    "np",
    "977",
    {
      "de": "Demokratischen Bundesrepublik Nepal",
      "fr": "République du Népal",
      "es": "República Democrática Federal de Nepal"
    }
  ],
  [
    "Netherlands (Nederland)",
    "nl",
    "31",
    {
      "de": "Niederlande",
      "fr": "Pays-Bas",
      "es": "Países Bajos"
    }
  ],
  [
    "New Caledonia (Nouvelle-Calédonie)",
    "nc",
    "687",
    {
      "de": "Neukaledonien",
      "fr": "Nouvelle-Calédonie",
      "es": "nueva Caledonia"
    }
  ],
  [
    "New Zealand",
    "nz",
    "64",
    {
      "de": "Neuseeland",
      "fr": "Nouvelle-Zélande",
      "es": "nueva Zelanda"
    }
  ],
  [
    "Nicaragua",
    "ni",
    "505",
    {
      "de": "Republik Nicaragua",
      "fr": "République du Nicaragua",
      "es": "República de Nicaragua"
    }
  ],
  [
    "Niger (Nijar)",
    "ne",
    "227",
    {
      "de": "Republik Niger",
      "fr": "République du Niger",
      "es": "República de Níger"
    }
  ],
  [
    "Nigeria",
    "ng",
    "234",
    {
      "de": "Bundesrepublik Nigeria",
      "fr": "République fédérale du Nigeria",
      "es": "República Federal de Nigeria"
    }
  ],
  [
    "Niue",
    "nu",
    "683",
    {
      "de": "Niue",
      "fr": "Niue",
      "es": "Niue"
    }
  ],
  [
    "Norfolk Island",
    "nf",
    "672",
    {
      "de": "Gebiet der Norfolk-Insel",
      "fr": "Territoire de l'île Norfolk",
      "es": "Territorio de la Isla Norfolk"
    }
  ],
  [
    "North Korea (조선 민주주의 인민 공화국)",
    "kp",
    "850",
    {
      "de": "Demokratische Volksrepublik Korea",
      "fr": "République populaire démocratique de Corée",
      "es": "República Popular Democrática de Corea"
    }
  ],
  [
    "Northern Mariana Islands",
    "mp",
    "1670",
    {
      "de": "Commonwealth der Nördlichen Marianen",
      "fr": "Commonwealth des îles Mariannes du Nord",
      "es": "Mancomunidad de las Islas Marianas del Norte"
    }
  ],
  [
    "Norway (Norge)",
    "no",
    "47",
    {
      "de": "Königreich Norwegen",
      "fr": "Royaume de Norvège",
      "es": "Reino de Noruega"
    },
    0
  ],
  [
    "Oman (‫عُمان‬‎)",
    "om",
    "968",
    {
      "de": "Sultanat Oman",
      "fr": "Sultanat d'Oman",
      "es": "Sultanato de Omán"
    }
  ],
  [
    "Pakistan (‫پاکستان‬‎)",
    "pk",
    "92",
    {
      "de": "Islamische Republik Pakistan",
      "fr": "République islamique du Pakistan",
      "es": "República Islámica de Pakistán"
    }
  ],
  [
    "Palau",
    "pw",
    "680",
    {
      "de": "Palau",
      "fr": "République des Palaos (Palau)",
      "es": "República de Palau"
    }
  ],
  [
    "Palestine (‫فلسطين‬‎)",
    "ps",
    "970",
    {
      "de": "Staat Palästina",
      "fr": "État de Palestine",
      "es": "Estado de Palestina"
    }
  ],
  [
    "Panama (Panamá)",
    "pa",
    "507",
    {
      "de": "Republik Panama",
      "fr": "République du Panama",
      "es": "República de Panamá"
    }
  ],
  [
    "Papua New Guinea",
    "pg",
    "675",
    {
      "de": "Unabhängige Staat Papua-Neuguinea",
      "fr": "État indépendant de Papouasie-Nouvelle-Guinée",
      "es": "Estado Independiente de Papúa Nueva Guinea"
    }
  ],
  [
    "Paraguay",
    "py",
    "595",
    {
      "de": "Republik Paraguay",
      "fr": "République du Paraguay",
      "es": "República de Paraguay"
    }
  ],
  [
    "Peru (Perú)",
    "pe",
    "51",
    {
      "de": "Republik Peru",
      "fr": "République du Pérou",
      "es": "República de Perú"
    }
  ],
  [
    "Philippines",
    "ph",
    "63",
    {
      "de": "Republik der Philippinen",
      "fr": "République des Philippines",
      "es": "República de las Filipinas"
    }
  ],
  [
    "Poland (Polska)",
    "pl",
    "48",
    {
      "de": "Republik Polen",
      "fr": "République de Pologne",
      "es": "República de Polonia"
    }
  ],
  [
    "Portugal",
    "pt",
    "351",
    {
      "de": "Portugiesische Republik",
      "fr": "République portugaise",
      "es": "República Portuguesa"
    }
  ],
  [
    "Puerto Rico",
    "pr",
    "1",
    {
      "de": "Commonwealth von Puerto Rico",
      "fr": "Porto Rico",
      "es": "Asociado de Puerto Rico"
    },
    3,
    ["787", "939"]
  ],
  [
    "Qatar (‫قطر‬‎)",
    "qa",
    "974",
    {
      "de": "Staat Katar",
      "fr": "État du Qatar",
      "es": "Estado de Qatar"
    }
  ],
  [
    "Réunion (La Réunion)",
    "re",
    "262",
    {
      "de": "Réunion",
      "fr": "Ile de la Réunion",
      "es": "Isla de la Reunión"
    },
    0
  ],
  [
    "Romania (România)",
    "ro",
    "40",
    {
      "de": "Rumänien",
      "fr": "Roumanie",
      "es": "Rumania"
    }
  ],
  [
    "Russia (Россия)",
    "ru",
    "7",
    {
      "de": "Russische Föderation",
      "fr": "Fédération de Russie",
      "es": "Federación de Rusia"
    },
    0
  ],
  [
    "Rwanda",
    "rw",
    "250",
    {
      "de": "Republik Ruanda",
      "fr": "République rwandaise",
      "es": "República de Rwanda"
    }
  ],
  [
    "Saint Barthélemy (Saint-Barthélemy)",
    "bl",
    "590",
    {
      "de": "Gebietskörperschaft Saint -Barthélemy",
      "fr": "Collectivité de Saint-Barthélemy",
      "es": "Colectividad de San Barthélemy"
    },
    1
  ],
  [
    "Saint Helena",
    "sh",
    "290"
  ],
  [
    "Saint Kitts and Nevis",
    "kn",
    "1869",
    {
      "de": "Föderation von Saint Kitts und Nevisa",
      "fr": "Fédération de Saint -Christophe-et Nevisa",
      "es": "Federación de San Cristóbal y Nevisa"
    }
  ],
  [
    "Saint Lucia",
    "lc",
    "1758",
    {
      "de": "St. Lucia",
      "fr": "Sainte-Lucie",
      "es": "Santa Lucía"
    }
  ],
  [
    "Saint Martin (Saint-Martin (partie française))",
    "mf",
    "590",
    {
      "de": "St. Martin",
      "fr": "Saint-Martin",
      "es": "Saint Martin"
    },
    2
  ],
  [
    "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
    "pm",
    "508",
    {
      "de": "St. Pierre und Miquelon",
      "fr": "Saint-Pierre-et-Miquelon",
      "es": "San Pedro y Miquelón"
    }
  ],
  [
    "Saint Vincent and the Grenadines",
    "vc",
    "1784",
    {
      "de": "St. Vincent und die Grenadinen",
      "fr": "Saint-Vincent-et-les Grenadines",
      "es": "San Vicente y las Granadinas"
    }
  ],
  [
    "Samoa",
    "ws",
    "685",
    {
      "de": "Unabhängige Staat Samoa",
      "fr": "Samoa",
      "es": "Estado Independiente de Samoa"
    }
  ],
  [
    "San Marino",
    "sm",
    "378",
    {
      "de": "Republik San Marino",
      "fr": "République de Saint-Marin",
      "es": "Serenísima República de San Marino"
    }
  ],
  [
    "São Tomé and Príncipe (São Tomé e Príncipe)",
    "st",
    "239",
    {
      "de": "Demokratische Republik São Tomé und Príncipe",
      "fr": "République démocratique de São Tomé et Príncipe",
      "es": "República Democrática de Santo Tomé y Príncipe"
    }
  ],
  [
    "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
    "sa",
    "966",
    {
      "de": "Königreich Saudi-Arabien",
      "fr": "Royaume d'Arabie Saoudite",
      "es": "Reino de Arabia Saudita"
    }
  ],
  [
    "Senegal (Sénégal)",
    "sn",
    "221",
    {
      "de": "Republik Senegal",
      "fr": "République du Sénégal",
      "es": "República de Senegal"
    }
  ],
  [
    "Serbia (Србија)",
    "rs",
    "381",
    {
      "de": "Republik Serbien",
      "fr": "République de Serbie",
      "es": "República de Serbia"
    }
  ],
  [
    "Seychelles",
    "sc",
    "248",
    {
      "de": "Republik der Seychellen",
      "fr": "République des Seychelles",
      "es": "República de las Seychelles"
    }
  ],
  [
    "Sierra Leone",
    "sl",
    "232",
    {
      "de": "Republik Sierra Leone",
      "fr": "République de Sierra Leone",
      "es": "República de Sierra Leona"
    }
  ],
  [
    "Singapore",
    "sg",
    "65",
    {
      "de": "Republik Singapur",
      "fr": "République de Singapour",
      "es": "República de Singapur"
    }
  ],
  [
    "Sint Maarten",
    "sx",
    "1721",
    {
      "de": "Sint Maarten",
      "fr": "Sint Maarten",
      "es": "Sint Maarten"
    }
  ],
  [
    "Slovakia (Slovensko)",
    "sk",
    "421",
    {
      "de": "Slowakische Republik",
      "fr": "République slovaque",
      "es": "República Eslovaca"
    }
  ],
  [
    "Slovenia (Slovenija)",
    "si",
    "386",
    {
      "de": "Republik Slowenien",
      "fr": "République de Slovénie",
      "es": "República de Eslovenia"
    }
  ],
  [
    "Solomon Islands",
    "sb",
    "677",
    {
      "de": "Salomon-Inseln",
      "fr": "Îles Salomon",
      "es": "islas Salomón"
    }
  ],
  [
    "Somalia (Soomaaliya)",
    "so",
    "252",
    {
      "de": "Bundesrepublik Somalia",
      "fr": "République fédérale de Somalie",
      "es": "República Federal de Somalia"
    }
  ],
  [
    "South Africa",
    "za",
    "27",
    {
      "de": "Republik Südafrika",
      "fr": "République d'Afrique du Sud",
      "es": "República de Sudáfrica"
    }
  ],
  [
    "South Korea (대한민국)",
    "kr",
    "82",
    {
      "de": "Republik Korea",
      "fr": "République de Corée",
      "es": "República de Corea"
    }
  ],
  [
    "South Sudan (‫جنوب السودان‬‎)",
    "ss",
    "211",
    {
      "de": "Republik Südsudan",
      "fr": "République du Soudan du Sud",
      "es": "República de Sudán del Sur"
    }
  ],
  [
    "Spain (España)",
    "es",
    "34",
    {
      "de": "Königreich Spanien",
      "fr": "Royaume d'Espagne",
      "es": "Reino de España"
    }
  ],
  [
    "Sri Lanka (ශ්‍රී ලංකාව)",
    "lk",
    "94",
    {
      "de": "Demokratische Sozialistische Republik Sri Lanka",
      "fr": "République démocratique socialiste du Sri Lanka",
      "es": "República Democrática Socialista de Sri Lanka"
    }
  ],
  [
    "Sudan (‫السودان‬‎)",
    "sd",
    "249",
    {
      "de": "Republik Sudan",
      "fr": "République du Soudan",
      "es": "República de Sudán"
    }
  ],
  [
    "Suriname",
    "sr",
    "597",
    {
      "de": "Republik Suriname",
      "fr": "République du Suriname",
      "es": "República de Suriname"
    }
  ],
  [
    "Svalbard and Jan Mayen",
    "sj",
    "47",
    {
      "de": "Inselgruppe Spitzbergen",
      "fr": "Jan Mayen Svalbard",
      "es": "Svalbard og Jan Mayen"
    },
    1
  ],
  [
    "Swaziland",
    "sz",
    "268",
    {
      "de": "Königreich Swasiland",
      "fr": "Royaume du Swaziland",
      "es": "Reino de Swazilandia"
    }
  ],
  [
    "Sweden (Sverige)",
    "se",
    "46",
    {
      "de": "Königreich Schweden",
      "fr": "Royaume de Suède",
      "es": "Reino de Suecia"
    }
  ],
  [
    "Switzerland (Schweiz)",
    "ch",
    "41",
    {
      "de": "Schweizerische Eidgenossenschaft",
      "fr": "Confédération suisse",
      "es": "Confederación Suiza"
    }
  ],
  [
    "Syria (‫سوريا‬‎)",
    "sy",
    "963",
    {
      "de": "Arabische Republik Syrien",
      "fr": "République arabe syrienne",
      "es": "República Árabe Siria"
    }
  ],
  [
    "Taiwan (台灣)",
    "tw",
    "886",
    {
      "de": "Republik China (Taiwan)",
      "fr": "République de Chine (Taïwan)",
      "es": "República de China en Taiwán"
    }
  ],
  [
    "Tajikistan",
    "tj",
    "992",
    {
      "de": "Republik Tadschikistan",
      "fr": "République du Tadjikistan",
      "es": "República de Tayikistán"
    }
  ],
  [
    "Tanzania",
    "tz",
    "255",
    {
      "de": "Vereinigte Republik Tansania",
      "fr": "République -Unie de Tanzanie",
      "es": "República Unida de Tanzania"
    }
  ],
  [
    "Thailand (ไทย)",
    "th",
    "66",
    {
      "de": "Königreich Thailand",
      "fr": "Royaume de Thaïlande",
      "es": "Reino de Tailandia"
    }
  ],
  [
    "Timor-Leste",
    "tl",
    "670",
    {
      "de": "Demokratische Republik Timor-Leste",
      "fr": "République démocratique du Timor oriental",
      "es": "República Democrática de Timor-Leste"
    }
  ],
  [
    "Togo",
    "tg",
    "228",
    {
      "de": "Republik Togo",
      "fr": "République togolaise",
      "es": "República de Togo"
    }
  ],
  [
    "Tokelau",
    "tk",
    "690",
    {
      "de": "Tokelau",
      "fr": "Îles Tokelau",
      "es": "Tokelau"
    }
  ],
  [
    "Tonga",
    "to",
    "676",
    {
      "de": "Königreich Tonga",
      "fr": "Royaume des Tonga",
      "es": "Reino de Tonga"
    }
  ],
  [
    "Trinidad and Tobago",
    "tt",
    "1868",
    {
      "de": "Republik Trinidad und Tobago",
      "fr": "République de Trinité-et-Tobago",
      "es": "República de Trinidad y Tobago"
    }
  ],
  [
    "Tunisia (‫تونس‬‎)",
    "tn",
    "216",
    {
      "de": "Tunesische Republik",
      "fr": "République tunisienne",
      "es": "República de Túnez"
    }
  ],
  [
    "Turkey (Türkiye)",
    "tr",
    "90",
    {
      "de": "Republik Türkei",
      "fr": "République de Turquie",
      "es": "República de Turquía"
    }
  ],
  [
    "Turkmenistan",
    "tm",
    "993",
    {
      "de": "Turkmenistan",
      "fr": "Turkménistan",
      "es": "Turkmenistán"
    }
  ],
  [
    "Turks and Caicos Islands",
    "tc",
    "1649",
    {
      "de": "Turks und Caicos Inseln",
      "fr": "Îles Turques et Caïques",
      "es": "Islas Turcas y Caicos"
    }
  ],
  [
    "Tuvalu",
    "tv",
    "688",
    {
      "de": "Tuvalu",
      "fr": "Tuvalu",
      "es": "Tuvalu"
    }
  ],
  [
    "U.S. Virgin Islands",
    "vi",
    "1340",
    {
      "de": "Jungferninseln der Vereinigten Staaten",
      "fr": "Îles Vierges des États-Unis",
      "es": "Islas Vírgenes de los Estados Unidos"
    }
  ],
  [
    "Uganda",
    "ug",
    "256",
    {
      "de": "Republik Uganda",
      "fr": "République de l'Ouganda",
      "es": "República de Uganda"
    }
  ],
  [
    "Ukraine (Україна)",
    "ua",
    "380",
    {
      "de": "Ukraine",
      "fr": "Ukraine",
      "es": "Ucrania"
    }
  ],
  [
    "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
    "ae",
    "971",
    {
      "de": "Vereinigte Arabische Emirate",
      "fr": "Émirats arabes unis",
      "es": "Emiratos Árabes Unidos"
    }
  ],
  [
    "United Kingdom",
    "gb",
    "44",
    {
      "de": "Vereinigtes Königreich Großbritannien und Nordirland",
      "fr": "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord",
      "es": "Reino Unido de Gran Bretaña e Irlanda del Norte"
    },
    0
  ],
  [
    "United States",
    "us",
    "1",
    {
      "de": "Vereinigte Staaten von Amerika",
      "fr": "Les états-unis d'Amérique",
      "es": "Estados Unidos de América"
    },
    0
  ],
  [
    "Uruguay",
    "uy",
    "598",
    {
      "de": "Republik Östlich des Uruguay",
      "fr": "République orientale de l'Uruguay",
      "es": "República Oriental del Uruguay"
    }
  ],
  [
    "Uzbekistan (Oʻzbekiston)",
    "uz",
    "998",
    {
      "de": "Republik Usbekistan",
      "fr": "République d'Ouzbékistan",
      "es": "República de Uzbekistán"
    }
  ],
  [
    "Vanuatu",
    "vu",
    "678",
    {
      "de": "Vanuatu",
      "fr": "République de Vanuatu",
      "es": "República de Vanuatu"
    }
  ],
  [
    "Vatican City (Città del Vaticano)",
    "va",
    "39",
    {
      "de": "Staat Vatikanstadt",
      "fr": "Cité du Vatican",
      "es": "Ciudad del Vaticano"
    },
    1
  ],
  [
    "Venezuela",
    "ve",
    "58",
    {
      "de": "Bolivarische Republik Venezuela",
      "fr": "République bolivarienne du Venezuela",
      "es": "República Bolivariana de Venezuela"
    }
  ],
  [
    "Vietnam (Việt Nam)",
    "vn",
    "84",
    {
      "de": "Sozialistische Republik Vietnam",
      "fr": "République socialiste du Viêt Nam",
      "es": "República Socialista de Vietnam"
    }
  ],
  [
    "Wallis and Futuna",
    "wf",
    "681",
    {
      "de": "Gebiet der Wallis und Futuna",
      "fr": "Territoire des îles Wallis et Futuna",
      "es": "Territorio de las Islas Wallis y Futuna"
    }
  ],
  [
    "Western Sahara (‫الصحراء الغربية‬‎)",
    "eh",
    "212",
    {
      "de": "Demokratische Arabische Republik Sahara",
      "fr": "République arabe sahraouie démocratique",
      "es": "República Árabe Saharaui Democrática"
    },
    1
  ],
  [
    "Yemen (‫اليمن‬‎)",
    "ye",
    "967",
    {
      "de": "Republik Jemen",
      "fr": "République du Yémen",
      "es": "República de Yemen"
    }
  ],
  [
    "Zambia",
    "zm",
    "260",
    {
      "de": "Republik Sambia",
      "fr": "République de Zambie",
      "es": "República de Zambia"
    }
  ],
  [
    "Zimbabwe",
    "zw",
    "263",
    {
      "de": "Republik Simbabwe",
      "fr": "République du Zimbabwe",
      "es": "República de Zimbabue"
    }
  ],
  [
    "Åland Islands",
    "ax",
    "358",
    {
      "de": "Åland-Inseln",
      "fr": "Ahvenanmaa",
      "es": "Islas Åland"
    },
    1
  ]
];

// loop over all of the countries above
for (var i = 0; i < allCountries.length; i++) {
  var c = allCountries[i];
  allCountries[i] = {
    name: c[0],
    iso2: c[1],
    dialCode: c[2],
    translations: c[3] || {},
    priority: c[4] || 0,
    areaCodes: c[5] || null
  };
}
