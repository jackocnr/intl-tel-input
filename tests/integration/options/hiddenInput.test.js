/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");

describe("hiddenInput option", () => {
  describe("valid names", () => {
    let iti, container;

    beforeEach(() => {
      const options = {
        hiddenInput: () => ({
          phone: "phone_full",
          country: "phone_country",
        }),
      };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("creates two hidden inputs with correct names", () => {
      const hidden = container.querySelectorAll("input[type='hidden']");
      expect(hidden.length).toBe(2);
      expect(hidden[0].name).toBe("phone_full");
      expect(hidden[1].name).toBe("phone_country");
    });
  });

  describe("invalid names", () => {
    let iti, container;

    beforeEach(() => {
      const options = {
        hiddenInput: () => ({
          test: "t",
          data: "d",
        }),
      };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("creates none", () => {
      const hidden = container.querySelectorAll("input[type='hidden']");
      expect(hidden.length).toBe(0);
    });
  });
});
