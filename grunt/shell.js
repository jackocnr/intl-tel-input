module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'node react/build.mjs'
    },
    buildVue: {
      command: 'vite build --config vue/vite.config.mts'
    },
    buildAngular: {
      command: 'node angular/build.mjs'
    },
    buildJs: {
      command: 'node build.mjs'
    },
    genTsDeclaration: {
      command: [
        'dts-bundle-generator --no-banner -o build/js/intlTelInput.d.ts src/js/intl-tel-input.ts',
        'dts-bundle-generator --no-banner -o build/js/data.d.ts src/js/data.ts',
        'dts-bundle-generator --no-banner -o build/js/i18n.d.ts src/js/i18n/index.ts',
      ].join(' && ')
    },
    genReactTsDeclaration: {
      command: 'tsc --p react/tsconfig.json'
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
    checkLpnMetadata: {
      command: 'node scripts/check-lpn-metadata.cjs'
    },
  };
};
