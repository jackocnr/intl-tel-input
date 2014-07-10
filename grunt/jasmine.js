module.exports = function(grunt) {
  return {
    src: [
      'src/js/data.js',
      'src/js/intlTelInput.js',
      'lib/libphonenumber/build/isValidNumber.js'
    ],
    options: {
      vendor: [
        'lib/jquery/jquery.js',
        'lib/jasmine-jquery/jasmine-jquery.js'
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