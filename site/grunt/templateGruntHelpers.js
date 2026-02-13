const LAYOUT_TEMPLATE_PATH = "src/layout_template.html.ejs";
const EXAMPLES_CONTENT_TEMPLATE_PATH = "src/examples/examples_content_template.html.ejs";
const EXAMPLES_PAGE_TEMPLATE_PATH = "src/examples/examples_page_template.html.ejs";

const makeTemplateTask = (src, dest, data) => ({
  src,
  dest,
  options: {
    data,
  },
});

const readCommonPagePartials = (grunt, data) => ({
  common_meta_tags: grunt.file.read("src/shared/common_meta_tags.html"),
  bootstrap_styles: grunt.file.read("src/shared/bootstrap_styles.html"),
  iti_styles: grunt.template.process(grunt.file.read("src/shared/iti_styles.html.ejs"), {
    data,
  }),
  common_head_end: grunt.file.read("src/shared/common_head_end.html"),
});

const readCommonBodyEndScript = (grunt) => grunt.file.read("src/shared/common_body_end.html");

const readItiLiveResultsScript = (grunt, data) =>
  grunt.template.process(grunt.file.read("src/shared/iti_live_results_script.html.ejs"), {
    data,
  });

const readItiScript = (grunt) => grunt.file.read("tmp/shared/iti_script.html");

const makeLayoutTask = (
  grunt,
  {
    dest,
    showLeftSidebar,
    layoutClass,
    navPath,
    contentPath,
    name,
    pageType,
    docsDropdownPages,
    examplesDropdownPages,
    extra = {},
  }
) =>
  makeTemplateTask(LAYOUT_TEMPLATE_PATH, dest, () => ({
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

module.exports = {
  LAYOUT_TEMPLATE_PATH,
  EXAMPLES_CONTENT_TEMPLATE_PATH,
  EXAMPLES_PAGE_TEMPLATE_PATH,
  makeTemplateTask,
  makeLayoutTask,
  readCommonPagePartials,
  readCommonBodyEndScript,
  readItiLiveResultsScript,
  readItiScript,
};
