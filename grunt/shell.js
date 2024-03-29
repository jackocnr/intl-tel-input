module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'npm run build:react'
    },
    buildJs: {
      command: 'node build.js'
    }
  };
};