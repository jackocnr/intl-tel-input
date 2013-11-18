(function($, window, document, undefined) {

  var pluginName = "intlTelInput",
    id = 1, // give each instance it's own id for namespaced event handling
    defaults = {
      preferredCountries: ["us", "gb"], // united states and united kingdom
      initialDialCode: true,
      americaMode: false,
      onlyCountries: [],
      defaultStyling: true
    };

  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this.id = id++;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {

    init: function() {
      var that = this;

      // process onlyCountries array and update intlData.countries
      // and intlData.countryCodes accordingly
      if (this.options.onlyCountries.length > 0) {
        var newCountries = [],
          newCountryCodes = {};
        $.each(this.options.onlyCountries, function(i, countryCode) {
          var countryData = that._getCountryData(countryCode);
          if (countryData) {
            newCountries.push(countryData);

            var callingCode = countryData["calling-code"];
            if (newCountryCodes[callingCode]) {
              newCountryCodes[callingCode].push(countryCode);
            } else {
              newCountryCodes[callingCode] = [countryCode];
            }
          }
        });

        // update the global data object
        intlData.countries = newCountries;
        intlData.countryCodes = newCountryCodes;
      }

      // process preferred countries - iterate through the preferences,
      // finding the relevant data from the provided intlData.countries array
      var preferredCountries = [];
      $.each(this.options.preferredCountries, function(i, countryCode) {
        var countryData = that._getCountryData(countryCode);
        if (countryData) {
          preferredCountries.push(countryData);
        }
      });
      this.defaultCountry = (preferredCountries.length) ? preferredCountries[0] : intlData.countries[0];

      // telephone input
      this.telInput = $(this.element);

      // if initialDialCode is enabled (and input is not pre-populated), insert the default dial code
      // update: also check that the default country is not america, or if it is, that americaMode is false
      if (this.options.initialDialCode && this.telInput.val() === "" && (this.defaultCountry.cca2 != "us" || !this.options.americaMode)) {
        this.telInput.val("+" + this.defaultCountry["calling-code"] + " ");
      }

      // containers (mostly for positioning)
      var mainClass = "intl-tel-input";
      if (this.options.defaultStyling) {
        mainClass += " pretty";
      }
      this.telInput.wrap($("<div>", {
        "class": mainClass
      }));
      var flagsContainer = $("<div>", {
        "class": "flag-dropdown f16"
      }).insertBefore(this.telInput);

      // currently selected flag (displayed to left of input)
      var selectedFlag = $("<div>", {
        "class": "selected-flag"
      }).appendTo(flagsContainer);
      // here we default to the first country in the list
      var firstCountry = this.defaultCountry.cca2;
      this.selectedFlagInner = $("<div>", {
        "class": "flag " + firstCountry
      }).appendTo(selectedFlag);
      // CSS triangle
      $("<div>", {
        "class": "down-arrow"
      }).appendTo(this.selectedFlagInner);

      // country list contains: preferred countries, then divider, then all countries
      this.countryList = $("<ul>", {
        "class": "country-list hide"
      }).appendTo(flagsContainer);
      if (preferredCountries.length) {
        this._appendListItems(preferredCountries, "preferred");
        $("<li>", {
          "class": "divider"
        }).appendTo(this.countryList);
      }
      this._appendListItems(intlData.countries, "");

      this.countryListItems = this.countryList.children(".country");
      // auto select the top one
      this.countryListItems.first().addClass("active");



      // update flag on keyup
      // (by extracting the dial code from the input value)
      this.telInput.keyup(function() {
        var countryCode, alreadySelected = false;
        // try and extract valid dial code from input
        var dialCode = that._getDialCode(that.telInput.val());
        if (dialCode) {
          // check if one of the matching country's is already selected
          var countryCodes = intlData.countryCodes[dialCode];
          $.each(countryCodes, function(i, c) {
            if (that.selectedFlagInner.hasClass(c)) {
              alreadySelected = true;
            }
          });
          countryCode = countryCodes[0];
        }
        // else default to dialcode of the first preferred country
        else {
          countryCode = that.defaultCountry.cca2;
        }

        if (!alreadySelected) {
          that._selectFlag(countryCode);
        }
      });
      // trigger it now in case there is already a number in the input
      this.telInput.keyup();



      // toggle country dropdown on click
      selectedFlag.click(function(e) {

        // toggle dropdown
        if (that.countryList.hasClass("hide")) {
          // update highlighting and scroll to active list item
          that.countryListItems.removeClass("highlight");
          var activeListItem = that.countryList.children(".active").addClass("highlight");

          // show it
          that.countryList.removeClass("hide");
          that._scrollTo(activeListItem);

          // click off to close
          // (except when this initial opening click is bubbling up)
          var isOpening = true;
          $('html').bind("click.intlTelInput" + that.id, function(e) {
            if (!isOpening) {
              that._closeDropdown();
            }
            isOpening = false;
          });

          // listen for typing
          $(document).bind("keydown.intlTelInput" + that.id, function(e) {
            // up (38) and down (40) to navigate
            if (e.which == 38 || e.which == 40) {
              var current = that.countryList.children(".highlight").first();
              var next = (e.which == 38) ? current.prev() : current.next();
              if (next) {
                // skip the divider
                if (next.hasClass("divider")) {
                  next = (e.which == 38) ? next.prev() : next.next();
                }
                that.countryListItems.removeClass("highlight");
                next.addClass("highlight");
                that._scrollTo(next);
              }
            }
            // enter (13) to select
            else if (e.which == 13) {
              var currentCountry = that.countryList.children(".highlight").first();
              if (currentCountry.length) {
                that._selectListItem(currentCountry);
              }
            }
            // tab (9) or esc (27) to close
            else if (e.which == 9 || e.which == 27) {
              that._closeDropdown();
            }
            // lower case (97-122) or upper case (65-90) letters
            // to cycle through countries beginning with that letter
            else if ((e.which >= 97 && e.which <= 122) || (e.which >= 65 && e.which <= 90)) {
              var letter = String.fromCharCode(e.which);
              // filter out the countries beginning with that letter
              var countries = that.countryListItems.filter(function() {
                return ($(this).text().charAt(0) == letter && !$(this).hasClass("preferred"));
              });

              if (countries.length) {
                // if one is already highlighted, then we want the next one
                var highlightedCountry = countries.filter(".highlight").first();
                var listItem;
                // if the next country in the list also starts with that letter
                if (highlightedCountry && highlightedCountry.next() && highlightedCountry.next().text().charAt(0) == letter) {
                  listItem = highlightedCountry.next();
                } else {
                  listItem = countries.first();
                }
                // update highlighting and scroll
                that.countryListItems.removeClass("highlight");
                listItem.addClass("highlight");
                that._scrollTo(listItem);
              }
            }
          });
        }
      });



      // when mouse over a list item, remove any highlighting from any other items
      this.countryListItems.mouseover(function() {
        that.countryListItems.removeClass("highlight");
        $(this).addClass("highlight");
      });



      // listen for country selection
      this.countryListItems.click(function(e) {
        var listItem = $(e.currentTarget);
        that._selectListItem(listItem);
      });

    }, // end of init()




    /********************
     *  PRIVATE METHODS
     ********************/


    // find the country data for the given country code
    _getCountryData: function(countryCode) {
      for (var i = 0; i < intlData.countries.length; i++) {
        if (intlData.countries[i].cca2 == countryCode) {
          return intlData.countries[i];
        }
      }
    },


    // update the selected flag and the active list item
    _selectFlag: function(countryCode) {
      this.selectedFlagInner.attr("class", "flag " + countryCode);
      // and the active list item
      this.countryListItems.removeClass("active");
      var listItem = this.countryListItems.children(".flag." + countryCode).parent();
      listItem.addClass("active");
      return listItem;
    },


    // called when the user selects a list item from the dropdown
    _selectListItem: function(listItem) {
      var countryCode = listItem.attr("data-country-code");
      // update selected flag
      this.selectedFlagInner.attr("class", "flag " + countryCode);
      // update input value
      var newNumber = this._updateNumber(this.telInput.val(), listItem.attr("data-dial-code"));
      this.telInput.val(newNumber);
      // focus the input
      this.telInput.focus();
      // mark the list item as active (incase they open the dropdown again)
      this.countryListItems.removeClass("active highlight");
      listItem.addClass("active");
    },


    // close the dropdown and unbind any listeners
    _closeDropdown: function() {
      this.countryList.addClass("hide");
      $(document).unbind("keydown.intlTelInput" + this.id);
      $('html').unbind("click.intlTelInput" + this.id);
    },


    // check if an element is visible within it's container, else scroll until it is
    _scrollTo: function(element) {
      var container = this.countryList;

      var containerHeight = container.height();
      var containerTop = container.offset().top;
      var containerBottom = containerTop + containerHeight;

      var elementHeight = element.outerHeight();
      var elementTop = element.offset().top;
      var elementBottom = elementTop + elementHeight;

      var newScrollTop = elementTop - containerTop + container.scrollTop();

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
    _updateNumber: function(inputVal, dialCode) {
      var prevDialCode = "+" + this._getDialCode(inputVal);
      var newDialCode = "+" + dialCode;
      var newNumber;

      // if the previous number contained a valid dial code, replace it
      // (if more than just a plus character)
      if (prevDialCode.length > 1) {
        newNumber = inputVal.replace(prevDialCode, newDialCode);
        // if the old number was just the dial code,
        // then we will need to add the space again
        if (inputVal == prevDialCode) {
          newNumber += " ";
        }
      } else if (inputVal.length && inputVal.substr(0, 1) != "+") {
        // previous number didn't contain a dial code, so persist it
        newNumber = newDialCode + " " + inputVal.trim();
      } else {
        // previous number contained an invalid dial code, so wipe it
        newNumber = newDialCode + " ";
      }

      // if americaMode is enabled, we dont display the dial code for american numbers
      if (this.options.americaMode && newNumber.substring(0, 3) == "+1 ") {
        newNumber = newNumber.substring(3);
      }
      return newNumber;
    },


    // try and extract a valid international dial code from a full telephone number
    _getDialCode: function(inputVal) {
      var firstPart = inputVal.trim().split(" ")[0];
      // only interested in international numbers (starting with a plus)
      if (firstPart.substring(0, 1) == "+") {
        // strip out non-numeric chars (e.g. pluses, spaces, brackets)
        // and grab the first 4 numbers (max length of a dial code is 4)
        var dialCode = firstPart.replace(/\D/g, '').substring(0, 4);
        // try first 4 digits, then 3, then 2, then 1...
        for (var i = dialCode.length; i > 0; i--) {
          dialCode = dialCode.substring(0, i);
          // if we find a match (a valid dial code), then return the dial code
          if (intlData.countryCodes[dialCode]) {
            return dialCode;
          }
        }
      }
      return "";
    },


    // add a country <li> to the countryList <ul> container
    _appendListItems: function(countries, className) {
      // we create so many DOM elements, I decided it was faster to build a temp string
      // and then add everything to the DOM in one go at the end
      var tmp = "";
      // for each country
      $.each(countries, function(i, c) {
        // open the list item
        tmp += "<li class='country " + className + "' data-dial-code='" + c['calling-code'] + "' data-country-code='" + c.cca2 + "'>";
        // add the flag
        tmp += "<div class='flag " + c.cca2 + "'></div>";
        // and the country name and dial code
        tmp += "<span class='country-name'>" + c.name + "</span>";
        tmp += "<span class='dial-code'>+" + c['calling-code'] + "</span>";
        // close the list item
        tmp += "</li>";
      });
      this.countryList.append(tmp);
    },




    /********************
     *  PUBLIC METHODS
     ********************/


    // update the selected flag, and insert the dial code
    selectCountry: function(countryCode) {
      // check if already selected
      if (!this.selectedFlagInner.hasClass(countryCode)) {
        var listItem = this._selectFlag(countryCode);
        var dialCode = listItem.attr("data-dial-code");
        this.telInput.val("+" + dialCode + " ");
      }
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
    }

    // If the first parameter is a string and it doesn't start
    // with an underscore or "contains" the `init`-function,
    // treat this as a call to a public method.
    else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
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
    return intlData;
  };


  // set the country data object
  $.fn[pluginName].setCountryData = function(obj) {
    intlData = obj;
  };

})(jQuery, window, document);