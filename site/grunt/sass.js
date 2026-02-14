const sass = require('sass');

module.exports = function(grunt) {
  return {
    main: {
      options: {
        implementation: sass,
        sourcemap: "none",
        style: "compressed"
      },
      files: {
        'tmp/css/website.css': 'tmp/css/website.scss',
        'tmp/css/large_flags_overrides.css': 'tmp/css/large_flags_overrides.scss',
      }
    },
  };
};
