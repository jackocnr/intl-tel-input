module.exports = function(grunt) {
  return {
    dev: "src/js/**/*.js",
    build: "tmp/all.js",
    options: {
      // this is for data.js which sometimes has commas on the following line
      laxcomma: true
    }
  };
};