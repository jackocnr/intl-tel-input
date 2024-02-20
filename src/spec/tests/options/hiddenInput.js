"use strict";

describe("hiddenInput: ", function() {
  
    beforeEach(function() {
      intlSetup();
    });
  
    afterEach(function() {
      intlTeardown();
    });
  
    describe("init plugin with hiddenInput set to 'phone_full'", function() {
  
      beforeEach(function() {
        input = $("<input>").wrap("div");
        iti = window.intlTelInput(input[0], {
          hiddenInput: () => "phone_full"
        });
      });

      it("creates two hidden inputs", function() {
        expect(getHiddenInputs()).toHaveLength(2);
      });

      it("sets the name of the first hidden input to the input's name", function() {
        expect(getHiddenInputs().eq(0)).toHaveAttr("name", "phone_full");
      });

      it("sets the name of the second hidden input to the input's name with a '_country' suffix", function() {
        expect(getHiddenInputs().eq(1)).toHaveAttr("name", "phone_full_country");
      });
    });

    describe("init plugin with hiddenInput set to 'user[phone]'", function() {

      beforeEach(function() {
        input = $("<input>").wrap("div");
        iti = window.intlTelInput(input[0], {
          hiddenInput: () => "user[phone]"
        });
      });

      it("creates two hidden inputs", function() {
        expect(getHiddenInputs()).toHaveLength(2);
      });

      it("sets the name of the first hidden input to the input's name", function() {
        expect(getHiddenInputs().eq(0)).toHaveAttr("name", "user[phone]");
      });

      it("sets the name of the second hidden input to the input's name with a '_country' suffix inside the bracket", function() {
        expect(getHiddenInputs().eq(1)).toHaveAttr("name", "user[phone_country]");
      });
    })
});
