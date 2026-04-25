/**
 * @vitest-environment jsdom
 */

import UI from "../../../src/js/core/ui.ts";
import { buildSearchTokens } from "../../../src/js/core/countrySearch.ts";
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
  makeCountry({ iso2: "us", dialCode: "1", name: "United States" }),
  makeCountry({ iso2: "gb", dialCode: "44", name: "United Kingdom" }),
  makeCountry({ iso2: "de", dialCode: "49", name: "Germany" }),
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

  const testCountries = countries.map((c) => ({ ...c }));

  ui.buildMarkup(testCountries, buildSearchTokens(testCountries));
  return { ui, input, countries: testCountries };
};

afterEach(() => {
  document.body.innerHTML = "";
});

// DOM navigation helpers (UI internals are private; probe via the DOM instead).
const getWrapper = (input) => input.parentNode;
const getCountryContainer = (input) =>
  getWrapper(input).querySelector(".iti__country-container");
const getSelectedCountryEl = (input) =>
  getWrapper(input).querySelector(".iti__selected-country");
const getSelectedFlagEl = (input) =>
  getWrapper(input).querySelector(".iti__selected-country .iti__flag");
const getCountryList = (input) =>
  getWrapper(input).querySelector(".iti__country-list");
const getSearchInput = (input) =>
  getWrapper(input).querySelector(".iti__search-input");
const getHiddenInput = (input, name) =>
  input.form?.querySelector(`input[type="hidden"][name="${name}"]`) ||
  getWrapper(input).querySelector(`input[type="hidden"][name="${name}"]`);
const getHighlighted = (input) =>
  getCountryList(input).querySelector(`.${CLASSES.HIGHLIGHT}`);

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

// ── buildMarkup ─────────────────────────────────────────────
describe("UI.buildMarkup", () => {
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
    const { input } = buildUI({ allowDropdown: true });
    const selectedCountryEl = getSelectedCountryEl(input);
    expect(selectedCountryEl.tagName).toBe("BUTTON");
    expect(selectedCountryEl.getAttribute(ARIA.HASPOPUP)).toBe("dialog");
  });

  test("creates selectedCountry div when allowDropdown is false", () => {
    const { input } = buildUI({ allowDropdown: false, showFlags: true });
    expect(getSelectedCountryEl(input).tagName).toBe("DIV");
  });

  test("builds country list with correct number of items", () => {
    const { input } = buildUI();
    expect(getCountryList(input).children.length).toBe(3);
  });

  test("country list items have correct data attributes", () => {
    const { input } = buildUI();
    const first = getCountryList(input).children[0];
    expect(first.dataset.iso2).toBe("us");
    expect(first.dataset.dialCode).toBe("1");
  });

  test("country list items have role=option", () => {
    const { input } = buildUI();
    const first = getCountryList(input).children[0];
    expect(first.getAttribute("role")).toBe("option");
  });

  test("builds search input when countrySearch is true", () => {
    const { input } = buildUI({ countrySearch: true });
    const searchInput = getSearchInput(input);
    expect(searchInput).not.toBeNull();
    expect(searchInput.tagName).toBe("INPUT");
    expect(searchInput.getAttribute("role")).toBe("combobox");
  });

  test("does not build search input when countrySearch is false", () => {
    const { input } = buildUI({ countrySearch: false });
    expect(getSearchInput(input)).toBeNull();
  });

  test("applies containerClass to wrapper", () => {
    const { input } = buildUI({ containerClass: "my-class" });
    expect(input.parentNode.classList.contains("my-class")).toBe(true);
  });

  test("no countryContainer when allowDropdown, showFlags, separateDialCode all false", () => {
    const { input } = buildUI({
      allowDropdown: false,
      showFlags: false,
      separateDialCode: false,
    });
    expect(getCountryContainer(input)).toBeNull();
  });

  test("creates dial code element when separateDialCode is true", () => {
    const { input } = buildUI({ separateDialCode: true });
    const dialCodeEl = getSelectedCountryEl(input).querySelector(".iti__selected-dial-code");
    expect(dialCodeEl).not.toBeNull();
  });

  test("does not create dropdown arrow when allowDropdown is false", () => {
    const { input } = buildUI({ allowDropdown: false, showFlags: true });
    const arrow = getSelectedCountryEl(input).querySelector(".iti__arrow");
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
    const testCountries = countries.map((c) => ({ ...c }));
    ui.buildMarkup(testCountries, buildSearchTokens(testCountries));

    const phoneHidden = getHiddenInput(input, "phone_full");
    const countryHidden = getHiddenInput(input, "phone_country");
    expect(phoneHidden).not.toBeNull();
    expect(countryHidden).not.toBeNull();
  });

  test("does not create hidden inputs when hiddenInput is null", () => {
    const { input } = buildUI({ hiddenInput: null });
    const hiddenInputs = getWrapper(input).querySelectorAll('input[type="hidden"]');
    expect(hiddenInputs.length).toBe(0);
  });
});

// ── highlighting via hover ─────────────────────────────────────
// Highlighting is triggered by a delegated mouseover listener bound when the
// dropdown is open. We verify it via the DOM (HIGHLIGHT class / aria).
describe("UI list-item highlight on hover", () => {
  const hover = (item) => {
    item.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  };

  test("adds highlight class to hovered item", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    const item = getCountryList(input).children[1];
    hover(item);
    expect(item.classList.contains(CLASSES.HIGHLIGHT)).toBe(true);
    expect(getHighlighted(input)).toBe(item);
  });

  test("removes highlight from previous item", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    const first = getCountryList(input).children[0];
    const second = getCountryList(input).children[1];
    hover(first);
    hover(second);
    expect(first.classList.contains(CLASSES.HIGHLIGHT)).toBe(false);
    expect(second.classList.contains(CLASSES.HIGHLIGHT)).toBe(true);
  });

  test("sets aria-activedescendant on search input when countrySearch enabled", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    const item = getCountryList(input).children[1];
    hover(item);
    expect(getSearchInput(input).getAttribute(ARIA.ACTIVE_DESCENDANT)).toBe(
      item.getAttribute("id"),
    );
  });
});

// ── keyboard arrow navigation ──────────────────────────────────
// handleUpDownKey is private; triggered via document keydown while the
// dropdown is open.
describe("UI arrow-key navigation", () => {
  const pressKey = (key) => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
  };

  test("ArrowDown moves to next sibling", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    // openDropdown highlights the first item by default
    pressKey(KEYS.ARROW_DOWN);
    expect(getHighlighted(input)).toBe(getCountryList(input).children[1]);
  });

  test("ArrowUp moves to previous sibling", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    pressKey(KEYS.ARROW_DOWN); // now on children[1]
    pressKey(KEYS.ARROW_UP); // back to children[0]
    expect(getHighlighted(input)).toBe(getCountryList(input).children[0]);
  });

  test("ArrowDown wraps to first item from last", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    const list = getCountryList(input);
    // Move to the last item
    for (let i = 0; i < list.children.length - 1; i++) {
      pressKey(KEYS.ARROW_DOWN);
    }
    expect(getHighlighted(input)).toBe(list.children[list.children.length - 1]);
    pressKey(KEYS.ARROW_DOWN);
    expect(getHighlighted(input)).toBe(list.children[0]);
  });

  test("ArrowUp wraps to last item from first", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    const list = getCountryList(input);
    // openDropdown starts us on the first item
    pressKey(KEYS.ARROW_UP);
    expect(getHighlighted(input)).toBe(list.children[list.children.length - 1]);
  });
});

// ── country search filtering ──────────────────────────────────
// Filtering is private; triggered by typing in the search input (debounced).
describe("UI country search filtering", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const typeInSearch = (searchInput, value) => {
    searchInput.value = value;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    // Advance past the search debounce (TIMINGS.SEARCH_DEBOUNCE_MS = 100).
    vi.advanceTimersByTime(200);
  };

  test("empty query restores all countries", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    const searchInput = getSearchInput(input);
    typeInSearch(searchInput, "united");
    typeInSearch(searchInput, "");
    expect(getCountryList(input).children.length).toBe(3);
  });

  test("filters to matched countries", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    typeInSearch(getSearchInput(input), "germany");
    expect(getCountryList(input).children.length).toBe(1);
    expect(getCountryList(input).children[0].dataset.iso2).toBe("de");
  });

  test("highlights first matched country", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    typeInSearch(getSearchInput(input), "united");
    expect(getHighlighted(input)).toBe(getCountryList(input).children[0]);
  });

  test("clears highlight when no matches", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    typeInSearch(getSearchInput(input), "zzzzz");
    expect(getHighlighted(input)).toBeNull();
    expect(getCountryList(input).children.length).toBe(0);
  });
});

// ── search clear button ───────────────────────────────────────
describe("UI search clear button", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("clicking it clears search input and restores all countries", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});

    const searchInput = getSearchInput(input);
    searchInput.value = "germany";
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    vi.advanceTimersByTime(200);
    expect(getCountryList(input).children.length).toBe(1);

    document.querySelector(".iti__search-clear").click();
    expect(searchInput.value).toBe("");
    expect(getCountryList(input).children.length).toBe(3);
  });
});

// ── setCountry ─────────────────────────────────────────────────
describe("UI.setCountry", () => {
  test("updates flag class for selected country", () => {
    const { ui, input } = buildUI();
    ui.setCountry({ iso2: "gb", dialCode: "44", name: "United Kingdom" });
    expect(getSelectedFlagEl(input).className).toBe("iti__flag iti__gb");
  });

  test("shows globe icon when iso2 is empty", () => {
    const { ui, input } = buildUI();
    ui.setCountry({ iso2: "", dialCode: "", name: "" });
    expect(getSelectedFlagEl(input).className).toContain(CLASSES.GLOBE);
    expect(getSelectedFlagEl(input).innerHTML).toContain("iti__globe-svg");
  });

  test("sets aria-label on selectedCountry", () => {
    const { ui, input } = buildUI();
    ui.setCountry({ iso2: "us", dialCode: "1", name: "United States" });
    const label = getSelectedCountryEl(input).getAttribute(ARIA.LABEL);
    expect(label).toContain("United States");
    expect(label).toContain("+1");
  });

  test("updates dial code element when separateDialCode enabled", () => {
    const { ui, input } = buildUI({ separateDialCode: true });
    ui.setCountry({ iso2: "de", dialCode: "49", name: "Germany" });
    const dialCodeEl = getSelectedCountryEl(input).querySelector(".iti__selected-dial-code");
    expect(dialCodeEl.textContent).toBe("+49");
  });

  test("marks list item as selected with aria and check icon", () => {
    const { ui, input } = buildUI();
    ui.setCountry({ iso2: "gb", dialCode: "44", name: "United Kingdom" });
    const gbItem = getCountryList(input).querySelector("[data-iso2=\"gb\"]");
    expect(gbItem.getAttribute(ARIA.SELECTED)).toBe("true");
    expect(gbItem.querySelector(".iti__country-check")).not.toBeNull();
  });

  test("deselects previous country when selecting a new one", () => {
    const { ui, input } = buildUI();
    ui.setCountry({ iso2: "us", dialCode: "1", name: "United States" });
    ui.setCountry({ iso2: "gb", dialCode: "44", name: "United Kingdom" });

    const usItem = getCountryList(input).querySelector("[data-iso2=\"us\"]");
    const gbItem = getCountryList(input).querySelector("[data-iso2=\"gb\"]");
    expect(usItem.getAttribute(ARIA.SELECTED)).toBe("false");
    expect(usItem.querySelector(".iti__country-check")).toBeNull();
    expect(gbItem.getAttribute(ARIA.SELECTED)).toBe("true");
  });
});

// ── openDropdown / closeDropdown / isDropdownOpen ─────────────
describe("UI dropdown open/close", () => {
  test("isDropdownOpen returns false initially", () => {
    const { ui } = buildUI();
    expect(ui.isDropdownOpen()).toBe(false);
  });

  test("openDropdown makes dropdown visible", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    expect(ui.isDropdownOpen()).toBe(true);
    expect(getSelectedCountryEl(input).getAttribute(ARIA.EXPANDED)).toBe("true");
  });

  test("closeDropdown hides dropdown", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    ui.closeDropdown();
    expect(ui.isDropdownOpen()).toBe(false);
    expect(getSelectedCountryEl(input).getAttribute(ARIA.EXPANDED)).toBe("false");
  });

  test("openDropdown highlights first item when none selected", () => {
    const { ui, input } = buildUI({ dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    expect(getHighlighted(input)).toBe(getCountryList(input).children[0]);
  });

  test("closeDropdown clears search input when countrySearch enabled", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    const searchInput = getSearchInput(input);
    searchInput.value = "test";
    ui.closeDropdown();
    expect(searchInput.value).toBe("");
  });

  test("closeDropdown resets highlighted item when countrySearch enabled", () => {
    const { ui, input } = buildUI({ countrySearch: true, dropdownAlwaysOpen: true });
    ui.openDropdown(() => {}, () => {});
    ui.closeDropdown();
    expect(getHighlighted(input)).toBeNull();
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

  test("restores original paddingLeft when separateDialCode was enabled", () => {
    const input = document.createElement("input");
    input.style.paddingLeft = "20px";
    document.body.appendChild(input);

    const options = makeOptions({ separateDialCode: true });
    const ui = new UI(input, options, 2);
    const testCountries = countries.map((c) => ({ ...c }));
    ui.buildMarkup(testCountries, buildSearchTokens(testCountries));

    // paddingLeft will have been overwritten by buildMarkup
    expect(input.style.paddingLeft).not.toBe("20px");
    ui.destroy();
    expect(input.style.paddingLeft).toBe("20px");
  });
});

// ── scroll behavior ────────────────────────────────────────────
describe("UI dropdown scroll behavior", () => {
  test("openDropdown does not throw when scrolling highlighted item into view", () => {
    // openDropdown internally calls scrollCountryListToItem on the first item.
    const { ui } = buildUI({ dropdownAlwaysOpen: true });
    expect(() => ui.openDropdown(() => {}, () => {})).not.toThrow();
  });
});

// ── disabled input ─────────────────────────────────────────────
describe("UI with disabled input", () => {
  test("disables the selectedCountry button when input is disabled", () => {
    const { input } = buildUI({}, { disabled: "true" });
    expect(getSelectedCountryEl(input).getAttribute("disabled")).toBe("true");
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
    const testCountries = countries.map((c) => ({ ...c }));
    ui.buildMarkup(testCountries, buildSearchTokens(testCountries));

    const wrapper = input.parentNode;
    expect(wrapper.getAttribute("dir")).toBe("ltr");
  });
});

// ── showFlags: false ───────────────────────────────────────────
describe("UI with showFlags: false", () => {
  test("does not render flag divs in country list items", () => {
    const { input } = buildUI({ showFlags: false });
    const firstItem = getCountryList(input).children[0];
    const flagEl = firstItem.querySelector(`.${CLASSES.FLAG}`);
    expect(flagEl).toBeNull();
  });

  test("setCountry uses globe class when showFlags is false and iso2 is set", () => {
    const { ui, input } = buildUI({ showFlags: false });
    ui.setCountry({ iso2: "us", dialCode: "1", name: "United States" });
    expect(getSelectedFlagEl(input).className).toContain(CLASSES.GLOBE);
  });
});
