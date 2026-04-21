// Renders every HTML page (homepage, playground, 404, examples, docs) plus
// the various intermediate template files (CSS cache-bust, JS bundles,
// iti_script). Uses lodash.template.
import fs from "node:fs";
import path from "node:path";
import { renderPage, renderString } from "./template/render.js";
import {
  cacheBust,
  getDirHash,
  getI18nLanguages,
  buildOpenGraphMetaTags,
  createMarkdownRenderer,
} from "./template/utils.js";
import { docsDropdownPages, examplesDropdownPages } from "./template/nav.js";
import {
  readCommonPagePartials,
  readCommonBodyEndScript,
  readItiLiveResultsScript,
  readItiScript,
} from "./template/helpers.js";
import {
  renderPlaygroundPresetsHomepage,
  renderPlaygroundPresetsPlayground,
} from "../src/shared/playground_presets.js";
import {
  deriveNotesFromCode,
  renderNotesHtml,
  renderPlaygroundNotesHtml,
} from "../src/shared/notes.js";

// Always run from the site/ directory so all relative paths in templates and
// data functions resolve correctly (templates use paths like "src/...",
// "tmp/...", "dist/..." that assume cwd === site).
process.chdir(path.resolve(import.meta.dirname, ".."));

// CLI args ----------------------------------------------------------------

const args = process.argv.slice(2);
const env = (args.find((a) => a.startsWith("--env=")) || "--env=dev").slice(6);
const isDevBuild = env === "dev" || env === "development";
const taskFilter = (args.find((a) => a.startsWith("--task=")) || "").slice(7);

const md = createMarkdownRenderer();

// Local helper used by the localisation doc page only.
const toBcp47LanguageTag = (code) => {
  const raw = String(code || "").trim();
  if (!raw) {
    return "";
  }
  const parts = raw.split("-");
  if (parts.length === 1) {
    return parts[0].toLowerCase();
  }
  const [lang, region, ...rest] = parts;
  const normLang = String(lang).toLowerCase();
  const normRegion =
    region && region.length === 2
      ? String(region).toUpperCase()
      : String(region || "");
  return [normLang, normRegion, ...rest].filter(Boolean).join("-");
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const createI18nLanguageListText = (languageCodes) => {
  const codes = Array.isArray(languageCodes)
    ? languageCodes.filter(Boolean)
    : [];
  if (!codes.length) {
    return "_No language modules found._";
  }

  let displayNames = null;
  try {
    if (typeof Intl !== "undefined" && Intl.DisplayNames) {
      displayNames = new Intl.DisplayNames(["en"], { type: "language" });
    }
  } catch {
    displayNames = null;
  }

  const items = codes.map((code) => {
    const tag = toBcp47LanguageTag(code);
    let label = null;
    try {
      label = displayNames && tag ? displayNames.of(tag) : null;
    } catch {
      label = null;
    }
    return { code: String(code), label: label ? String(label) : "" };
  });

  items.sort((a, b) => {
    const aKey = a.label || a.code;
    const bKey = b.label || b.code;
    return aKey.localeCompare(bKey, "en", { sensitivity: "base" });
  });

  const listItems = items
    .map(({ code, label }) => {
      const text = escapeHtml(label ? `${label} (${code})` : code);
      return `  <li class="iti-locale-list__item">${text}</li>`;
    })
    .join("\n");
  return `<ul class="iti-locale-list">\n${listItems}\n</ul>`;
};

// Page metadata constants -------------------------------------------------

const homepageTitle = "International Telephone Input";
const homepageMetaDesc =
  "A JavaScript plugin for entering, formatting and validating international telephone numbers. Includes React, Vue, Angular and Svelte components.";
const homepageCanonicalUrl = "https://intl-tel-input.com";

const playgroundTitle = "Playground - International Telephone Input";
const playgroundMetaDesc =
  "Try different initialisation options and see the plugin update live.";
const playgroundCanonicalUrl = "https://intl-tel-input.com/playground";

const notFoundTitle = "404 - Page not found | intl-tel-input";
const notFoundMetaDesc = "Page not found.";
const notFoundCanonicalUrl = "https://intl-tel-input.com/404";

// Cache-bust task helper: in-place template substitution on a built CSS file.
const cssCacheBust = (key, file) => ({
  name: key,
  src: file,
  dest: file,
  data: () => ({ cacheBust }),
});

// Tasks definition --------------------------------------------------------
//
// Each entry is { name, src, dest, data }. Order matters because some tasks
// read files produced by earlier tasks. They are grouped here in execution order.

const tasks = [];

// 1. iti_script — used by many other pages.
tasks.push({
  name: "iti_script",
  src: "src/shared/iti_script.html.ejs",
  dest: "tmp/shared/iti_script.html",
  data: () => ({ cacheBust, isDevBuild }),
});

// 2. Cache bust any URLs inside CSS files
// e.g. url("<%= cacheBust('flags.webp') %>") → url("flags.webp?v=HASH")
tasks.push(cssCacheBust("website_css", "dist/css/website.css"));
tasks.push(cssCacheBust("homepage_css", "dist/css/homepage.css"));
tasks.push(cssCacheBust("docs_css", "dist/css/docs.css"));
tasks.push(cssCacheBust("playground_css", "dist/css/playground.css"));
tasks.push(
  cssCacheBust(
    "large_flags_overrides_css",
    "dist/css/large_flags_overrides.css",
  ),
);

// Shared "Notes" callouts are auto-derived from each page's display code at
// render time (see deriveNotesFromCode usage below), and the Playground
// renders the same set via a placeholder in playground_content.html. The note
// copy itself lives in src/shared/notes.js so both pipelines stay in sync.

// 3. Static "JS template" tasks — used as inputs to esbuild / vite.
//    Defined here so they can be invoked individually via --task=NAME from
//    npm scripts that need them before bundling (build:esbuild, build:vue,
//    build:svelte).
const exampleDefinitions = [
  {
    key: "lookup_country",
    title: "Lookup user's country",
    metaDesc: "Automatically set the country based on the user's IP address.",
    js: { destDir: "tmp" },
    content: {
      markupName: "simple_input",
      includeItiScript: true,
    },
  },
  {
    key: "right_to_left",
    title: "Right to left",
    metaDesc: "Support for right-to-left languages.",
    js: { destDir: "tmp", script: "right_to_left_bundle.js" },
    content: {
      markupName: "simple_input",
      isRtl: true,
    },
    layoutExtra: { isRtl: true },
  },
  {
    key: "single_country",
    title: "Single country",
    metaDesc: "When you only need to handle numbers from a single country.",
    content: {
      demo_note: "<p>Enter a US number:</p>",
      markupName: "validation",
      includeItiScript: true,
    },
    pageExtra: { stylesheet_after_website_css: "/examples/css/validation.css" },
  },
  {
    key: "validation_practical",
    title: "Validation",
    metaDesc:
      "Validate the user's phone number and if there's an error, display a relevant message.",
    js: { src: "src/examples/js/validation.ts", destDir: "tmp" },
    content: {
      markupName: "validation",
      includeItiScript: true,
      displayCode: "src/examples/js/validation_display_code.js",
      extraData: () => ({
        demo_note:
          "<p>NOTE: by default, <code>isValidNumber</code> only returns <code>true</code> for <i>mobile</i> and <i>fixed line</i> numbers. See <code>allowedNumberTypes</code> option for more information.</p>",
      }),
    },
    pageExtra: { stylesheet_after_website_css: "/examples/css/validation.css" },
  },
  {
    key: "validation_precise",
    title: "Precise validation (advanced)",
    metaDesc:
      "Validate the user's phone number using the more precise method, and if there's an error, display a relevant message.",
    js: { src: "src/examples/js/validation.ts", destDir: "tmp" },
    content: {
      markupName: "validation",
      includeItiScript: true,
      displayCode: "src/examples/js/validation_display_code.js",
      extraData: () => ({
        demo_note:
          "<p>NOTE: by default, <code>isValidNumberPrecise</code> only returns <code>true</code> for <i>mobile</i> and <i>fixed line</i> numbers. See <code>allowedNumberTypes</code> option for more information.</p>",
      }),
    },
    pageExtra: { stylesheet_after_website_css: "/examples/css/validation.css" },
  },
  {
    key: "hidden_input",
    title: "Hidden input",
    metaDesc:
      "Automatically populate a hidden input with the full international number, so it gets submitted to your backend.",
    js: { destDir: "tmp" },
    content: {
      includeItiScript: true,
      markupName: "validation",
    },
  },
  {
    key: "multiple_instances",
    title: "Multiple instances",
    metaDesc:
      "Use multiple instances of the plugin with different configurations on the same page.",
    js: { destDir: "tmp" },
    content: {
      includeItiScript: true,
    },
    pageExtra: {
      stylesheet_after_website_css: "/examples/css/multiple_instances.css",
    },
  },
  {
    key: "display_number",
    title: "Display existing number",
    metaDesc: "Automatically format an existing number during initialisation.",
    content: {
      includeItiScript: true,
    },
  },
  {
    key: "large_flags",
    title: "Large flags",
    metaDesc: "How to display extra large flag images.",
    js: { destDir: "tmp" },
    content: {
      markupName: "simple_input",
      includeItiScript: true,
    },
    pageExtra: { iti_styles: "largeFlags" },
  },
  {
    key: "angular_component",
    title: "Angular component",
    metaDesc: "How to use intl-tel-input with Angular.",
    js: {
      src: "src/examples/js/angular_component.ts",
      dest: "tmp/examples/js/angular_component.ts",
      script: "angular_component_bundle.js",
    },
    content: {
      markupName: "component",
      hideMarkupSection: true,
      script: "angular_component_bundle.js",
    },
  },
  {
    key: "react_component",
    title: "React component",
    metaDesc: "How to use intl-tel-input with React.",
    js: {
      src: "src/examples/js/react_component.tsx",
      dest: "tmp/examples/js/react_component.tsx",
      script: "react_component_bundle.js",
    },
    content: {
      markupName: "component",
      hideMarkupSection: true,
      script: "react_component_bundle.js",
    },
  },
  {
    key: "vue_component",
    title: "Vue component",
    metaDesc: "How to use intl-tel-input with Vue.",
    js: {
      src: "src/examples/js/vue_component.vue",
      dest: "tmp/examples/js/vue_component.vue",
      script: "vue_component_bundle.js",
    },
    content: {
      markupName: "component",
      hideMarkupSection: true,
      script: "vue_component_bundle.js",
    },
  },
  {
    key: "svelte_component",
    title: "Svelte component",
    metaDesc: "How to use intl-tel-input with Svelte.",
    js: {
      src: "src/examples/js/svelte_component.svelte",
      dest: "tmp/examples/js/svelte_component.svelte",
      script: "svelte_component_bundle.js",
    },
    content: {
      markupName: "component",
      hideMarkupSection: true,
      script: "svelte_component_bundle.js",
    },
  },
];

// For each example, push: js, content, layout, page tasks (in that order).
for (const def of exampleDefinitions) {
  const {
    key,
    title,
    metaDesc,
    js = {},
    content = {},
    layoutExtra = {},
    pageExtra = {},
  } = def;
  const slug = key.replace(/_/g, "-");
  const jsSrc = js.src || `src/examples/js/${key}.ts`;
  // For tmp/ destinations the file is consumed by esbuild, which handles .ts
  // natively — preserve the source extension so esbuild reads the right loader.
  // For dist/ destinations the file is served to the browser as-is, so the
  // extension is forced to .js (and TypeScript types are stripped at render time).
  const destDir = js.destDir || "dist";
  const jsExt = destDir === "tmp" && jsSrc.endsWith(".ts") ? ".ts" : ".js";
  const jsDest = js.dest || `${destDir}/examples/js/${key}${jsExt}`;
  const srcExt = path.extname(jsSrc);
  const displayCodeExt = [".vue", ".svelte"].includes(srcExt) ? srcExt : ".js";
  const displayCode =
    content.displayCode || `src/examples/js/${key}_display_code${displayCodeExt}`;
  const scriptName = js.script || `${key}.js`;

  const contentDest = content.dest || `tmp/examples/${key}_content.html`;
  const layoutDest = content.layoutDest || `tmp/examples/${key}_layout.html`;
  const pageDest = content.pageDest || `dist/examples/${slug}.html`;

  const markupName = content.markupName || key;
  const markupPath = `src/examples/html/${markupName}.html`;
  const displayMarkupCandidate = `src/examples/html/${markupName}_display_code.html`;
  const displayMarkupPath = fs.existsSync(displayMarkupCandidate)
    ? displayMarkupCandidate
    : markupPath;

  const fullTitle = `${title} example - International Telephone Input`;
  const canonicalUrl = `https://intl-tel-input.com/examples/${slug}`;

  const templateData = { cacheBust, ...(js.data || {}) };

  // 3a. Per-example JS template task — renders source through lodash before
  // the bundler picks it up. Used by build:esbuild / build:vue / build:svelte.
  tasks.push({
    name: `${key}_js`,
    src: jsSrc,
    dest: jsDest,
    data: () => templateData,
  });

  // 4. Example content (read markup, demo code, etc).
  tasks.push({
    name: `${key}_content`,
    src: "src/examples/examples_content_template.html.ejs",
    dest: contentDest,
    data: () => {
      let displayCodeContent = fs.readFileSync(displayCode, "utf8");
      // hack so that the validation_precise example page shows the right
      // validation method in the displayed code
      if (key === "validation_precise") {
        displayCodeContent = displayCodeContent.replace(
          /\biti\.isValidNumber\(\)/g,
          "iti.isValidNumberPrecise()",
        );
      }
      const renderedDisplayCode = renderString(displayCodeContent, templateData);
      const notes = deriveNotesFromCode(renderedDisplayCode);
      return {
        cacheBust,
        content_title: title,
        desc: fs.readFileSync(`src/examples/copy/${key}_desc.html`, "utf8"),
        markup: fs.readFileSync(markupPath, "utf8"),
        display_markup: fs.readFileSync(displayMarkupPath, "utf8"),
        display_code: renderedDisplayCode,
        script: scriptName,
        ...(content.demo_note ? { demo_note: content.demo_note } : {}),
        ...(content.hideMarkupSection ? { hideMarkupSection: true } : {}),
        ...(content.isRtl ? { isRtl: true } : {}),
        ...(notes.length ? { notesHtml: renderNotesHtml(notes) } : {}),
        ...(content.extraData ? content.extraData() : {}),
        common_body_end: readCommonBodyEndScript(),
        ...(content.includeItiScript ? { iti_script: readItiScript() } : {}),
      };
    },
  });

  // 5. Example layout (wraps content in src/layout_template.html.ejs).
  tasks.push({
    name: `${key}_layout`,
    src: "src/layout_template.html.ejs",
    dest: layoutDest,
    data: () =>
      ({
        showLeftSidebar: true,
        layoutClass: "iti-layout-both-sidebars",
        nav: fs.readFileSync("src/examples/examples_nav_template.html.ejs", "utf8"),
        content: fs.readFileSync(contentDest, "utf8"),
        name: key,
        pageType: "examples",
        docsDropdownPages,
        examplesDropdownPages,
        ...layoutExtra,
      }),
  });

  // 6. Example page (wraps layout in the page template).
  tasks.push({
    name: `${key}_page`,
    src: "src/examples/examples_page_template.html.ejs",
    dest: pageDest,
    data: () => ({
      cacheBust,
      head_title: fullTitle,
      canonical_url: canonicalUrl,
      meta_desc: metaDesc,
      og_meta_tags: buildOpenGraphMetaTags({
        title: fullTitle,
        description: metaDesc,
        url: canonicalUrl,
      }),
      ...readCommonPagePartials({
        cacheBust,
        isDevBuild,
        iti_styles: pageExtra.iti_styles || "normal",
        highlightjs_styles: true,
      }),
      content: fs.readFileSync(layoutDest, "utf8"),
      ...pageExtra,
    }),
  });
}

// 7. Static "page wrapper" pages: homepage, playground, 404.

// playground_js — runs alongside the example *_js tasks (early), since
// the bundler reads it.
tasks.push({
  name: "playground_js",
  src: "src/playground/js/templates/playgroundConstants.js.ejs",
  dest: "tmp/playground/playgroundConstants.js",
  data: () => ({
    cacheBust,
    getDirHash,
    i18nLanguages: getI18nLanguages(),
  }),
});

// homepage_js — templates cacheBust() tokens in homepage.ts into tmp/ where
// esbuild picks it up. Same pattern as the example *_js tasks.
tasks.push({
  name: "homepage_js",
  src: "src/js/homepage.ts",
  dest: "tmp/js/homepage.ts",
  data: () => ({ cacheBust }),
});

// homepage
tasks.push({
  name: "homepage_layout",
  src: "src/layout_template.html.ejs",
  dest: "tmp/homepage/homepage_layout.html",
  data: () => {
    const stats = JSON.parse(fs.readFileSync("tmp/stats.json", "utf8"));
    const content = fs
      .readFileSync("src/homepage/homepage_content.html", "utf8")
      .replace("{{STAT_WEBSITES}}", stats.websites)
      .replace("{{STAT_DOWNLOADS}}", stats.downloads)
      .replace("{{STAT_STARS}}", stats.stars)
      .replace("{{STAT_LOCALES}}", getI18nLanguages().length)
      .replace("{{PLAYGROUND_PRESETS}}", renderPlaygroundPresetsHomepage());
    return {
      layoutClass: "iti-layout-no-sidebars",
      showLeftSidebar: false,
      content,
      name: "home",
      pageType: "home",
      docsDropdownPages,
      examplesDropdownPages,
    };
  },
});

tasks.push({
  name: "homepage_page",
  src: "src/homepage/homepage_page_template.html.ejs",
  dest: "dist/index.html",
  data: () => ({
    homepageTitle,
    homepageMetaDesc,
    homepageCanonicalUrl,
    cacheBust,
    isDevBuild,
    ...readCommonPagePartials({
      cacheBust,
      isDevBuild,
      iti_styles: "homepage",
    }),
    og_meta_tags: buildOpenGraphMetaTags({
      title: homepageTitle,
      description: homepageMetaDesc,
      url: homepageCanonicalUrl,
    }),
    layout: fs.readFileSync("tmp/homepage/homepage_layout.html", "utf8"),
    common_body_end: readCommonBodyEndScript(),
    iti_live_results_script: readItiLiveResultsScript({ cacheBust }),
    iti_script: readItiScript(),
  }),
});

// playground
tasks.push({
  name: "playground_layout",
  src: "src/layout_template.html.ejs",
  dest: "tmp/playground/playground_layout.html",
  data: () => ({
    showLeftSidebar: false,
    layoutClass: "iti-layout-no-sidebars iti-layout--playground",
    content: fs
      .readFileSync("src/playground/playground_content.html", "utf8")
      .replace("{{PLAYGROUND_PRESETS}}", renderPlaygroundPresetsPlayground())
      .replace(
        "{{PLAYGROUND_NOTES}}",
        renderPlaygroundNotesHtml(["strictMode", "geoIpLookup"]),
      ),
    pageType: "playground",
    name: "playground",
    docsDropdownPages,
    examplesDropdownPages,
  }),
});

tasks.push({
  name: "playground_page",
  src: "src/playground/playground_page_template.html.ejs",
  dest: "dist/playground.html",
  data: () => ({
    playgroundTitle,
    playgroundMetaDesc,
    playgroundCanonicalUrl,
    cacheBust,
    ...readCommonPagePartials({
      cacheBust,
      isDevBuild,
      iti_styles: "normal",
      highlightjs_styles: true,
    }),
    og_meta_tags: buildOpenGraphMetaTags({
      title: playgroundTitle,
      description: playgroundMetaDesc,
      url: playgroundCanonicalUrl,
    }),
    layout: fs.readFileSync("tmp/playground/playground_layout.html", "utf8"),
    common_body_end: readCommonBodyEndScript(),
    iti_live_results_script: readItiLiveResultsScript({ cacheBust }),
    iti_script: readItiScript(),
  }),
});

// 404
tasks.push({
  name: "not_found_layout",
  src: "src/layout_template.html.ejs",
  dest: "tmp/404/not_found_layout.html",
  data: () => ({
    showLeftSidebar: false,
    layoutClass: "iti-layout-no-sidebars",
    content: fs.readFileSync("src/404/404_content.html", "utf8"),
    pageType: "home",
    name: "404",
    docsDropdownPages,
    examplesDropdownPages,
  }),
});

tasks.push({
  name: "not_found_page",
  src: "src/404/404_page_template.html.ejs",
  dest: "dist/404.html",
  data: () => ({
    cacheBust,
    head_title: notFoundTitle,
    canonical_url: notFoundCanonicalUrl,
    meta_desc: notFoundMetaDesc,
    og_meta_tags: buildOpenGraphMetaTags({
      title: notFoundTitle,
      description: notFoundMetaDesc,
      url: notFoundCanonicalUrl,
    }),
    ...readCommonPagePartials({ cacheBust, isDevBuild, iti_styles: "none" }),
    layout: fs.readFileSync("tmp/404/not_found_layout.html", "utf8"),
    common_body_end: readCommonBodyEndScript(),
  }),
});

// 8. Docs pages — content (markdown) → layout → page.
const docsDefinitions = [
  {
    key: "getting_started",
    title: "Getting started",
    metaDesc:
      "Get started with intl-tel-input. Choose your integration: pure JavaScript plugin, or React, Vue, Angular or Svelte component.",
  },
  {
    key: "javascript_plugin",
    title: "JavaScript plugin",
    metaDesc:
      "How to get up and running with the intl-tel-input JavaScript plugin.",
  },
  {
    key: "options",
    title: "Initialisation options",
    metaDesc:
      "All the different options you can use when initialising intl-tel-input.",
  },
  {
    key: "localisation",
    title: "Localisation",
    metaDesc:
      "How to localise country names and user interface strings, including RTL support.",
  },
  {
    key: "accessibility",
    title: "Accessibility",
    metaDesc:
      "Accessibility guidance for intl-tel-input, including keyboard and screen reader support.",
  },
  {
    key: "methods",
    title: "Methods",
    metaDesc:
      "All the different methods you can call on an intl-tel-input instance.",
  },
  {
    key: "events",
    title: "Events",
    metaDesc:
      "All the different events that an intl-tel-input instance can emit.",
  },
  {
    key: "utils",
    title: "Utils script",
    metaDesc: "Learn about the utils script, what it's for and how to load it.",
  },
  {
    key: "theming",
    title: "Theming / dark mode",
    metaDesc:
      "How to theme the plugin, including how to set it up for dark mode.",
  },
  {
    key: "troubleshooting",
    title: "Troubleshooting",
    metaDesc: "Solutions to common problems and FAQs about intl-tel-input.",
  },
  {
    key: "faq",
    title: "FAQ",
    metaDesc:
      "Frequently asked questions about intl-tel-input, including common setup and localisation topics.",
  },
  {
    key: "react_component",
    title: "React component",
    metaDesc: "How to use the intl-tel-input React component.",
  },
  {
    key: "vue_component",
    title: "Vue component",
    metaDesc: "How to use the intl-tel-input Vue component.",
  },
  {
    key: "angular_component",
    title: "Angular component",
    metaDesc: "How to use the intl-tel-input Angular component.",
  },
  {
    key: "svelte_component",
    title: "Svelte component",
    metaDesc: "How to use the intl-tel-input Svelte component.",
  },
];

for (const { key, title, metaDesc } of docsDefinitions) {
  const mdPath = path.join("src", "docs", "markdown", `${key}.md`);
  const urlSlug = key.replace(/_/g, "-");
  const destPath = `dist/docs/${urlSlug}.html`;
  const canonicalUrl = `https://intl-tel-input.com/docs/${urlSlug}`;
  const fullTitle = `${title} docs - International Telephone Input`;

  tasks.push({
    name: `docs_content_${key}`,
    src: "src/docs/docs_content_template.html.ejs",
    dest: `tmp/docs/${key}_content.html`,
    data: () => ({
      docKey: key,
      html: (() => {
        let source = fs.readFileSync(mdPath, "utf8");
        const locales = getI18nLanguages();
        source = source.replaceAll(
          "<!-- I18N_LOCALE_COUNT -->",
          String(locales.length),
        );
        if (key === "localisation") {
          const localeList = createI18nLanguageListText(locales);
          source = source.replace(
            "<!-- I18N_LOCALE_LIST -->",
            `\n${localeList}\n`,
          );
        }
        return md.render(source, { docKey: key });
      })(),
    }),
  });

  tasks.push({
    name: `docs_layout_${key}`,
    src: "src/layout_template.html.ejs",
    dest: `tmp/docs/${key}_layout.html`,
    data: () => ({
      showLeftSidebar: true,
      layoutClass: "iti-layout-both-sidebars",
      nav: fs.readFileSync("src/docs/docs_nav_template.html.ejs", "utf8"),
      content: fs.readFileSync(`tmp/docs/${key}_content.html`, "utf8"),
      name: key,
      pageType: "docs",
      docsDropdownPages,
      examplesDropdownPages,
    }),
  });

  tasks.push({
    name: `docs_page_${key}`,
    src: "src/docs/docs_page_template.html.ejs",
    dest: destPath,
    data: () => ({
      cacheBust,
      head_title: fullTitle,
      canonical_url: canonicalUrl,
      meta_desc: metaDesc,
      og_meta_tags: buildOpenGraphMetaTags({
        title: fullTitle,
        description: metaDesc,
        url: canonicalUrl,
      }),
      ...readCommonPagePartials({
        cacheBust,
        isDevBuild,
        highlightjs_styles: true,
        iti_styles: "none",
      }),
      layout: fs.readFileSync(`tmp/docs/${key}_layout.html`, "utf8"),
      common_body_end: readCommonBodyEndScript(),
    }),
  });
}

// Run --------------------------------------------------------------------

const tasksByName = new Map(tasks.map((t) => [t.name, t]));

function runTask(t) {
  renderPage(t);
  console.log(`File '${t.dest}' created.`);
}

if (taskFilter) {
  // --task=name1,name2,...
  const wanted = taskFilter
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const name of wanted) {
    const t = tasksByName.get(name);
    if (!t) {
      console.error(`build-pages: unknown task '${name}'`);
      process.exit(1);
    }
    runTask(t);
  }
} else {
  for (const t of tasks) {
    runTask(t);
  }
}
