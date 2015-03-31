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
      cwd: 'src/img/flags/@2x/',
      src: ['*.png'],
      dest: 'src/img/flags/'
    }
  };
};
