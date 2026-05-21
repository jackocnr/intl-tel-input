/**
 * @vitest-environment jsdom
 */
import { userEvent } from "@testing-library/user-event";
import { initIntlTelInput, teardown, openAndSelectCountryAsync } from "../helpers/helpers";

describe("placeholderNumberPolicy option (empty initial placeholder)", () => {
  describe("placeholderNumberPolicy=OFF", () => {
    let iti, input;

    beforeEach(() => {
      const options = { placeholderNumberPolicy: "OFF", initialCountry: "af" };
      ({ iti, input } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("leaves empty", async () => {
      expect(input.getAttribute("placeholder")).toBeNull();
    });
  });

  describe("placeholderNumberPolicy=POLITE", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { placeholderNumberPolicy: "POLITE", initialCountry: "af" };
      ({ iti, input, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("sets and updates placeholder", async () => {
      expect(input.getAttribute("placeholder")).toEqual("70 123 4567");
      await openAndSelectCountryAsync(container, "gb", user);
      expect(input.getAttribute("placeholder")).toEqual("7400 123456");
    });
  });
});

describe("placeholderNumberPolicy option (existing placeholder)", () => {
  describe("placeholderNumberPolicy=OFF", () => {
    let iti, input;

    beforeEach(() => {
      const options = { placeholderNumberPolicy: "OFF", initialCountry: "af" };
      ({ iti, input } = initIntlTelInput({ inputValue: "", options }));
      input.setAttribute("placeholder", "lol");
    });

    afterEach(() => teardown(iti));

    test("placeholder unchanged", async () => {
      expect(input.getAttribute("placeholder")).toEqual("lol");
    });
  });

  describe("placeholderNumberPolicy=POLITE", () => {
    let iti, input;

    beforeEach(() => {
      const options = { placeholderNumberPolicy: "POLITE", initialCountry: "af" };
      ({ iti, input } = initIntlTelInput({ options }));
      input.setAttribute("placeholder", "lol");
    });

    afterEach(() => teardown(iti));

    test("placeholder unchanged", async () => {
      expect(input.getAttribute("placeholder")).toEqual("lol");
    });
  });

  describe("placeholderNumberPolicy=AGGRESSIVE", () => {
    let iti, input;

    beforeEach(() => {
      const options = { placeholderNumberPolicy: "AGGRESSIVE", initialCountry: "af" };
      // need an existing placeholder BEFORE init so aggressive mode can overwrite it
      input = document.createElement("input");
      input.setAttribute("placeholder", "lol");
      document.body.appendChild(input);
      ({ iti, input } = initIntlTelInput({ options, input }));
    });

    afterEach(() => teardown(iti));

    test("placeholder replaced", async () => {
      expect(input.getAttribute("placeholder")).toEqual("70 123 4567");
    });
  });
});
