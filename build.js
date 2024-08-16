/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const packageJson = require("./package.json");

const getBanner = (moduleName) =>
  "/*\n" +
  ` * International Telephone Input v${packageJson.version}\n` +
  ` * ${packageJson.repository.url}\n` +
  " * Licensed under the MIT license\n" +
  " */\n\n" +
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
  globalName: "factoryOutput",
  footer: {
    js: footer,
  },
  define: {
    "process.env.VERSION": `"${packageJson.version}"`,
  },
};

//* build/js/intlTelInput.js
build({
  ...shared,
  banner: {
    js: getBanner("intlTelInput"),
  },
  entryPoints: ["src/js/intl-tel-input.ts"],
  minify: false,
  outfile: "build/js/intlTelInput.js",
});

//* build/js/intlTelInput.min.js
build({
  ...shared,
  banner: {
    js: getBanner("intlTelInput"),
  },
  entryPoints: ["src/js/intl-tel-input.ts"],
  minify: true,
  outfile: "tmp/built.min.js",
});

//* build/js/data.js
build({
  ...shared,
  banner: {
    js: getBanner("allCountries"),
  },
  entryPoints: ["src/js/intl-tel-input/data.ts"],
  minify: false,
  outfile: "build/js/data.js",
});

//* build/js/data.min.js
build({
  ...shared,
  banner: {
    js: getBanner("allCountries"),
  },
  entryPoints: ["src/js/intl-tel-input/data.ts"],
  minify: true,
  outfile: "build/js/data.min.js",
});

//* build/js/intlTelInputWithUtils.js
build({
  ...shared,
  banner: {
    js: getBanner("intlTelInput"),
  },
  entryPoints: ["src/js/intl-tel-input/intlTelInputWithUtils.ts"],
  minify: false,
  outfile: "build/js/intlTelInputWithUtils.js",
});

//* build/js/intlTelInputWithUtils.min.js
build({
  ...shared,
  banner: {
    js: getBanner("intlTelInput"),
  },
  entryPoints: ["src/js/intl-tel-input/intlTelInputWithUtils.ts"],
  minify: true,
  outfile: "build/js/intlTelInputWithUtils.min.js",
});

//* build/js/i18n
build({
  charset: "utf8",
  entryPoints: ["src/js/intl-tel-input/i18n/**/*.ts"],
  outdir: "build/js/i18n",
});