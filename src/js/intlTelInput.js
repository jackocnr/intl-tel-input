(function($, window, document, undefined) {

  var pluginName = "intlTelInput",
    defaults = {
      preferredCountries: ["US", "GB"],
      americaMode: true
    };

  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {

    init: function() {
      var that = this;

      // process preferred countries - iterate through the preferences,
      // finding the relevant data from the provided intlTelInput.countries array
      var preferredCountries = [];
      $.each(this.options.preferredCountries, function(i, pc) {
        var result = $.grep(intlTelInput.countries, function(c) {
          return (c.cca2 == pc);
        });
        if (result.length) {
          preferredCountries.push(result[0]);
        }
      });

      // telephone input
      var telInput = $(this.element);

      // if empty, and americaMode is disabled, default the input to the american dial code
      if (telInput.val() === "" && !this.options.americaMode) {
        telInput.val("+1 ");
      }

      // containers (mostly for positioning)
      telInput.wrap($("<div>", {
        "class": "intl-tel-input"
      }));
      var flagsContainer = $("<div>", {
        "class": "flag-dropdown f16"
      }).insertBefore(telInput);

      // currently selected flag (displayed to left of input)
      var selectedFlag = $("<div>", {
        "class": "selected-flag"
      }).appendTo(flagsContainer);
      // here we default to the first country in the list
      var firstCountry = preferredCountries[0].cca2.toLowerCase();
      var selectedFlagInner = $("<div>", {
        "class": "flag " + firstCountry
      }).appendTo(selectedFlag);
      // CSS triangle
      $("<div>", {
        "class": "down-arrow"
      }).appendTo(selectedFlagInner);

      // country list contains: preferred countries, then divider, then all countries
      var countryList = $("<ul>", {
        "class": "country-list hide"
      }).appendTo(flagsContainer);
      this.appendListItems(preferredCountries, countryList);
      $("<li>", {
        "class": "divider"
      }).appendTo(countryList);
      this.appendListItems(intlTelInput.countries, countryList);

      var countryListItems = countryList.children(".country");
      // auto select the top one
      countryListItems.first().addClass("active");



      // update flag on keyup
      // (by extracting the dial code from the input value)
      telInput.keyup(function() {
        // try and extract valid dial code from input, else default to US dialcode
        var dialCode = that.getDialCode(telInput.val()) || "1";
        // check if one of the matching country's is already selected
        var countryCodes = intlTelInput.countryCodes[dialCode];
        var alreadySelected = false;
        $.each(countryCodes, function(i, c) {
          if (selectedFlagInner.hasClass(c.toLowerCase())) {
            alreadySelected = true;
          }
        });
        // otherwise update selection
        if (!alreadySelected) {
          var countryCode = intlTelInput.countryCodes[dialCode][0].toLowerCase();
          selectedFlagInner.attr("class", "flag " + countryCode);
          // and the active list item
          countryListItems.removeClass("active");
          countryListItems.children(".flag." + countryCode).parent().addClass("active");
        }
      });
      // trigger it now in case there is already a number in the input
      telInput.keyup();



      // toggle country dropdown on click
      selectedFlag.click(function(e) {
        // prevent the click-off-to-close listener from firing
        e.stopPropagation();

        // toggle dropdown
        if (countryList.hasClass("hide")) {
          // update highlighting and scroll to active list item
          countryListItems.removeClass("highlight");
          var activeListItem = countryList.children(".active").addClass("highlight");

          // show it
          countryList.removeClass("hide");
          that.scrollTo(activeListItem, countryList);

          // listen for typing
          $(document).bind("keydown.intlTelInput", function(e) {
            // up (38) and down (40) to navigate
            if (e.which == 38 || e.which == 40) {
              var current = countryList.children(".highlight").first();
              var next = (e.which == 38) ? current.prev() : current.next();
              if (next) {
                // skip the divider
                if (next.hasClass("divider")) {
                  next = (e.which == 38) ? next.prev() : next.next();
                }
                countryListItems.removeClass("highlight");
                next.addClass("highlight");
                that.scrollTo(next, countryList);
              }
            }
            // enter (13) to select
            else if (e.which == 13) {
              var currentCountry = countryList.children(".highlight").first();
              if (currentCountry.length) {
                that.selectCountry(currentCountry, selectedFlag, telInput, countryList);
              }
            }
            // tab (9) or esc (27) to close
            else if (e.which == 9 || e.which == 27) {
              that.closeDropdown(countryList);
            }
            // lower case (97-122) or upper case (65-90) letters
            // to cycle through countries beginning with that letter
            else if ((e.which >= 97 && e.which <= 122) || (e.which >= 65 && e.which <= 90)) {
              var letter = String.fromCharCode(e.which);
              // filter out the countries beginning with that letter
              var countries = countryListItems.filter(function() {
                return ($(this).text().charAt(0) == letter);
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
                countryListItems.removeClass("highlight");
                listItem.addClass("highlight");
                that.scrollTo(listItem, countryList);
              }
            }
          });
        } else {
          // close it
          that.closeDropdown(countryList);
        }
      });


      // when mouse over a list item, remove any highlighting from any other items
      countryListItems.mouseover(function() {
        countryListItems.removeClass("highlight");
        $(this).addClass("highlight");
      });



      // listen for country selection
      countryListItems.click(function(e) {
        var listItem = $(e.currentTarget);
        that.selectCountry(listItem, selectedFlag, telInput, countryList);
      });



      // click off to close
      $('html').click(function(e) {
        if (!$(e.target).closest('.country-list').length) {
          // close it
          that.closeDropdown(countryList);
        }
      });
    },



    selectCountry: function(listItem, selectedFlag, telInput, countryList) {
      var countryCode = listItem.attr("data-country-code").toLowerCase();
      // update selected flag
      selectedFlag.find(".flag").attr("class", "flag " + countryCode);
      // update input value
      var newNumber = this.updateNumber(telInput.val(), listItem.attr("data-dial-code"));
      telInput.val(newNumber);
      // hide dropdown again
      this.closeDropdown(countryList);
      // focus the input
      telInput.focus();
      // mark the list item as active (incase they open the dropdown again)
      countryList.children(".country").removeClass("active highlight");
      listItem.addClass("active");
    },



    // close the dropdown and unbind any listeners
    closeDropdown: function(countryList) {
      countryList.addClass("hide");
      $(document).unbind("keydown.intlTelInput");
    },



    // check if an element is visible within it's container, else scroll until it is
    scrollTo: function(element, container) {
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
    updateNumber: function(inputVal, dialCode) {
      var prevDialCode = "+" + this.getDialCode(inputVal);
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
    getDialCode: function(inputVal) {
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
          if (intlTelInput.countryCodes[dialCode]) {
            return dialCode;
          }
        }
      }
      return "";
    },



    // add a country <li> to the given <ul> container
    appendListItems: function(countryList, container) {
      // we create so many DOM elements, I decided it was faster to build a temp string
      // and then add everything to the DOM in one go at the end
      var tmp = "";
      // for each country
      $.each(countryList, function(i, c) {
        // open the list item
        tmp += "<li class='country' data-dial-code='" + c['calling-code'] + "' data-country-code='" + c.cca2 + "'>";
        // add the flag
        tmp += "<div class='flag " + c.cca2.toLowerCase() + "'></div>";
        // and the country name and dial code
        tmp += "<span class='country-name'>" + c.name + "</span>";
        tmp += "<span class='dial-code'>+" + c['calling-code'] + "</span>";
        // close the list item
        tmp += "</li>";
      });
      container.append(tmp);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);