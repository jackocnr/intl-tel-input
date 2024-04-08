module.exports = function(grunt) {
  return {
    retina: {
      src: 'src/img/flags/@2x/*.png',
      dest: 'build/img/flags@2x.png',
      destCss: 'tmp/sprite@2x.scss', //! Ignore - We are manually generating the styles.
      padding: 4, //* This needs to be double the main padding so the math in the css files work.
      algorithm: 'left-right',
      algorithmOpts: {
        sort: false
      },
    },
    main: {
      src: ['src/img/flags/@1x/*.png'],
      dest: 'build/img/flags.png',
      cssTemplate: 'grunt/tmpl/sprite.scss.mustache',
      destCss: 'tmp/sprite.scss', //! Ignore - We are manually generating the styles.
      padding: 2, //* This is currently just for chrome, otherwise flags seem to leak into each other.
      algorithm: 'left-right',
      algorithmOpts: {
        sort: false
      },
    }
  };
};
