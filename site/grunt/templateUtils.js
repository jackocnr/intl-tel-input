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
          <path d="M7.775 3.275a3.25 3.25 0 0 1 4.596 0l.354.354a3.25 3.25 0 0 1 0 4.596l-1.7 1.7a3.25 3.25 0 0 1-4.596 0 .75.75 0 0 1 1.06-1.06 1.75 1.75 0 0 0 2.476 0l1.7-1.7a1.75 1.75 0 0 0 0-2.475l-.354-.354a1.75 1.75 0 0 0-2.475 0l-.85.85a.75.75 0 0 1-1.06-1.06z"/>
          <path d="M8.225 12.725a3.25 3.25 0 0 1-4.596 0l-.354-.354a3.25 3.25 0 0 1 0-4.596l1.7-1.7a3.25 3.25 0 0 1 4.596 0 .75.75 0 0 1-1.06 1.06 1.75 1.75 0 0 0-2.476 0l-1.7 1.7a1.75 1.75 0 0 0 0 2.475l.354.354a1.75 1.75 0 0 0 2.475 0l.85-.85a.75.75 0 0 1 1.06 1.06z"/>
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
