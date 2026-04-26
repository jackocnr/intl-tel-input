import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: [
      "**/demo/",
      "**/dist/",
      "**/third_party/",
      "**/tmp/",
      ".claude/",
      "site/static/js/highlight.min.js",
      "site/static/js/silktide-consent-manager.js",
      "site/src/examples/**/*display_code*",
      "playwright-report/",
      "scripts/",
      "packages/core/src/js/utils.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        goog: true,
        i18n: true,
      },
    },
    rules: {
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
      "no-unused-vars": "off",
      "no-prototype-builtins": "off",
      "class-methods-use-this": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],
      "@typescript-eslint/no-explicit-any": "off",
      curly: ["error", "all"],
      // allowSingleLine:false prevents this: `if (condition) {return;}`
      "brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "no-trailing-spaces": "error",
    },
  },
  {
    files: ["packages/react/**/*.{ts,tsx,js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
  },
];
