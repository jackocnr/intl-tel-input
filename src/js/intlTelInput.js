
  var pluginName = "intlTelInput",
    id = 1, // give each instance it's own id for namespaced event handling
    defaults = {
      // don't insert international dial codes
      nationalMode: false,
      // if there is just a dial code in the input: remove it on blur, and re-add it on focus
      autoHideDialCode: true,
      // default country
      defaultCountry: "",
      // character to appear between dial code and phone number
      dialCodeDelimiter: " ",
      // position the selected flag inside or outside of the input
      defaultStyling: "inside",
      // display only these countries
      onlyCountries: [],
      // the countries at the top of the list. defaults to united states and united kingdom
      preferredCountries: ["us", "gb"],
      // specify the path to the libphonenumber script to enable validation
      validationScript: ""
    },
    keys = {
      UP: 38,
      DOWN: 40,
      ENTER: 13,
      ESC: 27,
      PLUS: 43,
      A: 65,
      Z: 90
    },
    windowLoaded = false;

  // keep track of if the window.load event has fired as impossible to check after the fact
  $(window).load(function() {
    windowLoaded = true;
  });

  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;

    // event namespace
    this.ns = "." + pluginName + (id++);

    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {

    init: function() {
      // process all the data: onlyCounties, preferredCountries, defaultCountry etc
      this._processCountryData();

      // generate the markup
      this._generateMarkup();

      // set the initial state of the input value and the selected flag
      this._setInitialState();

      // start all of the event listeners: autoHideDialCode, input keyup, selectedFlag click
      this._initListeners();
    },



    /********************
     *  PRIVATE METHODS
     ********************/


     // prepare all of the country data, including onlyCountries, preferredCountries and
     // defaultCountry options
    _processCountryData: function() {
      // set the instances country data objects
      this._setInstanceCountryData();

      // set the preferredCountries property
      this._setPreferredCountries();
    },


    // process onlyCountries array if present
    _setInstanceCountryData: function() {
      var that = this;

      if (this.options.onlyCountries.length) {
        var newCountries = [],
          newCountryCodes = {};
        $.each(this.options.onlyCountries, function(i, countryCode) {
          var countryData = that._getCountryData(countryCode, true);
          if (countryData) {
            newCountries.push(countryData);
            // add this country's dial code to the countryCodes
            var dialCode = countryData.dialCode;
            if (newCountryCodes[dialCode]) {
              newCountryCodes[dialCode].push(countryCode);
            } else {
              newCountryCodes[dialCode] = [countryCode];
            }
          }
        });
        
        // maintain country priority
        for (var dialCode in newCountryCodes) {
          if (newCountryCodes[dialCode].length > 1) {
            var sortedCountries = [];
            // go through all of the allCountryCodes countries for this dialCode and create a new (ordered) array of values (if they're in the newCountryCodes array)
            for (var i = 0; i < allCountryCodes[dialCode].length; i++) {
              var country = allCountryCodes[dialCode][i];
              if ($.inArray(newCountryCodes[dialCode], country)) {
                sortedCountries.push(country);
              }
            }
            newCountryCodes[dialCode] = sortedCountries;
          }
        }

        this.countries = newCountries;
        this.countryCodes = newCountryCodes;
      } else {
        this.countries = allCountries;
        this.countryCodes = allCountryCodes;
      }
    },


    // process preferred countries - iterate through the preferences,
    // fetching the country data for each one
    _setPreferredCountries: function() {
      var that = this;
      this.preferredCountries = [];
      $.each(this.options.preferredCountries, function(i, countryCode) {
        var countryData = that._getCountryData(countryCode, false);
        if (countryData) {
          that.preferredCountries.push(countryData);
        }
      });
    },


    // generate all of the markup for the plugin: the selected flag overlay, and the dropdown
    _generateMarkup: function() {
      // telephone input
      this.telInput = $(this.element);

      // containers (mostly for positioning)
      var mainClass = "intl-tel-input";
      if (this.options.defaultStyling) {
        mainClass += " " + this.options.defaultStyling;
      }
      this.telInput.wrap($("<div>", {
        "class": mainClass
      }));
      var flagsContainer = $("<div>", {
        "class": "flag-dropdown"
      }).insertAfter(this.telInput);

      // currently selected flag (displayed to left of input)
      var selectedFlag = $("<div>", {
        "class": "selected-flag"
      }).appendTo(flagsContainer);
      this.selectedFlagInner = $("<div>", {
        "class": "flag"
      }).appendTo(selectedFlag);
      // CSS triangle
      $("<div>", {
        "class": "arrow"
      }).appendTo(this.selectedFlagInner);

      // country list contains: preferred countries, then divider, then all countries
      this.countryList = $("<ul>", {
        "class": "country-list v-hide"
      }).appendTo(flagsContainer);
      if (this.preferredCountries.length) {
        this._appendListItems(this.preferredCountries, "preferred");
        $("<li>", {
          "class": "divider"
        }).appendTo(this.countryList);
      }
      this._appendListItems(this.countries, "");

      // now we can grab the dropdown height, and hide it properly
      this.dropdownHeight = this.countryList.outerHeight();
      this.countryList.removeClass("v-hide").addClass("hide");

      // this is useful in lots of places
      this.countryListItems = this.countryList.children(".country");
    },


    // add a country <li> to the countryList <ul> container
    _appendListItems: function(countries, className) {
      // we create so many DOM elements, I decided it was faster to build a temp string
      // and then add everything to the DOM in one go at the end
      var tmp = "";
      // for each country
      $.each(countries, function(i, c) {
        // open the list item
        tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
        // add the flag
        tmp += "<div class='flag " + c.iso2 + "'></div>";
        // and the country name and dial code
        tmp += "<span class='country-name'>" + c.name + "</span>";
        tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
        // close the list item
        tmp += "</li>";
      });
      this.countryList.append(tmp);
    },


    // set the initial state of the input value and the selected flag
    _setInitialState: function() {
      var flagIsSet = false;

      // if the input is pre-populated, then just update the selected flag accordingly
      // however, if no valid international dial code was found, flag will not have been set
      if (this.telInput.val()) {
        flagIsSet = this._updateFlagFromInputVal();
      }

      if (!flagIsSet) {
        // flag is not set, so set to the default country
        var defaultCountry;
        // check the defaultCountry option, else fall back to the first in the list
        if (this.options.defaultCountry) {
          defaultCountry = this._getCountryData(this.options.defaultCountry, false);
        } else {
          defaultCountry = (this.preferredCountries.length) ? this.preferredCountries[0] : this.countries[0];
        }
        this._selectFlag(defaultCountry.iso2);

        // if autoHideDialCode is disabled, insert the default dial code
        if (!this.options.autoHideDialCode) {
          this._resetToDialCode(defaultCountry.dialCode);
        }
      }
    },


    // initialise the main event listeners: input keyup, and click selected flag
    _initListeners: function() {
      var that = this;

      // auto hide dial code option (ignore if in national mode)
      if (this.options.autoHideDialCode && !this.options.nationalMode) {
        this._initAutoHideDialCode();
      }

      // update flag on keyup (by extracting the dial code from the input value).
      // use keyup instead of keypress because we want to update on backspace
      // and instead of keydown because the value hasn't updated when that event is fired
      // NOTE: better to have this one listener all the time instead of starting it on focus
      // and stopping it on blur, because then you've got two listeners (focus and blur)
      this.telInput.on("keyup" + this.ns, function() {
        that._updateFlagFromInputVal();
      });

      // toggle country dropdown on click
      var selectedFlag = this.selectedFlagInner.parent();
      selectedFlag.on("click" + this.ns, function(e) {
        // only intercept this event if we're opening the dropdown
        // else let it bubble up to the top ("click-off-to-close" listener)
        // we cannot just stopPropagation as it may be needed to close another instance
        if (that.countryList.hasClass("hide") && !that.telInput.prop("disabled")) {
          that._showDropdown();
        }
      });

      // if the user has specified the path to the validation script
      // inject a new script element for it at the end of the body
      if (this.options.validationScript) {
        var injectValidationScript = function() {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = that.options.validationScript;
          document.body.appendChild(script);
        };
        // if the plugin is being initialised after the window.load event has already been fired
        if (windowLoaded) {
          injectValidationScript();
        } else {
          // wait until the load event so we don't block any other requests e.g. the flags image
          $(window).load(injectValidationScript);
        }
      }
    },


    // on focus: if empty add dial code. on blur: if just dial code, then empty it
    _initAutoHideDialCode: function() {
      var that = this;

      // mousedown decides where the cursor goes, so if we're focusing
      // we must prevent this from happening
      this.telInput.on("mousedown" + this.ns, function(e) {
        if (!that.telInput.is(":focus") && !that.telInput.val()) {
          e.preventDefault();
          // but this also cancels the focus, so we must trigger that manually
          that._focus();
        }
      });

      // on focus: if empty, insert the dial code for the currently selected flag
      this.telInput.on("focus" + this.ns, function() {
        if (!$.trim(that.telInput.val())) {
          var countryData = that.getSelectedCountryData();
          that._resetToDialCode(countryData.dialCode);
          // after auto-inserting a dial code, if the first key they hit is '+' then assume
          // they are entering a new number, so remove the dial code.
          // use keypress instead of keydown because keydown gets triggered for the shift key
          // (required to hit the + key), and instead of keyup because that shows the new '+'
          // before removing the old one
          that.telInput.one("keypress" + that.ns, function(e) {
            if (e.which == keys.PLUS) {
              that.telInput.val("");
            }
          });
        }
      });

      // on blur: if just a dial code then remove it
      this.telInput.on("blur" + this.ns, function() {
        var value = $.trim(that.telInput.val());
        if (value) {
          if ($.trim(that._getDialCode(value) + that.options.dialCodeDelimiter) == value) {
            that.telInput.val("");
          }
        }
        that.telInput.off("keypress" + that.ns);
      });

      // made the decision not to trigger blur() now, because would only 
      // do anything in the case where they manually set the initial value to
      // just a dial code, in which case they probably want it to be displayed.
    },


    // focus input and put the cursor at the end
    _focus: function() {
      this.telInput.focus();

      var input = this.telInput[0];
      // works for Chrome, FF, Safari, IE9+
      if (input.setSelectionRange) {
        var len = this.telInput.val().length;
        input.setSelectionRange(len, len);
      }
    },


    // show the dropdown
    _showDropdown: function() {
      this._setDropdownPosition();

      // update highlighting and scroll to active list item
      var activeListItem = this.countryList.children(".active");
      this._highlightListItem(activeListItem);

      // show it
      this.countryList.removeClass("hide");
      this._scrollTo(activeListItem);

      // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
      this._bindDropdownListeners();

      // update the arrow
      this.selectedFlagInner.children(".arrow").addClass("up");
    },


    // decide where to position dropdown (depends on position within viewport, and scroll)
    _setDropdownPosition: function() {
      var inputTop = this.telInput.offset().top,
        windowTop = $(window).scrollTop(),
        // dropdownFitsBelow = (dropdownBottom < windowBottom)
        dropdownFitsBelow = (inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height()),
        dropdownFitsAbove = (inputTop - this.dropdownHeight > windowTop);

      // dropdownHeight - 1 for border
      var cssTop = (!dropdownFitsBelow && dropdownFitsAbove) ? "-" + (this.dropdownHeight - 1) + "px" : "";
      this.countryList.css("top", cssTop);
    },


    // we only bind dropdown listeners when the dropdown is open
    _bindDropdownListeners: function() {
      var that = this;

      // when mouse over a list item, just highlight that one
      // we add the class "highlight", so if they hit "enter" we know which one to select
      this.countryList.on("mouseover" + this.ns, ".country", function(e) {
        that._highlightListItem($(this));
      });

      // listen for country selection
      this.countryList.on("click" + this.ns, ".country", function(e) {
        that._selectListItem($(this));
      });

      // click off to close
      // (except when this initial opening click is bubbling up)
      // we cannot just stopPropagation as it may be needed to close another instance
      var isOpening = true;
      $('html').on("click" + this.ns, function(e) {
        if (!isOpening) {
          that._closeDropdown();
        }
        isOpening = false;
      });

      // listen for up/down scrolling, enter to select, or letters to jump to country name.
      // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
      // just hit down and hold it to scroll down (no keyup event).
      // listen on the document because that's where key events are triggered if no input has focus
      $(document).on("keydown" + this.ns, function(e) {
        // prevent down key from scrolling the whole page,
        // and enter key from submitting a form etc
        e.preventDefault();

        if (e.which == keys.UP || e.which == keys.DOWN) {
          // up and down to navigate
          that._handleUpDownKey(e.which);
        } else if (e.which == keys.ENTER) {
          // enter to select
          that._handleEnterKey();
        } else if (e.which == keys.ESC) {
          // esc to close
          that._closeDropdown();
        } else if (e.which >= keys.A && e.which <= keys.Z) {
          // upper case letters (note: keyup/keydown only return upper case letters)
          // cycle through countries beginning with that letter
          that._handleLetterKey(e.which);
        }
      });
    },


    // highlight the next/prev item in the list (and ensure it is visible)
    _handleUpDownKey: function(key) {
      var current = this.countryList.children(".highlight").first();
      var next = (key == keys.UP) ? current.prev() : current.next();
      if (next.length) {
        // skip the divider
        if (next.hasClass("divider")) {
          next = (key == keys.UP) ? next.prev() : next.next();
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


    // iterate through the countries starting with the given letter
    _handleLetterKey: function(key) {
      var letter = String.fromCharCode(key);
      // filter out the countries beginning with that letter
      var countries = this.countryListItems.filter(function() {
        return ($(this).text().charAt(0) == letter && !$(this).hasClass("preferred"));
      });

      if (countries.length) {
        // if one is already highlighted, then we want the next one
        var highlightedCountry = countries.filter(".highlight").first(),
          listItem;
        // if the next country in the list also starts with that letter
        if (highlightedCountry && highlightedCountry.next() && highlightedCountry.next().text().charAt(0) == letter) {
          listItem = highlightedCountry.next();
        } else {
          listItem = countries.first();
        }
        // update highlighting and scroll
        this._highlightListItem(listItem);
        this._scrollTo(listItem);
      }
    },


     // update the selected flag using the input's current value
    _updateFlagFromInputVal: function() {
      var that = this;

      // try and extract valid dial code from input
      var dialCode = this._getDialCode(this.telInput.val());
      if (dialCode) {
        // check if one of the matching countries is already selected
        var countryCodes = this.countryCodes[dialCode.replace(/\D/g, '')],
          alreadySelected = false;
        $.each(countryCodes, function(i, c) {
          if (that.selectedFlagInner.hasClass(c)) {
            alreadySelected = true;
          }
        });

        if (!alreadySelected) {
          this._selectFlag(countryCodes[0]);
        }
        // valid international dial code found
        return true;
      }
      // valid international dial code not found
      return false;
    },


    // reset the input value to just a dial code
    _resetToDialCode: function(dialCode) {
      // if nationalMode is enabled then don't insert the dial code
      var value = (this.options.nationalMode) ? "" : "+" + dialCode + this.options.dialCodeDelimiter;
      this.telInput.val(value);
    },


     // remove highlighting from other list items and highlight the given item
    _highlightListItem: function(listItem) {
      this.countryListItems.removeClass("highlight");
      listItem.addClass("highlight");
    },


    // find the country data for the given country code
    // the ignoreOnlyCountriesOption is only used during init() while parsing the onlyCountries array
    _getCountryData: function(countryCode, ignoreOnlyCountriesOption) {
      var countryList = (ignoreOnlyCountriesOption) ? allCountries : this.countries;
      for (var i = 0; i < countryList.length; i++) {
        if (countryList[i].iso2 == countryCode) {
          return countryList[i];
        }
      }
      return null;
    },


    // update the selected flag and the active list item
    _selectFlag: function(countryCode) {
      this.selectedFlagInner.attr("class", "flag " + countryCode);

      // update the title attribute
      var countryData = this._getCountryData(countryCode);
      this.selectedFlagInner.parent().attr("title", countryData.name + ": +" + countryData.dialCode);

      // update the active list item
      var listItem = this.countryListItems.children(".flag." + countryCode).first().parent();
      this.countryListItems.removeClass("active");
      listItem.addClass("active");
    },


    // called when the user selects a list item from the dropdown
    _selectListItem: function(listItem) {
      // update selected flag and active list item
      var countryCode = listItem.attr("data-country-code");
      this._selectFlag(countryCode);
      this._closeDropdown();

      // update input value
      if (!this.options.nationalMode) {
        this._updateNumber("+" + listItem.attr("data-dial-code"));
        this.telInput.trigger("change");
      }

      // focus the input
      this._focus();
    },


    // close the dropdown and unbind any listeners
    _closeDropdown: function() {
      this.countryList.addClass("hide");

      // update the arrow
      this.selectedFlagInner.children(".arrow").removeClass("up");

      // unbind event listeners
      $(document).off("keydown" + this.ns);
      $('html').off("click" + this.ns);
      // unbind both hover and click listeners
      this.countryList.off(this.ns);
    },


    // check if an element is visible within it's container, else scroll until it is
    _scrollTo: function(element) {
      var container = this.countryList,
        containerHeight = container.height(),
        containerTop = container.offset().top,
        containerBottom = containerTop + containerHeight,
        elementHeight = element.outerHeight(),
        elementTop = element.offset().top,
        elementBottom = elementTop + elementHeight,
        newScrollTop = elementTop - containerTop + container.scrollTop();

      if (elementTop < containerTop) {
        // scroll up
        container.scrollTop(newScrollTop);
      } else if (elementBottom > containerBottom) {
        // scroll down
        var heightDifference = containerHeight - elementHeight;
        container.scrollTop(newScrollTop - heightDifference);
      }
    },


    // replace any existing dial code with the new one
    _updateNumber: function(newDialCode) {
      var inputVal = this.telInput.val(),
        prevDialCode = this._getDialCode(inputVal),
        newNumber;

      // if the previous number contained a valid dial code, replace it
      // (if more than just a plus character)
      if (prevDialCode.length > 1) {
        newNumber = inputVal.replace(prevDialCode, newDialCode);
        // if the old number was just the dial code,
        // then we will need to add the space again
        if (inputVal == prevDialCode) {
          newNumber += this.options.dialCodeDelimiter;
        }
      } else {
        // if the previous number didn't contain a dial code, we should persist it
        var existingNumber = (inputVal && inputVal.substr(0, 1) != "+") ? $.trim(inputVal) : "";
        newNumber = newDialCode + this.options.dialCodeDelimiter + existingNumber;
      }

      this.telInput.val(newNumber);
    },


    // try and extract a valid international dial code from a full telephone number
    // Note: returns the raw string inc plus character and any whitespace/dots etc
    _getDialCode: function(inputVal) {
      var dialCode = "";
      inputVal = $.trim(inputVal);
      // only interested in international numbers (starting with a plus)
      if (inputVal.charAt(0) == "+") {
        var numericChars = "";
        // iterate over chars
        for (var i = 0; i < inputVal.length; i++) {
          var c = inputVal.charAt(i);
          // if char is number
          if ($.isNumeric(c)) {
            numericChars += c;
            // if current numericChars make a valid dial code
            if (this.countryCodes[numericChars]) {
              // store the actual raw string (useful for matching later)
              dialCode = inputVal.substring(0, i+1);
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






    /********************
     *  PUBLIC METHODS
     ********************/

    // get the country data for the currently selected flag
    getSelectedCountryData: function() {
      // rely on the fact that we only set 2 classes on the selected flag element:
      // the first is "flag" and the second is the 2-char country code
      var countryCode = this.selectedFlagInner.attr("class").split(" ")[1];
      return this._getCountryData(countryCode);
    },


    // validate the input val - assumes the global function isValidNumber
    // pass in true if you want to allow national numbers (no country dial code)
    isValidNumber: function(allowNational) {
      var val = $.trim(this.telInput.val()),
        countryData = this.getSelectedCountryData(),
        countryCode = (allowNational) ? countryData.iso2 : "";
      return window.isValidNumber(val, countryCode);
    },


    // update the selected flag, and insert the dial code
    selectCountry: function(countryCode) {
      // check if already selected
      if (!this.selectedFlagInner.hasClass(countryCode)) {
        this._selectFlag(countryCode);
        if (!this.options.autoHideDialCode) {
          var countryData = this._getCountryData(countryCode, false);
          this._resetToDialCode(countryData.dialCode);
        }
      }
    },

    // set the input value and update the flag
    setNumber: function(number) {
      this.telInput.val(number);
      this._updateFlagFromInputVal();
    },


    // remove plugin
    destroy: function() {
      // stop listeners
      this.telInput.off(this.ns);
      this.selectedFlagInner.parent().off(this.ns);

      // remove markup
      var container = this.telInput.parent();
      container.before(this.telInput).remove();
    }

  };





  // adapted to allow public functions
  // using https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
  $.fn[pluginName] = function(options) {
    var args = arguments;

    // Is the first parameter an object (options), or was omitted,
    // instantiate a new instance of the plugin.
    if (options === undefined || typeof options === 'object') {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      // If the first parameter is a string and it doesn't start
      // with an underscore or "contains" the `init`-function,
      // treat this as a call to a public method.

      // Cache the method call to make it possible to return a value
      var returns;

      this.each(function() {
        var instance = $.data(this, 'plugin_' + pluginName);

        // Tests that there's already a plugin-instance
        // and checks that the requested public method exists
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          // Call the method of our plugin instance,
          // and pass it the supplied arguments.
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }

        // Allow instances to be destroyed via the 'destroy' method
        if (options === 'destroy') {
          $.data(this, 'plugin_' + pluginName, null);
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


  // set the country data object
  $.fn[pluginName].setCountryData = function(obj) {
    allCountries = obj;
  };


