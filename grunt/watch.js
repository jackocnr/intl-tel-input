module.exports = function(grunt) {
  return {
    js: {
      // only TS files (excludes utils.js, which is watched separately below)
      files: "src/js/**/*.ts",
      tasks: "build:jsfast"
    },
    utils: {
      files: "src/js/utils.js",
      tasks: ["build:utils", "build:jsfast"]
    },
    translations: {
      files: "src/i18n/**/*",
      tasks: "build:translations",
    },
    react: {
      files: [
        "react/src/intl-tel-input/react.tsx",
        "react/demo/set-number/SetNumberApp.tsx",
        "react/demo/simple/SimpleApp.tsx",
        "react/demo/toggle-disabled/ToggleDisabledApp.tsx",
        "react/demo/validation/ValidationApp.tsx",
      ],
      tasks: "build:react"
    },
    vue: {
      files: ["vue/src/intl-tel-input/IntlTelInput.vue"],
      tasks: "build:vue"
    },
    angular: {
      files: [
        "angular/src/intl-tel-input/angular.tsx",
        "angular/demo/form/form.component.ts",
        "angular/demo/set-number/set-number.component.ts",
        "angular/demo/simple/simple.component.ts",
        "angular/demo/toggle-disabled/toggle-disabled.component.ts",
        "angular/demo/validation/validation.component.ts",
      ],
      tasks: "build:angular"
    },
    css: {
      files: "src/css/**/*",
      tasks: "sass"
    }
  };
};
