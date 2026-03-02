module.exports = function (grunt) {
  const path = require("path");
  const {
    cacheBust,
    getDirHash,
    getI18nLanguages,
    createMarkdownRenderer,
    buildOpenGraphMetaTags,
  } = require("./templateUtils");

  const env = grunt.option("env");
  const isDevBuild = env === "dev" || env === "development";
  const showRightSidebarAd = !isDevBuild;

  const {
    makeTemplateTask,
    makeLayoutTask,
    readCommonPagePartials,
    readCommonBodyEndScript,
    readItiLiveResultsScript,
    readItiScript,
  } = require("./templateGruntHelpers");

  // Helper: create a cache-bust template task for a built asset path
  const makeCacheBustTask = (assetPath) => ({
    src: assetPath,
    dest: assetPath,
    options: { data: () => ({ cacheBust }) },
  });

  const {
    docsDropdownPages,
    examplesDropdownPages,
  } = require("./templateNav");

  const md = createMarkdownRenderer();

  const toBcp47LanguageTag = (code) => {
    const raw = String(code || "").trim();
    if (!raw) return "";
    const parts = raw.split("-");
    if (parts.length === 1) return parts[0].toLowerCase();
    const [lang, region, ...rest] = parts;
    const normLang = String(lang).toLowerCase();
    const normRegion = region && region.length === 2 ? String(region).toUpperCase() : String(region || "");
    return [normLang, normRegion, ...rest].filter(Boolean).join("-");
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const createI18nLanguageListText = (languageCodes) => {
    const codes = Array.isArray(languageCodes) ? languageCodes.filter(Boolean) : [];
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

    const items = codes
      .map((code) => {
        const tag = toBcp47LanguageTag(code);
        let label = null;
        try {
          label = displayNames && tag ? displayNames.of(tag) : null;
        } catch {
          label = null;
        }

        return {
          code: String(code),
          label: label ? String(label) : "",
        };
      });

    items.sort((a, b) => {
      const aKey = a.label || a.code;
      const bKey = b.label || b.code;
      return aKey.localeCompare(bKey, "en", { sensitivity: "base" });
    });

    return items
      .map(({ code, label }) => {
        const text = label ? `${label} (${code})` : code;
        return escapeHtml(text);
      })
      .join(", ");
  };

  const homepageTitle = "International Telephone Input";
  const homepageMetaDesc = "A JavaScript plugin for entering, formatting and validating international telephone numbers. Includes React, Vue, Angular and Svelte components.";
  const homepageCanonicalUrl = "https://intl-tel-input.com";
  const playgroundTitle = "Playground - International Telephone Input";
  const playgroundMetaDesc = "Try different initialisation options and see the plugin update live.";
  const playgroundCanonicalUrl = "https://intl-tel-input.com/playground";

  const config = {
    // cache bust common assets
    iti_script: {
      src: "src/shared/iti_script.html.ejs",
      dest: "tmp/shared/iti_script.html",
      options: {
        data: () => ({ cacheBust, isDevBuild }),
      },
    },
    website_css: makeCacheBustTask("build/css/website.css"),
    homepage_css: makeCacheBustTask("build/css/homepage.css"),
    docs_css: makeCacheBustTask("build/css/docs.css"),
    playground_css: makeCacheBustTask("build/css/playground.css"),
    large_flags_overrides_css: makeCacheBustTask("build/css/large_flags_overrides.css"),

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
      src: "src/homepage/homepage_page_template.html.ejs",
      dest: "build/index.html",
      options: {
        data: () => ({
          homepageTitle,
          homepageMetaDesc,
          homepageCanonicalUrl,
          cacheBust,
          isDevBuild,
          ...readCommonPagePartials(grunt, { cacheBust, isDevBuild }),
          og_meta_tags: buildOpenGraphMetaTags({
            title: homepageTitle,
            description: homepageMetaDesc,
            url: homepageCanonicalUrl,
          }),
          layout: grunt.file.read("tmp/homepage/homepage_layout.html"),
          common_body_end: readCommonBodyEndScript(grunt),
          iti_live_results_script: readItiLiveResultsScript(grunt, { cacheBust }),
          iti_script: readItiScript(grunt),
        }),
      },
    },

    // playground
    playground_js: {
      src: "src/playground/js/templates/playgroundConstants.js.ejs",
      dest: "tmp/playground/playgroundConstants.js",
      options: {
        data: () => ({
          cacheBust,
          getDirHash,
          i18nLanguages: getI18nLanguages(),
        }),
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
      src: "src/playground/playground_page_template.html.ejs",
      dest: "build/playground.html",
      options: {
        data: () => ({
          playgroundTitle,
          playgroundMetaDesc,
          playgroundCanonicalUrl,
          cacheBust,
          ...readCommonPagePartials(grunt, { cacheBust, isDevBuild }),
          og_meta_tags: buildOpenGraphMetaTags({
            title: playgroundTitle,
            description: playgroundMetaDesc,
            url: playgroundCanonicalUrl,
          }),
          layout: grunt.file.read("tmp/playground/playground_layout.html"),
          common_body_end: readCommonBodyEndScript(grunt),
          iti_live_results_script: readItiLiveResultsScript(grunt, { cacheBust }),
          iti_script: readItiScript(grunt),
        }),
      },
    },
  };

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
    const slug = key.replace(/_/g, "-");
    const jsSrc = js.src || `src/examples/js/${key}.js`;
    // some examples build to tmp first
    const jsDest = js.dest || `${js.destDir || "build"}/examples/js/${key}.js`;
    const displayCode = content.displayCode || jsDest;
    const scriptName = js.script || `${key}.js`;

    const contentDest = content.dest || `tmp/examples/${key}_content.html`;
    const layoutDest = content.layoutDest || `tmp/examples/${key}_layout.html`;
    const pageDest = content.pageDest || `build/examples/${slug}.html`;

    // the HTML to actually use for the demo
    const markupName = content.markupName || key;
    const markupPath = `src/examples/html/${markupName}.html`;
    // the (cleaner) HTML we want to display in the "Html" section
    const displayMarkupCandidate = `src/examples/html/${markupName}_display_code.html`;
    const displayMarkupPath = grunt.file.exists(displayMarkupCandidate) ? displayMarkupCandidate : markupPath;

    const fullTitle = `${title} example - International Telephone Input`;
    const canonicalUrl = `https://intl-tel-input.com/examples/${slug}`;

    const templateData = {
      cacheBust,
      ...(js.data || {}),
    };

    config[`${key}_js`] = makeTemplateTask(jsSrc, jsDest, () => templateData);

    extraJsTasks.forEach((t) => {
      config[t.key] = makeTemplateTask(t.src, t.dest, () => ({ cacheBust }));
    });

    config[`${key}_content`] = makeTemplateTask(
      "src/examples/examples_content_template.html.ejs",
      contentDest,
      () => ({
        cacheBust,
        content_title: title,
        desc: grunt.file.read(`src/examples/copy/${key}_desc.html`),
        markup: grunt.file.read(markupPath),
        display_markup: grunt.file.read(displayMarkupPath),
        display_code: (() => {
          let displayCodeContent = grunt.file.read(displayCode);
          // hack so that the validation_precise example page shows the right validation method in the displayed code
          if (key === "validation_precise") {
            displayCodeContent = displayCodeContent.replace(
              /\biti\.isValidNumber\(\)/g,
              "iti.isValidNumberPrecise()"
            );
          }
          return grunt.template.process(displayCodeContent, { data: templateData });
        })(),
        script: scriptName,
        ...(content.demo_note ? { demo_note: content.demo_note } : {}),
        ...(content.hideMarkupSection
          ? { hideMarkupSection: true }
          : {}),
        ...(content.isRtl ? { isRtl: true } : {}),
        ...(content.extraData ? content.extraData() : {}),
        common_body_end: readCommonBodyEndScript(grunt),
        ...(content.includeItiScript
          ? { iti_script: readItiScript(grunt) }
          : {}),
      })
    );

    config[`${key}_layout`] = makeLayoutTask(grunt, {
      dest: layoutDest,
      showLeftSidebar: true,
      layoutClass: "iti-layout-both-sidebars",
      navPath: "src/examples/examples_nav_template.html.ejs",
      contentPath: contentDest,
      name: key,
      pageType: "examples",
      docsDropdownPages,
      examplesDropdownPages,
      extra: {
        ...layoutExtra,
        show_right_sidebar_ad: showRightSidebarAd,
      },
    });

    config[`${key}_page`] = makeTemplateTask(
      "src/examples/examples_page_template.html.ejs",
      pageDest,
      () => ({
        cacheBust,
        head_title: fullTitle,
        canonical_url: canonicalUrl,
        meta_desc: metaDesc,
        og_meta_tags: buildOpenGraphMetaTags({
          title: fullTitle,
          description: metaDesc,
          url: canonicalUrl,
        }),
        ...readCommonPagePartials(grunt, { cacheBust, isDevBuild }),
        content: grunt.file.read(layoutDest),
        ...pageExtra,
      })
    );
  };

  const docsDefinitions = [{
    key: "choose_integration",
    title: "Choose integration",
    metaDesc: "Which integration of intl-tel-input is right for you? Pure JavaScript, React, Vue, Angular or Svelte component?",
  }, {
    key: "getting_started",
    title: "Getting started",
    metaDesc: "How to quickly get up and running with intl-tel-input.",
  }, {
    key: "options",
    title: "Initialisation options",
    metaDesc: "All the different options you can use when initialising intl-tel-input.",
  }, {
    key: "localisation",
    title: "Localisation",
    metaDesc: "How to localise country names and user interface strings, including RTL support.",
  }, {
    key: "methods",
    title: "Methods",
    metaDesc: "All the different methods you can call on an intl-tel-input instance.",
  }, {
    key: "events",
    title: "Events",
    metaDesc: "All the different events that an intl-tel-input instance can emit.",
  }, {
    key: "utils",
    title: "Utilities script",
    metaDesc: "Learn about the utils script, what it's for and how to load it.",
  }, {
    key: "theming",
    title: "Theming / dark mode",
    metaDesc: "How to theme the plugin, including how to set it up for dark mode.",
  }, {
    key: "troubleshooting",
    title: "Troubleshooting",
    metaDesc: "Solutions to common problems and FAQs about intl-tel-input.",
  }, {
    key: "react_component",
    title: "React component",
    metaDesc: "How to use the intl-tel-input React component.",
  }, {
    key: "vue_component",
    title: "Vue component",
    metaDesc: "How to use the intl-tel-input Vue component.",
  }, {
    key: "angular_component",
    title: "Angular component",
    metaDesc: "How to use the intl-tel-input Angular component.",
  }, {
    key: "svelte_component",
    title: "Svelte component",
    metaDesc: "How to use the intl-tel-input Svelte component.",
  }];

  const exampleDefinitions = [{
    key: "lookup_country",
    title: "Lookup user's country",
    metaDesc: "Automatically set the country based on the user's IP address.",
    js: {
      // evaluate the template into tmp, then use esbuild for IPAPI_TOKEN injection
      destDir: "tmp",
    },
    content: {
      markupName: "simple_input",
      includeItiScript: true,
    },
  }, {
    key: "internationalisation",
    title: "Internationalisation",
    metaDesc: "Support the internationalisation of country names via the i18n option.",
    js: {
      destDir: "tmp",
      script: "internationalisation_bundle.js",
    },
    content: {
      markupName: "simple_input",
      displayCode: "src/examples/js/internationalisation_display_code.js",
    },
  }, {
    key: "right_to_left",
    title: "Right to left",
    metaDesc: "Support for right-to-left languages.",
    js: {
      destDir: "tmp",
      script: "right_to_left_bundle.js",
    },
    content: {
      markupName: "simple_input",
      isRtl: true,
      displayCode: "src/examples/js/right_to_left_display_code.js",
    },
    layoutExtra: { isRtl: true },
  }, {
    key: "single_country",
    title: "Single country",
    metaDesc: "When you only need to handle numbers from a single country.",
    content: {
      demo_note: "<p>Enter a US number:</p>",
      markupName: "validation",
      includeItiScript: true,
    },
    pageExtra: { stylesheet_after_demo_css: "/examples/css/validation.css" },
  }, {
    key: "validation_practical",
    title: "Validation",
    metaDesc:
      "Validate the user's phone number and if there's an error, display a relevant message.",
    js: {
      src: "src/examples/js/validation.js",
    },
    content: {
      markupName: "validation",
      includeItiScript: true,
      displayCode: "src/examples/js/validation_display_code.js",
      extraData: () => ({
        demo_note: `<p>NOTE: by default, <code>isValidNumber</code> only returns <code>true</code> for <i>mobile</i> and <i>fixed line</i> numbers. See <code>allowedNumberTypes</code> option for more information.</p>`,
      }),
    },
    pageExtra: {
      stylesheet_after_demo_css: "/examples/css/validation.css",
    },
  }, {
    key: "validation_precise",
    title: "Precise validation (dangerous)",
    metaDesc:
      "Validate the user's phone number using the more precise method, and if there's an error, display a relevant message.",
    js: {
      src: "src/examples/js/validation.js",
    },
    content: {
      markupName: "validation",
      includeItiScript: true,
      displayCode: "src/examples/js/validation_display_code.js",
      extraData: () => ({
        demo_note: `<p>NOTE: by default, <code>isValidNumberPrecise</code> only returns <code>true</code> for <i>mobile</i> and <i>fixed line</i> numbers. See <code>allowedNumberTypes</code> option for more information.</p>`,
      }),
    },
    pageExtra: {
      stylesheet_after_demo_css: "/examples/css/validation.css",
    },
  }, {
    key: "hidden_input",
    title: "Hidden input",
    metaDesc:
      "Automatically populate a hidden input with the full international number, so it gets submitted to your backend.",
    content: {
      includeItiScript: true,
    },
  }, {
    key: "multiple_instances",
    title: "Multiple instances",
    metaDesc: "Use multiple instances of the plugin with different configurations on the same page.",
    content: {
      includeItiScript: true,
    },
    pageExtra: {
      stylesheet_after_demo_css: "/examples/css/multiple_instances.css",
    },
  }, {
    key: "display_number",
    title: "Display existing number",
    metaDesc: "Automatically format an existing number during initialisation.",
    js: {
      src: "src/examples/js/simple_init_plugin.js",
    },
    content: {
      includeItiScript: true,
    },
  }, {
    key: "large_flags",
    title: "Large flags",
    metaDesc: "How to display extra large flag images.",
    js: {
      src: "src/examples/js/simple_init_plugin.js",
    },
    content: {
      markupName: "simple_input",
      includeItiScript: true,
    },
    pageExtra: {
      stylesheet_before_demo_css: "/css/intlTelInput-largeFlags.css",
      stylesheet_after_demo_css: "/css/large_flags_overrides.css",
      omit_iti_styles: true, // as using special large styles instead
    },
  }, {
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
      displayCode: "src/examples/js/angular_component_display_code.js",
      script: "angular_component_bundle.js",
    },
  }, {
    key: "react_component",
    title: "React component",
    metaDesc: "How to use intl-tel-input with React.",
    js: {
      dest: "tmp/examples/js/react_component.js",
      script: "react_component_bundle.js",
    },
    content: {
      markupName: "component",
      hideMarkupSection: true,
      displayCode: "src/examples/js/react_component_display_code.js",
      script: "react_component_bundle.js",
    },
  }, {
    key: "vue_component",
    title: "Vue component",
    metaDesc: "How to use intl-tel-input with Vue.",
    js: {
      // need to specify the source because of the alternative .vue extension
      src: "src/examples/js/vue_component.vue",
      dest: "tmp/examples/js/vue_component.vue",
      script: "vue_component_bundle.js",
    },
    content: {
      markupName: "component",
      hideMarkupSection: true,
      displayCode: "src/examples/js/vue_component_display_code.vue",
      script: "vue_component_bundle.js",
    },
  }, {
    key: "svelte_component",
    title: "Svelte component",
    metaDesc: "How to use intl-tel-input with Svelte.",
    js: {
      // need to specify the source because of the alternative .svelte extension
      src: "src/examples/js/svelte_component.svelte",
      dest: "tmp/examples/js/svelte_component.svelte",
      script: "svelte_component_bundle.js",
    },
    content: {
      markupName: "component",
      hideMarkupSection: true,
      displayCode: "src/examples/js/svelte_component_display_code.svelte",
      script: "svelte_component_bundle.js",
    },
  }];

  exampleDefinitions.forEach((definition) => registerExample(definition));

  docsDefinitions.forEach(({ key, title, metaDesc }) => {
    const mdPath = path.join("src", "docs", "markdown", `${key}.md`);
    const urlSlug = key.replace(/_/g, "-");
    const destPath = `build/docs/${urlSlug}.html`;
    const canonicalUrl = `https://intl-tel-input.com/docs/${urlSlug}`;
    const fullTitle = `${title} docs - International Telephone Input`;

    config[`docs_content_${key}`] = {
      src: "src/docs/docs_content_template.html.ejs",
      dest: `tmp/docs/${key}_content.html`,
      options: {
        data: () => ({
          html: (() => {
            let source = grunt.file.read(mdPath);
            if (key === "localisation") {
              const languageList = createI18nLanguageListText(getI18nLanguages());
              source = source.replace("<!-- I18N_LANGUAGE_LIST -->", `\n${languageList}\n`);
            }
            return md.render(source, { docKey: key });
          })(),
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
          show_right_sidebar_ad: showRightSidebarAd,
        }),
      },
    };

    config[`docs_page_${key}`] = {
      src: "src/docs/docs_page_template.html.ejs",
      dest: destPath,
      options: {
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
          ...readCommonPagePartials(grunt, { cacheBust, isDevBuild }),
          layout: grunt.file.read(`tmp/docs/${key}_layout.html`),
          common_body_end: readCommonBodyEndScript(grunt),
        }),
      },
    };
  });

  return config;
};
