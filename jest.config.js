/** @type {import('jest').Config} */
module.exports = {
  roots: [
    "<rootDir>/tests",
  ],
  moduleDirectories: [
    "node_modules",
    "build/js",
  ],
  transform: {
    // Support TypeScript source files directly in tests (lightweight)
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-typescript", { allowDeclareFields: true }],
        ],
        plugins: [
          "@babel/plugin-transform-modules-commonjs",
          "babel-plugin-add-module-exports",
        ],
      },
    ],
    // Special handling for the utils ESM file
    "utils.js$": [
      "babel-jest",
      {
        plugins: [
          "@babel/plugin-transform-modules-commonjs",
          "babel-plugin-add-module-exports",
        ],
      },
    ],
  },
};
