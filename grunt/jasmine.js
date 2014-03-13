module.exports = function(grunt) {
  return {
    src: [
      'src/js/data.js',
      'src/js/intlTelInput.js'
    ],
    options: {
      vendor: [
        'lib/jquery/dist/jquery.js',
        'lib/jasmine-jquery/lib/jasmine-jquery.js'
      ],
      helpers: [
        'src/spec/helpers/**/*.js'
      ],
      specs: [
        'src/spec/tests/**/*.js'
      ],
      outfile: 'spec.html',
      keepRunner: true
    }
  };
};