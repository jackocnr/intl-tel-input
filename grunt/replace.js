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
            match: /_processCountryData(?![A-Za-z])/g,
            replacement: '_b'
          }, {
            match: /_getIsAndroid(?![A-Za-z])/g,
            replacement: '_k'
          }, {
            match: /_createInitPromises(?![A-Za-z])/g,
            replacement: '_l'
          }, {
            match: /_prepareTelInput(?![A-Za-z])/g,
            replacement: '_m'
          }, {
            match: /_createWrapperAndInsert(?![A-Za-z])/g,
            replacement: '_n'
          }, {
            match: /_maybeBuildCountryContainer(?![A-Za-z])/g,
            replacement: '_s'
          }, {
            match: /_appendListItems(?![A-Za-z])/g,
            replacement: '_g'
          }, {
            match: /_setInitialState(?![A-Za-z])/g,
            replacement: '_h'
          }, {
            match: /_initListeners(?![A-Za-z])/g,
            replacement: '_i'
          }, {
            match: /_initHiddenInputListener(?![A-Za-z])/g,
            replacement: '_i0'
          }, {
            match: /_initDropdownListeners(?![A-Za-z])/g,
            replacement: '_i2'
          }, {
            match: /_initRequests(?![A-Za-z])/g,
            replacement: '_i3'
          }, {
            match: /_loadAutoCountry(?![A-Za-z])/g,
            replacement: '_i4'
          }, {
            match: /_initTelInputListeners(?![A-Za-z])/g,
            replacement: '_j'
          }, {
            match: /_cap(?![A-Za-z])/g,
            replacement: '_j2'
          }, {
            match: /_openDropdown(?![A-Za-z])/g,
            replacement: '_n0'
          }, {
            match: /_openDropdownWithPlus(?![A-Za-z])/g,
            replacement: '_n1'
          }, {
            match: /_buildDropdownContent(?![A-Za-z])/g,
            replacement: '_t'
          }, {
            match: /_buildSearchUI(?![A-Za-z])/g,
            replacement: '_w'
          }, {
            match: /_maybeUpdateInputPaddingAndReveal(?![A-Za-z])/g,
            replacement: '_k0'
          }, {
            match: /_maybeBuildHiddenInputs(?![A-Za-z])/g,
            replacement: '_l0'
          }, {
            match: /_bindInputListener(?![A-Za-z])/g,
            replacement: '_m0'
          }, {
            match: /_maybeBindKeydownListener(?![A-Za-z])/g,
            replacement: '_s0'
          }, {
            match: /_maybeBindPasteListener(?![A-Za-z])/g,
            replacement: '_t0'
          }, {
            match: /_searchForCountry(?![A-Za-z])/g,
            replacement: '_p0'
          }, {
            match: /_ensureHasDialCode(?![A-Za-z])/g,
            replacement: '_u0'
          }, {
            match: /_getNewCountryFromNumber(?![A-Za-z])/g,
            replacement: '_v0'
          }, {
            match: /_updateMaxLength(?![A-Za-z])/g,
            replacement: '_z4'
          }, {
            match: /_utilsIsPossibleNumber(?![A-Za-z])/g,
            replacement: '_9a'
          }, {
            match: /_validateNumber(?![A-Za-z])/g,
            replacement: '_9b'
          }, {
            match: /_utilsIsValidNumber(?![A-Za-z])/g,
            replacement: '_9c'
          }, {
            match: /_setDropdownPosition(?![A-Za-z])/g,
            replacement: '_o'
          }, {
            match: /_bindDropdownListeners(?![A-Za-z])/g,
            replacement: '_p'
          }, {
            match: /_bindDropdownMouseoverListener(?![A-Za-z])/g,
            replacement: '_p1'
          }, {
            match: /_bindDropdownCountryClickListener(?![A-Za-z])/g,
            replacement: '_p2'
          }, {
            match: /_bindDropdownClickOffListener(?![A-Za-z])/g,
            replacement: '_p4'
          }, {
            match: /_bindDropdownKeydownListener(?![A-Za-z])/g,
            replacement: '_p5'
          }, {
            match: /_bindDropdownSearchListeners(?![A-Za-z])/g,
            replacement: '_p6'
          }, {
            match: /_filterCountriesByQuery(?![A-Za-z])/g,
            replacement: '_p3'
          }, {
            match: /_handleUpDownKey(?![A-Za-z])/g,
            replacement: '_q'
          }, {
            match: /_handleEnterKey(?![A-Za-z])/g,
            replacement: '_r'
          }, {
            match: /_updateValFromNumber(?![A-Za-z])/g,
            replacement: '_u'
          }, {
            match: /_updateCountryFromNumber(?![A-Za-z])/g,
            replacement: '_v'
          }, {
            match: /_setCountry(?![A-Za-z])/g,
            replacement: '_z'
          }, {
            match: /_getHiddenSelectedCountryWidth(?![A-Za-z])/g,
            replacement: '_z2'
          }, {
            match: /_updatePlaceholder(?![A-Za-z])/g,
            replacement: '_0'
          }, {
            match: /_selectListItem(?![A-Za-z])/g,
            replacement: '_1'
          }, {
            match: /_closeDropdown(?![A-Za-z])/g,
            replacement: '_2'
          }, {
            match: /_updateDialCode(?![A-Za-z])/g,
            replacement: '_4'
          }, {
            match: /_getDialCode(?![A-Za-z])/g,
            replacement: '_5'
          }, {
            match: /_getFullNumber(?![A-Za-z])/g,
            replacement: '_6'
          }, {
            match: /_beforeSetNumber(?![A-Za-z])/g,
            replacement: '_7'
          }, {
            match: /_triggerCountryChange(?![A-Za-z])/g,
            replacement: '_8'
          }, {
            match: /_trigger(?![A-Za-z])/g,
            replacement: '_9'
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
            match: /\.hadInitialPlaceholder(?![A-Za-z])/g,
            replacement: '.e'
          }, {
            match: /\.resolveAutoCountryPromise(?![A-Za-z])/g,
            replacement: '.h'
          }, {
            match: /\.rejectAutoCountryPromise(?![A-Za-z])/g,
            replacement: '.i'
          }, {
            match: /\.resolveUtilsScriptPromise(?![A-Za-z])/g,
            replacement: '.i0'
          }, {
            match: /\.rejectUtilsScriptPromise(?![A-Za-z])/g,
            replacement: '.i1'
          }, {
            match: /\.defaultCountry(?![A-Za-z])/g,
            replacement: '.j'
          },
          // NOTE: avoid dialCodeToIso2Map and dialCodeMaxLen as these are also used in country-data.ts and it breaks things
          {
            match: /\.isAndroid(?![A-Za-z])/g,
            replacement: '.x'
          }, {
            match: /\.countryByIso2(?![A-Za-z])/g,
            replacement: '.z0'
          }, {
            match: /\.searchClearButton(?![A-Za-z])/g,
            replacement: '.m3'
          }, {
            match: /\.searchResultsA11yText(?![A-Za-z])/g,
            replacement: '.m5'
          }, {
            match: /\.hiddenInputCountry(?![A-Za-z])/g,
            replacement: '.m9'
          }, {
            match: /\.maxCoreNumberLength(?![A-Za-z])/g,
            replacement: '.n0'
          }, {
            match: /\.originalPaddingLeft(?![A-Za-z])/g,
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
