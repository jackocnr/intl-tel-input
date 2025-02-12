const { build } = require("esbuild");
const packageJson = require("../package.json");

const mainShared = {
  bundle: true,
  external: ["@angular/core"],
  logLevel: "info",
  minify: false,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
};

//* Angular Component - CommonJS
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angular.component.ts"],
  format: "cjs",
  outfile: "angular/build/IntlTelInput.cjs",
});

//* Angular Component - Default (ES Modules)
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angular.component.ts"],
  format: "esm",
  outfile: "angular/build/IntlTelInput.js",
});

//* Angular Component With Utils - CommonJS
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angularWithUtils.component.ts"],
  format: "cjs",
  outfile: "angular/build/angularWithUtils.cjs",
});

//* Angular Component With Utils - Default (ES Modules)
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angularWithUtils.component.ts"],
  format: "esm",
  outfile: "angular/build/angularWithUtils.js",
});

const demoShared = {
  bundle: true,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
  format: "iife",
};

build({
  ...demoShared,
  entryPoints: ["angular/demo/simple/main.ts"],
  outfile: "angular/demo/simple/simple-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["angular/demo/validation/main.ts"],
  outfile: "angular/demo/validation/validation-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["angular/demo/set-number/main.ts"],
  outfile: "angular/demo/set-number/set-number-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["angular/demo/toggle-disabled/main.ts"],
  outfile: "angular/demo/toggle-disabled/toggle-disabled-bundle.js",
});