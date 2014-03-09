"use strict";

describe("init vanilla plugin to test multiple instances", function() {

  var input2, chinaCountryCode = "cn", chinaDialCode = "+86";

  beforeEach(function() {
    input = $("<input>");
    input2 = $("<input>");
    // japan and china
    input.intlTelInput({
      onlyCountries: ['jp', chinaCountryCode]
    });
    // korea, china and russia
    input2.intlTelInput({
      onlyCountries: ['kr', chinaCountryCode, 'ru']
    });
    $("body").append(getParentElement(input)).append(getParentElement(input2));
  });

  afterEach(function() {
    getParentElement(input).remove();
    getParentElement(input2).remove();
    input = input2 = null;
  });

  it("instances have different country lists", function() {
    expect(getListLength()).toEqual(2);
    expect(getListLength(input2)).toEqual(3);
  });

  it("instances have different default countries selected", function() {
    expect(getSelectedFlagElement()).toHaveClass("jp");
    expect(getSelectedFlagElement(input2)).toHaveClass("kr");
  });

  it("selecting an item from the first input dropdown only updates the flag on that input", function() {
    selectFlag(chinaCountryCode);
    expect(getInputVal()).toEqual(chinaDialCode);
    expect(getInputVal(input2)).toEqual("");
  });

  it("updating the number on the first input only updates the flag on that input", function() {
    input.val(chinaDialCode+" 123456").keyup();
    expect(getSelectedFlagElement()).toHaveClass(chinaCountryCode);
    expect(getSelectedFlagElement(input2)).toHaveClass("kr");
  });



  describe("clicking open dropdown on the first input", function() {
  
    beforeEach(function() {
      getSelectedFlagContainer().click();
    });

    it("only opens the dropdown on that input", function() {
      expect(getListElement()).not.toHaveClass("hide");
      expect(getListElement(input2)).toHaveClass("hide");
    });

    it("then clicking open dropdown on the second will close the first and open the second", function() {
      getSelectedFlagContainer(input2).click();
      expect(getListElement()).toHaveClass("hide");
      expect(getListElement(input2)).not.toHaveClass("hide");
    });
  
  });

});