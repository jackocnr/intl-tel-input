;(function ( $, window, document, undefined ) {

    var pluginName = "intlTelInput",
        defaults = {
            placeholder: "e.g. +44 1234567890",
            mobileVal: "+1 "
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
          var pluginContainer = $(this.element);
          var innerContainer = $("<div>", {"class": "intl-number-input"}).appendTo(pluginContainer);
          
          var flagDropdown = $("<div>", {"class": "flag-dropdown f16"}).appendTo(innerContainer);
          var input = $("<input>", {
            type: "tel",
            value: this.options.mobileVal,
            "id": this.options.inputId
          }).appendTo(innerContainer);
          // this cannot be set in the constructor above
          input.attr("placeholder", this.options.placeholder);

          // dropdown contents
          var selectedFlag = $("<div>", {"class": "selected-flag"}).appendTo(flagDropdown);
          $("<div>", {"class": "flag us"}).appendTo(selectedFlag);
          var countryList = $("<ul>", {"class": "country-list hide"}).appendTo(flagDropdown);
          // list: preferred countries, then divider, then all countries
          this.intlNumberInputAppendListItems(preferredCountries, countryList);
          $("<li>", {"class": "divider"}).appendTo(countryList);
          this.intlNumberInputAppendListItems(countries, countryList);

          // update flag on keyup
          var mobileInput = pluginContainer.find("#" + this.options.inputId);
          mobileInput.keyup(function() {
            var inputVal = mobileInput.val().trim();
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
                  if (countryCodes[dialCode]) {
                    // when we get a match, update the selected-flag
                    var countryCode = countryCodes[dialCode][0].toLowerCase();
                    pluginContainer.find(".selected-flag .flag").attr("class", "flag "+countryCode);
                    break;
                  }
                }
              }
            }
          });
          // trigger it now
          mobileInput.keyup();

          // show country dropdown on click
          pluginContainer.find(".selected-flag").click(function(e) {
            // prevent the click-off-to-close listener from firing
            e.stopPropagation();
            pluginContainer.find(".country-list").removeClass("hide");
          });

          // listen for country selection
          pluginContainer.find(".country-list .country").click(function(e) {
            var countryCode = $(e.currentTarget).attr("data-country-code").toLowerCase();
            pluginContainer.find(".selected-flag .flag").attr("class", "flag "+countryCode);
            mobileInput.val("+" + $(e.currentTarget).attr("data-dial-code") + " ");
            pluginContainer.find(".country-list").addClass("hide");
          });

          // click off to close
          $('html').click(function(e) {
            if (!$(e.target).closest('.country-list').length) {
              pluginContainer.find('.country-list').addClass("hide");
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
            $("<span>", {"class": "grey"}).text("+"+c['calling-code']).appendTo(listItem);
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
