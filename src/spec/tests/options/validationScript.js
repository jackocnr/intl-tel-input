"use strict";

describe("init plugin to test validationScript option", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("by default, it does not inject the script tag", function() {
    input.intlTelInput();
    expect($("body").children().last().is("script")).toBeFalsy();
  });

  it("setting validationScript option does inject the script tag", function() {
    var scriptSrc = "lib/libphonenumber/build/isValidNumber.js";
    input.intlTelInput({
      validationScript: scriptSrc
    });
    var scriptElem = $("body").children().last();
    expect(scriptElem.is("script")).toBeTruthy();
    expect(scriptElem.attr("src")).toEqual(scriptSrc);
  });

});