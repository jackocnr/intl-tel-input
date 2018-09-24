module.exports = function(grunt) {
  return {
    options: {
      sourceMap: false,
      presets: ['@babel/preset-env']
    },
    dist: {
      files: {
        'tmp/versioned-babeled.js': 'tmp/versioned.js'
      }
    }
  };
};
