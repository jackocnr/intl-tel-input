/**
 * @jest-environment jsdom
 */

const { initPlugin, teardown, getSelectedDialCodeText } = require("../helpers/helpers");

let input, iti, container;

//* We test with "gb" because the ntl number is different to the intl number (aside from the dial code).
describe("separateDialCode and initialCountry=GB", () => {
  beforeEach(() => {
    const options = {
      initialCountry: "gb",
      separateDialCode: true,
    };
    ({ input, iti, container } = initPlugin({ options }));
  });

  afterEach(() => {
    teardown(iti);
  });

  test("displays the dial code next to the input", async () => {
    expect(getSelectedDialCodeText(container)).toBe("+44");
  });

  test("formats the placeholder correctly", async () => {
    expect(input.placeholder).toBe("7400 123456");
  });

  describe("calling setNumber to a valid intl number", () => {
    const fullNumber = "+447400123456";

    beforeEach(() => {
      iti.setNumber(fullNumber);
    });

    test("formats the number correctly", async () => {
      expect(input.value).toBe("7400 123456");
    });

    test("calling getNumber returns the full intl number", async () => {
      expect(iti.getNumber()).toBe(fullNumber);
    });
  });
});

//* We test with "ca" (Canada) because we had some bugs with area codes.
describe("separateDialCode and initialCountry=CA", () => {
  beforeEach(() => {
    const options = {
      initialCountry: "ca",
      separateDialCode: true,
    };
    ({ input, iti, container } = initPlugin({ options }));
  });

  afterEach(() => {
    teardown(iti);
  });

  test("sets the placeholder correctly", async () => {
    expect(input.placeholder).toBe("506-234-5678");
  });

  test("calling setNumber will set the number correctly", async () => {
    iti.setNumber("+15194971234");
    expect(input.value).toBe("519-497-1234");
  });
});

//* We test with "as" because we had a bug.
describe("separateDialCode and initialCountry=AS", () => {
  beforeEach(() => {
    const options = {
      initialCountry: "as",
      separateDialCode: true,
    };
    ({ input, iti, container } = initPlugin({ options }));
  });

  afterEach(() => {
    teardown(iti);
  });

  test("sets the placeholder correctly", () => {
    expect(input.placeholder).toBe("684-733-1234");
  });

  test("calling setNumber will set the number correctly", () => {
    iti.setNumber("+16847331234");
    expect(input.value).toBe("684-733-1234");
  });
});

//* We test with "ru" because we had a bug.
describe("separateDialCode and initialCountry=RU", () => {
  beforeEach(() => {
    const options = {
      initialCountry: "ru",
      separateDialCode: true,
    };
    ({ input, iti, container } = initPlugin({ options, inputValue: "(922) 555-1234" }));
  });

  afterEach(() => {
    teardown(iti);
  });

  test("formats the number correctly", () => {
    //* Used to be '8 (922) 555-12-34'.
    expect(input.value).toBe("922 555-12-34");
  });
});
