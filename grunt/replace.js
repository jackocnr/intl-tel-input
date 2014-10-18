module.exports = function(grunt) {
  return {
    js: {
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
          },
          /*{
            match: /.preferredCountries/g,
            replacement: '.n'
          },*/
          {
            match: /.selectedCountryData/g,
            replacement: '.o'
          },



          /***********
           * OPTIONS
           ***********/
          // changing the actual options names is problematic because they are passed in on initialisation
          // it would require a map in the src, on init: rename the user's options to a, b, c before the call to extend().
          /*{
            match: /autoFormat/g,
            replacement: 'a'
          },{
            match: /autoHideDialCode/g,
            replacement: 'b'
          },{
            match: /defaultCountry/g,
            replacement: 'd'
          }, {
            match: /nationalMode/g,
            replacement: 'm'
          }, {
            match: /numberType/g,
            replacement: 'n'
          }, {
            match: /onlyCountries/g,
            replacement: 'o'
          }, {
            match: /preferredCountries/g,
            replacement: 'p'
          },{
            match: /responsiveDropdown/g,
            replacement: 'r'
          }, {
            match: /utilsScript/g,
            replacement: 'u'
          },*/



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
        'build/js/intlTelInput.min.js': 'tmp/all.min.js'
      }
    }
  };
};