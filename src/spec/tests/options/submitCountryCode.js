"use strict";

describe("submitCountryCode option:", function() {

  var defaultDialCode = "+1";

  beforeEach(function() {
    intlSetup();
    input = $("<input>");
  });

  afterEach(function() {
    input.intlTelInput("destroy");
    input = null;
  });

  describe("init plugin with submitCountryCode = true and submitCountryCodeName = dial_code", function() {

    beforeEach(function() {
      input.intlTelInput({
        nationalMode: true,
        submitCountryCode: true,
        submitCountryCodeName: 'dial_code'
      });
      // must be in DOM for focus to work
      getParentElement().appendTo($("body"));
    });

    afterEach(function() {
      getParentElement().remove();
    });

    it("does not automatically insert the default dial code", function() {
      expect(getInputVal()).toEqual("");
    });

    it("created input hidden for country code with name = dial_code", function() {
      expect('input[name=dial_code]').toExist();
    });

    it("loads the default country dial code", function() {
      expect(getInputVal($('input[name=dial_code]'))).toEqual("1");
    });

    it("selecting another country changes the value of the hidden input", function() {
      selectFlag("ar");
      expect(getInputVal($('input[name=dial_code]'))).toEqual("54");
    });

  });

});