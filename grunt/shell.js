const os = require('os');
// On MacOS, sed requires the empty quotes in order to avoid creating a backup file, whereas on Linux (etc) it errors out with the empty quotes.
const sedArg = os.platform() === 'darwin' ? '-i ""' : '-i';

module.exports = function(grunt) {
  return {
    buildReact: {
      command: 'node react/build.js'
    },
    buildVue: {
      //* Build, fix leaked source path in .vue.d.ts, flatten .d.ts output, and clean up.
      command: [
        'vite build --config vue/vite.config.mts',
        // Fix relative source path leaked by @vue/compiler-sfc into the .vue.d.ts files
        `sed ${sedArg} -e "s|from '../../src/js/modules/types/public-api'|from 'intl-tel-input'|" vue/build/vue/src/IntlTelInput.vue.d.ts vue/build/vue/src/IntlTelInputWithUtils.vue.d.ts`,
        // vite-plugin-dts mirrors the source directory structure (vue/src/) inside the output dir (vue/build/), resulting in vue/build/vue/src/*.d.ts. Flatten them to vue/build/.
        'mv vue/build/vue/src/*.d.ts vue/build/',
        'rm -rf vue/build/vue',
      ].join(' && ')
    },
    buildAngular: {
      command: 'node angular/build.js'
    },
    buildJs: {
      command: 'node build.js'
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
