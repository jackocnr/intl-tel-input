/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const packageJson = require("../package.json");

const mainShared = {
  bundle: true,
  entryPoints: ["react/src/intl-tel-input/react.tsx"],
  external: ["react", "react-dom", "prop-types"],
  logLevel: "info",
  minify: true,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
};

//* React Component - CommonJS
build({
  ...mainShared,
  format: "cjs",
  outfile: "react/build/IntlTelInput.cjs",
});

//* React Component - Default (ES Modules)
build({
  ...mainShared,
  format: "esm",
  outfile: "react/build/IntlTelInput.js",
});

const demoShared = {
  bundle: true,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
  format: "iife",
};

//* Simple demo app
build({
  ...demoShared,
  entryPoints: ["react/demo/SimpleApp.tsx"],
  outfile: "react/demo/simple-bundle.js",
});

//* Validation demo app
build({
  ...demoShared,
  entryPoints: ["react/demo/ValidationApp.tsx"],
  outfile: "react/demo/validation-bundle.js",
});
