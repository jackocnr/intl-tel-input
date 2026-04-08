import { build } from "esbuild";
import packageJson from "../package.json" with { type: "json" };

const banner =
  "/*\n" +
  ` * International Telephone Input v${packageJson.version}\n` +
  ` * ${packageJson.repository.url}\n` +
  " * Licensed under the MIT license\n" +
  " */";

const shared = {
  bundle: true,
  logLevel: "info",
  define: {
    "process.env.VERSION": `"${packageJson.version}"`,
  },
  alias: {
    "utils-compiled": "./dist/js/utils.js",
  },
};

const getIife = (globalName) => ({
  ...shared,
  format: "iife",
  globalName: "_factory",
  banner: { js: banner },
  footer: { js: `var ${globalName} = _factory.default;` },
});

const esmShared = {
  ...shared,
  format: "esm",
};

//* dist/js/intlTelInput.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intl-tel-input.ts"],
  minify: false,
  outfile: "dist/js/intlTelInput.js",
});

//* dist/js/intlTelInput.min.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intl-tel-input.ts"],
  minify: true,
  outfile: "dist/js/intlTelInput.min.js",
});

//* dist/js/data.js
build({
  ...getIife("allCountries"),
  entryPoints: ["src/js/data.ts"],
  minify: false,
  outfile: "dist/js/data.js",
});

//* dist/js/data.min.js
build({
  ...getIife("allCountries"),
  entryPoints: ["src/js/data.ts"],
  minify: true,
  outfile: "dist/js/data.min.js",
});

//* dist/js/intlTelInputWithUtils.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intlTelInputWithUtils.ts"],
  minify: false,
  outfile: "dist/js/intlTelInputWithUtils.js",
});

//* dist/js/intlTelInputWithUtils.min.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intlTelInputWithUtils.ts"],
  minify: true,
  outfile: "dist/js/intlTelInputWithUtils.min.js",
});

//* ESM builds
build({
  ...esmShared,
  entryPoints: ["src/js/intl-tel-input.ts"],
  outfile: "dist/js/intlTelInput.mjs",
});

build({
  ...esmShared,
  entryPoints: ["src/js/intlTelInputWithUtils.ts"],
  outfile: "dist/js/intlTelInputWithUtils.mjs",
});

build({
  ...esmShared,
  entryPoints: ["src/js/data.ts"],
  outfile: "dist/js/data.mjs",
});

//* dist/js/i18n
build({
  charset: "utf8",
  entryPoints: ["src/js/i18n/**/*.ts"],
  outdir: "dist/js/i18n",
});
