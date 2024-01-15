"use strict";

describe("containerClass option:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });


  describe("init plugin with containerClass", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        containerClass: 'cpc',
      });
    });

    it("sets the classes properly", function() {
      expect(getParentElement()).toHaveClass("cpc");
    });

  });

});
