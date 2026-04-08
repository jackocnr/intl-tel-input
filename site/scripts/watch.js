// Re-runs `npm run build` whenever a watched source file changes.
import chokidar from "chokidar";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
process.chdir(ROOT);

// Chokidar v4+ no longer supports globs — watch directories recursively instead.
const watchPaths = [
  "src",
  "static",
  "scripts",
  "../dist",
];

let running = false;
let queued = false;
let debounceTimer = null;

function trigger() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (running) {
      queued = true;
      return;
    }
    runBuild();
  }, 100);
}

function runBuild() {
  running = true;
  queued = false;
  console.log("\n[watch] -> npm run build");
  const child = spawn("npm", ["run", "build"], { stdio: "inherit" });
  child.on("exit", (code) => {
    running = false;
    if (code !== 0) console.log(`[watch] FAILED (exit ${code})`);
    if (queued) runBuild();
  });
}

chokidar
  .watch(watchPaths, { ignoreInitial: true })
  .on("all", trigger)
  .on("ready", () => {
    console.log(`[watch] watching ${watchPaths.length} pattern(s)`);
  });
