module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-config')(grunt);
  require('time-grunt')(grunt);

  /**
   * TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['img', 'sass', 'js', 'jasmine']);
  // just images
  grunt.registerTask('img', ['responsive_images:retina', 'exec:evenizer', 'responsive_images:regular', 'sprite']);
  // just javascript
  grunt.registerTask('js', ['template:js1', 'template:js2', 'jshint', 'uglify', 'replace:one', 'replace:two', 'replace:three', 'replace:four']);
  // build examples
  grunt.registerTask('examples', ['template']);
  // Travis CI
  grunt.registerTask('travis', ['jasmine']);
  // bump version number in 3 files, rebuild js to update headers, then commit, tag and push
  grunt.registerTask('version', ['bump-only', 'js', 'bump-commit', 'shell:publish']);

};
