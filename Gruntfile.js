module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-config')(grunt);
  require('time-grunt')(grunt);

  /**
   * TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['img', 'css', 'js']);
  // just CSS
  grunt.registerTask('css', ['sass', 'cssmin']);
  // just images
  grunt.registerTask('img', ['responsive_images:retina', 'exec:evenizer', 'responsive_images:regular', 'sprite', 'imagemin']);
  // just javascript (babel must go before we add the wrapper, to keep it's generated methods inside, so not globals)
  grunt.registerTask('js', ['eslint', 'template:jsAddVersion', 'babel', 'concat', 'uglify', 'replace']);

  // build examples
  grunt.registerTask('examples', ['template']);
  // Travis CI
  grunt.registerTask('travis', ['jasmine']);
  // bump version number in 3 files, rebuild js to update headers, then commit, tag and push
  grunt.registerTask('version', ['bump-only', 'js', 'bump-commit', 'shell:publish']);

};
