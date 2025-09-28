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
          // ============================
          // intl-tel-input.ts
          // ============================
          {
            match: /_processCountryData(?![A-Za-z])/g,
            replacement: '_a'
          },
          {
            match: /_getIsAndroid(?![A-Za-z])/g,
            replacement: '_b'
          },
          {
            match: /_createInitPromises(?![A-Za-z])/g,
            replacement: '_c'
          },
          {
            match: /_setInitialState(?![A-Za-z])/g,
            replacement: '_d'
          },
          {
            match: /_initListeners(?![A-Za-z])/g,
            replacement: '_e'
          },
          {
            match: /_initHiddenInputListener(?![A-Za-z])/g,
            replacement: '_f'
          },
          {
            match: /_initDropdownListeners(?![A-Za-z])/g,
            replacement: '_g'
          },
          {
            match: /_initRequests(?![A-Za-z])/g,
            replacement: '_h'
          },
          {
            match: /_loadAutoCountry(?![A-Za-z])/g,
            replacement: '_i'
          },
          {
            match: /_initTelInputListeners(?![A-Za-z])/g,
            replacement: '_j'
          },
          {
            match: /_cap(?![A-Za-z])/g,
            replacement: '_k'
          },
          {
            match: /_openDropdown(?![A-Za-z])/g,
            replacement: '_l'
          },
          {
            match: /_openDropdownWithPlus(?![A-Za-z])/g,
            replacement: '_m'
          },
          {
            match: /_maybeBindKeydownListener(?![A-Za-z])/g,
            replacement: '_n'
          },
          {
            match: /_maybeBindPasteListener(?![A-Za-z])/g,
            replacement: '_o'
          },
          {
            match: /_bindInputListener(?![A-Za-z])/g,
            replacement: '_p'
          },
          {
            match: /_searchForCountry(?![A-Za-z])/g,
            replacement: '_q'
          },
          {
            match: /_ensureHasDialCode(?![A-Za-z])/g,
            replacement: '_r'
          },
          {
            match: /_getNewCountryFromNumber(?![A-Za-z])/g,
            replacement: '_s'
          },
          {
            match: /_updateMaxLength(?![A-Za-z])/g,
            replacement: '_t'
          },
          {
            match: /_utilsIsPossibleNumber(?![A-Za-z])/g,
            replacement: '_u'
          },
          {
            match: /_validateNumber(?![A-Za-z])/g,
            replacement: '_v'
          },
          {
            match: /_utilsIsValidNumber(?![A-Za-z])/g,
            replacement: '_w'
          },
          {
            match: /_setDropdownPosition(?![A-Za-z])/g,
            replacement: '_x'
          },
          {
            match: /_bindDropdownListeners(?![A-Za-z])/g,
            replacement: '_y'
          },
          {
            match: /_bindDropdownMouseoverListener(?![A-Za-z])/g,
            replacement: '_z'
          },
          {
            match: /_bindDropdownCountryClickListener(?![A-Za-z])/g,
            replacement: '_aa'
          },
          {
            match: /_bindDropdownClickOffListener(?![A-Za-z])/g,
            replacement: '_ab'
          },
          {
            match: /_bindDropdownKeydownListener(?![A-Za-z])/g,
            replacement: '_ac'
          },
          {
            match: /_bindDropdownSearchListeners(?![A-Za-z])/g,
            replacement: '_ad'
          },
          {
            match: /_filterCountriesByQuery(?![A-Za-z])/g,
            replacement: '_ae'
          },
          {
            match: /_handleUpDownKey(?![A-Za-z])/g,
            replacement: '_af'
          },
          {
            match: /_handleEnterKey(?![A-Za-z])/g,
            replacement: '_ag'
          },
          {
            match: /_updateValFromNumber(?![A-Za-z])/g,
            replacement: '_ah'
          },
          {
            match: /_updateCountryFromNumber(?![A-Za-z])/g,
            replacement: '_ai'
          },
          {
            match: /_setCountry(?![A-Za-z])/g,
            replacement: '_aj'
          },
          {
            match: /_updatePlaceholder(?![A-Za-z])/g,
            replacement: '_ak'
          },
          {
            match: /_selectListItem(?![A-Za-z])/g,
            replacement: '_al'
          },
          {
            match: /_closeDropdown(?![A-Za-z])/g,
            replacement: '_am'
          },
          {
            match: /_updateDialCode(?![A-Za-z])/g,
            replacement: '_an'
          },
          {
            match: /_getDialCode(?![A-Za-z])/g,
            replacement: '_ao'
          },
          {
            match: /_getFullNumber(?![A-Za-z])/g,
            replacement: '_ap'
          },
          {
            match: /_beforeSetNumber(?![A-Za-z])/g,
            replacement: '_aq'
          },
          {
            match: /_triggerCountryChange(?![A-Za-z])/g,
            replacement: '_ar'
          },
          {
            match: /_trigger(?![A-Za-z])/g,
            replacement: '_as'
          },
          // ============================
          // modules/core/ui.ts
          // ============================
          {
            match: /_prepareTelInput(?![A-Za-z])/g,
            replacement: '_at'
          },
          {
            match: /_createWrapperAndInsert(?![A-Za-z])/g,
            replacement: '_au'
          },
          {
            match: /_maybeBuildCountryContainer(?![A-Za-z])/g,
            replacement: '_av'
          },
          {
            match: /_buildDropdownContent(?![A-Za-z])/g,
            replacement: '_aw'
          },
          {
            match: /_buildSearchUI(?![A-Za-z])/g,
            replacement: '_ax'
          },
          {
            match: /_maybeUpdateInputPaddingAndReveal(?![A-Za-z])/g,
            replacement: '_ay'
          },
          {
            match: /_maybeBuildHiddenInputs(?![A-Za-z])/g,
            replacement: '_az'
          },
          {
            match: /_appendListItems(?![A-Za-z])/g,
            replacement: '_ba'
          },
          {
            match: /_getHiddenSelectedCountryWidth(?![A-Za-z])/g,
            replacement: '_bb'
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
            replacement: '.a'
          },
          {
            match: /\.resolveAutoCountryPromise(?![A-Za-z])/g,
            replacement: '.b'
          },
          {
            match: /\.rejectAutoCountryPromise(?![A-Za-z])/g,
            replacement: '.c'
          },
          {
            match: /\.resolveUtilsScriptPromise(?![A-Za-z])/g,
            replacement: '.d'
          },
          {
            match: /\.rejectUtilsScriptPromise(?![A-Za-z])/g,
            replacement: '.e'
          },
          {
            match: /\.defaultCountry(?![A-Za-z])/g,
            replacement: '.f'
          },
          {
            match: /\.abortController(?![A-Za-z])/g,
            replacement: '.g'
          },
          {
            match: /\.dropdownAbortController(?![A-Za-z])/g,
            replacement: '.h'
          },
          // NOTE: avoid dialCodeToIso2Map and dialCodeMaxLen as these are also used in country-data.ts and it breaks things
          {
            match: /\.isAndroid(?![A-Za-z])/g,
            replacement: '.i'
          },
          {
            match: /\.countryByIso2(?![A-Za-z])/g,
            replacement: '.j'
          },
          {
            match: /\.searchClearButton(?![A-Za-z])/g,
            replacement: '.k'
          },
          {
            match: /\.searchResultsA11yText(?![A-Za-z])/g,
            replacement: '.l'
          },
          {
            match: /\.hiddenInputCountry(?![A-Za-z])/g,
            replacement: '.m'
          },
          {
            match: /\.maxCoreNumberLength(?![A-Za-z])/g,
            replacement: '.n'
          },
          {
            match: /\.originalPaddingLeft(?![A-Za-z])/g,
            replacement: '.o'
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
