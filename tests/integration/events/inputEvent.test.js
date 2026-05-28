/**
 * @vitest-environment jsdom
 */

import { fireEvent } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";
import {
  injectInput,
  initIntlTelInput,
  teardown,
  openAndSelectCountryAsync,
} from "../helpers/helpers";

//* Simulate typing a character: update the value and fire a real "input" event,
//* without going through userEvent's keyboard simulation (which has quirks with `+`).
const typeChar = (input, char) => {
  input.value = input.value + char;
  input.setSelectionRange(input.value.length, input.value.length);
  fireEvent.input(input, { inputType: "insertText", data: char });
};

describe("input event", () => {
  let input, iti, mockEventHandler, container, user;

  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput();
    mockEventHandler = vi.fn();
    input.addEventListener("input", mockEventHandler);
    ({ iti, container } = initIntlTelInput({ input }));
  });

  afterEach(() => {
    input.removeEventListener("input", mockEventHandler);
    teardown(iti);
  });

  test("setNumber fires input event with isSetNumber=true", () => {
    iti.setNumber("+441234567890");
    expect(mockEventHandler).toHaveBeenCalled();
    const event = mockEventHandler.mock.calls.at(-1)[0];
    expect(event.detail).toEqual({ isSetNumber: true });
  });

  test("typing does not set isSetNumber flag", async () => {
    await user.type(input, "1");
    expect(mockEventHandler).toHaveBeenCalled();
    const event = mockEventHandler.mock.calls.at(-1)[0];
    // native input events have no detail, or detail without isSetNumber
    expect(event.detail?.isSetNumber).toBeFalsy();
  });

  test("setSelectedCountry fires input event with isCountryChange=true", () => {
    iti.setSelectedCountry("fr");
    expect(mockEventHandler).toHaveBeenCalled();
    const event = mockEventHandler.mock.calls.at(-1)[0];
    expect(event.detail).toEqual({ isCountryChange: true });
  });

  test("selecting a country from the dropdown fires input event with isCountryChange=true", async () => {
    await openAndSelectCountryAsync(container, "af", user);
    expect(mockEventHandler).toHaveBeenCalled();
    const event = mockEventHandler.mock.calls.at(-1)[0];
    expect(event.detail).toEqual({ isCountryChange: true });
  });

  test("typing a dial code that changes the country fires synthetic input event with isCountryChange=true", () => {
    //* Listeners attached before the core's own input listener (e.g. framework wrappers binding @input in a template) run with the stale country when the native input event fires. The core must follow up with a synthetic input event so those listeners re-read the updated country, otherwise downstream change-country handlers miss the update by one keystroke.
    typeChar(input, "+");
    typeChar(input, "4");
    typeChar(input, "5");
    expect(iti.getSelectedCountry().iso2).toBe("dk");
    const syntheticEvents = mockEventHandler.mock.calls
      .map((call) => call[0])
      .filter((event) => event.detail?.isCountryChange);
    expect(syntheticEvents).toHaveLength(1);
  });
});
