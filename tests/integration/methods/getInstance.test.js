/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, injectInput, intlTelInput } from "../helpers/helpers";

describe("getInstance static", () => {
  let iti, input;

  beforeEach(() => {
    ({ iti, input } = initIntlTelInput());
  });

  afterEach(() => teardown(iti));

  test("returns instance when exists", () => {
    const found = intlTelInput.getInstance(input);
    expect(found).toBe(iti);
  });

  test("returns null for unknown input", () => {
    const other = injectInput();
    const found = intlTelInput.getInstance(other);
    expect(found).toBeNull();
  });
});
