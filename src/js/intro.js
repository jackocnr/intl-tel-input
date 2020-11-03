// wrap in UMD
(function(factory) {
  // Detect if another instance has already been loaded on this page
  var instanceGlobalKey = 'intlTelInputGlobals';
  for (var ii = 1; window[instanceGlobalKey] !== undefined; ii += 1) {
    instanceGlobalKey = "intlTelInputGlobals" + ii;
  }

  if (typeof module === "object" && module.exports) {
    module.exports = factory(instanceGlobalKey);
  } else {
    window.intlTelInput = factory(instanceGlobalKey);
  }
}(function(instanceGlobalKey, undefined) {
  "use strict";

  return (function() {
