/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

describe("getSelectedCountryData method", () => {
  let iti, input, user;

  beforeEach(() => {
    ({ iti, input } = initPlugin());
    user = userEvent.setup();
  });

  afterEach(() => teardown(iti));

  test("gets the right default country data (empty state)", () => {
    expect(iti.getSelectedCountryData().iso2).toBeUndefined();
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
