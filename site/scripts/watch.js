// Incremental dev watcher. Routes file changes to the minimum set of build
// steps needed, rather than re-running `npm run build` for every save.
//
// Assumes a full `npm run build` has been done at least once.
import chokidar from "chokidar";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
process.chdir(ROOT);

const watchPaths = ["src", "static", "scripts", "../dist"];

// Action = one pipeline stage. Order in this array = execution order when
// multiple actions are queued in the same tick.
const ACTIONS = ["copy", "css", "esbuild", "vue", "svelte", "pages", "full"];

// Each action is a sequence of child-process commands. Skip expensive steps
// that aren't needed for a live dev loop: minify, typecheck, strip-comments.
const ACTION_COMMANDS = {
  copy: [["npm", ["run", "copy"]]],
  css: [
    ["npm", ["run", "build:css:bundle"]],
    ["npm", ["run", "build:css:cache-bust"]],
  ],
  esbuild: [
    ["npm", ["run", "build:esbuild:templates"]],
    ["node", ["scripts/replace-validation-precise.js"]],
    ["node", ["scripts/esbuild.js"]],
  ],
  vue: [["npm", ["run", "build:vue"]]],
  svelte: [["npm", ["run", "build:svelte"]]],
  pages: [["npm", ["run", "build:pages"]]],
  full: [["npm", ["run", "build"]]],
};

// Map a normalised, forward-slash relative path to one action. Return null to
// ignore the change. Return "full" as a safe fallback for anything unknown.
function categorise(p) {
  if (p === "package.json" || p === "tsconfig.json") {
    return "full";
  }
  if (p.startsWith("scripts/")) {
    return "full";
  }

  if (p.startsWith("static/")) {
    return "copy";
  }
  if (p.startsWith("../dist/")) {
    return "copy";
  }

  if (p.startsWith("src/css/")) {
    return "css";
  }

  if (p.startsWith("src/examples/js/")) {
    if (/_display_code\.(js|vue|svelte)$/.test(p)) {
      return "pages";
    }
    if (p.endsWith(".vue")) {
      return "vue";
    }
    if (p.endsWith(".svelte")) {
      return "svelte";
    }
    if (/\/(vue_main\.ts|viteVueDemo\.config\.ts)$/.test(p)) {
      return "vue";
    }
    if (/\/(svelte_main\.ts|viteSvelteDemo\.config\.ts)$/.test(p)) {
      return "svelte";
    }
    if (/\.(ts|tsx|js)$/.test(p)) {
      return "esbuild";
    }
    return "pages";
  }

  if (p.startsWith("src/js/")) {
    return "esbuild";
  }
  if (p.startsWith("src/playground/js/")) {
    return "esbuild";
  }
  if (p.startsWith("src/types/")) {
    return "esbuild";
  }

  if (p.startsWith("src/docs/")) {
    return "pages";
  }
  if (p.startsWith("src/homepage/")) {
    return "pages";
  }
  if (p.startsWith("src/playground/")) {
    return "pages";
  }
  if (p.startsWith("src/404/")) {
    return "pages";
  }
  if (p.startsWith("src/shared/")) {
    return "pages";
  }
  if (p.startsWith("src/examples/")) {
    return "pages";
  }
  if (p === "src/layout_template.html.ejs") {
    return "pages";
  }

  return "full";
}

function toRelPosix(absPath) {
  return path.relative(ROOT, absPath).split(path.sep).join("/");
}

function run(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("exit", (code) => resolve(code ?? 0));
  });
}

let busy = false;
let pending = new Set();
let debounceTimer = null;

function schedule(action) {
  pending.add(action);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(drain, 100);
}

async function drain() {
  if (busy) {
    return;
  }
  if (pending.size === 0) {
    return;
  }
  busy = true;

  // Collapse: "full" subsumes everything.
  let queued = pending;
  pending = new Set();
  if (queued.has("full")) {
    queued = new Set(["full"]);
  }

  const ordered = ACTIONS.filter((a) => queued.has(a));
  const t0 = Date.now();
  console.log(`\n[watch] -> ${ordered.join(", ")}`);

  for (const action of ordered) {
    for (const [cmd, args] of ACTION_COMMANDS[action]) {
      const code = await run(cmd, args);
      if (code !== 0) {
        console.log(
          `[watch] ${action} FAILED (${cmd} ${args.join(" ")} exit ${code})`,
        );
        busy = false;
        // Drain anything that queued up during the failed run.
        if (pending.size > 0) {
          drain();
        }
        return;
      }
    }
  }

  console.log(`[watch] done in ${Date.now() - t0}ms`);
  busy = false;
  if (pending.size > 0) {
    drain();
  }
}

chokidar
  .watch(watchPaths, { ignoreInitial: true })
  .on("all", (_event, absPath) => {
    const rel = toRelPosix(absPath);
    const action = categorise(rel);
    if (!action) {
      return;
    }
    console.log(`[watch] ${rel} -> ${action}`);
    schedule(action);
  })
  .on("ready", () => {
    console.log(`[watch] watching ${watchPaths.length} path(s)`);
  });
