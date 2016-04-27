"use strict";

describe("separateDialCode:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });



  // we test with "gb" because the ntl number is different to the intl number (aside from the dial code)
  describe("init plugin with initialCountry=gb", function() {

    beforeEach(function() {
      input.intlTelInput({
        separateDialCode: true,
        initialCountry: "gb"
      });
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
        input.intlTelInput("setNumber", "+447400123456", intlTelInputUtils.numberFormat.INTERNATIONAL);
      });

      it("formats the number correctly", function() {
        // international format minus the dial code
        expect(getInputVal()).toEqual("7400 123456");
      });

      it("calling getNumber returns the full intl number", function() {
        expect(input.intlTelInput("getNumber")).toEqual("+447400123456");
      });

    });

  });


  // we test with "ca" because we had some bugs with area codes
  describe("init plugin with initialCountry=ca", function() {

    beforeEach(function() {
      input.intlTelInput({
        separateDialCode: true,
        initialCountry: "ca"
      });
    });

    it("sets the placeholder correctly", function() {
      // used to be '234-5678'
      expect(input.attr("placeholder")).toEqual("204-234-5678");
    });

    it("calling setNumber will set the number correctly", function() {
      input.intlTelInput("setNumber", "+15194971234", intlTelInputUtils.numberFormat.INTERNATIONAL);
      // used to be '497-1234'
      expect(getInputVal()).toEqual("519-497-1234");
    });

  });



  // we test with "as" because we had a bug
  describe("init plugin with initialCountry=as", function() {

    beforeEach(function() {
      input.intlTelInput({
        separateDialCode: true,
        initialCountry: "as"
      });
    });

    it("sets the placeholder correctly", function() {
      // used to be '4-733-1234'
      expect(input.attr("placeholder")).toEqual("733-1234");
    });

    it("calling setNumber will set the number correctly", function() {
      input.intlTelInput("setNumber", "+16847331234", intlTelInputUtils.numberFormat.INTERNATIONAL);
      // used to be '4-733-1234'
      expect(getInputVal()).toEqual("733-1234");
    });

  });



  // we test with "ru" because we had a bug
  describe("init plugin with initialCountry=ru and valid ntl number", function() {

    beforeEach(function() {
      input.val("(922) 555-1234");
      input.intlTelInput({
        separateDialCode: true,
        initialCountry: "ru"
      });
    });

    it("formats the number correctly", function() {
      // used to be '8 (922) 555-12-34'
      expect(input.val()).toEqual("922 555-12-34");
    });

  });

});
