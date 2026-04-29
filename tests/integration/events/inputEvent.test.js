/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import {
  injectInput,
  initIntlTelInput,
  teardown,
  openDropdownSelectCountryAsync,
} from "../helpers/helpers";

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

  test("setCountry fires input event with isCountryChange=true", () => {
    iti.setCountry("fr");
    expect(mockEventHandler).toHaveBeenCalled();
    const event = mockEventHandler.mock.calls.at(-1)[0];
    expect(event.detail).toEqual({ isCountryChange: true });
  });

  test("selecting a country from the dropdown fires input event with isCountryChange=true", async () => {
    await openDropdownSelectCountryAsync(container, "af", user);
    expect(mockEventHandler).toHaveBeenCalled();
    const event = mockEventHandler.mock.calls.at(-1)[0];
    expect(event.detail).toEqual({ isCountryChange: true });
  });
});
