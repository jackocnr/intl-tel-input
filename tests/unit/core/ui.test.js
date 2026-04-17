/**
 * @vitest-environment jsdom
 */

import UI from "../../../src/js/core/ui.ts";
import { CLASSES, ARIA, KEYS } from "../../../src/js/constants.ts";
import defaultEnglishStrings from "../../../src/js/i18n/en.ts";

// Helper to create a Country-like object
const makeCountry = (overrides) => ({
  iso2: "aa",
  dialCode: "1",
  priority: 0,
  areaCodes: null,
  nationalPrefix: null,
  name: "Test Country",
  normalisedName: "test country",
  dialCodePlus: "+1",
  initials: "tc",
  listItemByInstanceId: {},
  ...overrides,
});

// Helper: minimal merged options (mirrors what applyOptionSideEffects produces)
const makeOptions = (overrides = {}) => ({
  allowDropdown: true,
  allowedNumberTypes: ["MOBILE", "FIXED_LINE"],
  allowNumberExtensions: false,
  allowPhonewords: false,
  autoPlaceholder: "polite",
  containerClass: "",
  countryNameLocale: "en",
  countryOrder: null,
  countrySearch: true,
  customPlaceholder: null,
  dropdownAlwaysOpen: false,
  dropdownContainer: null,
  excludeCountries: null,
  fixDropdownWidth: true,
  formatAsYouType: true,
  formatOnDisplay: true,
  geoIpLookup: null,
  hiddenInput: null,
  i18n: { ...defaultEnglishStrings },
  initialCountry: "",
  loadUtils: null,
  nationalMode: true,
  onlyCountries: null,
  placeholderNumberType: "MOBILE",
  searchInputClass: "",
  separateDialCode: false,
  showFlags: true,
  strictMode: false,
  useFullscreenPopup: false,
  ...overrides,
});

const countries = [
  makeCountry({
    iso2: "us",
    dialCode: "1",
    name: "United States",
    normalisedName: "united states",
    dialCodePlus: "+1",
    initials: "us",
  }),
  makeCountry({
    iso2: "gb",
    dialCode: "44",
    name: "United Kingdom",
    normalisedName: "united kingdom",
    dialCodePlus: "+44",
    initials: "uk",
  }),
  makeCountry({
    iso2: "de",
    dialCode: "49",
    name: "Germany",
    normalisedName: "germany",
    dialCodePlus: "+49",
    initials: "g",
  }),
];

// Helper: create an input, build UI, and return { ui, input, wrapper }
const buildUI = (optionOverrides = {}, inputAttrs = {}) => {
  const input = document.createElement("input");
  for (const [k, v] of Object.entries(inputAttrs)) {
    input.setAttribute(k, v);
  }
  document.body.appendChild(input);

  const options = makeOptions(optionOverrides);
  const ui = new UI(input, options, 0);

  // Each country needs its own listItemByInstanceId map per instance
  const testCountries = countries.map((c) => ({
    ...c,
    listItemByInstanceId: { ...c.listItemByInstanceId },
  }));

  ui.generateMarkup(testCountries);
  return { ui, input, countries: testCountries };
};

afterEach(() => {
  document.body.innerHTML = "";
});

// ── validateInput ──────────────────────────────────────────────
describe("UI.validateInput", () => {
  test("accepts a real input element", () => {
    const input = document.createElement("input");
    expect(() => UI.validateInput(input)).not.toThrow();
  });

  test("throws for null", () => {
    expect(() => UI.validateInput(null)).toThrow(TypeError);
  });

  test("throws for a non-input element", () => {
    const div = document.createElement("div");
    expect(() => UI.validateInput(div)).toThrow(TypeError);
  });

  test("throws for a plain object", () => {
    expect(() => UI.validateInput({ tagName: "INPUT" })).toThrow(TypeError);
  });

  test("throws for a string", () => {
    expect(() => UI.validateInput("#my-input")).toThrow(TypeError);
  });
});

// ── generateMarkup ─────────────────────────────────────────────
describe("UI.generateMarkup", () => {
  test("wraps input in iti container", () => {
    const { input } = buildUI();
    const wrapper = input.parentNode;
    expect(wrapper.classList.contains("iti")).toBe(true);
  });

  test("sets default tel attributes when not already present", () => {
    const { input } = buildUI();
    expect(input.getAttribute("type")).toBe("tel");
    expect(input.getAttribute("autocomplete")).toBe("tel");
    expect(input.getAttribute("inputmode")).toBe("tel");
  });

  test("preserves existing type attribute", () => {
    const { input } = buildUI({}, { type: "text" });
    expect(input.getAttribute("type")).toBe("text");
  });

  test("adds iti__tel-input class to input", () => {
    const { input } = buildUI();
    expect(input.classList.contains("iti__tel-input")).toBe(true);
  });

  test("creates selectedCountry button when allowDropdown is true", () => {
    const { ui } = buildUI({ allowDropdown: true });
    expect(ui.selectedCountryEl.tagName).toBe("BUTTON");
    expect(ui.selectedCountryEl.getAttribute(ARIA.HASPOPUP)).toBe("dialog");
  });

  test("creates selectedCountry div when allowDropdown is false", () => {
    const { ui } = buildUI({ allowDropdown: false, showFlags: true });
    expect(ui.selectedCountryEl.tagName).toBe("DIV");
  });

  test("builds country list with correct number of items", () => {
    const { ui } = buildUI();
    expect(ui.countryList.children.length).toBe(3);
  });

  test("country list items have correct data attributes", () => {
    const { ui } = buildUI();
    const first = ui.countryList.children[0];
    expect(first.dataset.countryCode).toBe("us");
    expect(first.dataset.dialCode).toBe("1");
  });

  test("country list items have role=option", () => {
    const { ui } = buildUI();
    const first = ui.countryList.children[0];
    expect(first.getAttribute("role")).toBe("option");
  });

  test("builds search input when countrySearch is true", () => {
    const { ui } = buildUI({ countrySearch: true });
    expect(ui.searchInput).toBeDefined();
    expect(ui.searchInput.tagName).toBe("INPUT");
    expect(ui.searchInput.getAttribute("role")).toBe("combobox");
  });

  test("does not build search input when countrySearch is false", () => {
    const { ui } = buildUI({ countrySearch: false });
    expect(ui.searchInput).toBeUndefined();
  });

  test("applies containerClass to wrapper", () => {
    const { input } = buildUI({ containerClass: "my-class" });
    expect(input.parentNode.classList.contains("my-class")).toBe(true);
  });

  test("no countryContainer when allowDropdown, showFlags, separateDialCode all false", () => {
    const { ui } = buildUI({
      allowDropdown: false,
      showFlags: false,
      separateDialCode: false,
    });
    expect(ui.countryContainer).toBeUndefined();
  });

  test("creates dial code element when separateDialCode is true", () => {
    const { ui } = buildUI({ separateDialCode: true });
    const dialCodeEl = ui.selectedCountryEl.querySelector(".iti__selected-dial-code");
    expect(dialCodeEl).not.toBeNull();
  });

  test("does not create dropdown arrow when allowDropdown is false", () => {
    const { ui } = buildUI({ allowDropdown: false, showFlags: true });
    const arrow = ui.selectedCountryEl.querySelector(".iti__arrow");
    expect(arrow).toBeNull();
  });
});

// ── Hidden inputs ──────────────────────────────────────────────
describe("UI hidden inputs", () => {
  test("creates hidden phone and country inputs", () => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.setAttribute("name", "phone");
    form.appendChild(input);
    document.body.appendChild(form);

    const options = makeOptions({
      hiddenInput: (name) => ({ phone: `${name}_full`, country: `${name}_country` }),
    });
    const ui = new UI(input, options, 1);
    const testCountries = countries.map((c) => ({ ...c, listItemByInstanceId: {} }));
    ui.generateMarkup(testCountries);

    expect(ui.hiddenInputPhone).toBeDefined();
    expect(ui.hiddenInputPhone.getAttribute("name")).toBe("phone_full");
    expect(ui.hiddenInputCountry).toBeDefined();
    expect(ui.hiddenInputCountry.getAttribute("name")).toBe("phone_country");
  });

  test("does not create hidden inputs when hiddenInput is null", () => {
    const { ui } = buildUI({ hiddenInput: null });
    expect(ui.hiddenInputPhone).toBeUndefined();
    expect(ui.hiddenInputCountry).toBeUndefined();
  });
});

// ── highlightListItem ──────────────────────────────────────────
describe("UI.highlightListItem", () => {
  test("adds highlight class to item", () => {
    const { ui } = buildUI();
    const item = ui.countryList.children[0];
    ui.highlightListItem(item, false);
    expect(item.classList.contains(CLASSES.HIGHLIGHT)).toBe(true);
    expect(ui.highlightedListItem).toBe(item);
  });

  test("removes highlight from previous item", () => {
    const { ui } = buildUI();
    const first = ui.countryList.children[0];
    const second = ui.countryList.children[1];
    ui.highlightListItem(first, false);
    ui.highlightListItem(second, false);
    expect(first.classList.contains(CLASSES.HIGHLIGHT)).toBe(false);
    expect(second.classList.contains(CLASSES.HIGHLIGHT)).toBe(true);
  });

  test("clears highlight when called with null", () => {
    const { ui } = buildUI();
    const item = ui.countryList.children[0];
    ui.highlightListItem(item, false);
    ui.highlightListItem(null, false);
    expect(item.classList.contains(CLASSES.HIGHLIGHT)).toBe(false);
    expect(ui.highlightedListItem).toBeNull();
  });

  test("sets aria-activedescendant on search input when countrySearch enabled", () => {
    const { ui } = buildUI({ countrySearch: true });
    const item = ui.countryList.children[1];
    ui.highlightListItem(item, false);
    expect(ui.searchInput.getAttribute(ARIA.ACTIVE_DESCENDANT)).toBe(
      item.getAttribute("id"),
    );
  });

  test("focuses item when shouldFocus is true", () => {
    const { ui } = buildUI();
    const item = ui.countryList.children[0];
    const focusSpy = vi.spyOn(item, "focus");
    ui.highlightListItem(item, true);
    expect(focusSpy).toHaveBeenCalled();
  });
});

// ── handleUpDownKey ────────────────────────────────────────────
describe("UI.handleUpDownKey", () => {
  test("ArrowDown moves to next sibling", () => {
    const { ui } = buildUI();
    ui.highlightListItem(ui.countryList.children[0], false);
    ui.handleUpDownKey(KEYS.ARROW_DOWN);
    expect(ui.highlightedListItem).toBe(ui.countryList.children[1]);
  });

  test("ArrowUp moves to previous sibling", () => {
    const { ui } = buildUI();
    ui.highlightListItem(ui.countryList.children[1], false);
    ui.handleUpDownKey(KEYS.ARROW_UP);
    expect(ui.highlightedListItem).toBe(ui.countryList.children[0]);
  });

  test("ArrowDown wraps to first item from last", () => {
    const { ui } = buildUI();
    const last = ui.countryList.children[ui.countryList.children.length - 1];
    ui.highlightListItem(last, false);
    ui.handleUpDownKey(KEYS.ARROW_DOWN);
    expect(ui.highlightedListItem).toBe(ui.countryList.children[0]);
  });

  test("ArrowUp wraps to last item from first", () => {
    const { ui } = buildUI();
    ui.highlightListItem(ui.countryList.children[0], false);
    ui.handleUpDownKey(KEYS.ARROW_UP);
    expect(ui.highlightedListItem).toBe(
      ui.countryList.children[ui.countryList.children.length - 1],
    );
  });
});

// ── filterCountriesByQuery ─────────────────────────────────────
describe("UI.filterCountriesByQuery", () => {
  test("empty query restores all countries", () => {
    const { ui } = buildUI();
    ui.filterCountriesByQuery("united");
    ui.filterCountriesByQuery("");
    expect(ui.countryList.children.length).toBe(3);
  });

  test("filters to matched countries", () => {
    const { ui } = buildUI();
    ui.filterCountriesByQuery("germany");
    expect(ui.countryList.children.length).toBe(1);
    expect(ui.countryList.children[0].dataset.countryCode).toBe("de");
  });

  test("highlights first matched country", () => {
    const { ui } = buildUI();
    ui.filterCountriesByQuery("united");
    expect(ui.highlightedListItem).toBe(ui.countryList.children[0]);
  });

  test("clears highlight when no matches", () => {
    const { ui } = buildUI();
    ui.highlightListItem(ui.countryList.children[0], false);
    ui.filterCountriesByQuery("zzzzz");
    expect(ui.highlightedListItem).toBeNull();
    expect(ui.countryList.children.length).toBe(0);
  });
});

// ── handleSearchClear ──────────────────────────────────────────
describe("UI.handleSearchClear", () => {
  test("clears search input and restores all countries", () => {
    const { ui } = buildUI({ countrySearch: true });
    ui.searchInput.value = "germany";
    ui.filterCountriesByQuery("germany");
    expect(ui.countryList.children.length).toBe(1);

    ui.handleSearchClear();
    expect(ui.searchInput.value).toBe("");
    expect(ui.countryList.children.length).toBe(3);
  });
});

// ── setCountry ─────────────────────────────────────────────────
describe("UI.setCountry", () => {
  test("updates flag class for selected country", () => {
    const { ui } = buildUI();
    ui.setCountry({ iso2: "gb", dialCode: "44", name: "United Kingdom" });
    expect(ui.selectedFlagEl.className).toBe("iti__flag iti__gb");
  });

  test("shows globe icon when iso2 is empty", () => {
    const { ui } = buildUI();
    ui.setCountry({ iso2: "", dialCode: "", name: "" });
    expect(ui.selectedFlagEl.className).toContain(CLASSES.GLOBE);
    expect(ui.selectedFlagEl.innerHTML).toContain("iti__globe-svg");
  });

  test("sets aria-label on selectedCountry", () => {
    const { ui } = buildUI();
    ui.setCountry({ iso2: "us", dialCode: "1", name: "United States" });
    const label = ui.selectedCountryEl.getAttribute(ARIA.LABEL);
    expect(label).toContain("United States");
    expect(label).toContain("+1");
  });

  test("updates dial code element when separateDialCode enabled", () => {
    const { ui } = buildUI({ separateDialCode: true });
    ui.setCountry({ iso2: "de", dialCode: "49", name: "Germany" });
    const dialCodeEl = ui.selectedCountryEl.querySelector(".iti__selected-dial-code");
    expect(dialCodeEl.textContent).toBe("+49");
  });

  test("marks list item as selected with aria and check icon", () => {
    const { ui } = buildUI();
    ui.setCountry({ iso2: "gb", dialCode: "44", name: "United Kingdom" });
    const gbItem = ui.countryList.querySelector("[data-country-code=\"gb\"]");
    expect(gbItem.getAttribute(ARIA.SELECTED)).toBe("true");
    expect(gbItem.querySelector(".iti__country-check")).not.toBeNull();
  });

  test("deselects previous country when selecting a new one", () => {
    const { ui } = buildUI();
    ui.setCountry({ iso2: "us", dialCode: "1", name: "United States" });
    ui.setCountry({ iso2: "gb", dialCode: "44", name: "United Kingdom" });

    const usItem = ui.countryList.querySelector("[data-country-code=\"us\"]");
    const gbItem = ui.countryList.querySelector("[data-country-code=\"gb\"]");
    expect(usItem.getAttribute(ARIA.SELECTED)).toBe("false");
    expect(usItem.querySelector(".iti__country-check")).toBeNull();
    expect(gbItem.getAttribute(ARIA.SELECTED)).toBe("true");
  });
});

// ── openDropdown / closeDropdown / isDropdownClosed ─────────────
describe("UI dropdown open/close", () => {
  test("isDropdownClosed returns true initially", () => {
    const { ui } = buildUI();
    expect(ui.isDropdownClosed()).toBe(true);
  });

  test("openDropdown makes dropdown visible", () => {
    const { ui } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown();
    expect(ui.isDropdownClosed()).toBe(false);
    expect(ui.selectedCountryEl.getAttribute(ARIA.EXPANDED)).toBe("true");
  });

  test("closeDropdown hides dropdown", () => {
    const { ui } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown();
    ui.closeDropdown();
    expect(ui.isDropdownClosed()).toBe(true);
    expect(ui.selectedCountryEl.getAttribute(ARIA.EXPANDED)).toBe("false");
  });

  test("openDropdown highlights first item when none selected", () => {
    const { ui } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown();
    expect(ui.highlightedListItem).toBe(ui.countryList.children[0]);
  });

  test("closeDropdown clears search input when countrySearch enabled", () => {
    const { ui } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown();
    ui.searchInput.value = "test";
    ui.closeDropdown();
    expect(ui.searchInput.value).toBe("");
  });

  test("closeDropdown resets highlighted item when countrySearch enabled", () => {
    const { ui } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown();
    ui.closeDropdown();
    expect(ui.highlightedListItem).toBeNull();
  });
});

// ── destroy ────────────────────────────────────────────────────
describe("UI.destroy", () => {
  test("removes wrapper and restores input to its original position", () => {
    const { ui, input } = buildUI();
    expect(input.parentNode.classList.contains("iti")).toBe(true);
    ui.destroy();
    expect(input.parentNode).toBe(document.body);
    expect(document.querySelector(".iti")).toBeNull();
  });

  test("clears data-intl-tel-input-id from input", () => {
    const { ui, input } = buildUI();
    expect(input.dataset.intlTelInputId).toBeDefined();
    ui.destroy();
    expect(input.dataset.intlTelInputId).toBeUndefined();
  });

  test("clears listItemByInstanceId references on countries", () => {
    const { ui, countries: testCountries } = buildUI();
    // After markup, listItemByInstanceId[0] should be set
    expect(testCountries[0].listItemByInstanceId[0]).toBeDefined();
    ui.destroy();
    expect(testCountries[0].listItemByInstanceId[0]).toBeUndefined();
  });

  test("restores original paddingLeft when separateDialCode was enabled", () => {
    const input = document.createElement("input");
    input.style.paddingLeft = "20px";
    document.body.appendChild(input);

    const options = makeOptions({ separateDialCode: true });
    const ui = new UI(input, options, 2);
    const testCountries = countries.map((c) => ({ ...c, listItemByInstanceId: {} }));
    ui.generateMarkup(testCountries);

    // paddingLeft will have been overwritten by generateMarkup
    expect(input.style.paddingLeft).not.toBe("20px");
    ui.destroy();
    expect(input.style.paddingLeft).toBe("20px");
  });
});

// ── scrollCountryListToItem ────────────────────────────────────
describe("UI.scrollCountryListToItem", () => {
  test("does not throw for visible items", () => {
    const { ui } = buildUI();
    const item = ui.countryList.children[0];
    // In jsdom, getBoundingClientRect returns zeros, but we just verify no error
    expect(() => ui.scrollCountryListToItem(item)).not.toThrow();
  });
});

// ── disabled input ─────────────────────────────────────────────
describe("UI with disabled input", () => {
  test("disables the selectedCountry button when input is disabled", () => {
    const { ui } = buildUI({}, { disabled: "true" });
    expect(ui.selectedCountryEl.getAttribute("disabled")).toBe("true");
  });
});

// ── RTL ────────────────────────────────────────────────────────
describe("UI RTL support", () => {
  test("sets dir=ltr on wrapper when input is inside RTL container", () => {
    const rtlContainer = document.createElement("div");
    rtlContainer.setAttribute("dir", "rtl");
    document.body.appendChild(rtlContainer);

    const input = document.createElement("input");
    rtlContainer.appendChild(input);

    const options = makeOptions();
    const ui = new UI(input, options, 3);
    const testCountries = countries.map((c) => ({ ...c, listItemByInstanceId: {} }));
    ui.generateMarkup(testCountries);

    const wrapper = input.parentNode;
    expect(wrapper.getAttribute("dir")).toBe("ltr");
  });
});

// ── showFlags: false ───────────────────────────────────────────
describe("UI with showFlags: false", () => {
  test("does not render flag divs in country list items", () => {
    const { ui } = buildUI({ showFlags: false });
    const firstItem = ui.countryList.children[0];
    const flagEl = firstItem.querySelector(`.${CLASSES.FLAG}`);
    expect(flagEl).toBeNull();
  });

  test("setCountry uses globe class when showFlags is false and iso2 is set", () => {
    const { ui } = buildUI({ showFlags: false });
    ui.setCountry({ iso2: "us", dialCode: "1", name: "United States" });
    expect(ui.selectedFlagEl.className).toContain(CLASSES.GLOBE);
  });
});
