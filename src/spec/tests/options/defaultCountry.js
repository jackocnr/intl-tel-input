"use strict";

describe("init plugin with a default country", function() {

  var defaultCountry = "gb";

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      defaultCountry: defaultCountry
    });
  });

  afterEach(function() {
    input = null;
  });

  it("defaults to that country", function() {
    expect(getSelectedFlagElement()).toHaveClass(defaultCountry);
  });

});