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
        containerClass: "cpc",
      });
    });

    it("sets the classes properly", function() {
      expect(getParentElement()).toHaveClass("cpc");
    });

  });

  describe("init plugin with containerClass and useFullscreenPopup enabled", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        useFullscreenPopup: true,
        containerClass: "cpc",
      });
    });

    it("sets the classes properly", function() {
      getSelectedCountryContainer().click();
      //* After opening the dropdown, check the dropdown container have the right class.
      expect($(".iti--container")).toHaveClass("cpc");
    });
  });

});
