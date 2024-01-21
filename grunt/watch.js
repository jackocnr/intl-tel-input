module.exports = function(grunt) {
  return {
    js: {
      files: "src/js/**/*",
      tasks: "js"
    },
    react: {
      files: ["react/src/IntlTelInput.js", "react/demo/ValidationApp.js", "react/demo/SimpleApp.js"],
      tasks: "shell:buildReact"
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