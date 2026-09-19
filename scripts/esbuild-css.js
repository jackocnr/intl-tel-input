import { build } from "esbuild";

// Asset file types referenced via url(...) in our CSS that should be passed
// through unchanged (not copied/rewritten by esbuild's bundler).
const passThroughAssets = ["*.webp", "*.png", "*.jpg", "*.svg"];

// We author with native CSS nesting, but flatten it in the published CSS, as
// nesting support is much newer (Chrome 112, Safari 16.5, Firefox 117) than the
// rest of our browser baseline. Any target older than those triggers flattening —
// these match the JS baseline (set by Object.hasOwn).
const flattenNestingTarget = ["chrome93", "safari15.4", "firefox92"];

const shared = {
  bundle: true,
  logLevel: "info",
  external: passThroughAssets,
  target: flattenNestingTarget,
};

//* Library: with assets (intlTelInput.css)
build({
  ...shared,
  entryPoints: ["packages/core/src/css/intlTelInputWithAssets.css"],
  outfile: "packages/core/dist/css/intlTelInput.css",
});
build({
  ...shared,
  entryPoints: ["packages/core/src/css/intlTelInputWithAssets.css"],
  outfile: "packages/core/dist/css/intlTelInput.min.css",
  minify: true,
});

//* Library: no assets (intlTelInput-no-assets.css)
build({
  ...shared,
  entryPoints: ["packages/core/src/css/intlTelInput.css"],
  outfile: "packages/core/dist/css/intlTelInput-no-assets.css",
});
build({
  ...shared,
  entryPoints: ["packages/core/src/css/intlTelInput.css"],
  outfile: "packages/core/dist/css/intlTelInput-no-assets.min.css",
  minify: true,
});

//* Demo
build({
  ...shared,
  entryPoints: ["demo/src/demo.css"],
  outfile: "demo/dist/demo.css",
});
