/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("getNumber method", () => {
  describe("initial value US number", () => {
    let iti;

    beforeEach(() => {
      ({ iti } = initIntlTelInput({ inputValue: "+17024181234" }));
    });

    afterEach(() => teardown(iti));

    test("default getNumber returns E.164", () => {
      expect(iti.getNumber()).toEqual("+17024181234");
    });

    test("INTERNATIONAL format", async () => {
      expect(iti.getNumber("INTERNATIONAL")).toEqual("+1 702-418-1234");
    });

    test("NATIONAL format", async () => {
      expect(iti.getNumber("NATIONAL")).toEqual("(702) 418-1234");
    });
  });

  describe("typing numbers", () => {
    let iti, input, user;

    beforeEach(() => {
      ({ iti, input } = initIntlTelInput({ options: { separateDialCode: false, strictMode: false } }));
      user = userEvent.setup();
    });

    afterEach(() => teardown(iti));

    test("American Samoa national -> full intl", async () => {
      iti.setCountry("as");
      await user.type(input, "6847331234");
      expect(iti.getNumber()).toEqual("+16847331234");
    });

    test("Anguilla intl formatted -> clean E.164", async () => {
      await user.type(input, "+1 264-235-1234");
      expect(iti.getNumber()).toEqual("+12642351234");
    });
  });
});
