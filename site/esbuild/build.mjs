import { build } from "esbuild";
import externalUtilsPlugin from "./externalUtilsPlugin.mjs";

const sharedOptions = {
  bundle: true,
  plugins: [externalUtilsPlugin],
  minify: true,
};

// internationalisation example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/internationalisation.js"],
  outfile: "build/examples/js/internationalisation_bundle.js",
});

// right to left example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/right_to_left.js"],
  outfile: "build/examples/js/right_to_left_bundle.js",
});

// react component example
build({
  ...sharedOptions,
  loader: { ".js": "jsx" },
  entryPoints: ["tmp/examples/js/react_component.js"],
  outfile: "build/examples/js/react_component_bundle.js",
});

// angular component exemple
build({
  ...sharedOptions,
  loader: { ".js": "ts" },
  entryPoints: ["tmp/examples/js/angular_component.js"],
  outfile: "build/examples/js/angular_component_bundle.js",
  target: "es2020",
  format: "iife",
  minify: false,
  tsconfigRaw: {
    compilerOptions: {
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      useDefineForClassFields: false,
    },
  },
});

// playground
build({
  ...sharedOptions,
  entryPoints: ["src/playground/js/playground.js"],
  outfile: "build/js/playground.js",
});
