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
      outfile: 'spec.html',
      keepRunner: true
    }
  };
};
