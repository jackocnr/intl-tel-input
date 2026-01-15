/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, clickSelectedCountryAsync, getSearchInput } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

// i18n: custom strings should override defaults (placeholder text, labels, and a country name override)
describe("i18n option", () => {
  let iti, container, user;
  const options = {
    i18n: {
      searchPlaceholder: "Chercher pays",
      clearSearchAriaLabel: "Effacer la recherche",
      searchEmptyState: "Aucun résultat",
      searchSummaryAria: (count) => `Résumé: ${count}`,
      fr: "République Française",
    },
  };

  beforeEach(() => {
    ({ iti, container } = initPlugin({ options }));
    user = userEvent.setup();
  });
  afterEach(() => teardown(iti));

  test("overrides country name", () => {
    const frItem = container.querySelector("li[data-country-code='fr'] .iti__country-name");
    expect(frItem.textContent).toContain("République Française");
  });

  test("search input placeholder overridden", () => {
    const searchInput = getSearchInput(container);
    expect(searchInput.getAttribute("placeholder")).toBe("Chercher pays");
  });

  test("clear search button aria-label overridden", () => {
    const clearButton = container.querySelector(".iti__search-clear");
    expect(clearButton.getAttribute("aria-label")).toBe("Effacer la recherche");
  });

  test("no-results message and a11y summary use i18n strings", async () => {
    // open dropdown and type a nonsense search to get no results
    await clickSelectedCountryAsync(container, user);
    const searchInput = getSearchInput(container);
    await user.type(searchInput, "zzzzzz");

    // Filtering is debounced in the implementation.
    await new Promise((resolve) => setTimeout(resolve, 150));

    const noResults = container.querySelector(".iti__no-results");
    expect(noResults).toHaveTextContent("Aucun résultat");
    expect(noResults.classList.contains("iti__hide")).toBe(false);

    const a11yText = container.querySelector(".iti__a11y-text");
    expect(a11yText).toHaveTextContent("Résumé: 0");
  });
});
