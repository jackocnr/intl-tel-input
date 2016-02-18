"use strict";

describe("allowDropdown:", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    input.intlTelInput("destroy").remove();
    input = null;
  });

  describe("init plugin with allowDropdown=false", function() {

    beforeEach(function() {
      input.intlTelInput({
        allowDropdown: false
      });
    });

    it("doesnt show the arrow or generate the dropdown markup", function() {
      expect(getSelectedFlagContainer().find(".iti-arrow")).not.toExist();
      expect(getListElement()).not.toExist();
    });

    it("typing a different dial code updates the flag", function() {
      input.val("+4");
      triggerKeyOnInput("4");
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

  });

  describe("init plugin with allowDropdown=true", function() {

    beforeEach(function() {
      input.intlTelInput({
        allowDropdown: true
      });
    });

    it("shows the arrow and generate the dropdown markup", function() {
      expect(getSelectedFlagContainer().find(".iti-arrow")).toExist();
      expect(getListElement()).toExist();
    });

    it("typing a different dial code updates the flag", function() {
      input.val("+4");
      triggerKeyOnInput("4");
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

    it("clicking the selected flag shows the dropdown", function() {
      getSelectedFlagContainer().click();
      expect(getListElement()).toBeVisible();
    });

  });

});
