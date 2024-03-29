const { build } = require("esbuild");

const entryFile = "react/src/IntlTelInput.tsx";
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: ["react", "react-dom", "prop-types"],
  logLevel: "info",
  minify: true,
};

build({
  ...shared,
  format: "esm",
  outfile: "react/build/IntlTelInput.js",
});



// demo files
const demoShared = {
  bundle: true,
  format: "iife",
};

build({
  ...demoShared,
  entryPoints: ["react/demo/SimpleApp.tsx"],
  outfile: "react/demo/simple-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["react/demo/ValidationApp.tsx"],
  outfile: "react/demo/validation-bundle.js",
});