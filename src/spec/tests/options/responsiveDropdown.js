"use strict";

describe("responsiveDropdown: init plugin to test responsiveDropdown option", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
    // must be in DOM for width to work
    input.appendTo($("body"));
  });

  afterEach(function() {
    getParentElement().remove();
    input.intlTelInput("destroy");
    input = null;
  });

  it("by default, it is full width (no CSS loaded in tests)", function() {
    // by default, this seems to be tiny (384), so hack it here so that responsiveDropdown mode is not automatically enabled
    window.innerWidth = 1024;
    input.intlTelInput();
    expect(getListElement().outerWidth()).toEqual($("body").outerWidth());
  });

  it("when enabled, it is the width of the input", function() {
    // set this to a mobile width
    window.innerWidth = 350;
    input.intlTelInput();
    expect(getListElement().outerWidth()).toEqual(input.outerWidth());
  });

});