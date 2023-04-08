var input = document.querySelector("#phone");
window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function(callback) {
    fetch("http://ip-api.com/json")
      .then(function(res) { return res.json(); })
      .then(function(data) { callback(data.countryCode); })
      .catch(function() { callback("us"); });
  },
  utilsScript: "../../build/js/utils.js?1680950450342" // just for formatting/placeholders etc
});
