// Copies four trees into site/dist/.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
process.chdir(ROOT);

const targets = [
  // Mirror of the published intl-tel-input package, served at /intl-tel-input/
  { from: "../packages/core/dist", to: "dist/intl-tel-input" },
  // Static site assets (favicon, robots.txt, etc.)
  { from: "static", to: "dist" },
  // Vendored bootstrap-icons font + CSS. The CSS references font files via
  // relative `url("fonts/...")`, so we copy the whole `font/` dir verbatim.
  {
    from: "../node_modules/bootstrap-icons/font",
    to: "dist/css/bootstrap-icons",
  },
  // Vendored bootstrap JS bundle (loaded once site-wide as a UMD `<script>`,
  // exposing `window.bootstrap` — see common_body_end.html).
  {
    from: "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    to: "dist/js/bootstrap.bundle.min.js",
  },
];

for (const { from, to } of targets) {
  if (!fs.existsSync(from)) {
    console.warn(`copy-assets: source missing, skipping: ${from}`);
    continue;
  }
  const isFile = fs.statSync(from).isFile();
  const dirToEnsure = isFile ? path.dirname(to) : to;
  fs.mkdirSync(dirToEnsure, { recursive: true });
  fs.cpSync(from, to, {
    recursive: true,
    dereference: false,
    filter: (src) => !path.basename(src).startsWith(".DS_Store"),
  });
  console.log(`copy-assets: ${from} -> ${to}`);
}
