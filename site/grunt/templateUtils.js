const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const MarkdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const BUILD_DIR = "build";
const HASH_LENGTH = 12;

const hashCacheByPath = new Map();

const toPosixPath = (p) => String(p || "").replace(/\\/g, "/");

const defaultSlugifyHeading = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    // remove apostrophes
    .replace(/['’]/g, "")
    // replace non-alphanumeric with hyphens
    .replace(/[^a-z0-9]+/g, "-")
    // collapse repeats
    .replace(/-+/g, "-")
    // trim hyphens
    .replace(/^-|-$/g, "");

// Prism language ids differ from common fence shorthands.
// E.g. Prism uses "markup" for HTML, and "javascript" (not "js").
const normalizePrismFenceLanguage = (info) => {
  const trimmed = (info || "").trim();
  if (!trimmed) return info;

  const [rawLang, ...restParts] = trimmed.split(/\s+/);
  const lang = String(rawLang).toLowerCase();
  const rest = restParts.length ? ` ${restParts.join(" ")}` : "";

  const languageMap = {
    html: "markup",
    js: "javascript",
  };

  const mappedLang = languageMap[lang] || lang;
  return `${mappedLang}${rest}`;
};

const createMarkdownRenderer = ({ slugifyHeading = defaultSlugifyHeading } = {}) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    slugify: slugifyHeading,
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "before",
      symbol: `
        <svg class="iti-anchor-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
        </svg>
      `,
    }),
  });

  const defaultFenceRenderer = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    tokens[idx].info = normalizePrismFenceLanguage(tokens[idx].info);
    return defaultFenceRenderer(tokens, idx, options, env, self);
  };

  return md;
};

const resolveBuildPathFromUrl = (urlPath) => {
  const clean = toPosixPath(String(urlPath || "").split("?")[0]);
  const withoutLeadingSlash = clean.replace(/^\//, "");
  return path.join(BUILD_DIR, withoutLeadingSlash);
};

const hashFile = (filePath) => {
  const resolved = path.resolve(filePath);
  if (hashCacheByPath.has(resolved)) return hashCacheByPath.get(resolved);

  try {
    const content = fs.readFileSync(resolved);
    const hash = crypto
      .createHash("sha256")
      .update(content)
      .digest("hex")
      .slice(0, HASH_LENGTH);
    hashCacheByPath.set(resolved, hash);
    return hash;
  } catch {
    const fallback = "missing";
    hashCacheByPath.set(resolved, fallback);
    return fallback;
  }
};

const hashDirRecursive = (dirPath) => {
  const resolved = path.resolve(dirPath);
  const cacheKey = `${resolved}:dir`;
  if (hashCacheByPath.has(cacheKey)) return hashCacheByPath.get(cacheKey);

  try {
    const files = [];
    const walk = (currentDir) => {
      fs.readdirSync(currentDir, { withFileTypes: true }).forEach((entry) => {
        const abs = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          walk(abs);
        } else if (entry.isFile()) {
          files.push(abs);
        }
      });
    };

    walk(resolved);
    files.sort((a, b) => a.localeCompare(b));

    const hasher = crypto.createHash("sha256");
    files.forEach((abs) => {
      const rel = path.relative(resolved, abs);
      hasher.update(rel);
      hasher.update("\0");
      hasher.update(fs.readFileSync(abs));
      hasher.update("\0");
    });

    const hash = hasher.digest("hex").slice(0, HASH_LENGTH);
    hashCacheByPath.set(cacheKey, hash);
    return hash;
  } catch {
    const fallback = "missing";
    hashCacheByPath.set(cacheKey, fallback);
    return fallback;
  }
};

// Returns a query string fragment (no leading '?'), e.g. "v=abc123".
const cacheBust = (urlPath, filePath) => {
  const resolvedPath = filePath
    ? path.resolve(String(filePath))
    : resolveBuildPathFromUrl(urlPath);
  return `v=${hashFile(resolvedPath)}`;
};

// Directory variant for runtime-dynamic imports (e.g. /i18n/${code}/index.js).
const cacheBustDir = (urlDirPath, dirPath) => {
  const resolvedPath = dirPath
    ? path.resolve(String(dirPath))
    : resolveBuildPathFromUrl(urlDirPath);
  return `v=${hashDirRecursive(resolvedPath)}`;
};

const getI18nLanguages = () => {
  try {
    const i18nDir = path.join(BUILD_DIR, "intl-tel-input", "js", "i18n");
    return fs
      .readdirSync(i18nDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
};

module.exports = {
  createMarkdownRenderer,
  cacheBust,
  cacheBustDir,
  getI18nLanguages,
};
