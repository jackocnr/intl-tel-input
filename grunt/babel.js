module.exports = function(grunt) {
  return {
    options: {
      sourceMap: false,
      presets: [
        ['@babel/preset-env', {
          // we're not performing any typeof checks in this project where it's important to know
          // if an object is a symbol. Let the consumer of this package compile with this option
          // only if he wants it.
          exclude: ['transform-typeof-symbol']
        }]
      ]
    },
    dist: {
      files: {
        'tmp/versioned-babeled.js': 'tmp/versioned.js'
      }
    }
  };
};
