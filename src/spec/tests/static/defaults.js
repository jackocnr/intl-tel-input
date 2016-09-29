"use strict";

describe("defaults: change default plugin options", function() {

	var defaults = $.extend({}, $.fn.intlTelInput.defaults);

	beforeEach(function() {
		intlSetup();
		input = $("<input>");
	});

	afterEach(function() {
		input.intlTelInput("destroy");
		input = null;
		$.fn.intlTelInput.defaults = defaults;
	});

	it("set default option initialCountry=ru", function() {
		$.fn.intlTelInput.defaults.initialCountry = "ru";
		input.intlTelInput();
		expect(input.intlTelInput("getSelectedCountryData").iso2).toEqual("ru");
	});

});
