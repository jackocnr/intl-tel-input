var countryData = $.fn.intlTelInput.getCountryData();
$.each(countryData, function(i, country) {
  country.name = country.name.replace(/.+\((.+)\)/,"$1");
});
$("#phone").intlTelInput();
