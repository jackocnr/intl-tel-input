var input = document.querySelector("#phone");
window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function(callback) {
    fetch("https://ipapi.co/json")
      .then(function(res) { return res.json(); })
      .then(function(data) { callback(data.country_code); })
      .catch(function() { callback("us"); });
  },
  utilsScript: "../../build/js/utils.js?1680993492797" // just for formatting/placeholders etc
});
