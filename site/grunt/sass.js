const sass = require('sass');

module.exports = function(grunt) {
  return {
    main: {
      options: {
        implementation: sass,
        sourcemap: "none",
      },
      files: {
        'build/css/website.css': 'src/css/website.scss',
        'build/css/large_flags_overrides.css': 'src/css/large_flags_overrides.scss',
      }
    },
  };
};
