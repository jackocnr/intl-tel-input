/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("getExtension method", () => {
  let iti, input, user;
  const base = "+17024181234";
  const ext = "98765";

  beforeEach(() => {
    ({ iti, input } = initPlugin());
    user = userEvent.setup();
  });

  afterEach(() => teardown(iti));

  test("works for various delimiters", async () => {
    const delimiters = ["ext.", "ex.", "x.", "ext", "ex", "x", "#"];
    for (const d of delimiters) {
      await user.clear(input);
      await user.type(input, `${base} ${d} ${ext}`);
      expect(iti.getExtension()).toEqual(ext);
    }
  });

  test("fails for space or none", async () => {
    await user.type(input, `${base} ${ext}`);
    expect(iti.getExtension()).toBeNull();
    await user.clear(input);
    await user.type(input, `${base}${ext}`);
    expect(iti.getExtension()).toBeNull();
  });
});
