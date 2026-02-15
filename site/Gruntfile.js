module.exports = function (grunt) {
  // load all tasks from package.json
  require("load-grunt-config")(grunt);

  grunt.registerTask("strip-html-comments", () => {
    const htmlFiles = grunt.file.expand({ dot: true }, ["build/**/*.html"]);
    let updatedCount = 0;

    htmlFiles.forEach((filePath) => {
      const input = grunt.file.read(filePath);
      const output = input.replace(/<!--[\s\S]*?-->/g, "");
      if (output !== input) {
        grunt.file.write(filePath, output);
        updatedCount += 1;
      }
    });

    grunt.log.writeln(
      `strip-html-comments: processed ${htmlFiles.length} files, updated ${updatedCount}`
    );
  });

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
    "template:angular_component_js",
    "template:react_component_js",
    "template:playground_js",
    "shell:esbuild",
  ]);

  // build vue component
  grunt.registerTask("build:vue_component", [
    "template:vue_component_js",
    "shell:vite",
  ]);

  // build svelte component
  grunt.registerTask("build:svelte_component", [
    "template:svelte_component_js",
    "shell:viteSvelte",
  ]);

  // build all
  grunt.registerTask("build", [
    "shell:clearBuild",
    "copy",
    "build:css",
    "build:esbuild",
    "build:vue_component",
    "build:svelte_component",
    "template",
    "strip-html-comments",
  ]);
};
