/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  injectInput,
  initPlugin,
  teardown,
  openDropdownSelectCountryAsync,
} = require("../helpers/helpers");

describe("countrychange event", () => {
  let input, iti, mockEventHandler, container, user;

  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput();
    mockEventHandler = jest.fn();
    input.addEventListener("countrychange", mockEventHandler);
    ({ iti, container } = initPlugin({ input }));
  });

  afterEach(() => {
    input.removeEventListener("countrychange", mockEventHandler);
    teardown(iti);
  });

  test("does not trigger the event", () => {
    expect(mockEventHandler).not.toHaveBeenCalled();
  });

  test("calling setCountry triggers the event", () => {
    iti.setCountry("fr");
    expect(mockEventHandler).toHaveBeenCalled();
  });

  test("calling setNumber triggers the event", () => {
    iti.setNumber("+34");
    expect(mockEventHandler).toHaveBeenCalled();
  });

  test("selecting Afghanistan triggers the event", async () => {
    await openDropdownSelectCountryAsync(container, "af", user);
    expect(mockEventHandler).toHaveBeenCalled();
  });

  test("typing another number triggers the event", async () => {
    await user.type(input, "+44");
    expect(mockEventHandler).toHaveBeenCalled();
  });
});
