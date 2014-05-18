"use strict";

describe("testing defaultStyling option", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });

  it("setting it to 'inside' adds the appropriate class", function() {
    input.intlTelInput({
      defaultStyling: "inside"
    });
    expect(getParentElement()).toHaveClass("inside");
  });

  it("setting it to 'outside' adds the appropriate class", function() {
    input.intlTelInput({
      defaultStyling: "outside"
    });
    expect(getParentElement()).toHaveClass("outside");
  });

});