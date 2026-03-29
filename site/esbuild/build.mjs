import { build } from "esbuild";
import externalUtilsPlugin from "./externalUtilsPlugin.mjs";

const sharedOptions = {
  bundle: true,
  plugins: [externalUtilsPlugin],
  minify: true,
  define: {
    // This replaces the string "process.env.IPAPI_TOKEN" with the actual value from Cloudflare's environment
    "process.env.IPAPI_TOKEN": JSON.stringify(process.env.IPAPI_TOKEN || ""),
  },
};

// lookup country example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/lookup_country.js"],
  outfile: "build/examples/js/lookup_country.js",
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
  loader: { ".tsx": "tsx" },
  entryPoints: ["tmp/examples/js/react_component.tsx"],
  outfile: "build/examples/js/react_component_bundle.js",
});

// angular component example
build({
  ...sharedOptions,
  loader: { ".ts": "ts" },
  tsconfig: "../angular/tsconfig.json",
  entryPoints: ["tmp/examples/js/angular_component.ts"],
  outfile: "build/examples/js/angular_component_bundle.js",
});

// playground
build({
  ...sharedOptions,
  entryPoints: ["src/playground/js/playground.js"],
  outfile: "build/js/playground.js",
});

// all JS files in /src/js
build({
  ...sharedOptions,
  entryPoints: ["src/js/**/*.js"],
  outdir: "build/js",
});