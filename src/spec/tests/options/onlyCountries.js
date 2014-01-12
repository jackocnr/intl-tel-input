"use strict";

describe("init plugin with onlyCountries", function() {

  var onlyCountries;

  beforeEach(function() {
    input = $("<input>");
    // China and Japan (note that none of the default preferredCountries are included here, so wont be in the list)
    onlyCountries = ['ch', 'jp'];
    input.intlTelInput({
      onlyCountries: onlyCountries
    });
  });

  afterEach(function() {
    input = null;
    onlyCountries = null;
  });

  it("defaults to the first onlyCountries", function() {
    expect(getSelectedFlagElement()).toHaveClass(onlyCountries[0]);
  });

  it("has the right number of list items", function() {
    expect(getListLength()).toEqual(onlyCountries.length);
  });

});