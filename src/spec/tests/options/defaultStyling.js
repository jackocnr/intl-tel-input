"use strict";

describe("init plugin with defaultStyling set to false", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      defaultStyling: false
    });
  });

  afterEach(function() {
    input = null;
  });

  it("doesnt add the pretty class", function() {
    expect(input.parent()).not.toHaveClass("pretty");
  });

});