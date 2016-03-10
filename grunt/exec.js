module.exports = function(grunt) {
  return {
    evenizer: {
      // we need even pixel values for width and height before we scale the image down to @1x
      command: "evenizer --resize -i src/img/flags/@2x/*.png"
    }
  };
};
