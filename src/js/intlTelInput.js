// these vars persist through all instances of the plugin
var pluginName = "intlTelInput",
  id = 1, // give each instance it's own id for namespaced event handling
  defaults = {
    // whether or not to allow the dropdown
    allowDropdown: true,
    // if there is just a dial code in the input: remove it on blur, and re-add it on focus
    autoHideDialCode: true,
    // add a placeholder in the input with an example number for the selected country
    autoPlaceholder: "polite",
    // modify the auto placeholder
    customPlaceholder: null,
    // append menu to a specific element
    dropdownContainer: "",
    // don't display these countries
    excludeCountries: [],
    // format the input value during initialisation and on setNumber
    formatOnDisplay: true,
    // geoIp lookup function
    geoIpLookup: null,
    // inject a hidden input with this name, and on submit, populate it with the result of getNumber
    hiddenInput: "",
    // initial country
    initialCountry: "",
    // localized country names e.g. { 'de': 'Deutschland' }
    localizedCountries: null,
    // don't insert international dial codes
    nationalMode: true,
    // display only these countries
    onlyCountries: [],
    // number type to use for placeholders
    placeholderNumberType: "MOBILE",
    // the countries at the top of the list. defaults to united states and united kingdom
    preferredCountries: ["us", "gb"],
    // display the country dial code next to the selected flag so it's not part of the typed number
    separateDialCode: false,
    // specify the path to the libphonenumber script to enable validation/formatting
    utilsScript: "",
  },
  // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
  regionlessNanpNumbers = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"];


// keep track of if the window.load event has fired as impossible to check after the fact
window.addEventListener('load', function() {
  // UPDATE: use a public static field so we can fudge it in the tests
  $.fn[pluginName].windowLoaded = true;
});


function Plugin(element, options) {
  this.telInput = $(element);

  // process specified options / defaults
  var customOptions = options || {};
  this.options = {};
  for (var key in defaults) {
    this.options[key] = (customOptions.hasOwnProperty(key)) ? customOptions[key] : defaults[key];
  }

  // event namespace
  this.ns = "." + pluginName + (id++);

  // Chrome, FF, Safari, IE9+
  this.isGoodBrowser = Boolean(element.setSelectionRange);

  this.hadInitialPlaceholder = Boolean(this.telInput[0].getAttribute("placeholder"));
}


Plugin.prototype = {

  _init: function() {
    // if in nationalMode, disable options relating to dial codes
    if (this.options.nationalMode) {
      this.options.autoHideDialCode = false;
    }

    // if separateDialCode then doesn't make sense to A) insert dial code into input (autoHideDialCode), and B) display national numbers (because we're displaying the country dial code next to them)
    if (this.options.separateDialCode) {
      this.options.autoHideDialCode = this.options.nationalMode = false;
    }

    // we cannot just test screen size as some smartphones/website meta tags will report desktop resolutions
    // Note: for some reason jasmine breaks if you put this in the main Plugin function with the rest of these declarations
    // Note: to target Android Mobiles (and not Tablets), we must find "Android" and "Mobile"
    this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (this.isMobile) {
      // trigger the mobile dropdown css
      document.body.classList.add("iti-mobile");

      // on mobile, we want a full screen dropdown, so we must append it to the body
      if (!this.options.dropdownContainer) {
        this.options.dropdownContainer = "body";
      }
    }

    // we return these deferred objects from the _init() call so they can be watched, and then we resolve them when each specific request returns
    // Note: again, jasmine breaks when I put these in the Plugin function
    this.autoCountryDeferred = new $.Deferred();
    this.utilsScriptDeferred = new $.Deferred();

    // in various situations there could be no country selected initially, but we need to be able to assume this variable exists
    this.selectedCountryData = {};

    // process all the data: onlyCountries, excludeCountries, preferredCountries etc
    this._processCountryData();

    // generate the markup
    this._generateMarkup();

    // set the initial state of the input value and the selected flag
    this._setInitialState();

    // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
    this._initListeners();

    // utils script, and auto country
    this._initRequests();

    // return the deferreds
    return [this.autoCountryDeferred, this.utilsScriptDeferred];
  },



  /********************
   *  PRIVATE METHODS
   ********************/


  // prepare all of the country data, including onlyCountries, excludeCountries and preferredCountries options
  _processCountryData: function() {
    // process onlyCountries or excludeCountries array if present
    this._processAllCountries();

    // process the countryCodes map
    this._processCountryCodes();

    // process the preferredCountries
    this._processPreferredCountries();

    // translate countries according to localizedCountries option
    if (this.options.localizedCountries) {
      this._translateCountriesByLocale();
    }

    // sort countries by name
    if (this.options.onlyCountries.length || this.options.localizedCountries) {
      this.countries.sort(this._countryNameSort);
    }
  },


  // add a country code to this.countryCodes
  _addCountryCode: function(iso2, dialCode, priority) {
    if (!(dialCode in this.countryCodes)) {
      this.countryCodes[dialCode] = [];
    }
    var index = priority || 0;
    this.countryCodes[dialCode][index] = iso2;
  },


   // process onlyCountries or excludeCountries array if present
  _processAllCountries: function() {
    if (this.options.onlyCountries.length) {
      var lowerCaseOnlyCountries = this.options.onlyCountries.map(function(country) {
        return country.toLowerCase();
      });
      this.countries = allCountries.filter(function(country) {
        return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
      });
    } else if (this.options.excludeCountries.length) {
      var lowerCaseExcludeCountries = this.options.excludeCountries.map(function(country) {
        return country.toLowerCase();
      });
      this.countries = allCountries.filter(function(country) {
        return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
      });
    } else {
      this.countries = allCountries;
    }
  },

  // Translate Countries by object literal provided on config
  _translateCountriesByLocale: function() {
      for (var i = 0; i < this.countries.length; i++) {
          var iso = this.countries[i].iso2.toLowerCase();
          if (iso in this.options.localizedCountries) {
              this.countries[i].name = this.options.localizedCountries[iso];
          }
      }
  },

  // sort by country name
  _countryNameSort: function(a, b) {
    return a.name.localeCompare(b.name);
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


  // create a DOM element
  _createEl: function(name, attrs, container) {
    var el = document.createElement(name);
    if (attrs) {
      for (var attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
      }
    }
    // when purge jquery, remove this [0] and $(el)
    if (container) container[0].appendChild(el);
    return $(el);
  },


  // generate all of the markup for the plugin: the selected flag overlay, and the dropdown
  _generateMarkup: function() {
    // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can easily put the plugin in an inconsistent state e.g. the wrong flag selected for the autocompleted number, which on submit could mean the wrong number is saved (esp in nationalMode)
    this.telInput[0].setAttribute("autocomplete", "off");

    // containers (mostly for positioning)
    var parentClass = "intl-tel-input";
    if (this.options.allowDropdown) {
      parentClass += " allow-dropdown";
    }
    if (this.options.separateDialCode) {
      parentClass += " separate-dial-code";
    }
    var wrapper = this._createEl("div", { "class": parentClass });
    this.telInput[0].parentNode.insertBefore(wrapper[0], this.telInput[0]);
    this.flagsContainer = this._createEl("div", { "class": "flag-container" }, wrapper);
    wrapper[0].appendChild(this.telInput[0]);

    // selected flag (displayed to left of input)
    this.selectedFlag = this._createEl("div", {
      "class": "selected-flag",
      "role": "combobox",
      "aria-owns": "country-listbox",
    }, this.flagsContainer);
    this.selectedFlagInner = this._createEl("div", { "class": "iti-flag" }, this.selectedFlag);

    if (this.options.separateDialCode) {
      this.selectedDialCode = this._createEl("div", { "class": "selected-dial-code" }, this.selectedFlag);
    }

    if (this.options.allowDropdown) {
      // make element focusable and tab navigable
      this.selectedFlag[0].setAttribute("tabindex", "0");
      this.dropdownArrow = this._createEl("div", { "class": "iti-arrow" }, this.selectedFlag);

      // country dropdown: preferred countries, then divider, then all countries
      this.countryList = this._createEl("ul", {
        "class": "country-list hide",
        "id": "country-listbox",
        "aria-expanded": "false",
        "role": "listbox",
      });
      if (this.preferredCountries.length) {
        this._appendListItems(this.preferredCountries, "preferred");
        this._createEl("li", {
          "class": "divider",
          "role": "separator",
          "aria-disabled": "true",
        }, this.countryList);
      }
      this._appendListItems(this.countries, "");

      // this is useful in lots of places
      this.countryListItems = this.countryList.children(".country");

      // create dropdownContainer markup
      if (this.options.dropdownContainer) {
        this.dropdown = this._createEl("div", { "class": "intl-tel-input iti-container" });
        this.dropdown[0].appendChild(this.countryList[0]);
      } else {
        this.flagsContainer[0].appendChild(this.countryList[0]);
      }
    } else {
      // a little hack so we don't break anything
      this.countryListItems = $();
    }

    if (this.options.hiddenInput) {
      var hiddenInputName = this.options.hiddenInput;
      var name = this.telInput[0].getAttribute("name");
      if (name) {
        var i = name.lastIndexOf("[");
        // if input name contains square brackets, then give the hidden input the same name,
        // replacing the contents of the last set of brackets with the given hiddenInput name
        if (i !== -1) hiddenInputName = name.substr(0, i) + "[" + hiddenInputName + "]";
      }
      this.hiddenInput = this._createEl("input", {
        type: "hidden",
        name: hiddenInputName,
      });
      wrapper[0].appendChild(this.hiddenInput[0]);
    }
  },


  // add a country <li> to the countryList <ul> container
  _appendListItems: function(countries, className) {
    // we create so many DOM elements, it is faster to build a temp string
    // and then add everything to the DOM in one go at the end
    var tmp = "";
    // for each country
    for (var i = 0; i < countries.length; i++) {
      var c = countries[i];
      // open the list item
      tmp += "<li class='country " + className + "' id='iti-item-" + c.iso2 + "' role='option' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
      // add the flag
      tmp += "<div class='flag-box'><div class='iti-flag " + c.iso2 + "'></div></div>";
      // and the country name and dial code
      tmp += "<span class='country-name'>" + c.name + "</span>";
      tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
      // close the list item
      tmp += "</li>";
    }
    this.countryList[0].insertAdjacentHTML("beforeend", tmp);
  },


  // set the initial state of the input value and the selected flag by:
  // 1. extracting a dial code from the given number
  // 2. using explicit initialCountry
  // 3. picking the first preferred country
  // 4. picking the first country
  _setInitialState: function() {
    var val = this.telInput.val();
    var dialCode = this._getDialCode(val);
    var isRegionlessNanp = this._isRegionlessNanp(val);

    // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the flag, else fall back to the default country
    if (dialCode && !isRegionlessNanp) {
      this._updateFlagFromNumber(val);
    } else if (this.options.initialCountry !== "auto") {
      // see if we should select a flag
      if (this.options.initialCountry) {
        this._setFlag(this.options.initialCountry.toLowerCase());
      } else {
        if (dialCode && isRegionlessNanp) {
          // has intl dial code, is regionless nanp, and no initialCountry, so default to US
          this._setFlag('us');
        } else {
          // no dial code and no initialCountry, so default to first in list
          this.defaultCountry = (this.preferredCountries.length) ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
          if (!val) {
            this._setFlag(this.defaultCountry);
          }
        }
      }

      // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
      if (!val && !this.options.nationalMode && !this.options.autoHideDialCode && !this.options.separateDialCode) {
        this.telInput.val("+" + this.selectedCountryData.dialCode);
      }
    }
    // NOTE: if initialCountry is set to auto, that will be handled separately

    // format
    if (val) {
      // this wont be run after _updateDialCode as that's only called if no val
      this._updateValFromNumber(val);
    }
  },


  // initialise the main event listeners: input keyup, and click selected flag
  _initListeners: function() {
    this._initKeyListeners();

    if (this.options.autoHideDialCode) {
      this._initFocusListeners();
    }

    if (this.options.allowDropdown) {
      this._initDropdownListeners();
    }

    if (this.hiddenInput) {
      this._initHiddenInputListener();
    }
  },


  // update hidden input on form submit
  _initHiddenInputListener: function() {
    var that = this;

    this._handleHiddenInputSubmit = function() {
      that.hiddenInput.value = that.getNumber();
    };
    var form = this.telInput[0].form;
    if (form) form.addEventListener("submit", this._handleHiddenInputSubmit);
  },


  // iterate through parent nodes to find the closest label ancestor, if it exists
  _getClosestLabel: function() {
    var el = this.telInput[0];
    while (el && el.tagName !== 'LABEL') el = el.parentNode;
    return el;
  },


  // initialise the dropdown listeners
  _initDropdownListeners: function() {
    var that = this;

    // hack for input nested inside label (which is valid markup): clicking the selected-flag to open the dropdown would then automatically trigger a 2nd click on the input which would close it again
    this._handleLabelClick = function(e) {
      // if the dropdown is closed, then focus the input, else ignore the click
      if (that.countryList[0].classList.contains("hide")) {
        that.telInput[0].focus();
      } else {
        e.preventDefault();
      }
    };
    var label = this._getClosestLabel();
    if (label) label.addEventListener("click", this._handleLabelClick);

    // toggle country dropdown on click
    this._handleClickSelectedFlag = function() {
      // only intercept this event if we're opening the dropdown
      // else let it bubble up to the top ("click-off-to-close" listener)
      // we cannot just stopPropagation as it may be needed to close another instance
      if (that.countryList[0].classList.contains("hide") && !that.telInput[0].disabled && !that.telInput[0].readOnly) {
        that._showDropdown();
      }
    };
    this.selectedFlag[0].addEventListener("click", this._handleClickSelectedFlag);

    // open dropdown list if currently focused
    this._handleFlagsContainerKeydown = function(e) {
      var isDropdownHidden = that.countryList[0].classList.contains("hide");

      if (isDropdownHidden && ["ArrowUp", "ArrowDown", " ", "Enter"].indexOf(e.key) !== -1) {
        // prevent form from being submitted if "ENTER" was pressed
        e.preventDefault();
        // prevent event from being handled again by document
        e.stopPropagation();
        that._showDropdown();
      }

      // allow navigation from dropdown to input on TAB
      if (e.key === "Tab") that._closeDropdown();
    };
    this.flagsContainer[0].addEventListener("keydown", this._handleFlagsContainerKeydown);
  },


  // init many requests: utils script / geo ip lookup
  _initRequests: function() {
    var that = this;

    // if the user has specified the path to the utils script, fetch it on window.load, else resolve
    if (this.options.utilsScript && !window.intlTelInputUtils) {
      // if the plugin is being initialised after the window.load event has already been fired
      if ($.fn[pluginName].windowLoaded) {
        $.fn[pluginName].loadUtils(this.options.utilsScript);
      } else {
        // wait until the load event so we don't block any other requests e.g. the flags image
        window.addEventListener('load', function() {
          $.fn[pluginName].loadUtils(that.options.utilsScript);
        });
      }
    } else {
      this.utilsScriptDeferred.resolve();
    }

    if (this.options.initialCountry === "auto") {
      this._loadAutoCountry();
    } else {
      this.autoCountryDeferred.resolve();
    }
  },


  // perform the geo ip lookup
  _loadAutoCountry: function() {
    var that = this;

    // 3 options:
    // 1) already loaded (we're done)
    // 2) not already started loading (start)
    // 3) already started loading (do nothing - just wait for loading callback to fire)
    if ($.fn[pluginName].autoCountry) {
      this.handleAutoCountry();
    } else if (!$.fn[pluginName].startedLoadingAutoCountry) {
      // don't do this twice!
      $.fn[pluginName].startedLoadingAutoCountry = true;

      if (typeof this.options.geoIpLookup === 'function') {
        this.options.geoIpLookup(function(countryCode) {
          $.fn[pluginName].autoCountry = countryCode.toLowerCase();
          // tell all instances the auto country is ready
          // TODO: this should just be the current instances
          // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight away (e.g. if they have already done the geo ip lookup somewhere else). Using setTimeout means that the current thread of execution will finish before executing this, which allows the plugin to finish initialising.
          setTimeout(function() {
            $(".intl-tel-input input").intlTelInput("handleAutoCountry");
          });
        });
      }
    }
  },


  // initialize any key listeners
  _initKeyListeners: function() {
    var that = this;

    // update flag on keyup
    this._handleKeyupEvent = function() {
      if (that._updateFlagFromNumber(that.telInput[0].value)) {
        that._triggerCountryChange();
      }
    };
    this.telInput[0].addEventListener("keyup", this._handleKeyupEvent);

    // update flag on cut/paste events (now supported in all major browsers)
    this._handleClipboardEvent = function() {
      // hack because "paste" event is fired before input is updated
      setTimeout(that._handleKeyupEvent);
    };
    this.telInput[0].addEventListener("cut", this._handleClipboardEvent);
    this.telInput[0].addEventListener("paste", this._handleClipboardEvent);
  },


  // adhere to the input's maxlength attr
  _cap: function(number) {
    var max = this.telInput.attr("maxlength");
    return (max && number.length > max) ? number.substr(0, max) : number;
  },


  // listen for mousedown, focus and blur (for autoHideDialCode feature)
  _initFocusListeners: function() {
    var that = this;

    // mousedown decides where the cursor goes, so if we're focusing we must preventDefault as we'll be inserting the dial code, and we want the cursor to be at the end no matter where they click
    this._handleMousedownFocusEvent = function(e) {
      if (that.telInput[0] !== document.activeElement && !that.telInput[0].value) {
        e.preventDefault();
        // but this also cancels the focus, so we must trigger that manually
        that.telInput[0].focus();
      }
    };
    this.telInput[0].addEventListener("mousedown", this._handleMousedownFocusEvent);

    this._handleKeypressPlusEvent = function(e) {
      if (e.key === "+") that.telInput[0].value = "";
    };

    // on focus: if empty, insert the dial code for the currently selected flag
    this._handleFocusEvent = function(e) {
      if (!that.telInput[0].value && !that.telInput[0].readOnly && that.selectedCountryData.dialCode) {
        // insert the dial code
        that.telInput[0].value = "+" + that.selectedCountryData.dialCode;
        // after auto-inserting a dial code, if the first key they hit is '+' then assume they are entering a new number, so remove the dial code. use keypress instead of keydown because keydown gets triggered for the shift key (required to hit the + key), and instead of keyup because that shows the new '+' before removing the old one
        that.telInput[0].addEventListener("keypress", that._handleKeypressPlusEvent);

        // after tabbing in, make sure the cursor is at the end we must use setTimeout to get outside of the focus handler as it seems the selection happens after that
        setTimeout(function() {
          var input = that.telInput[0];
          if (that.isGoodBrowser) {
            var len = input.value.length;
            input.setSelectionRange(len, len);
          }
        });
      }
    };
    this.telInput[0].addEventListener("focus", this._handleFocusEvent);

    // on blur or form submit: if just a dial code then remove it
    this._handleSubmitOrBlurEvent = function() {
      that._removeEmptyDialCode();
    };
    var form = this.telInput[0].form;
    if (form) form.addEventListener("submit", this._handleSubmitOrBlurEvent);
    this.telInput[0].addEventListener("blur", this._handleSubmitOrBlurEvent);

    // made the decision not to trigger blur() now, because would only do anything in the case where they manually set the initial value to just a dial code, in which case they probably want it to be displayed.
  },

  _removeEmptyDialCode: function () {
      var value = this.telInput[0].value,
        startsPlus = (value.charAt(0) == "+");

      if (startsPlus) {
        var numeric = this._getNumeric(value);
        // if just a plus, or if just a dial code
        if (!numeric || this.selectedCountryData.dialCode == numeric) {
          this.telInput[0].value = "";
        }
      }

      // remove the keypress listener we added on focus
      this.telInput[0].removeEventListener("keypress", this._handleKeypressPlusEvent);
  },

  // extract the numeric digits from the given string
  _getNumeric: function(s) {
    return s.replace(/\D/g, "");
  },


  // show the dropdown
  _showDropdown: function() {
    this._setDropdownPosition();

    // update highlighting and scroll to active list item
    var activeListItem = this.countryList.children(".active");
    if (activeListItem.length) {
      this._highlightListItem(activeListItem);
      this._scrollTo(activeListItem);
    }

    // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
    this._bindDropdownListeners();

    // update the arrow
    this.dropdownArrow.addClass("up");

    this.telInput.trigger("open:countrydropdown");
  },


  // decide where to position dropdown (depends on position within viewport, and scroll)
  _setDropdownPosition: function() {
    var that = this;

    if (this.options.dropdownContainer) {
      this.dropdown.appendTo(this.options.dropdownContainer);
    }

    // show the menu and grab the dropdown height
    this.dropdownHeight = this.countryList.removeClass("hide").attr("aria-expanded", "true").outerHeight();

    if (!this.isMobile) {
      var pos = this.telInput.offset(),
        inputTop = pos.top,
        windowTop = $(window).scrollTop(),
        // dropdownFitsBelow = (dropdownBottom < windowBottom)
        dropdownFitsBelow = (inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height()),
        dropdownFitsAbove = (inputTop - this.dropdownHeight > windowTop);

      // by default, the dropdown will be below the input. If we want to position it above the input, we add the dropup class.
      this.countryList.toggleClass("dropup", !dropdownFitsBelow && dropdownFitsAbove);

      // if dropdownContainer is enabled, calculate postion
      if (this.options.dropdownContainer) {
        // by default the dropdown will be directly over the input because it's not in the flow. If we want to position it below, we need to add some extra top value.
        var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.innerHeight();

        // calculate placement
        this.dropdown.css({
          "top": inputTop + extraTop,
          "left": pos.left
        });

        // close menu on window scroll
        this._handleWindowScroll = function() {
          that._closeDropdown();
        };
        window.addEventListener("scroll", this._handleWindowScroll);
      }
    }
  },


  // iterate through parent nodes to find the closest list item
  _getClosestListItem: function(target) {
    var el = target;
    while (el && el !== this.countryList[0] && !el.classList.contains("country")) el = el.parentNode;
    // if we reached the countryList element, then return null
    return (el === this.countryList[0]) ? null : el;
  },


  // we only bind dropdown listeners when the dropdown is open
  _bindDropdownListeners: function() {
    var that = this;

    // when mouse over a list item, just highlight that one
    // we add the class "highlight", so if they hit "enter" we know which one to select
    this._handleMouseoverCountryList = function(e) {
      // handle event delegation, as we're listening for this event on the countryList
      var listItem = that._getClosestListItem(e.target);
      if (listItem) that._highlightListItem($(listItem));
    };
    this.countryList[0].addEventListener("mouseover", this._handleMouseoverCountryList);

    // listen for country selection
    this._handleClickCountryList = function(e) {
      var listItem = that._getClosestListItem(e.target);
      if (listItem) that._selectListItem($(listItem));
    };
    this.countryList[0].addEventListener("click", this._handleClickCountryList);

    // click off to close
    // (except when this initial opening click is bubbling up)
    // we cannot just stopPropagation as it may be needed to close another instance
    var isOpening = true;
    this._handleClickOffToClose = function() {
      if (!isOpening) that._closeDropdown();
      isOpening = false;
    };
    document.documentElement.addEventListener("click", this._handleClickOffToClose);

    // listen for up/down scrolling, enter to select, or letters to jump to country name.
    // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
    // just hit down and hold it to scroll down (no keyup event).
    // listen on the document because that's where key events are triggered if no input has focus
    var query = "",
      queryTimer = null;
    this._handleKeydownOnDropdown = function(e) {
      // prevent down key from scrolling the whole page,
      // and enter key from submitting a form etc
      e.preventDefault();

      // up and down to navigate
      if (e.key === "ArrowUp" || e.key === "ArrowDown") that._handleUpDownKey(e.key);
      // enter to select
      else if (e.key === "Enter") that._handleEnterKey();
      // esc to close
      else if (e.key === "Escape") that._closeDropdown();
      // alpha chars to perform search
      // regex allows one latin alpha char or space, based on https://stackoverflow.com/a/26900132/217866)
      else if (/^[a-zA-ZÀ-ÿ ]$/.test(e.key)) {
        // jump to countries that start with the query string
        if (queryTimer) clearTimeout(queryTimer);
        query += e.key.toLowerCase();
        that._searchForCountry(query);
        // if the timer hits 1 second, reset the query
        queryTimer = setTimeout(function() {
          query = "";
        }, 1000);
      }
    };
    document.addEventListener("keydown", this._handleKeydownOnDropdown);
  },


  // highlight the next/prev item in the list (and ensure it is visible)
  _handleUpDownKey: function(key) {
    var current = this.countryList.children(".highlight").first();
    var next = (key === "ArrowUp") ? current.prev() : current.next();
    if (next.length) {
      // skip the divider
      if (next.hasClass("divider")) {
        next = (key === "ArrowUp") ? next.prev() : next.next();
      }
      this._highlightListItem(next);
      this._scrollTo(next);
    }
  },


  // select the currently highlighted item
  _handleEnterKey: function() {
    var currentCountry = this.countryList.children(".highlight").first();
    if (currentCountry.length) {
      this._selectListItem(currentCountry);
    }
  },


  // find the first list item whose name starts with the query string
  _searchForCountry: function(query) {
    for (var i = 0; i < this.countries.length; i++) {
      if (this._startsWith(this.countries[i].name, query)) {
        var listItem = this.countryList.children("[data-country-code=" + this.countries[i].iso2 + "]").not(".preferred");
        // update highlighting and scroll
        this._highlightListItem(listItem);
        this._scrollTo(listItem, true);
        break;
      }
    }
  },


  // check if string a starts with string b
  _startsWith: function(a, b) {
    return (a.substr(0, b.length).toLowerCase() == b);
  },


  // update the input's value to the given val (format first if possible)
  // NOTE: this is called from _setInitialState, handleUtils and setNumber
  _updateValFromNumber: function(number) {
    if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
      var format = (!this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) != "+")) ? intlTelInputUtils.numberFormat.NATIONAL : intlTelInputUtils.numberFormat.INTERNATIONAL;
      number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
    }

    number = this._beforeSetNumber(number);
    this.telInput.val(number);
  },


  // check if need to select a new flag based on the given number
  // Note: called from _setInitialState, keyup handler, setNumber
  _updateFlagFromNumber: function(number) {
    // if we're in nationalMode and we already have US/Canada selected, make sure the number starts with a +1 so _getDialCode will be able to extract the area code
    // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag from the number), that means we're initialising the plugin with a number that already has a dial code, so fine to ignore this bit
    if (number && this.options.nationalMode && this.selectedCountryData.dialCode == "1" && number.charAt(0) != "+") {
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
        alreadySelected = (countryCodes.indexOf(this.selectedCountryData.iso2) !== -1),
        // check if the given number contains a NANP area code i.e. the only dialCode that could be extracted was +1 (instead of say +1204) and the actual number's length is >=4
        isNanpAreaCode = (dialCode == "+1" && numeric.length >= 4),
        nanpSelected = (this.selectedCountryData.dialCode == "1");

      // only update the flag if:
      // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
      // AND
      // B) either a matching country is not already selected OR the number contains a NANP area code (ensure the flag is set to the first matching country)
      if (!(nanpSelected && this._isRegionlessNanp(numeric)) && (!alreadySelected || isNanpAreaCode)) {
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
      return (regionlessNanpNumbers.indexOf(areaCode) !== -1);
    }
    return false;
  },



  // remove highlighting from other list items and highlight the given item
  _highlightListItem: function(listItem) {
    this.countryListItems.removeClass("highlight");
    listItem.addClass("highlight");
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
    var prevCountry = (this.selectedCountryData.iso2) ? this.selectedCountryData : {};

    // do this first as it will throw an error and stop if countryCode is invalid
    this.selectedCountryData = (countryCode) ? this._getCountryData(countryCode, false, false) : {};
    // update the defaultCountry - we only need the iso2 from now on, so just store that
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    this.selectedFlagInner.attr("class", "iti-flag " + countryCode);
    // update the selected country's title attribute
    var title = (countryCode) ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
    this.selectedFlag.attr("title", title);

    if (this.options.separateDialCode) {
      var dialCode = (this.selectedCountryData.dialCode) ? "+" + this.selectedCountryData.dialCode : "",
        parent = this.telInput.parent();
      if (prevCountry.dialCode) {
        parent.removeClass("iti-sdc-" + (prevCountry.dialCode.length + 1));
      }
      if (dialCode) {
        parent.addClass("iti-sdc-" + dialCode.length);
      }
      this.selectedDialCode.text(dialCode);
    }

    // and the input's placeholder
    this._updatePlaceholder();

    // update the active list item
    if (this.options.allowDropdown) {
      this.countryListItems.removeClass("active").attr("aria-selected", "false");
      if (countryCode) {
        var listItem = this.countryListItems.find(".iti-flag." + countryCode).first().parent().parent();
        listItem.addClass("active").attr("aria-selected", "true");
        this.countryList.attr("aria-activedescendant", listItem.attr("id"));
      }
    }

    // return if the flag has changed or not
    return (prevCountry.iso2 !== countryCode);
  },


  // update the input placeholder to an example number from the currently selected country
  _updatePlaceholder: function() {
    var shouldSetPlaceholder = (this.options.autoPlaceholder === "aggressive") || (!this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite");
    if (window.intlTelInputUtils && shouldSetPlaceholder) {
      var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType],
        placeholder = (this.selectedCountryData.iso2) ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";

      placeholder = this._beforeSetNumber(placeholder);

      if (typeof this.options.customPlaceholder === 'function') {
        placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
      }

      this.telInput[0].setAttribute("placeholder", placeholder);
    }
  },


  // called when the user selects a list item from the dropdown
  _selectListItem: function(listItem) {
    // update selected flag and active list item
    var flagChanged = this._setFlag(listItem.attr("data-country-code"));
    this._closeDropdown();

    this._updateDialCode(listItem.attr("data-dial-code"), true);

    // focus the input
    this.telInput.focus();
    // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto inserting dial code), who try to put the cursor at the beginning the first time
    if (this.isGoodBrowser) {
      var len = this.telInput.val().length;
      this.telInput[0].setSelectionRange(len, len);
    }

    if (flagChanged) {
      this._triggerCountryChange();
    }
  },


  // close the dropdown and unbind any listeners
  _closeDropdown: function() {
    this.countryList.addClass("hide");
    this.countryList.attr("aria-expanded", "false");
    // update the arrow
    this.dropdownArrow.removeClass("up");

    // unbind key events
    document.removeEventListener("keydown", this._handleKeydownOnDropdown);
    document.documentElement.removeEventListener("click", this._handleClickOffToClose);
    this.countryList[0].removeEventListener("mouseover", this._handleMouseoverCountryList);
    this.countryList[0].removeEventListener("click", this._handleClickCountryList);

    // remove menu from container
    if (this.options.dropdownContainer) {
      if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
      this.dropdown.detach();
    }

    this.telInput.trigger("close:countrydropdown");
  },


  // check if an element is visible within it's container, else scroll until it is
  _scrollTo: function(element, middle) {
    var container = this.countryList,
      containerHeight = container.height(),
      containerTop = container.offset().top,
      containerBottom = containerTop + containerHeight,
      elementHeight = element.outerHeight(),
      elementTop = element.offset().top,
      elementBottom = elementTop + elementHeight,
      newScrollTop = elementTop - containerTop + container.scrollTop(),
      middleOffset = (containerHeight / 2) - (elementHeight / 2);

    if (elementTop < containerTop) {
      // scroll up
      if (middle) {
        newScrollTop -= middleOffset;
      }
      container.scrollTop(newScrollTop);
    } else if (elementBottom > containerBottom) {
      // scroll down
      if (middle) {
        newScrollTop += middleOffset;
      }
      var heightDifference = containerHeight - elementHeight;
      container.scrollTop(newScrollTop - heightDifference);
    }
  },


  // replace any existing dial code with the new one
  // Note: called from _selectListItem and setCountry
  _updateDialCode: function(newDialCode, hasSelectedListItem) {
    var inputVal = this.telInput.val(),
      newNumber;

    // save having to pass this every time
    newDialCode = "+" + newDialCode;

    if (inputVal.charAt(0) == "+") {
      // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
      var prevDialCode = this._getDialCode(inputVal);
      if (prevDialCode) {
        // current number contains a valid dial code, so replace it
        newNumber = inputVal.replace(prevDialCode, newDialCode);
      } else {
        // current number contains an invalid dial code, so ditch it
        // (no way to determine where the invalid dial code ends and the rest of the number begins)
        newNumber = newDialCode;
      }
    } else if (this.options.nationalMode || this.options.separateDialCode) {
      // don't do anything
      return;
    } else {
      // nationalMode is disabled
      if (inputVal) {
        // there is an existing value with no dial code: prefix the new dial code
        newNumber = newDialCode + inputVal;
      } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
        // no existing value and either they've just selected a list item, or autoHideDialCode is disabled: insert new dial code
        newNumber = newDialCode;
      } else {
        return;
      }
    }

    this.telInput.val(newNumber);
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
        // if char is number (https://stackoverflow.com/a/8935649/217866)
        if (!isNaN(parseInt(c, 10))) {
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


  // get the input val, adding the dial code if separateDialCode is enabled
  _getFullNumber: function() {
    var val = this.telInput.val().trim(),
      dialCode = this.selectedCountryData.dialCode,
      prefix,
      numericVal = this._getNumeric(val),
      // normalized means ensure starts with a 1, so we can match against the full dial code
      normalizedVal = (numericVal.charAt(0) == "1") ? numericVal : "1" + numericVal;
    if (this.options.separateDialCode) {
      // when using separateDialCode, it is visible so is effectively part of the typed number
      prefix = "+" + dialCode;
    } else if (val && val.charAt(0) != "+" && val.charAt(0) != "1" && dialCode && dialCode.charAt(0) == "1" && dialCode.length == 4 && dialCode != normalizedVal.substr(0, 4)) {
      // ensure national NANP numbers contain the area code
      prefix = dialCode.substr(1);
    } else {
      prefix = "";
    }
    return prefix + val;
  },


  // remove the dial code if separateDialCode is enabled
  // also cap the length if the input has a maxlength attribute
  _beforeSetNumber: function(number) {
    if (this.options.separateDialCode) {
      var dialCode = this._getDialCode(number);
      if (dialCode) {
        // US dialCode is "+1", which is what we want
        // CA dialCode is "+1 123", which is wrong - should be "+1" (as it has multiple area codes)
        // AS dialCode is "+1 684", which is what we want (as it doesn't have area codes)
        // Solution: if the country has area codes, then revert to just the dial code
        if (this.selectedCountryData.areaCodes !== null) {
          dialCode = "+" + this.selectedCountryData.dialCode;
        }
        // a lot of numbers will have a space separating the dial code and the main number, and some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get rid of it
        // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
        var start = (number[dialCode.length] === " " || number[dialCode.length] === "-") ? dialCode.length + 1 : dialCode.length;
        number = number.substr(start);
      }
    }

    return this._cap(number);
  },


  // trigger the 'countrychange' event
  _triggerCountryChange: function() {
    this.telInput.trigger("countrychange", this.selectedCountryData);
  },



  /**************************
   *  SECRET PUBLIC METHODS
   **************************/


  // this is called when the geoip call returns
  handleAutoCountry: function() {
    if (this.options.initialCountry === "auto") {
      // we must set this even if there is an initial val in the input: in case the initial val is invalid and they delete it - they should see their auto country
      this.defaultCountry = $.fn[pluginName].autoCountry;
      // if there's no initial value in the input, then update the flag
      if (!this.telInput.val()) {
        this.setCountry(this.defaultCountry);
      }
      this.autoCountryDeferred.resolve();
    }
  },


  // this is called when the utils request completes
  handleUtils: function() {
    // if the request was successful
    if (window.intlTelInputUtils) {
      // if there's an initial value in the input, then format it
      if (this.telInput.val()) {
        this._updateValFromNumber(this.telInput.val());
      }
      this._updatePlaceholder();
    }
    this.utilsScriptDeferred.resolve();
  },



  /********************
   *  PUBLIC METHODS
   ********************/


  // remove plugin
  destroy: function() {
    var form = this.telInput[0].form;

    if (this.options.allowDropdown) {
      // make sure the dropdown is closed (and unbind listeners)
      this._closeDropdown();
      this.selectedFlag[0].removeEventListener("click", this._handleClickSelectedFlag);
      this.flagsContainer[0].removeEventListener("keydown", this._handleFlagsContainerKeydown);
      // label click hack
      var label = this._getClosestLabel();
      if (label) label.removeEventListener("click", this._handleLabelClick);
    }

    // unbind hiddenInput listeners
    if (this.hiddenInput) {
      if (form) form.removeEventListener("submit", this._handleHiddenInputSubmit);
    }

    // unbind autoHideDialCode listeners
    if (this.options.autoHideDialCode) {
      this.telInput[0].removeEventListener("mousedown", this._handleMousedownFocusEvent);
      this.telInput[0].removeEventListener("focus", this._handleFocusEvent);
      if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
      this.telInput[0].removeEventListener("blur", this._handleSubmitOrBlurEvent);
    }

    // unbind all events: key events, and focus/blur events if autoHideDialCode=true
    this.telInput.off(this.ns);
    this.telInput[0].removeEventListener("keyup", this._handleKeyupEvent);
    this.telInput[0].removeEventListener("cut", this._handleClipboardEvent);
    this.telInput[0].removeEventListener("paste", this._handleClipboardEvent);

    // remove markup (but leave the original input)
    var wrapper = this.telInput[0].parentNode;
    wrapper.parentNode.insertBefore(this.telInput[0], wrapper);
    wrapper.parentNode.removeChild(wrapper);
  },


  // get the extension from the current number
  getExtension: function() {
    if (window.intlTelInputUtils) {
      return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
    }
    return "";
  },


  // format the number to the given format
  getNumber: function(format) {
    if (window.intlTelInputUtils) {
      return intlTelInputUtils.formatNumber(this._getFullNumber(), this.selectedCountryData.iso2, format);
    }
    return "";
  },


  // get the type of the entered number e.g. landline/mobile
  getNumberType: function() {
    if (window.intlTelInputUtils) {
      return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
    }
    return -99;
  },


  // get the country data for the currently selected flag
  getSelectedCountryData: function() {
    return this.selectedCountryData;
  },


  // get the validation error
  getValidationError: function() {
    if (window.intlTelInputUtils) {
      return intlTelInputUtils.getValidationError(this._getFullNumber(), this.selectedCountryData.iso2);
    }
    return -99;
  },


  // validate the input val - assumes the global function isValidNumber (from utilsScript)
  isValidNumber: function() {
    var val = this._getFullNumber().trim(),
      countryCode = (this.options.nationalMode) ? this.selectedCountryData.iso2 : "";
    return (window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null);
  },


  // update the selected flag, and update the input val accordingly
  setCountry: function(countryCode) {
    countryCode = countryCode.toLowerCase();
    // check if already selected
    if (!this.selectedFlagInner.hasClass(countryCode)) {
      this._setFlag(countryCode);
      this._updateDialCode(this.selectedCountryData.dialCode, false);
      this._triggerCountryChange();
    }
  },


  // set the input value and update the flag
  setNumber: function(number) {
    // we must update the flag first, which updates this.selectedCountryData, which is used for formatting the number before displaying it
    var flagChanged = this._updateFlagFromNumber(number);
    this._updateValFromNumber(number);
    if (flagChanged) {
      this._triggerCountryChange();
    }
  },

  // set the placeholder number typ
  setPlaceholderNumberType: function(type) {
      this.options.placeholderNumberType = type;
      this._updatePlaceholder();
  }

};




// using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
// (adapted to allow public functions)
$.fn[pluginName] = function(options) {
  var args = arguments;

  // Is the first parameter an object (options), or was omitted,
  // instantiate a new instance of the plugin.
  if (options === undefined || typeof options === "object") {
    // collect all of the deferred objects for all instances created with this selector
    var deferreds = [];
    this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        var instance = new Plugin(this, options);
        var instanceDeferreds = instance._init();
        // we now have 2 deffereds: 1 for auto country, 1 for utils script
        deferreds.push(instanceDeferreds[0]);
        deferreds.push(instanceDeferreds[1]);
        $.data(this, "plugin_" + pluginName, instance);
      }
    });
    // return the promise from the "master" deferred object that tracks all the others
    return $.when.apply(null, deferreds);
  } else if (typeof options === "string" && options[0] !== "_") {
    // If the first parameter is a string and it doesn't start
    // with an underscore or "contains" the `init`-function,
    // treat this as a call to a public method.

    // Cache the method call to make it possible to return a value
    var returns;

    this.each(function() {
      var instance = $.data(this, "plugin_" + pluginName);

      // Tests that there's already a plugin-instance
      // and checks that the requested public method exists
      if (instance instanceof Plugin && typeof instance[options] === "function") {
        // Call the method of our plugin instance,
        // and pass it the supplied arguments.
        returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
      }

      // Allow instances to be destroyed via the 'destroy' method
      if (options === "destroy") {
        $.data(this, "plugin_" + pluginName, null);
      }
    });

    // If the earlier cached method gives a value back return the value,
    // otherwise return this to preserve chainability.
    return returns !== undefined ? returns : this;
  }
};



/********************
 *  STATIC METHODS
 ********************/


// get the country data object
$.fn[pluginName].getCountryData = function() {
  return allCountries;
};


// load the utils script
// (assumes it has not already loaded - we check this before calling this internally)
// (also assumes that if it is called manually, it will only be once per page)
$.fn[pluginName].loadUtils = function(path) {
  // 2 options:
  // 1) not already started loading (start)
  // 2) already started loading (do nothing - just wait for loading callback to fire, which will trigger handleUtils on all instances, resolving each of their utilsScriptDeferred objects)
  if (!$.fn[pluginName].startedLoadingUtilsScript) {
    // don't do this twice!
    $.fn[pluginName].startedLoadingUtilsScript = true;

    // dont use $.getScript as it prevents caching
    // return the ajax Deferred object, so manual calls can be chained with .then(callback)
    return $.ajax({
      type: 'GET',
      url: path,
      complete: function() {
        // tell all instances that the utils request is complete
        $(".intl-tel-input input").intlTelInput("handleUtils");
      },
      dataType: "script",
      cache: true
    });
  }
  return null;
};


// default options
$.fn[pluginName].defaults = defaults;
