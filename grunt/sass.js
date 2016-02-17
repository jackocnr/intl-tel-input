module.exports = function(grunt) {
  return {
    main: {
      options: {
        sourcemap: "none",
        style: "compressed"
      },
      files: {
        'build/css/intlTelInput.css': 'src/css/intlTelInput.scss'
      }
    },
    demo: {
      options: {
        sourcemap: "none"
      },
      files: {
        'build/css/demo.css': 'src/css/demo.scss'
      }
    }
  };
};
