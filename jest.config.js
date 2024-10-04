/** @type {import('jest').Config} */
module.exports = {
  moduleDirectories: [
    "node_modules",
    "build/js",
  ],
  transform: {
    // Most of the build outputs in this project use UMD syntax, but the
    // utilities script is a proper ES Module. Unfortunately, Jest cannot treat
    // a file with a `.js` extension as ESM unless the whole project is ESM
    // (Jest does not use Node.js built-in resolution and loading logic), so
    // we have to set up special parsing for that file.
    // See also: https://jestjs.io/docs/next/ecmascript-modules
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
