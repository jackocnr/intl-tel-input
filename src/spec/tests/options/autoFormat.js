"use strict";

describe("testing autoFormat option", function() {

  var unformattedNumber = "+1 702 418 1234 B",
    formattedNumber = "+1 (702) 418-1234";

  beforeEach(function() {
    input = $("<input value='" + unformattedNumber + "'>");
    // must be in DOM for focus/keys to work
    input.appendTo($("body"));
  });

  afterEach(function() {
    getParentElement().remove();
    input.intlTelInput("destroy");
    input = null;
  });


  describe("init plugin with autoFormat disabled", function() {
  
    beforeEach(function() {
      input.intlTelInput({
        autoFormat: false
      });
    });

    it("initialising the plugin leaves the number the same", function() {
      expect(input.val()).toEqual(unformattedNumber);
    });

    it("triggering alpha key at end of input adds the alpha char and leaves the rest", function() {
      // updating the input value will be silent (no events triggered)
      input.val(unformattedNumber + "A");
      triggerKeyOnInput("A");

      expect(input.val()).toEqual(unformattedNumber + "A");
    });
  
  });


  describe("init plugin with autoFormat enabled", function() {
  
    beforeEach(function() {
      input.intlTelInput({
        autoFormat: true
      });
    });

    it("initialising the plugin formats the number", function() {
      expect(input.val()).toEqual(formattedNumber);
    });

    it("triggering alpha key at end of input does not add the alpha char and formats the rest", function() {
      // updating the input value will be silent (no events triggered)
      input.val(unformattedNumber + "A");
      triggerKeyOnInput("A");
      expect(input.val()).toEqual(formattedNumber);
    });
  
  });

});