"use strict";

describe("multiple instances: init plugin (with nationalMode=false) to test multiple instances", function() {

  var input2,
    iti2,
    afghanistanIso2Code = "af",
    albaniaIso2Code = "al",
    chinaIso2Code = "cn",
    chinaDialCode = "+86",
    koreaIso2Code = 'kr',
    russiaIso2Code = 'ru';

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    input2 = $("<input>").wrap("div");

    iti = window.intlTelInput(input[0], {
      onlyCountries: [afghanistanIso2Code, chinaIso2Code],
      nationalMode: false,
    });
    iti2 = window.intlTelInput(input2[0], {
      onlyCountries: [albaniaIso2Code, chinaIso2Code, koreaIso2Code, russiaIso2Code],
      nationalMode: false,
    });
    $("body").append(getParentElement(input)).append(getParentElement(input2));
  });

  afterEach(function() {
    intlTeardown();
    iti2.destroy();
    input2.remove();
    input2 = iti2 = null;
  });

  it("instances have different country lists", function() {
    expect(getListLength()).toEqual(2);
    expect(getListLength(input2)).toEqual(4);
  });

  it("instances have different default countries selected", function() {
    expect(getSelectedFlagElement()).toHaveClass(`iti__${afghanistanIso2Code}`);
    expect(getSelectedFlagElement(input2)).toHaveClass(`iti__${albaniaIso2Code}`);
  });

  it("selecting an item from the first input dropdown only updates the flag on that input", function() {
    selectFlag(chinaIso2Code);
    expect(getSelectedFlagElement()).toHaveClass(`iti__${chinaIso2Code}`);
    expect(getSelectedFlagElement(input2)).toHaveClass(`iti__${albaniaIso2Code}`);
  });

  it("updating the number on the first input only updates the flag on that input", function() {
    input.val(chinaDialCode + " 123456");
    triggerKeyOnInput(" ");
    expect(getSelectedFlagElement()).toHaveClass(`iti__${chinaIso2Code}`);
    expect(getSelectedFlagElement(input2)).toHaveClass(`iti__${albaniaIso2Code}`);
  });



  describe("clicking open dropdown on the first input", function() {

    beforeEach(function() {
      getSelectedFlagContainer()[0].click();
    });

    it("only opens the dropdown on that input", function() {
      expect(getListElement()).toBeVisible();
      expect(getListElement(input2)).not.toBeVisible();
    });

    it("then clicking open dropdown on the second will close the first and open the second", function() {
      getSelectedFlagContainer(input2)[0].click();
      expect(getListElement()).not.toBeVisible();
      expect(getListElement(input2)).toBeVisible();
    });

  });

});
