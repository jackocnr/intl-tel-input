"use strict";

describe("setPlaceholderNumberType: init vanilla plugin and call setPlaceholderNumberType with 'FIXED_LINE'", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>");
    input.intlTelInput({
      initialCountry: "gb"
    });
  });

  afterEach(function() {
    input.intlTelInput("destroy'");
    input = null;
  });

  it("sets the placeholder to fixed line", function() {
    input.intlTelInput("setPlaceholderNumberType", "FIXED_LINE");
    expect(input.attr("placeholder")).toEqual("0121 234 5678");
  });

  it("sets the placeholder to mobile", function() {
    input.intlTelInput("setPlaceholderNumberType", "MOBILE");
    expect(input.attr("placeholder")).toEqual("07400 123456");
  });

});
