//"use strict";

describe("create input element", function() {

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });



  describe("init plugin with initialDialCode set to false", function() {

    beforeEach(function() {
      input.intlTelInput({
        initialDialCode: false
      });
    });

    it("defaults to no dial code", function() {
      expect(input.val()).toEqual("");
    });

  });



  describe("init plugin with initialDialCode set to true", function() {

    beforeEach(function() {
      input.intlTelInput({
        initialDialCode: true
      });
    });

    it("defaults to no dial code", function() {
      expect(input.val().trim()).toEqual("+1");
    });

  });

});