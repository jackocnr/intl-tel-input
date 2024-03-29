// eslint-disable-next-line import/no-extraneous-dependencies
const { build } = require("esbuild");

const entryFile = "react/src/IntlTelInput.js";
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: ["react", "react-dom", "prop-types"],
  logLevel: "info",
  minify: true,
  sourcemap: true,
  loader: { '.js': 'jsx' },
};

build({
  ...shared,
  format: "esm",
  outfile: "react/build/IntlTelInput.esm.js",
});

build({
  ...shared,
  format: "cjs",
  outfile: "react/build/IntlTelInput.cjs.js",
});




// demo files
const demoShared = {
  bundle: true,
  loader: { '.js': 'jsx' },
  format: "iife",
};

build({
  ...demoShared,
  entryPoints: ["react/demo/SimpleApp.js"],
  outfile: "react/demo/simple-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["react/demo/ValidationApp.js"],
  outfile: "react/demo/validation-bundle.js",
});