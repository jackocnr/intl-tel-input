module.exports = function(grunt) {
  return {
    target: {
      files: {
        'build/css/website.css': 'tmp/css/website.css',
        'build/css/large_flags_overrides.css': 'tmp/css/large_flags_overrides.css'
      }
    }
  };
};
