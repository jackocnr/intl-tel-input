module.exports = function(grunt) {
  return {
    js: {
      files: ["src/**/*", "static/**/*", "grunt/**/*"],
      tasks: "build"
    }
  };
};
