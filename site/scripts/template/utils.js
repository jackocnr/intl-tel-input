import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItGithubAlerts from "markdown-it-github-alerts";

const BUILD_DIR = "dist";
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

// This plugin (AI-generated) injects table layout markup around each h6 entry (option/method/etc) whose heading is immediately followed by a paragraph containing a "Type:" declaration. Any remaining content for that entry (e.g. description, examples) is grouped into the same section, until the next heading. Only runs on docs listed in docOptionsLayoutDocKeys.
const docOptionsLayoutDocKeys = [
  "options",
  "methods",
  "react_component",
  "vue_component",
  "angular_component",
  "svelte_component",
];

const addDocOptionsLayoutPlugin = (md) => {
  md.core.ruler.after("inline", "iti_doc_options_layout", (state) => {
    const env = state.env || {};
    if (!docOptionsLayoutDocKeys.includes(env.docKey)) {
      return;
    }
    const headingTag = "h6";

    const tokens = state.tokens;
    const isHeadingOpen = (token, tag) =>
      token && token.type === "heading_open" && token.tag === tag;
    const isAnyHeadingOpen = (token) =>
      token && token.type === "heading_open" && /^h[1-6]$/.test(token.tag);

    const makeHtmlBlock = (content) => {
      const token = new state.Token("html_block", "", 0);
      token.content = content;
      return token;
    };

    const startRowAndKeyCellMarkup = () =>
      makeHtmlBlock(
        `<div class="iti-doc-options__row">\n` +
          `  <div class="iti-doc-options__cell iti-doc-options__cell--key">\n`,
      );

    const endKeyCellAndStartValueCellMarkup = () =>
      makeHtmlBlock(
        "  </div>\n" +
          `  <div class="iti-doc-options__cell iti-doc-options__cell--value">\n`,
      );

    const endValueCellAndRowMarkup = () => makeHtmlBlock("  </div>\n</div>\n");

    const nextTokens = [];
    let i = 0;

    const consumeThroughHeadingClose = (tagName) => {
      while (i < tokens.length) {
        const t = tokens[i];
        nextTokens.push(t);
        i += 1;
        if (t.type === "heading_close" && t.tag === tagName) {
          return;
        }
      }
    };

    const findHeadingCloseIndex = (startIndex, tagName) => {
      for (let k = startIndex; k < tokens.length; k += 1) {
        const t = tokens[k];
        if (t.type === "heading_close" && t.tag === tagName) {
          return k;
        }
      }
      return -1;
    };

    const consumeUntilNextHeading = () => {
      while (i < tokens.length) {
        const t = tokens[i];
        if (isAnyHeadingOpen(t)) {
          return;
        }
        nextTokens.push(t);
        i += 1;
      }
    };

    const consumeOptionBlock = () => {
      nextTokens.push(startRowAndKeyCellMarkup());

      // The entry heading (option/method name) lives in the key cell.
      nextTokens.push(tokens[i]);
      i += 1;
      consumeThroughHeadingClose(headingTag);

      // The Type/Default paragraph also lives in the key cell.
      // Consume paragraph_open, inline, paragraph_close.
      while (i < tokens.length && tokens[i].type !== "paragraph_close") {
        nextTokens.push(tokens[i]);
        i += 1;
      }
      if (i < tokens.length && tokens[i].type === "paragraph_close") {
        nextTokens.push(tokens[i]);
        i += 1;
      }

      // Switch to the value cell for the rest of the option content.
      nextTokens.push(endKeyCellAndStartValueCellMarkup());

      consumeUntilNextHeading();
      nextTokens.push(endValueCellAndRowMarkup());
    };

    while (i < tokens.length) {
      const token = tokens[i];
      if (isHeadingOpen(token, headingTag)) {
        // Only treat this heading as an entry row when the very next block
        // after the heading close is a paragraph containing all required meta substrings
        const closeIndex = findHeadingCloseIndex(i, headingTag);
        const afterClose = closeIndex >= 0 ? closeIndex + 1 : -1;
        if (
          afterClose >= 0 &&
          tokens[afterClose] &&
          tokens[afterClose].type === "paragraph_open"
        ) {
          const inlineToken = tokens[afterClose + 1];
          const inlineContent =
            inlineToken && inlineToken.type === "inline"
              ? inlineToken.content
              : "";
          if (inlineContent.includes("Type:")) {
            consumeOptionBlock();
            continue;
          }
        }

        // Not an entry row: emit the heading tokens unchanged.
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

const createMarkdownRenderer = ({
  slugifyHeading = defaultSlugifyHeading,
} = {}) => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    slugify: slugifyHeading,
    permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
  }).use(markdownItGithubAlerts);

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
  if (hashCacheByPath.has(resolved)) {
    return hashCacheByPath.get(resolved);
  }

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
  if (hashCacheByPath.has(cacheKey)) {
    return hashCacheByPath.get(cacheKey);
  }

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
      .readdirSync(i18nDir)
      .filter((f) => f.endsWith(".js") && f !== "index.js" && f !== "types.js")
      .map((f) => f.replace(/\.js$/, ""))
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
    .replace(/"/g, "&quot;");

const buildOpenGraphMetaTags = ({ title, description, url }) => {
  return [
    `<meta property="og:site_name" content="International Telephone Input" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(title)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(
      description,
    )}" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(url)}" />`,
    `<meta property="og:image" content="https://intl-tel-input.com/img/logo-green.png" />`,
  ].join("\n");
};

export {
  createMarkdownRenderer,
  cacheBust,
  getDirHash,
  getI18nLanguages,
  buildOpenGraphMetaTags,
};
