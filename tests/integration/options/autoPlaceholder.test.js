/**
 * @vitest-environment jsdom
 */
import { userEvent } from "@testing-library/user-event";
import { initIntlTelInput, teardown, openDropdownSelectCountryAsync } from "../helpers/helpers";

describe("autoPlaceholder option (empty initial placeholder)", () => {
  describe("autoPlaceholder=off", () => {
    let iti, input;

    beforeEach(() => {
      const options = { autoPlaceholder: "off", initialCountry: "af" };
      ({ iti, input } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("leaves empty", async () => {
      expect(input.getAttribute("placeholder")).toBeNull();
    });
  });

  describe("autoPlaceholder=polite", () => {
    let iti, input, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = { autoPlaceholder: "polite", initialCountry: "af" };
      ({ iti, input, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("sets and updates placeholder", async () => {
      expect(input.getAttribute("placeholder")).toEqual("70 123 4567");
      await openDropdownSelectCountryAsync(container, "gb", user);
      expect(input.getAttribute("placeholder")).toEqual("7400 123456");
    });
  });
});

describe("autoPlaceholder option (existing placeholder)", () => {
  describe("autoPlaceholder=off", () => {
    let iti, input;

    beforeEach(() => {
      const options = { autoPlaceholder: "off", initialCountry: "af" };
      ({ iti, input } = initIntlTelInput({ inputValue: "", options }));
      input.setAttribute("placeholder", "lol");
    });

    afterEach(() => teardown(iti));

    test("placeholder unchanged", async () => {
      expect(input.getAttribute("placeholder")).toEqual("lol");
    });
  });

  describe("autoPlaceholder=polite", () => {
    let iti, input;

    beforeEach(() => {
      const options = { autoPlaceholder: "polite", initialCountry: "af" };
      ({ iti, input } = initIntlTelInput({ options }));
      input.setAttribute("placeholder", "lol");
    });

    afterEach(() => teardown(iti));

    test("placeholder unchanged", async () => {
      expect(input.getAttribute("placeholder")).toEqual("lol");
    });
  });

  describe("autoPlaceholder=aggressive", () => {
    let iti, input;

    beforeEach(() => {
      const options = { autoPlaceholder: "aggressive", initialCountry: "af" };
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
