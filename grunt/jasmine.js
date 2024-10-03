module.exports = function(grunt) {
  return {
    src: [
      'build/js/intlTelInputWithUtils.min.js',
    ],
    options: {
      vendor: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      ],
      helpers: 'src/spec/helpers/**/*.js',
      specs: 'src/spec/tests/**/*.js',
      styles: "build/css/intlTelInput.css", //* Required so adding "hide" class actually works etc.
      outfile: 'spec.html',
      keepRunner: true,
      host: 'http://localhost:8000/'
    }
  };
};
