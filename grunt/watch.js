module.exports = function(grunt) {
  return {
    js: {
      files: "src/js/**/*",
      tasks: "jsfast"
    },
    translations: {
      files: "src/i18n/**/*",
      tasks: "build:translations",
    },
    react: {
      files: ["react/src/intl-tel-input/react.tsx", "react/demo/validation/ValidationApp.tsx", "react/demo/simple/SimpleApp.tsx", "react/demo/set-number/SetNumberApp.tsx"],
      tasks: "react"
    },
    css: {
      files: "src/css/**/*",
      tasks: "sass"
    }
  };
};
