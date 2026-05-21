/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("getSelectedCountry method", () => {
  let iti, input, user;

  beforeEach(() => {
    ({ iti, input } = initIntlTelInput({ options: { separateDialCode: false } }));
    user = userEvent.setup();
  });

  afterEach(() => teardown(iti));

  test("gets the right default country data (empty state)", () => {
    expect(iti.getSelectedCountry()).toBeNull();
  });

  test("typing +44 updates selected country to gb", async () => {
    await user.type(input, "+44");
    expect(iti.getSelectedCountry().iso2).toEqual("gb");
  });

  test("setSelectedCountry updates selected country data", () => {
    iti.setSelectedCountry("ch");
    expect(iti.getSelectedCountry().iso2).toEqual("ch");
  });
});
