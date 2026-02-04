module.exports = function (grunt) {
  // load all tasks from package.json
  require("load-grunt-config")(grunt);

  // build everything ready for a commit
  grunt.registerTask("build", [
    "shell:clearBuild",
    "copy",
    "template:internationalisation_js",
    "template:right_to_left_js",
    "template:react_component_js",
    "shell:esbuild",
    "template:vue_component_js",
    "shell:vite",
    "template",
  ]);
};
