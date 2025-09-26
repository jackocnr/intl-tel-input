module.exports = function(grunt) {
  return {

    /******************
     * PRIVATE METHODS
     * Ignore _init method, which is a subset of other method names, and is used in different ways
     * Note: can't do public methods, as they need to be called as is
     ******************/
    privateMethods: {
      options: {
        patterns: [
          //* Note: _a is now reserved for step two.
          {
            match: /_processCountryData/g,
            replacement: '_b'
          }, {
            match: /_getIsAndroid/g,
            replacement: '_k'
          }, {
            match: /_createInitPromises/g,
            replacement: '_l'
          }, {
            match: /_prepareTelInput/g,
            replacement: '_m'
          }, {
            match: /_createWrapperAndInsert/g,
            replacement: '_n'
          }, {
            match: /_maybeBuildCountryContainer/g,
            replacement: '_s'
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
            match: /_initHiddenInputListener/g,
            replacement: '_i0'
          }, {
            match: /_initDropdownListeners/g,
            replacement: '_i2'
          }, {
            match: /_initRequests/g,
            replacement: '_i3'
          }, {
            match: /_loadAutoCountry/g,
            replacement: '_i4'
          }, {
            match: /_initTelInputListeners/g,
            replacement: '_j'
          }, {
            match: /_cap/g,
            replacement: '_j2'
          },
          //* NOTE: here we exclude _trigger which is a substring of _triggerCountryChange etc.
          // AND _openDropdown (which is a substring of _openDropdownWithPlus)
          {
            match: /_openDropdownWithPlus/g,
            replacement: '_n0'
          }, {
            match: /_buildDropdownContent/g,
            replacement: '_t'
          }, {
            match: /_buildSearchUI/g,
            replacement: '_w'
          }, {
            match: /_maybeUpdateInputPaddingAndReveal/g,
            replacement: '_k0'
          }, {
            match: /_maybeBuildHiddenInputs/g,
            replacement: '_l0'
          }, {
            match: /_bindInputListener/g,
            replacement: '_m0'
          }, {
            match: /_maybeBindKeydownListener/g,
            replacement: '_s0'
          }, {
            match: /_maybeBindPasteListener/g,
            replacement: '_t0'
          }, {
            match: /_searchForCountry/g,
            replacement: '_p0'
          }, {
            match: /_ensureHasDialCode/g,
            replacement: '_u0'
          }, {
            match: /_getNewCountryFromNumber/g,
            replacement: '_v0'
          }, {
            match: /_updateMaxLength/g,
            replacement: '_z4'
          }, {
            match: /_utilsIsPossibleNumber/g,
            replacement: '_9a'
          }, {
            match: /_validateNumber/g,
            replacement: '_9b'
          }, {
            match: /_utilsIsValidNumber/g,
            replacement: '_9c'
          }, {
            match: /_setDropdownPosition/g,
            replacement: '_o'
          }, {
            match: /_bindDropdownListeners/g,
            replacement: '_p'
          }, {
            match: /_bindDropdownMouseoverListener/g,
            replacement: '_p1'
          }, {
            match: /_bindDropdownCountryClickListener/g,
            replacement: '_p2'
          }, {
            match: /_bindDropdownClickOffListener/g,
            replacement: '_p4'
          }, {
            match: /_bindDropdownKeydownListener/g,
            replacement: '_p5'
          }, {
            match: /_bindDropdownSearchListeners/g,
            replacement: '_p6'
          }, {
            match: /_filterCountriesByQuery/g,
            replacement: '_p3'
          }, {
            match: /_handleUpDownKey/g,
            replacement: '_q'
          }, {
            match: /_handleEnterKey/g,
            replacement: '_r'
          }, {
            match: /_updateValFromNumber/g,
            replacement: '_u'
          }, {
            match: /_updateCountryFromNumber/g,
            replacement: '_v'
          }, {
            match: /_setCountry/g,
            replacement: '_z'
          }, {
            match: /_getHiddenSelectedCountryWidth/g,
            replacement: '_z2'
          }, {
            match: /_updatePlaceholder/g,
            replacement: '_0'
          }, {
            match: /_selectListItem/g,
            replacement: '_1'
          }, {
            match: /_closeDropdown/g,
            replacement: '_2'
          }, {
            match: /_updateDialCode/g,
            replacement: '_4'
          }, {
            match: /_getDialCode/g,
            replacement: '_5'
          }, {
            match: /_getFullNumber/g,
            replacement: '_6'
          }, {
            match: /_beforeSetNumber/g,
            replacement: '_7'
          }, {
            match: /_triggerCountryChange/g,
            replacement: '_8'
          }
        ]
      },
      files: {
        'tmp/one.min.js': 'tmp/built.min.js',
      }
    },


    /*******************
     * INSTANCE FIELDS
     * Note: avoid option names as that will break things!
     *******************/
    instanceFields: {
      options: {
        patterns: [
          {
            match: /\.telInput/g,
            replacement: '.a'
          }, {
            match: /\.highlightedItem/g,
            replacement: '.c'
          }, {
            match: /\.hadInitialPlaceholder/g,
            replacement: '.e'
          }, {
            match: /\.resolveAutoCountryPromise/g,
            replacement: '.h'
          }, {
            match: /\.rejectAutoCountryPromise/g,
            replacement: '.i'
          }, {
            match: /\.resolveUtilsScriptPromise/g,
            replacement: '.i0'
          }, {
            match: /\.rejectUtilsScriptPromise/g,
            replacement: '.i1'
          }, {
            match: /\.defaultCountry/g,
            replacement: '.j'
          }, {
            match: /\.countryContainer/g,
            replacement: '.k'
          }, {
            match: /\.selectedCountryInner/g,
            replacement: '.l'
          },
          // NOTE: avoid dialCodeToIso2Map and dialCodeMaxLen as these are also used in country-data.ts and it breaks things
          {
            match: /\.selectedCountryData/g,
            replacement: '.s'
          }, {
            match: /\.selectedDialCode/g,
            replacement: '.t'
          }, {
            match: /\.dropdownArrow/g,
            replacement: '.u'
          }, {
            match: /\.isRTL/g,
            replacement: '.v'
          }, {
            match: /\.isAndroid/g,
            replacement: '.x'
          }, {
            match: /\.countryByIso2/g,
            replacement: '.z0'
          }, {
            match: /\.dropdownContent/g,
            replacement: '.m0'
          }, {
            match: /\.searchInput/g,
            replacement: '.m1'
          }, {
            match: /\.searchIcon/g,
            replacement: '.m2'
          }, {
            match: /\.searchClearButton/g,
            replacement: '.m3'
          }, {
            match: /\.searchNoResults/g,
            replacement: '.m4'
          }, {
            match: /\.searchResultsA11yText/g,
            replacement: '.m5'
          }, {
            match: /\.hiddenInputCountry/g,
            replacement: '.m9'
          }, {
            match: /\.maxCoreNumberLength/g,
            replacement: '.n0'
          }, {
            match: /\.originalPaddingLeft/g,
            replacement: '.n2'
          }
        ]
      },
      files: {
        'build/js/intlTelInput.min.js': 'tmp/one.min.js',
      }
    },


    /**************
     * README file
     * Update versions numbers in the Getting Started (CDN) section
     **************/
    readme: {
      options: {
        patterns: [
          {
            match: /intl-tel-input@([0-9.]+)\/build/g,
            replacement: 'intl-tel-input@<%= package.version %>/build'
          }
        ]
      },
      files: {
        'README.md': 'README.md',
        'react/README.md': 'react/README.md',
        'vue/README.md': 'vue/README.md',
        'angular/README.md': 'angular/README.md'
      }
    },
    issueTemplate: {
      options: {
        patterns: [
          {
            match: /e\.g\. v[0-9]+\.[0-9]+\.[0-9]+ \(please try latest version\)/,
            replacement: 'e.g. v<%= package.version %> (please try latest version)'
          }
        ]
      },
      files: {
        '.github/ISSUE_TEMPLATE.md': '.github/ISSUE_TEMPLATE.md'
      }
    },


    /**************
     * Generate reactWithUtils.tsx
     **************/
    reactWithUtils: {
      options: {
        patterns: [
          {
            match: /import intlTelInput from \"\.\.\/intl\-tel\-input\"\;/,
            replacement: '//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\nimport intlTelInput from "./intlTelInputWithUtils";'
          }
        ]
      },
      files: {
        'react/src/intl-tel-input/reactWithUtils.tsx': 'react/src/intl-tel-input/react.tsx',
      }
    },


    /**************
     * Generate vue/src/IntlTelInputWithUtils.vue
     **************/
    vueWithUtils: {
      options: {
        patterns: [
          {
            match: /\<script setup\>\simport intlTelInput from \"\.\.\/intl\-tel\-input\"\;/,
            replacement: '<!-- THIS FILE IS AUTO-GENERATED. DO NOT EDIT. -->\n<script setup>\nimport intlTelInput from "./intlTelInputWithUtils";'
          }
        ]
      },
      files: {
        'vue/src/intl-tel-input/IntlTelInputWithUtils.vue': 'vue/src/intl-tel-input/IntlTelInput.vue',
      }
    },

    /**************
     * Generate angular/src/angularWithUtils.ts
     **************/
    angularWithUtils: {
      options: {
        patterns: [
          {
            match: /import intlTelInput from \"\.\.\/intl\-tel\-input\"\;/,
            replacement: '//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\nimport intlTelInput from "./intlTelInputWithUtils";'
          }
        ]
      },
      files: {
        'angular/src/intl-tel-input/angularWithUtils.ts': 'angular/src/intl-tel-input/angular.ts',
      }
    },
  };
};
