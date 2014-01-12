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
    $("body").append(input.parent()).append(input2.parent());
  });

  afterEach(function() {
    input.parent().remove();
    input2.parent().remove();
    input = null;
    input2 = null;
  });

  it("instances have different country lists", function() {
    expect(getListLength()).toEqual(2);
    expect(getListLength(input2)).toEqual(3);
  });

  it("instances have different default countries selected", function() {
    expect(getSelectedFlagElement()).toHaveClass("jp");
    expect(getSelectedFlagElement(input2)).toHaveClass("kr");
  });



  describe("updating the number on the first input", function() {
  
    beforeEach(function() {
      input.val(chinaDialCode+" 123456").keyup();
    });

    it("updates the flag only on that input", function() {
      expect(getSelectedFlagElement()).toHaveClass(chinaCountryCode);
      expect(getSelectedFlagElement(input2)).toHaveClass("kr");
    });
  
  });



  describe("clicking open dropdown on the first input", function() {
  
    beforeEach(function() {
      getSelectedFlagContainer().click();
    });

    it("only opens the dropdown on that input", function() {
      expect(getListElement()).not.toHaveClass("hide");
      expect(getListElement(input2)).toHaveClass("hide");
    });

    it("selecting an item from that dropdown only updates that input", function() {
      selectFlag(chinaCountryCode);
      expect(getInputVal()).toEqual(chinaDialCode);
      expect(getInputVal(input2)).toEqual("");
    });

    it("then clicking open dropdown on the second will close the first and open the second", function() {
      getSelectedFlagContainer(input2).click();
      expect(getListElement()).toHaveClass("hide");
      expect(getListElement(input2)).not.toHaveClass("hide");
    });
  
  });

});