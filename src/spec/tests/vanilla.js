//"use strict";

describe("init vanilla plugin", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
  });

  afterEach(function() {
    input = null;
  });


  // defaultStyling defaults to true
  it("creates a container with the right classes", function() {
    expect(input.parent()).toHaveClass("intl-tel-input pretty");
  });

  // preferredCountries defaults to 2 countries
  it("has the right number of list items", function() {
    var defaultPreferredCountries = 2;
    expect(getListLength()).toEqual(totalCountries + defaultPreferredCountries);
    expect(getPreferredCountriesLength()).toEqual(defaultPreferredCountries);
  });

  it("defaults to the right flag", function() {
    expect(getSelectedFlagElement()).toHaveClass("us");
  });

  // autoHideDialCode defaults to true, which means dont show dial code until focused
  it("doesn't automatically populate the input value on initialisation", function() {
    expect(input.val()).toEqual("");
  });

  it("typing a different dial code updates the selected flag", function() {
    input.val("+44").keyup();
    expect(getSelectedFlagElement()).toHaveClass("gb");
  });



  describe("adding to dom", function() {
  
    beforeEach(function() {
      input.parent().appendTo($("body"));
    });

    afterEach(function() {
      input.parent().remove();
    });
  
    // autoHideDialCode defaults to true
    it("focusing the input adds the default dial code, and blur removes it again", function() {
      expect(input.val()).toEqual("");
      input.focus();
      expect(input.val().trim()).toEqual("+1");
      input.blur();
      expect(input.val()).toEqual("");
    });

  });



  describe("clearing the input", function() {

    beforeEach(function() {
      input.val("").keyup();
    });

    it("defaults to the right flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("us");
    });

  });



  describe("manually selecting another flag", function() {

    beforeEach(function() {
      selectFlag("gb");
    });

    it("updates the selected flag", function() {
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

    it("updates the dial code", function() {
      expect(input.val().trim()).toEqual("+44");
    });

  });

});