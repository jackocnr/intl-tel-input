module.exports = function (grunt) {
  // load all tasks from package.json
  require("load-grunt-config")(grunt);

  // build css
  grunt.registerTask("build:css", [
    "template:website_css",
    "template:large_flags_overrides_css",
    "sass",
    "cssmin",
  ]);

  // build esbuild
  grunt.registerTask("build:esbuild", [
    "template:internationalisation_js",
    "template:right_to_left_js",
    "template:react_component_js",
    "template:playground_js",
    "shell:esbuild",
  ]);

  // build vue component
  grunt.registerTask("build:vue_component", [
    "template:vue_component_js",
    "shell:vite",
  ]);

  // build all
  grunt.registerTask("build", [
    "shell:clearBuild",
    "copy",
    "build:css",
    "build:esbuild",
    "build:vue_component",
    "template",
  ]);
};
