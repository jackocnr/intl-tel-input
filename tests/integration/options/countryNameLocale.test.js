/**
 * @jest-environment jsdom
 */
const { initPlugin, teardown, getCountriesInList, clickSelectedCountryAsync, getSearchInput } = require("../helpers/helpers");
const { userEvent } = require("@testing-library/user-event");

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
      "li[data-country-code='us'] .iti__country-name",
    );
    expect(usNameEl).toBeTruthy();
    // In French, US is "États-Unis".
    expect(usNameEl.textContent).toBe("États-Unis+1"); // NOTE: we now put the dial code inside the country name span
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
