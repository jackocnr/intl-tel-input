/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

// formatAsYouType: true (default) should format while typing, false should not.
describe("formatAsYouType option", () => {
  describe("default true", () => {
    let iti, input, user;

    beforeEach(() => {
      const options = { formatAsYouType: true, initialCountry: "gb" };
      ({ iti, input } = initPlugin({ options }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("formats UK mobile as typed", async () => {
      await user.type(input, "07400123456");
      expect(input.value).toEqual("07400 123456");
    });
  });

  describe("disabled", () => {
    let iti, input, user;

    beforeEach(() => {
      const options = { formatAsYouType: false, initialCountry: "gb" };
      ({ iti, input } = initPlugin({ options }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("does not format while typing", async () => {
      await user.type(input, "07400123456");
      expect(input.value).toEqual("07400123456");
    });
  });
});
