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
        'build/css/intlTelInput-no-assets.css': 'src/css/intlTelInput.scss',
        'build/css/intlTelInput.css': 'src/css/intlTelInputWithAssets.scss'
      }
    },
    demo: {
      options: {
        implementation: sass,
        sourcemap: "none"
      },
      files: {
        'build/css/demo.css': 'src/css/demo.scss'
      }
    }
  };
};
