"use strict";

describe("autoHideDialCode option:", function() {

  var defaultDialCode = "+1";

  beforeEach(function() {
    intlSetup();

    // must be in DOM for focus to work
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });


  describe("init plugin with autoHideDialCode=true and nationalMode=false", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        autoHideDialCode: true,
        nationalMode: false
      });
    });

    it("does not automatically insert the default dial code", function() {
      expect(getInputVal()).toEqual("");
    });

    describe("focusing the input", function() {

      beforeEach(function() {
        triggerInputEvent("focus");
      });

      it("adds the default dial code", function() {
        expect(getInputVal()).toEqual("+1");
      });

      // special case: if first char you type is a plus, then we remove auto-added dial code
      it("typing a new dial code replaces the old one", function() {
        triggerKeyOnInput("+");
        triggerKeyOnInput("4");
        triggerKeyOnInput("4");
        expect(getInputVal()).toEqual("+44");
      });

      it("blurring it removes it again", function() {
        triggerInputEvent("blur");
        expect(getInputVal()).toEqual("");
      });

    });



    describe("with a phone number", function() {

      var number = "+1 702 987 2345";

      beforeEach(function() {
        input.val(number);
      });

      it("focusing and blurring the input doesn't change it", function() {
        triggerInputEvent("focus");
        expect(getInputVal()).toEqual(number);
        triggerInputEvent("blur");
        expect(getInputVal()).toEqual(number);
      });

    });

  });


  describe("init plugin with autoHideDialCode=false and nationalMode=false", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        autoHideDialCode: false,
        nationalMode: false
      });
    });

    it("automatically inserts the default dial code", function() {
      expect(getInputVal()).toEqual(defaultDialCode);
    });

    it("focusing and bluring the input dont change the val", function() {
      triggerInputEvent("focus");
      expect(getInputVal()).toEqual(defaultDialCode);
      triggerInputEvent("blur");
      expect(getInputVal()).toEqual(defaultDialCode);
    });


    describe("with a phone number", function() {

      var number = "+1 702 987 2345";

      beforeEach(function() {
        input.val(number);
      });

      it("focusing and blurring the input doesn't change it", function() {
        triggerInputEvent("focus");
        expect(getInputVal()).toEqual(number);
        triggerInputEvent("blur");
        expect(getInputVal()).toEqual(number);
      });

    });

  });

});
