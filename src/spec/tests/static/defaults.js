"use strict";

describe("defaults: change default plugin options", function() {

	beforeEach(function() {
		intlSetup();
		input = $("<input>").wrap("div");
	});

	afterEach(function() {
		intlTeardown();
	});

	describe('setting the default option initialCountry=ru and initialising the plugin', function() {
		beforeEach(function() {
			window.intlTelInputGlobals.defaults.initialCountry = "ru";
			iti = window.intlTelInput(input[0]);
		});

		afterEach(function() {
			window.intlTelInputGlobals.defaults.initialCountry = "";
		});

		it("displays the russian flag", function() {
			expect(iti.getSelectedCountryData().iso2).toEqual("ru");
		});
	});
});
