import { build } from "esbuild";
import fs from "fs";
import packageJson from "./package.json" with { type: "json" };

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
    entryPoints: ["packages/angular/dist/temp/IntlTelInput.js"],
    format: "esm",
    outfile: "packages/angular/dist/IntlTelInput.js",
  });

  //* Angular Component With Utils - Default (ES Modules)
  await build({
    ...mainShared,
    entryPoints: ["packages/angular/dist/temp/IntlTelInputWithUtils.js"],
    format: "esm",
    outfile: "packages/angular/dist/IntlTelInputWithUtils.js",
  });

  // remove temp folder after builds are complete
  fs.rmSync("packages/angular/dist/temp", { recursive: true, force: true });
}

buildMain().catch(console.error);

const demoShared = {
  bundle: true,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
  format: "iife",
};

build({
  ...demoShared,
  entryPoints: ["packages/angular/demo/simple/main.ts"],
  outfile: "packages/angular/demo/simple/simple-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["packages/angular/demo/validation/main.ts"],
  outfile: "packages/angular/demo/validation/validation-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["packages/angular/demo/set-number/main.ts"],
  outfile: "packages/angular/demo/set-number/set-number-bundle.js",
});

build({
  ...demoShared,
  entryPoints: ["packages/angular/demo/toggle-disabled/main.ts"],
  outfile: "packages/angular/demo/toggle-disabled/toggle-disabled-bundle.js",
});
