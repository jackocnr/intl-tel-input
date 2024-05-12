const intlTelInput = require("intlTelInputWithUtils.js");

exports.setup = (options) => {
  const input = document.createElement("input");
  document.body.appendChild(input);
  const iti = intlTelInput(input, options);
  return { input, iti };
};

exports.teardown = (iti) => {
  iti.destroy();
  document.body.innerHTML = "";
};