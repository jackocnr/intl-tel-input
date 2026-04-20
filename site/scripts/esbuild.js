import { build } from "esbuild";

// Don't bundle utils.js into the examples - it's lazy-loaded at runtime from a separate URL.
// Using a plugin (rather than esbuild's built-in `external` option) because the import paths
// can include a cache-bust query string (e.g. utils.js?v=abc), and esbuild's `external` globs
// only allow a single "*" wildcard, which isn't enough to match both the path and the query.
const externalUtilsPlugin = {
  name: "external-utils-plugin",
  setup({ onResolve }) {
    onResolve({ filter: /utils/ }, args => {
      return { path: args.path, external: true };
    });
  },
};

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
  entryPoints: ["tmp/examples/js/lookup_country.ts"],
  outfile: "dist/examples/js/lookup_country.js",
});

// right to left example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/right_to_left.ts"],
  outfile: "dist/examples/js/right_to_left_bundle.js",
});

// validation examples (same source, one output per example)
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/validation_practical.ts"],
  outfile: "dist/examples/js/validation_practical.js",
});
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/validation_precise.ts"],
  outfile: "dist/examples/js/validation_precise.js",
});

// hidden input example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/hidden_input.ts"],
  outfile: "dist/examples/js/hidden_input.js",
});

// multiple instances example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/multiple_instances.ts"],
  outfile: "dist/examples/js/multiple_instances.js",
});

// large flags example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/js/large_flags.ts"],
  outfile: "dist/examples/js/large_flags.js",
});

// react component example
build({
  ...sharedOptions,
  loader: { ".tsx": "tsx" },
  entryPoints: ["tmp/examples/js/react_component.tsx"],
  outfile: "dist/examples/js/react_component_bundle.js",
});

// angular component example
build({
  ...sharedOptions,
  loader: { ".ts": "ts" },
  tsconfig: "../angular/tsconfig.json",
  entryPoints: ["tmp/examples/js/angular_component.ts"],
  outfile: "dist/examples/js/angular_component_bundle.js",
});

// playground
build({
  ...sharedOptions,
  entryPoints: ["src/playground/js/playground.ts"],
  outfile: "dist/js/playground.js",
});

// homepage — templated through tmp/ first so cacheBust() resolves
build({
  ...sharedOptions,
  entryPoints: ["tmp/js/homepage.ts"],
  outfile: "dist/js/homepage.js",
});

// iti-live-results — no templating, built directly from src
build({
  ...sharedOptions,
  entryPoints: ["src/js/iti-live-results.ts"],
  outfile: "dist/js/iti-live-results.js",
});
