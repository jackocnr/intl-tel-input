// based on jQuery Boilerplate - http://jqueryboilerplate.com/
;(function ( $, window, document, undefined ) {

  var pluginName = "intlTelInput",
    defaults = {
      preferredCountries: ["US", "GB"]
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
      // if empty, set it to the first country's dial code to get started
      if (telInput.val() === "") {
        telInput.val("+" + preferredCountries[0]["calling-code"] + " ");
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
      this.intlNumberInputAppendListItems(preferredCountries, countryList);
      $("<li>", {"class": "divider"}).appendTo(countryList);
      this.intlNumberInputAppendListItems(intlTelInput.countries, countryList);

      var countryListItems = countryList.children(".country");
      // auto select the top one
      countryListItems.first().addClass("active");

      // update flag on keyup
      // (by extracting the dial code from the input value)
      telInput.keyup(function() {
        var inputVal = telInput.val().trim();
        var dialCode = that.getDialCode(inputVal);
        if (dialCode) {
          // if we get a match, update the selected-flag
          var countryCode = intlTelInput.countryCodes[dialCode][0].toLowerCase();
          selectedFlag.find(".flag").attr("class", "flag " + countryCode);
          // and the active list item
          countryListItems.removeClass("active");
          countryListItems.children(".flag." + countryCode).parent().addClass("active");
        }
      });
      // trigger it now
      telInput.keyup();

      // toggle country dropdown on click
      selectedFlag.click(function(e) {
        // prevent the click-off-to-close listener from firing
        e.stopPropagation();
        countryList.toggleClass("hide");
      });

      // listen for country selection
      countryListItems.click(function(e) {
        var listItem = $(e.currentTarget);
        var countryCode = listItem.attr("data-country-code").toLowerCase();
        // update selected flag
        selectedFlag.find(".flag").attr("class", "flag " + countryCode);
        // reset input value to the country's dial code
        telInput.val("+" + listItem.attr("data-dial-code") + " ");
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

    // try and extract a valid international dial code from a full telephone number
    getDialCode: function(inputVal) {
      // only interested in international numbers
      if (inputVal.substring(0, 1) == "+") {
        // strip out non-numeric chars (e.g. spaces, brackets)
        var num = inputVal.replace(/\D/g,'');
        if (!isNaN(parseInt(num, 10))) {
          // grab the first 3 numbers (max length of a dial code is 3)
          var dialCode = ("" + parseInt(num, 10)).substring(0, 3);
          // try first 3 digits, then 2 then 1...
          for (var i = dialCode.length; i > 0; i--) {
            dialCode = dialCode.substring(0, i);
            // if we find a match (a valid dial code), then return the dial code
            if (intlTelInput.countryCodes[dialCode]) {
              return dialCode;
            }
          }
        }
      }
      return false;
    },

    // add a country <li> to the given <ul>
    intlNumberInputAppendListItems: function(countryList, container) {
      // for each country
      $.each(countryList, function(i, c) {
        // create the list item
        var listItem = $("<li>", {
          "class": "country",
          "data-dial-code": c['calling-code'],
          "data-country-code": c.cca2
        }).appendTo(container);

        // add the flag
        $("<div>", {
          "class": "flag " + c.cca2.toLowerCase()
        }).appendTo(listItem);
        // and the country name and dial code
        $("<span>", {"class": "country-name"}).text(c.name).appendTo(listItem);
        $("<span>", {"class": "dial-code"}).text("+" + c['calling-code']).appendTo(listItem);
      });
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
