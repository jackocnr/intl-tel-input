require("@testing-library/jest-dom");
// test using the minified version to check for minification errors in /grunt/replace.js
const intlTelInputWithUtils = require("intlTelInputWithUtils.min.js");

exports.intlTelInput = intlTelInputWithUtils;

/** @typedef {typeof import("intl-tel-input").default} IntlTelInputInterface */
/** @typedef {import("intl-tel-input").Iti} Iti */
/** @typedef {import("intl-tel-input").SomeOptions} SomeOptions */

exports.totalCountries = 244;

const injectInputDefaults = { inputValue: "", disabled: false };

exports.injectInput = ({ inputValue = "", disabled = false } = injectInputDefaults) => {
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
exports.initPlugin = ({ intlTelInput = intlTelInputWithUtils, input = null, inputValue = "", options = {} } = {}) => {
  const inputToUse = input || exports.injectInput({ inputValue });
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
exports.teardown = (iti) => {
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
  jest.restoreAllMocks();
};

/**
 * @param {IntlTelInputInterface} intlTelInput
 */
exports.resetPackageAfterEach = (intlTelInput = intlTelInputWithUtils) => {
  const originalUtils = intlTelInput.utils;

  afterEach(function() {
    try {
      exports.teardown(intlTelInput);
    } finally {
      // Reset package-wide state.
      intlTelInput.utils = originalUtils;
      intlTelInput.startedLoadingUtilsScript = false;
    }
  });
};

exports.getCountryContainer = (root) => root.querySelector(".iti__country-container");

exports.getArrowElement = (root) => root.querySelector(".iti__arrow");

exports.getCountryListElement = (root) => root.querySelector(".iti__country-list");

exports.getCountryListLength = (container) => {
  const countryList = exports.getCountryListElement(container);
  return countryList.querySelectorAll("li.iti__country").length;
};

exports.getHighlightedItemCode = (container) => {
  return container.querySelector(".iti__country-list .iti__highlight").getAttribute("data-country-code");
};

exports.getSelectedCountryButton = (container) => {
  return container.querySelector(".iti__selected-country");
};

exports.getSelectedDialCodeText = (container) => {
  return container.querySelector(".iti__selected-dial-code").textContent;
};

exports.isDropdownOpen = (container) => {
  return !exports.getDropdownElement(container).classList.contains("iti__hide");
};

exports.getDropdownElement = (container) => {
  return container.querySelector(".iti__dropdown-content");
};

exports.getSearchInput = (container) => {
  return container.querySelector(".iti__search-input");
};

exports.getCountriesInList = (container) => {
  const countryListItems = container.querySelectorAll(".iti__country-list .iti__country");
  return [...countryListItems].map(c => c.getAttribute("data-country-code"));
};

exports.checkFlagSelected = (container, countryCode = "") => {
  const flag = container.querySelector(".iti__selected-country .iti__flag");
  if (countryCode.length === 2) {
    return flag.classList.contains(`iti__${countryCode}`);
  }
  if (countryCode.length === 0) {
    return flag.classList.contains("iti__globe");
  }
  throw new Error("Invalid country code");
};

exports.clickSelectedCountryAsync = async (container, user) => {
  const selectedCountryButton = exports.getSelectedCountryButton(container);
  await user.click(selectedCountryButton);
};

exports.selectCountryAsync = async (container, iso2, user) => {
  const countryItem = container.querySelector(`li[data-country-code='${iso2}']`);
  await user.click(countryItem);
};

exports.openDropdownSelectCountryAsync = async (container, iso2, user) => {
  await exports.clickSelectedCountryAsync(container, user);
  await exports.selectCountryAsync(container, iso2, user);
};

exports.selectCountryAndTypePlaceholderNumberAsync = async (container, iso2, user, input) => {
  await exports.openDropdownSelectCountryAsync(container, iso2, user);
  const placeholderNumberClean = await exports.typePlaceholderNumberAsync(user, input);
  return placeholderNumberClean;
};

exports.typePlaceholderNumberAsync = async (user, input) => {
  const placeholderNumberClean = exports.stripFormattingChars(input.getAttribute("placeholder"));
  await user.type(input, placeholderNumberClean);
  return placeholderNumberClean;
};

// strip formatting chars like space, dash, brackets (leaving just numerics and optional plus)
exports.stripFormattingChars = (str) => str.replace(/[^0-9+]/g, "");

exports.oneTickAsync = async () => {
  await new Promise(resolve => setTimeout(resolve));
};

exports.getPasteEventObject = (str) => {
  return {
    clipboardData: {
      getData: () => str,
    },
  };
};
