const makeTemplateTask = (src, dest, data) => ({
  src,
  dest,
  options: {
    data,
  },
});

const readCommonPagePartials = (grunt, data) => ({
  common_meta_tags: grunt.file.read("src/shared/common_meta_tags.html"),
  common_styles: grunt.template.process(grunt.file.read("src/shared/common_styles.html.ejs"), {
    data,
  }),
  common_head_end_prod: data && data.isDevBuild
    ? ""
    : grunt.file.read("src/shared/common_head_end_prod.html"),
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

module.exports = {
  makeTemplateTask,
  makeLayoutTask,
  readCommonPagePartials,
  readCommonBodyEndScript,
  readItiLiveResultsScript,
  readItiScript,
};
