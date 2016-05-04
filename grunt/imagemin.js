const imageminOptipng = require('imagemin-optipng');

module.exports = function(grunt) {
  return {
    dynamic: {
      options: {
        optimizationLevel: 7,
        use: [imageminOptipng()]
      },
      files: [{
        expand: true,
        cwd: 'build/img',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'build/img'
      }]
    }
  };
};
