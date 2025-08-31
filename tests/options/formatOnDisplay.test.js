/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");

const us = "+17024181234";

describe("formatOnDisplay option", () => {
  describe("formatOnDisplay=false, nationalMode=true, input value set to valid US intl number", () => {
    let iti, input;

    beforeEach(() => {
      const options = { formatOnDisplay: false, nationalMode: true };
      ({ iti, input } = initPlugin({ inputValue: us, options }));
    });

    afterEach(() => teardown(iti));

    test("leaves unformatted, inc with setNumber", async () => {
      expect(input.value).toEqual(us);
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("+14154181234");
    });
  });

  describe("formatOnDisplay=true, nationalMode=true, input value set to valid US intl number", () => {
    let iti, input;

    beforeEach(() => {
      const options = { formatOnDisplay: true, nationalMode: true };
      ({ iti, input } = initPlugin({ inputValue: us, options }));
    });

    afterEach(() => teardown(iti));

    test("formats to national, inc with setNumber", async () => {
      expect(input.value).toEqual("(702) 418-1234");
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("(415) 418-1234");
    });
  });

  describe("formatOnDisplay=true, nationalMode=false, input value set to valid US intl number", () => {
    let iti, input;

    beforeEach(() => {
      const options = { formatOnDisplay: true, nationalMode: false };
      ({ iti, input } = initPlugin({ inputValue: us, options }));
    });

    afterEach(() => teardown(iti));

    test("formats to intl, inc with setNumber", async () => {
      expect(input.value).toEqual("+1 702-418-1234");
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("+1 415-418-1234");
    });
  });
});
