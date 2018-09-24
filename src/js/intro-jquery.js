// wrap in UMD
(function(factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"), window, document);
  } else if (typeof define === "function" && define.amd) {
    define(["jquery"], function($) {
      factory($, window, document);
    });
  } else factory(jQuery, window, document);
}(function ($, window, document, undefined) {
	"use strict";
