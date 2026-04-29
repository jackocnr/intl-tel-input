/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown } from "../helpers/helpers";

const us = "+17024181234";

describe("formatOnDisplay option", () => {
  describe("formatOnDisplay=false, nationalMode=true, separateDialCode=false, input value set to valid US intl number", () => {
    let iti, input;

    beforeEach(() => {
      const options = { formatOnDisplay: false, nationalMode: true, separateDialCode: false };
      ({ iti, input } = initIntlTelInput({ inputValue: us, options }));
    });

    afterEach(() => teardown(iti));

    test("leaves unformatted, inc with setNumber", async () => {
      expect(input.value).toEqual("+17024181234");
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("+14154181234");
    });
  });

  describe("formatOnDisplay=true, nationalMode=true, separateDialCode=false, input value set to valid US intl number", () => {
    let iti, input;

    beforeEach(() => {
      const options = { formatOnDisplay: true, nationalMode: true, separateDialCode: false };
      ({ iti, input } = initIntlTelInput({ inputValue: us, options }));
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
      ({ iti, input } = initIntlTelInput({ inputValue: us, options }));
    });

    afterEach(() => teardown(iti));

    test("formats to intl, inc with setNumber", async () => {
      expect(input.value).toEqual("702-418-1234");
      iti.setNumber("+14154181234");
      expect(input.value).toEqual("415-418-1234");
    });
  });
});
