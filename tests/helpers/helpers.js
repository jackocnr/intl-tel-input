const intlTelInput = require("intlTelInputWithUtils.js");

exports.totalCountries = 244;

exports.setup = (options) => {
  const input = document.createElement("input");
  document.body.appendChild(input);
  const iti = intlTelInput(input, options);
  const container = input.parentElement;
  return { input, iti, container };
};

exports.teardown = (iti) => {
  iti.destroy();
  document.body.innerHTML = "";
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