"use strict";

describe("autoHideDialCode option:", function() {

  var defaultDialCode = "+1";
  var element;
  var input;

  beforeEach(function() {
    intlSetup();
    element = document.createElement("input");
  });

  afterEach(function() {
    input.destroy();
    input = null;
  });

  afterEach(function() {
    var parent = input.inputElement.parentNode;
    parent.parentNode.removeChild(parent);
  });


  describe("init plugin with autoHideDialCode = true and nationalMode = false", function() {

    beforeEach(function() {
      input = new IntlTelInput(element, {
        autoHideDialCode: true,
        nationalMode: false
      });

      // must be in DOM for focus to work
      document.body.appendChild(input.inputElement.parentNode);
    });

    it("does not automatically insert the default dial code", function() {
      expect(input.inputElement.value).toEqual("");
    });

    it("focusing the input adds the default dial code and blurring it removes it again", function() {
      input.inputElement.focus();
      expect(input.inputElement.value).toEqual("+1");

      input.inputElement.blur();
      expect(input.inputElement.value).toEqual("");
    });



    describe("with a phone number", function() {

      var number = "+1 702 987 2345";

      beforeEach(function() {
        input.inputElement.value = number;
      });

      it("focusing and blurring the input doesn't change it", function() {
        input.inputElement.focus();
        expect(input.inputElement.value).toEqual(number);

        input.inputElement.blur();
        expect(input.inputElement.value).toEqual(number);
      });

    });

  });


  describe("init plugin with autoHideDialCode = false and nationalMode = false", function() {

    beforeEach(function() {
      input = new IntlTelInput(element, {
        autoHideDialCode: false,
        nationalMode: false
      });

      // FIXME: tests still pass when this line is commented out -_-
      document.body.appendChild(input.inputElement.parentNode);
    });

    it("automatically inserts the default dial code", function() {
      expect(input.inputElement.value).toEqual(defaultDialCode);
    });

    it("focusing and bluring the input dont change the val", function() {
      input.inputElement.focus();
      expect(input.inputElement.value).toEqual(defaultDialCode);

      input.inputElement.blur();
      expect(input.inputElement.value).toEqual(defaultDialCode);
    });


    describe("with a phone number", function() {

      var number = "+1 702 987 2345";

      beforeEach(function() {
        input.inputElement.value = number;
      });

      it("focusing and blurring the input doesn't change it", function() {
        input.inputElement.focus();
        expect(input.inputElement.value).toEqual(number);

        input.inputElement.blur();
        expect(input.inputElement.value).toEqual(number);
      });

    });

  });

});
