module.exports = function(grunt) {
  return {
    dynamic: {
      options: {
        optimizationLevel: 7,
      },
      files: [{
        expand: true,
        cwd: 'build/img',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'build/img',
      }],
    },
  };
};
