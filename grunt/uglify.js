module.exports = function(grunt) {
  return {
    options: {
      banner: '/*\n' +
        ' * International Telephone Input v<%= package.version %>\n' +
        ' * <%= package.repository.url %>\n' +
        ' * Licensed under the MIT license\n' +
        ' */\n'    },
    dev: {
      options: {
        beautify: true,
        compress: false,
        mangle: false,
        output: {
          comments: "all"
        }
      },
      files: {
        'build/js/intlTelInput.js': 'tmp/wrapped.js',
        'build/js/intlTelInput-jquery.js': 'tmp/wrapped-jquery.js',
        'build/js/data.js': 'tmp/data.js',
      }
    },
    prod: {
      files: {
        'tmp/wrapped.min.js': 'tmp/wrapped.js',
        'tmp/wrapped-jquery.min.js': 'tmp/wrapped-jquery.js',
        'build/js/data.min.js': 'tmp/data.js',
      }
    },
  };
};
