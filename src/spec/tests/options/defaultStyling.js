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
    expect(getParentElement()).toHaveClass("pretty inside");
  });

  it("setting it to 'outside' adds the appropriate classes", function() {
    input.intlTelInput({
      defaultStyling: "outside"
    });
    expect(getParentElement()).toHaveClass("pretty outside");
  });

  it("setting it to 'none' adds the appropriate classes", function() {
    input.intlTelInput({
      defaultStyling: "none"
    });
    expect(getParentElement()).not.toHaveClass("pretty");
    expect(getParentElement()).not.toHaveClass("inside");
    expect(getParentElement()).not.toHaveClass("outside");
  });

});