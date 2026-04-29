/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, checkFlagSelected, intlTelInput } from "../helpers/helpers";
const backupInitialCountry = intlTelInput.defaults.initialCountry; // empty string by default

describe("defaults static", () => {
  afterEach(() => {
    intlTelInput.defaults.initialCountry = backupInitialCountry;
  });

  test("changing default initialCountry to ru", () => {
    intlTelInput.defaults.initialCountry = "ru";
    const { iti, container } = initIntlTelInput();
    expect(checkFlagSelected(container, "ru")).toBe(true);
    teardown(iti);
  });
});
