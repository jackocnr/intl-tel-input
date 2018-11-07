module.exports = function(grunt) {
  return {

    /***********
     * PRIVATE METHODS
     * Ignore _init method, which is a subset of other method names, and is used in different ways
     * Note: can't do public methods, as they need to be called as is
     ***********/
    one: {
      options: {
        patterns: [
          // Note: _a is now reserved for step two
          {
            match: /_processCountryData/g,
            replacement: '_b'
          }, {
            match: /_addCountryCode/g,
            replacement: '_c'
          }, {
            match: /_processAllCountries/g,
            replacement: '_d'
          }, {
            match: /_translateCountriesByLocale/g,
            replacement: '_d0'
          }, {
            match: /_countryNameSort/g,
            replacement: '_d1'
          }, {
            match: /_processCountryCodes/g,
            replacement: '_d2'
          }, {
            match: /_processPreferredCountries/g,
            replacement: '_e'
          }, {
            match: /_createEl/g,
            replacement: '_e2'
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
            match: /_getClosestLabel/g,
            replacement: '_i1'
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
            match: /_initKeyListeners/g,
            replacement: '_j'
          }, {
            match: /_cap/g,
            replacement: '_j2'
          }, {
            match: /_initFocusListeners/g,
            replacement: '_l'
          }, {
            match: /_removeEmptyDialCode/g,
            replacement: '_l2'
          }, {
            match: /_getNumeric/g,
            replacement: '_m'
          }, {
            match: /_trigger/g,
            replacement: '_m2'
          }, {
            match: /_showDropdown/g,
            replacement: '_n'
          }, {
            match: /_toggleClass/g,
            replacement: '_n2'
          }, {
            match: /_setDropdownPosition/g,
            replacement: '_o'
          }, {
            match: /_getClosestListItem/g,
            replacement: '_o2'
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
            match: /_isRegionlessNanp/g,
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
          }
        ]
      },
      files: {
        'tmp/one.min.js': 'tmp/wrapped.min.js',
        'tmp/one-jquery.min.js': 'tmp/wrapped-jquery.min.js',
      }
    },


    /***********
     * INLINE PRIVATE METHODS
     ***********/
    two: {
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
            match: /_handleMousedownFocusEvent/g,
            replacement: '_a5'
          }, {
            match: /_handleKeypressPlusEvent/g,
            replacement: '_a6'
          }, {
            match: /_handleFocusEvent/g,
            replacement: '_a7'
          }, {
            match: /_handleSubmitOrBlurEvent/g,
            replacement: '_a8'
          }, {
            match: /_handleLabelClick/g,
            replacement: '_a9'
          }, {
            match: /_handleClickSelectedFlag/g,
            replacement: '_a10'
          }, {
            match: /_handleFlagsContainerKeydown/g,
            replacement: '_a11'
          }, {
            match: /_handleKeyupEvent/g,
            replacement: '_a12'
          }, {
            match: /_handleClipboardEvent/g,
            replacement: '_a13'
          }, {
            match: /_handleHiddenInputSubmit/g,
            replacement: '_a14'
          }
        ]
      },
      files: {
        'tmp/two.min.js': 'tmp/one.min.js',
        'tmp/two-jquery.min.js': 'tmp/one-jquery.min.js',
      }
    },


    /***********
     * INSTANCE FIELDS
     * Note: avoid option names as that will break things!
     ***********/
    three: {
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
            match: /\.isMobile/g,
            replacement: '.g'
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
            match: /\.flagsContainer/g,
            replacement: '.k'
          }, {
            match: /\.selectedFlagInner/g,
            replacement: '.l'
          }, {
            match: /\.countryList/g,
            replacement: '.m'
          }, {
            match: /\.countries/g,
            replacement: '.p'
          }, {
            match: /\.countryCodes/g,
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
        'build/js/intlTelInput-jquery.min.js': 'tmp/two-jquery.min.js',
      }
    }
  };
};
