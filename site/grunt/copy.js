module.exports = function (grunt) {
  return {
    plugin: {
      cwd: "../build", // set working folder / root to copy
      src: "**/*", // copy all files and subfolders
      dest: "build/intl-tel-input", // destination folder
      expand: true, // required when using cwd
    },
    public: {
      cwd: "public", // set working folder / root to copy
      src: "**/*", // copy all files and subfolders
      dest: "build", // destination folder
      expand: true, // required when using cwd
    },
    prism_override_css: {
      cwd: "src/css", // set working folder / root to copy
      src: "prism-overrides.css",
      dest: "build/css", // destination folder
      expand: true, // required when using cwd
    },
    examples_css: {
      cwd: "src/examples/css", // set working folder / root to copy
      src: "*",
      dest: "build/examples/css", // destination folder
      expand: true, // required when using cwd
    }
  };
};
