module.exports = function(grunt) {
  return {
    dev: "src/js/**/*.js",
    build: "tmp/wrapped.js",
    options: {
      // this is for data.js to avoid errors about (foreign) characters getting silently deleted by some browsers
      '-W100': true,
      'eqnull': true
    }
  };
};
