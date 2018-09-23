module.exports = function(grunt) {
  return {
    options: {
      sourceMap: false,
      presets: ['@babel/preset-env']
    },
    dist: {
      files: {
        'tmp/intlTelInput-babel.js': 'src/js/intlTelInput.js'
      }
    }
  };
};
