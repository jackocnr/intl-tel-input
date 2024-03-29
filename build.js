// eslint-disable-next-line import/no-extraneous-dependencies
const { build } = require("esbuild");
const packageJson = require('./package.json');

const getBanner = (moduleName) =>
  '/*\n' +
  ` * International Telephone Input v${packageJson.version}\n` +
  ` * ${packageJson.repository.url}\n` +
  ' * Licensed under the MIT license\n' +
  ' */\n\n' +
  // we can remove this UMD hack once it is supported by esbuild: https://github.com/evanw/esbuild/issues/507
  "// UMD\n" +
  "(function(factory) {\n" +
  "  if (typeof module === 'object' && module.exports) {\n" +
  "    module.exports = factory();\n" +
  "  } else {\n" +
  `    window.${moduleName} = factory();\n` +
  "  }\n" +
  "}(() => {\n";

const footer =
  "\n// UMD\n" +
  "  return factoryOutput.default;\n" +
  "}));";

const shared = {
  bundle: true,
  logLevel: "info",
  format: "iife",
  globalName: 'factoryOutput',
  footer: {
    js: footer,
  },
  define: {
    'process.env.VERSION': `"${packageJson.version}"`,
  },
};

build({
  ...shared,
  banner: {
    js: getBanner('intlTelInput'),
  },
  entryPoints: ["src/js/intlTelInput.js"],
  minify: false,
  outfile: "build/js/intlTelInput.js",
});

build({
  ...shared,
  banner: {
    js: getBanner('intlTelInput'),
  },
  entryPoints: ["src/js/intlTelInput.js"],
  minify: true,
  outfile: "tmp/built.min.js",
});

build({
  ...shared,
  banner: {
    js: getBanner('allCountries'),
  },
  entryPoints: ["src/js/data.js"],
  minify: false,
  outfile: "build/js/data.js",
});

build({
  ...shared,
  banner: {
    js: getBanner('allCountries'),
  },
  entryPoints: ["src/js/data.js"],
  minify: true,
  outfile: "build/js/data.min.js",
});