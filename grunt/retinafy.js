module.exports = function(grunt) {
  return {
    options: {
      sizes: {
        '50%': {
          suffix: ''
        },
        '100%': {
          suffix: '@2x'
        }
      }
    },
    files: {
      expand: true,
      cwd: 'src/img/',
      src: ['flags.png'],
      dest: 'build/img'
    }
  };
};
