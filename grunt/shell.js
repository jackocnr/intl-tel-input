const os = require('os');
// On MacOS, sed requires the empty quotes in order to avoid creating a backup file, whereas on Linux (etc) it errors out with the empty quotes.
const sedArg = os.platform() === 'darwin' ? '-i ""' : '-i';

module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'node react/build.js'
    },
    buildVue: {
      command: 'vite build --config vue/viteConfig.js && vite build --config vue/viteConfigWithUtils.js'
    },
    buildAngular: {
      command: 'node angular/build.js'
    },
    buildJs: {
      command: 'node build.js'
    },
    genTsDeclaration: {
      //* Clean up the module names by removing the /index suffix as this is how they will be used.
      command: `tsc --p tsconfig.json && sed ${sedArg} -e "s/\\/index\\"/\\"/g" build/js/intlTelInput.d.ts`
    },
    genReactTsDeclaration: {
      //* Clean up the module names by removing the /index suffix as this is how they will be used.
      command: `tsc --p react/tsconfig.json && sed ${sedArg} -e "s/\\/index\\"/\\"/g" react/build/IntlTelInput.d.ts`
    },
    genAngularTsDeclarationAndJs: {
      command: 'ngc --p angular/tsconfig.json'
    },
    eslint: {
      command: 'eslint .'
    },
    test: {
      command: 'npm run test'
    },
    globeImages: {
      command: 'mkdir -p build/img && cp src/img/globe* build/img/'
    },
    checkLpnMetadata: {
      command: 'node scripts/check-lpn-metadata.cjs'
    },
  };
};
