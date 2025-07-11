module.exports = function(grunt) {
  return {
    js: {
      files: "src/js/**/*",
      tasks: "shell:buildJs"
    },
    translations: {
      files: "src/i18n/**/*",
      tasks: "build:translations",
    },
    react: {
      files: ["react/src/intl-tel-input/react.tsx", "react/demo/validation/ValidationApp.tsx", "react/demo/simple/SimpleApp.tsx", "react/demo/set-number/SetNumberApp.tsx"],
      tasks: "react"
    },
    reactNative: {
      files: ["react-native/src/intl-tel-input/react-native.tsx"],
      tasks: "react-native"
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
