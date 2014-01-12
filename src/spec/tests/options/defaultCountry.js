"use strict";

describe("init plugin with a default country", function() {

  var defaultCountry = "jp";

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


  describe("typing a number with a different dial code", function() {
  
    beforeEach(function() {
      input.val("+44 1234567").keyup();
    });

    it("updates the selected flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

    it("clearing the input again defaults to the right flag", function() {
      input.val("").keyup();
      expect(getSelectedFlagElement()).toHaveClass(defaultCountry);
    });
  
  });

});