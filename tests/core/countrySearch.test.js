/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  getCountryListLength,
  totalCountries,
  checkFlagSelected,
  getSelectedCountryButton,
  getSearchInput,
} = require("../helpers/helpers");

//* Without the advanceTimers bit, the (time related) tests just hang, see https://github.com/jestjs/jest/issues/12056#issuecomment-1090189268
jest.useFakeTimers({advanceTimers: true});

let iti, container, user;

describe("countrySearch", () => {
  beforeEach(() => {
    user = userEvent.setup();
    ({ container, iti } = initPlugin());
  });
      
  afterEach(() => {
    teardown(iti);
  });
  
  test("generates the search input", () => {
    const searchInput = getSearchInput(container);
    expect(searchInput).toBeTruthy();
  });
  
  test("shows all countries to start with", () => {
    const length = getCountryListLength(container);
    expect(length).toBe(totalCountries);
  });

  describe("opening the dropdown and typing 'x' in the search input", () => {
    beforeEach(async () => {
      const selectedCountryButton = getSelectedCountryButton(container);
      const searchInput = getSearchInput(container);

      //* Open the dropdown and type in the search input.
      await user.click(selectedCountryButton);
      await user.type(searchInput, "x");

      //* Allow for the (intentional) 100ms delay on the search handler.
      jest.advanceTimersByTime(100);
    });
    
    test("shows the right number of results", () => {
      expect(getCountryListLength(container)).toBe(6);
    });
      
    test("hitting Enter selects Aland Islands", async () => {
      const searchInput = getSearchInput(container);
      await user.type(searchInput, "{enter}");
      expect(checkFlagSelected(container, "ax")).toBe(true);
    });
  });
});
