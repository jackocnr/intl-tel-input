/**
 * @jest-environment jsdom
 */
const { userEvent } = require("@testing-library/user-event");
const { initPlugin, teardown, openDropdownSelectCountryAsync } = require("../helpers/helpers");

describe("customPlaceholder option", () => {
  let iti, input, container, user;
  const options = {
    autoPlaceholder: "polite",
    initialCountry: "af",
    customPlaceholder: (p) => `e.g. ${p}`,
  };

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, input, container } = initPlugin({ options }));
  });

  afterEach(() => teardown(iti));

  test("customises placeholder and updates on country change", async () => {
    expect(input.getAttribute("placeholder")).toEqual("e.g. 070 123 4567");
    await openDropdownSelectCountryAsync(container, "gb", user);
    expect(input.getAttribute("placeholder")).toEqual("e.g. 07400 123456");
  });
});
