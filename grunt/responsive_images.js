module.exports = function(grunt) {
  return {
    main: {
      options: {
        engine: "im",
        sizes: [{
          width: 36,
          height: 26
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
