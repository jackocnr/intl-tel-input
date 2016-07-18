module.exports = function(grunt) {
  return {
    retina: {
        src: 'src/img/flags/@2x/*.png',
        dest: 'build/img/flags@2x.png',
        destCss: 'src/css/sprite@2x.scss',
        cssTemplate: function() { return ''; }, // ignore - we just use the @1x styles for both
        padding: 4,
        algorithm: 'left-right',
        algorithmOpts: {
          sort: false
        },
        cssOpts: {
          variableNameTransforms: ['toLowerCase']
        }
    },
    main: {
      src: ['src/img/flags/@1x/*.png'],
      dest: 'build/img/flags.png',
      cssTemplate: 'grunt/tmpl/sprite.scss.mustache',
      destCss: 'src/css/sprite.scss',
      padding: 2, // this is currently just for chrome, otherwise flags seem to leak into each other
      algorithm: 'left-right',
      algorithmOpts: {
        sort: false
      },
      cssOpts: {
        variableNameTransforms: ['toLowerCase']
      }
    }
  };
};
