module.exports = function(grunt) {
  return {
    main: {
      expand: true,
      cwd: 'bower_components/flag-icon-css/flags/4x3',
      src: ['*.svg'],
      dest: './src/img',
      options: {
        shape: {
          dimension: { // Set maximum dimensions
            maxWidth: 36,
            maxHeight: 27
          },
          spacing: { // Add padding
            padding: 0
          },
        },
        mode: {
          view: { // Activate the «view» mode
            dest: ".",
            prefix: ".%s", // Prefix for CSS selectors
            dimensions: false, // Suffix for dimension CSS selectors
            bust: false,
            render: {
              scss: {
                template: "grunt/tmpl/sprite-mustache.scss",
                dest: "../../src/css/sprite.scss"
              }
            },
            sprite: "flags.svg"
          }
        }
      }
    }
  };
};