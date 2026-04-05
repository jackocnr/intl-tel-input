module.exports = function(grunt) {
  return {
    buildCss: ['build/css/*'],
    buildImg: ['build/img/*'],
    buildJs: ['build/js/*'],

    // Used by build:jsfast/watch. Preserves build/js/utils.js because
    // esbuild resolves the "utils-compiled" alias to it.
    buildJsKeepUtils: ['build/js/*', '!build/js/utils.js'],

    reactBuild: ['react/build/*'],
    vueBuild: ['vue/build/*'],
    angularBuild: ['angular/build/*'],
    // Intermediate artifacts used by the build/minify/replace steps.
    tmpIntermediates: ['tmp/built.min.js', 'tmp/one.min.js'],

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
      'tmp/built.min.js',
      'tmp/one.min.js',
    ],
  };
};
