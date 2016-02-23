"use strict";

describe("using dropdown: init plugin with nationalMode=false", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
    // nationalMode=false because we're playing with dial codes
    input.intlTelInput({
      nationalMode: false
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy").remove();
    input = null;
  });

  it("normal input: clicking the selected flag opens the dropdown", function() {
    getSelectedFlagContainer().click();
    expect(getListElement()).toBeVisible();
  });

  it("disabled input: clicking the selected flag does not open the dropdown", function() {
    input.prop("disabled", true);
    getSelectedFlagContainer().click();
    expect(getListElement()).not.toBeVisible();
  });



  describe("clicking the selected flag to open the dropdown", function() {

    beforeEach(function() {
      getSelectedFlagContainer().click();
    });

    it("opens the dropdown with the top item marked as active and highlighted", function() {
      expect(getListElement()).toBeVisible();
      var topItem = getListElement().find("li.country:first");
      expect(topItem).toHaveClass("active highlight");
    });

    it("clicking it again closes the dropdown", function() {
      getSelectedFlagContainer().click();
      expect(getListElement()).not.toBeVisible();
    });

    it("clicking off closes the dropdown", function() {
      $("body").click();
      expect(getListElement()).not.toBeVisible();
    });



    describe("selecting a new country item", function() {

      var countryCode = "ca";

      beforeEach(function() {
        getListElement().find("li[data-country-code='" + countryCode + "']").click();
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement()).toHaveClass(countryCode);
      });

      it("updates the dial code", function() {
        expect(getInputVal()).toEqual("+1");
      });

      // this was a bug
      it("adding a space doesnt reset to the default country for that dial code", function() {
        triggerKeyOnInput(" ");
        expect(getSelectedFlagElement()).toHaveClass(countryCode);
      });

    });

  });

});
