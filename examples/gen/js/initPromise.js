var input = document.querySelector("#phone");
var statusElement = document.querySelector("#status");

var iti = window.intlTelInput(input, {
  utilsScript: "../../build/js/utils.js?1549319283378",
});
iti.promise.then(function() {
  statusElement.innerHTML = "Initialised!";
});
