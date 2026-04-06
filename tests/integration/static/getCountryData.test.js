/**
 * @vitest-environment jsdom
 */
import { intlTelInput } from "../helpers/helpers";

// no setup/teardown needed for static method test
describe("getCountryData static", () => {
  test("returns country data array", () => {
    const data = intlTelInput.getCountryData();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(200);
  });
});
