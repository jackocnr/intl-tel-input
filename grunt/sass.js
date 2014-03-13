module.exports = function(grunt) {
  return {
    main: {
      options: {
        style: "compact"
      },
      files: {
        'build/css/intlTelInput.css': 'src/css/intlTelInput.scss'
      }
    },
    demo: {
      files: {
        'build/css/demo.css': 'src/css/demo.scss'
      }
    }
  };
};