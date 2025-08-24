/**
 * @jest-environment jsdom
 */

const { userEvent } = require("@testing-library/user-event");
const {
  initPlugin,
  teardown,
  getCountryListLength,
  totalCountries,
  getSearchInput,
  clickSelectedCountryAsync,
  getCountriesInList,
} = require("../helpers/helpers");

//* Without the advanceTimers bit, the (time related) tests just hang, see https://github.com/jestjs/jest/issues/12056#issuecomment-1090189268
jest.useFakeTimers({advanceTimers: true});

let searchInput, iti, container, user;

describe("countrySearch", () => {
  beforeEach(async () => {
    user = userEvent.setup();
    ({ container, iti } = initPlugin());
    searchInput = getSearchInput(container);
    await clickSelectedCountryAsync(container, user);
  });

  afterEach(() => {
    searchInput = null;
    teardown(iti);
  });

  test("generates the search input", () => {
    expect(searchInput).toBeTruthy();
  });

  test("shows all countries to start with", () => {
    const length = getCountryListLength(container);
    expect(length).toBe(totalCountries);
  });

  test("typing iso2 code, 'gb' filters countries correctly", async () => {
    await user.type(searchInput, "gb");
    //* Allow for the (intentional) 100ms delay on the search handler.
    jest.advanceTimersByTime(100);

    const countriesInList = getCountriesInList(container);
    expect(countriesInList.length).toBe(2);
    expect(countriesInList[0]).toBe("gb");
    expect(countriesInList[1]).toBe("gw");
  });

  test("typing start of country name, 'uk', filters countries correctly", async () => {
    await user.type(searchInput, "uk");
    //* Allow for the (intentional) 100ms delay on the search handler.
    jest.advanceTimersByTime(100);

    // Ukraine comes first because name-starts-with takes priority over initials
    const countriesInList = getCountriesInList(container);
    expect(countriesInList.length).toBe(2);
    expect(countriesInList[0]).toBe("ua");
    expect(countriesInList[1]).toBe("gb");
  });

  test("typing country initials, 'us', filters countries correctly", async () => {
    await user.type(searchInput, "us");
    //* Allow for the (intentional) 100ms delay on the search handler.
    jest.advanceTimersByTime(100);

    const countriesInList = getCountriesInList(container);
    expect(countriesInList.length).toBe(8);
    expect(countriesInList[0]).toBe("us");
    expect(countriesInList[1]).toBe("au");
  });

  test("typing 'sk', filters countries correctly", async () => {
    await user.type(searchInput, "sk");
    //* Allow for the (intentional) 100ms delay on the search handler.
    jest.advanceTimersByTime(100);

    const countriesInList = getCountriesInList(container);
    expect(countriesInList.length).toBe(3);
    expect(countriesInList[0]).toBe("sk"); // Slovakia first to iso2 match
    expect(countriesInList[1]).toBe("kr"); // South Korea second due to initials
  });

  test("typing 'bar', filters countries correctly", async () => {
    await user.type(searchInput, "bar");
    //* Allow for the (intentional) 100ms delay on the search handler.
    jest.advanceTimersByTime(100);

    const countriesInList = getCountriesInList(container);
    expect(countriesInList.length).toBe(4);
    expect(countriesInList[0]).toBe("bb"); // Barbados first as name-starts-with
    expect(countriesInList[1]).toBe("bl"); // St. Barthélemy second as name-contains
  });

  test("typing '44', filters countries correctly", async () => {
    await user.type(searchInput, "44");
    //* Allow for the (intentional) 100ms delay on the search handler.
    jest.advanceTimersByTime(100);

    const countriesInList = getCountriesInList(container);
    expect(countriesInList.length).toBe(5);
    expect(countriesInList[0]).toBe("gb"); // UK (dial code matches, and highest priority)
    expect(countriesInList[4]).toBe("ao"); // Angola +244 (dial code contains)
  });

  test("typing '+44', filters countries correctly", async () => {
    await user.type(searchInput, "+44");
    //* Allow for the (intentional) 100ms delay on the search handler.
    jest.advanceTimersByTime(100);

    const countriesInList = getCountriesInList(container);
    expect(countriesInList.length).toBe(4);
    expect(countriesInList[0]).toBe("gb"); // UK (dial code matches, and highest priority)
  });
});
