"use strict";

describe("autoInsertDialCode option:", function() {

  beforeEach(function() {
    intlSetup();

    // must be in DOM for focus to work
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });


  describe("init plugin with autoInsertDialCode=true and nationalMode=false", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        autoInsertDialCode: true,
        nationalMode: false
      });
    });

    it("automatically inserts the default dial code", function() {
      expect(getInputVal()).toEqual(afghanistanDialCode);
    });

    it("blurring the input removes it", function() {
      triggerInputEvent("blur");
      expect(getInputVal()).toEqual("");
    });

    describe("selecting a country", function() {

      beforeEach(function() {
        selectFlag("gb");
      });

      it("adds the dial code", function() {
        expect(getInputVal()).toEqual("+44");
      });

      it("blurring the input removes it again", function() {
        triggerInputEvent("blur");
        expect(getInputVal()).toEqual("");
      });

    });



    describe("with a phone number", function() {

      var number = "+1 702 987 2345";

      beforeEach(function() {
        input.val(number);
      });

      it("blurring the input doesn't change it", function() {
        triggerInputEvent("blur");
        expect(getInputVal()).toEqual(number);
      });

    });

  });


  describe("init plugin with autoInsertDialCode=false and nationalMode=false", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        autoInsertDialCode: false,
        nationalMode: false
      });
    });

    it("does not automatically insert the default dial code", function() {
      expect(getInputVal()).toEqual("");
    });

    describe("selecting a country", function() {

      beforeEach(function() {
        selectFlag("gb");
      });

      it("does not add the dial code", function() {
        expect(getInputVal()).toEqual("");
      });

    });

  });

});
