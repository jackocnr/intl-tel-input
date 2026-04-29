/**
 * @vitest-environment jsdom
 */

import { userEvent } from "@testing-library/user-event";
import {
  injectInput,
  initIntlTelInput,
  teardown,
  clickSelectedCountryAsync,
  getSelectedCountryButton,
} from "../helpers/helpers";

describe("open:countrydropdown event", () => {
  let input, iti, mockEventHandler, container, user;

  beforeEach(() => {
    user = userEvent.setup();
    input = injectInput();
    mockEventHandler = vi.fn();
    input.addEventListener("open:countrydropdown", mockEventHandler);
    ({ iti, container } = initIntlTelInput({ input }));
  });

  afterEach(() => {
    input.removeEventListener("open:countrydropdown", mockEventHandler);
    teardown(iti);
  });

  test("does not trigger the event", () => {
    expect(mockEventHandler).not.toHaveBeenCalled();
  });

  test("clicking the selected country triggers the event", async () => {
    await clickSelectedCountryAsync(container, user);
    expect(mockEventHandler).toHaveBeenCalled();
  });

  test("focusing the selected country and hitting Enter triggers the event", async () => {
    const selectedCountry = getSelectedCountryButton(container);
    selectedCountry.focus();
    await user.keyboard("{Enter}");
    expect(mockEventHandler).toHaveBeenCalled();
  });
});
