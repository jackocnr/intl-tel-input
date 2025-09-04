module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-config')(grunt);
  require('time-grunt')(grunt);
  require('google-closure-compiler').grunt(grunt, {
    platfrom: 'native'
  });

  /**
   * BUILD TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['build:img', 'translations', 'build:js']);
  // build translations
  grunt.registerTask('build:translations', ['translations', 'build:js']);
  // build utils
  grunt.registerTask('build:utils', ['closure-compiler:utils']);
  // just CSS
  grunt.registerTask('build:css', ['sass', 'cssmin']);
  // just images
  grunt.registerTask('build:img', ['shell:globeImages', 'generate-sprite', 'build:css']);
  // just javascript
  grunt.registerTask('build:js', [
    'shell:eslint',
    'closure-compiler:utils',
    'shell:genTsDeclaration',
    'shell:genReactTsDeclaration',
    'shell:genAngularTsDeclarationAndJs',
    'shell:buildJs',
    'replace',
    'build:react',
    'build:vue',
    'build:angular'
  ]);
  // fast version which only does the core plugin, not eslint, or TS declarations, or any of the wrapper components e.g. react
  grunt.registerTask('build:jsfast', ['shell:buildJs', 'replace']);
  // just react
  grunt.registerTask('build:react', ['replace:reactWithUtils', 'shell:buildReact']);
  // just vue
  grunt.registerTask('build:vue', ['replace:vueWithUtils', 'shell:buildVue']);
  // just angular
  grunt.registerTask('build:angular', ['replace:angularWithUtils', 'shell:buildAngular']);
  // stripped down build task for Travis which just builds the core plugin JS that is used by the tests (as we were having issues with sharp lib used by img task, and then the rollup dep used by the buildVue task)
  grunt.registerTask('build:travis', ['closure-compiler:utils', 'shell:buildJs']);

  /**
   * VERSIONING TASKS
   */
  // bump version number in 3 files, rebuild js to update headers, then commit, tag and push
  grunt.registerTask('version', ['shell:test', 'bump-only', 'js', 'bump-commit']);
  grunt.registerTask('version:minor', ['shell:test', 'bump-only:minor', 'js', 'bump-commit']);
  grunt.registerTask('version:major', ['shell:test', 'bump-only:major', 'js', 'bump-commit']);

};
