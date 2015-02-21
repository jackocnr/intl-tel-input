module.exports = function(grunt) {
  return {
    main: {
      files: [{
        cwd: 'src/img/',
        src: ['*.svg'],
        dest: 'src/img/'
      }]
    }
  };
};