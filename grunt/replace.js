module.exports = function(grunt) {
  return {
    one: {
      options: {
        patterns: [

          /***********
           * PRIVATE METHODS
           * (special treatment for the _init method, which is a subset of other method names)
           ***********/
          {
            match: /_init:/g,
            replacement: '_a:'
          }, {
            match: /_init\(/g,
            replacement: '_a('
          }, {
            match: /_processCountryData/g,
            replacement: '_b'
          }, {
            match: /_addCountryCode/g,
            replacement: '_c'
          }, {
            match: /_processAllCountries/g,
            replacement: '_d'
          }, {
            match: /_processCountryCodes/g,
            replacement: '_d2'
          }, {
            match: /_processPreferredCountries/g,
            replacement: '_e'
          }, {
            match: /_generateMarkup/g,
            replacement: '_f'
          }, {
            match: /_appendListItems/g,
            replacement: '_g'
          }, {
            match: /_setInitialState/g,
            replacement: '_h'
          }, {
            match: /_initListeners/g,
            replacement: '_i'
          }, {
            match: /_initDropdownListeners/g,
            replacement: '_i1'
          }, {
            match: /_initRequests/g,
            replacement: '_i2'
          }, {
            match: /_loadAutoCountry/g,
            replacement: '_i3'
          }, {
            match: /_initKeyListeners/g,
            replacement: '_j'
          }, {
            match: /_cap/g,
            replacement: '_j2'
          }, {
            match: /_initFocusListeners/g,
            replacement: '_l'
          }, {
            match: /_getNumeric/g,
            replacement: '_m'
          }, {
            match: /_showDropdown/g,
            replacement: '_n'
          }, {
            match: /_setDropdownPosition/g,
            replacement: '_o'
          }, {
            match: /_bindDropdownListeners/g,
            replacement: '_p'
          }, {
            match: /_handleUpDownKey/g,
            replacement: '_q'
          }, {
            match: /_handleEnterKey/g,
            replacement: '_r'
          }, {
            match: /_searchForCountry/g,
            replacement: '_s'
          }, {
            match: /_startsWith/g,
            replacement: '_t'
          }, {
            match: /_updateValFromNumber/g,
            replacement: '_u'
          }, {
            match: /_updateFlagFromNumber/g,
            replacement: '_v'
          }, {
            match: /_highlightListItem/g,
            replacement: '_x'
          }, {
            match: /_getCountryData/g,
            replacement: '_y'
          }, {
            match: /_setFlag/g,
            replacement: '_z'
          }, {
            match: /_updatePlaceholder/g,
            replacement: '_aa'
          }, {
            match: /_selectListItem/g,
            replacement: '_ab'
          }, {
            match: /_closeDropdown/g,
            replacement: '_ac'
          }, {
            match: /_scrollTo/g,
            replacement: '_ad'
          }, {
            match: /_updateDialCode/g,
            replacement: '_ae'
          }, {
            match: /_getDialCode/g,
            replacement: '_af'
          }, {
            match: /_getFullNumber/g,
            replacement: '_ag'
          }, {
            match: /_beforeSetNumber/g,
            replacement: '_ah'
          }
        ]
      },
      files: {
        'tmp/one.min.js': 'tmp/wrapped.min.js'
      }
    },



    two: {
      options: {
        patterns: [

          /***********
           * KEYS
           ***********/

          // keys enum (omitting A and Z keys, which are already a single char)
          {
            match: /UP/g,
            replacement: 'b'
          }, {
            match: /DOWN/g,
            replacement: 'c'
          }, {
            match: /ENTER/g,
            replacement: 'd'
          }, {
            match: /ESC/g,
            replacement: 'e'
          }, {
            match: /PLUS/g,
            replacement: 'f'
          }, {
            match: /SPACE/g,
            replacement: 'j'
          }, {
            match: /TAB/g,
            replacement: 'k'
          }

        ]
      },
      files: {
        'tmp/two.min.js': 'tmp/one.min.js'
      }
    },



    three: {
      options: {
        patterns: [

          /***********
           * FIELDS ON "this"
           ***********/
          {
            match: /.telInput/g,
            replacement: '.a'
          }, {
            match: /.options/g,
            replacement: '.b'
          }, {
            match: /.isGoodBrowser/g,
            replacement: '.d'
          }, {
            match: /.hadInitialPlaceholder/g,
            replacement: '.e'
          },


          {
            match: /.isMobile/g,
            replacement: '.g'
          }, {
            match: /.autoCountryDeferred/g,
            replacement: '.h'
          }, {
            match: /.utilsScriptDeferred/g,
            replacement: '.i'
          }, {
            match: /.defaultCountry/g,
            replacement: '.j'
          },


          {
            match: /.flagsContainer/g,
            replacement: '.k'
          }, {
            match: /.selectedFlagInner/g,
            replacement: '.l'
          }, {
            match: /.countryList/g,
            replacement: '.m'
          }, {
            match: /.dropdownHeight/g,
            replacement: '.n'
          }, {
            match: /.countryListItems/g,
            replacement: '.o'
          }, {
            match: /.countries/g,
            replacement: '.p'
          }, {
            match: /.countryCodes/g,
            replacement: '.q'
          }, {
            match: /.selectedCountryData/g,
            replacement: '.s'
          }, {
            match: /.selectedDialCode/g,
            replacement: '.t'
          }

        ]
      },
      files: {
        'build/js/intlTelInput.min.js': 'tmp/two.min.js'
      }
    }
  };
};
