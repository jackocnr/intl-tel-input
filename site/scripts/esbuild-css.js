import fs from "node:fs";
import { createRequire } from "node:module";
import { build } from "esbuild";

const require = createRequire(import.meta.url);

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

/* `@import url("dark-wrap:<pkg-css-path>")` — resolves the target via node
   require and wraps its contents in `[data-bs-theme="dark"] { ... }` so a
   light/dark pair from the same package can coexist (Bootstrap's dark mode
   convention). Uses CSS nesting; esbuild flattens it. */
const darkWrapPlugin = {
  name: "dark-wrap",
  setup({ onResolve, onLoad }) {
    onResolve({ filter: /^dark-wrap:/ }, (args) => ({
      path: require.resolve(args.path.slice("dark-wrap:".length)),
      namespace: "dark-wrap",
    }));
    onLoad({ filter: /.*/, namespace: "dark-wrap" }, (args) => ({
      contents: `[data-bs-theme="dark"] {\n${fs.readFileSync(args.path, "utf8")}\n}`,
      loader: "css",
    }));
  },
};

const shared = {
  bundle: true,
  logLevel: "info",
  external: passThroughAssets,
  plugins: [externalTemplatesPlugin, darkWrapPlugin],
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
