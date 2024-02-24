// eslint-disable-next-line import/no-extraneous-dependencies
const { build } = require("esbuild");
const { dependencies } = require("../package.json");

const entryFile = "react/src/IntlTelInput.js";
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
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