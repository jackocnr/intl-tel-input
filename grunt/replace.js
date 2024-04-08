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
            match: /_addToDialCodeMap/g,
            replacement: '_c'
          }, {
            match: /_processAllCountries/g,
            replacement: '_d'
          }, {
            match: /_translateCountryNames/g,
            replacement: '_d0'
          }, {
            match: /_processDialCodes/g,
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
          {
            match: /_openDropdown/g,
            replacement: '_n'
          }, {
            match: /_setDropdownPosition/g,
            replacement: '_o'
          }, {
            match: /_bindDropdownListeners/g,
            replacement: '_p'
          }, {
            match: /_filterCountries/g,
            replacement: '_p3'
          }, {
            match: /_updateSearchResultsText/g,
            replacement: '_p4'
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
            match: /_updateValFromNumber/g,
            replacement: '_u'
          }, {
            match: /_updateCountryFromNumber/g,
            replacement: '_v'
          }, {
            match: /_highlightListItem/g,
            replacement: '_x'
          }, {
            match: /_getCountryData/g,
            replacement: '_y'
          }, {
            match: /_setCountry/g,
            replacement: '_z'
          }, {
            match: /_setSelectedCountryTitleAttribute/g,
            replacement: '_z3'
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
            match: /_scrollTo/g,
            replacement: '_3'
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
          }, {
            match: /_formatNumberAsYouType/g,
            replacement: '_9'
          }
        ]
      },
      files: {
        'tmp/one.min.js': 'tmp/built.min.js',
      }
    },


    /*************************
     * INLINE PRIVATE METHODS
     *************************/
    inlineMethods: {
      options: {
        patterns: [
          {
            match: /_handleMouseoverCountryList/g,
            replacement: '_a0'
          }, {
            match: /_handleClickCountryList/g,
            replacement: '_a1'
          }, {
            match: /_handleClickOffToClose/g,
            replacement: '_a2'
          }, {
            match: /_handleKeydownOnDropdown/g,
            replacement: '_a3'
          }, {
            match: /_handleWindowScroll/g,
            replacement: '_a4'
          }, {
            match: /_handleSearchChange/g,
            replacement: '_a7'
          }, {
            match: /_handleLabelClick/g,
            replacement: '_a9'
          }, {
            match: /_handleClickSelectedCountry/g,
            replacement: '_a10'
          }, {
            match: /_handleCountryContainerKeydown/g,
            replacement: '_a11'
          }, {
            match: /_handleInputEvent/g,
            replacement: '_a12'
          }, {
            match: /_handleHiddenInputSubmit/g,
            replacement: '_a14'
          }
        ]
      },
      files: {
        'tmp/two.min.js': 'tmp/one.min.js',
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
            match: /\.activeItem/g,
            replacement: '.b'
          }, {
            match: /\.highlightedItem/g,
            replacement: '.c'
          }, {
            match: /\.options/g,
            replacement: '.d'
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
          }, {
            match: /\.countries/g,
            replacement: '.p'
          }, {
            match: /\.dialCodeToIso2Map/g,
            replacement: '.q'
          }, {
            match: /\.selectedCountryData/g,
            replacement: '.s'
          }, {
            match: /\.selectedDialCode/g,
            replacement: '.t'
          }, {
            match: /\.dropdownArrow/g,
            replacement: '.u'
          }
        ]
      },
      files: {
        'build/js/intlTelInput.min.js': 'tmp/two.min.js',
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
        'README.md': 'README.md'
      }
    }
  };
};
