module.exports = function(grunt) {
  return {
    main: {
      src: 'src/img/flags/*.png',
      dest: 'src/img/flags.png',
      cssTemplate: 'grunt/tmpl/sprite-retina-mustache.scss',
      destCss: 'src/css/sprite.scss',
      padding: 0,
      cssOpts: {
        variableNameTransforms: ['toLowerCase']
      }
    }
  };
};
