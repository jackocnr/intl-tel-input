/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("getExtension method", () => {
  let iti, input, user;
  const base = "+17024181234";
  const ext = "98765";

  beforeEach(() => {
    ({ iti, input } = initIntlTelInput({ options: { separateDialCode: false, strictMode: false } }));
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

  test("returns empty string for empty input", () => {
    expect(iti.getExtension()).toEqual("");
  });

  test("returns null for number without extension", async () => {
    await user.type(input, base);
    expect(iti.getExtension()).toBeNull();
  });

  test("returns empty string after destroy", () => {
    iti.destroy();
    expect(iti.getExtension()).toEqual("");
  });
});
