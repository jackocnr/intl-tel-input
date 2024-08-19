module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true,
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
    "jest",
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
    "no-prototype-builtins": "off",
    "class-methods-use-this": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-require-imports": "off",
  },
  overrides: [{
    files: [".eslintrc.{js,cjs}"],
    env: { "node": true },
    parserOptions: { "sourceType": "script" },
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
