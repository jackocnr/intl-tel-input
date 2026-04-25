/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("getSelectedCountryData method", () => {
  let iti, input, user;

  beforeEach(() => {
    ({ iti, input } = initPlugin({ options: { separateDialCode: false } }));
    user = userEvent.setup();
  });

  afterEach(() => teardown(iti));

  test("gets the right default country data (empty state)", () => {
    expect(iti.getSelectedCountryData()).toBeNull();
  });

  test("typing +44 updates selected country to gb", async () => {
    await user.type(input, "+44");
    expect(iti.getSelectedCountryData().iso2).toEqual("gb");
  });

  test("setCountry updates selected country data", () => {
    iti.setCountry("ch");
    expect(iti.getSelectedCountryData().iso2).toEqual("ch");
  });
});
