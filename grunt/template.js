module.exports = function(grunt) {
  return {
    jsAddVersion: {
      src: 'src/js/intlTelInput.js',
      dest: 'tmp/versioned.js',
      options: {
        data: (function(version) {
          return {
            version: version,
          };
        })('<%= package.version %>')
      }
    }
  };
};
