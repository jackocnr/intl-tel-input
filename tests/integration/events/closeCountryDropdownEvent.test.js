/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  injectInput,
  initPlugin,
  teardown,
  clickSelectedCountryAsync,
  selectCountryAsync,
} = require("../helpers/helpers");

describe("close:countrydropdown event", () => {
  let input, iti, mockEventHandler, container, user;

  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput();
    mockEventHandler = jest.fn();
    input.addEventListener("close:countrydropdown", mockEventHandler);
    ({ iti, container } = initPlugin({ input }));
  });

  afterEach(() => {
    input.removeEventListener("close:countrydropdown", mockEventHandler);
    teardown(iti);
  });

  test("does not trigger the event", () => {
    expect(mockEventHandler).not.toHaveBeenCalled();
  });

  describe("opening dropdown", () => {
    beforeEach(async () => {
      await clickSelectedCountryAsync(container, user);
    });

    test("clicking outside the dropdown triggers the event", async () => {
      await user.click(input);
      expect(mockEventHandler).toHaveBeenCalled();
    });

    test("pressing escape triggers the event", async () => {
      await user.keyboard("{Escape}");
      expect(mockEventHandler).toHaveBeenCalled();
    });

    test("selecting Afghanistan triggers the event", async () => {
      await selectCountryAsync(container, "af", user);
      expect(mockEventHandler).toHaveBeenCalled();
    });
  });
});
