module.exports = function(grunt) {
  return {
    buildCss: ['build/css/*'],
    buildImg: ['build/img/*'],
    buildJs: ['build/js/*'],

    // Used by build:jsfast/watch. Preserves build/js/utils.js because
    // src/js/intl-tel-input/utils.js is a symlink to it.
    buildJsKeepUtils: ['build/js/*', '!build/js/utils.js'],

    reactBuild: ['react/build/*'],
    vueBuild: ['vue/build/*'],
    angularBuild: ['angular/build/*'],
    svelteBuild: ['svelte/build/*'],

    // Intermediate artifacts used by the build/minify/replace steps.
    tmpIntermediates: ['tmp/built.min.js', 'tmp/one.min.js'],

    // Outputs of build:replaceMinJs (must NOT delete tmp/built.min.js which is its input).
    replaceMinJs: ['tmp/one.min.js', 'build/js/intlTelInput.min.js'],

    // build:utils output
    utils: ['build/js/utils.js'],

    // Convenience target for top-level build.
    allBuild: [
      'build/css/*',
      'build/img/*',
      'build/js/*',
      'react/build/*',
      'vue/build/*',
      'angular/build/*',
      'svelte/build/*',
      'tmp/built.min.js',
      'tmp/one.min.js',
    ],
  };
};
