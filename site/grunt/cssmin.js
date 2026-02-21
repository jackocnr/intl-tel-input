module.exports = function(grunt) {
  return {
    target: {
      files: {
        'build/css/website.css': 'build/css/website.css',
        'build/css/playground.css': 'build/css/playground.css',
        'build/css/homepage.css': 'build/css/homepage.css',
        'build/css/docs.css': 'build/css/docs.css',
        'build/css/large_flags_overrides.css': 'build/css/large_flags_overrides.css'
      }
    }
  };
};
