import { build } from "esbuild";

/* Asset file types referenced via url(...) in our CSS that should be passed
   through unchanged (not copied/rewritten by esbuild's bundler). */
const passThroughAssets = ["*.webp", "*.png", "*.jpg", "*.svg"];

/* url() values containing an EJS template token (e.g. <%= cacheBust(...) %>)
   are resolved later by build-pages.js — mark them external so esbuild leaves
   them untouched. The `external` glob can't match these (they don't look like
   filenames), so use an onResolve plugin. */
const externalTemplatesPlugin = {
  name: "external-templates",
  setup({ onResolve }) {
    onResolve({ filter: /<%/ }, (args) => ({ path: args.path, external: true }));
  },
};

const shared = {
  bundle: true,
  logLevel: "info",
  external: passThroughAssets,
  plugins: [externalTemplatesPlugin],
};

const entries = [
  ["src/css/bootstrap.css", "dist/css/bootstrap.css"],
  ["src/css/website.css", "dist/css/website.css"],
  ["src/css/large_flags_overrides.css", "dist/css/large_flags_overrides.css"],
  ["src/css/highlightjs.css", "dist/css/highlightjs.css"],
  ["src/css/playground.css", "dist/css/playground.css"],
  ["src/css/docs.css", "dist/css/docs.css"],
  ["src/css/homepage.css", "dist/css/homepage.css"],
];

await Promise.all(
  entries.map(([entryPoint, outfile]) =>
    build({ ...shared, entryPoints: [entryPoint], outfile }),
  ),
);
