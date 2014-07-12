"use strict";

describe("init plugin to test responsiveDropdown option", function() {

  beforeEach(function() {
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
    input.intlTelInput();
    expect(getListElement().outerWidth()).toEqual($("body").outerWidth());
  });

  it("when enabled, it is the width of the input", function() {
    input.intlTelInput({
      responsiveDropdown: true
    });
    expect(getListElement().outerWidth()).toEqual(input.outerWidth());
  });

});