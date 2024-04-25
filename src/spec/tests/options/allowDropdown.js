"use strict";

describe("allowDropdown:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("init plugin with allowDropdown=false", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        allowDropdown: false,
      });
    });

    it("doesn't show the arrow or generate the dropdown markup", function() {
      expect(getSelectedCountryContainer().find(".iti__arrow")).not.toExist();
      expect(getListElement()).not.toExist();
    });

    it("Should not add role[combox]", function() {
      expect(getSelectedCountryContainer()).not.toHaveAttr("role", "combobox");
    });

    it("typing a different dial code updates the flag", function() {
      input.val("+4");
      triggerKeyOnInput("4");

      expect(getSelectedCountryElement()).toHaveClass("iti__gb");
    });

  });

  describe("init plugin with allowDropdown=true", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        allowDropdown: true,
      });
    });

    it("Should have role[combox]", function() {
      expect(getSelectedCountryContainer()).toHaveAttr("role", "combobox");
    });

    it("shows the arrow and generate the dropdown markup", function() {
      expect(getSelectedCountryContainer().find(".iti__arrow")).toExist();
      expect(getListElement()).toExist();
    });

    it("typing a different dial code updates the flag", function() {
      input.val("+4");
      triggerKeyOnInput("4");

      expect(getSelectedCountryElement()).toHaveClass("iti__gb");
    });

    it("clicking the selected flag shows the dropdown", function() {
      getSelectedCountryContainer().click();

      expect(getListElement()).toBeVisible();
    });

  });

});
