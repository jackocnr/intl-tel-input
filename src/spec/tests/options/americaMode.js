//"use strict";

describe("create input element", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });



  describe("init plugin with americaMode set to true", function() {

    beforeEach(function() {
      input.intlTelInput({
        americaMode: true
      });
    });

    it("defaults to no dial code", function() {
      expect(input.val()).toEqual("");
    });



    describe("selecting another country", function() {

      beforeEach(function() {
        selectFlag("gb");
      });

      it("still does update the dial code", function() {
        expect(input.val().trim()).toEqual("+44");
      });

    });



    describe("selecting america again", function() {

      beforeEach(function() {
        selectFlag("us");
      });

      it("does not insert the dial code", function() {
        expect(input.val()).toEqual("");
      });

    });

  });

});