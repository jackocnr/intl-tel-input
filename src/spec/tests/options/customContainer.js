"use strict";

describe("customContainer option:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });


  describe("init plugin with customContainer", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        customContainer: 'cpc',
      });
    });

    it("sets the classes properly", function() {
      expect(getParentElement()).toHaveClass("cpc");
    });

  });

});
