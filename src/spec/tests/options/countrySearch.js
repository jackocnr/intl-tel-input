"use strict";

describe("countrySearch option:", function() {

  beforeEach(function() {
    jasmine.clock().install();
    intlSetup();
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    jasmine.clock().uninstall();
    intlTeardown();
  });



  describe("init plugin with countrySearch disabled, and open dropdown", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        countrySearch: false,
      });
      getSelectedFlagContainer().click();
    });

    it("does not insert the search input", function() {
      expect(getDropdownContent().find("input.iti__search-input")).not.toExist();
    });

  });



  describe("init plugin with countrySearch enabled, and open dropdown", function() {

    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        countrySearch: true,
      });
      getSelectedFlagContainer().click();
    });

    it("inserts the search input", function() {
      expect(getDropdownContent().find("input.iti__search-input")).toExist();
    });

    it("shows all countries to start with", function() {
      expect(getListLength()).toEqual(totalCountries);
    });

    it("typing 'x' shows 6 results, and hitting Enter selects Christmas Islands", function() {
      const searchInput = getSearchInput();
      triggerKeyOnInput('x', searchInput);
      jasmine.clock().tick(100); // allow for the (intentional) 100ms delay on the search handler
      expect(getListLength()).toEqual(6);
      triggerKeyOnBody('Enter');
      expect(getSelectedFlagElement()).toHaveClass("iti__cx");
    });

  });

});
