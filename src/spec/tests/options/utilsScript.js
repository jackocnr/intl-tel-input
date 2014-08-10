"use strict";

describe("utilsScript: init plugin to test utilsScript option", function() {

  beforeEach(function() {
    input = $("<input>");
    spyOn($, "ajax");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("by default, it does not load the script", function() {
    input.intlTelInput();
    expect($.ajax).not.toHaveBeenCalled();
  });

  it("setting utilsScript option does load the script", function() {
    var scriptSrc = "lib/libphonenumber/build/utils.js";
    input.intlTelInput({
      utilsScript: scriptSrc
    });
    expect($.ajax).toHaveBeenCalled();
  });

});