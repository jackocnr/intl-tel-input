const { build } = require("esbuild");
const fs = require("fs");
const packageJson = require("../package.json");

const mainShared = {
  bundle: true,
  external: ["@angular/core", "@angular/forms"],
  logLevel: "info",
  minify: false,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
};

async function buildMain() {
  //* Angular Component - Default (ES Modules)
  await build({
    ...mainShared,
    entryPoints: ["angular/build/temp/intl-tel-input/angular.js"],
    format: "esm",
    outfile: "angular/build/IntlTelInput.js",
  });

  //* Angular Component With Utils - Default (ES Modules)
  await build({
    ...mainShared,
    entryPoints: ["angular/build/temp/intl-tel-input/angularWithUtils.js"],
    format: "esm",
    outfile: "angular/build/IntlTelInputWithUtils.js",
  });

  // remove temp folder after builds are complete
  fs.rmSync("angular/build/temp", { recursive: true, force: true });
}

buildMain().catch(console.error);

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