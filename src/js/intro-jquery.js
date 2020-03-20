// wrap in UMD
(function(factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"));
  } else if (typeof define === "function" && define.amd) {
    define(["jquery"], function($) {
      factory($);
    });
  } else factory(jQuery);
}(function ($, undefined) {
	"use strict";
