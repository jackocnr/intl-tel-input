"use strict";

describe("defaults: change default plugin options", function() {

	beforeEach(function() {
		intlSetup();
		input = $("<input>").wrap("div");
	});

	afterEach(function() {
		intlTeardown();
		input.intlTelInput("destroy");
		input = null;
	});

	describe('setting the default option initialCountry=ru and initialising the plugin', function() {
		beforeEach(function() {
			$.fn.intlTelInput.defaults.initialCountry = "ru";
			input.intlTelInput();
		});

		afterEach(function() {
			$.fn.intlTelInput.defaults.initialCountry = "";
		});

		it("displays the russian flag", function() {
			expect(input.intlTelInput("getSelectedCountryData").iso2).toEqual("ru");
		});
	});
});
