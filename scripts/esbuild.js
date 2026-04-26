import { build } from "esbuild";
import packageJson from "../packages/core/package.json" with { type: "json" };

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
    "utils-compiled": "./packages/core/dist/js/utils.js",
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

//* packages/core/dist/js/intlTelInput.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["packages/core/src/js/intlTelInput.ts"],
  minify: false,
  outfile: "packages/core/dist/js/intlTelInput.js",
});

//* packages/core/dist/js/intlTelInput.min.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["packages/core/src/js/intlTelInput.ts"],
  minify: true,
  outfile: "packages/core/dist/js/intlTelInput.min.js",
});

//* packages/core/dist/js/data.js
build({
  ...getIife("allCountries"),
  entryPoints: ["packages/core/src/js/data.ts"],
  minify: false,
  outfile: "packages/core/dist/js/data.js",
});

//* packages/core/dist/js/data.min.js
build({
  ...getIife("allCountries"),
  entryPoints: ["packages/core/src/js/data.ts"],
  minify: true,
  outfile: "packages/core/dist/js/data.min.js",
});

//* packages/core/dist/js/intlTelInputWithUtils.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["packages/core/src/js/intlTelInputWithUtils.ts"],
  minify: false,
  outfile: "packages/core/dist/js/intlTelInputWithUtils.js",
});

//* packages/core/dist/js/intlTelInputWithUtils.min.js
build({
  ...getIife("intlTelInput"),
  entryPoints: ["packages/core/src/js/intlTelInputWithUtils.ts"],
  minify: true,
  outfile: "packages/core/dist/js/intlTelInputWithUtils.min.js",
});

//* ESM builds
build({
  ...esmShared,
  entryPoints: ["packages/core/src/js/intlTelInput.ts"],
  outfile: "packages/core/dist/js/intlTelInput.mjs",
});

build({
  ...esmShared,
  entryPoints: ["packages/core/src/js/intlTelInputWithUtils.ts"],
  outfile: "packages/core/dist/js/intlTelInputWithUtils.mjs",
});

build({
  ...esmShared,
  entryPoints: ["packages/core/src/js/data.ts"],
  outfile: "packages/core/dist/js/data.mjs",
});

//* packages/core/dist/js/i18n
build({
  charset: "utf8",
  entryPoints: ["packages/core/src/js/i18n/**/*.ts"],
  outdir: "packages/core/dist/js/i18n",
});
