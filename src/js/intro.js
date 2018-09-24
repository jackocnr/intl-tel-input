// wrap in UMD
(function(factory) {
  var intlTelInput = factory(window, document);
  if (typeof module === "object" && module.exports) module.exports = intlTelInput;
  else window.intlTelInput = intlTelInput;
}(function(window, document, undefined) {
  "use strict";

  return (function() {
