var inputHome = document.querySelector("#home");
var inputMobile = document.querySelector("#mobile");

window.intlTelInput(inputHome, {
  initialCountry: 'gb',
  placeholderNumberType: 'FIXED_LINE',
  utilsScript: "../../build/js/utils.js?1551697588835" // just for formatting/placeholders etc
});
window.intlTelInput(inputMobile, {
  initialCountry: 'gb',
  placeholderNumberType: 'MOBILE',
  utilsScript: "../../build/js/utils.js?1551697588835"
});
