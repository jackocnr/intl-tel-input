const { build } = require("esbuild");
const packageJson = require("../package.json");

const mainShared = {
  bundle: true,
  external: ["@angular/core", "@angular/forms"],
  logLevel: "info",
  minify: false,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
};

//* Angular Component - CommonJS
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angular.ts"],
  format: "cjs",
  outfile: "angular/build/IntlTelInput.cjs",
});

//* Angular Component - Default (ES Modules)
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angular.ts"],
  format: "esm",
  outfile: "angular/build/IntlTelInput.js",
});

//* Angular Component With Utils - CommonJS
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angularWithUtils.ts"],
  format: "cjs",
  outfile: "angular/build/IntlTelInputWithUtils.cjs",
});

//* Angular Component With Utils - Default (ES Modules)
build({
  ...mainShared,
  entryPoints: ["angular/src/intl-tel-input/angularWithUtils.ts"],
  format: "esm",
  outfile: "angular/build/IntlTelInputWithUtils.js",
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

build({
  ...demoShared,
  entryPoints: ["angular/demo/form/main.ts"],
  outfile: "angular/demo/form/form-bundle.js",
});