module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-config')(grunt);
  require('time-grunt')(grunt);

  /**
   * TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['template:js', 'jshint:build', 'sass', 'uglify']);
  // just javascript
  grunt.registerTask('js', ['template:js', 'jshint:build', 'uglify']);
  // build examples
  grunt.registerTask('examples', ['template']);
  // Travis CI
  grunt.registerTask('travis', ['bower', 'jasmine']);
  // bump version number in 3 files, build to update js headers, then commit, tag and push
  grunt.registerTask('version', ['bump-only', 'uglify', 'bump-commit']);

};