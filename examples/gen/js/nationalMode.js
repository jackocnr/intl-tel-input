var input = document.querySelector("#phone"),
  output = document.querySelector("#output");

var iti = window.intlTelInput(input, {
  nationalMode: true,
  utilsScript: "../../build/js/utils.js?1549319283378" // just for formatting/placeholders etc
});

var handleChange = function() {
  var text = (iti.isValidNumber()) ? "International: " + iti.getNumber() : "Please enter a number below";
  var textNode = document.createTextNode(text);
  output.innerHTML = "";
  output.appendChild(textNode);
};

// listen to "keyup", but also "change" to update when the user selects a country
input.addEventListener('change', handleChange);
input.addEventListener('keyup', handleChange);
