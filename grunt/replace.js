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
            match: /_filterCountries/g,
            replacement: '_c2'
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
            match: /_isUnknownNanp/g,
            replacement: '_w'
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
           * OPTIONS AND KEYS
           ***********/

          // keys enum (ommitting A and Z keys, which are already a single char)
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
          },

          // first occurence (hence no /g global flag), when they are defined in the defaults object (no "options." prefix to match)
          {
            match: /allowDropdown/,
            replacement: 'a'
          }, {
            match: /autoHideDialCode/,
            replacement: 'b'
          }, {
            match: /autoPlaceholder/,
            replacement: 'c'
          }, {
            match: /customPlaceholder/,
            replacement: 'c2'
          }, {
            match: /dropdownContainer/,
            replacement: 'd'
          }, {
            match: /excludeCountries/,
            replacement: 'e'
          }, {
            match: /formatOnInit/,
            replacement: 'f'
          }, {
            match: /geoIpLookup/,
            replacement: 'g'
          }, {
            match: /initialCountry/,
            replacement: 'h'
          }, {
            match: /nationalMode/,
            replacement: 'i'
          }, {
            match: /numberType/,
            replacement: 'j'
          }, {
            match: /onlyCountries/,
            replacement: 'k'
          }, {
            match: /preferredCountries/,
            replacement: 'l'
          }, {
            match: /separateDialCode/,
            replacement: 'm'
          }, {
            match: /utilsScript/,
            replacement: 'n'
          },


          // all other occurrences have the options prefix
          {
            match: /options.allowDropdown/g,
            replacement: 'options.a'
          }, {
            match: /options.autoHideDialCode/g,
            replacement: 'options.b'
          }, {
            match: /options.autoPlaceholder/g,
            replacement: 'options.c'
          }, {
            match: /options.customPlaceholder/g,
            replacement: 'options.c2'
          }, {
            match: /options.dropdownContainer/g,
            replacement: 'options.d'
          }, {
            match: /options.excludeCountries/g,
            replacement: 'options.e'
          }, {
            match: /options.formatOnInit/g,
            replacement: 'options.f'
          }, {
            match: /options.geoIpLookup/g,
            replacement: 'options.g'
          }, {
            match: /options.initialCountry/g,
            replacement: 'options.h'
          }, {
            match: /options.nationalMode/g,
            replacement: 'options.i'
          }, {
            match: /options.numberType/g,
            replacement: 'options.j'
          }, {
            match: /options.onlyCountries/g,
            replacement: 'options.k'
          }, {
            match: /options.preferredCountries/g,
            replacement: 'options.l'
          }, {
            match: /options.separateDialCode/g,
            replacement: 'options.m'
          }, {
            match: /options.utilsScript/g,
            replacement: 'options.n'
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
            match: /.preferredCountries/g,
            replacement: '.r'
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
        'tmp/three.min.js': 'tmp/two.min.js'
      }
    },



    four: {
      options: {
        patterns: [

          // hack to normalise runtime option names
          // UPDATE: instead of replacing the runtime option names with a newly created object, we $.extend the existing object so that if we forget to add any new/modified option names in this build file, they will still work! The downside is that this options object will contain both the full key and the minified key, but that really doesn't matter.
          {
            match: /this\.b=/g,
            replacement: 'c&&(a.extend(c,c,{' +
              'a:c.allowDropdown,' +
              'b:c.autoHideDialCode,' +
              'c:c.autoPlaceholder,' +
              'c2:c.customPlaceholder,' +
              'd:c.dropdownContainer,' +
              'e:c.excludeCountries,' +
              'f:c.formatOnInit,' +
              'g:c.geoIpLookup,' +
              'h:c.initialCountry,' +
              'i:c.nationalMode,' +
              'j:c.numberType,' +
              'k:c.onlyCountries,' +
              'l:c.preferredCountries,' +
              'm:c.separateDialCode,' +
              'n:c.utilsScript' +
              '})),this.b='
          }
        ]
      },
      files: {
        'build/js/intlTelInput.min.js': 'tmp/three.min.js'
      }
    }
  };
};
