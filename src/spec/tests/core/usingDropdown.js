"use strict";

describe("using dropdown: init plugin on normal input with nationalMode=false, autoInsertDialCode=true", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").appendTo("body");
    // nationalMode=false and autoInsertDialCode=true because we're playing with dial codes
    iti = window.intlTelInput(input[0], {
      nationalMode: false,
      autoInsertDialCode: true,
    });
  });

  afterEach(function() {
    intlTeardown();
  });

  it("clicking the selected flag opens the dropdown", function() {
    getSelectedFlagContainer()[0].click();
    expect(getListElement()).toBeVisible();
  });

  it("allows focusing the dropdown using the keyboard", function() {
    expect(getSelectedFlagContainer().attr('tabindex')).toEqual('0');
    expect(getSelectedFlagContainer()).not.toHaveAttr('aria-disabled');
  });

  describe("clicking the selected flag to open the dropdown", function() {

    beforeEach(function() {
      getSelectedFlagContainer()[0].click();
    });

    it("opens the dropdown with the top item marked as active and highlighted", function() {
      expect(getListElement()).toBeVisible();
      var topItem = getListElement().find("li.iti__country:first");
      expect(topItem).toHaveClass("iti__active iti__highlight");
    });

    it("clicking it again closes the dropdown", function() {
      getSelectedFlagContainer()[0].click();
      expect(getListElement()).not.toBeVisible();
    });

    it("clicking off closes the dropdown", function() {
      $("body")[0].click();
      expect(getListElement()).not.toBeVisible();
    });



    describe("selecting a new country item", function() {

      var countryCode = "ca";

      beforeEach(function() {
        getListElement().find("li[data-country-code='" + countryCode + "']")[0].click();
      });

      it("updates the selected flag", function() {
        expect(getSelectedFlagElement()).toHaveClass(`iti__${countryCode}`);
      });

      it("updates the dial code", function() {
        expect(getInputVal()).toEqual("+1");
      });

      // this was a bug
      it("adding a space doesnt reset to the default country for that dial code", function() {
        triggerKeyOnInput(" ");
        expect(getSelectedFlagElement()).toHaveClass(`iti__${countryCode}`);
      });

    });

  });

});

describe("using dropdown: disabled input", () => {
  beforeEach(function() {
    intlSetup();
    input = $("<input disabled>").appendTo("body");
    iti = window.intlTelInput(input[0]);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("prevents the user from opening the dropdown using the keyboard", function() {
    expect(getSelectedFlagContainer()).not.toHaveAttr('tabindex');
    expect(getSelectedFlagContainer().attr('aria-disabled')).toEqual('true');
  });

  it("clicking the selected flag does not open the dropdown", function() {
    getSelectedFlagContainer()[0].click();
    expect(getListElement()).not.toBeVisible();
  });
})
