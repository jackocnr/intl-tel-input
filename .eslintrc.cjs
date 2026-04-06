module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
  ],
  globals: {
    goog: true,
    i18n: true,
    require: true,
  },
  rules: {
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    quotes: ["error", "double"],
    "no-unused-vars": "off",
    "no-prototype-builtins": "off",
    "class-methods-use-this": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_",
      "ignoreRestSiblings": true,
    }],
    "@typescript-eslint/no-explicit-any": "off",
  },
  overrides: [{
    files: [".eslintrc.cjs"],
    env: { "node": true },
    parserOptions: { "sourceType": "script" },
  }, {
    files: ["tests/**/*.js"],
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
  }],
  settings: {
    "import/resolver": {
      "typescript": {},
    },
    "react": {
      "version": "detect",
    },
  },
};
