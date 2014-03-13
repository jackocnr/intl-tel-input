module.exports = function(grunt) {
  return {
    js: {
      files: "src/js/**/*.js",
      tasks: "js"
    },
    pluginCss: {
      files: ["src/css/flags.scss", "src/css/intlTelInput.scss"],
      tasks: "sass:main"
    },
    demoCss: {
      files: "src/css/demo.scss",
      tasks: "sass:demo"
    }
  };
};