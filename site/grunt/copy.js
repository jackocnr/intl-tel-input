module.exports = function (grunt) {
  return {
    plugin: {
      cwd: "../build", // set working folder / root to copy
      src: "**/*", // copy all files and subfolders
      dest: "build/intl-tel-input", // destination folder
      expand: true, // required when using cwd
    },
    react: {
      cwd: "../react/build", // set working folder / root to copy
      src: "**/*", // copy all files and subfolders
      dest: "build/intl-tel-input/react", // destination folder
      expand: true, // required when using cwd
    },
    static: {
      cwd: "static", // set working folder / root to copy
      src: "**/*", // copy all files and subfolders
      dest: "build", // destination folder
      expand: true, // required when using cwd
    },
    htaccess: {
      cwd: "static", // set working folder / root to copy
      src: ".htaccess", // copy the .htaccess dotfile
      dest: "build", // destination folder
      expand: true, // required when using cwd
    },
    js: {
      cwd: "src/js", // set working folder / root to copy
      src: "**/*.js",
      dest: "build/js", // destination folder
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
