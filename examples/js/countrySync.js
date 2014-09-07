// get the country data from the plugin
var countryData = $.fn.intlTelInput.getCountryData(),
  telInput = $("#phone"),
  addressDropdown = $("#address-country");

// init plugin
telInput.intlTelInput({
  utilsScript: "../../lib/libphonenumber/build/utils.js" // just for formatting/placeholders etc
});

// populate the country dropdown
$.each(countryData, function(i, country) {
  addressDropdown.append($("<option></option>").attr("value", country.iso2).text(country.name));
});

// listen to the telephone input for changes
telInput.change(function() {
  var countryCode = telInput.intlTelInput("getSelectedCountryData").iso2;
  addressDropdown.val(countryCode);
});

// trigger a fake "change" event now, to trigger an initial sync
telInput.change();

// listen to the address dropdown for changes
addressDropdown.change(function() {
  var countryCode = $(this).val();
  telInput.intlTelInput("selectCountry", countryCode);
});
