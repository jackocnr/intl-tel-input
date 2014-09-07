$.get("http://ipinfo.io", function(response) {
  $("#phone").intlTelInput({
    defaultCountry: response.country.toLowerCase(),
    utilsScript: "../../lib/libphonenumber/build/utils.js" // just for formatting/placeholders etc
  });
}, "jsonp");