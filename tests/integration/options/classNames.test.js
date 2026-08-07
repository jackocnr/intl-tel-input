/**
 * @vitest-environment jsdom
 */
import { initIntlTelInput, teardown, clickSelectedCountryAsync } from "../helpers/helpers";
import { userEvent } from "@testing-library/user-event";
import { ITI_SLOTS } from "../../../packages/core/src/js/constants.ts";

//* Every slot, paired with a selector for our own class on that element, so we
//* assert the consumer class is *added* rather than replacing our own.
const SLOT_SELECTORS = {
  container: ".iti",
  input: ".iti__tel-input",
  countryContainer: ".iti__country-container",
  selectedCountry: ".iti__selected-country",
  selectedCountryPrimary: ".iti__selected-country-primary",
  selectedFlag: ".iti__selected-country-primary .iti__flag",
  arrow: ".iti__arrow",
  selectedDialCode: ".iti__selected-dial-code",
  countrySelector: ".iti__country-selector",
  searchWrapper: ".iti__search-input-wrapper",
  searchIcon: ".iti__search-icon",
  searchInput: ".iti__search-input",
  searchClear: ".iti__search-clear",
  countryList: ".iti__country-list",
  countryListItem: ".iti__country-list .iti__country",
  countryListItemFlag: ".iti__country-list .iti__country .iti__flag",
  countryName: ".iti__country-name",
  dialCode: ".iti__dial-code",
  countryCheck: ".iti__country-check",
  noResults: ".iti__no-results",
};

//* Slots that can't be asserted in the default inline rendering, so are covered
//* by their own describe blocks below.
const SLOTS_COVERED_SEPARATELY = ["countrySelectorContainer"];

describe("classNames option", () => {
  test("every slot is covered by this test file", () => {
    const covered = [...Object.keys(SLOT_SELECTORS), ...SLOTS_COVERED_SEPARATELY];
    expect([...ITI_SLOTS].sort()).toEqual(covered.sort());
  });

  describe("every slot", () => {
    let iti, container;

    beforeEach(() => {
      const classNames = Object.fromEntries(
        Object.keys(SLOT_SELECTORS).map((slot) => [slot, `custom-${slot}`]),
      );
      //* initialCountry so the check icon (only added to the selected country) exists.
      const options = { classNames, initialCountry: "gb", separateDialCode: true };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test.each(Object.entries(SLOT_SELECTORS))(
      "adds the custom class to the %s slot",
      (slot, selector) => {
        //* Query from the container's parent, so the ".iti" container matches too.
        const el = container.parentElement.querySelector(selector);
        expect(el).not.toBeNull();
        expect(el.classList).toContain(`custom-${slot}`);
      },
    );
  });

  describe("selectedFlag when the country changes", () => {
    let iti, container;

    beforeEach(() => {
      const options = { classNames: { selectedFlag: "custom-flag" }, initialCountry: "gb" };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("survives the flag class being rewritten on country change", () => {
      const flag = container.querySelector(".iti__selected-country-primary .iti__flag");
      expect(flag.classList).toContain("custom-flag");

      iti.setSelectedCountry("fr");

      expect(flag.classList).toContain("iti__fr");
      expect(flag.classList).toContain("custom-flag");
    });

  });

  describe("selectedFlag with no country selected", () => {
    let iti, container;

    beforeEach(() => {
      const options = { classNames: { selectedFlag: "custom-flag" } };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("is applied alongside the globe icon class", () => {
      const flag = container.querySelector(".iti__selected-country-primary .iti__flag");
      expect(flag.classList).toContain("iti__globe");
      expect(flag.classList).toContain("custom-flag");
    });
  });

  describe("countryCheck moves with the selection", () => {
    let iti, container;

    beforeEach(() => {
      const options = { classNames: { countryCheck: "custom-check" }, initialCountry: "gb" };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("applies to the newly selected country's check icon", () => {
      iti.setSelectedCountry("fr");

      const check = container.querySelector('[data-iso2="fr"] .iti__country-check');
      expect(check).not.toBeNull();
      expect(check.classList).toContain("custom-check");
    });
  });

  describe("multiple classes per slot", () => {
    let iti, container;

    beforeEach(() => {
      const options = { classNames: { selectedCountry: "rounded-l-lg border-2" } };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds each class", () => {
      const el = container.querySelector(".iti__selected-country");
      expect(el.classList).toContain("rounded-l-lg");
      expect(el.classList).toContain("border-2");
      expect(el.classList).toContain("iti__selected-country");
    });
  });

  describe("untidy whitespace in a slot value", () => {
    let iti, input;

    beforeEach(() => {
      //* The input uses classList.add, which throws on empty tokens.
      const options = { classNames: { input: "  foo   bar  " } };
      ({ iti, input } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds each class without throwing", () => {
      expect(input.classList).toContain("foo");
      expect(input.classList).toContain("bar");
      expect(input.classList).toContain("iti__tel-input");
    });
  });

  describe("with fullscreen popup", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        classNames: {
          countrySelector: "custom-selector",
          countrySelectorContainer: "custom-selector-container",
        },
        countrySelectorMode: "FULLSCREEN",
      };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("adds the classes to the detached country selector and its container", async () => {
      await clickSelectedCountryAsync(container, user);
      const root = container.ownerDocument;
      expect(root.querySelector(".iti__country-selector").classList).toContain(
        "custom-selector",
      );
      expect(root.querySelector(".iti--detached-country-selector").classList).toContain(
        "custom-selector-container",
      );
    });
  });

  describe("countrySelectorContainer with an inline dropdown", () => {
    let iti, container;

    beforeEach(() => {
      //* No detached wrapper exists for a normal inline dropdown, so the slot is a no-op.
      const options = {
        classNames: { countrySelectorContainer: "custom-selector-container" },
        countrySelectorMode: "DROPDOWN",
      };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("is not applied to the main container", () => {
      expect(container.classList).not.toContain("custom-selector-container");
      expect(container.querySelector(".iti--detached-country-selector")).toBeNull();
    });
  });

  describe("container slot does not leak to the detached country selector", () => {
    let iti, container, user;

    beforeEach(() => {
      user = userEvent.setup();
      const options = {
        classNames: { container: "custom-container" },
        countrySelectorMode: "FULLSCREEN",
      };
      ({ iti, container } = initIntlTelInput({ options }));
    });

    afterEach(() => teardown(iti));

    test("applies only to the input container", async () => {
      expect(container.classList).toContain("custom-container");
      await clickSelectedCountryAsync(container, user);
      const root = container.ownerDocument;
      expect(root.querySelector(".iti--detached-country-selector").classList).not.toContain(
        "custom-container",
      );
    });
  });

  describe("validation", () => {
    let iti, container, warnSpy;

    beforeEach(() => {
      warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      teardown(iti);
      warnSpy.mockRestore();
    });

    test("warns and skips an unknown slot, keeping the valid ones", () => {
      const options = { classNames: { nope: "x", selectedCountry: "yep" } };
      ({ iti, container } = initIntlTelInput({ options }));

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("Unknown slot 'nope'"));
      expect(container.querySelector(".iti__selected-country").classList).toContain("yep");
    });

    test("warns and skips a non-string slot value", () => {
      const options = { classNames: { selectedCountry: 42 } };
      ({ iti, container } = initIntlTelInput({ options }));

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("'classNames.selectedCountry' must be a string"),
      );
      expect(container.querySelector(".iti__selected-country").className).toBe(
        "iti__selected-country",
      );
    });

    test("warns and ignores a non-object value", () => {
      const options = { classNames: "rounded-lg" };
      ({ iti, container } = initIntlTelInput({ options }));

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("'classNames' must be an object"),
      );
    });
  });
});
