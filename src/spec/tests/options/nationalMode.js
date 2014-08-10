"use strict";


describe("nationalMode:", function() {

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });



  describe("init plugin with nationalMode set to true", function() {

    beforeEach(function() {
      input = $("<input>");
      input.intlTelInput({
        nationalMode: true
      });
      // must be in DOM for focus to work
      getParentElement().appendTo($("body"));
    });

    afterEach(function() {
      getParentElement().remove();
    });

    it("defaults to no dial code", function() {
      expect(getInputVal()).toEqual("");
    });

    it("focusing the input does not insert the dial code", function() {
      input.focus();
      expect(getInputVal()).toEqual("");
    });

    it("selecting another country does not insert the dial code", function() {
      selectFlag("gb");
      expect(getInputVal()).toEqual("");
    });

    it("but typing a dial code does still update the selected country", function() {
      input.val("+44 1234567").keyup();
      expect(getSelectedFlagElement()).toHaveClass("gb");
    });

  });



  describe("init plugin with national number", function() {
  
    var nationalNum = "702 418 1234";

    beforeEach(function() {
      input = $("<input value='"+nationalNum+"'>");
      input.intlTelInput({
        nationalMode: true
      });
    });

    it("displays the number", function() {
      expect(getInputVal()).toEqual(nationalNum);
    });
  
  });

});