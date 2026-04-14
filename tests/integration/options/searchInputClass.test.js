/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown, getSearchInput } from "../helpers/helpers";

describe("searchInputClass option", () => {
  let iti, container;

  afterEach(() => teardown(iti));

  test("adds the custom class to the search input", () => {
    ({ iti, container } = initPlugin({
      options: { countrySearch: true, searchInputClass: "my-search" },
    }));
    const search = getSearchInput(container);
    expect(search.classList).toContain("my-search");
    // default class is preserved
    expect(search.classList).toContain("iti__search-input");
  });

  test("defaults to no extra class when not provided", () => {
    ({ iti, container } = initPlugin({ options: { countrySearch: true } }));
    const search = getSearchInput(container);
    // Only the default class is present
    expect(search.className.trim()).toBe("iti__search-input");
  });
});
