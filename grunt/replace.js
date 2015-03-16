module.exports = function(grunt) {
  return {
    one: {
      options: {
        patterns: [

          /***********
           * PRIVATE METHODS
           ***********/
          {
            match: /_ready/g,
            replacement: '_a'
          }, {
            match: /_processCountryData/g,
            replacement: '_b'
          }, {
            match: /_addCountryCode/g,
            replacement: '_c'
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
            match: /_initKeyListeners/g,
            replacement: '_j'
          }, {
            match: /_handleInputKey/g,
            replacement: '_k'
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
            match: /DEL/g,
            replacement: 'k'
          }, {
            match: /CTRL/g,
            replacement: 'l'
          }, {
            match: /CMD1/g,
            replacement: 'm'
          }, {
            match: /CMD2/g,
            replacement: 'n'
          },

          // first occurence, when they are defined in the defaults object (no "options." prefix to match)
          // (using meaningful letter substitutions here)
          {
            match: /autoFormat/,
            replacement: 'a'
          }, {
            match: /autoHideDialCode/,
            replacement: 'h'
          }, {
            match: /defaultCountry/,
            replacement: 'd'
          }, {
            match: /ipinfoToken/,
            replacement: 'i'
          }, {
            match: /nationalMode/,
            replacement: 'n'
          }, {
            match: /numberType/,
            replacement: 't'
          }, {
            match: /onlyCountries/,
            replacement: 'o'
          }, {
            match: /preferredCountries/,
            replacement: 'p'
          }, {
            match: /preventInvalidNumbers/,
            replacement: 'v'
          }, {
            match: /utilsScript/,
            replacement: 'u'
          },


          // all other occurrences have the options prefix
          // (using meaningful letter substitutions here)
          {
            match: /options.autoFormat/g,
            replacement: 'options.a'
          }, {
            match: /options.autoHideDialCode/g,
            replacement: 'options.h'
          }, {
            match: /options.defaultCountry/g,
            replacement: 'options.d'
          }, {
            match: /options.ipinfoToken/g,
            replacement: 'options.i'
          }, {
            match: /options.nationalMode/g,
            replacement: 'options.n'
          }, {
            match: /options.numberType/g,
            replacement: 'options.t'
          }, {
            match: /options.onlyCountries/g,
            replacement: 'options.o'
          }, {
            match: /options.preferredCountries/g,
            replacement: 'options.p'
          }, {
            match: /options.preventInvalidNumbers/g,
            replacement: 'options.v'
          }, {
            match: /options.utilsScript/g,
            replacement: 'options.u'
          },

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
           * FIELDS
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
          }, {
            match: /.telInput/g,
            replacement: '.g'
          }, {
            match: /.selectedFlagInner/g,
            replacement: '.h'
          }, {
            match: /.countryList/g,
            replacement: '.i'
          }, {
            match: /.dropdownHeight/g,
            replacement: '.j'
          }, {
            match: /.countryListItems/g,
            replacement: '.k'
          }, {
            match: /.countries/g,
            replacement: '.l'
          }, {
            match: /.countryCodes/g,
            replacement: '.m'
          }, {
            match: /.preferredCountries/g,
            replacement: '.n'
          }, {
            match: /.selectedCountryData/g,
            replacement: '.o'
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
          // (using meaningful letter substitutions here)
          // UPDATE: instead of replacing the runtime option names with a newly created object, we $.extend the existing object so that if we forget to add any new/modified option names in this build file, they will still work! The downside is that this options object will contain both the full key and the minified key, but that really doesn't matter.
          {
            match: /this.b=/g,
            replacement: 'c&&(a.extend(c, c, {' +
              'a:c.autoFormat,' +
              'h:c.autoHideDialCode,' +
              'd:c.defaultCountry,' +
              'i:c.ipinfoToken,' +
              'n:c.nationalMode,' +
              't:c.numberType,' +
              'o:c.onlyCountries,' +
              'p:c.preferredCountries,' +
              'v:c.preventInvalidNumbers,' +
              'u:c.utilsScript' +
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