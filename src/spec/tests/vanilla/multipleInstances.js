"use strict";

describe("multiple instances: init vanilla plugin (with nationalMode=false) to test multiple instances", function() {

  var intlTelInput1,
    intlTelInput2,
    afghanistanCountryCode = "af",
    albaniaCountryCode = "al",
    chinaCountryCode = "cn",
    chinaDialCode = "+86";

  beforeEach(function() {
    intlSetup();

    // japan and china
    intlTelInput1 = new IntlTelInput(document.createElement("input"), {
      onlyCountries: [chinaCountryCode, afghanistanCountryCode],
      nationalMode: false
    });

    // korea, china and russia
    intlTelInput2 = new IntlTelInput(document.createElement("input"), {
      onlyCountries: ['kr', chinaCountryCode, 'ru', albaniaCountryCode],
      nationalMode: false
    });

    document.body.appendChild(intlTelInput1.inputElement.parentNode);
    document.body.appendChild(intlTelInput2.inputElement.parentNode);
  });

  afterEach(function() {
    var parent1 = intlTelInput1.inputElement.parentNode;
    var parent2 = intlTelInput2.inputElement.parentNode;

    parent1.parentNode.removeChild(parent1);
    parent2.parentNode.removeChild(parent2);

    intlTelInput1.destroy();
    intlTelInput2.destroy();

    intlTelInput1 = intlTelInput2 = null;
  });

  it("instances have different country lists", function() {
    expect(getListLength(intlTelInput1.inputElement)).toEqual(2);
    expect(getListLength(intlTelInput2.inputElement)).toEqual(4);
  });

  it("instances have different default countries selected", function() {
    expect(getSelectedFlagElement(intlTelInput1.inputElement)).toHaveClass(afghanistanCountryCode);
    expect(getSelectedFlagElement(intlTelInput2.inputElement)).toHaveClass(albaniaCountryCode);
  });

  it("selecting an item from the first input dropdown only updates the flag on that input", function() {
    selectFlag(chinaCountryCode, intlTelInput1.inputElement);

    expect(intlTelInput1.inputElement.value).toEqual(chinaDialCode);
    expect(intlTelInput2.inputElement.value).toEqual("");
  });

  it("updating the number on the first input only updates the flag on that input", function() {
    intlTelInput1.inputElement.value = chinaDialCode + " 123456";

    triggerNativeKeyOnInput(" ", intlTelInput1.inputElement);

    expect(getSelectedFlagElement(intlTelInput1.inputElement)).toHaveClass(chinaCountryCode);
    expect(getSelectedFlagElement(intlTelInput2.inputElement)).toHaveClass(albaniaCountryCode);
  });



  describe("clicking open dropdown on the first input", function() {

    beforeEach(function() {
      dispatchEvent(getSelectedFlagContainer(intlTelInput1.inputElement), "click", true, false);
    });

    it("only opens the dropdown on that input", function() {
      expect(getListElement(intlTelInput1.inputElement)).not.toHaveClass("hide");
      expect(getListElement(intlTelInput2.inputElement)).toHaveClass("hide");
    });

    it("then clicking open dropdown on the second will close the first and open the second", function() {
      dispatchEvent(getSelectedFlagContainer(intlTelInput2.inputElement), "click", true, false);

      expect(getListElement(intlTelInput1.inputElement)).toHaveClass("hide");
      expect(getListElement(intlTelInput2.inputElement)).not.toHaveClass("hide");
    });

  });

});
