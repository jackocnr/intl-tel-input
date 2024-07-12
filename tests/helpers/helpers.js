const intlTelInput = require("intlTelInputWithUtils.js");

exports.totalCountries = 244;

exports.injectInput = () => {
  const input = document.createElement("input");
  document.body.appendChild(input);
  return input;
};

const initPluginDefaults = { input: null, options: {} };

exports.initPlugin = ({ input, options } = initPluginDefaults) => {
  if (!input) {
    input = exports.injectInput();
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

exports.getSelectedCountryButton = (container) => {
  return container.querySelector(".iti__selected-country");
};

exports.getSearchInput = (container) => {
  return container.querySelector(".iti__search-input");
};

exports.checkFlagSelected = (container, countryCode) => {
  const flag = container.querySelector(".iti__selected-country .iti__flag");
  return flag.classList.contains(`iti__${countryCode}`);
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