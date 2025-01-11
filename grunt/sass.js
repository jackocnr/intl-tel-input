const sass = require('sass');

module.exports = function(grunt) {
  return {
    main: {
      options: {
        implementation: sass,
        "no-source-map": true,
        style: "expanded"
      },
      files: {
        'build/css/intlTelInput.css': 'src/css/intlTelInput.scss'
      }
    },
    demo: {
      options: {
        implementation: sass,
        "no-source-map": true,
      },
      files: {
        'build/css/demo.css': 'src/css/demo.scss'
      }
    }
  };
};
