/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, injectInput, intlTelInput } = require("../helpers/helpers");

describe("getInstance static", () => {
  let iti, input;

  beforeEach(() => {
    ({ iti, input } = initPlugin());
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
