import { build } from "esbuild";
import packageJson from "./package.json" with { type: "json" };

const mainShared = {
  bundle: true,
  external: ["react", "react-dom", "prop-types"],
  logLevel: "info",
  minify: false, //* Don't minify as (1) esbuild minify removes comments that we need to keep e.g. webpack import fix, (2) these files will be imported into other projects that will have their own minification process
  define: { "process.env.VERSION": `"${packageJson.version}"` },
};

//* React Component
build({
  ...mainShared,
  entryPoints: ["packages/react/src/IntlTelInput.tsx"],
  format: "esm",
  outfile: "packages/react/dist/IntlTelInput.js",
});

//* React Component With Utils
build({
  ...mainShared,
  entryPoints: ["packages/react/src/IntlTelInputWithUtils.tsx"],
  format: "esm",
  outfile: "packages/react/dist/IntlTelInputWithUtils.js",
});

//* Demo shared config
const demoShared = {
  bundle: true,
  define: { "process.env.VERSION": `"${packageJson.version}"` },
  format: "iife",
};

//* Simple demo app
build({
  ...demoShared,
  entryPoints: ["packages/react/demo/simple/SimpleApp.tsx"],
  outfile: "packages/react/demo/simple/simple-bundle.js",
});

//* Validation demo app
build({
  ...demoShared,
  entryPoints: ["packages/react/demo/validation/ValidationApp.tsx"],
  outfile: "packages/react/demo/validation/validation-bundle.js",
});

//* Set Number demo app
build({
  ...demoShared,
  entryPoints: ["packages/react/demo/set-number/SetNumberApp.tsx"],
  outfile: "packages/react/demo/set-number/set-number-bundle.js",
});

//* Toggle Disabled demo app
build({
  ...demoShared,
  entryPoints: ["packages/react/demo/toggle-disabled/ToggleDisabledApp.tsx"],
  outfile: "packages/react/demo/toggle-disabled/toggle-disabled-bundle.js",
});
