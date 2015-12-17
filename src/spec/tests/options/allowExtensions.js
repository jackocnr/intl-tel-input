"use strict";

describe("allowExtensions option:", function() {

	beforeEach(function() {
		intlSetup(true);
	});

	afterEach(function() {
		getParentElement().remove();
		input.intlTelInput("destroy");
		input = null;
	});



	describe("input with allowExtensions enabled", function() {

		beforeEach(function() {
			input = $("<input>");
			// must be in DOM for focus/keys to work
			input.appendTo($("body"));

			input.intlTelInput({
				allowExtensions: true
			});
		});

		it("shifting format does not prematurely detect extension", function() {
			selectFlag("cl");

			input.val("55");
			triggerKeyOnInput("2");
			expect(getInputVal()).toEqual("55 2");

			input.val("552");
			triggerKeyOnInput("2");
			expect(getInputVal()).toEqual("5522");

			input.val("55221");
			triggerKeyOnInput("2");
			expect(getInputVal()).toEqual("55 221 2");

			input.val("55221234");
			triggerKeyOnInput("5");
			expect(getInputVal()).toEqual("55 221 2345");

			input.val("552212345");
			triggerKeyOnInput("6");
			expect(getInputVal()).toEqual("55 221 2345 ext. 6");
		});

	});

});