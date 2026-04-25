/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import {
  injectInput,
  initPlugin,
  teardown,
  openDropdownSelectCountryAsync,
} from "../helpers/helpers";

describe("countrychange event", () => {
  let input, iti, mockEventHandler, container, user;

  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput();
    mockEventHandler = vi.fn();
    input.addEventListener("countrychange", mockEventHandler);
    ({ iti, container } = initPlugin({ input, options: { separateDialCode: false } }));
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

  test("fires once per setCountry call in sequence, preserving order", () => {
    const changes = [];
    input.addEventListener("countrychange", () => {
      changes.push(iti.getSelectedCountryData().iso2);
    });
    iti.setCountry("fr");
    iti.setCountry("gb");
    iti.setCountry("de");
    expect(changes).toEqual(["fr", "gb", "de"]);
  });

  test("rapid setNumber calls fire countrychange in order", () => {
    const changes = [];
    input.addEventListener("countrychange", () => {
      changes.push(iti.getSelectedCountryData().iso2);
    });
    iti.setNumber("+33123");
    iti.setNumber("+44123");
    iti.setNumber("+49123");
    expect(changes).toEqual(["fr", "gb", "de"]);
  });

  test("does not fire after destroy", () => {
    mockEventHandler.mockClear();
    iti.destroy();
    // setCountry is a no-op after destroy, so no event should fire
    iti.setCountry("fr");
    expect(mockEventHandler).not.toHaveBeenCalled();
  });
});
