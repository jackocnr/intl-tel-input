"use strict";

describe("separateDialCode:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
    input.intlTelInput({
      separateDialCode: true,
      initialCountry: "gb"
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("sets the classes properly", function() {
    expect(getParentElement()).toHaveClass("separate-dial-code iti-sdc-3");
  });

  it("displays the dial code next to the selected flag", function() {
    expect(getSelectedFlagContainer().find(".selected-dial-code").text()).toEqual("+44");
  });

  it("formats the placeholder correctly", function() {
    // international format minus the dial code
    expect(input.attr("placeholder")).toEqual("7400 123456");
  });




  describe("calling setNumber to a valid intl number", function() {

    beforeEach(function() {
      input.intlTelInput("setNumber", "+447400123456");
    });

    it("formats the number correctly", function() {
      // international format minus the dial code
      expect(getInputVal()).toEqual("7400123456");
    });

    it("calling getNumber returns the full intl number", function() {
      expect(input.intlTelInput("getNumber")).toEqual("+447400123456");
    });

  });

});
