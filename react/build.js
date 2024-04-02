const { build } = require("esbuild");
const packageJson = require("../package.json");

build({
  bundle: true,
  entryPoints: ["react/src/IntlTelInput.tsx"],
  external: ["react", "react-dom", "prop-types"],
  logLevel: "info",
  minify: true,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
  format: "esm",
  outfile: "react/build/IntlTelInput.js",
});

// demo files
const demoShared = {
  bundle: true,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
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