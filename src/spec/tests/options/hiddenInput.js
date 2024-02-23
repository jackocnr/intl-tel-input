"use strict";

describe("hiddenInput: ", function() {

  beforeEach(function() {
    intlSetup();
  });

  afterEach(function() {
    intlTeardown();
  });

  describe("init plugin with hiddenInput returning a string", function() {

    beforeEach(function() {
      input = $("<input>").wrap("div");
      iti = window.intlTelInput(input[0], {
        hiddenInput: () => "phone_full"
      });
    });

    it("creates two hidden inputs", function() {
      expect(getHiddenInputs()).toHaveLength(2);
    });

    it("sets the name of the first hidden input to the returned string", function() {
      expect(getHiddenInputs().eq(0)).toHaveAttr("name", "phone_full");
    });

    it("sets the name of the second hidden input to the returned string with a '_country' suffix", function() {
      expect(getHiddenInputs().eq(1)).toHaveAttr("name", "phone_full_country");
    });
  });

  describe("init plugin with hiddenInput returning an object with correct properties", function() {

    beforeEach(function() {
      input = $("<input>").wrap("div");
      iti = window.intlTelInput(input[0], {
        hiddenInput: () => ({
          phone: "phone_full",
          country: "phone_country"
        })
      });
    });

    it("creates two hidden inputs", function() {
      expect(getHiddenInputs()).toHaveLength(2);
    });

    it("sets the name of the first hidden input to the returned object's 'phone' property", function() {
      expect(getHiddenInputs().eq(0)).toHaveAttr("name", "phone_full");
    });

    it("sets the name of the second hidden input to the returned object's 'country' property", function() {
      expect(getHiddenInputs().eq(1)).toHaveAttr("name", "phone_country");
    });
  });

  describe("init plugin with hiddenInput returning an object with incorrect properties", function() {

    beforeEach(function() {
      input = $("<input name='phone'>").wrap("div");
      iti = window.intlTelInput(input[0], {
        hiddenInput: () => ({
          test: "test",
          data: "data"
        })
      });
    });

    it("creates two hidden inputs", function() {
      expect(getHiddenInputs()).toHaveLength(2);
    });

    it("sets the name of the hidden input to the name of the input", function() {
      expect(getHiddenInputs().eq(0)).toHaveAttr("name", "phone");
    });

    it("sets the name of the second hidden input to the name of the input with a '_country' suffix", function() {
      expect(getHiddenInputs().eq(1)).toHaveAttr("name", "phone_country");
    });
  });

  describe("init plugin with hiddenInput returning an empty object", function() {

    beforeEach(function() {
      input = $("<input name='phone'>").wrap("div");
      iti = window.intlTelInput(input[0], {
        hiddenInput: () => ({})
      });
    });

    it("creates two hidden inputs", function() {
      expect(getHiddenInputs()).toHaveLength(2);
    });

    it("sets the name of the hidden input to the name of the input", function() {
      expect(getHiddenInputs().eq(0)).toHaveAttr("name", "phone");
    });

    it("sets the name of the second hidden input to the name of the input with a '_country' suffix", function() {
      expect(getHiddenInputs().eq(1)).toHaveAttr("name", "phone_country");
    });
  });

  describe("init plugin with no name attribute set on input and hiddenInput returning an empty object", function() {

    beforeEach(function() {
      input = $("<input>").wrap("div");
      iti = window.intlTelInput(input[0], {
        hiddenInput: () => ({})
      });
    });

    it("does not create any hidden inputs", function() {
      expect(getHiddenInputs()).toHaveLength(0);
    });
  });
});
