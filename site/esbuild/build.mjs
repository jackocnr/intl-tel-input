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

// playground
build({
  ...sharedOptions,
  entryPoints: ["tmp/playground/playground.js"],
  outfile: "build/js/playground.js",
});
