"use strict";

describe("getExtension: init plugin with utils", function() {

  var number = "+17024181234",
    extension = "98765";

  beforeEach(function() {
    intlSetup(true);
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("works for various delimiters", function() {
    var delimiters = ["ext.", "ex.", "x.", "ext", "ex", "x", "#"];
    for (var i = 0; i < delimiters.length; i++) {
      input.val(number + " " + delimiters[i] + " " + extension);
      //if (!input.intlTelInput("getExtension")) console.log("bad: "+delimiters[i]);
      expect(iti.getExtension()).toEqual(extension);
    }
  });

  it("doesnt work for a space, or no delimiter", function() {
    input.val(number + " " + extension);
    expect(iti.getExtension()).toEqual(null);
    input.val(number + extension);
    expect(iti.getExtension()).toEqual(null);
  });

});
