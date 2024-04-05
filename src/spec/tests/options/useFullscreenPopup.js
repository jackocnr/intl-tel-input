"use strict";

describe("useFullscreenPopup: testing fullscreen behavior can be controlled", function() {
  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
  });

  it("can enable fullscreen popup", function() {
    iti = window.intlTelInput(input[0], {
      useFullscreenPopup: true,
    });
    //* No country list in markup initially.
    expect(getDropdownContent().find(".iti__country-list")).not.toExist();
    getSelectedCountryContainer().click();
    //* After opening the dropdown, the dropdown container should be injected, with the right class, containing the country list.
    expect($(".iti--container")).toHaveClass("iti--fullscreen-popup");
    expect($(".iti--container").find(".iti__country-list")).toExist();
  });

  it("can disable fullscreen popup", function() {
    iti = window.intlTelInput(input[0], {
      useFullscreenPopup: false,
    });

    expect(getDropdownContent().find(".iti__country-list")).toExist();
    getSelectedCountryContainer().click();

    expect($(".iti--container")).not.toExist();
    expect($(".iti--fullscreen-popup")).not.toExist();
  });
});
