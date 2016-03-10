module.exports = function(grunt) {
  return {
    retina: {
      options: {
        engine: "im",
        // just generate the @2x images here, then use evenizer to get even pixel values for width and height before generating the @1x images
        sizes: [{
          width: 40,
          height: 30
        }],
        rename: false,
        // re-gen the images even if the dest files already exist. this is useful for when we change settings here
        newFilesOnly: false
      },
      files: [{
        expand: true,
        cwd: "node_modules/region-flags/png/",
        // only process 2-char country code files (ignore sub-regions)
        src: ['??.png'],
        dest: 'src/img/flags/@2x/'
      }]
    }
  };
};
