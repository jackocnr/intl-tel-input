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

// This plugin (AI-generated) looks for the "options" doc (etc), and injects table layout markup for display purposes. It relies on each h6 option being immediately followed by a paragraph containing the Type/Default info, and then any remaining content for that option (e.g. description, examples) coming after that in the same section (until the next heading).
const addDocOptionsLayoutPlugin = (md) => {
  md.core.ruler.after("inline", "iti_doc_options_layout", (state) => {
    const env = state.env || {};
    const applyToDocKeys = ["options", "react_component", "vue_component", "angular_component", "svelte_component"];
    if (!applyToDocKeys.includes(env.docKey)) return;

    const tokens = state.tokens;
    const isHeadingOpen = (token, tag) => token && token.type === "heading_open" && token.tag === tag;
    const isAnyHeadingOpen = (token) => token && token.type === "heading_open" && /^h[1-6]$/.test(token.tag);

    const makeHtmlBlock = (content) => {
      const token = new state.Token("html_block", "", 0);
      token.content = content;
      return token;
    };

    const startRowAndKeyCellMarkup = () =>
      makeHtmlBlock(
        '<div class="iti-doc-options__row">\n' +
          '  <div class="iti-doc-options__cell iti-doc-options__cell--key">\n',
      );

    const endKeyCellAndStartValueCellMarkup = () =>
      makeHtmlBlock(
        "  </div>\n" +
          '  <div class="iti-doc-options__cell iti-doc-options__cell--value">\n',
      );

    const endValueCellAndRowMarkup = () => makeHtmlBlock("  </div>\n</div>\n");

    const nextTokens = [];
    let i = 0;

    const consumeThroughHeadingClose = (tagName) => {
      while (i < tokens.length) {
        const t = tokens[i];
        nextTokens.push(t);
        i += 1;
        if (t.type === "heading_close" && t.tag === tagName) return;
      }
    };

    const findHeadingCloseIndex = (startIndex, tagName) => {
      for (let k = startIndex; k < tokens.length; k += 1) {
        const t = tokens[k];
        if (t.type === "heading_close" && t.tag === tagName) return k;
      }
      return -1;
    };

    // ad blocks are divs with class="article-ad", but MarkdownIt treats divs and their contents as a single raw "html_block" token
    const isAdBlockOpen = (token) => token.type === "html_block" && token.content.includes('class="article-ad"');

    const consumeUntilNextHeadingOrAdBlock = () => {
      while (i < tokens.length) {
        const t = tokens[i];
        if (isAnyHeadingOpen(t) || isAdBlockOpen(t)) return;
        nextTokens.push(t);
        i += 1;
      }
    };

    const consumeOptionBlock = () => {
      nextTokens.push(startRowAndKeyCellMarkup());

      // H6 heading (option name) lives in the key cell.
      nextTokens.push(tokens[i]);
      i += 1;
      consumeThroughHeadingClose("h6");

      // Switch to the value cell for the rest of the option content.
      nextTokens.push(endKeyCellAndStartValueCellMarkup());

      consumeUntilNextHeadingOrAdBlock();
      nextTokens.push(endValueCellAndRowMarkup());
    };

    while (i < tokens.length) {
      const token = tokens[i];
      if (isHeadingOpen(token, "h6")) {
        // Only treat this heading as an "option" row when the very next block
        // after the heading close is a paragraph containing the Type/Default meta info
        const closeIndex = findHeadingCloseIndex(i, "h6");
        const afterClose = closeIndex >= 0 ? closeIndex + 1 : -1;
        if (afterClose >= 0 && tokens[afterClose] && tokens[afterClose].type === "paragraph_open") {
          const inlineToken = tokens[afterClose + 1];
          const inlineContent = inlineToken && inlineToken.type === "inline" ? inlineToken.content : "";
          if (inlineContent.includes("Type:") && inlineContent.includes("Default:")) {
            consumeOptionBlock();
            continue;
          }
        }

        // Not an options entry: emit the heading tokens unchanged.
        nextTokens.push(token);
        i += 1;
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

// Take a URL path (e.g. "/intl-tel-input/js/utils.js"), resolve it to a file in the build directory, hash that file, and return the URL with a cache-busting query param (e.g. "/intl-tel-input/js/utils.js?v=abc123").
const cacheBust = (urlPath) => {
  const resolvedPath = resolveBuildPathFromUrl(urlPath);
  return `${urlPath}?v=${hashFile(resolvedPath)}`;
};

// Take a URL path to a directory (e.g. "/intl-tel-input/js/i18n"), resolve it to a directory in the build directory, hash all files within that directory recursively, and return the hash to use as a cache-busting query param (e.g. "abc123").
const getDirHash = (urlDirPath) => {
  const resolvedPath = resolveBuildPathFromUrl(urlDirPath);
  return hashDirRecursive(resolvedPath);
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

const escapeHtmlAttr = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildOpenGraphMetaTags = ({
  siteName,
  type = "website",
  title,
  description,
  url,
  image,
}) => {
  return [
    `<meta property="og:site_name" content="${escapeHtmlAttr(siteName)}" />`,
    `<meta property="og:type" content="${escapeHtmlAttr(type)}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(title)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(description)}" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(url)}" />`,
    `<meta property="og:image" content="${escapeHtmlAttr(image)}" />`,
  ].join("\n");
};

module.exports = {
  createMarkdownRenderer,
  cacheBust,
  getDirHash,
  getI18nLanguages,
  buildOpenGraphMetaTags,
};
