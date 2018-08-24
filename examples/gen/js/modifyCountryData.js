var countryData = $.fn.intlTelInput.getCountryData();
$.each(countryData, function(i, country) {
  country.name = country.name.replace(/.+\((.+)\)/,"$1");
});
$("#phone").intlTelInput({
  utilsScript: "../../build/js/utils.js?1535108287294" // just for formatting/placeholders etc
});
