import { build } from "esbuild";

/* Asset file types referenced via url(...) in our CSS that should be passed
   through unchanged (not copied/rewritten by esbuild's bundler). */
const passThroughAssets = ["*.webp", "*.png", "*.jpg", "*.svg"];

const shared = {
  bundle: true,
  logLevel: "info",
  external: passThroughAssets,
};

const entries = [
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
