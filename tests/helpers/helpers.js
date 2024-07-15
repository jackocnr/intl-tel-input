require("@testing-library/jest-dom");
const intlTelInput = require("intlTelInputWithUtils.js");

exports.totalCountries = 244;

exports.injectInput = (inputValue = "") => {
  const input = document.createElement("input");
  input.value = inputValue;
  document.body.appendChild(input);
  return input;
};

const initPluginDefaults = { input: null, options: {} };

exports.initPlugin = ({ input, options, inputValue } = initPluginDefaults) => {
  if (!input) {
    input = exports.injectInput(inputValue);
  }
  const iti = intlTelInput(input, options);
  const container = input.parentElement;
  return { input, iti, container };
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

exports.getDropdownDiv = (container) => {
  return container.querySelector(".iti__dropdown-content");
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

exports.clickSelectedCountry = async (container, user) => {
  const selectedCountryButton = exports.getSelectedCountryButton(container);
  await user.click(selectedCountryButton);
};

exports.selectCountry = async (container, iso2, user) => {
  const countryItem = container.querySelector(`li[data-country-code='${iso2}']`);
  await user.click(countryItem);
};

exports.openDropdownSelectCountry = async (container, iso2, user) => {
  await exports.clickSelectedCountry(container, user);
  await exports.selectCountry(container, iso2, user);
};