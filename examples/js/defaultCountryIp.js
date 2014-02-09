$.get("http://ipinfo.io", function(response) {
  $("input").intlTelInput({
    defaultCountry: response.country.toLowerCase()
  });
}, "jsonp");