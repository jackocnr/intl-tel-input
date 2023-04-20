module.exports = function (grunt) {
  return {
    utils: {
      files: {
        "build/js/utils.js": "src/js/utils.js",
      },
      options: {
        js: [
          "node_modules/google-closure-library/**.js",
          "third_party/libphonenumber/javascript/i18n/phonenumbers/**.js",
          "!third_party/libphonenumber/javascript/i18n/phonenumbers/demo-compiled.js",
          "!third_party/libphonenumber/javascript/i18n/phonenumbers/metadatafortesting.js",
          "!third_party/libphonenumber/javascript/i18n/phonenumbers/metadatalite.js",
          "!third_party/libphonenumber/javascript/i18n/phonenumbers/regioncodefortesting.js",
          "!third_party/libphonenumber/javascript/i18n/phonenumbers/**_test.js",
        ],
        entry_point: "goog:i18n.phonenumbers.demo",
        compilation_level: "ADVANCED_OPTIMIZATIONS",
        output_wrapper: "(function(){%output%})();",
      },
    },
  };
};
