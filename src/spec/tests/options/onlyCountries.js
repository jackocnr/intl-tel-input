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
    input = onlyCountries = null;
  });

  it("defaults to the first onlyCountries", function() {
    expect(getSelectedFlagElement()).toHaveClass(onlyCountries[0]);
  });

  it("has the right number of list items", function() {
    expect(getListLength()).toEqual(onlyCountries.length);
  });

});




describe("init plugin with onlyCountries for Afghanistan, Isle of Man and UK", function() {

  var onlyCountries;

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput({
      preferredCountries: [],
      onlyCountries: ["af", "im", "gb"]
    });
  });

  afterEach(function() {
    input = onlyCountries = null;
  });

  it("entering +44 defaults to the top priority country (UK)", function() {
    input.val("+44").keyup();
    expect(getSelectedFlagElement()).toHaveClass("gb");
  });

});




describe("init plugin on 2 different inputs with different onlyCountries", function() {

  var input2;

  beforeEach(function() {
    input = $("<input>");
    input2 = $("<input>");
    // japan
    input.intlTelInput({
      onlyCountries: ['jp']
    });
    // korea
    input2.intlTelInput({
      onlyCountries: ['kr']
    });
    $("body").append(getParentElement(input)).append(getParentElement(input2));
  });

  afterEach(function() {
    getParentElement(input).remove();
    getParentElement(input2).remove();
    input = input2 = null;
  });

  it("first instance still works", function() {
    input.focus();
    expect(input.val()).toEqual("+81 ");
  });

});