module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-config')(grunt);
  require('time-grunt')(grunt);

  /**
   * TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['responsive_images', 'exec:evenizer', 'retinafy', 'sprite', 'sass', 'js', 'jasmine']);
  // just javascript
  grunt.registerTask('js', ['template:js', 'jshint', 'uglify', 'replace:one', 'replace:two', 'replace:three', 'replace:four']);
  // build examples
  grunt.registerTask('examples', ['template']);
  // Travis CI
  grunt.registerTask('travis', ['bower', 'jasmine']);
  // bump version number in 3 files, rebuild js to update headers, then commit, tag and push
  grunt.registerTask('version', ['bump-only', 'js', 'bump-commit', 'shell:publish']);

};
