"use strict";

describe("testing defaultStyling option", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });

  it("setting it to 'inside' adds the appropriate classes", function() {
    input.intlTelInput({
      defaultStyling: "inside"
    });
    expect(input.parent()).toHaveClass("pretty inside");
  });

  it("setting it to 'outside' adds the appropriate classes", function() {
    input.intlTelInput({
      defaultStyling: "outside"
    });
    expect(input.parent()).toHaveClass("pretty outside");
  });

  it("setting it to 'none' adds the appropriate classes", function() {
    input.intlTelInput({
      defaultStyling: "none"
    });
    expect(input.parent()).not.toHaveClass("pretty");
    expect(input.parent()).not.toHaveClass("inside");
    expect(input.parent()).not.toHaveClass("outside");
  });

});