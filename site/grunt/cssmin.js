module.exports = function(grunt) {
  return {
    target: {
      files: {
        // NOTE: don't minify large_flags_overrides.css because we link to it as an example from the large_flags example page
        'build/css/website.css': 'build/css/website.css',
        'build/css/playground.css': 'build/css/playground.css',
        'build/css/homepage.css': 'build/css/homepage.css',
        'build/css/docs.css': 'build/css/docs.css'
      }
    }
  };
};
