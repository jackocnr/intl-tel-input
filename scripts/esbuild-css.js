import { build } from "esbuild";

// Asset file types referenced via url(...) in our CSS that should be passed
// through unchanged (not copied/rewritten by esbuild's bundler).
const passThroughAssets = ["*.webp", "*.png", "*.jpg", "*.svg"];

const shared = {
  bundle: true,
  logLevel: "info",
  external: passThroughAssets,
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
