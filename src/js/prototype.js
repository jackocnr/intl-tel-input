var intlTelInput = (function() {

  // cheat and grab the country data from the old plugin for now
  var allCountries = $.fn.intlTelInput.getCountryData(),
  defaults = {
    // whether or not to allow the dropdown
    // allowDropdown: true,
    // if there is just a dial code in the input: remove it on blur, and re-add it on focus
    // autoHideDialCode: true,
    // add a placeholder in the input with an example number for the selected country
    autoPlaceholder: "polite",
    // modify the auto placeholder
    // customPlaceholder: null,
    // append menu to a specific element
    // dropdownContainer: "",
    // don't display these countries
    excludeCountries: [],
    // format the input value during initialisation and on setNumber
    // formatOnDisplay: true,
    // geoIp lookup function
    // geoIpLookup: null,
    // initial country
    initialCountry: "",
    // don't insert international dial codes
    nationalMode: true,
    // display only these countries
    onlyCountries: [],
    // number type to use for placeholders
    placeholderNumberType: "MOBILE",
    // the countries at the top of the list. defaults to united states and united kingdom
    preferredCountries: ["us", "gb"],
    // display the country dial code next to the selected flag so it's not part of the typed number
    // separateDialCode: false,
    // specify the path to the libphonenumber script to enable validation/formatting
    // utilsScript: ""
  },
  keys = {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    PLUS: 43,
    A: 65,
    Z: 90,
    SPACE: 32,
    TAB: 9
  },
  regionlessNanpNumbers = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"];

  var Iti = function(input, options) {
    this.telInput = input;
    this.options = Object.assign(defaults, options);
    this.countries = allCountries;
    this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
  };

  Iti.prototype = {

    _init: function() {
      // we cannot just test screen size as some smartphones/website meta tags will report desktop resolutions
      // Note: for some reason jasmine breaks if you put this in the main Plugin function with the rest of these declarations
      // Note: to target Android Mobiles (and not Tablets), we must find "Android" and "Mobile"
      this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (this.isMobile) {
        // trigger the mobile dropdown css
        document.body.classList.add("iti-mobile");
      }

      // process all the data: onlyCountries, excludeCountries, preferredCountries etc
      this._processCountryData();

      this._generateMarkup();

      // set the initial state of the input value and the selected flag
      this._setInitialState();

      // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
      this._initListeners();
    },

    // prepare all of the country data, including onlyCountries, excludeCountries and preferredCountries options
    _processCountryData: function() {
      // process onlyCountries or excludeCountries array if present
      this._processAllCountries();

      // process the countryCodes map
      this._processCountryCodes();

      // process the preferredCountries
      this._processPreferredCountries();
    },

    // add a country code to this.countryCodes
    _addCountryCode: function(iso2, dialCode, priority) {
      if (!(dialCode in this.countryCodes)) {
        this.countryCodes[dialCode] = [];
      }
      var index = priority || 0;
      this.countryCodes[dialCode][index] = iso2;
    },


    // filter the given countries using the process function
    _filterCountries: function(countryArray, processFunc) {
      var i;

      // standardise case
      for (i = 0; i < countryArray.length; i++) {
        countryArray[i] = countryArray[i].toLowerCase();
      }
      // build instance country array
      this.countries = [];
      for (i = 0; i < allCountries.length; i++) {
        if (processFunc(countryArray.indexOf(allCountries[i].iso2))) {
          this.countries.push(allCountries[i]);
        }
      }
    },


    // process onlyCountries or excludeCountries array if present
    _processAllCountries: function() {
      if (this.options.onlyCountries.length) {
        // process onlyCountries option
        this._filterCountries(this.options.onlyCountries, function(arrayPos) {
          // if country is in array
          return (arrayPos > -1);
        });
      } else if (this.options.excludeCountries.length) {
        // process excludeCountries option
        this._filterCountries(this.options.excludeCountries, function(arrayPos) {
          // if country is not in array
          return (arrayPos == -1);
        });
      } else {
        this.countries = allCountries;
      }
    },


    // process the countryCodes map
    _processCountryCodes: function() {
      this.countryCodes = {};
      for (var i = 0; i < this.countries.length; i++) {
        var c = this.countries[i];
        this._addCountryCode(c.iso2, c.dialCode, c.priority);
        // area codes
        if (c.areaCodes) {
          for (var j = 0; j < c.areaCodes.length; j++) {
            // full dial code is country code + dial code
            this._addCountryCode(c.iso2, c.dialCode + c.areaCodes[j]);
          }
        }
      }
    },


    // process preferred countries - iterate through the preferences, fetching the country data for each one
    _processPreferredCountries: function() {
      this.preferredCountries = [];
      for (var i = 0; i < this.options.preferredCountries.length; i++) {
        var countryCode = this.options.preferredCountries[i].toLowerCase(),
          countryData = this._getCountryData(countryCode, false, true);
        if (countryData) {
          this.preferredCountries.push(countryData);
        }
      }
    },

    _createEl: function(name, classes, container) {
      var el = document.createElement(name);
      el.className = classes;
      if (container) container.appendChild(el);
      return el;
    },

    _generateMarkup: function() {
      // wrap input in container
      var wrapper = this._createEl("div", "intl-tel-input allow-dropdown");
      this.telInput.parentNode.insertBefore(wrapper, this.telInput);
      this.flagsContainer = this._createEl("div", "flag-container", wrapper);
      wrapper.appendChild(this.telInput);

      // selected flag
      this.selectedFlag = this._createEl("div", "selected-flag", this.flagsContainer);
      this.selectedFlagInner = this._createEl("div", "iti-flag", this.selectedFlag);
      this.dropdownArrow = this._createEl("div", "iti-arrow", this.selectedFlag);

      // country list
      this.countryList = this._createEl("ul", "country-list hide");
      if (this.preferredCountries.length) {
        this._appendListItems(this.preferredCountries, "preferred");
        this._createEl("li", "divider", this.countryList);
      }
      this._appendListItems(this.countries, "");

      if (this.isMobile) {
        this.dropdown = this._createEl("div", "intl-tel-input iti-container");
        this.dropdown.appendChild(this.countryList);
      } else {
        this.flagsContainer.appendChild(this.countryList);
      }
    },

    _appendListItems: function(countries, className) {
      // we create so many DOM elements, it is faster to build a temp string
      // and then add everything to the DOM in one go at the end
      var tmp = "";
      // for each country
      for (var i = 0; i < countries.length; i++) {
        var c = countries[i];
        // open the list item
        tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
        // add the flag
        tmp += "<div class='flag-box'><div class='iti-flag " + c.iso2 + "'></div></div>";
        // and the country name and dial code
        tmp += "<span class='country-name'>" + c.name + "</span>";
        tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
        // close the list item
        tmp += "</li>";
      }
      this.countryList.insertAdjacentHTML("beforeend", tmp);
    },

    _setInitialState: function() {
      // see if we should select a flag
      if (this.options.initialCountry) {
        this._setFlag(this.options.initialCountry.toLowerCase());
      } else {
        // no dial code and no initialCountry, so default to first in list
        this.defaultCountry = this.countries[0].iso2;
        if (!this.telInput.value) {
          this._setFlag(this.defaultCountry);
        }
      }
    },

    // initialise the main event listeners: input keyup, and click selected flag
    _initListeners: function() {
      this._initKeyListeners();
      this._initDropdownListeners();
    },

    _initDropdownListeners: function() {
      var that = this;
      // toggle country dropdown on click
      this.selectedFlag.addEventListener("click", function() {
        // only intercept this event if we're opening the dropdown
        // else let it bubble up to the top ("click-off-to-close" listener)
        // we cannot just stopPropagation as it may be needed to close another instance
        if (that.countryList.classList.contains("hide")) {
          that._showDropdown();
        }
      }, false);
    },

    // initialize any key listeners
    _initKeyListeners: function() {
      var that = this;

      // update flag on keyup
      // (keep this listener separate otherwise the setTimeout breaks all the tests)
      this.telInput.addEventListener("keyup", function() {
        that._updateFlagFromNumber(that.telInput.value);
      }, false);
    },

    // extract the numeric digits from the given string
    _getNumeric: function(s) {
      return s.replace(/\D/g, "");
    },

    _showDropdown: function() {
      this._setDropdownPosition();
      this._bindDropdownListeners();
      this.dropdownArrow.classList.add("up");
    },

    _setDropdownPosition: function() {
      if (this.isMobile) {
        document.body.appendChild(this.dropdown);
      }
      this.countryList.classList.remove("hide");
    },

    _bindDropdownListeners: function() {
      var that = this;

      // when mouse over a list item, just highlight that one
      // we add the class "highlight", so if they hit "enter" we know which one to select
      this.countryMouseoverHandler = function(e) {
        var countryItem = e.target.closest(".country");
        if (countryItem) {
          that._highlightListItem(countryItem);
        }
      };
      this.countryList.addEventListener("mouseover", this.countryMouseoverHandler, false);

      // listen for country selection
      this.countryClickHandler = function(e) {
        var countryItem = e.target.closest(".country");
        if (countryItem) {
          that._selectListItem(countryItem);
        }
      };
      this.countryList.addEventListener("click", this.countryClickHandler, false);

      // click off to close
      // (except when this initial opening click is bubbling up)
      // we cannot just stopPropagation as it may be needed to close another instance
      var isOpening = true;
      this.clickOffToCloseHandler = function() {
        if (!isOpening) {
          that._closeDropdown();
        }
        isOpening = false;
      };
      document.documentElement.addEventListener("click", this.clickOffToCloseHandler, false);
    },

    // check if need to select a new flag based on the given number
    // Note: called from _setInitialState, keyup handler, setNumber
    _updateFlagFromNumber: function(number) {
      // if we're in nationalMode and we already have US/Canada selected, make sure the number starts with a +1 so _getDialCode will be able to extract the area code
      // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag from the number), that means we're initialising the plugin with a number that already has a dial code, so fine to ignore this bit
      if (number && this.options.nationalMode && this.selectedCountryData && this.selectedCountryData.dialCode == "1" && number.charAt(0) != "+") {
        if (number.charAt(0) != "1") {
          number = "1" + number;
        }
        number = "+" + number;
      }

      // try and extract valid dial code from input
      var dialCode = this._getDialCode(number),
        countryCode = null,
        numeric = this._getNumeric(number);
      if (dialCode) {
        // check if one of the matching countries is already selected
        var countryCodes = this.countryCodes[this._getNumeric(dialCode)],
          alreadySelected = (this.selectedCountryData && countryCodes.indexOf(this.selectedCountryData.iso2) > -1),
          // check if the given number contains an unknown area code from the North American Numbering Plan i.e. the only dialCode that could be extracted was +1 (instead of say +1204) and the actual number's length is >=4
          isUnknownNanp = (dialCode == "+1" && numeric.length >= 4);
        // if a matching country is not already selected (or this is an unknown NANP area code) AND it's not a regionlessNanp: choose the first in the list
        if ((!alreadySelected || isUnknownNanp) && !this._isRegionlessNanp(numeric)) {
          // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first non-empty index
          for (var j = 0; j < countryCodes.length; j++) {
            if (countryCodes[j]) {
              countryCode = countryCodes[j];
              break;
            }
          }
        }
      } else if (number.charAt(0) == "+" && numeric.length) {
        // invalid dial code, so empty
        // Note: use getNumeric here because the number has not been formatted yet, so could contain bad chars
        countryCode = "";
      } else if (!number || number == "+") {
        // empty, or just a plus, so default
        countryCode = this.defaultCountry;
      }

      if (countryCode !== null) {
        return this._setFlag(countryCode);
      }
      return false;
    },



    // check if the given number is a regionless NANP number (expects the number to contain an international dial code)
    _isRegionlessNanp: function(number) {
      var numeric = this._getNumeric(number);
      if (numeric.charAt(0) == "1") {
        var areaCode = numeric.substr(1, 3);
        return (regionlessNanpNumbers.indexOf(areaCode) > -1);
      }
      return false;
    },

    // remove highlighting from other list items and highlight the given item
    _highlightListItem: function(listItem) {
      var highlightedCountries = this.countryList.querySelectorAll(".highlight");
      for (var i = 0; i < highlightedCountries.length; i++) {
        highlightedCountries[i].classList.remove("highlight");
      }
      listItem.classList.add("highlight");
    },

    // find the country data for the given country code
    // the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
    _getCountryData: function(countryCode, ignoreOnlyCountriesOption, allowFail) {
      var countryList = (ignoreOnlyCountriesOption) ? allCountries : this.countries;
      for (var i = 0; i < countryList.length; i++) {
        if (countryList[i].iso2 == countryCode) {
          return countryList[i];
        }
      }
      if (allowFail) {
        return null;
      } else {
        throw new Error("No country data for '" + countryCode + "'");
      }
    },

    // select the given flag, update the placeholder and the active list item
    // Note: called from _setInitialState, _updateFlagFromNumber, _selectListItem, setCountry
    _setFlag: function(countryCode) {
      this.selectedCountryData = (countryCode) ? this._getCountryData(countryCode, false, false) : {};
      this.selectedFlagInner.className = "iti-flag " + countryCode;

      // update the selected country's title attribute
      var title = (countryCode) ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
      this.selectedFlag.setAttribute("title", title);

      // and the input's placeholder
      this._updatePlaceholder();
    },

    // update the input placeholder to an example number from the currently selected country
    _updatePlaceholder: function() {
      var shouldSetPlaceholder = (this.options.autoPlaceholder === "aggressive") || (!this.hadInitialPlaceholder && (this.options.autoPlaceholder === true || this.options.autoPlaceholder === "polite"));
      if (window.intlTelInputUtils && shouldSetPlaceholder && this.selectedCountryData) {
        var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType],
          placeholder = (this.selectedCountryData.iso2) ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";

        if (typeof this.options.customPlaceholder === "function") {
          placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
        }

        this.telInput.setAttribute("placeholder", placeholder);
      }
    },

    _selectListItem: function(listItem) {
      this._setFlag(listItem.getAttribute("data-country-code"));
      this._closeDropdown();
      this.telInput.focus();
    },

    _closeDropdown: function() {
      this.countryList.classList.add("hide");
      this.dropdownArrow.classList.remove("up");

      // unbind click-off-to-close
      document.documentElement.removeEventListener("click", this.clickOffToCloseHandler);
      // unbind hover and click listeners
      this.countryList.removeEventListener("mouseover", this.countryMouseoverHandler);
      this.countryList.removeEventListener("click", this.countryClickHandler);

      if (this.isMobile) {
        this.dropdown.remove();
      }
    },

    // try and extract a valid international dial code from a full telephone number
    // Note: returns the raw string inc plus character and any whitespace/dots etc
    _getDialCode: function(number) {
      var dialCode = "";
      // only interested in international numbers (starting with a plus)
      if (number.charAt(0) == "+") {
        var numericChars = "";
        // iterate over chars
        for (var i = 0; i < number.length; i++) {
          var c = number.charAt(i);
          // if char is number
          if (this._isNumeric(c)) {
            numericChars += c;
            // if current numericChars make a valid dial code
            if (this.countryCodes[numericChars]) {
              // store the actual raw string (useful for matching later)
              dialCode = number.substr(0, i + 1);
            }
            // longest dial code is 4 chars
            if (numericChars.length == 4) {
              break;
            }
          }
        }
      }
      return dialCode;
    },

    _isNumeric: function(s) {
      return !isNaN(s - parseFloat(s));
    },

    // get the input val, adding the dial code if separateDialCode is enabled
    _getFullNumber: function() {
      var val = this.telInput.value,
        dialCode = this.selectedCountryData.dialCode,
        prefix;
      if (this.options.separateDialCode) {
        prefix = "+" + dialCode;
      } else if (dialCode && dialCode.charAt(0) == "1" && dialCode.length == 4 && dialCode.substr(1) != val.substr(0, 3)) {
        // if we're dealing with a NANP country, ensure the number includes the area code
        prefix = dialCode.substr(1);
      } else {
        prefix = "";
      }
      return prefix + val;
    },







    // PUBLIC METHODS

    // format the number to the given format
    getNumber: function(format) {
      if (window.intlTelInputUtils) {
        return intlTelInputUtils.formatNumber(this._getFullNumber(), this.selectedCountryData.iso2, format);
      }
      return "";
    },

    // validate the input val - assumes the global function isValidNumber (from utilsScript)
    isValidNumber: function() {
      var val = this._getFullNumber().trim(),
        countryCode = (this.options.nationalMode) ? this.selectedCountryData.iso2 : "";
      return (window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null);
    }

  };

  // convenience wrapper
  return function(input, options) {
    var iti = new Iti(input, options);
    iti._init();
    return iti;
  };
})();
