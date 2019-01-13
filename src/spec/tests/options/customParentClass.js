"use strict";

describe("customParentClass option:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });


  describe("init plugin with customParentClass", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        customParentClass: 'cpc',
      });
    });

    it("sets the classes properly", function() {
      expect(getParentElement()).toHaveClass("cpc");
    });

  });

});
