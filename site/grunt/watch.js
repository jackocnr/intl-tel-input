module.exports = function(grunt) {
  return {
    js: {
      files: ["src/**/*", "static/**/*", "grunt/**/*", "../build/**/*"],
      tasks: "build"
    }
  };
};
