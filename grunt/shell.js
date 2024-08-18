module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'node react/build.js'
    },
    buildJs: {
      command: 'node build.js'
    },
    genTsDeclaration: {
      //* Clean up the module names by removing the /index suffix as this is how they will be used.
      command: 'tsc --p tsconfig.json && sed -i "" -e "s/\\/index\\"/\\"/g" build/js/intlTelInput.d.ts'
    },
    genReactTsDeclaration: {
      //* Clean up the module names by removing the /index suffix as this is how they will be used.
      command: 'tsc --p react/tsconfig.json && sed -i "" -e "s/\\/index\\"/\\"/g" react/build/IntlTelInput.d.ts'
    },
    eslint: {
      command: 'eslint src/js/intl-tel-input.ts'
    },
    webp: {
      command: 'cwebp build/img/flags.png -lossless -o build/img/flags.webp && cwebp build/img/flags@2x.png -lossless -o build/img/flags@2x.webp'
    },
    test: {
      command: 'npm run test'
    }
  };
};
