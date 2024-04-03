module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'node react/build.js'
    },
    buildJs: {
      command: 'node build.js'
    },
    genTsDeclaration: {
      command: 'tsc --p tsconfig.json'
    },
    eslint: {
      command: 'eslint src/js/intlTelInput.ts'
    },
  };
};