import { build } from "esbuild";
import packageJson from "./package.json" with { type: "json" };

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
    "utils-compiled": "./build/js/utils.js",
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

//* build/js/intlTelInput.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intl-tel-input.ts"],
  minify: false,
  outfile: "build/js/intlTelInput.js",
});

//* build/js/intlTelInput.min.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intl-tel-input.ts"],
  minify: true,
  outfile: "build/js/intlTelInput.min.js",
});

//* build/js/data.js
build({
  ...getIife("allCountries"),
  entryPoints: ["src/js/data.ts"],
  minify: false,
  outfile: "build/js/data.js",
});

//* build/js/data.min.js
build({
  ...getIife("allCountries"),
  entryPoints: ["src/js/data.ts"],
  minify: true,
  outfile: "build/js/data.min.js",
});

//* build/js/intlTelInputWithUtils.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intlTelInputWithUtils.ts"],
  minify: false,
  outfile: "build/js/intlTelInputWithUtils.js",
});

//* build/js/intlTelInputWithUtils.min.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["src/js/intlTelInputWithUtils.ts"],
  minify: true,
  outfile: "build/js/intlTelInputWithUtils.min.js",
});

//* ESM builds
build({
  ...esmShared,
  entryPoints: ["src/js/intl-tel-input.ts"],
  outfile: "build/js/intlTelInput.mjs",
});

build({
  ...esmShared,
  entryPoints: ["src/js/intlTelInputWithUtils.ts"],
  outfile: "build/js/intlTelInputWithUtils.mjs",
});

build({
  ...esmShared,
  entryPoints: ["src/js/data.ts"],
  outfile: "build/js/data.mjs",
});

//* build/js/i18n
build({
  charset: "utf8",
  entryPoints: ["src/js/i18n/**/*.ts"],
  outdir: "build/js/i18n",
});
