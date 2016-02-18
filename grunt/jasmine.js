module.exports = function(grunt) {
  return {
    src: [
      'src/js/data.js',
      'build/js/intlTelInput.min.js',
      'build/js/utils.js'
    ],
    options: {
      vendor: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
      ],
      helpers: [
        'src/spec/helpers/**/*.js'
      ],
      specs: [
        'src/spec/tests/**/*.js'
      ],
      styles: "build/css/intlTelInput.css", // required so adding "hide" class actually works etc.
      outfile: 'spec.html',
      keepRunner: true
    }
  };
};
