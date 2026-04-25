/**
 * @vitest-environment jsdom
 */
import { userEvent } from "@testing-library/user-event";
import { initPlugin, teardown, openDropdownSelectCountryAsync } from "../helpers/helpers";

describe("customPlaceholder option", () => {
  let iti, input, container, user;
  const options = {
    autoPlaceholder: "polite",
    initialCountry: "af",
    customPlaceholder: (p) => `e.g. ${p}`,
  };

  beforeEach(() => {
    user = userEvent.setup();
    ({ iti, input, container } = initPlugin({ options }));
  });

  afterEach(() => teardown(iti));

  test("customises placeholder and updates on country change", async () => {
    expect(input.getAttribute("placeholder")).toEqual("e.g. 70 123 4567");
    await openDropdownSelectCountryAsync(container, "gb", user);
    expect(input.getAttribute("placeholder")).toEqual("e.g. 7400 123456");
  });
});

describe("customPlaceholder with empty country (globe state)", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("receives null countryData and empty placeholder when no country selected", () => {
    const calls = [];
    const options = {
      autoPlaceholder: "polite",
      customPlaceholder: (p, countryData) => {
        calls.push({ p, countryData });
        return `pl:${p}`;
      },
    };
    const { iti, input } = initPlugin({ options });
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0].countryData).toBeNull();
    expect(calls[0].p).toEqual("");
    expect(input.getAttribute("placeholder")).toEqual("pl:");
    iti.destroy();
  });
});
