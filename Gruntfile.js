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
    'build:tsDeclarations',
    'shell:buildJs',
    'replace',
    'build:components',
  ]);
  // just TS declaration files
  grunt.registerTask('build:tsDeclarations', [
    'shell:genTsDeclaration',
    'shell:genReactTsDeclaration',
    'shell:genAngularTsDeclarationAndJs',
  ]);
  // just 3 components
  grunt.registerTask('build:components', [
    'build:react',
    'build:vue',
    'build:angular',
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
  // (1) build for tests, and run tests before allowing a version bump
  // (2) bump version number in package.json etc
  // (3) rebuild js to update version numbers in those files
  // (4) commit, tag and push
  grunt.registerTask('version', [
    'build:jsfast',
    'shell:test',
    'bump-only',
    'build:jsVersionNumbers',
    'bump-commit',
  ]);
  grunt.registerTask('version:minor', [
    'build:jsfast',
    'shell:test',
    'bump-only:minor',
    'build:jsVersionNumbers',
    'bump-commit'
  ]);
  grunt.registerTask('version:major', [
    'build:jsfast',
    'shell:test',
    'bump-only:major',
    'build:jsVersionNumbers',
    'bump-commit'
  ]);
  // build all the JS that contains a version number
  grunt.registerTask('build:jsVersionNumbers', ['shell:buildJs', 'replace', 'build:components']);

};
