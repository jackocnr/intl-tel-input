;(function ( $, window, document, undefined ) {

  var pluginName = "intlTelInput",
    defaults = {
      // TODO: add some defaults here
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
      // telephone input
      var telInput = $(this.element);

      // containers
      telInput.wrap($("<div>", {"class": "intl-number-input"}));
      var flagsContainer = $("<div>", {"class": "flag-dropdown f16"}).insertBefore(telInput);

      // currently selected flag
      var selectedFlag = $("<div>", {"class": "selected-flag"}).appendTo(flagsContainer);
      $("<div>", {"class": "flag us"}).appendTo(selectedFlag);

      // country list contains: preferred countries, then divider, then all countries
      var countryList = $("<ul>", {"class": "country-list hide"}).appendTo(flagsContainer);
      this.intlNumberInputAppendListItems(intlTelInput.preferredCountries, countryList);
      $("<li>", {"class": "divider"}).appendTo(countryList);
      this.intlNumberInputAppendListItems(intlTelInput.countries, countryList);

      // update flag on keyup
      telInput.keyup(function() {
        var inputVal = telInput.val().trim();
        // only interested in international numbers
        if (inputVal.substring(0, 1) == "+") {
          // strip out non-numeric chars
          var num = inputVal.replace(/\D/g,'');
          if (!isNaN(parseInt(num, 10))) {
            // make it a string again, to run substring
            var dialCode = ("" + parseInt(num, 10)).substring(0, 3);
            // try first 3 digits, then 2 then 1
            for (var i = dialCode.length; i > 0; i--) {
              dialCode = dialCode.substring(0, i);
              if (intlTelInput.countryCodes[dialCode]) {
                // when we get a match, update the selected-flag
                var countryCode = intlTelInput.countryCodes[dialCode][0].toLowerCase();
                selectedFlag.find(".flag").attr("class", "flag "+countryCode);
                break;
              }
            }
          }
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
      countryList.find(".country").click(function(e) {
        var countryCode = $(e.currentTarget).attr("data-country-code").toLowerCase();
        selectedFlag.find(".flag").attr("class", "flag "+countryCode);
        telInput.val("+" + $(e.currentTarget).attr("data-dial-code") + " ");
        countryList.addClass("hide");
      });

      // click off to close
      $('html').click(function(e) {
        if (!$(e.target).closest('.country-list').length) {
          countryList.addClass("hide");
        }
      });
    },

    // add a country <li> to the given <ul>
    intlNumberInputAppendListItems: function(countryList, container) {
      $.each(countryList, function(i, c) {
        var listItem = $("<li>", {
          "class": "country",
          "data-dial-code": c['calling-code'],
          "data-country-code": c.cca2
        }).appendTo(container);

        $("<div>", {
          "class": "flag "+c.cca2.toLowerCase()
        }).appendTo(listItem);

        $("<span>", {"class": "country-name"}).text(c.name).appendTo(listItem);
        $("<span>", {"class": "dial-code"}).text("+"+c['calling-code']).appendTo(listItem);
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
