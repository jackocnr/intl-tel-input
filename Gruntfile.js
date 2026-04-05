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
  grunt.registerTask('build', [
    'clean:allBuild',
    'build:img',
    'translations',
    'build:js',
  ]);

  // build translations
  grunt.registerTask('build:translations', [
    'clean:buildJs',
    'clean:tmpIntermediates',
    'translations',
    'build:js',
  ]);

  // build utils
  grunt.registerTask('build:utils', [
    'clean:utils',
    'closure-compiler:utils',
    'shell:checkLpnMetadata',
  ]);

  // just CSS
  grunt.registerTask('build:css', [
    'clean:buildCss',
    'sass',
    'cssmin',
  ]);

  // just images (and CSS)
  grunt.registerTask('build:img', [
    'clean:buildImg',
    'generate-sprite',
    'build:css',
  ]);

  // just javascript
  grunt.registerTask('build:js', [
    'clean:buildJs',
    'clean:tmpIntermediates',
    'shell:eslint',
    'closure-compiler:utils',
    'shell:genTsDeclaration',
    'shell:buildJs',
    'build:components',
  ]);

  // build components (svelte exports source .svelte files, so only needs the WithUtils replace)
  grunt.registerTask('build:components', [
    'clean:reactBuild',
    'clean:vueBuild',
    'clean:angularBuild',
    'build:react',
    'build:vue',
    'build:angular',
    'replace:svelteWithUtils',
  ]);

  // Ensure build/js/utils.js exists (esbuild resolves "utils-compiled" alias to it).
  grunt.registerTask('ensure:utils', 'Build utils if missing', function() {
    if (!grunt.file.exists('build/js/utils.js')) {
      grunt.task.run('closure-compiler:utils');
    }
  });

  // fast version which only builds the main plugin JS files (see root build.js file for details)
  grunt.registerTask('build:jsfast', [
    'clean:buildJsKeepUtils',
    'clean:tmpIntermediates',
    'ensure:utils',
    'shell:buildJs',
  ]);

  // just react
  grunt.registerTask('build:react', [
    'clean:reactBuild',
    'replace:reactWithUtils',
    'shell:genReactTsDeclaration',
    'shell:buildReact',
  ]);

  // just vue
  grunt.registerTask('build:vue', [
    'clean:vueBuild',
    'replace:vueWithUtils',
    'shell:buildVue',
  ]);

  // just angular
  grunt.registerTask('build:angular', [
    'clean:angularBuild',
    'replace:angularWithUtils',
    'shell:genAngularTsDeclarationAndJs',
    'shell:buildAngular',
  ]);



  /**
   * VERSIONING TASKS
  */
  // (1) build for tests, and run tests before allowing a version bump
  // (2) bump version number in package.json etc
  // (3) rebuild js to update version numbers in those files, as well as readme etc
  // (4) commit, tag and push
  grunt.registerTask('version', [
    'build:jsfast',
    'shell:test',
    'bump-only',
    'versionNumbers',
    'bump-commit',
  ]);

  grunt.registerTask('version:minor', [
    'build:jsfast',
    'shell:test',
    'bump-only:minor',
    'versionNumbers',
    'bump-commit'
  ]);

  grunt.registerTask('version:major', [
    'build:jsfast',
    'shell:test',
    'bump-only:major',
    'versionNumbers',
    'bump-commit'
  ]);

  // update version numbers in docs etc
  grunt.registerTask('versionNumbers', [
    'replace:siteDocs',
    'replace:issueTemplate',
    'replace:packageLockInner',
  ]);

};
