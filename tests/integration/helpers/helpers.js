import "@testing-library/jest-dom/vitest";
import intlTelInputWithUtils from "intl-tel-input/intlTelInputWithUtils";

export const intlTelInput = intlTelInputWithUtils;

/** @typedef {typeof import("intl-tel-input").default} IntlTelInputInterface */
/** @typedef {import("intl-tel-input").Iti} Iti */
/** @typedef {import("intl-tel-input").SomeOptions} SomeOptions */

export const totalCountries = 244;

const injectInputDefaults = { inputValue: "", disabled: false };

export const injectInput = ({ inputValue = "", disabled = false } = injectInputDefaults) => {
  const input = document.createElement("input");
  if (inputValue) {
    input.value = inputValue;
  }
  if (disabled) {
    input.disabled = true;
  }
  document.body.appendChild(input);
  return input;
};

/**
 * Create an intl-tel-input instance to test.
 * @param {{intlTelInput?: IntlTelInputInterface, input?: any, inputValue?: string, options?: SomeOptions}} options
 * @returns {{input: HTMLInputElement, iti: Iti, container: HTMLElement}}
 */
export const initIntlTelInput = ({ intlTelInput = intlTelInputWithUtils, input = null, inputValue = "", options = {} } = {}) => {
  const inputToUse = input || injectInput({ inputValue });
  const iti = intlTelInput(inputToUse, options);
  const container = inputToUse.parentElement;
  return { input: inputToUse, iti, container };
};

/**
 * Tear down a standard test environment. Optionally takes an intl-tel-input
 * instance to tear down, or a copy of the whole library in which to tear down
 * all instances.
 * @param {Iti|IntlTelInputInterface} iti
 */
export const teardown = (iti) => {
  let toDestroy = [];
  if (iti?.instances) {
    toDestroy = Object.values(iti.instances);
  } else if (iti) {
    toDestroy = [iti];
  }

  for (const instance of toDestroy) {
    // Tests might intentionally set up an instance wrong, so ignore any
    // rejections of the instance's promise (otherwise the unhandled
    // rejection causes the test to fail). But don't *wait*, since the test
    // may also create a state where the promise will never fulfill.
    instance.promise.catch(() => {});

    instance.destroy();
  }

  if (document.body) {
    document.body.innerHTML = "";
  }
  vi.restoreAllMocks();
};

/**
 * @param {IntlTelInputInterface} intlTelInput
 */
export const resetPackageAfterEach = (intlTelInput = intlTelInputWithUtils) => {
  const originalUtils = intlTelInput.utils;

  afterEach(async function() {
    try {
      teardown(intlTelInput);
    } finally {
      // Flush microtasks so any in-flight attachUtils() .then() callbacks settle before we reset package-wide state.
      await new Promise(resolve => setTimeout(resolve, 0));
      intlTelInput.utils = originalUtils;
      intlTelInput.startedLoadingUtils = false;
    }
  });
};

export const getCountryContainer = (root) => root.querySelector(".iti__country-container");

export const getArrowElement = (root) => root.querySelector(".iti__arrow");

export const getCountryListElement = (root) => root.querySelector(".iti__country-list");

export const getCountryListLength = (container) => {
  const countryList = getCountryListElement(container);
  return countryList.querySelectorAll("li.iti__country").length;
};

export const getHighlightedItemCode = (container) => {
  return container.querySelector(".iti__country-list .iti__highlight").getAttribute("data-iso2");
};

export const getSelectedCountryButton = (container) => {
  return container.querySelector(".iti__selected-country");
};

export const getSelectedDialCodeText = (container) => {
  return container.querySelector(".iti__selected-dial-code").textContent;
};

export const isDropdownOpen = (container) => {
  return !getDropdownElement(container).classList.contains("iti__hide");
};

export const getDropdownElement = (container) => {
  return container.querySelector(".iti__dropdown-content");
};

export const getSearchInput = (container) => {
  return container.querySelector(".iti__search-input");
};

export const getCountriesInList = (container) => {
  const countryListItems = container.querySelectorAll(".iti__country-list .iti__country");
  return [...countryListItems].map(c => c.getAttribute("data-iso2"));
};

export const checkFlagSelected = (container, iso2 = "") => {
  const flag = container.querySelector(".iti__selected-country .iti__flag");
  if (iso2.length === 2) {
    return flag.classList.contains(`iti__${iso2}`);
  }
  if (iso2.length === 0) {
    return flag.classList.contains("iti__globe");
  }
  throw new Error("Invalid iso2 code");
};

export const clickSelectedCountryAsync = async (container, user) => {
  const selectedCountryButton = getSelectedCountryButton(container);
  await user.click(selectedCountryButton);
};

export const selectCountryAsync = async (container, iso2, user) => {
  const countryItem = container.querySelector(`li[data-iso2='${iso2}']`);
  await user.click(countryItem);
};

export const openDropdownSelectCountryAsync = async (container, iso2, user) => {
  await clickSelectedCountryAsync(container, user);
  await selectCountryAsync(container, iso2, user);
};

export const selectCountryAndTypePlaceholderNumberAsync = async (container, iso2, user, input) => {
  await openDropdownSelectCountryAsync(container, iso2, user);
  const placeholderNumberClean = await typePlaceholderNumberAsync(user, input);
  return placeholderNumberClean;
};

export const typePlaceholderNumberAsync = async (user, input) => {
  const placeholderNumberClean = stripFormattingChars(input.getAttribute("placeholder"));
  await user.type(input, placeholderNumberClean);
  return placeholderNumberClean;
};

// strip formatting chars like space, dash, brackets (leaving just numerics and optional plus)
export const stripFormattingChars = (str) => str.replace(/[^0-9+]/g, "");

export const oneTickAsync = async () => {
  await new Promise(resolve => setTimeout(resolve));
};

export const getPasteEventObject = (str) => {
  return {
    clipboardData: {
      getData: () => str,
    },
  };
};
