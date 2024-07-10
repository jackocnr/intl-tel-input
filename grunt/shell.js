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
    genReactTsDeclaration: {
      command: 'tsc --p react/tsconfig.json'
    },
    eslint: {
      command: 'eslint src/js/intl-tel-input.ts'
    },
  };
};
