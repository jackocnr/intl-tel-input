module.exports = function(grunt) {
  return {
    target: {
      files: {
        'build/css/intlTelInput.min.css': 'build/css/intlTelInput.css',
        'build/css/intlTelInput-no-assets.min.css': 'build/css/intlTelInput-no-assets.css'
      }
    }
  };
};
