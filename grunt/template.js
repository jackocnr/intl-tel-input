module.exports = function(grunt) {

  // timestamp in asset URLs for cache busting
  var time = (new Date()).getTime();

  return {

    // this is the first step in generating the actual plugin main JS file
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
