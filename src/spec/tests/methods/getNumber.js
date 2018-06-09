"use strict";

describe("getNumber: ", function() {

  describe("initialising plugin with valid US number and utils.js", function() {

    beforeEach(function() {
      intlSetup(true);
      input = $("<input value='+17024181234'>");
      input.intlTelInput();
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });

    it("calling getNumber with no args returns the number as E.164", function() {
      expect(input.intlTelInput("getNumber")).toEqual("+17024181234");
    });

    it("calling getNumber with format=INTERNATIONAL", function() {
      expect(input.intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL)).toEqual("+1 702-418-1234");
    });

    it("calling getNumber with format=NATIONAL", function() {
      expect(input.intlTelInput("getNumber", intlTelInputUtils.numberFormat.NATIONAL)).toEqual("(702) 418-1234");
    });

  });



  describe("initialising plugin with utils.js", function() {

    beforeEach(function() {
      intlSetup(true);
      input = $("<input>");
      input.intlTelInput();
    });

    afterEach(function() {
      input.intlTelInput("destroy");
      input = null;
    });

    describe("selecting American Samoa and then typing a national number", function() {

      beforeEach(function() {
        selectFlag("as");
        input.val("6847331234").keyup();
      });

      it("getNumber returns the correct number (with full dialcode/area code)", function() {
        expect(input.intlTelInput("getNumber")).toEqual("+16847331234");
      });

    });

    describe("typing a full international number for Anguilla", function() {

      beforeEach(function() {
        // important that this test contains formatting because that caused a bug before
        input.val("+1 264-235-1234").keyup();
      });

      it("getNumber returns the correct number", function() {
        expect(input.intlTelInput("getNumber")).toEqual("+12642351234");
      });

    });

  });

});
