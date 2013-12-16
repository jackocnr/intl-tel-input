//"use strict";

describe("create input element and init plugin", function() {

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
  });

  afterEach(function() {
    input = null;
  });



  describe("using setNumber function", function() {
  
    var number = "+44 7733 123 456";

    beforeEach(function() {
      input.intlTelInput("setNumber", number);
    });
  
    it("sets the number", function() {
      expect(input.val()).toEqual(number);
    });

    it("updates the flag", function() {
      expect(getSelectedCountry()).toEqual("gb");
    });

  });

});