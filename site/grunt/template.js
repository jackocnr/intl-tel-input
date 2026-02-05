module.exports = function (grunt) {
  const path = require("path");
  const {
    cacheBust,
    cacheBustDir,
    getI18nLanguages,
    createMarkdownRenderer,
  } = require("./templateUtils");

  const {
    makeTemplateTask,
    makeLayoutTask,
    readCommonPagePartials,
    readBootstrapScript,
    readItiLiveResultsScript,
    readItiScript,
    LAYOUT_TEMPLATE_PATH,
    EXAMPLES_CONTENT_TEMPLATE_PATH,
    EXAMPLES_PAGE_TEMPLATE_PATH,
  } = require("./templateGruntHelpers");

  const {
    docsDropdownPages,
    examplesDropdownPages,
    docsPageByName,
    orderedDocsKeys,
  } = require("./templateNav");

  const md = createMarkdownRenderer();

  const config = {
    // cache bust common assets
    iti_script: {
      src: "src/shared/iti_script.html.ejs",
      dest: "tmp/shared/iti_script.html",
      options: {
        data: () => ({ cacheBust }),
      },
    },
    website_css: {
      src: "src/css/website.css",
      dest: "build/css/website.css",
      options: {
        data: () => ({ cacheBust }),
      },
    },

    // homepage
    homepage_layout: {
      src: LAYOUT_TEMPLATE_PATH,
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
          cacheBust,
          ...readCommonPagePartials(grunt, { cacheBust }),
          layout: grunt.file.read("tmp/homepage/homepage_layout.html"),
          bootstrap_script: readBootstrapScript(grunt),
          iti_live_results_script: readItiLiveResultsScript(grunt),
          iti_script: readItiScript(grunt),
        }),
      },
    },

    // playground
    playground_js: {
      src: "src/playground/playground.js",
      dest: "build/playground/playground.js",
      options: {
        data: () => ({
          cacheBust,
          cacheBustDir,
          i18nLanguages: getI18nLanguages(),
        }),
      },
    },
    playground_layout: {
      src: LAYOUT_TEMPLATE_PATH,
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
          cacheBust,
          ...readCommonPagePartials(grunt, { cacheBust }),
          layout: grunt.file.read("tmp/playground/playground_layout.html"),
          bootstrap_script: readBootstrapScript(grunt),
          iti_live_results_script: readItiLiveResultsScript(grunt),
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

    config[`${key}_js`] = makeTemplateTask(jsSrc, jsDest, () => ({ cacheBust }));

    extraJsTasks.forEach((t) => {
      config[t.key] = makeTemplateTask(t.src, t.dest, () => ({ cacheBust }));
    });

    config[`${key}_content`] = makeTemplateTask(
      EXAMPLES_CONTENT_TEMPLATE_PATH,
      contentDest,
      () => ({
        cacheBust,
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
        bootstrap_script: readBootstrapScript(grunt),
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
      extra: layoutExtra,
    });

    config[`${key}_page`] = makeTemplateTask(
      EXAMPLES_PAGE_TEMPLATE_PATH,
      pageDest,
      () => ({
        cacheBust,
        head_title: title,
        canonical_path: `examples/${slug}.html`,
        meta_desc: metaDesc,
        ...readCommonPagePartials(grunt, { cacheBust }),
        content: grunt.file.read(layoutDest),
        ...pageExtra,
      })
    );
  };

  const exampleDefinitions = [
  {
    key: "lookup_country",
    title: "Lookup user's country",
    metaDesc: "Automatically set the country based on the user's IP address.",
    content: {
      markupPath: "src/examples/html/simple_input.html",
      includeItiScript: true,
    },
  },
  {
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
  },
  {
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
  },
  {
    key: "only_countries",
    title: "Only countries option",
    metaDesc: "Only show European countries in the dropdown.",
    content: {
      markupPath: "src/examples/html/simple_input.html",
      includeItiScript: true,
    },
  },
  {
    key: "single_country",
    title: "Single country",
    metaDesc: "When you only need to handle numbers from a single country.",
    content: {
      demo_note: "<p>Enter a US number:</p>",
      markupPath: "src/examples/html/validation.html",
      includeItiScript: true,
    },
    pageExtra: { stylesheet_after_demo_css: "/examples/css/validation.css" },
  },
  {
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
  },
  {
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
  },
  {
    key: "hidden_input",
    title: "Hidden input option",
    metaDesc:
      "Automatically populate a hidden input with the full international number, so it gets submitted to your backend.",
    content: {
      includeItiScript: true,
    },
  },
  {
    key: "multiple_instances",
    title: "Multiple instances",
    metaDesc: "Use multiple instances of the plugin on the same page.",
    content: {
      includeItiScript: true,
    },
    pageExtra: {
      stylesheet_after_demo_css: "/examples/css/multiple_instances.css",
    },
  },
  {
    key: "display_number",
    title: "Display existing number",
    metaDesc: "Automatically format an existing number.",
    js: {
      src: "src/examples/js/simple_init_plugin.js.ejs",
    },
    content: {
      includeItiScript: true,
    },
  },
  {
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
      stylesheet_after_demo_css: "/css/large_flags_overrides.css",
      omit_iti_styles: true, // as using special large styles instead
    },
  },
  {
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
  },
  {
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
  }];
  exampleDefinitions.forEach((definition) => registerExample(definition));

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
      src: LAYOUT_TEMPLATE_PATH,
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
          cacheBust,
          head_title: headTitle,
          canonical_path: canonicalPath,
          meta_desc: `intl-tel-input documentation: ${headTitle}.`,
          ...readCommonPagePartials(grunt, { cacheBust }),
          layout: grunt.file.read(`tmp/docs/${key}_layout.html`),
          bootstrap_script: readBootstrapScript(grunt),
        }),
      },
    };
  });

  return config;
};
