module.exports = function (grunt) {
  // timestamp in asset URLs for cache busting
  var time = new Date().getTime();

  const path = require("path");
  const fs = require("fs");
  const MarkdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");

  const getI18nLanguages = () => {
    try {
      const i18nDir = path.join("build", "intl-tel-input", "js", "i18n");
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

  const slugifyHeading = (value) =>
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

  const defaultFenceRenderer = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    tokens[idx].info = normalizePrismFenceLanguage(tokens[idx].info);
    return defaultFenceRenderer(tokens, idx, options, env, self);
  };

  // ---- Nav dropdown pages (hardcoded) ----
  const docsDropdownPages = [
    { name: "getting_started", href: "/docs/getting-started.html", label: "Getting started" },
    { name: "options", href: "/docs/options.html", label: "Initialisation options" },
    { name: "methods", href: "/docs/methods.html", label: "Methods" },
    { name: "events", href: "/docs/events.html", label: "Events" },
    { name: "utils", href: "/docs/utils.html", label: "Utilities script" },
    { name: "theming", href: "/docs/theming.html", label: "Theming / Dark mode" },
    { name: "troubleshooting", href: "/docs/troubleshooting.html", label: "Troubleshooting" },
  ];

  const examplesDropdownPages = [
    { name: "validation_practical", href: "/examples/validation-practical.html", label: "Validation" },
    { name: "lookup_country", href: "/examples/lookup-country.html", label: "Lookup user's country" },
    { name: "only_countries", href: "/examples/only-countries.html", label: "Only countries" },
    { name: "single_country", href: "/examples/single-country.html", label: "Single country" },
    { name: "internationalisation", href: "/examples/internationalisation.html", label: "Internationalisation" },
    { name: "right_to_left", href: "/examples/right-to-left.html", label: "Right to Left" },
    { name: "hidden_input", href: "/examples/hidden-input.html", label: "Hidden input" },
    { name: "display_number", href: "/examples/display-number.html", label: "Display existing number" },
    { name: "multiple_instances", href: "/examples/multiple-instances.html", label: "Multiple instances" },
    { name: "validation_precise", href: "/examples/validation-precise.html", label: "Precise Validation (dangerous)" },
    { name: "large_flags", href: "/examples/large-flags.html", label: "Large flags" },
    { name: "react_component", href: "/examples/react-component.html", label: "React component" },
    { name: "vue_component", href: "/examples/vue-component.html", label: "Vue component" },
  ];

  const docsPageByName = docsDropdownPages.reduce((acc, p) => {
    acc[p.name] = p;
    return acc;
  }, {});

  const orderedDocsKeys = docsDropdownPages.map((p) => p.name);

  const readCommonPagePartials = () => ({
    common_meta_tags: grunt.file.read("src/shared/common_meta_tags.html"),
    common_styles: grunt.file.read("src/shared/common_styles.html"),
    analytics: grunt.file.read("src/shared/analytics.html"),
  });

  const readBootstrapScript = () =>
    grunt.file.read("src/shared/bootstrap_script.html");

  const readItiLiveResultsScript = () =>
    grunt.file.read("src/shared/iti_live_results_script.html");

  const readItiScript = () => grunt.file.read("tmp/shared/iti_script.html");

  const makeTemplateTask = (src, dest, data) => ({
    src,
    dest,
    options: {
      data,
    },
  });

  const makeLayoutTask = ({
    dest,
    showLeftSidebar,
    layoutClass,
    navPath,
    contentPath,
    name,
    pageType,
    extra = {},
  }) =>
    makeTemplateTask("src/layout_template.html.ejs", dest, () => ({
      showLeftSidebar,
      layoutClass,
      ...(navPath ? { nav: grunt.file.read(navPath) } : {}),
      content: grunt.file.read(contentPath),
      name,
      pageType,
      docsDropdownPages,
      examplesDropdownPages,
      ...extra,
    }));

  const makeExamplesContentTask = (dest, data) =>
    makeTemplateTask("src/examples/examples_content_template.html.ejs", dest, data);

  const makeExamplesPageTask = (dest, data) =>
    makeTemplateTask("src/examples/examples_page_template.html.ejs", dest, data);

  const EXAMPLES_NAV_PATH = "src/examples/examples_nav_template.html.ejs";

  const config = {
    // cache bust common assets
    iti_script: {
      src: "src/shared/iti_script.html.ejs",
      dest: "tmp/shared/iti_script.html",
      options: {
        data: () => ({ time }),
      },
    },
    website_css: {
      src: "src/css/website.css",
      dest: "build/css/website.css",
      options: {
        data: () => ({ time }),
      },
    },

    // homepage
    homepage_layout: {
      src: "src/layout_template.html.ejs",
      dest: "tmp/homepage/homepage_layout.html",
      options: {
        data: () => ({
          layoutClass: "iti-layout-no-sidebars",
          showLeftSidebar: false,
          content: grunt.file.read("src/homepage/homepage_content.html"),
          name: "home",
          pageType: "home",
          docsDropdownPages,
          examplesDropdownPages,
        }),
      },
    },
    homepage_page: {
      src: "src/homepage/homepage_template.html.ejs",
      dest: "build/index.html",
      options: {
        data: () => ({
          time: time,
          ...readCommonPagePartials(),
          layout: grunt.file.read("tmp/homepage/homepage_layout.html"),
          bootstrap_script: readBootstrapScript(),
          iti_live_results_script: readItiLiveResultsScript(),
          iti_script: readItiScript(),
        }),
      },
    },

    // playground
    playground_js: {
      src: "src/playground/playground.js",
      dest: "build/playground/playground.js",
      options: {
        data: () => ({ time, i18nLanguages: getI18nLanguages() }),
      },
    },
    playground_layout: {
      src: "src/layout_template.html.ejs",
      dest: "tmp/playground/playground_layout.html",
      options: {
        data: () => ({
          showLeftSidebar: false,
          layoutClass: "iti-layout-no-sidebars iti-layout--playground",
          content: grunt.file.read("src/playground/playground_content.html"),
          pageType: "playground",
          name: "playground",
          docsDropdownPages,
          examplesDropdownPages,
        }),
      },
    },
    playground_page: {
      src: "src/playground/playground_template.html.ejs",
      dest: "build/playground/index.html",
      options: {
        data: () => ({
          time: time,
          ...readCommonPagePartials(),
          layout: grunt.file.read("tmp/playground/playground_layout.html"),
          bootstrap_script: readBootstrapScript(),
          iti_live_results_script: readItiLiveResultsScript(),
          iti_script: readItiScript(),
        }),
      },
    },
  };

  const slugFromKey = (key) => key.replace(/_/g, "-");

  const registerExample = ({
    key,
    title,
    metaDesc,
    js = {},
    extraJsTasks = [],
    content = {},
    layoutExtra = {},
    pageExtra = {},
  }) => {
    const slug = slugFromKey(key);
    const jsSrc = js.src || `src/examples/js/${key}.js.ejs`;
    // some examples build to tmp first
    const jsDest = js.dest || `${js.destDir || "build"}/examples/js/${key}.js`;
    const codePath = content.codePath || jsDest;
    const scriptName = js.script || `${key}.js`;

    const contentDest = content.dest || `tmp/examples/${key}_content.html`;
    const layoutDest = content.layoutDest || `tmp/examples/${key}_layout.html`;
    const pageDest = content.pageDest || `build/examples/${slug}.html`;

    const markupPath =
      content.markupPath || `src/examples/html/${key}.html`;

    config[`${key}_js`] = makeTemplateTask(jsSrc, jsDest, () => ({ time }));

    extraJsTasks.forEach((t) => {
      config[t.key] = makeTemplateTask(t.src, t.dest, () => ({ time }));
    });

    config[`${key}_content`] = makeExamplesContentTask(contentDest, () => ({
      time,
      content_title: title,
      desc: grunt.file.read(`src/examples/copy/${key}_desc.html`),
      markup: grunt.file.read(markupPath),
      code: grunt.file.read(codePath),
      script: scriptName,
      ...(content.demo_note ? { demo_note: content.demo_note } : {}),
      ...(content.hideMarkupSection
        ? { hideMarkupSection: true }
        : {}),
      ...(content.isRtl ? { isRtl: true } : {}),
      ...(content.extraData ? content.extraData() : {}),
      bootstrap_script: readBootstrapScript(),
      ...(content.includeItiScript ? { iti_script: readItiScript() } : {}),
    }));

    config[`${key}_layout`] = makeLayoutTask({
      dest: layoutDest,
      showLeftSidebar: true,
      layoutClass: "iti-layout-both-sidebars",
      navPath: EXAMPLES_NAV_PATH,
      contentPath: contentDest,
      name: key,
      pageType: "examples",
      extra: layoutExtra,
    });

    config[`${key}_page`] = makeExamplesPageTask(pageDest, () => ({
      time,
      head_title: title,
      canonical_path: `examples/${slug}.html`,
      meta_desc: metaDesc,
      ...readCommonPagePartials(),
      content: grunt.file.read(layoutDest),
      ...pageExtra,
    }));
  };

  // ---- Examples (generated) ----
  registerExample({
    key: "lookup_country",
    title: "Lookup user's country",
    metaDesc: "Automatically set the country based on the user's IP address.",
    content: {
      markupPath: "src/examples/html/simple_input.html",
      includeItiScript: true,
    },
  });

  registerExample({
    key: "internationalisation",
    title: "Internationalisation",
    metaDesc: "Support the internationalisation of country names via the i18n option.",
    js: {
      destDir: "tmp",
      script: "internationalisation_bundle.js",
    },
    content: {
      markupPath: "src/examples/html/simple_input.html",
      codePath: "tmp/examples/js/internationalisation.js",
    },
  });

  registerExample({
    key: "right_to_left",
    title: "Right to left",
    metaDesc: "Support for right-to-left languages.",
    js: {
      destDir: "tmp",
      script: "right_to_left_bundle.js",
    },
    content: {
      markupPath: "src/examples/html/simple_input.html",
      isRtl: true,
      codePath: "tmp/examples/js/right_to_left.js",
    },
    layoutExtra: { isRtl: true },
  });

  registerExample({
    key: "only_countries",
    title: "Only countries option",
    metaDesc: "Only show European countries in the dropdown.",
    content: {
      markupPath: "src/examples/html/simple_input.html",
      includeItiScript: true,
    },
  });

  registerExample({
    key: "single_country",
    title: "Single country",
    metaDesc: "When you only need to handle numbers from a single country.",
    content: {
      demo_note: "<p>Enter a US number:</p>",
      markupPath: "src/examples/html/validation.html",
      includeItiScript: true,
    },
    pageExtra: { stylesheet_after_demo_css: "/examples/css/validation.css" },
  });

  registerExample({
    key: "validation_practical",
    title: "Validation",
    metaDesc:
      "Validate the user's phone number and if there's an error, display a relevant message.",
    content: {
      markupPath: "src/examples/html/validation.html",
      includeItiScript: true,
      extraData: () => ({
        demo_note: `<p>NOTE: by default, <code>isValidNumber</code> only returns <code>true</code> for <u>mobile</u> and <u>fixed line</u> numbers. See <code>allowedNumberTypes</code> option for more information.</p>`,
      }),
    },
    pageExtra: {
      stylesheet_after_demo_css: "/examples/css/validation.css",
    },
  });

  registerExample({
    key: "validation_precise",
    title: "Precise Validation (dangerous)",
    metaDesc:
      "Validate the user's phone number and if there's an error, display a relevant message.",
    content: {
      markupPath: "src/examples/html/validation.html",
      includeItiScript: true,
      extraData: () => ({
        demo_note: `<p>NOTE: by default, <code>isValidNumberPrecise</code> only returns <code>true</code> for <u>mobile</u> and <u>fixed line</u> numbers. See <code>allowedNumberTypes</code> option for more information.</p>`,
      }),
    },
    pageExtra: {
      stylesheet_after_demo_css: "/examples/css/validation.css",
    },
  });

  registerExample({
    key: "hidden_input",
    title: "Hidden input option",
    metaDesc:
      "Automatically populate a hidden input with the full international number, so it gets submitted to your backend.",
    content: {
      includeItiScript: true,
    },
  });

  registerExample({
    key: "multiple_instances",
    title: "Multiple instances",
    metaDesc: "Use multiple instances of the plugin on the same page.",
    content: {
      includeItiScript: true,
    },
    pageExtra: {
      stylesheet_after_demo_css: "/examples/css/multiple_instances.css",
    },
  });

  registerExample({
    key: "display_number",
    title: "Display existing number",
    metaDesc: "Automatically format an existing number.",
    js: {
      src: "src/examples/js/simple_init_plugin.js.ejs",
    },
    content: {
      includeItiScript: true,
    },
  });

  registerExample({
    key: "large_flags",
    title: "Large flags",
    metaDesc: "How to display extra large flag images.",
    js: {
      src: "src/examples/js/simple_init_plugin.js.ejs",
    },
    content: {
      markupPath: "src/examples/html/simple_input.html",
      includeItiScript: true,
    },
    pageExtra: {
      stylesheet_before_demo_css: "/css/intlTelInput-largeFlags.css",
    },
  });

  registerExample({
    key: "react_component",
    title: "React component",
    metaDesc: "How to use intl-tel-input with React.",
    js: {
      dest: "tmp/examples/js/react_component.js",
      script: "react_component_bundle.js",
    },
    extraJsTasks: [
      {
        key: "react_component_display_code_js",
        src: "src/examples/js/react_component_display_code.js.ejs",
        dest: "build/examples/js/react_component_display_code.js",
      },
    ],
    content: {
      markupPath: "src/examples/html/component.html",
      hideMarkupSection: true,
      codePath: "build/examples/js/react_component_display_code.js",
      script: "react_component_bundle.js",
    },
  });

  registerExample({
    key: "vue_component",
    title: "Vue component",
    metaDesc: "How to use intl-tel-input with Vue.",
    js: {
      // need to specify the source because of the alternative .vue extension
      src: "src/examples/js/vue_component.vue.ejs",
      dest: "tmp/examples/vue_component.vue",
      script: "vue_component_bundle.js",
    },
    extraJsTasks: [
      {
        key: "vue_component_display_code_js",
        src: "src/examples/js/vue_component_display_code.vue.ejs",
        dest: "build/examples/js/vue_component_display_code.vue",
      },
    ],
    content: {
      markupPath: "src/examples/html/component.html",
      hideMarkupSection: true,
      codePath: "build/examples/js/vue_component_display_code.vue",
      script: "vue_component_bundle.js",
    },
  });

  orderedDocsKeys.forEach((key) => {
    const mdPath = path.join("src", "docs", `${key}.md`);
    const urlSlug = key.replace(/_/g, "-");
    const destPath = `build/docs/${urlSlug}.html`;
    const canonicalPath = `docs/${urlSlug}.html`;
    const headTitle = (docsPageByName[key] && docsPageByName[key].label) || key;

    config[`docs_content_${key}`] = {
      src: "src/docs/docs_content_template.html.ejs",
      dest: `tmp/docs/${key}_content.html`,
      options: {
        data: () => ({
          html: md.render(grunt.file.read(mdPath)),
        }),
      },
    };

    config[`docs_layout_${key}`] = {
      src: "src/layout_template.html.ejs",
      dest: `tmp/docs/${key}_layout.html`,
      options: {
        data: () => ({
          showLeftSidebar: true,
          layoutClass: "iti-layout-both-sidebars",
          nav: grunt.file.read("src/docs/docs_nav_template.html.ejs"),
          content: grunt.file.read(`tmp/docs/${key}_content.html`),
          name: key,
          pageType: "docs",
          docsDropdownPages,
          examplesDropdownPages,
        }),
      },
    };

    config[`docs_page_${key}`] = {
      src: "src/docs/docs_page_template.html.ejs",
      dest: destPath,
      options: {
        data: () => ({
          time: time,
          head_title: headTitle,
          canonical_path: canonicalPath,
          meta_desc: `intl-tel-input documentation: ${headTitle}.`,
          ...readCommonPagePartials(),
          layout: grunt.file.read(`tmp/docs/${key}_layout.html`),
          bootstrap_script: readBootstrapScript(),
        }),
      },
    };
  });

  return config;
};
