"use strict";

describe("setPlaceholderNumberType: init vanilla plugin and call setPlaceholderNumberType with 'FIXED_LINE'", function() {

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0], {
      initialCountry: "gb"
    });
  });

  afterEach(function() {
    intlTeardown();
  });

  it("sets the placeholder to fixed line", function() {
    iti.setPlaceholderNumberType("FIXED_LINE");
    expect(input.attr("placeholder")).toEqual("0121 234 5678");
  });

  it("sets the placeholder to mobile", function() {
    iti.setPlaceholderNumberType("MOBILE");
    expect(input.attr("placeholder")).toEqual("07400 123456");
  });

});
