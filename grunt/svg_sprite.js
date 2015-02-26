module.exports = function(grunt) {
  return {
    main: {
      expand: true,
      cwd: 'region-flags/svg',
      src: ['*.svg'],
      dest: './src/img',
      options: {
        shape: {
          dimension: { // Set maximum dimensions
            maxWidth: 32,
            maxHeight: 22
          },
          spacing: { // Add padding
            padding: 0
          },
        },
        mode: {
          view: { // Activate the «view» mode
            layout: "diagonal",
            dest: ".",
            prefix: ".%s", // Prefix for CSS selectors
            dimensions: true, // Suffix for dimension CSS selectors
            bust: false,
            render: {
              scss: {
                template: "grunt/tmpl/sprite-mustache.scss",
                dest: "../../src/css/sprite.scss"
              }
            },
            sprite: "flags.svg"
          }
        },
        variables: {
          half_width: function () {
            return function (width, render) {
              return render(width)/2;
            }
          },
          half_height: function () {
            return function (height, render) {
              return render(height)/2;
            }
          },
          name_lowercase: function () {
            return function (shapes, render) {
              return render(shapes).toLowerCase();
            }
          }
        }
      }
    }
  };
};
