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
    'build:replaceMinJs',
    'build:components',
  ]);

  // replace private methods etc in the minified JS
  grunt.registerTask('build:replaceMinJs', [
    'clean:replaceMinJs',
    'validate:replacePatterns',
    'replace:privateMethods',
    'replace:instanceFields',
  ]);

  // just 4 components
  grunt.registerTask('build:components', [
    'clean:reactBuild',
    'clean:vueBuild',
    'clean:angularBuild',
    'clean:svelteBuild',
    'build:react',
    'build:vue',
    'build:angular',
    'build:svelte',
  ]);

  // Ensure build/js/utils.js exists (src/js/intl-tel-input/utils.js is a symlink to it).
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
    'build:replaceMinJs',
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

  // just svelte
  grunt.registerTask('build:svelte', [
    'clean:svelteBuild',
    'replace:svelteWithUtils',
    'shell:buildSvelte',
  ]);

  // stripped down build task for CI which just builds the core plugin JS that is used by the tests (as we were having issues with sharp lib used by img task, and then the rollup dep used by the buildVue task)
  grunt.registerTask('build:ci', [
    'clean:buildJs',
    'clean:tmpIntermediates',
    'closure-compiler:utils',
    'shell:buildJs',
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
    'replace:readme',
    'replace:issueTemplate',
  ]);

  // AI-written task for when a replace pattern has no matches, normally you don't know which pattern failed, but this will log the name to the output.
  grunt.registerTask('validate:replacePatterns', 'Validate replace patterns have matches', function() {
    const config = grunt.config.get('replace');
    const failed = [];
    const isPrivate = (key) => ['privateMethods','instanceFields'].includes(key);
    const resolveValidationSource = (key, src) => {
      // instanceFields runs after privateMethods and normally reads tmp/one.min.js,
      // but validate:replacePatterns runs before tmp/one.min.js exists.
      // Validate instanceFields patterns against tmp/built.min.js instead when available.
      if (key === 'instanceFields' && src === 'tmp/one.min.js' && grunt.file.exists('tmp/built.min.js')) {
        return 'tmp/built.min.js';
      }
      return src;
    };
    Object.keys(config).forEach((key) => {
      if (!isPrivate(key)) return;
      const { options, files } = config[key];
      const patterns = options.patterns || [];
      Object.entries(files).forEach(([out, src]) => {
        const validationSrc = resolveValidationSource(key, src);
        if (!grunt.file.exists(validationSrc)) {
          grunt.log.warn(`Source file not found for replace:${key}: ${validationSrc}`);
          return;
        }
        const content = grunt.file.read(validationSrc);
        patterns.forEach((p) => {
          if (p.match && content.match(p.match) === null) {
            failed.push({ key, pattern: p.match.toString(), src: validationSrc });
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
