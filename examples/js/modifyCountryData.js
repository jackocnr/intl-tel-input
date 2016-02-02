var countryData = $.fn.intlTelInput.getCountryData();
$.each(countryData, function(i, country) {
  country.name = country.name.replace(/.+\((.+)\)/,"$1");
});
$("#phone").intlTelInput({
  utilsScript: "../../build/js/utils.js" // just for formatting/placeholders etc
});
