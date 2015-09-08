"use strict";

describe("IntlTelInput#getExtension()", function() {

  var element;

  beforeEach(function() {
    element = document.createElement("input");
  });

  it("returns an empty string by default", function() {
    var intlTelInput = new IntlTelInput(element);
    expect(intlTelInput.getExtension()).toEqual("");
  });

  it("returns the extension if available", function() {
    var intlTelInput = new IntlTelInput(element);
    element.value = "123 ext. 321";

    expect(intlTelInput.getExtension()).toEqual("321");
  });
});
