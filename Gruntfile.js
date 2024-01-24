module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-config')(grunt);
  require('time-grunt')(grunt);
  require('google-closure-compiler').grunt(grunt, {
    platfrom: 'native'
  })

  /**
   * TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['css', 'js']);
  // build utils
  grunt.registerTask('build:utils', ['closure-compiler:utils']);
  // just CSS
  grunt.registerTask('css', ['sass', 'cssmin']);
  // just images
  grunt.registerTask('img', ['responsive_images:retina', 'exec:evenizer', 'responsive_images:regular', 'sprite', 'imagemin']);
  // just javascript (babel must go before we add the wrapper, to keep it's generated methods inside, so not globals)
  grunt.registerTask('js', ['eslint', 'template:jsAddVersion', 'babel', 'concat', 'uglify', 'replace', 'shell:buildReact']);

  // Travis CI
  grunt.registerTask('travis', ['jasmine']);
  // bump version number in 3 files, rebuild js to update headers, then commit, tag and push
  grunt.registerTask('version', ['bump-only', 'js', 'bump-commit']);
  grunt.registerTask('version:minor', ['bump-only:minor', 'js', 'bump-commit']);
  grunt.registerTask('version:major', ['bump-only:major', 'js', 'bump-commit']);

};
