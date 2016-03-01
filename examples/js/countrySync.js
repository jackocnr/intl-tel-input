// get the country data from the plugin
var countryData = $.fn.intlTelInput.getCountryData(),
  telInput = $("#phone"),
  addressDropdown = $("#address-country");

// init plugin
telInput.intlTelInput({
  utilsScript: "../../build/js/utils.js" // just for formatting/placeholders etc
});

// populate the country dropdown
$.each(countryData, function(i, country) {
  addressDropdown.append($("<option></option>").attr("value", country.iso2).text(country.name));
});
// set it's initial value
var initialCountry = telInput.intlTelInput("getSelectedCountryData").iso2;
addressDropdown.val(initialCountry);

// listen to the telephone input for changes
telInput.on("countrychange", function(e, countryData) {
  addressDropdown.val(countryData.iso2);
});

// listen to the address dropdown for changes
addressDropdown.change(function() {
  telInput.intlTelInput("setCountry", $(this).val());
});
