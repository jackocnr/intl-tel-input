// get the country data from the plugin
var telInput = $("#phone"),
  countryData = $.fn.intlTelInput.getCountryData(),
  addressDropdown = $("#address-country");

// init plugin
telInput.intlTelInput();

// populate the country dropdown
$.each(countryData.countries, function(i, country) {
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