module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'node react/build.js'
    },
    buildJs: {
      command: 'node build.js'
    },
    genTsDeclaration: {
      command: 'tsc src/js/intlTelInput.ts --declaration --emitDeclarationOnly --outfile build/js/intlTelInput.d.ts'
    },
    genReactTsDeclaration: {
      command: 'tsc --p react/tsconfig.json --declaration --emitDeclarationOnly --outfile react/build/IntlTelInput.d.ts'
    },
    eslint: {
      command: 'eslint src/js/intlTelInput.ts'
    },
  };
};