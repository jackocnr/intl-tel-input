// wrap in UMD
(function(factory) {
  // Detect if another instance has already been loaded on this page
  var instanceGlobalKey = 'intlTelInputGlobals';
  for (var ii = 1; window[instanceGlobalKey] !== undefined; ii += 1) {
    instanceGlobalKey = "intlTelInputGlobals" + ii;
  }

  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"), instanceGlobalKey);
  } else if (typeof define === "function" && define.amd) {
    define(["jquery"], function($) {
      factory($, instanceGlobalKey);
    });
  } else factory(jQuery, instanceGlobalKey);
}(function ($, instanceGlobalKey, undefined) {
	"use strict";

