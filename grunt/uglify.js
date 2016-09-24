module.exports = function(grunt) {
  return {
    options: {
      banner: '/*\n' +
        ' * International Telephone Input v<%= package.version %>\n' +
        ' * <%= package.repository.url %>\n' +
        ' * Licensed under the MIT license\n' +
        ' */\n'
    },
    dev: {
      options: {
        beautify: true,
        compress: false,
        mangle: false,
        preserveComments: true,
        screwIE8: false
      },
      files: {
        'build/js/intlTelInput.js': 'tmp/wrapped.js'
      }
    },
    prod: {
      files: {
        'tmp/wrapped.min.js': 'tmp/wrapped.js'
      }
    }
  };
};
