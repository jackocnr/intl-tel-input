/**
 * International Number Input plugin
 */
function initIntlNumberInput(options) {
  if (!options.placeholder) {
    options.placeholder = "e.g. +44 1234567890";
  }
  if (!options.mobileVal) {
    // default to america
    options.mobileVal = "+1 ";
  }

  var pluginContainer = $("#" + options.inputId + "-container");
  var innerContainer = $("<div>", {"class": "intl-number-input"}).appendTo(pluginContainer);
  
  var flagDropdown = $("<div>", {"class": "flag-dropdown f16"}).appendTo(innerContainer);
  var input = $("<input>", {
    type: "tel",
    value: options.mobileVal,
    "id": options.inputId
  }).appendTo(innerContainer);
  // this cannot be set in the constructor above
  input.attr("placeholder", options.placeholder);

  // dropdown contents
  var selectedFlag = $("<div>", {"class": "selected-flag"}).appendTo(flagDropdown);
  $("<div>", {"class": "flag us"}).appendTo(selectedFlag);
  var countryList = $("<ul>", {"class": "country-list hide"}).appendTo(flagDropdown);
  intlNumberInputAppendListItems(preferredCountries, countryList);
  $("<li>", {"class": "divider"}).appendTo(countryList);
  intlNumberInputAppendListItems(countries, countryList);

  /*BFApp.renderPartial(pluginContainer, "intl_number_input", {
    mobileNumber: options.mobileVal,
    placeholder: options.placeholder,
    inputId: options.inputId
  });*/

  var mobileInput = pluginContainer.find("#" + options.inputId);
  // update flag on keyup
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

  // show country dropdown
  pluginContainer.find(".selected-flag").click(function(e) {
    // prevent the click-off-to-close listener from firing
    e.stopPropagation();
    pluginContainer.find(".country-list").removeClass("hide");
  });

  // select country option from dropdown
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
}


// if just intl dial code and no number, then return empty string
function preprocessIntlNumberInput(input) {
  var num = input.val().trim();
  if (num.charAt(0) == "+" && num.length <= 4) {
    num = "";
  }
  input.val(num);
}


function intlNumberInputAppendListItems(countryList, container) {
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