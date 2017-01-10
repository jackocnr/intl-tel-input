"use strict";

describe("using input: ", function() {

  describe("init plugin with nationalMode=false", function() {

    beforeEach(function() {
      intlSetup();
      input = $("<input>");
      // nationalMode=false because we want to play with dial codes
      input.intlTelInput({
        nationalMode: false
      });
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });



    describe("typing a number with a different dial code", function() {

      beforeEach(function() {
        input.val("+44 1234567");
        triggerKeyOnInput(" ");
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

      // this was a bug
      it("clearing the input again does not change the selected flag", function() {
        input.val("");
        triggerKeyOnInput(" ");
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

    });



    describe("typing a dial code containing a space", function() {

      var telNo = "98765432",
        key = "1";

      beforeEach(function() {
        input.val("+4 4 " + telNo);
        triggerKeyOnInput(key);
      });

      it("still updates the flag correctly", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

      it("then changing the flag updates the number correctly", function() {
        selectFlag("zw");
        expect(getInputVal()).toEqual("+263 " + telNo + key);
      });

    });



    describe("typing a dial code containing a dot", function() {

      var telNo = "98765432",
        key = "1";

      beforeEach(function() {
        input.val("+4.4 " + telNo);
        triggerKeyOnInput(key);
      });

      it("still updates the flag correctly", function() {
        expect(getSelectedFlagElement()).toHaveClass("gb");
      });

      it("then changing the flag updates the number correctly", function() {
        selectFlag("zw");
        expect(getInputVal()).toEqual("+263 " + telNo + key);
      });

    });



    describe("typing a bangladesh intl dial code", function() {

      beforeEach(function() {
        input.val("+880").keyup();
      });

      it("selects the bangladesh flag", function() {
        expect(getSelectedFlagElement()).toHaveClass("bd");
      });

      // this was a bug: https://github.com/jackocnr/intl-tel-input/issues/533
      describe("adding a 1 at the beginning", function() {

        beforeEach(function() {
          input.val("+1880").keyup();
        });

        it("changes to US flag", function() {
          expect(getSelectedFlagElement()).toHaveClass("us");
        });

      });

    });

  });




  describe("init plugin", function() {

    beforeEach(function() {
      intlSetup();
      input = $("<input>");
      input.intlTelInput();
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });

    describe("selecting Canada and then typing a regionless number", function() {

      beforeEach(function() {
        selectFlag("ca");
        input.val("8005551212").keyup();
      });

      it("leaves canada selected", function() {
        expect(getSelectedFlagElement()).toHaveClass("ca");
      });

    });

  });

});
