var countryData = window.intlTelInputGlobals.getCountryData(),
  input = document.querySelector("#phone");

for (var i = 0; i < countryData.length; i++) {
  var country = countryData[i];
  country.name = country.name.replace(/.+\((.+)\)/,"$1");
}

window.intlTelInput(input, {
  utilsScript: "../../build/js/utils.js?1678446285328" // just for formatting/placeholders etc
});
