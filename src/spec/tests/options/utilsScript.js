"use strict";

describe("utilsScript: init plugin to test utilsScript option", function() {

  beforeEach(function() {
    intlSetup();
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
    // here we must fake that the script has not yet been loaded
    $.fn["intlTelInput"].injectedUtilsScript = false;
    input.intlTelInput({
      utilsScript: "lib/libphonenumber/build/utils.js"
    });
    expect($.ajax).toHaveBeenCalled();
  });

});