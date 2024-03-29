module.exports = function(grunt) {
  return {
    regular: {
      src: ['src/js/intro.js', 'src/js/data.js', 'tmp/versioned.js', 'src/js/outro.js'],
      dest: 'tmp/wrapped.js',
    },
    jQueryVersion: {
      src: ['src/js/intro-jquery.js', 'src/js/data.js', 'tmp/versioned.js', 'src/js/outro-jquery.js'],
      dest: 'tmp/wrapped-jquery.js',
    },
    data: {
      src: ['src/js/intro-data.js', 'src/js/data.js', 'src/js/outro-data.js'],
      dest: 'tmp/data.js'
    }
  };
};
