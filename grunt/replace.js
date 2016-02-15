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
            match: /_processCountries/g,
            replacement: '_c2'
          }, {
            match: /_setInstanceCountryData/g,
            replacement: '_d'
          }, {
            match: /_setPreferredCountries/g,
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
            match: /_ensurePlus/g,
            replacement: '_j2'
          }, {
            match: /_handleInvalidKey/g,
            replacement: '_j3'
          }, {
            match: /_handleInputKey/g,
            replacement: '_k'
          }, {
            match: /_getCursorFromLeftChar/g,
            replacement: '_k1'
          }, {
            match: /_getCursorFromDigitsOnRight/g,
            replacement: '_k2'
          }, {
            match: /_getDigitsOnRight/g,
            replacement: '_k3'
          }, {
            match: /_initFocusListeners/g,
            replacement: '_l'
          }, {
            match: /_getNumeric/g,
            replacement: '_m'
          }, {
            match: /_getClean/g,
            replacement: '_m2'
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
            match: /_updateVal/g,
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
            match: /_selectFlag/g,
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
            match: /ZERO/g,
            replacement: 'g'
          }, {
            match: /NINE/g,
            replacement: 'h'
          }, {
            match: /SPACE/g,
            replacement: 'i'
          }, {
            match: /BSPACE/g,
            replacement: 'j'
          }, {
            match: /TAB/g,
            replacement: 'k'
          }, {
            match: /DEL/g,
            replacement: 'l'
          }, {
            match: /CTRL/g,
            replacement: 'm'
          }, {
            match: /CMD1/g,
            replacement: 'n'
          }, {
            match: /CMD2/g,
            replacement: 'o'
          },

          // first occurence, when they are defined in the defaults object (no "options." prefix to match)
          {
            match: /allowDropdown/,
            replacement: 'a'
          }, {
            match: /autoHideDialCode/,
            replacement: 'c'
          }, {
            match: /autoPlaceholder/,
            replacement: 'd'
          }, {
            match: /dropdownContainer/,
            replacement: 'e'
          }, {
            match: /excludeCountries/,
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
            match: /utilsScript/,
            replacement: 'm'
          },


          // all other occurrences have the options prefix
          {
            match: /options.allowDropdown/g,
            replacement: 'options.a'
          }, {
            match: /options.autoHideDialCode/g,
            replacement: 'options.c'
          }, {
            match: /options.autoPlaceholder/g,
            replacement: 'options.d'
          }, {
            match: /options.dropdownContainer/g,
            replacement: 'options.e'
          }, {
            match: /options.excludeCountries/g,
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
            match: /options.utilsScript/g,
            replacement: 'options.m'
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
            match: /.element/g,
            replacement: '.a'
          }, {
            match: /.options/g,
            replacement: '.b'
          }, {
            match: /._defaults/g,
            replacement: '.c'
          }, {
            match: /.isGoodBrowser/g,
            replacement: '.d'
          }, {
            match: /.hadInitialPlaceholder/g,
            replacement: '.e'
          }, {
            match: /._name/g,
            replacement: '.f'
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
          },


          {
            match: /.telInput/g,
            replacement: '.j'
          }, {
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
              'c:c.autoHideDialCode,' +
              'd:c.autoPlaceholder,' +
              'e:c.dropdownContainer,' +
              'f:c.excludeCountries,' +
              'g:c.geoIpLookup,' +
              'h:c.initialCountry,' +
              'i:c.nationalMode,' +
              'j:c.numberType,' +
              'k:c.onlyCountries,' +
              'l:c.preferredCountries,' +
              'm:c.utilsScript' +
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
