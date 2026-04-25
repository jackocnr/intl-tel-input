/**
 * @vitest-environment jsdom
 */
import { initPlugin, teardown, getCountriesInList, clickSelectedCountryAsync, getSearchInput } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";

describe("countryNameLocale = fr", () => {
  let iti, container, user;
  const options = {
    countryNameLocale: "fr",
  };

  beforeEach(() => {
    ({ iti, container } = initPlugin({ options }));
    user = userEvent.setup();
  });

  afterEach(() => teardown(iti));

  test("uses Intl.DisplayNames to generate country names in French", () => {
    const usNameEl = container.querySelector(
      "li[data-iso2='us'] .iti__country-name",
    );
    expect(usNameEl).toBeTruthy();
    // In French, US is "États-Unis".
    expect(usNameEl.textContent).toBe("États-Unis (+1)");
  });

  test("country search matches without accents", async () => {
    // Open dropdown so the search input is interactive.
    await clickSelectedCountryAsync(container, user);
    const searchInput = getSearchInput(container);

    // In French, US is typically "États-Unis"; searching without accents should still match.
    await user.type(searchInput, "etats");
    const visibleIso2s = getCountriesInList(container);
    expect(visibleIso2s).toContain("us");
  });
});
