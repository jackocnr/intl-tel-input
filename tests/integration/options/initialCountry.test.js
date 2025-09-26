/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, checkFlagSelected } = require("../helpers/helpers");

describe("initialCountry option", () => {
  describe("jp", () => {
    let iti, container;

    beforeEach(() => {
      const options = { initialCountry: "jp" };
      ({ iti, container } = initPlugin({ options }));
    });

    afterEach(() => teardown(iti));

    test("jp selected", () => {
      checkFlagSelected(container, "jp");
    });
  });

  describe("ca", () => {
    let iti, container;

    beforeEach(() => {
      const options = { initialCountry: "ca" };
      ({ iti, container } = initPlugin({ inputValue: "+1 800 123 1234", options }));
    });

    afterEach(() => teardown(iti));

    test("ca still selected even when regionless NANP number in input", () => {
      checkFlagSelected(container, "ca");
    });
  });
});
