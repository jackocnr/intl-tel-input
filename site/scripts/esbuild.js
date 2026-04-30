import { build } from "esbuild";

// Don't bundle utils.js into the examples - it's lazy-loaded at runtime from a separate URL.
// Using a plugin (rather than esbuild's built-in `external` option) because the import paths
// can include a cache-bust query string (e.g. utils.js?v=abc), and esbuild's `external` globs
// only allow a single "*" wildcard, which isn't enough to match both the path and the query.
// The filter must be specific enough not to match unrelated `*utils*` imports from third
// party packages (e.g. popper's `../dom-utils/...` paths inside bootstrap's tooltip/dropdown).
const externalUtilsPlugin = {
  name: "external-utils-plugin",
  setup({ onResolve }) {
    onResolve({ filter: /(^|\/)utils(\.js)?(\?|$)/ }, args => {
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
  entryPoints: ["tmp/examples/vanilla-javascript/lookup-country/page.ts"],
  outfile: "dist/examples/js/lookup_country.js",
});

// single country example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/vanilla-javascript/single-country/page.ts"],
  outfile: "dist/examples/js/single_country.js",
});

// right to left example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/vanilla-javascript/right-to-left/page.ts"],
  outfile: "dist/examples/js/right_to_left_bundle.js",
});

// validation examples (same source, one output per example)
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/vanilla-javascript/validation/page.ts"],
  outfile: "dist/examples/js/validation_practical.js",
});
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/vanilla-javascript/validation-precise/page.ts"],
  outfile: "dist/examples/js/validation_precise.js",
});

// hidden input example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/vanilla-javascript/hidden-input/page.ts"],
  outfile: "dist/examples/js/hidden_input.js",
});

// multiple instances example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/vanilla-javascript/multiple-instances/page.ts"],
  outfile: "dist/examples/js/multiple_instances.js",
});

// large flags example
build({
  ...sharedOptions,
  entryPoints: ["tmp/examples/vanilla-javascript/large-flags/page.ts"],
  outfile: "dist/examples/js/large_flags.js",
});

// react component example
build({
  ...sharedOptions,
  loader: { ".tsx": "tsx" },
  entryPoints: ["tmp/examples/react-component/validation/component.tsx"],
  outfile: "dist/examples/js/react_component_bundle.js",
});

// react hook form example
build({
  ...sharedOptions,
  loader: { ".tsx": "tsx" },
  entryPoints: ["tmp/examples/react-component/react-hook-form/component.tsx"],
  outfile: "dist/examples/js/react_hook_form_bundle.js",
});

// react display existing number example
build({
  ...sharedOptions,
  loader: { ".tsx": "tsx" },
  entryPoints: ["tmp/examples/react-component/display-existing-number/component.tsx"],
  outfile: "dist/examples/js/react_display_existing_number_bundle.js",
});

// angular component example
build({
  ...sharedOptions,
  loader: { ".ts": "ts" },
  tsconfig: "../packages/angular/tsconfig.build.json",
  entryPoints: ["tmp/examples/angular-component/validation/component.ts"],
  outfile: "dist/examples/js/angular_component_bundle.js",
});

// angular display existing number example
build({
  ...sharedOptions,
  loader: { ".ts": "ts" },
  tsconfig: "../packages/angular/tsconfig.build.json",
  entryPoints: ["tmp/examples/angular-component/display-existing-number/component.ts"],
  outfile: "dist/examples/js/angular_display_existing_number_bundle.js",
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

// hljs copy button plugin — no templating, built directly from src
build({
  ...sharedOptions,
  entryPoints: ["src/js/hljs-copy-button.ts"],
  outfile: "dist/js/hljs-copy-button.js",
});

// highlight.js — slim bundle with only the languages used on this site.
// Exposes window.hljs so common_body_end.html can call hljs.highlightAll().
build({
  ...sharedOptions,
  entryPoints: ["src/js/highlight.ts"],
  outfile: "dist/js/highlight.min.js",
});
