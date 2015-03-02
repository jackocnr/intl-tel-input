module.exports = function(grunt) {
  return {
    main: {
      options: {
        engine: "im",
        sizes: [{
          width: 40,
          height: 30
        }],
        rename: false
      },
      files: [{
        expand: true,
        cwd: "region-flags/png/",
        src: ['*.png'],
        dest: 'src/img/flags/'
      }]
    }
  }
}