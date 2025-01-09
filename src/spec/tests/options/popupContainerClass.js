"use strict";

describe("popupContainerClass option:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });


  describe("init plugin with popupContainerClass", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        useFullscreenPopup: true,
        popupContainerClass: "cpc",
      });
    });

    it("sets the classes properly", function() {
      getSelectedCountryContainer().click();
      //* After opening the dropdown, check the dropdown container have the right class.
      expect($(".iti--container")).toHaveClass("cpc");
    });
  });

});
