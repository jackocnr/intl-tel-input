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

// This plugin (AI-generated) looks for the "options" doc, and injects extra layout markup for display purposes. It relies on each h6 option being immediately followed by a paragraph containing the Type/Default info, and then any remaining content for that option (e.g. description, examples) coming after that in the same section (until the next heading).
const addDocOptionsLayoutPlugin = (md) => {
  md.core.ruler.after("inline", "iti_doc_options_layout", (state) => {
    const env = state.env || {};
    if (env.docKey !== "options") return;

    const tokens = state.tokens;
    const isHeadingOpen = (token, tag) => token && token.type === "heading_open" && token.tag === tag;
    const isAnyHeadingOpen = (token) => token && token.type === "heading_open" && /^h[1-6]$/.test(token.tag);

    const makeHtmlBlock = (content) => {
      const token = new state.Token("html_block", "", 0);
      token.content = content;
      return token;
    };

    const startRow = () =>
      makeHtmlBlock(
        '<div class="iti-doc-options__row">\n' +
          '  <div class="iti-doc-options__cell iti-doc-options__cell--key">\n',
      );

    const switchToValueCell = () =>
      makeHtmlBlock(
        "  </div>\n" +
          '  <div class="iti-doc-options__cell iti-doc-options__cell--value">\n',
      );

    const endRow = () => makeHtmlBlock("  </div>\n</div>\n");

    const nextTokens = [];
    let i = 0;

    const consumeThroughHeadingClose = (tag) => {
      while (i < tokens.length) {
        const t = tokens[i];
        nextTokens.push(t);
        i += 1;
        if (t.type === "heading_close" && t.tag === tag) return;
      }
    };

    const consumeOneParagraph = () => {
      if (i >= tokens.length || tokens[i].type !== "paragraph_open") return false;
      while (i < tokens.length) {
        const t = tokens[i];
        nextTokens.push(t);
        i += 1;
        if (t.type === "paragraph_close") return true;
      }
      return true;
    };

    const consumeUntilNextHeading = () => {
      while (i < tokens.length) {
        const t = tokens[i];
        if (isAnyHeadingOpen(t)) return;
        nextTokens.push(t);
        i += 1;
      }
    };

    const consumeOptionBlock = () => {
      nextTokens.push(startRow());

      // H6 heading (option name) lives in the key cell.
      nextTokens.push(tokens[i]);
      i += 1;
      consumeThroughHeadingClose("h6");

      // First paragraph (Type/Default) also lives in the key cell.
      const hadMetaParagraph = consumeOneParagraph();

      // Switch to the value cell for the rest of the option content.
      nextTokens.push(switchToValueCell());

      // If there was no Type/Default paragraph, we still want to consume content in the value cell.
      if (!hadMetaParagraph) {
        // no-op (value cell is already open)
      }

      consumeUntilNextHeading();
      nextTokens.push(endRow());
    };

    while (i < tokens.length) {
      const token = tokens[i];
      if (isHeadingOpen(token, "h6")) {
        consumeOptionBlock();
        continue;
      }

      nextTokens.push(token);
      i += 1;
    }

    state.tokens = nextTokens;
  });
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

  addDocOptionsLayoutPlugin(md);
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
