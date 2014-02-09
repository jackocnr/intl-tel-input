$.get("http://ipinfo.io", function(response) {
  $("#phone").intlTelInput({
    defaultCountry: response.country.toLowerCase()
  });
}, "jsonp");