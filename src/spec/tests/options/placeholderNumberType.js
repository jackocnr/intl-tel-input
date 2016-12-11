"use strict";

describe("placeholderNumberType:", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  it("init plugin with default placeholderNumberType sets the placeholder correctly", function() {
    input.intlTelInput({
      nationalMode: true,
      initialCountry: "gb"
    });
    expect(input.attr("placeholder")).toEqual("07400 123456");
  });

  it("init plugin with placeholderNumberType=FIXED_LINE sets the placeholder correctly", function() {
    input.intlTelInput({
      nationalMode: true,
      initialCountry: "gb",
      placeholderNumberType: "FIXED_LINE"
    });
    expect(input.attr("placeholder")).toEqual("0121 234 5678");
  });

});
