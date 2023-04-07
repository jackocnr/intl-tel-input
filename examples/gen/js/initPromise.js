var input = document.querySelector("#phone");
var statusElement = document.querySelector("#status");

var iti = window.intlTelInput(input, {
  utilsScript: "../../build/js/utils.js?1680898893466",
});
iti.promise.then(function() {
  statusElement.innerHTML = "Initialised!";
});
