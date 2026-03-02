module.exports = function(grunt) {
  return {
    validationPrecise: {
      options: {
        patterns: [
          {
            match: /\biti\.isValidNumber\(\)/g,
            replacement: "iti.isValidNumberPrecise()",
          },
        ],
      },
      files: {
        "build/examples/js/validation_precise.js": "build/examples/js/validation_precise.js",
      },
    }
  };
};