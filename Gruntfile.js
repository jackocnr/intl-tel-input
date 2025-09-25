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
  grunt.registerTask('build:utils', ['closure-compiler:utils', 'shell:checkLpnMetadata']);

  // just CSS
  grunt.registerTask('build:css', ['sass', 'cssmin']);

  // just images
  grunt.registerTask('build:img', ['shell:globeImages', 'generate-sprite', 'build:css']);

  // just javascript
  grunt.registerTask('build:js', [
    'shell:eslint',
    'closure-compiler:utils',
    'shell:genTsDeclaration',
    'shell:buildJs',
    'build:replaceMinJs',
    'build:components',
  ]);

  // replace private methods etc in the minified JS
  grunt.registerTask('build:replaceMinJs', [
    'validate:replacePatterns',
    'replace:privateMethods',
    'replace:instanceFields',
  ]);

  // just 3 components
  grunt.registerTask('build:components', [
    'build:react',
    'build:vue',
    'build:angular',
  ]);

  // fast version which only builds the main plugin JS files (see root build.js file for details)
  grunt.registerTask('build:jsfast', ['shell:buildJs', 'build:replaceMinJs']);

  // just react
  grunt.registerTask('build:react', [
    'replace:reactWithUtils',
    'shell:genReactTsDeclaration',
    'shell:buildReact',
  ]);

  // just vue
  grunt.registerTask('build:vue', ['replace:vueWithUtils', 'shell:buildVue']);

  // just angular
  grunt.registerTask('build:angular', [
    'replace:angularWithUtils',
    'shell:genAngularTsDeclarationAndJs',
    'shell:buildAngular',
  ]);

  // stripped down build task for CI which just builds the core plugin JS that is used by the tests (as we were having issues with sharp lib used by img task, and then the rollup dep used by the buildVue task)
  grunt.registerTask('build:ci', ['closure-compiler:utils', 'shell:buildJs']);

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
  grunt.registerTask('versionNumbers', ['replace:readme', 'replace:issueTemplate']);

  // AI-written task for when a replace pattern has no matches, normally you don't know which pattern failed, but this will log the name to the output.
  grunt.registerTask('validate:replacePatterns', 'Validate replace patterns have matches', function() {
    const config = grunt.config.get('replace');
    const failed = [];
    const isPrivate = (key) => ['privateMethods','instanceFields'].includes(key);
    Object.keys(config).forEach((key) => {
      if (!isPrivate(key)) return;
      const { options, files } = config[key];
      const patterns = options.patterns || [];
      Object.entries(files).forEach(([out, src]) => {
        if (!grunt.file.exists(src)) {
          grunt.log.warn(`Source file not found for replace:${key}: ${src}`);
          return;
        }
        const content = grunt.file.read(src);
        patterns.forEach((p) => {
          if (p.match && content.match(p.match) === null) {
            failed.push({ key, pattern: p.match.toString(), src });
          }
        });
      });
    });
    if (failed.length) {
      grunt.log.error('Replace pattern validation failed:');
      failed.forEach(f => grunt.log.error(`  [${f.key}] pattern ${f.pattern} had 0 matches in ${f.src}`));
      grunt.log.warn(`${failed.length} replace patterns had zero matches.`);
    } else {
      grunt.log.ok('All replace patterns matched at least once.');
    }
  });

};
