;(function ( $, window, document, undefined ) {

  var pluginName = "intlTelInput",
    defaults = {
      preferredCountries: ["US", "GB"],
      americaMode: true
    };

  function Plugin( element, options ) {
    this.element = element;

    this.options = $.extend( {}, defaults, options );

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
      telInput.wrap($("<div>", {"class": "intl-number-input"}));
      var flagsContainer = $("<div>", {"class": "flag-dropdown f16"}).insertBefore(telInput);

      // currently selected flag (displayed to left of input)
      var selectedFlag = $("<div>", {"class": "selected-flag"}).appendTo(flagsContainer);
      // here we default to the first country in the list
      var firstCountry = preferredCountries[0].cca2.toLowerCase();
      $("<div>", {"class": "flag " + firstCountry}).appendTo(selectedFlag);

      // country list contains: preferred countries, then divider, then all countries
      var countryList = $("<ul>", {"class": "country-list hide"}).appendTo(flagsContainer);
      this.appendListItems(preferredCountries, countryList);
      $("<li>", {"class": "divider"}).appendTo(countryList);
      this.appendListItems(intlTelInput.countries, countryList);

      var countryListItems = countryList.children(".country");
      // auto select the top one
      countryListItems.first().addClass("active");

      // update flag on keyup
      // (by extracting the dial code from the input value)
      telInput.keyup(function() {
        var dialCode = that.getDialCode(telInput.val());
        // default to US dialcode
        if (!dialCode) {
          dialCode = "1";
        }
        // if we get a match, update the selected-flag
        var countryCode = intlTelInput.countryCodes[dialCode][0].toLowerCase();
        selectedFlag.find(".flag").attr("class", "flag " + countryCode);
        // and the active list item
        countryListItems.removeClass("active");
        countryListItems.children(".flag." + countryCode).parent().addClass("active");
      });
      // trigger it now in case there is already a number in the input
      telInput.keyup();

      // toggle country dropdown on click
      selectedFlag.click(function(e) {
        // prevent the click-off-to-close listener from firing
        e.stopPropagation();
        // toggle dropdown
        countryList.toggleClass("hide");

        // scroll to active list item
        var activeListItem = countryList.children(".active");
        that.scrollTo(activeListItem, countryList);
      });

      // listen for country selection
      countryListItems.click(function(e) {
        var listItem = $(e.currentTarget);
        var countryCode = listItem.attr("data-country-code").toLowerCase();
        // update selected flag
        selectedFlag.find(".flag").attr("class", "flag " + countryCode);
        // update input value
        var newNumber = that.updateNumber(telInput.val(), listItem.attr("data-dial-code"));
        telInput.val(newNumber);
        // hide dropdown again
        countryList.addClass("hide");
        // focus the input
        telInput.focus();
        // mark the list item as active (incase they open the dropdown again)
        countryListItems.removeClass("active");
        listItem.addClass("active");
      });

      // click off to close
      $('html').click(function(e) {
        if (!$(e.target).closest('.country-list').length) {
          countryList.addClass("hide");
        }
      });
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
        // and grab the first 3 numbers (max length of a dial code is 3)
        var dialCode = firstPart.replace(/\D/g,'').substring(0, 3);
        // try first 3 digits, then 2 then 1...
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
        tmp += "<li class='country' data-dial-code='"+c['calling-code']+"' data-country-code='"+c.cca2+"'>";
        // add the flag
        tmp += "<div class='flag " + c.cca2.toLowerCase()+"'></div>";
        // and the country name and dial code
        tmp += "<span class='country-name'>"+c.name+"</span>";
        tmp += "<span class='dial-code'>+" + c['calling-code']+"</span>";
        // close the list item
        tmp += "</li>";
      });
      container.append(tmp);
    }
  };

  $.fn[pluginName] = function ( options ) {
      return this.each(function () {
          if (!$.data(this, "plugin_" + pluginName)) {
              $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
          }
      });
  };

})( jQuery, window, document );
