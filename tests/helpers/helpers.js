require("@testing-library/jest-dom");
const intlTelInput = require("intlTelInputWithUtils.js");

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

const initPluginDefaults = { input: null, options: {}, inputValue: "" };

exports.initPlugin = ({ input = null, options = {}, inputValue = "" } = initPluginDefaults) => {
  const inputToUse = input || exports.injectInput({ inputValue });
  const iti = intlTelInput(inputToUse, options);
  const container = inputToUse.parentElement;
  return { input: inputToUse, iti, container };
};

exports.teardown = (iti) => {
  iti.destroy();
  document.body.innerHTML = "";
  jest.clearAllMocks();
};

exports.getCountryListLength = (container) => {
  const countryList = container.querySelector(".iti__country-list");
  return countryList.querySelectorAll("li.iti__country").length;
};

exports.getHighlightedItemCode = (container) => {
  return container.querySelector(".iti__country-list .iti__highlight").getAttribute("data-country-code");
};

exports.getSelectedCountryButton = (container) => {
  return container.querySelector(".iti__selected-country");
};

exports.isDropdownOpen = (container) => {
  return !container.querySelector(".iti__dropdown-content").classList.contains("iti__hide");
};

exports.getSearchInput = (container) => {
  return container.querySelector(".iti__search-input");
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