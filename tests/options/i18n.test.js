/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown } = require("../helpers/helpers");

// i18n: custom strings should override defaults (placeholder text, labels, and a country name override)
describe("i18n option", () => {
  let iti, container;
  const options = {
    i18n: {
      searchPlaceholder: "Chercher pays",
      fr: "République Française",
    },
  };

  beforeEach(() => {
    ({ iti, container } = initPlugin({ options }));
  });
  afterEach(() => teardown(iti));

  test("overrides country name", () => {
    const frItem = container.querySelector("li[data-country-code='fr'] .iti__country-name");
    expect(frItem.textContent).toContain("République Française");
  });

  test("search input placeholder overridden", () => {
    const searchInput = container.querySelector(".iti__search-input");
    expect(searchInput.getAttribute("placeholder")).toBe("Chercher pays");
  });
});
